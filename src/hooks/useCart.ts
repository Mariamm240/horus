"use client"

import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  subscriptionPrice?: number
  image: string
  quantity: number
  planType: 'single' | 'subscription'
  subscriptionPeriod?: string
  variant?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
  updatedAt: Date
}

const CART_STORAGE_KEY = 'horus-cart'

// IndexedDB helpers for offline support
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('HorusCart', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id' })
      }
    }
  })
}

const getCartFromIndexedDB = async (): Promise<Cart | null> => {
  try {
    const db = await openDB()
    const transaction = db.transaction(['cart'], 'readonly')
    const store = transaction.objectStore('cart')
    const request = store.get('current-cart')
    
    return new Promise((resolve, reject) => {
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result?.cart || null)
    })
  } catch {
    return null
  }
}

const saveCartToIndexedDB = async (cart: Cart): Promise<void> => {
  try {
    const db = await openDB()
    const transaction = db.transaction(['cart'], 'readwrite')
    const store = transaction.objectStore('cart')
    store.put({ id: 'current-cart', cart })
  } catch {
    // Fallback to localStorage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }
}

// Cart calculations
const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const total = items.reduce((sum, item) => {
    const price = item.planType === 'subscription' ? (item.subscriptionPrice || item.price) : item.price
    return sum + (price * item.quantity)
  }, 0)
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  return { total, itemCount }
}

// Cart fetcher for SWR
const cartFetcher = async (): Promise<Cart> => {
  // Try IndexedDB first
  const cachedCart = await getCartFromIndexedDB()
  if (cachedCart) return cachedCart
  
  // Fallback to localStorage
  const stored = localStorage.getItem(CART_STORAGE_KEY)
  if (stored) {
    const parsed = JSON.parse(stored)
    return {
      ...parsed,
      updatedAt: new Date(parsed.updatedAt)
    }
  }
  
  // Default empty cart
  return {
    items: [],
    total: 0,
    itemCount: 0,
    updatedAt: new Date()
  }
}

export const useCart = () => {
  const [user] = useAuthState(auth)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const { data: cart, error, isLoading } = useSWR<Cart>(
    isClient ? 'cart' : null,
    cartFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 1000,
    }
  )
  
  const updateCart = async (newCart: Cart) => {
    // Optimistic update
    mutate('cart', newCart, false)
    
    // Save to storage
    await saveCartToIndexedDB(newCart)
    
    // Sync with Firebase if user is logged in
    if (user) {
      try {
        await fetch('/api/cart/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: newCart, userId: user.uid })
        })
      } catch (error) {
        console.warn('Failed to sync cart with server:', error)
      }
    }
    
    // Revalidate
    mutate('cart')
  }
  
  const addItem = async (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    if (!cart) return
    
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => 
        cartItem.id === item.id && 
        cartItem.planType === item.planType &&
        cartItem.subscriptionPeriod === item.subscriptionPeriod
    )
    
    let newItems: CartItem[]
    
    if (existingItemIndex >= 0) {
      // Update existing item
      newItems = [...cart.items]
      newItems[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      newItems = [...cart.items, { ...item, quantity }]
    }
    
    const { total, itemCount } = calculateCartTotals(newItems)
    
    await updateCart({
      items: newItems,
      total,
      itemCount,
      updatedAt: new Date()
    })
  }
  
  const removeItem = async (itemId: string, planType: 'single' | 'subscription', subscriptionPeriod?: string) => {
    if (!cart) return
    
    const newItems = cart.items.filter(
      (item) => !(
        item.id === itemId && 
        item.planType === planType &&
        item.subscriptionPeriod === subscriptionPeriod
      )
    )
    
    const { total, itemCount } = calculateCartTotals(newItems)
    
    await updateCart({
      items: newItems,
      total,
      itemCount,
      updatedAt: new Date()
    })
  }
  
  const updateQuantity = async (
    itemId: string, 
    newQuantity: number, 
    planType: 'single' | 'subscription', 
    subscriptionPeriod?: string
  ) => {
    if (!cart || newQuantity < 0) return
    
    if (newQuantity === 0) {
      await removeItem(itemId, planType, subscriptionPeriod)
      return
    }
    
    const newItems = cart.items.map((item) =>
      item.id === itemId && 
      item.planType === planType &&
      item.subscriptionPeriod === subscriptionPeriod
        ? { ...item, quantity: newQuantity }
        : item
    )
    
    const { total, itemCount } = calculateCartTotals(newItems)
    
    await updateCart({
      items: newItems,
      total,
      itemCount,
      updatedAt: new Date()
    })
  }
  
  const clearCart = async () => {
    await updateCart({
      items: [],
      total: 0,
      itemCount: 0,
      updatedAt: new Date()
    })
  }
  
  return {
    cart: cart || { items: [], total: 0, itemCount: 0, updatedAt: new Date() },
    isLoading,
    error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isEmpty: !cart?.items.length
  }
}

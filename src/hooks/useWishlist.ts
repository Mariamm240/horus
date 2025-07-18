"use client"

import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  subscriptionPrice?: number
  image: string
  addedAt: Date
}

export interface Wishlist {
  items: WishlistItem[]
  count: number
  updatedAt: Date
}

const WISHLIST_STORAGE_KEY = 'horus-wishlist'

// IndexedDB helpers
const openWishlistDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('HorusWishlist', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('wishlist')) {
        db.createObjectStore('wishlist', { keyPath: 'id' })
      }
    }
  })
}

const getWishlistFromIndexedDB = async (): Promise<Wishlist | null> => {
  try {
    const db = await openWishlistDB()
    const transaction = db.transaction(['wishlist'], 'readonly')
    const store = transaction.objectStore('wishlist')
    const request = store.get('current-wishlist')
    
    return new Promise((resolve, reject) => {
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result?.wishlist || null)
    })
  } catch {
    return null
  }
}

const saveWishlistToIndexedDB = async (wishlist: Wishlist): Promise<void> => {
  try {
    const db = await openWishlistDB()
    const transaction = db.transaction(['wishlist'], 'readwrite')
    const store = transaction.objectStore('wishlist')
    store.put({ id: 'current-wishlist', wishlist })
  } catch {
    // Fallback to localStorage
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
  }
}

// Wishlist fetcher for SWR
const wishlistFetcher = async (): Promise<Wishlist> => {
  // Try IndexedDB first
  const cachedWishlist = await getWishlistFromIndexedDB()
  if (cachedWishlist) {
    return {
      ...cachedWishlist,
      items: cachedWishlist.items.map(item => ({
        ...item,
        addedAt: new Date(item.addedAt)
      })),
      updatedAt: new Date(cachedWishlist.updatedAt)
    }
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
  if (stored) {
    const parsed = JSON.parse(stored)
    return {
      ...parsed,
      items: parsed.items.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt)
      })),
      updatedAt: new Date(parsed.updatedAt)
    }
  }
  
  // Default empty wishlist
  return {
    items: [],
    count: 0,
    updatedAt: new Date()
  }
}

export const useWishlist = () => {
  const [user] = useAuthState(auth)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const { data: wishlist, error, isLoading } = useSWR<Wishlist>(
    isClient ? 'wishlist' : null,
    wishlistFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 1000,
    }
  )
  
  const updateWishlist = async (newWishlist: Wishlist) => {
    // Optimistic update
    mutate('wishlist', newWishlist, false)
    
    // Save to storage
    await saveWishlistToIndexedDB(newWishlist)
    
    // Sync with Firebase if user is logged in
    if (user) {
      try {
        await fetch('/api/wishlist/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wishlist: newWishlist, userId: user.uid })
        })
      } catch (error) {
        console.warn('Failed to sync wishlist with server:', error)
      }
    }
    
    // Revalidate
    mutate('wishlist')
  }
  
  const addItem = async (item: Omit<WishlistItem, 'addedAt'>) => {
    if (!wishlist) return
    
    // Check if item already exists
    const existingItem = wishlist.items.find(wishItem => wishItem.id === item.id)
    if (existingItem) return // Item already in wishlist
    
    const newItem: WishlistItem = {
      ...item,
      addedAt: new Date()
    }
    
    const newWishlist: Wishlist = {
      items: [...wishlist.items, newItem],
      count: wishlist.count + 1,
      updatedAt: new Date()
    }
    
    await updateWishlist(newWishlist)
  }
  
  const removeItem = async (itemId: string) => {
    if (!wishlist) return
    
    const newItems = wishlist.items.filter(item => item.id !== itemId)
    
    const newWishlist: Wishlist = {
      items: newItems,
      count: newItems.length,
      updatedAt: new Date()
    }
    
    await updateWishlist(newWishlist)
  }
  
  const toggleItem = async (item: Omit<WishlistItem, 'addedAt'>) => {
    if (!wishlist) return
    
    const existingItem = wishlist.items.find(wishItem => wishItem.id === item.id)
    
    if (existingItem) {
      await removeItem(item.id)
    } else {
      await addItem(item)
    }
  }
  
  const clearWishlist = async () => {
    await updateWishlist({
      items: [],
      count: 0,
      updatedAt: new Date()
    })
  }
  
  const isInWishlist = (itemId: string): boolean => {
    return wishlist?.items.some(item => item.id === itemId) || false
  }
  
  return {
    wishlist: wishlist || { items: [], count: 0, updatedAt: new Date() },
    isLoading,
    error,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    isEmpty: !wishlist?.items.length
  }
}

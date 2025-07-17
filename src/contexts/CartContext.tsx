"use client"

import React, { createContext, useContext, useEffect, useReducer, ReactNode } from "react"
import { useSession } from "next-auth/react"

export interface CartItem {
  id: number
  wooProductId: number
  name: string
  slug: string
  price: number
  quantity: number
  image: string
  sku?: string
  variationId?: number
  metadata?: Record<string, any>
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "MERGE_GUEST_CART"; payload: CartItem[] }

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  mergeGuestCart: (guestItems: CartItem[]) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_CART":
      const setItems = action.payload
      return {
        ...state,
        items: setItems,
        total: calculateTotal(setItems),
        itemCount: calculateItemCount(setItems)
      }

    case "ADD_ITEM": {
      const newItem = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.wooProductId === newItem.wooProductId && 
                item.variationId === newItem.variationId
      )

      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      } else {
        // Add new item
        newItems = [...state.items, newItem]
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id })
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      }

    case "MERGE_GUEST_CART": {
      const guestItems = action.payload
      const mergedItems = [...state.items]

      // Merge guest cart items with user cart
      guestItems.forEach(guestItem => {
        const existingIndex = mergedItems.findIndex(
          item => item.wooProductId === guestItem.wooProductId &&
                  item.variationId === guestItem.variationId
        )

        if (existingIndex >= 0) {
          mergedItems[existingIndex].quantity += guestItem.quantity
        } else {
          mergedItems.push(guestItem)
        }
      })

      return {
        ...state,
        items: mergedItems,
        total: calculateTotal(mergedItems),
        itemCount: calculateItemCount(mergedItems)
      }
    }

    default:
      return state
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}

const CART_STORAGE_KEY = "horus_cart"
const GUEST_CART_KEY = "horus_guest_cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: true
  })

  // Load cart from localStorage or API
  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: "SET_LOADING", payload: true })

      try {
        if (status === "loading") return

        if (session?.user) {
          // Load user's cart from API
          await loadUserCart(session.user.id!)
          
          // Check for guest cart to merge
          const guestCart = localStorage.getItem(GUEST_CART_KEY)
          if (guestCart) {
            const guestItems: CartItem[] = JSON.parse(guestCart)
            if (guestItems.length > 0) {
              dispatch({ type: "MERGE_GUEST_CART", payload: guestItems })
              await saveUserCart(session.user.id!, [...state.items, ...guestItems])
              localStorage.removeItem(GUEST_CART_KEY)
            }
          }
        } else {
          // Load guest cart from localStorage
          const savedCart = localStorage.getItem(CART_STORAGE_KEY)
          if (savedCart) {
            const items: CartItem[] = JSON.parse(savedCart)
            dispatch({ type: "SET_CART", payload: items })
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error)
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    loadCart()
  }, [session, status])

  // Save cart when items change
  useEffect(() => {
    if (state.isLoading) return

    if (session?.user) {
      // Save to API for authenticated users
      saveUserCart(session.user.id!, state.items)
    } else {
      // Save to localStorage for guests
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    }
  }, [state.items, session])

  const loadUserCart = async (userId: string) => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`)
      if (response.ok) {
        const { items } = await response.json()
        dispatch({ type: "SET_CART", payload: items })
      }
    } catch (error) {
      console.error("Error loading user cart:", error)
    }
  }

  const saveUserCart = async (userId: string, items: CartItem[]) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, items })
      })
    } catch (error) {
      console.error("Error saving user cart:", error)
    }
  }

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const cartItem: CartItem = {
      ...item,
      id: item.id || Date.now(),
      quantity: item.quantity || 1
    }
    dispatch({ type: "ADD_ITEM", payload: cartItem })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const mergeGuestCart = (guestItems: CartItem[]) => {
    dispatch({ type: "MERGE_GUEST_CART", payload: guestItems })
  }

  const value: CartContextType = {
    ...state,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    mergeGuestCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

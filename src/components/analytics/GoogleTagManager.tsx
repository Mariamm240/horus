"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export function GoogleTagManager() {
  const pathname = usePathname()
  
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GTM_ID) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    // Load GTM script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize GTM
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_location: window.location.href,
        page_path: pathname,
        page_title: document.title
      })
    }
  }, [pathname])

  return null
}

// Analytics events helpers
export const analytics = {
  // Product view event
  productView: (product: {
    item_id: string
    item_name: string
    item_category: string
    item_brand: string
    price: number
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          currency: 'EUR',
          value: product.price,
          items: [product]
        }
      })
    }
  },

  // Add to cart event
  addToCart: (product: {
    item_id: string
    item_name: string
    item_category: string
    item_brand: string
    price: number
    quantity: number
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'EUR',
          value: product.price * product.quantity,
          items: [product]
        }
      })
    }
  },

  // Remove from cart event
  removeFromCart: (product: {
    item_id: string
    item_name: string
    item_category: string
    item_brand: string
    price: number
    quantity: number
  }) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          currency: 'EUR',
          value: product.price * product.quantity,
          items: [product]
        }
      })
    }
  },

  // Begin checkout event
  beginCheckout: (items: any[], value: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'EUR',
          value,
          items
        }
      })
    }
  },

  // Purchase event
  purchase: (transactionId: string, items: any[], value: number, shipping?: number, tax?: number) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: transactionId,
          currency: 'EUR',
          value,
          shipping: shipping || 0,
          tax: tax || 0,
          items
        }
      })
    }
  },

  // Search event
  search: (searchTerm: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'search',
        search_term: searchTerm
      })
    }
  },

  // Custom event
  customEvent: (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      })
    }
  }
}

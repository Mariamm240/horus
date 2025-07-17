"use client"

import { SWRConfig } from "swr"
import { CartProvider } from "@/contexts/CartContext"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        onError: (error, key) => {
          console.error(`SWR Error for ${key}:`, error)
        }
      }}
    >
      <CartProvider>
        {children}
      </CartProvider>
    </SWRConfig>
  )
}

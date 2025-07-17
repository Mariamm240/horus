"use client"

import useSWR from "swr"
import { WooProduct } from "@/lib/woo/wooClient"

interface ProductsResponse {
  products: WooProduct[]
  total: number
  totalPages: number
}

interface UseProductsOptions {
  page?: number
  per_page?: number
  search?: string
  category?: string
  tag?: string
  featured?: boolean
  on_sale?: boolean
  min_price?: string
  max_price?: string
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating'
  order?: 'asc' | 'desc'
}

const fetcher = async (url: string): Promise<ProductsResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

const productFetcher = async (url: string): Promise<WooProduct> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}

export function useWooProducts(options: UseProductsOptions = {}) {
  const {
    page = 1,
    per_page = 20,
    search,
    category,
    tag,
    featured,
    on_sale,
    min_price,
    max_price,
    orderby = 'date',
    order = 'desc'
  } = options

  // Build query string
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    orderby,
    order
  })

  if (search) params.append('search', search)
  if (category) params.append('category', category)
  if (tag) params.append('tag', tag)
  if (featured !== undefined) params.append('featured', featured.toString())
  if (on_sale !== undefined) params.append('on_sale', on_sale.toString())
  if (min_price) params.append('min_price', min_price)
  if (max_price) params.append('max_price', max_price)

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(
    `/api/woo/products?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
      dedupingInterval: 60000 // 1 minute
    }
  )

  return {
    products: data?.products || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    error,
    mutate
  }
}

export function useWooProduct(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<WooProduct>(
    slug ? `/api/woo/products/${slug}` : null,
    productFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 600000, // 10 minutes
      dedupingInterval: 120000 // 2 minutes
    }
  )

  return {
    product: data || null,
    isLoading,
    error,
    mutate
  }
}

export function useRelatedProducts(productId: number, limit: number = 4) {
  const { data, error, isLoading } = useSWR<WooProduct[]>(
    productId ? `/api/woo/products/${productId}/related?limit=${limit}` : null,
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch related products')
      return response.json()
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 900000 // 15 minutes
    }
  )

  return {
    relatedProducts: data || [],
    isLoading,
    error
  }
}

export function useUpsellProducts(productId: number) {
  const { data, error, isLoading } = useSWR<WooProduct[]>(
    productId ? `/api/woo/products/${productId}/upsells` : null,
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch upsell products')
      return response.json()
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 900000 // 15 minutes
    }
  )

  return {
    upsellProducts: data || [],
    isLoading,
    error
  }
}

export function useCrossSellProducts(productId: number) {
  const { data, error, isLoading } = useSWR<WooProduct[]>(
    productId ? `/api/woo/products/${productId}/cross-sells` : null,
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch cross-sell products')
      return response.json()
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 900000 // 15 minutes
    }
  )

  return {
    crossSellProducts: data || [],
    isLoading,
    error
  }
}

// Hook para categorías de productos
export function useProductCategories() {
  const { data, error, isLoading } = useSWR(
    '/api/woo/categories',
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json()
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000 // 1 hour
    }
  )

  return {
    categories: data || [],
    isLoading,
    error
  }
}

// Hook para brands/marcas (usando tags o atributos)
export function useProductBrands() {
  const { data, error, isLoading } = useSWR(
    '/api/woo/brands',
    async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch brands')
      return response.json()
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000 // 1 hour
    }
  )

  return {
    brands: data || [],
    isLoading,
    error
  }
}

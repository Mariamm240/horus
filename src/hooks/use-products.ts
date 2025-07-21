'use client'

import useSWR from 'swr'
import { ProductFilters } from './use-product-filters'

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  featured: boolean
  catalog_visibility: string
  images: {
    id: number
    src: string
    alt: string
  }[]
  categories: {
    id: number
    name: string
    slug: string
  }[]
  attributes: {
    id: number
    name: string
    options: string[]
  }[]
  meta_data: {
    key: string
    value: any
  }[]
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  subscription_available?: boolean
  brand?: string
  material?: string
  diameter?: string
  curve?: string
  color?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  totalPages: number
  currentPage: number
}

// Mock data for development
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Acuvue Oasys Diarios',
    slug: 'acuvue-oasys-diarios',
    description: 'Lentes de contacto diarios con tecnología HydraLuxe',
    short_description: 'Comodidad todo el día',
    price: '89000',
    regular_price: '89000',
    sale_price: '',
    on_sale: false,
    stock_status: 'instock',
    featured: true,
    catalog_visibility: 'visible',
    images: [{
      id: 1,
      src: '/api/placeholder/300/300',
      alt: 'Acuvue Oasys Diarios'
    }],
    categories: [{
      id: 1,
      name: 'Lentes de Contacto',
      slug: 'lentes-contacto'
    }],
    attributes: [],
    meta_data: [],
    average_rating: '4.8',
    rating_count: 124,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    subscription_available: true,
    brand: 'Acuvue',
    material: 'Hidrogel de Silicona',
    diameter: '14.3',
    curve: '8.5',
    color: 'Transparente'
  },
  {
    id: 2,
    name: 'Ray-Ban Aviator Classic',
    slug: 'ray-ban-aviator-classic',
    description: 'Gafas de sol clásicas con protección UV',
    short_description: 'Estilo atemporal',
    price: '549000',
    regular_price: '649000',
    sale_price: '549000',
    on_sale: true,
    stock_status: 'instock',
    featured: false,
    catalog_visibility: 'visible',
    images: [{
      id: 2,
      src: '/api/placeholder/300/300',
      alt: 'Ray-Ban Aviator Classic'
    }],
    categories: [{
      id: 2,
      name: 'Gafas de Sol',
      slug: 'gafas-sol'
    }],
    attributes: [],
    meta_data: [],
    average_rating: '4.9',
    rating_count: 89,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    subscription_available: false,
    brand: 'Ray-Ban',
    material: 'Metal',
    color: 'Dorado'
  },
  {
    id: 3,
    name: 'Biofinity Mensuales',
    slug: 'biofinity-mensuales',
    description: 'Lentes de contacto mensuales de alta calidad',
    short_description: 'Comodidad mensual',
    price: '156000',
    regular_price: '156000',
    sale_price: '',
    on_sale: false,
    stock_status: 'instock',
    featured: false,
    catalog_visibility: 'visible',
    images: [{
      id: 3,
      src: '/api/placeholder/300/300',
      alt: 'Biofinity Mensuales'
    }],
    categories: [{
      id: 1,
      name: 'Lentes de Contacto',
      slug: 'lentes-contacto'
    }],
    attributes: [],
    meta_data: [],
    average_rating: '4.6',
    rating_count: 203,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    subscription_available: true,
    brand: 'Biofinity',
    material: 'Hidrogel de Silicona',
    diameter: '14.0',
    curve: '8.6',
    color: 'Transparente'
  },
  {
    id: 4,
    name: 'Oakley Holbrook',
    slug: 'oakley-holbrook',
    description: 'Gafas de sol deportivas con tecnología Prizm',
    short_description: 'Rendimiento deportivo',
    price: '459000',
    regular_price: '459000',
    sale_price: '',
    on_sale: false,
    stock_status: 'instock',
    featured: true,
    catalog_visibility: 'visible',
    images: [{
      id: 4,
      src: '/api/placeholder/300/300',
      alt: 'Oakley Holbrook'
    }],
    categories: [{
      id: 2,
      name: 'Gafas de Sol',
      slug: 'gafas-sol'
    }],
    attributes: [],
    meta_data: [],
    average_rating: '4.7',
    rating_count: 67,
    related_ids: [],
    upsell_ids: [],
    cross_sell_ids: [],
    subscription_available: false,
    brand: 'Oakley',
    material: 'Acetato',
    color: 'Negro'
  }
]

const fetcher = async (url: string): Promise<ProductsResponse> => {
  // For now, return mock data
  // In production, this would make actual API calls to WooCommerce
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  
  return {
    products: MOCK_PRODUCTS,
    total: MOCK_PRODUCTS.length,
    totalPages: 1,
    currentPage: 1
  }
}

export function useProducts(filters: ProductFilters, page: number = 1, perPage: number = 12) {
  // Build query string from filters
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    orderby: filters.sortBy === 'price_asc' || filters.sortBy === 'price_desc' ? 'price' : filters.sortBy,
    order: filters.sortBy === 'price_desc' ? 'desc' : 'asc'
  })

  if (filters.category !== 'all') {
    queryParams.append('category', filters.category)
  }

  if (filters.search) {
    queryParams.append('search', filters.search)
  }

  if (filters.priceRange[0] > 0) {
    queryParams.append('min_price', filters.priceRange[0].toString())
  }

  if (filters.priceRange[1] < 1000000) {
    queryParams.append('max_price', filters.priceRange[1].toString())
  }

  // Add attribute filters
  if (filters.brands.length > 0) {
    queryParams.append('attribute', 'pa_brand')
    queryParams.append('attribute_term', filters.brands.join(','))
  }

  const cacheKey = `/api/products?${queryParams.toString()}`

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  )

  // Filter mock data based on current filters
  const filteredData = data ? {
    ...data,
    products: data.products.filter(product => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand || '')) {
        return false
      }

      // Material filter
      if (filters.materials.length > 0 && !filters.materials.includes(product.material || '')) {
        return false
      }

      // Price filter
      const price = parseInt(product.price)
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const searchableText = `${product.name} ${product.brand} ${product.description}`.toLowerCase()
        if (!searchableText.includes(searchTerm)) {
          return false
        }
      }

      return true
    })
  } : data

  return {
    data: filteredData,
    isLoading,
    error,
    mutate
  }
}
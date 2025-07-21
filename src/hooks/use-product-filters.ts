'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export interface ProductFilters {
  brands: string[]
  materials: string[]
  diameters: string[]
  curves: string[]
  colors: string[]
  priceRange: [number, number]
  sortBy: string
  category: string
  search: string
}

const DEFAULT_FILTERS: ProductFilters = {
  brands: [],
  materials: [],
  diameters: [],
  curves: [],
  colors: [],
  priceRange: [0, 1000000],
  sortBy: 'popularity',
  category: 'all',
  search: ''
}

export function useProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS)
  const [isLoading, setIsLoading] = useState(false)

  // Parse URL parameters on mount
  useEffect(() => {
    const urlFilters: Partial<ProductFilters> = {
      brands: searchParams.get('brands')?.split(',').filter(Boolean) || [],
      materials: searchParams.get('materials')?.split(',').filter(Boolean) || [],
      diameters: searchParams.get('diameters')?.split(',').filter(Boolean) || [],
      curves: searchParams.get('curves')?.split(',').filter(Boolean) || [],
      colors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
      priceRange: [
        parseInt(searchParams.get('min_price') || '0'),
        parseInt(searchParams.get('max_price') || '1000000')
      ] as [number, number],
      sortBy: searchParams.get('sort') || 'popularity',
      category: searchParams.get('category') || 'all',
      search: searchParams.get('search') || ''
    }

    setFilters(prev => ({ ...prev, ...urlFilters }))
  }, [searchParams])

  // Update URL when filters change
  const updateURL = useCallback((newFilters: ProductFilters) => {
    const params = new URLSearchParams()
    
    if (newFilters.brands.length > 0) params.set('brands', newFilters.brands.join(','))
    if (newFilters.materials.length > 0) params.set('materials', newFilters.materials.join(','))
    if (newFilters.diameters.length > 0) params.set('diameters', newFilters.diameters.join(','))
    if (newFilters.curves.length > 0) params.set('curves', newFilters.curves.join(','))
    if (newFilters.colors.length > 0) params.set('colors', newFilters.colors.join(','))
    if (newFilters.priceRange[0] > 0) params.set('min_price', newFilters.priceRange[0].toString())
    if (newFilters.priceRange[1] < 1000000) params.set('max_price', newFilters.priceRange[1].toString())
    if (newFilters.sortBy !== 'popularity') params.set('sort', newFilters.sortBy)
    if (newFilters.category !== 'all') params.set('category', newFilters.category)
    if (newFilters.search) params.set('search', newFilters.search)

    const url = params.toString() ? `?${params.toString()}` : '/productos'
    router.push(url, { scroll: false })
  }, [router])

  const updateFilters = useCallback((updates: Partial<ProductFilters>) => {
    setIsLoading(true)
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    updateURL(newFilters)
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }, [filters, updateURL])

  const toggleArrayFilter = useCallback((filterKey: keyof Pick<ProductFilters, 'brands' | 'materials' | 'diameters' | 'curves' | 'colors'>, value: string) => {
    const currentArray = filters[filterKey] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    
    updateFilters({ [filterKey]: newArray })
  }, [filters, updateFilters])

  const clearFilters = useCallback(() => {
    updateFilters(DEFAULT_FILTERS)
  }, [updateFilters])

  const getActiveFilterCount = useCallback(() => {
    let count = 0
    if (filters.brands.length > 0) count += filters.brands.length
    if (filters.materials.length > 0) count += filters.materials.length
    if (filters.diameters.length > 0) count += filters.diameters.length
    if (filters.curves.length > 0) count += filters.curves.length
    if (filters.colors.length > 0) count += filters.colors.length
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) count += 1
    if (filters.category !== 'all') count += 1
    if (filters.search) count += 1
    return count
  }, [filters])

  return {
    filters,
    updateFilters,
    toggleArrayFilter,
    clearFilters,
    getActiveFilterCount,
    isLoading
  }
}
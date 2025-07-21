'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './product-card'
import { Product } from '@/hooks/use-products'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  wishlistItems?: string[]
  className?: string
  viewMode?: 'grid' | 'list'
}

// Skeleton component for loading state
function ProductSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  return (
    <div className={cn(
      'animate-pulse bg-white rounded-2xl overflow-hidden shadow-lg',
      viewMode === 'list' ? 'flex' : ''
    )}>
      <div className={cn(
        'bg-gradient-to-br from-gray-200 to-gray-300',
        viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48'
      )} />
      
      <div className={cn(
        'p-4 space-y-3',
        viewMode === 'list' ? 'flex-1' : ''
      )}>
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

// Empty state component
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No se encontraron productos
      </h3>
      <p className="text-gray-600 max-w-md">
        Intenta ajustar tus filtros o términos de búsqueda para encontrar lo que buscas.
      </p>
    </motion.div>
  )
}

export function ProductGrid({
  products,
  isLoading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistItems = [],
  className,
  viewMode = 'grid'
}: ProductGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  if (isLoading) {
    return (
      <div className={cn(
        'grid gap-6',
        viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1',
        className
      )}>
        {[...Array(12)].map((_, index) => (
          <ProductSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className={cn('grid grid-cols-1', className)}>
        <EmptyState />
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'grid gap-6',
        viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1',
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            layout
            exit={{ opacity: 0, scale: 0.8 }}
            className={viewMode === 'list' ? 'w-full' : ''}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistItems.includes(product.id.toString())}
              className={viewMode === 'list' ? 'flex flex-row h-48' : ''}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

// Hook for infinite scroll
export function useInfiniteScroll(
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void
) {
  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])
}
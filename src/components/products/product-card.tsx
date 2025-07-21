'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { StarIcon, HeartIcon, ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'
import { Product } from '@/hooks/use-products'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isInWishlist?: boolean
  className?: string
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className
}: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const formatPrice = (price: string) => {
    const numPrice = parseInt(price)
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numPrice)
  }

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating)
    const stars = []
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="relative">
          {i <= numRating ? (
            <StarSolidIcon className="w-4 h-4 text-yellow-400" />
          ) : (
            <StarIcon className="w-4 h-4 text-gray-300" />
          )}
        </span>
      )
    }
    
    return stars
  }

  const discountPercentage = product.on_sale && product.regular_price && product.sale_price
    ? Math.round(((parseInt(product.regular_price) - parseInt(product.sale_price)) / parseInt(product.regular_price)) * 100)
    : 0

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <Link href={`/productos/${product.slug}`}>
          <div className="relative w-full h-full">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                fill
                className={cn(
                  'object-cover transition-all duration-500 group-hover:scale-110',
                  !isImageLoaded && 'opacity-0'
                )}
                onLoad={() => setIsImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <EyeIcon className="w-20 h-20 text-purple-300" />
              </div>
            )}
            
            {/* Loading skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.on_sale && discountPercentage > 0 && (
            <motion.span
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg"
            >
              -{discountPercentage}%
            </motion.span>
          )}
          
          {product.featured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-purple-500 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg"
            >
              Destacado
            </motion.span>
          )}
          
          {product.subscription_available && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg"
            >
              Suscripción
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <motion.button
            onClick={() => onToggleWishlist?.(product)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isInWishlist ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
          
          <motion.button
            onClick={() => onAddToCart?.(product)}
            className={cn(
              'w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-600 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBagIcon className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Stock Status */}
        {product.stock_status === 'outofstock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        {product.brand && (
          <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
            {product.brand}
          </span>
        )}

        {/* Name */}
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        {product.short_description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(product.average_rating)}
          </div>
          <span className="text-sm text-gray-500">
            ({product.rating_count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.on_sale && product.regular_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <motion.button
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock_status === 'outofstock'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {product.stock_status === 'outofstock' ? 'Agotado' : 'Agregar al Carrito'}
        </motion.button>
      </div>
    </motion.div>
  )
}
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  ShoppingBagIcon, 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  discount?: number
}

interface ProductListProps {
  products?: Product[]
  title?: string
  showFilters?: boolean
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lentes de Contacto Diarios',
    brand: 'Acuvue',
    price: 85000,
    originalPrice: 100000,
    image: '/api/placeholder/300/300',
    category: 'diarios',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Lentes Mensuales Premium',
    brand: 'Biofinity',
    price: 120000,
    image: '/api/placeholder/300/300',
    category: 'mensuales',
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Lentes de Color Natural',
    brand: 'FreshLook',
    price: 95000,
    originalPrice: 110000,
    image: '/api/placeholder/300/300',
    category: 'cosmeticos',
    rating: 4.6,
    reviews: 156,
    inStock: false,
    discount: 14
  }
]

const CATEGORIES = [
  { id: 'all', name: 'Todos', count: 156 },
  { id: 'diarios', name: 'Diarios', count: 45 },
  { id: 'mensuales', name: 'Mensuales', count: 67 },
  { id: 'cosmeticos', name: 'Cosméticos', count: 34 },
  { id: 'astigmatismo', name: 'Astigmatismo', count: 10 }
]

const BRANDS = [
  { id: 'acuvue', name: 'Acuvue' },
  { id: 'biofinity', name: 'Biofinity' },
  { id: 'freshlook', name: 'FreshLook' },
  { id: 'dailies', name: 'Dailies' }
]

const SORT_OPTIONS = [
  { id: 'popular', name: 'Más Popular' },
  { id: 'price-low', name: 'Precio: Menor a Mayor' },
  { id: 'price-high', name: 'Precio: Mayor a Menor' },
  { id: 'newest', name: 'Más Recientes' },
  { id: 'rating', name: 'Mejor Calificados' }
]

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      planType: 'single'
    })
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-horus-primary/10 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-horus-accent to-horus-pink text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            Nuevo
          </motion.span>
        )}
        {product.discount && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            -{product.discount}%
          </motion.span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300"
      >
        {isInWishlist(product.id) ? (
          <HeartSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick Actions Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2"
            >
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-300"
              >
                <EyeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
              
              {product.inStock && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleAddToCart}
                  className="p-3 bg-horus-primary text-white rounded-full hover:bg-horus-primary/90 transition-all duration-300"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Agotado</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        <p className="text-sm text-horus-secondary dark:text-gray-400 mb-1">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {product.inStock ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-horus-primary to-horus-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-horus-primary/25 transition-all duration-300"
          >
            Agregar al Carrito
          </motion.button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-3 rounded-xl font-semibold cursor-not-allowed"
          >
            No Disponible
          </button>
        )}
      </div>
    </motion.div>
  )
}

const FilterChip = ({ 
  label, 
  isActive, 
  onClick, 
  count 
}: { 
  label: string
  isActive: boolean
  onClick: () => void
  count?: number
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'bg-horus-primary text-white shadow-lg shadow-horus-primary/25'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {label} {count !== undefined && `(${count})`}
  </motion.button>
)

export default function ProductList({ 
  products = SAMPLE_PRODUCTS, 
  title = "Productos Destacados",
  showFilters = true 
}: ProductListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popular')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand.toLowerCase())
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return b.reviews - a.reviews
      }
    })

    return filtered
  }, [products, selectedCategory, selectedBrands, sortBy])

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Descubre nuestra selección de lentes de contacto premium
            </p>
          </div>

          {/* Sort and Mobile Filter Toggle */}
          <div className="flex items-center gap-4 mt-6 lg:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-horus-primary focus:border-transparent"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            {showFilters && (
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-horus-primary text-white rounded-lg"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                Filtros
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          {showFilters && (
            <div className="hidden lg:block w-80 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categorías
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <FilterChip
                      key={category.id}
                      label={category.name}
                      count={category.count}
                      isActive={selectedCategory === category.id}
                      onClick={() => setSelectedCategory(category.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Marcas
                </h3>
                <div className="space-y-2">
                  {BRANDS.map(brand => (
                    <FilterChip
                      key={brand.id}
                      label={brand.name}
                      isActive={selectedBrands.includes(brand.id)}
                      onClick={() => toggleBrand(brand.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredAndSortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No se encontraron productos con los filtros seleccionados.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Filtros
                    </h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* Mobile Categories */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                        Categorías
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(category => (
                          <FilterChip
                            key={category.id}
                            label={category.name}
                            count={category.count}
                            isActive={selectedCategory === category.id}
                            onClick={() => setSelectedCategory(category.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Mobile Brands */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                        Marcas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {BRANDS.map(brand => (
                          <FilterChip
                            key={brand.id}
                            label={brand.name}
                            isActive={selectedBrands.includes(brand.id)}
                            onClick={() => toggleBrand(brand.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

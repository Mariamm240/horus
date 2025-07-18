'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FunnelIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Todos los productos', 
    count: 156,
    description: 'Descubre toda nuestra colección'
  },
  { 
    id: 'diarios', 
    name: 'Lentes Diarios', 
    count: 45,
    description: 'Máxima higiene y comodidad'
  },
  { 
    id: 'mensuales', 
    name: 'Lentes Mensuales', 
    count: 32,
    description: 'Comodidad duradera'
  },
  { 
    id: 'gafas-sol', 
    name: 'Gafas de Sol', 
    count: 89,
    description: 'Estilo y protección'
  },
  { 
    id: 'monturas', 
    name: 'Monturas', 
    count: 67,
    description: 'Marcos de alta calidad'
  }
]

const PRODUCTS = [
  {
    id: 1,
    name: 'Ray-Ban Aviator Classic',
    brand: 'Ray-Ban',
    category: 'Gafas de Sol',
    price: 549000,
    originalPrice: 649000,
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Acuvue Oasys Diarios',
    brand: 'Johnson & Johnson',
    category: 'Lentes Diarios',
    price: 89000,
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isFavorite: false
  },
  {
    id: 3,
    name: 'Oakley Holbrook',
    brand: 'Oakley',
    category: 'Gafas de Sol',
    price: 459000,
    rating: 4.7,
    reviews: 67,
    isNew: false,
    isFavorite: true
  },
  {
    id: 4,
    name: 'Biofinity Mensuales',
    brand: 'CooperVision',
    category: 'Lentes Mensuales',
    price: 156000,
    rating: 4.6,
    reviews: 203,
    isNew: false,
    isFavorite: false
  }
]

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase().includes(selectedCategory.replace('-', ' '))
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Nuestros Productos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Descubre nuestra amplia gama de lentes de contacto, gafas de sol y monturas 
              de las mejores marcas del mundo
            </motion.p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  p-4 rounded-xl border-2 text-left transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                  }
                `}
              >
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{category.description}</p>
                <span className="text-xs font-medium text-purple-600">
                  {category.count} productos
                </span>
              </motion.button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Filtros</span>
              </button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-square">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <EyeIcon className="w-20 h-20 text-purple-400" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        Nuevo
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  
                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <HeartIcon className={`w-5 h-5 ${product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-600 font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.brand}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
                      <ShoppingBagIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <EyeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600">
                Prueba ajustando los filtros o términos de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nuestro equipo de expertos está aquí para ayudarte a encontrar los productos perfectos para ti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              Contactar Experto
            </Link>
            <Link
              href="/servicios"
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

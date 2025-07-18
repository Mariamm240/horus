'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  EyeIcon,
  ClockIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  ShoppingBagIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const CONTACT_LENS_CATEGORIES = [
  {
    id: 'diarios',
    name: 'Lentes Diarios',
    description: 'Máxima higiene y comodidad',
    icon: ClockIcon,
    benefits: ['Máxima higiene', 'No requiere mantenimiento', 'Ideal para uso ocasional'],
    products: 45
  },
  {
    id: 'semanales',
    name: 'Lentes Semanales',
    description: 'Equilibrio perfecto',
    icon: ShieldCheckIcon,
    benefits: ['Buena relación costo-beneficio', 'Cómodos para uso regular', 'Fácil mantenimiento'],
    products: 23
  },
  {
    id: 'mensuales',
    name: 'Lentes Mensuales',
    description: 'Comodidad duradera',
    icon: HeartIcon,
    benefits: ['Muy económicos', 'Excelente para uso diario', 'Mayor durabilidad'],
    products: 32
  }
]

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Acuvue Oasys 1-Day',
    brand: 'Johnson & Johnson',
    category: 'Diarios',
    price: 89000,
    originalPrice: 109000,
    rating: 4.9,
    reviews: 234,
    features: ['Hidratación superior', 'Protección UV', 'HydraLuxe Technology'],
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    name: 'Dailies Total 1',
    brand: 'Alcon',
    category: 'Diarios',
    price: 95000,
    rating: 4.8,
    reviews: 189,
    features: ['Gradiente de agua', 'Comodidad todo el día', 'Superficie lisa'],
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: 'Air Optix Aqua',
    brand: 'Alcon',
    category: 'Mensuales',
    price: 145000,
    rating: 4.7,
    reviews: 156,
    features: ['Transmisión de oxígeno', 'Resistente a depósitos', 'Comodidad duradera'],
    isNew: false,
    isBestseller: true
  },
  {
    id: 4,
    name: 'Biofinity',
    brand: 'CooperVision',
    category: 'Mensuales',
    price: 135000,
    rating: 4.6,
    reviews: 203,
    features: ['Silicona hidrogel', 'Retención natural de agua', 'Comodidad continua'],
    isNew: false,
    isBestseller: false
  }
]

export default function LentesContactoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const filteredProducts = FEATURED_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Lentes de Contacto
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Descubre la libertad visual con nuestra amplia gama de lentes de contacto 
              de las mejores marcas mundiales. Comodidad, calidad y tecnología avanzada.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#productos"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300"
              >
                Ver Productos
              </Link>
              <Link
                href="/examen-visual"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300"
              >
                Examen Visual
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tipos de Lentes de Contacto
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Encuentra el tipo de lente perfecto para tu estilo de vida y necesidades visuales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTACT_LENS_CATEGORIES.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <span className="text-sm text-purple-600 font-medium">
                      {category.products} productos disponibles
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300"
                  >
                    Ver {category.name}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="productos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600">
              Los lentes de contacto más populares y recomendados por nuestros especialistas
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar lentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Todos
              </button>
              {CONTACT_LENS_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    {product.isBestseller && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        Más Vendido
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
                    <HeartIcon className="w-5 h-5 text-gray-600" />
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
                  
                  <div className="space-y-2 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
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
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Horus Optic?
            </h2>
            <p className="text-lg text-gray-600">
              Más de 15 años de experiencia cuidando tu salud visual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Garantía de Calidad
              </h3>
              <p className="text-gray-600">
                Todos nuestros productos son originales y cuentan con garantía del fabricante
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Asesoría Especializada
              </h3>
              <p className="text-gray-600">
                Nuestro equipo de optómetras te ayuda a encontrar los lentes perfectos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Servicio Personalizado
              </h3>
              <p className="text-gray-600">
                Atención personalizada y seguimiento continuo de tu experiencia visual
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar tu experiencia visual?
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Agenda tu cita para un examen visual completo y encuentra los lentes de contacto perfectos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/agendar-cita"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Agendar Cita
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
            >
              Contactar Experto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

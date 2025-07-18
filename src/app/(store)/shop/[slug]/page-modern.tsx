'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CreditCardIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import ImageGallery from '@/components/ui/horus-image-gallery'
import ProductList from '@/components/ui/horus-product-list'
import Image from 'next/image'

// Datos de muestra
const SAMPLE_PRODUCT = {
  id: 'acuvue-oasys-daily',
  name: 'Acuvue Oasys 1-Day',
  brand: 'Johnson & Johnson',
  price: 85000,
  originalPrice: 100000,
  rating: 4.8,
  reviewsCount: 156,
  description: 'Los lentes de contacto Acuvue Oasys 1-Day están diseñados con la tecnología HydraLuxe, que proporciona una sensación suave y cómoda desde el primer uso hasta el final del día.',
  longDescription: 'Experimenta la comodidad excepcional con los lentes de contacto Acuvue Oasys 1-Day. Estos lentes diarios premium incorporan la innovadora tecnología HydraLuxe que mantiene la humedad durante todo el día, proporcionando una sensación de frescura desde la mañana hasta la noche.',
  inStock: true,
  stockQuantity: 45,
  category: 'diarios',
  images: [
    {
      id: '1',
      src: '/api/placeholder/800/600',
      alt: 'Acuvue Oasys 1-Day - Vista frontal',
      caption: 'Lentes de contacto diarios con tecnología HydraLuxe'
    },
    {
      id: '2',
      src: '/api/placeholder/800/600',
      alt: 'Acuvue Oasys 1-Day - Empaque',
      caption: 'Empaque de 30 unidades esterilizado'
    },
    {
      id: '3',
      src: '/api/placeholder/800/600',
      alt: 'Acuvue Oasys 1-Day - Tecnología',
      caption: 'Tecnología HydraLuxe para máxima comodidad'
    },
    {
      id: '4',
      src: '/api/placeholder/800/600',
      alt: 'Acuvue Oasys 1-Day - Protección UV',
      caption: 'Protección UV integrada Clase 1'
    }
  ],
  features: [
    'Tecnología HydraLuxe para hidratación superior',
    'Protección UV Clase 1 integrada',
    'Material de silicona hidrogel transpirable',
    'Diseño asférico para visión nítida',
    'Uso diario - máxima higiene',
    'Resistente a depósitos de proteínas'
  ],
  specifications: {
    'Material': 'Senofilcon A',
    'Contenido de agua': '38%',
    'Permeabilidad al oxígeno': '121 Dk/t',
    'Protección UV': 'Clase 1',
    'Espesor central': '0.085 mm',
    'Diámetro': '14.3 mm',
    'Curva base': '8.5 / 9.0 mm'
  },
  subscriptionOptions: [
    { 
      id: 'monthly',
      name: 'Mensual', 
      discount: 15, 
      price: 72250,
      description: 'Recibe automáticamente cada mes'
    },
    { 
      id: 'quarterly',
      name: 'Trimestral', 
      discount: 20, 
      price: 68000,
      description: 'Envío cada 3 meses con mayor descuento'
    },
    { 
      id: 'biannual',
      name: 'Semestral', 
      discount: 25, 
      price: 63750,
      description: 'Envío cada 6 meses con máximo descuento'
    }
  ],
  benefits: [
    {
      icon: <TruckIcon className="w-6 h-6" />,
      title: 'Envío Gratis',
      description: 'En pedidos superiores a $80.000'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Garantía Total',
      description: '30 días de satisfacción garantizada'
    },
    {
      icon: <ArrowPathIcon className="w-6 h-6" />,
      title: 'Cambios Fáciles',
      description: 'Política de cambios sin complicaciones'
    },
    {
      icon: <CreditCardIcon className="w-6 h-6" />,
      title: 'Pago Seguro',
      description: 'Transacciones 100% seguras'
    }
  ]
}

const RELATED_PRODUCTS = [
  {
    id: '1',
    name: 'Biofinity XR',
    brand: 'CooperVision',
    price: 95000,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 89
  },
  {
    id: '2',
    name: 'Dailies Total1',
    brand: 'Alcon',
    price: 110000,
    image: '/api/placeholder/300/300',
    rating: 4.9,
    reviews: 234
  },
  {
    id: '3',
    name: 'Air Optix Plus',
    brand: 'Alcon',
    price: 78000,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 167
  }
]

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('description')
  
  const product = SAMPLE_PRODUCT // En una app real, obtener por params.slug
  const isProductInWishlist = isInWishlist(product.id)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  }

  const getCurrentPrice = () => {
    if (selectedSubscription) {
      const subscription = product.subscriptionOptions.find(s => s.id === selectedSubscription)
      return subscription ? subscription.price : product.price
    }
    return product.price
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: getCurrentPrice(),
      image: product.images[0].src,
      planType: selectedSubscription ? 'subscription' : 'single'
    })
  }

  const handleWishlistToggle = () => {
    if (!isProductInWishlist) {
      addToWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0].src
      })
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <a href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Inicio
            </a>
            <ChevronRightIcon className="w-4 h-4" />
            <a href="/productos" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Productos
            </a>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            <ImageGallery 
              images={product.images}
              showThumbnails={true}
              showCaptions={false}
              className="rounded-2xl overflow-hidden shadow-2xl"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <p className="text-purple-600 dark:text-purple-400 font-medium text-sm uppercase tracking-wide">
                {product.brand}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-2">
                {product.name}
              </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarSolid
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-slate-600 dark:text-slate-400 font-medium">
                  {product.rating}
                </span>
              </div>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <button className="text-purple-600 dark:text-purple-400 hover:underline">
                {product.reviewsCount} reseñas
              </button>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {formatPrice(getCurrentPrice())}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {calculateDiscount() > 0 && (
                  <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    -{calculateDiscount()}%
                  </span>
                )}
              </div>
              {selectedSubscription && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Precio con suscripción {product.subscriptionOptions.find(s => s.id === selectedSubscription)?.name.toLowerCase()}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    En stock ({product.stockQuantity} disponibles)
                  </span>
                </>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Agotado
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.description}
            </p>

            {/* Subscription Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Opciones de compra
              </h3>
              
              <div className="space-y-3">
                {/* One-time purchase */}
                <label className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                  <input
                    type="radio"
                    name="purchase-type"
                    value="one-time"
                    checked={!selectedSubscription}
                    onChange={() => setSelectedSubscription(null)}
                    className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900 dark:text-white">
                        Compra única
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Compra sin compromiso
                    </p>
                  </div>
                </label>

                {/* Subscription options */}
                {product.subscriptionOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                  >
                    <input
                      type="radio"
                      name="purchase-type"
                      value={option.id}
                      checked={selectedSubscription === option.id}
                      onChange={() => setSelectedSubscription(option.id)}
                      className="w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-white">
                          Suscripción {option.name}
                        </span>
                        <div className="text-right">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {formatPrice(option.price)}
                          </span>
                          <span className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                            -{option.discount}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Cantidad:
                </span>
                <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-slate-900 dark:text-white font-medium">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  <span>Agregar al carrito</span>
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className="p-4 border border-slate-300 dark:border-slate-600 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                >
                  {isProductInWishlist ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 text-purple-600 dark:text-purple-400">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {benefit.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 lg:mt-24">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Descripción' },
                { id: 'features', label: 'Características' },
                { id: 'specifications', label: 'Especificaciones' },
                { id: 'reviews', label: 'Reseñas' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'description' && (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      {product.longDescription}
                    </p>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                        <span className="font-medium text-slate-900 dark:text-white">{key}</span>
                        <span className="text-slate-600 dark:text-slate-400">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-12">
                    <EyeIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Las reseñas se cargarán próximamente
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 lg:mt-24">
          <ProductList 
            title="Productos Relacionados"
            showFilters={false}
          />
        </div>
      </div>
    </div>
  )
}

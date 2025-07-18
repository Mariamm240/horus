'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  EyeIcon, 
  CheckIcon, 
  StarIcon,
  ArrowRightIcon,
  HeartIcon,
  SparklesIcon,
  AcademicCapIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon
} from "@heroicons/react/24/outline"
import { useState } from "react"

// Datos para la suscripción
const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Plan Básico',
    price: 129900,
    period: 'mes',
    description: 'Lentes mensuales',
    features: [
      '1 par al mes',
      'Solución de limpieza incluida',
      'Envío gratuito',
      'Soporte básico'
    ],
    popular: false,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'premium',
    name: 'Plan Premium',
    price: 179900,
    period: 'mes',
    description: 'Lentes quincenales',
    features: [
      '2 pares al mes',
      'Solución de limpieza premium',
      'Estuche de viaje gratis',
      'Soporte prioritario'
    ],
    popular: true,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'family',
    name: 'Plan Familiar',
    price: 299900,
    period: 'mes',
    description: 'Ideal para parejas o familias',
    features: [
      '4 pares de lentes al mes',
      'Personaliza cada par',
      'Descuento adicional del 10%',
      'Soporte premium 24/7'
    ],
    popular: false,
    color: 'from-pink-500 to-red-500'
  }
]

// Productos destacados
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Ray-Ban Aviator',
    category: 'Gafas de Sol',
    price: 549000,
    originalPrice: 649000,
    image: '/images/placeholder-glasses.jpg',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Oakley Holbrook',
    category: 'Gafas de Sol',
    price: 459000,
    image: '/images/placeholder-glasses.jpg',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Gucci GG0396S',
    category: 'Gafas de Sol',
    price: 1299000,
    image: '/images/placeholder-glasses.jpg',
    rating: 5.0,
    reviews: 45
  },
  {
    id: 4,
    name: 'Tom Ford FT5634-B',
    category: 'Monturas',
    price: 899000,
    image: '/images/placeholder-glasses.jpg',
    rating: 4.7,
    reviews: 67
  }
]

// Servicios
const SERVICES = [
  {
    icon: EyeIcon,
    title: 'Examen Visual Completo',
    description: 'Evaluación profesional de tu salud visual con equipos de última tecnología.'
  },
  {
    icon: UserGroupIcon,
    title: 'Adaptación de Lentes de Contacto',
    description: 'Asesoramiento personalizado para encontrar los lentes de contacto ideales para ti.'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Reparación y Mantenimiento',
    description: 'Servicio técnico especializado para el cuidado y reparación de tus gafas.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Asesoramiento Personalizado',
    description: 'Te ayudamos a elegir las monturas que mejor se adapten a tu rostro y estilo.'
  }
]

// Testimonios
const TESTIMONIALS = [
  {
    name: 'María González',
    role: 'Cliente desde 2020',
    content: 'La atención en Horus Optic es excelente. Me ayudaron a encontrar las gafas perfectas para mi rostro y estilo. Totalmente recomendado.',
    avatar: '/images/placeholder-avatar.jpg',
    rating: 5
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Cliente desde 2019',
    content: 'El examen visual fue muy profesional y detallado. Me explicaron todo el proceso y me asesoraron sobre las mejores opciones para mi caso.',
    avatar: '/images/placeholder-avatar.jpg',
    rating: 5
  },
  {
    name: 'Laura Martínez',
    role: 'Cliente desde 2021',
    content: 'Excelente servicio y variedad de productos. Los precios son competitivos y la calidad de los lentes es superior.',
    avatar: '/images/placeholder-avatar.jpg',
    rating: 5
  }
]

// Posts de Instagram simulados
const INSTAGRAM_POSTS = [
  {
    id: 1,
    username: 'maria_g',
    avatar: '/images/placeholder-avatar.jpg',
    image: '/images/placeholder-instagram.jpg',
    caption: '¡Mis nuevas gafas de sol son increíbles! Gracias @horusoptic #NuevoLook'
  },
  {
    id: 2,
    username: 'carlos_r',
    avatar: '/images/placeholder-avatar.jpg',
    image: '/images/placeholder-instagram.jpg',
    caption: 'Primera vez con lentes de contacto y la experiencia ha sido genial. ¡Gracias @horusoptic!'
  },
  {
    id: 3,
    username: 'laura_m',
    avatar: '/images/placeholder-avatar.jpg',
    image: '/images/placeholder-instagram.jpg',
    caption: 'Encontré el marco perfecto en @horusoptic. ¡Su variedad de estilos es impresionante!'
  },
  {
    id: 4,
    username: 'javier_p',
    avatar: '/images/placeholder-avatar.jpg',
    image: '/images/placeholder-instagram.jpg',
    caption: 'Examen visual completo en @horusoptic. ¡Gracias por cuidar mi salud visual!'
  }
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    // Aquí iría la lógica para enviar el formulario
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Cuida tu visión con
                <span className="block text-transparent bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text">
                  Horus Optic
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-purple-100 mb-8">
                Descubre nuestra colección exclusiva de lentes y monturas de las mejores marcas. 
                Ofrecemos exámenes visuales profesionales y asesoramiento personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#productos"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg text-center"
                >
                  Ver Catálogo
                </Link>
                <Link
                  href="#contacto"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300 text-center"
                >
                  Agendar Cita
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
                  <EyeIcon className="w-32 h-32 text-white/70" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Planes de Suscripción */}
      <section id="suscripcion" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Planes de Suscripción
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades y mantén tu visión siempre perfecta
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUBSCRIPTION_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  plan.popular ? 'border-purple-500 scale-105' : 'border-gray-200'
                } overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
                    Más Popular
                  </div>
                )}
                
                <div className="p-8 pt-12">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center`}>
                    <EyeIcon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:-translate-y-1'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Seleccionar Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="productos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra selección de las mejores marcas en gafas de sol y monturas
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <EyeIcon className="w-20 h-20 text-purple-400" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <HeartIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
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
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
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
                    <Link
                      href={`/productos/${product.id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
                    >
                      Ver más
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/tienda"
              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-300 inline-flex items-center"
            >
              Ver Todos los Productos
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Te ofrecemos una atención integral para el cuidado de tu salud visual
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-purple-200" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-purple-100">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/servicios"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 inline-flex items-center"
            >
              Ver Todos los Servicios
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 1000 clientes satisfechos confían en Horus Optic para su salud visual
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              #HorusOpticExperience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comparte tu experiencia y únete a nuestra comunidad en Instagram
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTAGRAM_POSTS.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square relative">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <SparklesIcon className="w-16 h-16 text-purple-400" />
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-xs">
                        {post.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      @{post.username}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    {post.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="https://instagram.com/horusoptic"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Síguenos en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Contáctanos
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Ponte en contacto con nosotros.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <p className="text-gray-300">+57 (1) 234-5678</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">info@horusoptic.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dirección</h3>
                    <p className="text-gray-300">Carrera 15 #93-47, Bogotá</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <ClockIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horarios</h3>
                    <p className="text-gray-300">Lun - Vie: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-300">Sáb: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+57 (1) 234-5678"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para mejorar tu visión?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Únete a miles de clientes satisfechos y descubre la diferencia Horus Optic
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tienda"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/cita"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
            >
              Agendar Examen Visual
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

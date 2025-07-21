'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  StarIcon,
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: 'María González',
    rating: 5,
    date: 'Hace 2 semanas',
    review: 'Excelente atención al cliente. Me ayudaron a encontrar las gafas perfectas para mi rostro y necesidades visuales. El personal es muy profesional y conocedor. Definitivamente volveré para mi próxima compra.',
    verified: true
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    rating: 5,
    date: 'Hace 1 mes',
    review: 'Las mejores gafas que he tenido. La calidad es excepcional y el servicio fue personalizado. Me explicaron todas las opciones disponibles y me ayudaron a tomar la mejor decisión. Muy recomendable.',
    verified: true
  },
  {
    id: 3,
    name: 'Ana Martínez',
    rating: 4,
    date: 'Hace 3 semanas',
    review: 'Buena experiencia en general. El personal es amable y las gafas son de buena calidad. El único inconveniente fue que tuve que esperar un poco más de lo esperado para recibir mis lentes graduados.',
    verified: true
  },
  {
    id: 4,
    name: 'Diego López',
    rating: 5,
    date: 'Hace 1 semana',
    review: 'Increíble servicio y productos de primera calidad. Me encantaron las opciones disponibles y la asesoría profesional. Las gafas me quedaron perfectas y la graduación es exacta. Totalmente recomendado.',
    verified: true
  },
  {
    id: 5,
    name: 'Sofía Herrera',
    rating: 5,
    date: 'Hace 4 días',
    review: 'Excelente experiencia desde el momento en que entré a la tienda. El personal es muy atento y profesional. Me ayudaron a encontrar unas gafas que se adaptan perfectamente a mi estilo y necesidades. Muy satisfecha con mi compra.',
    verified: true
  },
  {
    id: 6,
    name: 'Roberto Silva',
    rating: 4,
    date: 'Hace 2 meses',
    review: 'Buen servicio y variedad de productos. Las gafas son de buena calidad y el precio es justo. El personal es amable y conocedor. Recomendaría esta óptica a mis amigos y familiares.',
    verified: true
  }
]

const INSTAGRAM_REELS = [
  {
    id: 1,
    title: 'Transformación con nuevas gafas',
    description: 'Mira cómo María cambió completamente su look',
    thumbnail: '/api/placeholder/300/400',
    views: '2.3K',
    likes: '156'
  },
  {
    id: 2,
    title: 'Proceso de adaptación de lentes',
    description: 'Conoce paso a paso nuestro proceso',
    thumbnail: '/api/placeholder/300/400',
    views: '1.8K',
    likes: '89'
  },
  {
    id: 3,
    title: 'Nuevas monturas de temporada',
    description: 'Descubre las últimas tendencias',
    thumbnail: '/api/placeholder/300/400',
    views: '3.1K',
    likes: '234'
  },
  {
    id: 4,
    title: 'Examen visual completo',
    description: 'La importancia de cuidar tu visión',
    thumbnail: '/api/placeholder/300/400',
    views: '1.5K',
    likes: '67'
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Carolina Ramírez',
    location: 'Bogotá',
    service: 'Examen Visual Completo',
    rating: 5,
    testimonial: 'El examen visual fue muy completo y el optómetra me explicó detalladamente mi condición. Excelente servicio.',
    image: '/api/placeholder/80/80'
  },
  {
    id: 2,
    name: 'Andrés Martínez',
    location: 'Medellín',
    service: 'Terapia Visual',
    rating: 5,
    testimonial: 'La terapia visual ha mejorado significativamente mi problema de convergencia. Muy profesionales.',
    image: '/api/placeholder/80/80'
  },
  {
    id: 3,
    name: 'Valentina Gómez',
    location: 'Cali',
    service: 'Optometría Pediátrica',
    rating: 5,
    testimonial: 'Mi hijo de 6 años fue atendido en optometría pediátrica. El trato fue excelente y muy paciente.',
    image: '/api/placeholder/80/80'
  }
]

export default function TestimoniosPage() {
  const averageRating = 4.8
  const totalReviews = 128

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIconSolid
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

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
              Testimonios
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Descubre lo que nuestros clientes comparten sobre sus experiencias
            </motion.p>
          </div>
        </div>
      </div>

      {/* Instagram Reels Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reels de Instagram
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Descubre lo que nuestros clientes comparten sobre sus experiencias
            </p>
            <Link
              href="https://instagram.com/horusoptic"
              target="_blank"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Seguirnos
              <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTAGRAM_REELS.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayIcon className="w-16 h-16 text-white bg-black/50 rounded-full p-4 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-sm mb-1">{reel.title}</h3>
                    <p className="text-white/80 text-xs">{reel.description}</p>
                    <div className="flex items-center justify-between mt-2 text-white/90 text-xs">
                      <span>{reel.views} visualizaciones</span>
                      <span>❤️ {reel.likes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Reviews Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reseñas de Google
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Lo que nuestros clientes opinan sobre nuestros servicios
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center bg-white rounded-2xl px-8 py-4 shadow-lg">
                <div className="flex items-center mr-4">
                  {renderStars(5)}
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-900">{averageRating}</div>
                  <div className="text-sm text-gray-600">({totalReviews} reseñas)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GOOGLE_REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <UserCircleIcon className="w-12 h-12 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      {review.verified && (
                        <CheckBadgeIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-600 leading-relaxed">{review.review}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="https://g.page/r/horusoptic/review"
              target="_blank"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Ver todas las reseñas en Google
              <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Share Experience Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-white"
          >
            <HeartIcon className="w-16 h-16 mx-auto mb-6 text-pink-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comparte tu experiencia
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Nos encantaría conocer tu opinión sobre nuestros productos y servicios
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <ChatBubbleLeftEllipsisIcon className="w-12 h-12 mx-auto mb-4 text-pink-200" />
                <h3 className="text-lg font-semibold mb-2">Ayuda a otros clientes</h3>
                <p className="text-purple-100 text-sm">
                  Tu opinión puede ayudar a otros a tomar mejores decisiones sobre sus necesidades visuales.
                </p>
              </div>
              
              <div className="text-center">
                <StarIcon className="w-12 h-12 mx-auto mb-4 text-pink-200" />
                <h3 className="text-lg font-semibold mb-2">Mejoramos con tu feedback</h3>
                <p className="text-purple-100 text-sm">
                  Tus comentarios nos ayudan a mejorar constantemente nuestros productos y servicios.
                </p>
              </div>
              
              <div className="text-center">
                <HeartIcon className="w-12 h-12 mx-auto mb-4 text-pink-200" />
                <h3 className="text-lg font-semibold mb-2">Obtén beneficios exclusivos</h3>
                <p className="text-purple-100 text-sm">
                  Al compartir tu experiencia, podrías recibir descuentos especiales en tu próxima compra.
                </p>
              </div>
            </div>
            
            <Link
              href="/contacto"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 inline-block"
            >
              Deja tu testimonio
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
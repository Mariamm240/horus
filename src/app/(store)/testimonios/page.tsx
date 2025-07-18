import type { Metadata } from "next"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Star, Quote, ThumbsUp, Heart, Award } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Testimonios de Clientes | Horus Optic",
  description: "Descubre lo que nuestros clientes satisfechos dicen sobre Horus Optic. Testimonios reales de personas que confían en nosotros para su cuidado visual.",
}

const testimonials = [
  {
    id: 1,
    name: "María González",
    location: "Madrid",
    rating: 5,
    image: "/api/placeholder/80/80",
    text: "Llevo años comprando mis lentes en Horus Optic y nunca me han decepcionado. La calidad es excepcional y el servicio al cliente es perfecto. Mi óptica de confianza sin duda.",
    product: "Acuvue Oasys 1-Day",
    verified: true,
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    location: "Barcelona",
    rating: 5,
    image: "/api/placeholder/80/80",
    text: "La suscripción mensual me cambió la vida. Ya no tengo que preocuparme de quedarme sin lentes. Llegan a tiempo perfecto y puedo pausar cuando voy de vacaciones.",
    product: "Suscripción Biofinity",
    verified: true,
    date: "Hace 1 mes"
  },
  {
    id: 3,
    name: "Ana Martín",
    location: "Valencia",
    rating: 5,
    image: "/api/placeholder/80/80",
    text: "El examen de la vista fue muy completo y profesional. Me ayudaron a encontrar los lentes perfectos para mi astigmatismo. Precio muy competitivo también.",
    product: "Consulta + Air Optix Toric",
    verified: true,
    date: "Hace 3 semanas"
  },
  {
    id: 4,
    name: "Pedro López",
    location: "Sevilla",
    rating: 5,
    image: "/api/placeholder/80/80",
    text: "Envío súper rápido y empaquetado perfecto. Los lentes llegaron en perfectas condiciones y el precio es mucho mejor que en mi óptica local.",
    product: "Dailies Total 1",
    verified: true,
    date: "Hace 1 semana"
  },
  {
    id: 5,
    name: "Laura Fernández",
    location: "Bilbao",
    rating: 5,
    image: "/api/placeholder/80/80",
    text: "Servicio al cliente excepcional. Tuve un problema con mi pedido y lo resolvieron inmediatamente. Muy profesionales y amables en todo momento.",
    product: "Acuvue Vita",
    verified: true,
    date: "Hace 4 días"
  },
  {
    id: 6,
    name: "Javier Moreno",
    location: "Zaragoza",
    rating: 5,
    image: "/api/placeholder/80/80",
    text: "Me encanta poder comparar precios y productos fácilmente en su web. La información es muy clara y las reseñas me ayudaron mucho a decidir.",
    product: "Biofinity XR",
    verified: true,
    date: "Hace 5 días"
  }
]

const stats = [
  { value: "4.9/5", label: "Valoración media", icon: Star },
  { value: "5,000+", label: "Clientes satisfechos", icon: ThumbsUp },
  { value: "98%", label: "Recomiendan Horus Optic", icon: Heart },
  { value: "24h", label: "Tiempo de respuesta", icon: Award }
]

const videoTestimonials = [
  {
    id: 1,
    name: "Sandra Jiménez",
    title: "Cliente desde 2019",
    thumbnail: "/api/placeholder/300/200",
    duration: "2:15"
  },
  {
    id: 2,
    name: "Miguel Ángel Torres",
    title: "Suscriptor Premium",
    thumbnail: "/api/placeholder/300/200",
    duration: "1:45"
  },
  {
    id: 3,
    name: "Carmen Delgado",
    title: "Madre de familia",
    thumbnail: "/api/placeholder/300/200",
    duration: "3:02"
  }
]

const awards = [
  {
    title: "Mejor Óptica Online 2024",
    organization: "Premio E-commerce España",
    image: "/api/placeholder/100/100"
  },
  {
    title: "Excelencia en Servicio al Cliente",
    organization: "Asociación de Ópticos",
    image: "/api/placeholder/100/100"
  },
  {
    title: "Empresa Responsable 2023",
    organization: "Certificación ECO",
    image: "/api/placeholder/100/100"
  }
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            {testimonial.verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                ✓ Verificado
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.date}</p>
          <div className="flex items-center mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      
      <blockquote className="text-gray-700 mb-4 italic">
        <Quote className="w-4 h-4 text-gray-300 inline mr-1" />
        {testimonial.text}
      </blockquote>
      
      <div className="text-sm text-primary font-medium">
        Producto: {testimonial.product}
      </div>
    </div>
  )
}

export default function TestimoniosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Stats */}
      <SectionWrapper background="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Featured Testimonials */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Testimonios Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experiencias reales de clientes que han encontrado en Horus Optic la solución perfecta para su cuidado visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Ver Más Testimonios
          </button>
        </div>
      </SectionWrapper>

      {/* Video Testimonials */}
      <SectionWrapper background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Testimonios en Video
          </h2>
          <p className="text-xl text-gray-600">
            Escucha directamente de nuestros clientes sus experiencias con Horus Optic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoTestimonials.map((video) => (
            <div
              key={video.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="relative aspect-video bg-gray-200">
                <Image
                  src={video.thumbnail}
                  alt={video.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-primary border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{video.name}</h3>
                <p className="text-sm text-gray-600">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Awards & Recognition */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Reconocimientos
          </h2>
          <p className="text-xl text-gray-600">
            Premios y certificaciones que avalan nuestro compromiso con la excelencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {award.title}
              </h3>
              <p className="text-gray-600">
                {award.organization}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Reviews Summary */}
      <SectionWrapper background="gray">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Resumen de Valoraciones
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-3xl font-bold text-gray-900">4.9</span>
                <span className="text-gray-600">de 5 estrellas</span>
              </div>
              <p className="text-gray-600">Basado en 1,247 reseñas verificadas</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage = stars === 5 ? 78 : stars === 4 ? 18 : stars === 3 ? 3 : stars === 2 ? 1 : 0
                return (
                  <div key={stars} className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10 text-right">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper background="primary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Quieres formar parte de nuestra familia?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Únete a miles de clientes satisfechos que han encontrado en Horus Optic la mejor solución para su cuidado visual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Comenzar Ahora
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-white">
              Ver Productos
            </button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HeroSectionPremium } from "@/components/ui/horus-hero-section"
import { FeatureGrid } from "@/components/ui/horus-feature-grid"
import ProductList from "@/components/ui/horus-product-list"
import ImageGallery from "@/components/ui/horus-image-gallery"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRightIcon, 
  CheckIcon, 
  StarIcon, 
  TruckIcon, 
  CreditCardIcon, 
  EyeIcon,
  ShieldCheckIcon,
  ClockIcon,
  SparklesIcon
} from "@heroicons/react/24/outline"

const features = [
  {
    icon: <EyeIcon className="h-6 w-6" />,
    title: "Visión Premium",
    description: "Los lentes de contacto más avanzados del mercado con tecnología de última generación para máxima comodidad.",
    highlight: true
  },
  {
    icon: <TruckIcon className="h-6 w-6" />,
    title: "Envío Express",
    description: "Entrega gratuita en 24-48h a toda España. Nunca te quedarás sin lentes."
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: "Garantía Total",
    description: "100% garantía de satisfacción. Si no estás contento, te devolvemos el dinero."
  },
  {
    icon: <ClockIcon className="h-6 w-6" />,
    title: "Suscripción Inteligente",
    description: "Recibe tus lentes automáticamente cuando los necesites. Pausa o cancela cuando quieras."
  },
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    title: "Calidad Premium",
    description: "Solo trabajamos con las mejores marcas: Acuvue, Biofinity, Dailies y más."
  },
  {
    icon: <CreditCardIcon className="h-6 w-6" />,
    title: "Pago Seguro",
    description: "Pagos 100% seguros con cifrado SSL. Acepta tarjetas, PayPal y transferencias."
  }
]

const testimonials = [
  {
    content: "Llevo años usando Horus Optic y nunca me han fallado. La suscripción es perfecta.",
    author: "María González",
    location: "Madrid",
    rating: 5
  },
  {
    content: "Calidad excepcional y entrega súper rápida. Muy recomendable.",
    author: "Carlos Ruiz", 
    location: "Barcelona",
    rating: 5
  },
  {
    content: "El mejor servicio de lentes online. Precios competitivos y atención al cliente top.",
    author: "Ana Martín",
    location: "Valencia", 
    rating: 5
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Premium */}
      <HeroSectionPremium
        subtitle="✨ Nueva colección 2025"
        title="Visión perfecta, comodidad total"
        description="Descubre nuestra selección premium de lentes de contacto con planes de suscripción personalizados. Nunca más te quedes sin lentes."
        showFloatingLens={true}
      >
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 rounded-xl ripple"
        >
          <Link href="/productos">
            Explorar Tienda
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 rounded-xl"
        >
          <Link href="/servicios">
            Ver Suscripciones
          </Link>
        </Button>
      </HeroSectionPremium>

      {/* Feature Grid */}
      <FeatureGrid
        title="¿Por qué elegir Horus Optic?"
        description="Somos la primera óptica online especializada en lentes de contacto premium con suscripciones personalizadas"
        features={features}
        columns={3}
        className="bg-muted/50"
      />

      {/* Products Preview */}
      <ProductList 
        title="Productos Destacados"
        showFilters={false}
      />

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4"
            >
              Nuestra Tecnología
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Descubre la innovación detrás de nuestros lentes de contacto premium
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <ImageGallery 
              images={[
                {
                  id: '1',
                  src: '/api/placeholder/800/600',
                  alt: 'Tecnología HydraLuxe',
                  caption: 'Tecnología HydraLuxe para máxima comodidad durante todo el día'
                },
                {
                  id: '2',
                  src: '/api/placeholder/800/600',
                  alt: 'Protección UV avanzada',
                  caption: 'Protección UV integrada para cuidar tus ojos'
                },
                {
                  id: '3',
                  src: '/api/placeholder/800/600',
                  alt: 'Material premium',
                  caption: 'Materiales de silicona hidrogel de última generación'
                }
              ]}
              autoPlay={true}
              autoPlayInterval={4000}
              showThumbnails={true}
              showCaptions={true}
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
            >
              Lo que dicen nuestros clientes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-slate-600 dark:text-slate-400"
            >
              Más de 5,000 clientes satisfechos confían en nosotros
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/api/placeholder/600/400')] opacity-10 mix-blend-overlay"></div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative text-3xl font-bold text-white sm:text-4xl"
            >
              Suscríbete a nuestra newsletter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative mt-4 text-lg text-purple-100"
            >
              Recibe ofertas exclusivas y consejos de cuidado visual
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input 
                type="email" 
                placeholder="tu@email.com" 
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-purple-200"
              />
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                Suscribirse
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
            >
              ¿Listo para una visión perfecta?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-white/90 max-w-2xl mx-auto"
            >
              Únete a miles de clientes satisfechos. Obtén descuentos exclusivos y ofertas especiales.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold whitespace-nowrap">
                Suscribirse
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HeroSectionPremium } from "@/components/ui/horus-hero-section"
import { FeatureGrid } from "@/components/ui/horus-feature-grid"
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
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Productos Destacados
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Los lentes más populares entre nuestros clientes
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group hover:shadow-horus-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-horus-soft relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-muted-foreground">Producto {i}</span>
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      Más vendido
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Acuvue Oasys 1-Day
                    </CardTitle>
                    <CardDescription>
                      Lentes diarios con tecnología HydraLuxe
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary">€29.99</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">€34.99</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <StarIcon key={j} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-1 text-sm text-muted-foreground">(156)</span>
                      </div>
                    </div>
                    <Button className="w-full ripple">
                      Añadir al carrito
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/productos">
                Ver todos los productos
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Lo que dicen nuestros clientes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground"
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
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
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
          <div className="rounded-3xl bg-gradient-horus p-8 sm:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white sm:text-4xl"
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

      {/* Subscription Plans */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-base mb-4">
              Lentes por suscripción
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Elige el plan perfecto para ti. Entrega automática, precios preferenciales 
              y la comodidad de nunca quedarte sin lentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="relative hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Plan Básico</CardTitle>
                  <Badge variant="secondary">Más popular</Badge>
                </div>
                <CardDescription>Perfecto para uso diario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-base mb-4">
                  $29
                  <span className="text-base font-normal text-secondary">/mes</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">30 lentes diarios por mes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Envío gratuito</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Cancela cuando quieras</span>
                  </li>
                </ul>
                <Button className="w-full">Elegir Plan</Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative hover:shadow-lg transition-shadow duration-300 border-primary">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge variant="default">Recomendado</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Plan Premium</CardTitle>
                <CardDescription>Para usuarios frecuentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-base mb-4">
                  $49
                  <span className="text-base font-normal text-secondary">/mes</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">60 lentes diarios por mes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Envío express gratuito</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Soporte prioritario 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Descuentos en productos adicionales</span>
                  </li>
                </ul>
                <Button className="w-full">Elegir Plan</Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Plan Profesional</CardTitle>
                <CardDescription>Máxima flexibilidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text-base mb-4">
                  $79
                  <span className="text-base font-normal text-secondary">/mes</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">90 lentes diarios por mes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Mezcla de tipos de lentes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Consultas gratuitas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm text-secondary">Reposiciones de emergencia</span>
                  </li>
                </ul>
                <Button className="w-full">Elegir Plan</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-base mb-2">Envío Gratuito</h3>
              <p className="text-secondary">
                Recibe tus lentes en casa sin costo adicional. Entrega en 24-48 horas.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <CreditCardIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-base mb-2">Sin Compromisos</h3>
              <p className="text-secondary">
                Cancela o modifica tu suscripción en cualquier momento desde tu cuenta.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <EyeIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-base mb-2">Calidad Garantizada</h3>
              <p className="text-secondary">
                Solo trabajamos con las mejores marcas. Garantía de satisfacción 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-base mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Miles de personas confían en Horus Optic para su salud visual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary mb-4">
                  &ldquo;El servicio de suscripción es increíble. Nunca más me he quedado sin lentes 
                  y el precio es muy competitivo. Lo recomiendo totalmente.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-text-base">María González</p>
                    <p className="text-sm text-secondary">Cliente desde 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary mb-4">
                  &ldquo;La calidad de los lentes es excelente y el envío es súper rápido. 
                  El plan premium me ha ahorrado mucho dinero.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-text-base">Carlos Ruiz</p>
                    <p className="text-sm text-secondary">Cliente desde 2022</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary mb-4">
                  &ldquo;Atención al cliente excepcional. Resolvieron todas mis dudas rápidamente 
                  y me ayudaron a elegir el plan perfecto.&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-text-base">Ana López</p>
                    <p className="text-sm text-secondary">Cliente desde 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent px-4">
        <div className="container max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mantente informado
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Recibe ofertas exclusivas, consejos de cuidado visual y noticias 
            sobre nuevos productos directamente en tu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button variant="accent" className="bg-white text-primary hover:bg-white/90">
              Suscribirse
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            No spam, solo contenido valioso. Cancela cuando quieras.
          </p>
        </div>
      </section>
    </div>
  )
}

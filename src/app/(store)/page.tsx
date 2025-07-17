import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, CheckIcon, StarIcon, TruckIcon, CreditCardIcon, EyeIcon } from "@heroicons/react/24/outline"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent min-h-[80vh] flex items-center">
        <div className="container max-w-7xl mx-auto px-4 text-center text-white">
          <Badge variant="accent" className="mb-6">
            ✨ Nueva colección 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Visión perfecta,
            <br />
            comodidad total
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Descubre nuestra selección premium de lentes de contacto con planes de suscripción 
            personalizados. Nunca más te quedes sin lentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button size="lg" variant="accent" className="text-primary bg-white hover:bg-white/90">
                Explorar Tienda
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Ver Suscripciones
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

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

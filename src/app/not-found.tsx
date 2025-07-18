import Link from "next/link"
import { EyeIcon, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-md mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8">
          <EyeIcon className="w-24 h-24 mx-auto text-accent mb-4" />
          <span className="text-3xl font-bold">Horus Optic</span>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">
            Página no encontrada
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Pero no te preocupes, te ayudamos a encontrar lo que necesitas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-purple-900 px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Ir al Inicio
          </Link>
          <Link
            href="/lentes-de-contacto"
            className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 text-white"
          >
            Ver Productos
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-purple-100 mb-4">Enlaces útiles:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/servicios" className="text-accent hover:text-accent/80 underline">
              Servicios
            </Link>
            <Link href="/sobre-nosotros" className="text-accent hover:text-accent/80 underline">
              Sobre Nosotros
            </Link>
            <Link href="/contacto" className="text-accent hover:text-accent/80 underline">
              Contacto
            </Link>
            <Link href="/carrito" className="text-accent hover:text-accent/80 underline">
              Mi Carrito
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-purple-100 mb-2">
            ¿Necesitas ayuda?
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a 
              href="mailto:info@horusoptic.com" 
              className="text-accent hover:text-accent/80 underline"
            >
              Email
            </a>
            <a 
              href="tel:+34123456789" 
              className="text-accent hover:text-accent/80 underline"
            >
              Teléfono
            </a>
            <a 
              href="https://wa.me/34123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

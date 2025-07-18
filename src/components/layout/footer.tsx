"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Phone, MessageCircle } from "lucide-react"
import { toast } from "sonner"

const quickLinks = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Lentes de contacto", href: "/lentes-de-contacto" },
  { name: "Servicios", href: "/servicios" },
  { name: "Testimonios", href: "/testimonios" },
  { name: "Contacto", href: "/contacto" }
]

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/horusoptic",
    icon: Instagram
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/34123456789",
    icon: MessageCircle
  },
  {
    name: "Teléfono",
    href: "tel:+34123456789",
    icon: Phone
  }
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Por favor introduce tu email")
      return
    }

    setIsSubmitting(true)
    
    try {
      // TODO: Implement newsletter subscription API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success("¡Te has suscrito al newsletter!")
      setEmail("")
    } catch {
      toast.error("Error al suscribirse. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-accent">
                Horus Optic
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Tu óptica de confianza especializada en lentes de contacto premium. 
              Cuidamos tu visión con la mejor calidad y servicio personalizado.
            </p>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Suscríbete a nuestro newsletter
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Recibe ofertas exclusivas y consejos de cuidado ocular
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {isSubmitting ? "..." : "Suscribirse"}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-4">
              <p className="text-gray-300">
                <strong>Email:</strong><br />
                <a href="mailto:info@horusoptic.com" className="hover:text-accent transition-colors">
                  info@horusoptic.com
                </a>
              </p>
              
              <p className="text-gray-300">
                <strong>Teléfono:</strong><br />
                <a href="tel:+34123456789" className="hover:text-accent transition-colors">
                  +34 123 456 789
                </a>
              </p>

              {/* Social Links */}
              <div>
                <h4 className="font-medium mb-2">Síguenos</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors"
                        aria-label={social.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Horus Optic. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/privacidad" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, User } from "lucide-react"
import { MobileNav } from "@/components/ui/mobile-nav"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Lentes de contacto", href: "/lentes-de-contacto" },
  { name: "Servicios", href: "/servicios" },
  { name: "Testimonios", href: "/testimonios" },
  { name: "Contacto", href: "/contacto" }
]

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  // TODO: Replace with actual cart count from context/state
  const cartItemsCount = 3

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary">
                  Horus Optic
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Login Button - Desktop */}
              <Link
                href="/login"
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Iniciar sesión</span>
              </Link>

              {/* Cart */}
              <Link
                href="/carrito"
                className="relative p-2 text-gray-700 hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={navigation.map(item => ({ href: item.href, label: item.name }))}
      />
    </>
  )
}

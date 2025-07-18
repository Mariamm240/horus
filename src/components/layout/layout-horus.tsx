"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { 
  ShoppingCartIcon as CartSolid,
  HeartIcon as HeartSolid 
} from '@heroicons/react/24/solid'

interface LayoutHorusProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos' },
  { name: 'Lentes de contacto', href: '/lentes-de-contacto' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Testimonios', href: '/testimonios' },
  { name: 'Contacto', href: '/contacto' },
]

export function LayoutHorus({ children }: LayoutHorusProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const pathname = usePathname()
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link focus-visible">
        Saltar al contenido
      </a>
      
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass shadow-horus py-2' 
            : 'bg-background/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-horus"></div>
              <span className="text-xl font-bold text-foreground">
                Horus Optic
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
                aria-label="Cambiar tema"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
              
              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                className="relative p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
                aria-label={`Lista de deseos (${wishlist.count} productos)`}
              >
                {wishlist.count > 0 ? (
                  <HeartSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                {wishlist.count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center pulse-scale"
                  >
                    {wishlist.count}
                  </motion.span>
                )}
              </Link>
              
              {/* Cart */}
              <Link 
                href="/carrito" 
                className="relative p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
                aria-label={`Carrito (${cart.itemCount} productos)`}
              >
                {cart.itemCount > 0 ? (
                  <CartSolid className="h-5 w-5 text-primary" />
                ) : (
                  <ShoppingCartIcon className="h-5 w-5" />
                )}
                {cart.itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-white flex items-center justify-center pulse-scale"
                  >
                    {cart.itemCount}
                  </motion.span>
                )}
              </Link>
              
              {/* User */}
              <Link 
                href="/cuenta" 
                className="p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
                aria-label="Mi cuenta"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden"
          >
            <div className="glass border-t border-border mx-4 rounded-xl shadow-horus-lg">
              <div className="p-4 space-y-4">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-primary text-white'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile Actions */}
                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-4 gap-4">
                    {/* Theme Toggle */}
                    <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
                    >
                      {theme === 'dark' ? (
                        <SunIcon className="h-5 w-5" />
                      ) : (
                        <MoonIcon className="h-5 w-5" />
                      )}
                      <span className="text-xs">Tema</span>
                    </button>
                    
                    {/* Wishlist */}
                    <Link 
                      href="/wishlist" 
                      className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-colors focus-visible relative"
                    >
                      {wishlist.count > 0 ? (
                        <HeartSolid className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                      <span className="text-xs">Favoritos</span>
                      {wishlist.count > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center">
                          {wishlist.count}
                        </span>
                      )}
                    </Link>
                    
                    {/* Cart */}
                    <Link 
                      href="/carrito" 
                      className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-colors focus-visible relative"
                    >
                      {cart.itemCount > 0 ? (
                        <CartSolid className="h-5 w-5 text-primary" />
                      ) : (
                        <ShoppingCartIcon className="h-5 w-5" />
                      )}
                      <span className="text-xs">Carrito</span>
                      {cart.itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs font-medium text-white flex items-center justify-center">
                          {cart.itemCount}
                        </span>
                      )}
                    </Link>
                    
                    {/* User */}
                    <Link 
                      href="/cuenta" 
                      className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted transition-colors focus-visible"
                    >
                      <UserIcon className="h-5 w-5" />
                      <span className="text-xs">Cuenta</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main id="main-content" className="pt-20">
        {children}
      </main>
      
      {/* Minimal Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded bg-gradient-horus"></div>
                <span className="text-lg font-bold text-foreground">Horus Optic</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Óptica premium especializada en lentes de contacto y suscripciones personalizadas.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Enlaces rápidos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/productos" className="hover:text-primary transition-colors">Productos</Link></li>
                <li><Link href="/lentes-de-contacto" className="hover:text-primary transition-colors">Lentes</Link></li>
                <li><Link href="/servicios" className="hover:text-primary transition-colors">Servicios</Link></li>
                <li><Link href="/testimonios" className="hover:text-primary transition-colors">Testimonios</Link></li>
              </ul>
            </div>
            
            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Soporte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/envios" className="hover:text-primary transition-colors">Envíos</Link></li>
                <li><Link href="/devoluciones" className="hover:text-primary transition-colors">Devoluciones</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacidad" className="hover:text-primary transition-colors">Privacidad</Link></li>
                <li><Link href="/terminos" className="hover:text-primary transition-colors">Términos</Link></li>
                <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Horus Optic. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

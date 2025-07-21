'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  PhoneIcon,
  ClockIcon,
  TruckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/solid'
import { mainNavigation, topBarInfo } from '@/data/menu'
import MegaMenu from './mega-menu'
import MobileNav from './mobile-nav'
import { Fragment } from 'react'

// Hook temporal del carrito sin Firebase
function useCart() {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    // Simular carga del carrito local
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      setItems(JSON.parse(localCart))
    }
  }, [])
  
  return { items }
}

export default function HeaderHorus({ onContactoClick }: { onContactoClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()
  const itemCount = items.length

  // Detectar scroll para cambiar la opacidad del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hotkey para abrir búsqueda (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const searchResults = [
    { id: 1, name: 'Ray-Ban Aviator', category: 'Gafas de Sol', url: '/productos/ray-ban-aviator' },
    { id: 2, name: 'Lentes de contacto diarios', category: 'Lentes de Contacto', url: '/lentes/diarios' },
    { id: 3, name: 'Oakley Holbrook', category: 'Gafas de Sol', url: '/productos/oakley-holbrook' },
  ].filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${isScrolled ? 'header-glass shadow-lg' : 'bg-white/50 backdrop-blur-sm'}
      `}>
        {/* Top Bar */}
        <div className="border-b border-gray-200/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-10 items-center justify-between text-xs">
              <div className="hidden items-center space-x-6 md:flex">
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  {topBarInfo.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {topBarInfo.hours}
                </div>
              </div>
              <div className="flex items-center text-purple-600 font-medium">
                <TruckIcon className="mr-2 h-4 w-4" />
                {topBarInfo.shipping}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative">
                  <EyeIcon className="h-8 w-8 text-purple-600" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Horus Optic
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:space-x-8">
              {mainNavigation.map((item) => (
                item.megaMenu ? (
                  <MegaMenu
                    key={item.name}
                    title={item.name}
                    href={item.href}
                    sections={item.megaMenu.sections}
                  />
                ) : (
                  item.name === "Contacto"
                    ? (
                      <button
                        key={item.name}
                        type="button"
                        onClick={onContactoClick}
                        className="nav-link-underline inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    )
                    : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="nav-link-underline inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )
                )
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="group flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Buscar...</span>
                <kbd className="hidden sm:inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                  ⌘K
                </kbd>
              </button>

              {/* Cart */}
              <Link
                href="/carrito"
                className="group relative rounded-lg p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link
                href="/login"
                className="group rounded-lg p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <UserIcon className="h-6 w-6" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden rounded-lg p-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Gradient Border */}
        <div className="header-gradient-border"></div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Search Modal */}
      <Transition appear show={searchOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setSearchOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="search-backdrop" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-1 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-1 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="search-modal transform overflow-hidden p-6 text-left align-middle transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Buscar productos
                    </Dialog.Title>
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="rounded-lg p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <Combobox>
                    <div className="relative">
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Combobox.Input
                          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Buscar gafas, lentes de contacto..."
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          autoFocus
                        />
                      </div>

                      {searchQuery && (
                        <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {searchResults.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No se encontraron resultados para &ldquo;{searchQuery}&rdquo;
                            </div>
                          ) : (
                            searchResults.map((result) => (
                              <Combobox.Option
                                key={result.id}
                                value={result}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                    active ? 'bg-purple-50 text-purple-600' : 'text-gray-900'
                                  }`
                                }
                              >
                                <Link
                                  href={result.url}
                                  onClick={() => setSearchOpen(false)}
                                  className="block"
                                >
                                  <div className="font-medium">{result.name}</div>
                                  <div className="text-sm text-gray-500">{result.category}</div>
                                </Link>
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>

                  <div className="mt-6 text-xs text-gray-500">
                    <div className="flex items-center justify-between">
                      <span>Presiona Escape para cerrar</span>
                      <div className="flex space-x-1">
                        <kbd className="rounded border border-gray-200 px-1">↑</kbd>
                        <kbd className="rounded border border-gray-200 px-1">↓</kbd>
                        <span className="text-gray-400">para navegar</span>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Spacer for fixed header */}
      <div className="h-[74px]"></div>
    </>
  )
}

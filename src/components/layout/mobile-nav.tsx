'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
  XMarkIcon,
  ChevronRightIcon,
  SunIcon,
  EyeIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  ClockIcon,
  CalendarDaysIcon,
  CalendarIcon,
  PaintBrushIcon,
  GiftIcon,
  FireIcon,
  TagIcon,
  BeakerIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { mainNavigation } from '@/data/menu'

const iconMap = {
  SunIcon,
  EyeIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  ClockIcon,
  CalendarDaysIcon,
  CalendarIcon,
  PaintBrushIcon,
  GiftIcon,
  FireIcon,
  TagIcon,
  BeakerIcon,
  HeartIcon
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mobile-nav-overlay" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="mobile-nav-panel pointer-events-auto">
                  <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                    {/* Header */}
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Menú
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white/20 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <nav className="space-y-1">
                        {mainNavigation.map((item) => (
                          <div key={item.name}>
                            {item.megaMenu ? (
                              <div>
                                <button
                                  onClick={() => toggleSubmenu(item.name)}
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-600"
                                >
                                  <span>{item.name}</span>
                                  <ChevronRightIcon
                                    className={`h-5 w-5 transition-transform duration-200 ${
                                      expandedMenu === item.name ? 'rotate-90' : ''
                                    }`}
                                  />
                                </button>
                                
                                <Transition
                                  show={expandedMenu === item.name}
                                  enter="transition duration-200 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >
                                  <div className="mt-2 pl-4">
                                    {item.megaMenu.sections.map((section) => (
                                      <div key={section.title} className="mb-4">
                                        <h4 className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                          {section.title}
                                        </h4>
                                        <div className="space-y-1">
                                          {section.items.map((subItem) => {
                                            const IconComponent = iconMap[subItem.icon as keyof typeof iconMap]
                                            return (
                                              <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                onClick={onClose}
                                                className={`
                                                  group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                                                  ${subItem.featured
                                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                                                  }
                                                `}
                                              >
                                                <IconComponent 
                                                  className={`
                                                    mr-3 h-5 w-5 flex-shrink-0
                                                    ${subItem.featured 
                                                      ? 'text-white' 
                                                      : 'text-gray-400 group-hover:text-purple-500'
                                                    }
                                                  `} 
                                                />
                                                <span>{subItem.label}</span>
                                                {subItem.featured && (
                                                  <span className="ml-auto inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                                                    Nuevo
                                                  </span>
                                                )}
                                              </Link>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </Transition>
                              </div>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-600"
                              >
                                {item.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </nav>

                      {/* Divider */}
                      <div className="my-6 border-t border-gray-200" />

                      {/* Quick Actions */}
                      <div className="space-y-3">
                        <Link
                          href="/carrito"
                          onClick={onClose}
                          className="flex items-center rounded-lg bg-purple-50 px-3 py-3 text-sm font-medium text-purple-600 hover:bg-purple-100"
                        >
                          <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005 16v0a1 1 0 001 1h12" />
                          </svg>
                          Ver Carrito
                        </Link>
                        
                        <Link
                          href="/login"
                          onClick={onClose}
                          className="flex items-center rounded-lg bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Iniciar Sesión
                        </Link>
                      </div>

                      {/* Footer */}
                      <div className="mt-8 border-t border-gray-200 pt-6">
                        <div className="space-y-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +57 (1) 234-5678
                          </div>
                          <div className="flex items-center">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Lun - Vie: 9:00 AM - 7:00 PM
                          </div>
                          <div className="flex items-center">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Envíos gratis desde $200.000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

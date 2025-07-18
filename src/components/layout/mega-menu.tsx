'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import {
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

interface MenuItem {
  label: string
  href: string
  icon: string
  featured?: boolean
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

interface MegaMenuProps {
  title: string
  href: string
  sections: MenuSection[]
}

export default function MegaMenu({ title, href, sections }: MegaMenuProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? 'text-purple-600' : 'text-gray-900 hover:text-purple-600'}
              group inline-flex items-center nav-link-underline px-3 py-2 text-sm font-medium
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md
              transition-colors duration-200
            `}
          >
            <span>{title}</span>
            <svg
              className={`
                ${open ? 'text-purple-600 rotate-180' : 'text-gray-400 group-hover:text-purple-500'}
                ml-2 h-5 w-5 transition-all duration-200
              `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-1 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-1 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              {({ close }) => (
                <div className="mega-menu-glass overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 p-8 lg:grid-cols-2">
                    {sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                          {section.title}
                        </h3>
                        <div className="space-y-3">
                          {section.items.map((item) => {
                            const IconComponent = iconMap[item.icon as keyof typeof iconMap]
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => close()}
                                className={`
                                  group flex items-center rounded-lg p-3 transition-all duration-200
                                  hover:bg-purple-50 dark:hover:bg-purple-900/20
                                  ${item.featured 
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
                                    : 'hover:text-purple-600'
                                  }
                                `}
                              >
                                <div className={`
                                  flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                                  ${item.featured 
                                    ? 'bg-white/20' 
                                    : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                                  }
                                `}>
                                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className={`
                                    text-sm font-medium
                                    ${item.featured ? 'text-white' : 'text-gray-900 group-hover:text-purple-600'}
                                  `}>
                                    {item.label}
                                  </p>
                                  {item.featured && (
                                    <p className="text-xs text-white/80 mt-1">
                                      Plan mensual personalizado
                                    </p>
                                  )}
                                </div>
                                {item.featured && (
                                  <div className="ml-auto">
                                    <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white">
                                      Nuevo
                                    </span>
                                  </div>
                                )}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer del mega menú */}
                  <div className="bg-gray-50 dark:bg-gray-800 px-8 py-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href={href}
                        onClick={() => close()}
                        className="text-sm font-medium text-purple-600 hover:text-purple-500"
                      >
                        Ver todo en {title}
                      </Link>
                      <div className="flex space-x-4">
                        <Link
                          href="/ofertas"
                          onClick={() => close()}
                          className="flex items-center text-sm text-gray-600 hover:text-purple-600"
                        >
                          <TagIcon className="h-4 w-4 mr-1" />
                          Ofertas
                        </Link>
                        <Link
                          href="/nuevos"
                          onClick={() => close()}
                          className="flex items-center text-sm text-gray-600 hover:text-purple-600"
                        >
                          <SparklesIcon className="h-4 w-4 mr-1" />
                          Nuevos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

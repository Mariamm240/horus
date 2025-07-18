'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  isActive?: boolean
}

export default function NavLink({ href, children, className = '', isActive = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        nav-link-underline inline-flex items-center px-3 py-2 text-sm font-medium
        transition-colors duration-200 rounded-md
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        ${isActive 
          ? 'text-purple-600' 
          : 'text-gray-900 hover:text-purple-600'
        }
        ${className}
      `}
    >
      {children}
    </Link>
  )
}

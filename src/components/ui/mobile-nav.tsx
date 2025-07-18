"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: Array<{
    href: string
    label: string
  }>
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Slide-in Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-2xl",
          "flex flex-col"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Horus Optic</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-primary hover:bg-purple-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t space-y-3">
          <Link
            href="/login"
            onClick={onClose}
            className="block w-full py-3 px-4 text-center bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/carrito"
            onClick={onClose}
            className="block w-full py-3 px-4 text-center border border-primary text-primary rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Ver Carrito
          </Link>
        </div>
      </motion.div>
    </>
  )
}

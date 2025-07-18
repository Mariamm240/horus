"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  children?: ReactNode
  className?: string
  showFloatingLens?: boolean
}

// SVG del lente flotante 3D
const FloatingLens = () => (
  <motion.div
    className="absolute top-1/4 right-1/4 opacity-20"
    initial={{ y: 0, rotate: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-lg"
    >
      {/* Lens outer ring */}
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="url(#lensGradient)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      {/* Lens inner circle */}
      <circle
        cx="60"
        cy="60"
        r="30"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      {/* Light reflection */}
      <ellipse
        cx="50"
        cy="45"
        rx="8"
        ry="12"
        fill="rgba(255,255,255,0.4)"
        transform="rotate(-30 50 45)"
      />
      {/* Gradient definitions */}
      <defs>
        <radialGradient id="lensGradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="rgba(184, 146, 213, 0.3)" />
          <stop offset="100%" stopColor="rgba(226, 154, 238, 0.1)" />
        </radialGradient>
      </defs>
    </svg>
  </motion.div>
)

export function HeroSectionPremium({
  title,
  subtitle,
  description,
  children,
  className = "",
  showFloatingLens = true
}: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background with diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-horus-purple via-primary to-horus-pink" />
      
      {/* Overlay pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 2C9.054 2 0 11.054 0 20s9.054 18 20 18 20-9.054 20-18S30.946 2 20 2z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating lens */}
      {showFloatingLens && <FloatingLens />}
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {subtitle}
              </span>
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl"
          >
            {description}
          </motion.p>
          
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@heroicons/react/24/outline'

interface ColorOption {
  id: string
  name: string
  hex: string
  count?: number
}

interface ColorSwatchProps {
  colors: ColorOption[]
  selectedColors: string[]
  onColorToggle: (colorId: string) => void
  className?: string
}

const COLOR_MAP: Record<string, string> = {
  'transparente': '#f8fafc',
  'azul': '#3b82f6',
  'verde': '#10b981',
  'gris': '#6b7280',
  'marron': '#92400e',
  'negro': '#1f2937',
  'dorado': '#f59e0b',
  'plateado': '#9ca3af',
  'rosa': '#ec4899',
  'violeta': '#8b5cf6'
}

export function ColorSwatch({
  colors,
  selectedColors,
  onColorToggle,
  className
}: ColorSwatchProps) {
  const getColorHex = (colorName: string) => {
    const normalizedName = colorName.toLowerCase().replace(/\s+/g, '')
    return COLOR_MAP[normalizedName] || '#e5e7eb'
  }

  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="font-medium text-gray-900 flex items-center">
        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
        Colores
      </h4>
      
      <div className="grid grid-cols-4 gap-3">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color.id)
          const colorHex = getColorHex(color.name)
          
          return (
            <motion.button
              key={color.id}
              onClick={() => onColorToggle(color.id)}
              className={cn(
                'relative group flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1',
                isSelected && 'bg-purple-50'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Color Circle */}
              <div
                className={cn(
                  'relative w-8 h-8 rounded-full border-2 transition-all duration-200',
                  isSelected 
                    ? 'border-purple-500 shadow-lg' 
                    : 'border-gray-300 group-hover:border-gray-400',
                  colorHex === '#f8fafc' && 'border-gray-400' // Special case for transparent
                )}
                style={{ backgroundColor: colorHex }}
              >
                {/* Checkmark for selected */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CheckIcon 
                      className={cn(
                        'w-4 h-4',
                        colorHex === '#f8fafc' || colorHex === '#f59e0b' || colorHex === '#9ca3af'
                          ? 'text-gray-700' 
                          : 'text-white'
                      )} 
                    />
                  </motion.div>
                )}
                
                {/* Pattern for transparent */}
                {colorHex === '#f8fafc' && (
                  <div className="absolute inset-0 rounded-full opacity-20">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-transparent to-gray-200"></div>
                  </div>
                )}
              </div>
              
              {/* Color Name */}
              <span className="text-xs text-gray-600 text-center leading-tight">
                {color.name}
              </span>
              
              {/* Count */}
              {color.count && (
                <span className="text-xs text-gray-400">({color.count})</span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// Default colors for optical products
export const DEFAULT_COLORS: ColorOption[] = [
  { id: 'transparente', name: 'Transparente', hex: '#f8fafc', count: 45 },
  { id: 'azul', name: 'Azul', hex: '#3b82f6', count: 23 },
  { id: 'verde', name: 'Verde', hex: '#10b981', count: 18 },
  { id: 'gris', name: 'Gris', hex: '#6b7280', count: 34 },
  { id: 'marron', name: 'Marrón', hex: '#92400e', count: 12 },
  { id: 'negro', name: 'Negro', hex: '#1f2937', count: 56 },
  { id: 'dorado', name: 'Dorado', hex: '#f59e0b', count: 28 },
  { id: 'plateado', name: 'Plateado', hex: '#9ca3af', count: 19 }
]
'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface PriceSliderProps {
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function PriceSlider({
  value,
  onValueChange,
  min = 0,
  max = 1000000,
  step = 10000,
  className
}: PriceSliderProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
      
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={value}
        onValueChange={onValueChange}
        max={max}
        min={min}
        step={step}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500" />
        </SliderPrimitive.Track>
        
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-purple-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-purple-50 hover:scale-110" />
        
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-purple-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-purple-50 hover:scale-110" />
      </SliderPrimitive.Root>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </div>
  )
}
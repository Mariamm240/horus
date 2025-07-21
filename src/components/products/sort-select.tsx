'use client'

import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface SortOption {
  value: string
  label: string
}

interface SortSelectProps {
  value: string
  onValueChange: (value: string) => void
  className?: string
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'popularity', label: 'Más Popular' },
  { value: 'date', label: 'Más Reciente' },
  { value: 'price_asc', label: 'Precio: Menor a Mayor' },
  { value: 'price_desc', label: 'Precio: Mayor a Menor' },
  { value: 'rating', label: 'Mejor Valorados' },
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'name_desc', label: 'Nombre Z-A' }
]

export function SortSelect({ value, onValueChange, className }: SortSelectProps) {
  const selectedOption = SORT_OPTIONS.find(option => option.value === value)

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={cn(
          'inline-flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 min-w-[200px]',
          className
        )}
      >
        <Select.Value placeholder="Ordenar por...">
          {selectedOption?.label}
        </Select.Value>
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg z-50"
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="p-1">
            {SORT_OPTIONS.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none',
                  'hover:bg-purple-50 hover:text-purple-700',
                  'focus:bg-purple-50 focus:text-purple-700',
                  'data-[state=checked]:bg-purple-100 data-[state=checked]:text-purple-700'
                )}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 flex h-4 w-4 items-center justify-center">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
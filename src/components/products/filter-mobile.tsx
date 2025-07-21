'use client'

import * as React from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronDownIcon, CheckIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { ProductFilters } from '@/hooks/use-product-filters'
import { PriceSlider } from './price-slider'
import { ColorSwatch, DEFAULT_COLORS } from './color-swatch'

interface FilterOption {
  id: string
  name: string
  count: number
}

interface FilterMobileProps {
  filters: ProductFilters
  onFiltersChange: (updates: Partial<ProductFilters>) => void
  onToggleArrayFilter: (filterKey: keyof Pick<ProductFilters, 'brands' | 'materials' | 'diameters' | 'curves' | 'colors'>, value: string) => void
  onClearFilters: () => void
  getActiveFilterCount: () => number
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

// Filter data (same as sidebar)
const FILTER_DATA = {
  brands: [
    { id: 'acuvue', name: 'Acuvue', count: 45 },
    { id: 'biofinity', name: 'Biofinity', count: 32 },
    { id: 'dailies', name: 'Dailies', count: 28 },
    { id: 'ray-ban', name: 'Ray-Ban', count: 67 },
    { id: 'oakley', name: 'Oakley', count: 54 },
    { id: 'persol', name: 'Persol', count: 23 },
    { id: 'prada', name: 'Prada', count: 18 },
    { id: 'gucci', name: 'Gucci', count: 15 }
  ],
  materials: [
    { id: 'hidrogel-silicona', name: 'Hidrogel de Silicona', count: 78 },
    { id: 'hidrogel', name: 'Hidrogel', count: 45 },
    { id: 'acetato', name: 'Acetato', count: 89 },
    { id: 'metal', name: 'Metal', count: 67 },
    { id: 'titanio', name: 'Titanio', count: 34 },
    { id: 'plastico', name: 'Plástico', count: 56 }
  ],
  diameters: [
    { id: '13.8', name: '13.8 mm', count: 23 },
    { id: '14.0', name: '14.0 mm', count: 45 },
    { id: '14.2', name: '14.2 mm', count: 67 },
    { id: '14.3', name: '14.3 mm', count: 34 },
    { id: '14.5', name: '14.5 mm', count: 28 }
  ],
  curves: [
    { id: '8.3', name: '8.3 mm', count: 34 },
    { id: '8.4', name: '8.4 mm', count: 56 },
    { id: '8.5', name: '8.5 mm', count: 78 },
    { id: '8.6', name: '8.6 mm', count: 45 },
    { id: '8.7', name: '8.7 mm', count: 23 }
  ]
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  colorIndicator?: string
}

function FilterSection({ title, children, defaultOpen = false, colorIndicator = 'bg-purple-500' }: FilterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left py-3"
      >
        <h3 className="font-medium text-gray-900 flex items-center">
          <span className={cn('w-2 h-2 rounded-full mr-2', colorIndicator)}></span>
          {title}
        </h3>
        <ChevronDownIcon 
          className={cn(
            'w-4 h-4 text-gray-500 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface CheckboxFilterProps {
  options: FilterOption[]
  selectedValues: string[]
  onToggle: (value: string) => void
  maxHeight?: string
}

function CheckboxFilter({ options, selectedValues, onToggle, maxHeight = 'max-h-40' }: CheckboxFilterProps) {
  return (
    <div className={cn('space-y-3 overflow-y-auto', maxHeight)}>
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.id)
        
        return (
          <div key={option.id} className="flex items-center space-x-3 group">
            <Checkbox.Root
              id={`mobile-${option.id}`}
              checked={isChecked}
              onCheckedChange={() => onToggle(option.id)}
              className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
            >
              <Checkbox.Indicator>
                <CheckIcon className="h-3 w-3 text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            
            <label
              htmlFor={`mobile-${option.id}`}
              className="flex-1 cursor-pointer text-sm text-gray-700 group-hover:text-gray-900 flex items-center justify-between"
            >
              <span>{option.name}</span>
              <span className="text-xs text-gray-500">({option.count})</span>
            </label>
          </div>
        )
      })}
    </div>
  )
}

// Filter Button Component
export function FilterButton({ 
  onClick, 
  activeCount 
}: { 
  onClick: () => void
  activeCount: number 
}) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg flex items-center space-x-2 md:hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={activeCount > 0 ? { 
        boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.3)' 
      } : {}}
    >
      <AdjustmentsHorizontalIcon className="w-5 h-5" />
      <span className="text-sm font-medium">Filtros</span>
      {activeCount > 0 && (
        <span className="bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </motion.button>
  )
}

export function FilterMobile({
  filters,
  onFiltersChange,
  onToggleArrayFilter,
  onClearFilters,
  getActiveFilterCount,
  isOpen,
  onOpenChange
}: FilterMobileProps) {
  const activeCount = getActiveFilterCount()
  const [dragY, setDragY] = React.useState(0)

  const handleDragEnd = (event: any, info: PanInfo) => {
    const shouldClose = info.velocity.y > 500 || info.offset.y > 150
    if (shouldClose) {
      onOpenChange(false)
    }
    setDragY(0)
  }

  // Focus trap
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      {/* Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: dragY }}
            exit={{ y: '100%' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDrag={(event, info) => setDragY(info.offset.y)}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[85vh] md:hidden"
            style={{ y: dragY }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
              <div className="flex items-center space-x-3">
                {activeCount > 0 && (
                  <motion.button
                    onClick={onClearFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Limpiar ({activeCount})</span>
                  </motion.button>
                )}
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 pb-6" style={{ maxHeight: 'calc(85vh - 120px)' }}>
              <div className="space-y-4">
                {/* Price Range */}
                <FilterSection title="Rango de Precio" colorIndicator="bg-green-500" defaultOpen>
                  <PriceSlider
                    value={filters.priceRange}
                    onValueChange={(value) => onFiltersChange({ priceRange: value })}
                    min={0}
                    max={1000000}
                    step={10000}
                  />
                </FilterSection>

                {/* Brands */}
                <FilterSection title="Marcas" colorIndicator="bg-blue-500">
                  <CheckboxFilter
                    options={FILTER_DATA.brands}
                    selectedValues={filters.brands}
                    onToggle={(value) => onToggleArrayFilter('brands', value)}
                  />
                </FilterSection>

                {/* Materials */}
                <FilterSection title="Materiales" colorIndicator="bg-purple-500">
                  <CheckboxFilter
                    options={FILTER_DATA.materials}
                    selectedValues={filters.materials}
                    onToggle={(value) => onToggleArrayFilter('materials', value)}
                  />
                </FilterSection>

                {/* Colors */}
                <FilterSection title="Colores" colorIndicator="bg-pink-500">
                  <ColorSwatch
                    colors={DEFAULT_COLORS}
                    selectedColors={filters.colors}
                    onColorToggle={(value) => onToggleArrayFilter('colors', value)}
                  />
                </FilterSection>

                {/* Diameters */}
                <FilterSection title="Diámetro" colorIndicator="bg-yellow-500">
                  <CheckboxFilter
                    options={FILTER_DATA.diameters}
                    selectedValues={filters.diameters}
                    onToggle={(value) => onToggleArrayFilter('diameters', value)}
                    maxHeight="max-h-32"
                  />
                </FilterSection>

                {/* Curves */}
                <FilterSection title="Curva Base" colorIndicator="bg-indigo-500">
                  <CheckboxFilter
                    options={FILTER_DATA.curves}
                    selectedValues={filters.curves}
                    onToggle={(value) => onToggleArrayFilter('curves', value)}
                    maxHeight="max-h-32"
                  />
                </FilterSection>
              </div>

              {/* Active Filters Summary */}
              {activeCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Filtros Activos ({activeCount})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {/* Price Range */}
                    {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Precio
                        <button
                          onClick={() => onFiltersChange({ priceRange: [0, 1000000] })}
                          className="ml-1 hover:text-green-600"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    
                    {/* Other filters */}
                    {Object.entries(filters).map(([key, values]) => {
                      if (key === 'priceRange' || key === 'sortBy' || key === 'category' || key === 'search') return null
                      
                      return (values as string[]).map(value => {
                        const filterData = FILTER_DATA[key as keyof typeof FILTER_DATA]
                        const option = filterData?.find(opt => opt.id === value)
                        
                        return (
                          <span key={`${key}-${value}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {option?.name || value}
                            <button
                              onClick={() => onToggleArrayFilter(key as any, value)}
                              className="ml-1 hover:text-purple-600"
                            >
                              <XMarkIcon className="w-3 h-3" />
                            </button>
                          </span>
                        )
                      })
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
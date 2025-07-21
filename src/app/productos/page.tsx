'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import { useProductFilters } from '@/hooks/use-product-filters'
import { useProducts } from '@/hooks/use-products'
import { FilterSidebar } from '@/components/products/filter-sidebar'
import { FilterMobile, FilterButton } from '@/components/products/filter-mobile'
import { ProductGrid } from '@/components/products/product-grid'
import { SortSelect } from '@/components/products/sort-select'
import { cn, debounce } from '@/lib/utils'

const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Todos los productos', 
    count: 156,
    description: 'Descubre toda nuestra colección'
  },
  { 
    id: 'lentes-contacto', 
    name: 'Lentes de Contacto', 
    count: 78,
    description: 'Diarios, mensuales y especiales'
  },
  { 
    id: 'gafas-graduadas', 
    name: 'Gafas Graduadas', 
    count: 45,
    description: 'Monturas con prescripción'
  },
  { 
    id: 'gafas-sol', 
    name: 'Gafas de Sol', 
    count: 89,
    description: 'Estilo y protección UV'
  },
  { 
    id: 'accesorios', 
    name: 'Accesorios', 
    count: 34,
    description: 'Cuidado y mantenimiento'
  }
]

export default function ProductosPage() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  
  const {
    filters,
    updateFilters,
    toggleArrayFilter,
    clearFilters,
    getActiveFilterCount
  } = useProductFilters()
  
  const { data: products, isLoading, error } = useProducts(filters)
  
  // Debounced search
  const debouncedSearch = React.useMemo(
    () => debounce((value: string) => {
      updateFilters({ search: value })
    }, 300),
    [updateFilters]
  )
  
  React.useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])
  
  const handleCategoryChange = (categoryId: string) => {
    updateFilters({ category: categoryId === 'all' ? '' : categoryId })
  }
  
  const activeFilterCount = getActiveFilterCount()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Productos <span className="text-purple-200">Ópticos</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Descubre nuestra amplia gama de productos ópticos de alta calidad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'px-6 py-3 rounded-full font-medium transition-all duration-200',
                  filters.category === category.id || (filters.category === '' && category.id === 'all')
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="block font-semibold">{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={updateFilters}
              onToggleArrayFilter={toggleArrayFilter}
              onClearFilters={clearFilters}
              getActiveFilterCount={getActiveFilterCount}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <SortSelect
                    value={filters.sortBy}
                    onValueChange={(value) => updateFilters({ sortBy: value })}
                  />

                  {/* View Mode */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'p-2 rounded-md transition-all duration-200',
                        viewMode === 'grid'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      )}
                    >
                      <Squares2X2Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        'p-2 rounded-md transition-all duration-200',
                        viewMode === 'list'
                          ? 'bg-white text-purple-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      )}
                    >
                      <ListBulletIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {activeFilterCount} filtro{activeFilterCount !== 1 ? 's' : ''} activo{activeFilterCount !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Limpiar todos
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={products?.products || []}
              isLoading={isLoading}
              viewMode={viewMode}
              error={error}
            />

            {/* Pagination would go here */}
            {products?.pagination && products.pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4">
                  <span className="text-sm text-gray-600">
                    Página {products.pagination.currentPage} de {products.pagination.totalPages}
                  </span>
                  {/* Add pagination controls here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <FilterButton
        onClick={() => setShowMobileFilters(true)}
        activeCount={activeFilterCount}
      />

      {/* Mobile Filter Sheet */}
      <FilterMobile
        filters={filters}
        onFiltersChange={updateFilters}
        onToggleArrayFilter={toggleArrayFilter}
        onClearFilters={clearFilters}
        getActiveFilterCount={getActiveFilterCount}
        isOpen={showMobileFilters}
        onOpenChange={setShowMobileFilters}
      />
    </div>
  )
}

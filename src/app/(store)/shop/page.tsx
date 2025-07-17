"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

// Mock data
const products = [
  {
    id: 1,
    slug: "acuvue-oasys-daily",
    name: "Acuvue Oasys 1-Day",
    brand: "Johnson & Johnson",
    price: 45,
    subscriptionPrice: 38,
    frequency: "Diario",
    image: "/api/placeholder/300/300",
    description: "Lentes de contacto diarios con tecnología HydraLuxe",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    slug: "biofinity-monthly",
    name: "Biofinity",
    brand: "CooperVision",
    price: 32,
    subscriptionPrice: 27,
    frequency: "Mensual",
    image: "/api/placeholder/300/300",
    description: "Lentes mensuales de silicona hidrogel",
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    slug: "dailies-total-1",
    name: "Dailies Total 1",
    brand: "Alcon",
    price: 52,
    subscriptionPrice: 44,
    frequency: "Diario",
    image: "/api/placeholder/300/300",
    description: "La experiencia más cercana a no usar lentes",
    rating: 4.9,
    reviews: 234
  },
  {
    id: 4,
    slug: "proclear-1-day",
    name: "Proclear 1 Day",
    brand: "CooperVision",
    price: 38,
    subscriptionPrice: 32,
    frequency: "Diario",
    image: "/api/placeholder/300/300",
    description: "Lentes diarios con tecnología PC",
    rating: 4.5,
    reviews: 67
  },
  {
    id: 5,
    slug: "air-optix-aqua",
    name: "Air Optix Aqua",
    brand: "Alcon",
    price: 29,
    subscriptionPrice: 25,
    frequency: "Mensual",
    image: "/api/placeholder/300/300",
    description: "Lentes mensuales de alta respirabilidad",
    rating: 4.4,
    reviews: 112
  },
  {
    id: 6,
    slug: "acuvue-vita",
    name: "Acuvue Vita",
    brand: "Johnson & Johnson",
    price: 35,
    subscriptionPrice: 30,
    frequency: "Mensual",
    image: "/api/placeholder/300/300",
    description: "Lentes mensuales con máxima hidratación",
    rating: 4.7,
    reviews: 198
  }
]

const brands = ["Todas", "Johnson & Johnson", "CooperVision", "Alcon"]
const frequencies = ["Todas", "Diario", "Mensual", "Trimestral"]

export default function ShopPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Todas"])
  const [selectedFrequencies, setSelectedFrequencies] = useState<string[]>(["Todas"])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.includes("Todas") || selectedBrands.includes(product.brand)
    const matchesFrequency = selectedFrequencies.includes("Todas") || selectedFrequencies.includes(product.frequency)
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesBrand && matchesFrequency && matchesSearch
  })

  const handleBrandChange = (brand: string) => {
    if (brand === "Todas") {
      setSelectedBrands(["Todas"])
    } else {
      const newBrands = selectedBrands.includes("Todas") 
        ? [brand]
        : selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
      
      setSelectedBrands(newBrands.length === 0 ? ["Todas"] : newBrands)
    }
  }

  const handleFrequencyChange = (frequency: string) => {
    if (frequency === "Todas") {
      setSelectedFrequencies(["Todas"])
    } else {
      const newFrequencies = selectedFrequencies.includes("Todas") 
        ? [frequency]
        : selectedFrequencies.includes(frequency)
        ? selectedFrequencies.filter(f => f !== frequency)
        : [...selectedFrequencies, frequency]
      
      setSelectedFrequencies(newFrequencies.length === 0 ? ["Todas"] : newFrequencies)
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-text-base mb-4">
          Tienda de Lentes
        </h1>
        <p className="text-lg text-secondary max-w-2xl">
          Descubre nuestra amplia selección de lentes de contacto premium. 
          Ahorra hasta 20% con nuestros planes de suscripción.
        </p>
      </div>

      {/* Search and Filter Toggle */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            placeholder="Buscar lentes o marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="sm:w-auto"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
          <div className="sticky top-24 space-y-6">
            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold text-text-base mb-3">Marcas</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded border-secondary text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-secondary">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Frequency Filter */}
            <div>
              <h3 className="font-semibold text-text-base mb-3">Frecuencia</h3>
              <div className="space-y-2">
                {frequencies.map(frequency => (
                  <label key={frequency} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFrequencies.includes(frequency)}
                      onChange={() => handleFrequencyChange(frequency)}
                      className="rounded border-secondary text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-secondary">{frequency}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-secondary">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-secondary text-sm">Imagen del producto</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <CardDescription>{product.brand}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.frequency}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-secondary mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-secondary">({product.reviews})</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Compra única:</span>
                      <span className="font-semibold text-text-base">${product.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Suscripción:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-primary">${product.subscriptionPrice}</span>
                        <Badge variant="success" className="text-xs">
                          -{Math.round(((product.price - product.subscriptionPrice) / product.price) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Link href={`/shop/${product.slug}`}>
                    <Button className="w-full">Ver Detalles</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-text-base mb-2">
                No se encontraron productos
              </h3>
              <p className="text-secondary">
                Intenta ajustar los filtros o el término de búsqueda.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

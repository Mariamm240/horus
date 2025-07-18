'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import ProductList from '@/components/ui/horus-product-list'

const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Todos los productos', 
    count: 156,
    description: 'Descubre toda nuestra colección'
  },
  { 
    id: 'diarios', 
    name: 'Lentes Diarios', 
    count: 45,
    description: 'Máxima higiene y comodidad'
  },
  { 
    id: 'mensuales', 
    name: 'Lentes Mensuales', 
    count: 67,
    description: 'Economía y conveniencia'
  },
  { 
    id: 'cosmeticos', 
    name: 'Lentes Cosméticos', 
    count: 34,
    description: 'Cambia el color de tus ojos'
  },
  { 
    id: 'astigmatismo', 
    name: 'Para Astigmatismo', 
    count: 10,
    description: 'Corrección especializada'
  }
]

const featuredProducts = [
  {
    id: 1,
    title: "Acuvue Oasys 1-Day",
    price: "€29.99",
    originalPrice: "€34.99",
    image: "/api/placeholder/300/300",
    href: "/productos/acuvue-oasys-1-day",
    badge: "Más vendido",
    category: "Lentes de Contacto",
    rating: 4.8
  },
  {
    id: 2,
    title: "Solución ReNu MultiPlus",
    price: "€12.99",
    image: "/api/placeholder/300/300",
    href: "/productos/renu-multiplus",
    category: "Soluciones",
    rating: 4.6
  },
  {
    id: 3,
    title: "Estuche Antibacteriano",
    price: "€8.99",
    originalPrice: "€12.99",
    image: "/api/placeholder/300/300",
    href: "/productos/estuche-antibacteriano",
    badge: "Oferta",
    category: "Accesorios",
    rating: 4.5
  },
  {
    id: 4,
    title: "Gotas Systane Ultra",
    price: "€16.99",
    image: "/api/placeholder/300/300",
    href: "/productos/systane-ultra",
    category: "Gotas",
    rating: 4.7
  },
  {
    id: 5,
    title: "Kit Inicial Lentes",
    price: "€45.99",
    originalPrice: "€52.99",
    image: "/api/placeholder/300/300",
    href: "/productos/kit-inicial",
    badge: "Nuevo",
    category: "Kits",
    rating: 4.9
  },
  {
    id: 6,
    title: "Toallitas Limpiadoras",
    price: "€7.99",
    image: "/api/placeholder/300/300",
    href: "/productos/toallitas-limpiadoras",
    category: "Higiene",
    rating: 4.4
  }
]

const topBrands = [
  { name: "Acuvue", logo: "/api/placeholder/100/60", products: 45 },
  { name: "Biofinity", logo: "/api/placeholder/100/60", products: 32 },
  { name: "Dailies", logo: "/api/placeholder/100/60", products: 28 },
  { name: "Air Optix", logo: "/api/placeholder/100/60", products: 22 },
  { name: "ReNu", logo: "/api/placeholder/100/60", products: 15 },
  { name: "Systane", logo: "/api/placeholder/100/60", products: 12 }
]

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Categories Grid */}
      <SectionWrapper background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Categorías de Productos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra exactamente lo que necesitas navegando por nuestras categorías especializadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/productos?categoria=${category.slug}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-200 shadow-lg`}>
                <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                <p className="text-white/80 mb-4">{category.count} productos disponibles</p>
                <div className="flex items-center text-white/90 group-hover:text-white">
                  <span>Explorar →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Products */}
      <SectionWrapper>
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Los productos más populares y mejor valorados por nuestros clientes.
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button className="p-2 bg-white rounded-md shadow-sm">
              <Grid className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ProductGrid cols={3} gap={6}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              href={product.href}
              badge={product.badge}
            >
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
              </div>
            </ProductCard>
          ))}
        </ProductGrid>

        <div className="text-center mt-12">
          <Link
            href="/lentes-de-contacto"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </SectionWrapper>

      {/* Top Brands */}
      <SectionWrapper background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Marcas de Confianza
          </h2>
          <p className="text-xl text-gray-600">
            Trabajamos con las mejores marcas mundiales para garantizar la máxima calidad.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {topBrands.map((brand, index) => (
            <Link
              key={index}
              href={`/productos?marca=${brand.name.toLowerCase()}`}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all text-center group"
            >
              <div className="relative w-20 h-12 mx-auto mb-3 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-500">{brand.products} productos</p>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Product Benefits */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir nuestros productos?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Garantizada</h3>
            <p className="text-gray-600">
              Todos nuestros productos pasan rigurosos controles de calidad y tienen garantía del fabricante.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fácil de Encontrar</h3>
            <p className="text-gray-600">
              Sistema de búsqueda avanzado y filtros inteligentes para encontrar exactamente lo que necesitas.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Asesoramiento Experto</h3>
            <p className="text-gray-600">
              Nuestros especialistas te ayudan a elegir los productos más adecuados para tus necesidades.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper background="primary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Nuestro equipo de especialistas está aquí para ayudarte a encontrar el producto perfecto para tu cuidado ocular.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-accent hover:bg-accent/90 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Consulta Personalizada
            </Link>
            <Link
              href="tel:+34123456789"
              className="border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-white"
            >
              Llamar Ahora
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

import type { Metadata } from "next"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ProductGrid, ProductCard } from "@/components/ui/product-grid"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Lentes de Contacto Premium | Horus Optic",
  description: "Descubre nuestra amplia gama de lentes de contacto de las mejores marcas. Diarios, semanales y mensuales con envío gratuito.",
}

// Mock data - replace with real data from WooCommerce
const categories = [
  { id: 1, name: "Diarios", slug: "diarios", count: 45 },
  { id: 2, name: "Semanales", slug: "semanales", count: 28 },
  { id: 3, name: "Mensuales", slug: "mensuales", count: 32 },
  { id: 4, name: "Cosméticos", slug: "cosmeticos", count: 15 }
]

const brands = [
  { id: 1, name: "Acuvue", slug: "acuvue", count: 35 },
  { id: 2, name: "Biofinity", slug: "biofinity", count: 28 },
  { id: 3, name: "Dailies", slug: "dailies", count: 22 },
  { id: 4, name: "Air Optix", slug: "air-optix", count: 18 }
]

const featuredProducts = [
  {
    id: 1,
    title: "Acuvue Oasys 1-Day",
    price: "€29.99",
    originalPrice: "€34.99",
    image: "/api/placeholder/300/300",
    href: "/lentes-de-contacto/acuvue-oasys-1-day",
    badge: "Más vendido"
  },
  {
    id: 2,
    title: "Biofinity Monthly",
    price: "€24.99",
    image: "/api/placeholder/300/300",
    href: "/lentes-de-contacto/biofinity-monthly"
  },
  {
    id: 3,
    title: "Dailies Total 1",
    price: "€32.99",
    image: "/api/placeholder/300/300",
    href: "/lentes-de-contacto/dailies-total-1",
    badge: "Nuevo"
  },
  {
    id: 4,
    title: "Air Optix Night & Day",
    price: "€27.99",
    originalPrice: "€31.99",
    image: "/api/placeholder/300/300",
    href: "/lentes-de-contacto/air-optix-night-day"
  },
  {
    id: 5,
    title: "Acuvue 2",
    price: "€19.99",
    image: "/api/placeholder/300/300",
    href: "/lentes-de-contacto/acuvue-2"
  },
  {
    id: 6,
    title: "Biofinity Toric",
    price: "€34.99",
    image: "/api/placeholder/300/300",
    href: "/lentes-de-contacto/biofinity-toric"
  }
]

export default function LentesDeContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Filters Section */}
      <SectionWrapper background="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Categories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Por Tipo de Uso</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/lentes-de-contacto?categoria=${category.slug}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} productos</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Por Marca</h2>
            <div className="grid grid-cols-2 gap-4">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/lentes-de-contacto?marca=${brand.slug}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                  <p className="text-sm text-gray-600">{brand.count} productos</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Featured Products */}
      <SectionWrapper className="scroll-mt-16">
        <div id="productos" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Los lentes de contacto más populares y mejor valorados por nuestros clientes.
          </p>
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
            />
          ))}
        </ProductGrid>

        <div className="text-center mt-12">
          <Link
            href="/tienda"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper background="primary">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿No sabes qué lentes elegir?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Nuestros especialistas te ayudan a encontrar los lentes perfectos para tu estilo de vida y necesidades visuales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-accent hover:bg-accent/90 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Consulta Gratuita
            </Link>
            <Link
              href="/servicios"
              className="border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-white"
            >
              Nuestros Servicios
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

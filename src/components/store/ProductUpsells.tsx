"use client"

import { useUpsellProducts, useRelatedProducts } from "@/hooks/useWooProducts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

interface ProductUpsellsProps {
  productId: number
  productSlug: string
}

export function ProductUpsells({ productId, productSlug }: ProductUpsellsProps) {
  const { upsellProducts, isLoading: upsellLoading } = useUpsellProducts(productId)
  const { relatedProducts, isLoading: relatedLoading } = useRelatedProducts(productId, 4)
  const { addItem } = useCart()

  const displayProducts = upsellProducts.length > 0 ? upsellProducts : relatedProducts
  const isLoading = upsellLoading || relatedLoading

  if (isLoading) {
    return (
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Productos Relacionados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (displayProducts.length === 0) {
    return null
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: Date.now(),
      wooProductId: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      image: product.images[0]?.src || '/placeholder-product.jpg',
      sku: product.sku
    })
  }

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {upsellProducts.length > 0 ? "Combina Perfectamente Con" : "Productos Relacionados"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="aspect-square relative overflow-hidden rounded-t-lg">
              <Image
                src={product.images[0]?.src || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {product.on_sale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  Oferta
                </div>
              )}
            </div>
            
            <div className="p-4">
              <Link 
                href={`/shop/${product.slug}`}
                className="block hover:text-purple-600 transition-colors"
              >
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h4>
              </Link>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {product.sale_price && product.sale_price !== product.regular_price ? (
                    <>
                      <span className="text-lg font-bold text-purple-600">
                        €{product.sale_price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        €{product.regular_price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-purple-600">
                      €{product.price}
                    </span>
                  )}
                </div>
                
                {product.average_rating && parseFloat(product.average_rating) > 0 && (
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {product.average_rating}
                    </span>
                  </div>
                )}
              </div>
              
              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full"
                size="sm"
                disabled={!product.purchasable || product.stock_status !== 'instock'}
              >
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                {product.stock_status !== 'instock' ? 'Sin Stock' : 'Añadir'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Componente para cross-sells en el carrito
export function CartCrossSells() {
  const { items } = useCart()
  
  // Get cross-sells for items in cart
  const productIds = items.map(item => item.wooProductId).filter(Boolean)
  
  if (productIds.length === 0) {
    return null
  }

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        También te puede interesar
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Static cross-sell items for demo */}
        <Card className="p-4 text-center">
          <Image
            src="/products/lens-case.jpg"
            alt="Estuche para lentes"
            width={80}
            height={80}
            className="mx-auto mb-3 rounded"
          />
          <h4 className="font-medium text-gray-900 mb-2">Estuche Premium</h4>
          <p className="text-purple-600 font-bold mb-3">€12.99</p>
          <Button size="sm" variant="outline" className="w-full">
            Añadir al carrito
          </Button>
        </Card>
        
        <Card className="p-4 text-center">
          <Image
            src="/products/lens-solution.jpg"
            alt="Solución de limpieza"
            width={80}
            height={80}
            className="mx-auto mb-3 rounded"
          />
          <h4 className="font-medium text-gray-900 mb-2">Solución de Limpieza</h4>
          <p className="text-purple-600 font-bold mb-3">€8.99</p>
          <Button size="sm" variant="outline" className="w-full">
            Añadir al carrito
          </Button>
        </Card>
        
        <Card className="p-4 text-center">
          <Image
            src="/products/eye-drops.jpg"
            alt="Gotas lubricantes"
            width={80}
            height={80}
            className="mx-auto mb-3 rounded"
          />
          <h4 className="font-medium text-gray-900 mb-2">Gotas Lubricantes</h4>
          <p className="text-purple-600 font-bold mb-3">€15.99</p>
          <Button size="sm" variant="outline" className="w-full">
            Añadir al carrito
          </Button>
        </Card>
      </div>
    </div>
  )
}

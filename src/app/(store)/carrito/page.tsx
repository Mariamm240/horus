"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

// Mock cart data - replace with actual cart context/state
const mockCartItems = [
  {
    id: 1,
    name: "Acuvue Oasys 1-Day",
    price: 29.99,
    originalPrice: 34.99,
    quantity: 2,
    image: "/api/placeholder/300/300",
    brand: "Acuvue",
    type: "Diarios"
  },
  {
    id: 2,
    name: "Biofinity Monthly",
    price: 24.99,
    quantity: 1,
    image: "/api/placeholder/300/300",
    brand: "Biofinity",
    type: "Mensuales"
  }
]

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsUpdating(id)
    
    try {
      // TODO: Update cart via API/context
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast.error("Error al actualizar la cantidad")
    } finally {
      setIsUpdating(null)
    }
  }

  const removeItem = async (id: number) => {
    try {
      // TODO: Remove item via API/context
      setCartItems(items => items.filter(item => item.id !== id))
      toast.success("Producto eliminado del carrito")
    } catch (error) {
      console.error("Error removing item:", error)
      toast.error("Error al eliminar el producto")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-600 mb-8">
            Explora nuestros productos y añade los lentes perfectos para ti.
          </p>
          <Link
            href="/lentes-de-contacto"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/lentes-de-contacto"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continuar comprando
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Carrito de Compras
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Productos
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.brand} • {item.type}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                            {isUpdating === item.id ? "..." : item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>

                {subtotal < 50 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800">
                      Añade {formatPrice(50 - subtotal)} más para envío gratuito
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-4">
                Proceder al Checkout
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Pago seguro con SSL
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Visa</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">Mastercard</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">PayPal</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                También te puede interesar
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Solución limpiadora",
                    price: "€12.99",
                    image: "/api/placeholder/150/150"
                  },
                  {
                    name: "Estuche para lentes",
                    price: "€8.99",
                    image: "/api/placeholder/150/150"
                  }
                ].map((product, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-primary font-bold">{product.price}</p>
                    </div>
                    <Plus className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

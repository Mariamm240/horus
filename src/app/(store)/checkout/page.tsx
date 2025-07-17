"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { CreditCardIcon, TruckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Acuvue Oasys 1-Day",
    brand: "Johnson & Johnson",
    frequency: "Diario",
    planType: "Suscripción Mensual",
    price: 38,
    originalPrice: 45,
    quantity: 2,
    image: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Biofinity",
    brand: "CooperVision",
    frequency: "Mensual",
    planType: "Compra única",
    price: 32,
    originalPrice: 32,
    quantity: 1,
    image: "/api/placeholder/100/100"
  }
]

export default function CheckoutPage() {
  const [items, setItems] = useState(cartItems)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "México"
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  })

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const savings = items.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + shipping

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardInfo(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-base mb-2">Checkout</h1>
        <p className="text-secondary">Completa tu pedido</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle>Tu carrito ({items.length} artículos)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-xs text-secondary">Imagen</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-text-base">{item.name}</h3>
                      <p className="text-sm text-secondary">{item.brand}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">{item.frequency}</Badge>
                        <Badge variant="secondary" className="text-xs">{item.planType}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-medium text-text-base">${item.price * item.quantity}</div>
                      {item.originalPrice > item.price && (
                        <div className="text-sm text-secondary line-through">
                          ${item.originalPrice * item.quantity}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información de envío</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Nombre
                  </label>
                  <Input
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    placeholder="Juan"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Apellido
                  </label>
                  <Input
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    placeholder="Pérez"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Teléfono
                  </label>
                  <Input
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    placeholder="+52 55 1234 5678"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Dirección
                  </label>
                  <Input
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    placeholder="Calle 123, Col. Centro"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Ciudad
                  </label>
                  <Input
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    placeholder="Ciudad de México"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-base mb-2">
                    Código Postal
                  </label>
                  <Input
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    placeholder="12345"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Método de pago</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                      paymentMethod === "card" ? "border-primary bg-primary/5" : "border-gray-200"
                    }`}
                  >
                    <CreditCardIcon className="h-6 w-6 text-primary" />
                    <span className="font-medium">Tarjeta</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                      paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-gray-200"
                    }`}
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="font-medium">PayPal</span>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-base mb-2">
                        Número de tarjeta
                      </label>
                      <Input
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-base mb-2">
                        Fecha de vencimiento
                      </label>
                      <Input
                        name="expiryDate"
                        value={cardInfo.expiryDate}
                        onChange={handleCardChange}
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-base mb-2">
                        CVV
                      </label>
                      <Input
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-base mb-2">
                        Nombre en la tarjeta
                      </label>
                      <Input
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardChange}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Ahorros</span>
                    <span>-${savings}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-secondary">Envío</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Gratis" : `$${shipping}`}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Completar pedido
                </Button>

                {/* Security Features */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center text-sm text-secondary">
                    <TruckIcon className="h-4 w-4 mr-2 text-primary" />
                    <span>Envío gratis en pedidos de $50+</span>
                  </div>
                  <div className="flex items-center text-sm text-secondary">
                    <ShieldCheckIcon className="h-4 w-4 mr-2 text-primary" />
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center text-sm text-secondary">
                    <CreditCardIcon className="h-4 w-4 mr-2 text-primary" />
                    <span>Garantía de satisfacción</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="pt-4 border-t">
                  <div className="flex space-x-2">
                    <Input placeholder="Código promocional" />
                    <Button variant="outline">Aplicar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

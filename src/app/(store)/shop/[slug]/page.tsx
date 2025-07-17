"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, ShoppingCartIcon, HeartIcon, TruckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid"
import { DollarSignIcon } from "lucide-react"

// Mock product data
const productData = {
  "acuvue-oasys-daily": {
    id: 1,
    name: "Acuvue Oasys 1-Day",
    brand: "Johnson & Johnson",
    price: 45,
    subscriptionPrice: 38,
    frequency: "Diario",
    description: "Los lentes de contacto Acuvue Oasys 1-Day están diseñados con la tecnología HydraLuxe, que proporciona una sensación suave y cómoda desde el primer uso hasta el final del día.",
    rating: 4.8,
    reviews: 156,
    images: ["/api/placeholder/400/400", "/api/placeholder/400/400", "/api/placeholder/400/400"],
    features: [
      "Tecnología HydraLuxe para máxima comodidad",
      "Protección UV integrada",
      "Material de silicona hidrogel",
      "Diseño asférico para visión nítida"
    ],
    specifications: {
      "Material": "Senofilcon A",
      "Contenido de agua": "38%",
      "Transmisión de oxígeno": "121 Dk/t",
      "Protección UV": "Sí",
      "Espesor central": "0.085 mm"
    },
    subscriptionOptions: [
      { period: "Mensual", discount: 15, price: 38 },
      { period: "Trimestral", discount: 20, price: 36 },
      { period: "Anual", discount: 25, price: 34 }
    ]
  }
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = productData[slug as keyof typeof productData]
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<"single" | "subscription">("subscription")
  const [selectedSubscription, setSelectedSubscription] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("features")

  if (!product) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-base mb-4">Producto no encontrado</h1>
          <p className="text-secondary">El producto que buscas no existe o ha sido removido.</p>
        </div>
      </div>
    )
  }

  const currentPrice = selectedPlan === "single" 
    ? product.price 
    : product.subscriptionOptions[selectedSubscription].price

  const savings = selectedPlan === "subscription" 
    ? product.price - product.subscriptionOptions[selectedSubscription].price
    : 0

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-secondary">Imagen del producto</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-xs text-secondary">{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">{product.frequency}</Badge>
            <h1 className="text-3xl font-bold text-text-base mb-2">{product.name}</h1>
            <p className="text-lg text-secondary mb-4">{product.brand}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(product.rating) ? (
                    <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                  )
                ))}
                <span className="ml-2 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-secondary">({product.reviews} reseñas)</span>
            </div>

            <p className="text-secondary">{product.description}</p>
          </div>

          {/* Plan Selection */}
            <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSignIcon className="h-5 w-5 mr-2" />
                Selecciona tu plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full grid-cols-2 mb-4">
                <button
                  onClick={() => setSelectedPlan("single")}
                  className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                    selectedPlan === "single"
                      ? "bg-white text-text-base border-primary shadow-sm"
                      : "text-secondary border-gray-200 hover:text-text-base"
                  }`}
                >
                  Compra única
                </button>
                <button
                  onClick={() => setSelectedPlan("subscription")}
                  className={`px-3 py-2 text-sm font-medium rounded-r-md border-l-0 border ${
                    selectedPlan === "subscription"
                      ? "bg-white text-text-base border-primary shadow-sm"
                      : "text-secondary border-gray-200 hover:text-text-base"
                  }`}
                >
                  Suscripción
                </button>
              </div>
                
              {selectedPlan === "single" ? (
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-text-base mb-2">
                    ${product.price}
                  </div>
                  <p className="text-secondary">Precio por caja de 30 lentes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {product.subscriptionOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSubscription(index)}
                      className={`w-full p-4 rounded-lg border-2 transition-colors ${
                        selectedSubscription === index
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="font-semibold text-text-base">{option.period}</div>
                          <div className="text-sm text-secondary">
                            Ahorra {option.discount}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            ${option.price}
                          </div>
                          <div className="text-sm text-secondary line-through">
                            ${product.price}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {savings > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-700">
                    <Badge variant="success" className="mr-2">¡Ahorro!</Badge>
                    <span className="text-sm">
                      Ahorras ${savings} por caja con este plan
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-base mb-2">
                Cantidad de cajas
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1" size="lg">
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Agregar al carrito - ${currentPrice * quantity}
              </Button>
              <Button variant="outline" size="lg">
                <HeartIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <TruckIcon className="h-5 w-5 text-primary" />
              <span className="text-secondary">Envío gratis</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ShieldCheckIcon className="h-5 w-5 text-primary" />
              <span className="text-secondary">Garantía 100%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <StarIcon className="h-5 w-5 text-primary" />
              <span className="text-secondary">Calidad premium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("features")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "features"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-text-base hover:border-gray-300"
              }`}
            >
              Características
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "specifications"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-text-base hover:border-gray-300"
              }`}
            >
              Especificaciones
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-text-base hover:border-gray-300"
              }`}
            >
              Reseñas
            </button>
          </nav>
        </div>
        
        <div className="mt-6">
          {activeTab === "features" && (
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></div>
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "specifications" && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-text-base">{key}:</span>
                      <span className="text-secondary">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "reviews" && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Review summary */}
                  <div className="text-center border-b border-gray-100 pb-6">
                    <div className="text-3xl font-bold text-text-base mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-secondary">Basado en {product.reviews} reseñas</p>
                  </div>
                  
                  {/* Sample reviews */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                        <span className="ml-2 font-medium text-text-base">María G.</span>
                      </div>
                      <p className="text-secondary">
                        Excelentes lentes, muy cómodos durante todo el día. La suscripción es muy conveniente.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
                          ))}
                          <StarIcon className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="ml-2 font-medium text-text-base">Carlos R.</span>
                      </div>
                      <p className="text-secondary">
                        Buena calidad, aunque me gustaría que fueran un poco más económicos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

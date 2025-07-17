"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { TagIcon } from "@heroicons/react/24/outline"

interface CouponInputProps {
  onCouponApplied: (coupon: { code: string; discount: number; type: string }) => void
  onCouponRemoved: () => void
  appliedCoupon?: { code: string; discount: number; type: string } | null
  disabled?: boolean
}

export function CouponInput({ 
  onCouponApplied, 
  onCouponRemoved, 
  appliedCoupon, 
  disabled = false 
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")

  const validateCoupon = async (code: string) => {
    setIsValidating(true)
    setError("")

    try {
      const response = await fetch("/api/woo/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      })

      const data = await response.json()

      if (response.ok && data.valid) {
        onCouponApplied({
          code: data.coupon.code,
          discount: parseFloat(data.coupon.amount),
          type: data.coupon.discount_type
        })
        setCouponCode("")
      } else {
        setError(data.error || "Cupón no válido")
      }
    } catch (error) {
      setError("Error al validar el cupón")
    } finally {
      setIsValidating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.trim() && !isValidating) {
      validateCoupon(couponCode.trim().toUpperCase())
    }
  }

  const handleRemoveCoupon = () => {
    onCouponRemoved()
    setError("")
  }

  if (appliedCoupon) {
    return (
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">
                Cupón aplicado: {appliedCoupon.code}
              </p>
              <p className="text-sm text-green-700">
                {appliedCoupon.type === 'percent' 
                  ? `${appliedCoupon.discount}% de descuento`
                  : `€${appliedCoupon.discount} de descuento`
                }
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            disabled={disabled}
          >
            Quitar
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <TagIcon className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-900">Código de descuento</span>
        </div>
        
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Introduce tu cupón"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase())
              setError("")
            }}
            disabled={disabled || isValidating}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!couponCode.trim() || disabled || isValidating}
            variant="outline"
          >
            {isValidating ? "Validando..." : "Aplicar"}
          </Button>
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <XCircleIcon className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>
    </Card>
  )
}

// Componente para mostrar ofertas activas
export function ActivePromotions() {
  const [promotions] = useState([
    {
      id: 1,
      code: "PRIMERA20",
      title: "20% de descuento en tu primera compra",
      description: "Solo para nuevos clientes",
      discount: 20,
      type: "percent",
      expires: "2024-12-31"
    },
    {
      id: 2,
      code: "ENVIOGRATIS",
      title: "Envío gratuito",
      description: "En compras superiores a €50",
      discount: 0,
      type: "shipping",
      expires: "2024-12-31"
    }
  ])

  if (promotions.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <TagIcon className="w-5 h-5" />
        <h3 className="font-semibold">Ofertas Especiales</h3>
      </div>
      
      <div className="space-y-2">
        {promotions.map((promo) => (
          <div key={promo.id} className="flex items-center justify-between bg-white/10 rounded p-3">
            <div>
              <p className="font-medium">{promo.title}</p>
              <p className="text-sm text-purple-100">{promo.description}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{promo.code}</p>
              <p className="text-xs text-purple-200">
                Válido hasta {new Date(promo.expires).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Banner sticky para promociones en el home
export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <TagIcon className="w-5 h-5" />
            <span className="font-medium">
              🎉 ¡Oferta especial! 20% de descuento en tu primera compra con código PRIMERA20
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 text-xl"
            aria-label="Cerrar banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

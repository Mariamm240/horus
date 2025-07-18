import { ReactNode } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 4 | 6 | 8
  className?: string
}

export function ProductGrid({ 
  children, 
  cols = 3, 
  gap = 6, 
  className 
}: ProductGridProps) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  const gapClass = {
    4: "gap-4",
    6: "gap-6", 
    8: "gap-8"
  }

  return (
    <div className={cn(
      "grid",
      colsClass[cols],
      gapClass[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface ProductCardProps {
  title: string
  price: string
  originalPrice?: string
  image: string
  href: string
  badge?: string
  children?: ReactNode
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  href,
  badge,
  children
}: ProductCardProps) {
  return (
    <a 
      href={href}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {badge && (
          <span className="absolute top-3 left-3 bg-accent text-purple-900 px-2 py-1 rounded-md text-xs font-medium">
            {badge}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>
        
        {children}
      </div>
    </a>
  )
}

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
  className?: string
  backgroundImage?: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  children,
  className,
  backgroundImage
}: HeroSectionProps) {
  return (
    <section 
      className={cn(
        "relative bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white",
        "py-24 sm:py-32 overflow-hidden",
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.8), rgba(139, 69, 19, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {subtitle && (
            <p className="text-accent text-lg font-medium mb-4">
              {subtitle}
            </p>
          )}
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>
          
          {description && (
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

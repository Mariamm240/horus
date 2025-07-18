import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  background?: "white" | "gray" | "primary"
}

export function SectionWrapper({ 
  children, 
  className,
  size = "md",
  background = "white"
}: SectionWrapperProps) {
  const sizeClasses = {
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-20",
    lg: "py-20 sm:py-24"
  }

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    primary: "bg-primary text-white"
  }

  return (
    <section className={cn(
      sizeClasses[size],
      backgroundClasses[background],
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

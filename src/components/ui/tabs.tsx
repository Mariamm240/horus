"use client"

import * as React from "react"
import { Tab } from "@headlessui/react"
import { cn } from "@/lib/utils"

interface TabsProps {
  children: React.ReactNode
  className?: string
  defaultIndex?: number
  onChange?: (index: number) => void
}

const Tabs = ({ children, className, defaultIndex = 0, onChange }: TabsProps) => {
  return (
    <Tab.Group defaultIndex={defaultIndex} onChange={onChange}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </Tab.Group>
  )
}

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Tab.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <Tab
      ref={ref}
      className={({ selected }) =>
        cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          selected
            ? "bg-white text-text-base shadow-sm"
            : "text-secondary hover:text-text-base",
          className
        )
      }
      {...props}
    >
      {children}
    </Tab>
  )
)
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Tab.Panel
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }

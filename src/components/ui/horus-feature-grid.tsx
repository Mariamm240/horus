"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Feature {
  icon: ReactNode
  title: string
  description: string
  highlight?: boolean
}

interface FeatureGridProps {
  title?: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  className?: string
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export function FeatureGrid({
  title,
  description,
  features,
  columns = 3,
  className = ""
}: FeatureGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid gap-8 ${gridCols[columns]}`}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`group relative rounded-2xl p-8 transition-all duration-300 hover:shadow-horus-lg ${
                feature.highlight
                  ? 'bg-gradient-horus-soft border border-primary/20'
                  : 'bg-card border border-border hover:border-primary/20'
              }`}
            >
              {/* Icon */}
              <div className={`inline-flex rounded-xl p-3 ${
                feature.highlight
                  ? 'bg-gradient-horus text-white'
                  : 'bg-muted text-primary group-hover:bg-primary group-hover:text-white'
              } transition-all duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-horus-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

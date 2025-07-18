'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface ImageData {
  id: string
  src: string
  alt: string
  caption?: string
  thumbnail?: string
}

interface ImageGalleryProps {
  images: ImageData[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showThumbnails?: boolean
  showCaptions?: boolean
  className?: string
}

const SAMPLE_IMAGES: ImageData[] = [
  {
    id: '1',
    src: '/api/placeholder/800/600',
    alt: 'Lentes de contacto diarios premium',
    caption: 'Lentes de contacto diarios para uso cómodo y seguro',
    thumbnail: '/api/placeholder/100/100'
  },
  {
    id: '2',
    src: '/api/placeholder/800/600',
    alt: 'Tecnología avanzada en lentes',
    caption: 'Tecnología de hidratación avanzada para mayor comodidad',
    thumbnail: '/api/placeholder/100/100'
  },
  {
    id: '3',
    src: '/api/placeholder/800/600',
    alt: 'Empaque premium de lentes',
    caption: 'Empaque esterilizado y hermético para máxima seguridad',
    thumbnail: '/api/placeholder/100/100'
  },
  {
    id: '4',
    src: '/api/placeholder/800/600',
    alt: 'Diferentes graduaciones disponibles',
    caption: 'Amplia gama de graduaciones y especificaciones',
    thumbnail: '/api/placeholder/100/100'
  }
]

export default function ImageGallery({
  images = SAMPLE_IMAGES,
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showCaptions = true,
  className = ''
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isFullscreen) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length)
      }, autoPlayInterval)

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [autoPlay, autoPlayInterval, images.length, isFullscreen])

  // Stop auto-play when user interacts
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const goToSlide = (index: number) => {
    pauseAutoPlay()
    setCurrentIndex(index)
  }

  const goToPrevious = useCallback(() => {
    pauseAutoPlay()
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    pauseAutoPlay()
    setCurrentIndex(prev => (prev + 1) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            goToPrevious()
            break
          case 'ArrowRight':
            goToNext()
            break
          case 'Escape':
            closeFullscreen()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFullscreen, goToPrevious, goToNext])

  const openFullscreen = () => {
    setIsFullscreen(true)
    pauseAutoPlay()
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setIsZoomed(false)
  }

  const handleZoom = (e: React.MouseEvent) => {
    if (!isFullscreen) return
    
    const rect = imageRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x, y })
    setIsZoomed(!isZoomed)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            goToPrevious()
            break
          case 'ArrowRight':
            goToNext()
            break
          case 'Escape':
            closeFullscreen()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFullscreen, goToPrevious, goToNext])

  const currentImage = images[currentIndex]

  return (
    <>
      {/* Main Gallery */}
      <div className={`relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden ${className}`}>
        {/* Main Image Container */}
        <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 z-10"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 z-10"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 z-10"
          >
            <ArrowsPointingOutIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Slide Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-horus-primary w-8'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caption */}
        {showCaptions && currentImage.caption && (
          <div className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <p className="text-gray-700 dark:text-gray-300 text-center">
              {currentImage.caption}
            </p>
          </div>
        )}

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <motion.button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? 'border-horus-primary'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={image.thumbnail || image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
          >
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 z-20"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>

            {/* Zoom Button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-20 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 z-20"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 z-20"
                >
                  <ChevronLeftIcon className="w-8 h-8 text-white" />
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 z-20"
                >
                  <ChevronRightIcon className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="flex items-center justify-center w-full h-full p-8">
              <motion.div
                ref={imageRef}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-7xl max-h-full cursor-zoom-in"
                onClick={handleZoom}
              >
                <motion.div
                  animate={{
                    scale: isZoomed ? 2 : 1,
                    x: isZoomed ? `-${zoomPosition.x - 50}%` : 0,
                    y: isZoomed ? `-${zoomPosition.y - 50}%` : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    width={1200}
                    height={900}
                    className="object-contain max-h-[80vh] w-auto"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                <span className="text-white text-sm">
                  {currentIndex + 1} de {images.length}
                </span>
              </div>
            )}

            {/* Caption in Fullscreen */}
            {showCaptions && currentImage.caption && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-2xl px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg">
                <p className="text-white text-center">
                  {currentImage.caption}
                </p>
              </div>
            )}

            {/* Thumbnail Strip in Fullscreen */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      goToSlide(index)
                    }}
                    className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'border-horus-primary'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <Image
                      src={image.thumbnail || image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

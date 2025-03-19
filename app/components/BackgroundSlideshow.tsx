'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BackgroundSlideshowProps {
  images: string[]
  interval?: number
}

const defaultImages = [
  '/images/default-bg-1.jpg',
  '/images/default-bg-2.jpg',
  '/images/default-bg-3.jpg',
  '/images/default-bg-4.jpg',
]

export default function BackgroundSlideshow({ images = defaultImages, interval = 5000 }: BackgroundSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preload images to prevent flickering
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new window.Image()
        img.src = src
        img.onload = () => {
          if (src === images[0]) {
            setIsLoading(false)
          }
        }
      })
    }

    preloadImages()

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  const fallbackImage = '/images/img1.jpg'

  return (
    <div className="fixed inset-0 z-0">
      {isLoading ? (
        <div className="absolute inset-0 bg-gray-900"></div>
      ) : (
        <>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/70 z-10"></div>
              <Image
                src={image}
                alt={`Slideshow image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                onError={(e) => {
                  // If the image fails to load, use the fallback image
                  const target = e.target as HTMLImageElement
                  target.src = fallbackImage
                }}
                unoptimized={false}
                quality={75}
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
} 
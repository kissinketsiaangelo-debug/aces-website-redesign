'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

const photos = Array.from({ length: 43 }, (_, i) => ({
  src: `/images/gallery-${i + 1}.jpg`,
  caption: `ACES moment #${i + 1}`,
}))

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % photos.length)
  }, [])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(goNext, 5000)
    return () => clearInterval(timer)
  }, [goNext])

  return (
    <AppShell title="Gallery">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Moments from ACES</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          A look back at events, projects, and community.
        </p>
      </section>

      {/* 3D Coverflow Carousel */}
      <section
        className="relative mt-8 flex items-center justify-center px-2 py-4"
        style={{ perspective: '1400px' }}
      >
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-2 z-20 flex size-10 items-center justify-center rounded-full bg-card/90 backdrop-blur border border-border shadow-md active:scale-90 transition-transform"
        >
          <ChevronLeft className="size-5 text-foreground" aria-hidden="true" />
        </button>

        <div className="relative flex h-72 w-full items-center justify-center overflow-hidden">
          {photos.map((photo, index) => {
            const total = photos.length
            let offset = index - activeIndex

            // Wrap offset for circular effect
            if (offset > total / 2) offset -= total
            if (offset < -total / 2) offset += total

            const isActive = offset === 0
            const absOffset = Math.abs(offset)

            if (absOffset > 2) return null

            const translateX = offset * 145
            const rotateY = offset * -45
            const scale = isActive ? 1 : 0.8
            const zIndex = 10 - absOffset
            const opacity = absOffset > 2 ? 0 : 1
            const brightness = isActive ? 1 : 0.6

            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo: ${photo.caption}`}
                className="absolute h-64 w-48 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: `brightness(${brightness})`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority={isActive}
                />
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-2 z-20 flex size-10 items-center justify-center rounded-full bg-card/90 backdrop-blur border border-border shadow-md active:scale-90 transition-transform"
        >
          <ChevronRight className="size-5 text-foreground" aria-hidden="true" />
        </button>
      </section>

      {/* Caption */}
      <p className="mt-2 px-6 text-center text-sm font-medium text-foreground transition-opacity duration-300">
        {photos[activeIndex].caption}
      </p>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2 pb-8">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to photo ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>
    </AppShell>
  )
}
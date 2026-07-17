'use client'

import { useState, useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { getCategory } from '@/app/gallery/data'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const category = getCategory(slug)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    if (lightboxIndex === null || !category) return
    setLightboxIndex((lightboxIndex + 1) % category.photos.length)
  }, [lightboxIndex, category])

  const goPrev = useCallback(() => {
    if (lightboxIndex === null || !category) return
    setLightboxIndex((lightboxIndex - 1 + category.photos.length) % category.photos.length)
  }, [lightboxIndex, category])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, goNext, goPrev])

  if (!category) {
    return (
      <AppShell title="Not found">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <h1 className="font-heading text-lg font-bold text-foreground">Category not found</h1>
          <Link href="/gallery" className="mt-4 text-sm font-semibold text-primary underline">
            Back to gallery
          </Link>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title={category.name}>
      {/* Header */}
      <section className="px-4 pt-5">
        <Link
          href="/gallery"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to gallery
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground">{category.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {category.count} photos
        </p>
      </section>

      {/* Photo grid */}
      <section className="px-4 pt-5 pb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {category.photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl"
              aria-label={`View photo ${index + 1}`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${lightboxIndex + 1} of ${category.photos.length}`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          {/* Image */}
          <div
            className="relative size-full max-h-full max-w-full p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={category.photos[lightboxIndex].src}
              alt={category.photos[lightboxIndex].caption}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/40"
            aria-label="Next photo"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80">
            {lightboxIndex + 1} / {category.photos.length}
          </p>
        </div>
      )}
    </AppShell>
  )
}

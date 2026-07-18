'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Phone, Store, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { getProductBySlug, getProductsByCategory } from '@/lib/marketplace-data'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  const { addToCart } = useCart()
  const [imgIndex, setImgIndex] = useState(0)

  if (!product) {
    return (
      <AppShell title="Not found">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <Package className="size-12 text-muted-foreground/40" aria-hidden="true" />
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Product not found</h1>
          <Link href="/marketplace" className="mt-4 text-sm font-semibold text-primary underline">
            Back to marketplace
          </Link>
        </section>
      </AppShell>
    )
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <AppShell title={product.name}>
      {/* Back link */}
      <section className="px-4 pt-5">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to marketplace
        </Link>
      </section>

      {/* Image gallery */}
      <section className="px-4 pt-4">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          <Image
            src={product.images[imgIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover transition-opacity duration-300"
            priority
          />
          {product.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setImgIndex((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setImgIndex((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImgIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      'size-2 rounded-full transition-all',
                      i === imgIndex ? 'w-5 bg-white' : 'bg-white/50',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Product info */}
      <section className="px-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">{product.name}</h1>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-0.5 text-[10px] font-semibold text-muted-foreground">
              <Store className="size-3" aria-hidden="true" />
              {product.vendor.name}
            </span>
          </div>
          <p className="shrink-0 text-xl font-bold text-primary">GH₵ {product.price}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          {product.description}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Listed {new Date(product.createdAt).toLocaleDateString('en-GH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      {/* Vendor contact */}
      <section className="px-4 pt-5">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sold by</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{product.vendor.name}</p>
          <a
            href={`tel:${product.vendor.phone.replace(/\s+/g, '')}`}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {product.vendor.phone}
          </a>
        </div>
      </section>

      {/* Add to cart */}
      <section className="px-4 pt-5 pb-8">
        <button
          type="button"
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
            })
          }
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          <ShoppingCart className="size-5" aria-hidden="true" />
          Add to cart — GH₵ {product.price}
        </button>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="px-4 pb-8" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-heading text-base font-bold text-foreground">
            More in this category
          </h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/marketplace/${rel.slug}`}
                className="w-40 shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square">
                  <Image
                    src={rel.images[0]}
                    alt={rel.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div className="p-2.5">
                  <p className="truncate text-xs font-semibold text-foreground">{rel.name}</p>
                  <p className="mt-0.5 text-xs font-bold text-primary">GH₵ {rel.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  )
}

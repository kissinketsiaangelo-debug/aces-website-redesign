'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Phone, Store, Package, Minus, Plus } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { getProductBySlug, getProductsByCategory } from '@/lib/marketplace-data'
import { useCart } from '@/lib/cart-context'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

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

  const activeColor = product.colors
    ? product.colors.find((c) => c.name === selectedColor) ?? null
    : null
  const activeImages = activeColor ? activeColor.images : product.images
  const stock = product.stock ?? 99
  const soldOut = stock === 0
  const canAddToCart = !soldOut && (!product.sizing || selectedSize !== null) && (!product.colors || selectedColor !== null)

  const handleAddToCart = () => {
    if (product.sizing && !selectedSize) return
    if (product.colors && !selectedColor) return
    addToCart(
      { id: product.id, name: product.name, price: product.price, image: activeImages[0] },
      selectedSize ?? undefined,
      selectedColor ?? undefined,
    )
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <AppShell title={product.name}>
      <section className="px-4 pt-5">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to marketplace
        </Link>
      </section>

      <section className="px-4 pt-4">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          <Image
            src={activeImages[selectedImage]}
            alt={product.name}
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover transition-opacity duration-300"
            priority
          />
        </div>
        {activeImages.length > 1 && (
          <div className="mt-3 flex gap-2">
            {activeImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(i)}
                className={`relative size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                  i === selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <Image src={img} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

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

      {product.colors && (
        <section className="px-4 pt-5">
          <p className="text-sm font-semibold text-foreground">
            Colour <span className="text-muted-foreground font-normal">— {selectedColor || 'Select a colour'}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => {
                  setSelectedColor(color.name)
                  setSelectedImage(0)
                }}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
                  selectedColor === color.name
                    ? 'border-primary bg-primary/5 text-primary shadow-sm shadow-primary/20 scale-105'
                    : 'border-border bg-card text-foreground hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <span
                  className="size-5 shrink-0 rounded-full border border-border transition-transform duration-300"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                {color.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {product.sizing && (
        <section className="px-4 pt-5">
          <p className="text-sm font-semibold text-foreground">
            Size <span className="text-muted-foreground font-normal">— {selectedSize || 'Select a size'}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizing.map((size) => (
              <button
                key={size.label}
                type="button"
                onClick={() => size.inStock && setSelectedSize(size.label)}
                disabled={!size.inStock}
                className={`flex h-10 min-w-[3rem] items-center justify-center rounded-xl border px-4 text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
                  selectedSize === size.label
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-105'
                    : size.inStock
                      ? 'border-border bg-card text-foreground hover:border-primary/50 hover:shadow-md'
                      : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {size.label}
                {!size.inStock && <span className="sr-only">(out of stock)</span>}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 pt-5">
        <p className="text-sm font-semibold text-foreground">Quantity</p>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            disabled={soldOut}
            aria-label="Decrease quantity"
            className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Minus className="size-4 transition-transform duration-200" aria-hidden="true" />
          </button>
          <span className="w-8 text-center text-base font-semibold" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty(Math.min(stock, qty + 1))}
            disabled={soldOut}
            aria-label="Increase quantity"
            className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
          <span className="ml-1 text-xs text-muted-foreground">
            {soldOut ? 'Out of stock' : `${stock} in stock`}
          </span>
        </div>
      </section>

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

      <section className="px-4 pt-5 pb-8">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
        >
          <ShoppingCart className="size-5" aria-hidden="true" />
          {soldOut
            ? 'Out of stock'
            : product.colors && !selectedColor
              ? 'Select a colour'
              : product.sizing && !selectedSize
                ? 'Select a size'
                : `Add to cart — GH₵ ${product.price * qty}`}
        </button>
      </section>

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
                className="group/rel w-40 shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
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

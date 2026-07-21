'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, ShoppingBag, Check, Package } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useCart } from '@/lib/cart-context'
import { getProductById, products, type ColorVariant } from '@/lib/products'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, count } = useCart()

  const product = getProductById(params.id as string)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [showCheck, setShowCheck] = useState(false)

  if (!product) {
    return (
      <AppShell title="Product not found">
        <div className="flex flex-col items-center px-6 pt-16 text-center">
          <h1 className="font-heading text-xl font-bold text-navy">Product not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">This product does not exist or has been removed.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Back to shop
          </Link>
        </div>
      </AppShell>
    )
  }

  const activeColor = product.colors
    ? product.colors.find((c) => c.name === selectedColor) ?? null
    : null
  const activeImages = activeColor ? activeColor.images : product.images

  const handleAddToCart = () => {
    if (product.sizing && !selectedSize) return
    if (product.colors && !selectedColor) return
    addToCart(
      { id: product.id, name: product.name, price: product.price, image: product.image, tag: product.tag },
      selectedSize ?? undefined,
      selectedColor ?? undefined,
    )
    setShowCheck(true)
    setTimeout(() => setShowCheck(false), 1500)
  }

  const soldOut = product.stock === 0
  const canAddToCart = !soldOut && (!product.sizing || selectedSize !== null) && (!product.colors || selectedColor !== null)

  return (
    <AppShell>
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="group flex size-10 items-center justify-center rounded-full bg-secondary text-navy transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
        </button>
        <Link
          href="/cart"
          aria-label={`Open cart, ${count} items`}
          className="relative flex size-10 items-center justify-center rounded-full bg-secondary text-navy transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>

      <div className="mt-3 px-4">
        <div className="relative flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl">
          {activeImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setSelectedImage(i); setLightboxOpen(true) }}
              className="relative aspect-square w-full shrink-0 snap-start bg-muted"
              aria-label={`View image ${i + 1} full size`}
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${product.name} view ${i + 1}`}
                fill
                sizes="(max-width: 448px) 100vw, 400px"
                className="object-cover"
              />
            </button>
          ))}
          {product.tag && (
            <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-navy-foreground">
              {product.tag}
            </span>
          )}
        </div>
        {activeImages.length > 1 && (
          <div className="mt-3 flex gap-2">
            {activeImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                  i === selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <Image src={img || '/placeholder.svg'} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Product image"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="relative max-h-[85vh] max-w-full">
              <Image
                src={activeImages[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                width={800}
                height={800}
                className="max-h-[85vh] w-auto rounded-2xl object-contain"
              />
            </div>
            {activeImages.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {activeImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(i) }}
                    aria-label={`View image ${i + 1}`}
                    className={`size-2.5 rounded-full transition-colors ${
                      i === selectedImage ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-4 pt-5">
        <h1 className="font-heading text-xl font-bold text-navy">{product.name}</h1>
        <p className="mt-1 text-2xl font-bold text-primary">GHS {product.price}</p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">{product.description}</p>

        {product.colors && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">
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
                  aria-label={color.name}
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
          </div>
        )}

        {product.sizing && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">
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
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm font-semibold text-navy">Quantity</p>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={soldOut}
              aria-label="Decrease quantity"
              className="flex size-9 items-center justify-center rounded-full bg-secondary text-navy transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Minus className="size-4 transition-transform duration-200" aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-base font-semibold transition-all duration-300" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(Math.min(product.stock, qty + 1))}
              disabled={soldOut}
              aria-label="Increase quantity"
              className="flex size-9 items-center justify-center rounded-full bg-secondary text-navy transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
            <span className="ml-1 text-xs text-muted-foreground">
              {soldOut ? 'Out of stock' : `${product.stock} in stock`}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
        >
          {soldOut ? (
            <>Out of stock</>
          ) : showCheck ? (
            <span className="animate-check-bounce inline-flex items-center gap-2">
              <Check className="size-4" aria-hidden="true" />
              Added!
            </span>
          ) : (
            <>
              <ShoppingBag className="size-4" aria-hidden="true" />
              {product.colors && !selectedColor
                ? 'Select a colour'
                : product.sizing && !selectedSize
                  ? 'Select a size'
                  : `Add to bag — GHS ${product.price * qty}`}
            </>
          )}
        </button>

        <div className="mt-6 rounded-2xl bg-secondary/60 p-4">
          <h2 className="text-sm font-semibold text-navy">Details</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {product.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                {detail}
              </li>
            ))}
          </ul>
          {product.material && (
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Material:</span> {product.material}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Package className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">Free campus pickup</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Pick up at the ACES office (Caesar Building, Room 2). We&apos;ll message you when it&apos;s ready.
            </p>
          </div>
        </div>

        {products.filter((p) => p.id !== product.id).length > 0 && (
          <section className="mt-8 pb-8" aria-labelledby="related-heading">
            <h2 id="related-heading" className="px-4 font-heading text-lg font-bold text-navy">
              You might also like
            </h2>
            <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none">
              {products
                .filter((p) => p.id !== product.id)
                .map((related) => (
                  <Link
                    key={related.id}
                    href={`/shop/${related.id}`}
                    className="group/rel flex w-36 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={related.image || '/placeholder.svg'}
                        alt={related.name}
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                      {related.tag && (
                        <span className="absolute left-1.5 top-1.5 rounded-full bg-navy px-2 py-0.5 text-[9px] font-bold text-navy-foreground">
                          {related.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 p-2.5">
                      <p className="truncate text-xs font-semibold">{related.name}</p>
                      <p className="text-xs font-bold text-navy">GHS {related.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, ShoppingBag } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { cn } from '@/lib/utils'
import { products } from '@/lib/products'

type Category = 'all' | 'apparel' | 'accessories'

const productCategory: Record<string, Category> = {
  codefest: 'apparel',
}

const categories = [
  { key: 'all' as Category, label: 'All' },
  { key: 'apparel' as Category, label: 'Apparel' },
  { key: 'accessories' as Category, label: 'Accessories' },
]

export default function ShopPage() {
  const { addToCart, count } = useCart()
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist()
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => productCategory[p.id] === activeCategory)

  return (
    <AppShell title="ACES Shop">
      <section className="flex items-start justify-between gap-3 px-4 pt-5">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Rep the Land of ACES</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            Official merch, made for CoE students. Pick up on campus — no delivery fees.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            aria-label="Open wishlist"
            className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
          >
            <Heart className="size-5" aria-hidden="true" />
          </Link>
          <Link
            href="/cart"
            aria-label={`Open cart, ${count} items`}
            className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </section>

      <div
        role="tablist"
        aria-label="Filter by product category"
        className="flex gap-2 overflow-x-auto px-4 pt-4 pb-1 no-scrollbar"
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={activeCategory === cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeCategory === cat.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-2 gap-3 px-4 pt-4 pb-8" aria-label="Products">
        {filtered.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <Link href={`/shop/${product.id}`} className="group/image">
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 448px) 50vw, 220px"
                  className="object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:rotate-[2deg]"
                />
                {product.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-navy-foreground transition-transform duration-300 group-hover/image:scale-105">
                    {product.tag}
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    isWishlisted(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image || '/placeholder.svg', addedAt: new Date().toISOString() })
                  }}
                  aria-label={isWishlisted(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                  className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
                >
                  <Heart className={cn('size-4', isWishlisted(product.id) && 'fill-current')} aria-hidden="true" />
                </button>
              </div>
            </Link>
            <div className="flex flex-1 flex-col gap-1 p-3">
              <Link href={`/shop/${product.id}`} className="after:absolute after:inset-0 after:z-0">
                <h2 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors duration-300">{product.name}</h2>
              </Link>
              <div className="mt-auto flex items-center justify-between pt-2">
                <p className="text-sm font-bold text-navy-text">GHS {product.price}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, tag: product.tag })
                  }}
                  aria-label={`Add ${product.name} to bag`}
                  className="relative z-10 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90 active:brightness-90"
                >
                  <Plus className="size-4 transition-transform duration-200 group-hover:rotate-90" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  )
}

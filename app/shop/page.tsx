'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, ShoppingBag } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useCart, type Product } from '@/lib/cart-context'

type ProductWithCategory = Product & { category: 'apparel' | 'accessories' }

const products: ProductWithCategory[] = [
  { id: 'hoodie', name: 'ACES Navy Hoodie', price: 180, image: '/images/product-hoodie.png', tag: 'Best seller', category: 'apparel' },
  { id: 'tee', name: 'ACES Classic Tee', price: 90, image: '/images/product-tee.png', category: 'apparel' },
  { id: 'mug', name: 'ACES Coffee Mug', price: 45, image: '/images/product-mug.png', category: 'accessories' },
  { id: 'stickers', name: 'Sticker Pack (x8)', price: 25, image: '/images/product-stickers.png', tag: 'New', category: 'accessories' },
]

const categories = [
  { key: 'all', label: 'All' },
  { key: 'apparel', label: 'Apparel' },
  { key: 'accessories', label: 'Accessories' },
]

export default function ShopPage() {
  const { addToCart, count } = useCart()
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <AppShell title="ACES Shop">
      <section className="flex items-start justify-between gap-3 px-4 pt-5">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy text-balance">Rep the Land of ACES</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            Official merch, made for CoE students. Pick up on campus — no delivery fees.
          </p>
        </div>
        <Link
          href="/cart"
          aria-label={`Open cart, ${count} items`}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-navy"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </section>

      {/* Sub-market tabs */}
      <div role="tablist" aria-label="Filter by product category" className="flex gap-2 overflow-x-auto px-4 pt-4 pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            role="tab"
            aria-selected={activeCategory === cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeCategory === cat.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-navy'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-2 gap-3 px-4 pt-4 pb-8" aria-label="Products">
        {filtered.map((product) => (
          <article key={product.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-square bg-muted">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                sizes="(max-width: 448px) 50vw, 220px"
                className="object-cover"
              />
              {product.tag && (
                <span className="absolute left-2 top-2 rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-navy-foreground">
                  {product.tag}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1 p-3">
              <h2 className="text-sm font-semibold leading-snug">{product.name}</h2>
              <div className="mt-auto flex items-center justify-between pt-2">
                <p className="text-sm font-bold text-navy">GHS {product.price}</p>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.name} to bag`}
                  className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:opacity-90 active:scale-95"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  )
}
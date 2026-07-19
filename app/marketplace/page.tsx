'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, Store, Phone, Package } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

type Product = {
  id: number
  name: string
  description: string
  price: string
  images: string[]
  category: string
  created_at: string
  business: {
    id: number
    name: string
    slug: string
    phone: string
    email: string
  }
}

const CATEGORIES = [
  { key: 'all', label: 'All', emoji: '🔥' },
  { key: 'Food & Drinks', label: 'Food & Drinks', emoji: '🍔' },
  { key: 'Fashion & Accessories', label: 'Fashion', emoji: '👕' },
  { key: 'Tech & Gadgets', label: 'Tech', emoji: '💻' },
  { key: 'Services', label: 'Services', emoji: '🔧' },
  { key: 'Health & Beauty', label: 'Health & Beauty', emoji: '✨' },
  { key: 'Home & Living', label: 'Home & Living', emoji: '🏠' },
  { key: 'Academic', label: 'Academic', emoji: '📚' },
  { key: 'Entertainment', label: 'Entertainment', emoji: '🎮' },
  { key: 'Other', label: 'Other', emoji: '📦' },
]

const API = 'https://aces-backend-pgtot.ondigitalocean.app/api/student-businesses/products/global/'
const R2 = 'https://pub-5928f18259724e989634e3f638f5914f.r2.dev/'

function productImage(p: Product): string {
  if (p.images?.length) {
    const src = p.images[0]
    if (src.startsWith('http')) return src
    return `${R2}${src}`
  }
  return '/placeholder.svg'
}

function waUrl(phone: string, text: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState<Product | null>(null)

  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load marketplace')
        return r.json()
      })
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selected) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected])

  const filtered = useMemo(() => {
    let list = products
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.business.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    return list
  }, [products, category, query])

  if (loading) {
    return (
      <AppShell title="Marketplace">
        <div className="px-4 pt-5">
          <div className="flex items-center gap-2">
            <Store className="size-5 text-primary" aria-hidden="true" />
            <h1 className="font-heading text-2xl font-bold text-foreground">Marketplace</h1>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
            Discover products &amp; services from fellow KNUST students.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 pt-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-2xl bg-muted" />
              <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
              <div className="mt-1 h-3 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      </AppShell>
    )
  }

  if (error) {
    return (
      <AppShell title="Marketplace">
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <Package className="size-12 text-muted-foreground/40" aria-hidden="true" />
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Failed to load</h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Marketplace">
      <div className="px-4 pt-5">
        <div className="flex items-center gap-2">
          <Store className="size-5 text-primary" aria-hidden="true" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Marketplace</h1>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
          Discover products &amp; services from fellow KNUST students.
        </p>
      </div>

      <div className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products, vendors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto px-4 pt-4">
        <div className="flex gap-2" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={category === cat.key}
              onClick={() => setCategory(cat.key)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                category === cat.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent',
              )}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="text-xs font-medium text-muted-foreground">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-8 sm:grid-cols-3">
          {filtered.map((product, i) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelected(product)}
              className="group/card overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={productImage(product)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 448px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                  priority={i < 4}
                />
              </div>
              <div className="p-2.5">
                <p className="truncate text-xs font-semibold text-foreground">{product.name}</p>
                <p className="mt-0.5 text-xs font-bold text-primary">GH₵ {product.price}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{product.business.name}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center px-4 py-16 text-center">
          <Package className="size-10 text-muted-foreground/40" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">No products found</p>
          <p className="mt-1 text-xs text-muted-foreground">Try adjusting your search or category filter.</p>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto w-full max-w-md rounded-t-3xl bg-background pb-8"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"
              >
                <X className="size-4" />
              </button>

              <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-muted">
                <Image
                  src={productImage(selected)}
                  alt={selected.name}
                  fill
                  sizes="(max-width: 448px) 100vw, 448px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="px-5 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-lg font-bold text-foreground">{selected.name}</h2>
                  <p className="shrink-0 text-lg font-bold text-primary">GH₵ {selected.price}</p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {selected.description}
                </p>

                <Link
                  href={`/marketplace/${selected.business.slug}`}
                  onClick={() => setSelected(null)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <Store className="size-3.5" aria-hidden="true" />
                  {selected.business.name}
                </Link>
              </div>

              <div className="px-5 pt-5">
                <a
                  href={waUrl(
                    selected.business.phone,
                    `Hi! I'm interested in buying *${selected.name}* (GH₵ ${selected.price}) from your store on ACES Marketplace.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-bold text-white transition-colors hover:bg-[#20bd5a] active:scale-[0.98]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Buy via WhatsApp
                </a>

                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                  Seller:{' '}
                  <a
                    href={waUrl(selected.business.phone, '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline"
                  >
                    {selected.business.phone}
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X, Store, Phone, Package } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { cn } from '@/lib/utils'
import { ProductCardSkeleton } from '@/components/skeleton'
import { AnimatePresence, motion } from 'framer-motion'

type Product = {
  id: number
  name: string
  description: string
  price: string
  image: string
  additional_images: string[]
  category: string
  is_available: boolean
  created_at: string
  business_name: string
  business_slug: string
  owner_name: string
  whatsapp_number: string
}

const categoryEmoji: Record<string, string> = {
  'Food & Beverages': '🍔',
  'Fashion & Apparel': '👕',
  'Technology & Electronics': '💻',
  'Services (Design, Tutoring, etc)': '🔧',
  'Beauty & Cosmetics': '✨',
  'Other': '📦',
}

const CATEGORIES = [
  { key: 'all', label: 'All', emoji: '🔥' },
  { key: 'Food & Beverages', label: 'Food & Beverages', emoji: '🍔' },
  { key: 'Fashion & Apparel', label: 'Fashion & Apparel', emoji: '👕' },
  { key: 'Technology & Electronics', label: 'Technology & Electronics', emoji: '💻' },
  { key: 'Services (Design, Tutoring, etc)', label: 'Services', emoji: '🔧' },
  { key: 'Beauty & Cosmetics', label: 'Beauty & Cosmetics', emoji: '✨' },
  { key: 'Other', label: 'Other', emoji: '📦' },
]

const API = 'https://aces-backend-pgtot.ondigitalocean.app/api/student-businesses/products/global/'

function productImage(p: Product): string {
  if (p.image && p.image.startsWith('http')) return p.image
  return '/placeholder.svg'
}

function waUrl(phone: string | undefined | null, text: string): string {
  if (!phone) return '#'
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
}

export default function MarketplacePage() {
  const router = useRouter()
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
          p.business_name.toLowerCase().includes(q) ||
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
            <ProductCardSkeleton key={i} />
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
            className="mt-6 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]"
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

      <div className="overflow-x-auto no-scrollbar px-4 pt-4">
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
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <button
                type="button"
                onClick={() => setSelected(product)}
                className="w-full text-left"
              >
                <div className="relative h-44 overflow-hidden bg-muted">
                  <Image
                    src={productImage(product)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 448px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                    priority={i < 4}
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm">
                    {categoryEmoji[product.category] || '📦'} {product.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground">{product.name}</h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                      GH₵ {product.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="my-3 border-t border-border" />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Store className="size-3.5" aria-hidden="true" />
                      {product.business_name}
                    </span>
                    <span
                      role="link"
                      tabIndex={0}
                      onClick={(e) => { e.stopPropagation(); router.push(`/marketplace/${product.business_slug}`) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); router.push(`/marketplace/${product.business_slug}`) } }}
                      className="cursor-pointer text-[11px] font-semibold text-primary hover:underline"
                    >
                      View Store →
                    </span>
                  </div>
                </div>
              </button>
            </article>
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
                  href={`/marketplace/${selected.business_slug}`}
                  onClick={() => setSelected(null)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <Store className="size-3.5" aria-hidden="true" />
                  {selected.business_name}
                </Link>
              </div>

              <div className="px-5 pt-5">
                <a
                  href={waUrl(
                    selected.whatsapp_number,
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
                    href={waUrl(selected.whatsapp_number, '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline"
                  >
                    {selected.whatsapp_number}
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

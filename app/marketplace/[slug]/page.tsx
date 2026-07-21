'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Store, Phone, Package, X } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
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

const API = 'https://aces-backend-pgtot.ondigitalocean.app/api/student-businesses/products/global/'

function productImage(p: Product): string {
  if (p.image && p.image.startsWith('http')) return p.image
  return '/placeholder.svg'
}

function waUrl(phone: string | undefined | null, text: string): string {
  if (!phone) return '#'
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
}

export default function BusinessPage() {
  const params = useParams()
  const slug = params.slug as string

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Product | null>(null)

  useEffect(() => {
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load')
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

  const businessProducts = useMemo(
    () => products.filter((p) => p.business_slug === slug),
    [products, slug],
  )

  const business = businessProducts.length > 0
    ? { name: businessProducts[0].business_name, slug: businessProducts[0].business_slug, phone: businessProducts[0].whatsapp_number }
    : null

  if (loading) {
    return (
      <AppShell title="Business">
        <div className="px-4 pt-5 lg:px-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Marketplace
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 pt-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:px-8">
          {Array.from({ length: 4 }).map((_, i) => (
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
      <AppShell title="Error">
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <Package className="size-12 text-muted-foreground/40" />
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Failed to load</h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{error}</p>
          <Link
            href="/marketplace"
            className="mt-6 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Back to marketplace
          </Link>
        </div>
      </AppShell>
    )
  }

  if (!business) {
    return (
      <AppShell title="Not found">
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <Store className="size-12 text-muted-foreground/40" />
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Store not found</h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            This business doesn&apos;t exist or has no products listed.
          </p>
          <Link
            href="/marketplace"
            className="mt-6 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Browse marketplace
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title={business.name}>
      <div className="px-4 pt-5 lg:px-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Marketplace
        </Link>
      </div>

      <div className="px-4 pt-4 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Store className="size-6" />
            </span>
            <div>
              <h1 className="font-heading text-lg font-bold text-foreground">{business.name}</h1>
              <p className="text-xs text-muted-foreground">
                {businessProducts.length} product{businessProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <a
            href={waUrl(business.phone, `Hi! I'd like to know more about your products on ACES Marketplace.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#20bd5a] active:scale-[0.98]"
          >
            <Phone className="size-4" />
            Contact via WhatsApp
          </a>

          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            {business.phone}
          </p>
        </div>
      </div>

      {businessProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 px-4 pt-4 pb-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:px-8">
          {businessProducts.map((product, i) => (
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
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center px-4 py-16 text-center">
          <Package className="size-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-foreground">No products yet</p>
          <p className="mt-1 text-xs text-muted-foreground">This store hasn&apos;t added any products.</p>
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
                  <Phone className="size-4" />
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

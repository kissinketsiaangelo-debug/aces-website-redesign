'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Store, Coffee, Shirt, Laptop, Wrench, Sparkles, Package, ArrowRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { ProductCard } from '@/components/marketplace/product-card'
import { categories, searchProducts } from '@/lib/marketplace-data'
import { useMarketplaceAuth } from '@/lib/marketplace-context'
import { cn } from '@/lib/utils'

const iconMap: Record<string, typeof Coffee> = {
  Coffee, Shirt, Laptop, Wrench, Sparkles, Package,
}

export default function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const { isAuthenticated, isVendor } = useMarketplaceAuth()

  const results = useMemo(() => {
    const searched = searchProducts(query)
    if (activeCategory === 'all') return searched
    return searched.filter((p) => p.category === activeCategory)
  }, [query, activeCategory])

  return (
    <AppShell title="Marketplace">
      {/* Header */}
      <section className="px-4 pt-5">
        <div className="flex items-center gap-2">
          <Store className="size-5 text-primary" aria-hidden="true" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Marketplace</h1>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Discover products &amp; services from fellow KNUST engineering students.
        </p>
      </section>

      {/* Search */}
      <section className="px-4 pt-4">
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
      </section>

      {/* Category tabs */}
      <section className="px-4 pt-4">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Filter by category"
        >
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent',
            )}
          >
            All
          </button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Package
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                  activeCategory === cat.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent',
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Results count + CTA */}
      <section className="flex items-center justify-between px-4 pt-4">
        <p className="text-xs font-medium text-muted-foreground">
          {results.length} product{results.length !== 1 ? 's' : ''}
        </p>
        {!isAuthenticated && (
          <Link
            href="/register"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
          >
            Register to sell
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        )}
        {isAuthenticated && !isVendor && (
          <Link
            href="/register"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
          >
            Become a vendor
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        )}
        {isVendor && (
          <Link
            href="/vendor-dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
          >
            Vendor dashboard
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        )}
      </section>

      {/* Product grid */}
      <section className="px-4 pt-3 pb-8">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="size-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-foreground">No products found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </section>
    </AppShell>
  )
}

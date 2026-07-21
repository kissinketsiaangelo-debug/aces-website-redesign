'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useWishlist } from '@/lib/wishlist-context'
import { useCart } from '@/lib/cart-context'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <AppShell title="Wishlist">
      <section className="px-4 pt-5">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to shop
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-foreground">Saved for later</h1>
        {items.length > 0 && (
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-medium text-destructive underline"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      {items.length === 0 ? (
        <section className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Heart className="size-12 text-muted-foreground/30" aria-hidden="true" />
          <h2 className="mt-4 font-heading text-lg font-bold text-foreground">Your wishlist is empty</h2>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-xs">
            Heart items from the shop to save them for later.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Browse shop
          </Link>
        </section>
      ) : (
        <section className="flex flex-col gap-3 px-4 pt-5 pb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                <p className="mt-0.5 text-xs font-medium text-primary">GHS {item.price}</p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
                    removeFromWishlist(item.id)
                  }}
                  aria-label={`Add ${item.name} to cart`}
                  className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]"
                >
                  <ShoppingBag className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                  className="flex size-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </AppShell>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/marketplace-data'

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { addToCart } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/marketplace/${product.slug}`}
        className="relative aspect-square overflow-hidden"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" aria-hidden="true" />
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.vendor.name}
        </span>
        <Link href={`/marketplace/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-base font-bold text-primary">GH₵ {product.price}</p>

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
          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95"
        >
          <ShoppingCart className="size-3.5" aria-hidden="true" />
          Add to cart
        </button>
      </div>
    </article>
  )
}

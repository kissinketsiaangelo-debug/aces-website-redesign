'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, PartyPopper } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { AcesMark } from '@/components/aces-logo'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, total } = useCart()
  const [status, setStatus] = useState<'cart' | 'processing' | 'done'>('cart')

  function handleCheckout() {
    setStatus('processing')
    setTimeout(() => {
      setStatus('done')
      clearCart()
    }, 1800)
  }

  if (status === 'processing') {
    return (
      <AppShell title="Checkout">
        <div className="flex flex-col items-center justify-center px-6 pt-24 text-center" role="status">
          <AcesMark className="size-16 animate-aces-pulse text-primary" />
          <p className="mt-5 font-heading text-lg font-bold text-navy-text">Placing your order...</p>
          <p className="mt-1 text-sm text-muted-foreground">Hold tight, this only takes a moment.</p>
        </div>
      </AppShell>
    )
  }

  if (status === 'done') {
    return (
      <AppShell title="Order placed">
        <div className="flex flex-col items-center px-6 pt-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
            <PartyPopper className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-heading text-xl font-bold text-navy-text text-balance">You&apos;re all set!</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            Your order is confirmed. Pick it up at the ACES office (Caesar Building, Room 2) — we&apos;ll message you
            when it&apos;s ready.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Keep shopping
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="Your bag">
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pt-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
            <ShoppingBag className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-heading text-xl font-bold text-navy-text">Your bag is feeling light</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            Nothing in here yet — the hoodie is calling your name though.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse the shop
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <>
          <section className="px-4 pt-5" aria-label="Cart items">
            <h1 className="font-heading text-2xl font-bold text-navy-text">Your bag</h1>
            <ul className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image src={item.image || '/placeholder.svg'} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="text-sm font-bold text-navy-text">GHS {item.price * item.qty}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
className="flex size-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex size-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                      >
                        <Plus className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from bag`}
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="px-4 pt-5 pb-8" aria-label="Order summary">
            <div className="rounded-2xl bg-secondary/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">GHS {total}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 text-sm">
                <span className="text-muted-foreground">Campus pickup</span>
                <span className="font-semibold text-success">Free</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-heading text-base font-bold text-secondary-foreground">Total</span>
                <span className="font-heading text-base font-bold text-secondary-foreground">GHS {total}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Checkout · GHS {total}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </section>
        </>
      )}
    </AppShell>
  )
}

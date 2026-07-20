'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  PartyPopper,
  Tag,
  X,
  Check,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { AcesMark } from '@/components/aces-logo'
import { useCart } from '@/lib/cart-context'

const DELIVERY_FEE = 20
const COUPONS: Record<string, { label: string; type: 'percent' | 'fixed'; value: number }> = {
  ACES10: { label: '10% off', type: 'percent', value: 10 },
  FREESHIP: { label: 'Free delivery', type: 'fixed', value: DELIVERY_FEE },
}
type Fulfillment = 'pickup' | 'delivery'

function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = 'ACE-'
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, total } = useCart()
  const [status, setStatus] = useState<'cart' | 'address' | 'processing' | 'done'>('cart')
  const [orderId, setOrderId] = useState('')
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    studentId: '',
    hall: '',
    room: '',
    notes: '',
  })

  const deliveryFee = fulfillment === 'delivery' ? DELIVERY_FEE : 0

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0
    const c = COUPONS[appliedCoupon]
    if (!c) return 0
    if (c.type === 'percent') return Math.round(total * (c.value / 100) * 100) / 100
    if (c.type === 'fixed') return Math.min(c.value, total + deliveryFee)
    return 0
  }, [appliedCoupon, total, deliveryFee])

  const grandTotal = Math.max(0, total + deliveryFee - discount)

  function applyCoupon() {
    const code = couponCode.trim().toUpperCase()
    if (!code) return
    if (COUPONS[code]) {
      setAppliedCoupon(code)
      setCouponError('')
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null)
    setCouponError('')
  }

  function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOrderId(generateOrderId())
    setStatus('processing')
    setTimeout(() => {
      setStatus('done')
      clearCart()
    }, 1800)
  }

  if (status === 'address') {
    return (
      <AppShell title="Checkout">
        <section className="px-4 pt-5">
          <button
            type="button"
            onClick={() => setStatus('cart')}
            className="mb-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to bag
          </button>
          <h1 className="font-heading text-xl font-bold text-navy-text">
            {fulfillment === 'pickup' ? 'Pickup details' : 'Delivery details'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {fulfillment === 'pickup'
              ? 'Pick up at the ACES office — tell us who you are.'
              : 'We&apos;ll deliver to your hall — tell us where you are.'}
          </p>
          <form onSubmit={handleAddressSubmit} className="mt-5 flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
                Full name
              </label>
              <input
                id="name"
                required
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                placeholder="Your name"
                className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground">
                Phone number
              </label>
              <input
                id="phone"
                required
                type="tel"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                placeholder="+233 50 000 0000"
                className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="studentId" className="text-xs font-semibold text-muted-foreground">
                Student ID
              </label>
              <input
                id="studentId"
                required
                value={address.studentId}
                onChange={(e) => setAddress({ ...address, studentId: e.target.value })}
                placeholder="e.g. 2123456789"
                className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            {fulfillment === 'delivery' && (
              <>
                <div>
                  <label htmlFor="hall" className="text-xs font-semibold text-muted-foreground">
                    Hall / Hostel
                  </label>
                  <input
                    id="hall"
                    required
                    value={address.hall}
                    onChange={(e) => setAddress({ ...address, hall: e.target.value })}
                    placeholder="e.g. Independence Hall"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="room" className="text-xs font-semibold text-muted-foreground">
                    Room number
                  </label>
                  <input
                    id="room"
                    required
                    value={address.room}
                    onChange={(e) => setAddress({ ...address, room: e.target.value })}
                    placeholder="e.g. B12"
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="notes" className="text-xs font-semibold text-muted-foreground">
                Notes (optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={address.notes}
                onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                placeholder="Anything we should know?"
                className="mt-1.5 w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="rounded-xl bg-secondary/60 p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">GHS {total}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-bold">GHS {deliveryFee}</span>
                </div>
              )}
              {deliveryFee === 0 && (
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Pickup</span>
                  <span className="text-success font-semibold">Free</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-semibold text-success">- GHS {discount}</span>
                </div>
              )}
              <div className="flex justify-between mt-2 border-t border-border pt-2">
                <span className="font-heading text-base font-bold text-secondary-foreground">Total</span>
                <span className="font-heading text-base font-bold text-secondary-foreground">GHS {grandTotal}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Place order · GHS {grandTotal}
            </button>
          </form>
        </section>
      </AppShell>
    )
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
          <div className="mt-3 rounded-xl bg-secondary px-4 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Order number</p>
            <p className="mt-0.5 font-heading text-lg font-bold tracking-wider text-navy-text">{orderId}</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            {fulfillment === 'delivery'
              ? `Your order is confirmed. We'll deliver it to ${address.hall} (Room ${address.room}) — we'll message you when it's on its way.`
              : 'Your order is confirmed. Pick it up at the ACES office (Caesar Building, Room 2) — we\'ll message you when it\'s ready. Save your order number for pickup.'}
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
                <li
                  key={`${item.id}-${item.selectedSize ?? ''}-${item.selectedColor ?? ''}`}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.name}
                      {item.selectedColor && (
                        <span className="font-normal text-muted-foreground"> — {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span className="font-normal text-muted-foreground"> — {item.selectedSize}</span>
                      )}
                    </p>
                    <p className="text-sm font-bold text-navy-text">GHS {item.price * item.qty}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty - 1, item.selectedSize, item.selectedColor)}
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
                        onClick={() => updateQty(item.id, item.qty + 1, item.selectedSize, item.selectedColor)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex size-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                      >
                        <Plus className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
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
            {/* Fulfillment toggle */}
            <div className="mb-4 flex overflow-hidden rounded-xl border border-border bg-secondary p-1">
              <button
                type="button"
                onClick={() => setFulfillment('pickup')}
                className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition-colors ${
                  fulfillment === 'pickup'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pickup (Free)
              </button>
              <button
                type="button"
                onClick={() => setFulfillment('delivery')}
                className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition-colors ${
                  fulfillment === 'delivery'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Delivery (GHS {DELIVERY_FEE})
              </button>
            </div>

            {/* Coupon */}
            <div className="rounded-2xl bg-secondary/60 p-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4 text-success" aria-hidden="true" />
                    <span className="text-sm font-semibold text-success">{appliedCoupon}</span>
                    <span className="text-xs text-muted-foreground">
                      {COUPONS[appliedCoupon]?.label}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="flex size-6 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                    aria-label="Remove coupon"
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value)
                        setCouponError('')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          applyCoupon()
                        }
                      }}
                      placeholder="Coupon code"
                      className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="mt-1.5 text-xs font-medium text-destructive">{couponError}</p>
              )}

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">GHS {total}</span>
                </div>
                {fulfillment === 'pickup' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pickup</span>
                    <span className="font-semibold text-success">Free</span>
                  </div>
                )}
                {fulfillment === 'delivery' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold">GHS {deliveryFee}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-semibold text-success">- GHS {discount}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-heading text-base font-bold text-secondary-foreground">Total</span>
                <span className="font-heading text-base font-bold text-secondary-foreground">
                  GHS {grandTotal}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStatus('address')}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Checkout · GHS {grandTotal}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </section>
        </>
      )}
    </AppShell>
  )
}

'use client'

import Link from 'next/link'
import { PartyPopper, X } from 'lucide-react'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import { BottomNav } from '@/components/bottom-nav'
import { useCart } from '@/lib/cart-context'

function CartToast() {
  const { toast, dismissToast } = useCart()
  if (!toast) return null
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-20 z-50 mx-auto w-full max-w-md px-4"
    >
      <div className="flex items-start gap-3 rounded-2xl bg-navy p-4 text-navy-foreground shadow-xl">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/25 text-primary-foreground">
          <PartyPopper className="size-4" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium leading-snug text-pretty">{toast}</p>
          <Link href="/cart" className="mt-1 inline-block text-sm font-semibold text-secondary underline underline-offset-2">
            View bag
          </Link>
        </div>
        <button type="button" onClick={dismissToast} aria-label="Dismiss notification" className="text-navy-foreground/70">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export function AppShell({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background shadow-[0_0_40px_rgba(11,31,58,0.08)] lg:max-w-6xl lg:shadow-none">
      <AppHeader title={title} />
      <main className="flex-1 pb-24 lg:pb-0">{children}</main>
      <AppFooter />
      <CartToast />
      <BottomNav />
    </div>
  )
}

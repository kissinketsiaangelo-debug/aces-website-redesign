'use client'

import { useState } from 'react'
import { Package, Search, Clock, MapPin, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { cn } from '@/lib/utils'

type OrderStatus = 'pending' | 'processing' | 'ready' | 'completed'
type Order = {
  id: string
  name: string
  status: OrderStatus
  date: string
  items: string[]
  total: number
}

const orders: Order[] = []

const statusConfig: Record<OrderStatus, { label: string; color: string; step: number }> = {
  pending: { label: 'Pending', color: 'bg-warning', step: 0 },
  processing: { label: 'Processing', color: 'bg-primary', step: 1 },
  ready: { label: 'Ready for pickup', color: 'bg-success', step: 2 },
  completed: { label: 'Picked up', color: 'bg-muted-foreground', step: 3 },
}

function StatusTimeline({ status }: { status: OrderStatus }) {
  const current = statusConfig[status].step
  const steps = ['Order placed', 'Processing', 'Ready for pickup', 'Picked up']

  return (
    <div className="flex items-center gap-1">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-1 flex-1 last:flex-none">
          <span
            className={cn(
              'flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors',
              i <= current ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
            )}
          >
            {i + 1}
          </span>
          {i < steps.length - 1 && (
            <span
              className={cn(
                'h-0.5 flex-1 rounded-full transition-colors',
                i < current ? 'bg-primary' : 'bg-muted',
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TrackOrderPage() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = query.trim()
    ? orders.filter((o) => o.id.toLowerCase().includes(query.toLowerCase()) || o.name.toLowerCase().includes(query.toLowerCase()))
    : orders

  return (
    <AppShell title="Track Order">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Track your order</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Check the status of your ACES Shop orders. Pick up at the ACES office when ready.
        </p>
      </section>

      <section className="px-4 pt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by order ID or item..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </section>

      <section className="px-4 pt-4 pb-8">
        {filtered.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {filtered.map((order) => (
              <li key={order.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Package className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{order.name}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold',
                      statusConfig[order.status].color === 'bg-warning' && 'bg-warning/15 text-warning',
                      statusConfig[order.status].color === 'bg-primary' && 'bg-primary/10 text-primary',
                      statusConfig[order.status].color === 'bg-success' && 'bg-success/15 text-success',
                      statusConfig[order.status].color === 'bg-muted-foreground' && 'bg-muted text-muted-foreground',
                    )}
                  >
                    {statusConfig[order.status].label}
                  </span>
                  {expanded === order.id ? (
                    <ChevronUp className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  )}
                </button>
                {expanded === order.id && (
                  <div className="border-t border-border px-4 pb-4 pt-3">
                    <StatusTimeline status={order.status} />
                    <div className="mt-4 flex flex-col gap-2">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-xs text-muted-foreground">{item}</p>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" aria-hidden="true" />
                        Ordered {order.date}
                      </span>
                      <span className="font-semibold text-foreground">GHS {order.total}</span>
                    </div>
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-secondary/60 p-3">
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Pickup location</p>
                        <p className="text-xs text-muted-foreground">ACES Office, Caesar Building, Room 2</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-start gap-2 rounded-xl bg-secondary/60 p-3">
                      <Phone className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">Questions?</p>
                        <p className="text-xs text-muted-foreground">Contact the ACES team</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <Package className="size-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-foreground">No orders found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different search term or check back later.
            </p>
          </div>
        )}
      </section>
    </AppShell>
  )
}

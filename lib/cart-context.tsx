'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNotifications } from '@/lib/notification-context'

export type Product = {
  id: string
  name: string
  price: number
  image: string
  tag?: string
}

export type CartItem = Product & { qty: number }

type CartContextValue = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  count: number
  total: number
  toast: string | null
  dismissToast: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const { addNotification } = useNotifications()

  // Restore prototype cart state so a page refresh doesn't break the demo flow
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem('aces-cart')
      if (saved) setItems(JSON.parse(saved) as CartItem[])
    } catch {
      // ignore corrupt state
    }
  }, [])

  useEffect(() => {
    try {
      window.sessionStorage.setItem('aces-cart', JSON.stringify(items))
    } catch {
      // storage unavailable — in-memory cart still works
    }
  }, [items])

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(`Great choice! The ${product.name} is in your bag. Ready to check out?`)
    setTimeout(() => setToast(null), 3500)
    addNotification({ title: 'Added to bag', body: `${product.name} — GHS ${product.price}`, icon: 'bag', link: '/cart' })
  }, [addNotification])

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const dismissToast = useCallback(() => setToast(null), [])

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0)
    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0)
    return { items, addToCart, removeFromCart, updateQty, clearCart, count, total, toast, dismissToast }
  }, [items, addToCart, removeFromCart, updateQty, clearCart, toast, dismissToast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

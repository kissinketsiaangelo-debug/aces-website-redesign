'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNotifications } from '@/lib/notification-context'

export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  addedAt: string
}

type WishlistContextValue = {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  count: number
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = 'aces_wishlist'

function loadItems(): WishlistItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    setItems(loadItems())
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const { addNotification } = useNotifications()

  const addToWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      addNotification({
        title: 'Saved to wishlist',
        body: item.name,
        icon: 'heart',
        link: '/wishlist',
      })
      return [...prev, item]
    })
  }, [addNotification])

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const isWishlisted = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items],
  )

  const clearWishlist = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      count: items.length,
      clearWishlist,
    }),
    [items, addToWishlist, removeFromWishlist, isWishlisted, clearWishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

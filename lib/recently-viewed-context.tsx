'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ViewedItem = {
  href: string
  label: string
  subtitle?: string
  image?: string
  viewedAt: string
}

type RecentlyViewedContextValue = {
  items: ViewedItem[]
  addItem: (item: Omit<ViewedItem, 'viewedAt'>) => void
  clearItems: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null)

const MAX_ITEMS = 6
const STORAGE_KEY = 'aces_recently_viewed'

function loadItems(): ViewedItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ViewedItem[]>(() => loadItems())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const addItem = useCallback((item: Omit<ViewedItem, 'viewedAt'>) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.href !== item.href)
      return [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  const clearItems = useCallback(() => setItems([]), [])

  const value = useMemo(() => ({ items, addItem, clearItems }), [items, addItem, clearItems])

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext)
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  return ctx
}

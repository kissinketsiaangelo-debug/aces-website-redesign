'use client'

import { createContext, useContext, type ReactNode } from 'react'

type MarketplaceUser = { name: string; email: string; phone: string }

type MarketplaceAuthContext = {
  user: MarketplaceUser | null
  isAuthenticated: false
  isVendor: false
  register: (...args: unknown[]) => { ok: false; error: string }
  login: (...args: unknown[]) => { ok: false; error: string }
  logout: () => void
}

const AuthContext = createContext<MarketplaceAuthContext | null>(null)

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        isAuthenticated: false,
        isVendor: false,
        register: (..._: unknown[]) => ({ ok: false as const, error: 'Marketplace auth is disabled' }),
        login: (..._: unknown[]) => ({ ok: false as const, error: 'Marketplace auth is disabled' }),
        logout: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useMarketplaceAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useMarketplaceAuth must be used within MarketplaceProvider')
  return ctx
}

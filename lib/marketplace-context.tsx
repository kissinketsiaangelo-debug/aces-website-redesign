'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type UserType = 'buyer' | 'vendor'

export type User = {
  name: string
  email: string
  phone: string
  type: UserType
  registeredAt: string
}

type MarketplaceAuthContext = {
  user: User | null
  isAuthenticated: boolean
  isVendor: boolean
  register: (data: { name: string; email: string; phone: string; password: string; type: UserType }) => { ok: true } | { ok: false; error: string }
  login: (data: { email: string; password: string }) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

const AuthContext = createContext<MarketplaceAuthContext | null>(null)

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('aces_marketplace_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function getStoredUsers(): Record<string, { name: string; email: string; phone: string; password: string; type: UserType; registeredAt: string }> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem('aces_marketplace_users')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function storeUser(email: string, data: { name: string; email: string; phone: string; password: string; type: UserType; registeredAt: string }) {
  const all = getStoredUsers()
  all[email.toLowerCase()] = data
  localStorage.setItem('aces_marketplace_users', JSON.stringify(all))
}

function storeSession(user: User) {
  localStorage.setItem('aces_marketplace_user', JSON.stringify(user))
}

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser)

  const register = useCallback(
    (data: { name: string; email: string; phone: string; password: string; type: UserType }): { ok: true } | { ok: false; error: string } => {
      const email = data.email.toLowerCase().trim()
      const existing = getStoredUsers()

      if (existing[email]) {
        return { ok: false, error: 'An account with this email already exists.' }
      }
      if (!data.name.trim() || !email || !data.phone.trim() || !data.password.trim()) {
        return { ok: false, error: 'All fields are required.' }
      }
      if (data.password.length < 6) {
        return { ok: false, error: 'Password must be at least 6 characters.' }
      }

      const record = {
        name: data.name.trim(),
        email,
        phone: data.phone.trim(),
        password: data.password,
        type: data.type,
        registeredAt: new Date().toISOString(),
      }
      storeUser(email, record)

      const sessionUser: User = {
        name: record.name,
        email: record.email,
        phone: record.phone,
        type: record.type,
        registeredAt: record.registeredAt,
      }
      storeSession(sessionUser)
      setUser(sessionUser)
      return { ok: true }
    },
    [],
  )

  const login = useCallback(
    (data: { email: string; password: string }): { ok: true } | { ok: false; error: string } => {
      const email = data.email.toLowerCase().trim()
      const existing = getStoredUsers()
      const record = existing[email]

      if (!record) {
        return { ok: false, error: 'No account found with this email.' }
      }
      if (record.password !== data.password) {
        return { ok: false, error: 'Incorrect password.' }
      }

      const sessionUser: User = {
        name: record.name,
        email: record.email,
        phone: record.phone,
        type: record.type,
        registeredAt: record.registeredAt,
      }
      storeSession(sessionUser)
      setUser(sessionUser)
      return { ok: true }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('aces_marketplace_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isVendor: user?.type === 'vendor',
        register,
        login,
        logout,
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

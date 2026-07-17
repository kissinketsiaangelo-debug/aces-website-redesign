'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNotifications } from '@/lib/notification-context'

type RegistrationContextValue = {
  registered: Set<string>
  clubMemberships: Set<string>
  register: (key: string) => void
  unregister: (key: string) => void
  joinClub: (key: string) => void
  leaveClub: (key: string) => void
  isRegistered: (key: string) => boolean
  isMember: (key: string) => boolean
  registeredCount: number
  clubCount: number
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null)

function loadSet(key: string): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveSet(key: string, data: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    /* storage unavailable */
  }
}

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registered, setRegistered] = useState<string[]>(() => loadSet('aces_registered_events'))
  const [clubMemberships, setClubMemberships] = useState<string[]>(() => loadSet('aces_club_memberships'))
  const { addNotification } = useNotifications()

  useEffect(() => { saveSet('aces_registered_events', registered) }, [registered])
  useEffect(() => { saveSet('aces_club_memberships', clubMemberships) }, [clubMemberships])

  const register = useCallback((key: string) => {
    setRegistered((prev) => (prev.includes(key) ? prev : [...prev, key]))
    addNotification({ title: 'Registered for event', body: `You're in for "${key}"`, icon: 'calendar', link: '/events' })
  }, [addNotification])

  const unregister = useCallback((key: string) => {
    setRegistered((prev) => prev.filter((k) => k !== key))
  }, [])

  const joinClub = useCallback((key: string) => {
    setClubMemberships((prev) => (prev.includes(key) ? prev : [...prev, key]))
    addNotification({ title: 'Joined club', body: `Welcome to ${key}!`, icon: 'user', link: '/executives' })
  }, [addNotification])

  const leaveClub = useCallback((key: string) => {
    setClubMemberships((prev) => prev.filter((k) => k !== key))
  }, [])

  const value = useMemo(
    () => ({
      registered: new Set(registered),
      clubMemberships: new Set(clubMemberships),
      register,
      unregister,
      joinClub,
      leaveClub,
      isRegistered: (key: string) => registered.includes(key),
      isMember: (key: string) => clubMemberships.includes(key),
      registeredCount: registered.length,
      clubCount: clubMemberships.length,
    }),
    [registered, clubMemberships, register, unregister, joinClub, leaveClub],
  )

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext)
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider')
  return ctx
}

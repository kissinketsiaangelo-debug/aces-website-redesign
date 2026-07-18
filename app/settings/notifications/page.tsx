'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { cn } from '@/lib/utils'

type ToggleKey = 'events' | 'scholarships' | 'courses' | 'marketplace'

const toggles: { key: ToggleKey; label: string; desc: string }[] = [
  { key: 'events', label: 'Event reminders', desc: 'Get notified about upcoming ACES events and deadlines' },
  { key: 'scholarships', label: 'Scholarship alerts', desc: 'New scholarship opportunities as they\'re posted' },
  { key: 'courses', label: 'Course updates', desc: 'New materials, past questions and lecture notes' },
  { key: 'marketplace', label: 'Marketplace offers', desc: 'New products and vendor updates' },
]

const STORAGE_KEY = 'aces_notif_prefs'

function loadPrefs(): Record<ToggleKey, boolean> {
  if (typeof window === 'undefined') {
    return { events: true, scholarships: true, courses: true, marketplace: false }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { events: true, scholarships: true, courses: true, marketplace: false }
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
        checked ? 'bg-primary' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}

export default function NotificationsSettingsPage() {
  const [prefs, setPrefs] = useState(loadPrefs)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch { /* ignore */ }
  }, [prefs])

  function toggle(key: ToggleKey) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AppShell title="Notification preferences">
      <section className="px-4 pt-5">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-3.5 rotate-180" aria-hidden="true" />
          Back to profile
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-foreground">Notification preferences</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Choose what you want to be notified about.
        </p>
      </section>

      <section className="flex flex-col gap-3 px-4 pt-6 pb-8">
        {toggles.map((t) => (
          <div
            key={t.key}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Bell className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{t.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
            </div>
            <Toggle checked={prefs[t.key]} onChange={() => toggle(t.key)} />
          </div>
        ))}
      </section>
    </AppShell>
  )
}

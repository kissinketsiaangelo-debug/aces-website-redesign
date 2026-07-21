'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ChevronRight, Save, User } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

const STORAGE_KEY = 'aces_account_settings'

type AccountSettings = {
  displayName: string
  phone: string
  year: string
}

function loadSettings(): AccountSettings {
  if (typeof window === 'undefined') {
    return { displayName: 'Abena Dapaah', phone: '', year: '3' }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { displayName: 'Abena Dapaah', phone: '', year: '3' }
}

export default function AccountSettingsPage() {
  const [settings, setSettings] = useState(loadSettings)
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch { /* ignore */ }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell title="Account settings">
      <section className="px-4 pt-5">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-3.5 rotate-180" aria-hidden="true" />
          Back to profile
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-foreground">Account settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Update your personal information.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-6 pb-8">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
            <User className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{settings.displayName}</p>
            <p className="text-xs text-muted-foreground">Computer Engineering</p>
          </div>
        </div>

        <div>
          <label htmlFor="displayName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            value={settings.displayName}
            onChange={(e) => setSettings((p) => ({ ...p, displayName: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={settings.phone}
            onChange={(e) => setSettings((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+233 XX XXX XXXX"
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="year" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Year of study
          </label>
          <select
            id="year"
            value={settings.year}
            onChange={(e) => setSettings((p) => ({ ...p, year: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
          >
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]"
        >
          <Save className="size-4" aria-hidden="true" />
          {saved ? 'Saved!' : 'Save changes'}
        </button>
      </form>
    </AppShell>
  )
}

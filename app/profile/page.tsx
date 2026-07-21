'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  GraduationCap,
  ShoppingBag,
  Bell,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Download,
  UserPlus,
  LogIn,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useAcesAuth } from '@/lib/aces-auth-context'
import { useRegistration } from '@/lib/registration-context'
import { useNotifications } from '@/lib/notification-context'

const DOWNLOADS_KEY = 'aces_downloaded_courses'

function getDownloadCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(DOWNLOADS_KEY)
    return raw ? JSON.parse(raw).length : 0
  } catch {
    return 0
  }
}

const shortcuts = [
  { href: '/courses', label: 'My course materials', icon: BookOpen },
  { href: '/scholarships', label: 'Saved scholarships', icon: GraduationCap },
  { href: '/cart', label: 'My orders', icon: ShoppingBag },
]

const settings = [
  { href: '/settings/notifications', label: 'Notification preferences', icon: Bell },
  { href: '/settings/account', label: 'Account settings', icon: Settings },
  { href: '/settings/help', label: 'Help & feedback', icon: HelpCircle },
]

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAcesAuth()
  const { registeredCount, clubCount } = useRegistration()
  const { unreadCount } = useNotifications()
  const router = useRouter()
  const [downloads, setDownloads] = useState(0)

  useEffect(() => {
    setDownloads(getDownloadCount())
    const handler = () => setDownloads(getDownloadCount())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  if (!isAuthenticated) {
    return (
      <AppShell title="Profile">
         <section className="flex flex-col items-center px-6 pt-12 pb-10 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <UserPlus className="size-10" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-heading text-xl font-bold text-navy-text">Log in to see your stats</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            Sign in to view your downloads, event registrations, club memberships and more.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              <LogIn className="size-4" aria-hidden="true" />
              Log in
            </Link>
            <Link
              href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              <UserPlus className="size-4" aria-hidden="true" />
              Create account
            </Link>
          </div>
        </section>
      </AppShell>
    )
  }

  const initials = user!.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <AppShell title="Profile">
      <section className="px-4 pt-5">
        <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
              {initials}
            </span>
            <div>
              <h1 className="font-heading text-lg font-bold">{user!.name}</h1>
              <p className="text-xs text-navy-foreground/70">{user!.email}</p>
              <span className="mt-1.5 inline-block rounded-full bg-primary/25 px-2.5 py-0.5 text-[10px] font-bold text-secondary">
                ACES Member
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center rounded-2xl bg-navy-foreground/10 py-3">
              <Download className="size-4 text-secondary" aria-hidden="true" />
              <span className="mt-1 font-heading text-base font-bold">{downloads}</span>
              <span className="text-[10px] text-navy-foreground/70">Downloads</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-navy-foreground/10 py-3">
              <Bell className="size-4 text-secondary" aria-hidden="true" />
              <span className="mt-1 font-heading text-base font-bold">{unreadCount}</span>
              <span className="text-[10px] text-navy-foreground/70">Unread</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-navy-foreground/10 py-3">
              <GraduationCap className="size-4 text-secondary" aria-hidden="true" />
              <span className="mt-1 font-heading text-base font-bold">{registeredCount + clubCount}</span>
              <span className="text-[10px] text-navy-foreground/70">Activities</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6" aria-labelledby="shortcuts-heading">
        <h2 id="shortcuts-heading" className="font-heading text-lg font-bold text-navy-text">
          My stuff
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {shortcuts.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium transition-colors hover:bg-secondary/40"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {item.label}
                  <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="px-4 pt-6 pb-8" aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="font-heading text-lg font-bold text-navy-text">
          Settings
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {settings.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium transition-colors hover:bg-secondary/40"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {item.label}
                  <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
          <li>
            <button
              type="button"
              onClick={() => { logout(); router.push('/') }}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/5 hover:text-destructive"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <LogOut className="size-4" aria-hidden="true" />
              </span>
              Sign out
            </button>
          </li>
        </ul>
      </section>
    </AppShell>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
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
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Profile — ACES KNUST',
}

const stats = [
  { label: 'Downloads', value: '14', icon: Download },
  { label: 'Orders', value: '2', icon: ShoppingBag },
  { label: 'Alerts on', value: '3', icon: Bell },
]

const shortcuts = [
  { href: '/courses', label: 'My course materials', icon: BookOpen },
  { href: '/scholarships', label: 'Saved scholarships', icon: GraduationCap },
  { href: '/cart', label: 'My orders', icon: ShoppingBag },
]

const settings = [
  { label: 'Notification preferences', icon: Bell },
  { label: 'Account settings', icon: Settings },
  { label: 'Help & feedback', icon: HelpCircle },
]

export default function ProfilePage() {
  return (
    <AppShell title="Profile">
      {/* Identity card */}
      <section className="px-4 pt-5">
        <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
              AD
            </span>
            <div>
              <h1 className="font-heading text-lg font-bold">Abena Dapaah</h1>
              <p className="text-xs text-navy-foreground/70">Computer Engineering · Year 3</p>
              <span className="mt-1.5 inline-block rounded-full bg-primary/25 px-2.5 py-0.5 text-[10px] font-bold text-secondary">
                ACES Member · 2025/26
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex flex-col items-center rounded-2xl bg-navy-foreground/10 py-3">
                  <Icon className="size-4 text-secondary" aria-hidden="true" />
                  <span className="mt-1 font-heading text-base font-bold">{stat.value}</span>
                  <span className="text-[10px] text-navy-foreground/70">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="px-4 pt-6" aria-labelledby="shortcuts-heading">
        <h2 id="shortcuts-heading" className="font-heading text-lg font-bold text-navy">
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

      {/* Settings */}
      <section className="px-4 pt-6 pb-8" aria-labelledby="settings-heading">
        <h2 id="settings-heading" className="font-heading text-lg font-bold text-navy">
          Settings
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {settings.map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {item.label}
                <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
              </li>
            )
          })}
          <li className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-muted-foreground">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <LogOut className="size-4" aria-hidden="true" />
            </span>
            Sign out
          </li>
        </ul>
      </section>
    </AppShell>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Info, Users, Briefcase, Images, Lightbulb, Calendar, ChevronRight, Sun, Moon } from 'lucide-react'
import { AcesLogo, AcesMark } from '@/components/aces-logo'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

const menuLinks = [
  { href: '/about', label: 'About ACES', icon: Info },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/executives', label: 'Executives', icon: Users },
  { href: '/staff', label: 'Staff', icon: Briefcase },
  { href: '/gallery', label: 'Gallery', icon: Images },
  { href: '/problems', label: 'Why we redesigned', icon: Lightbulb },
]

export function AppHeader({ title }: { title?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 mx-auto flex w-full max-w-md items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        {title ? (
          <span className="flex items-center gap-2">
            <AcesMark className="size-7 text-primary" />
            <span className="font-heading text-base font-bold text-navy">{title}</span>
          </span>
        ) : (
          <Link href="/" aria-label="ACES KNUST home">
            <AcesLogo />
          </Link>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-full bg-secondary text-navy transition-colors hover:bg-accent"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </header>

      {/* Overlay menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 mx-auto w-full max-w-md transition-opacity duration-200',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-navy/50"
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-[82%] flex-col bg-background shadow-2xl transition-transform duration-250',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <AcesLogo />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-navy transition-colors hover:bg-accent"
              >
                {theme === 'light' ? <Moon className="size-5" aria-hidden="true" /> : <Sun className="size-5" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-navy"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <nav aria-label="Secondary" className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">More from ACES</p>
            <ul className="flex flex-col gap-1">
              {menuLinks.map((link) => {
                const Icon = link.icon
                const active = pathname.startsWith(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                        active ? 'bg-secondary text-primary' : 'text-foreground hover:bg-muted',
                      )}
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      {link.label}
                      <ChevronRight className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="border-t border-border px-5 py-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Association of Computer Engineering Students, KNUST. Built with love for the ACES community.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

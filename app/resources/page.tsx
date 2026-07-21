'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, Calendar, FileText, Sparkles, History } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useRecentlyViewed } from '@/lib/recently-viewed-context'

const hubs = [
  {
    href: '/courses',
    label: 'Courses',
    icon: BookOpen,
    description: 'Lecture slides, past questions and study materials for every year group.',
    stat: '12 courses',
  },
  {
    href: '/scholarships',
    label: 'Scholarships',
    icon: GraduationCap,
    description: 'Funding opportunities, grants and awards for Computer Engineering students.',
    stat: '4 open now',
  },
  {
    href: '/events',
    label: 'Events',
    icon: Calendar,
    description: 'ACES calendar — workshops, socials, hackathons and more.',
    stat: '8 coming up',
  },
]

export default function ResourcesPage() {
  const { items, addItem } = useRecentlyViewed()

  return (
    <AppShell title="Resources">
      <section className="px-4 pt-6">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Everything you need to excel</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Study materials and funding opportunities, curated by the ACES executive team.
        </p>
      </section>

      <section className="flex flex-col gap-4 px-4 pt-5" aria-label="Resource categories">
        {hubs.map((hub) => {
          const Icon = hub.icon
          return (
            <Link
              key={hub.href}
              href={hub.href}
              onClick={() => addItem({ href: hub.href, label: hub.label, subtitle: hub.description })}
              className="flex items-start gap-4 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary/30"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between">
                  <span className="font-heading text-base font-bold text-navy-text">{hub.label}</span>
                  <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{hub.description}</span>
                <span className="mt-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {hub.stat}
                </span>
              </span>
            </Link>
          )
        })}
      </section>

      {/* Recently viewed */}
      {items.length > 0 && (
        <section className="px-4 pt-6" aria-labelledby="recently-viewed-heading">
          <h2 id="recently-viewed-heading" className="font-heading text-sm font-bold text-navy-text inline-flex items-center gap-1.5">
            <History className="size-4 text-muted-foreground" aria-hidden="true" />
            Recently viewed
          </h2>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-44 shrink-0 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-secondary/40"
              >
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                {item.subtitle && (
                  <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">{item.subtitle}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 pt-6 pb-8">
        <div className="flex items-start gap-3 rounded-3xl bg-secondary/60 p-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-sm font-bold text-navy-text">Prep AI study assistant</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Built by ACES members, for ACES members. Practice with AI-generated questions based on your course
              materials.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <FileText className="size-3.5" aria-hidden="true" />
              Coming to the app soon
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

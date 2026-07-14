import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, LayoutGrid, FileQuestion, Navigation, Check, X } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Why We Redesigned — ACES KNUST',
}

const problems = [
  {
    icon: Navigation,
    problem: 'Navigation overload',
    finding: 'The current site crams 11 navigation items into one row — impossible to use with a thumb on mobile.',
    solution: 'A 4-tab bottom navigation bar (Home, Shop, Resources, Profile) plus a hamburger menu for secondary pages.',
    link: { href: '/', label: 'See the bottom nav' },
  },
  {
    icon: FileQuestion,
    problem: 'Empty pages, zero guidance',
    finding: 'The Courses and Scholarships pages show no content and give students no idea when to come back.',
    solution: 'Friendly empty states with illustrations and "notify me" signup, plus fully designed populated states.',
    link: { href: '/scholarships', label: 'See the empty state' },
  },
  {
    icon: LayoutGrid,
    problem: 'No mobile-first hierarchy',
    finding: 'Content is laid out desktop-first with long unstructured sections, tiny tap targets and cold system messages.',
    solution: 'Card-based layouts, large tap targets, warm human microcopy and consistent ACES-blue theming across all 9 pages.',
    link: { href: '/shop', label: 'Try the shop flow' },
  },
]

export default function ProblemsPage() {
  return (
    <AppShell title="Why we redesigned">
      <section className="px-4 pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">CODEFEST 2026 · UI/UX Challenge</p>
        <h1 className="mt-2 font-heading text-2xl font-bold leading-tight text-navy text-balance">
          3 problems we identified on acesknust.com
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          We audited the current ACES website on a phone, screen by screen. These are the three biggest issues we
          found — and how this redesign fixes each one.
        </p>
      </section>

      <section className="flex flex-col gap-4 px-4 pt-6 pb-8" aria-label="Identified problems and solutions">
        {problems.map((item, index) => {
          const Icon = item.icon
          return (
            <article key={item.problem} className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border bg-secondary/50 px-5 py-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Problem {index + 1}
                  </p>
                  <h2 className="font-heading text-base font-bold text-navy">{item.problem}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-5 py-4">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <X className="size-3" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.finding}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed">{item.solution}</p>
                </div>
                <Link
                  href={item.link.href}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  {item.link.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </section>
    </AppShell>
  )
}

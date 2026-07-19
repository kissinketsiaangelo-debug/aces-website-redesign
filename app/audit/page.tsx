import type { Metadata } from 'next'
import { ArrowRight, Check, Smartphone, Navigation, Image, ShoppingCart, BookOpen, Users, Layout, Shield, AlertTriangle } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Audit — ACES KNUST Redesign',
}

type Severity = 'high' | 'medium' | 'low'

const problems: { icon: typeof Smartphone; title: string; description: string; fix: string; severity: Severity }[] = [
  {
    icon: Smartphone,
    title: 'No mobile navigation',
    description: 'The live site uses a desktop hamburger menu that feels cramped and hard to tap on mobile. Key pages are buried.',
    fix: 'Added a persistent bottom tab bar with the 5 most-used destinations and a top header with a searchable menu.',
    severity: 'high',
  },
  {
    icon: Navigation,
    title: 'Cluttered information architecture',
    description: 'Links are scattered across the header, a slide-out drawer, and the footer with inconsistent grouping.',
    fix: 'Consolidated all links into the bottom nav, header, and a clean 3-column footer grouped by context (Explore, Marketplace, Resources).',
    severity: 'high',
  },
  {
    icon: Layout,
    title: 'Homepage lacks clear purpose',
    description: 'The hero does not immediately communicate what ACES is or what a visitor should do next. Entry points are weak.',
    fix: 'Added a CODEFEST banner, a clear hero with one primary CTA, quick-action cards, and visual sections for events, clubs, gallery and testimonials.',
    severity: 'high',
  },
  {
    icon: ShoppingCart,
    title: 'Shop has minimal product info',
    description: 'Only one product (CODEFEST-TECH-POLO) exists. No size/color selectors, no stock tracking on the card.',
    fix: 'Added color picker, size selector with stock indicators, quantity controls, image gallery with lightbox, and detailed product info.',
    severity: 'medium',
  },
  {
    icon: Image,
    title: 'Gallery has no mobile lightbox',
    description: 'Images open in a new tab rather than an in-page viewer. No way to swipe through.',
    fix: 'Added a full-screen lightbox with touch swipe, dot navigation, and keyboard shortcuts (arrow keys + escape).',
    severity: 'medium',
  },
  {
    icon: BookOpen,
    title: 'Courses page is empty',
    description: 'The live site shows only a heading with no course materials listed. Users cannot filter or find resources.',
    fix: 'Built a course library with year/semester filters, download buttons, and a notify-me form for when materials are added.',
    severity: 'medium',
  },
  {
    icon: Users,
    title: 'People pages lack structure',
    description: 'Executives and staff are displayed in plain lists without photos or role context on mobile.',
    fix: 'Designed profile cards with initials/photo, role, year, contact info and expandable details for both executives and staff.',
    severity: 'medium',
  },
  {
    icon: Shield,
    title: 'Footer is inconsistent',
    description: 'The live footer has duplicate social links, no Terms/Policy links, and the newsletter is missing on some pages.',
    fix: 'Unified the footer with proper SVG social icons, newsletter form, department address, Terms/Policy links, and all nav groups.',
    severity: 'low',
  },
]

function SeverityBadge({ severity }: { severity: Severity }) {
  const styles = {
    high: 'bg-destructive/10 text-destructive',
    medium: 'bg-warning/10 text-warning',
    low: 'bg-secondary text-muted-foreground',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[severity]}`}>
      <AlertTriangle className="size-2.5" aria-hidden="true" />
      {severity}
    </span>
  )
}

export default function AuditPage() {
  return (
    <AppShell title="Audit">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text">Website audit</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Problems found on the live ACES KNUST website and how this redesign addresses them. Severity:&nbsp;
          <span className="text-destructive font-semibold">high</span>,&nbsp;
          <span className="text-warning font-semibold">medium</span>,&nbsp;
          <span className="text-muted-foreground font-semibold">low</span>.
        </p>
      </section>

      <div className="flex gap-2 overflow-x-auto px-4 pt-4 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          View redesign
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>

      <section className="flex flex-col gap-3 px-4 pt-3 pb-8">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-sm font-bold text-navy-text">Methodology</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
            We conducted a heuristic evaluation of the live site (https://acesknust.com) on a mobile device
            (iPhone 14 viewport), focusing on navigation, content clarity, task completion, and visual consistency.
            Each issue was categorised by severity and cross-referenced with the challenge rubric before designing
            the solution.
          </p>
        </div>
        {problems.map((problem) => {
          const Icon = problem.icon
          return (
            <div key={problem.title} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-navy-text">{problem.title}</h2>
                      <SeverityBadge severity={problem.severity} />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">{problem.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-success/5 p-3">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-muted-foreground text-pretty">{problem.fix}</p>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </AppShell>
  )
}
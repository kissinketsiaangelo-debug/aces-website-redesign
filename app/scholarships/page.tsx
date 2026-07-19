'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CalendarClock, ExternalLink, GraduationCap } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { DemoStateToggle } from '@/components/demo-state-toggle'
import { NotifyMeForm } from '@/components/notify-me-form'
import { cn } from '@/lib/utils'

type Scholarship = {
  id: string
  name: string
  provider: string
  amount: string
  deadline: string
  daysLeft: number
  eligibility: string
}

const previewCards: Scholarship[] = [
  {
    id: 'preview-1',
    name: 'Scholarship Name',
    provider: 'Funding Organisation',
    amount: 'Award amount',
    deadline: 'DD MMM, YYYY',
    daysLeft: 30,
    eligibility: 'Eligibility criteria',
  },
  {
    id: 'preview-2',
    name: 'Scholarship Name',
    provider: 'Funding Organisation',
    amount: 'Award amount',
    deadline: 'DD MMM, YYYY',
    daysLeft: 14,
    eligibility: 'Eligibility criteria',
  },
  {
    id: 'preview-3',
    name: 'Scholarship Name',
    provider: 'Funding Organisation',
    amount: 'Award amount',
    deadline: 'DD MMM, YYYY',
    daysLeft: 7,
    eligibility: 'Eligibility criteria',
  },
]

function DeadlineBadge({ daysLeft }: { daysLeft: number }) {
  const urgent = daysLeft <= 10
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold',
        urgent ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-primary',
      )}
    >
      <CalendarClock className="size-3" aria-hidden="true" />
      {urgent ? `Closing soon · ${daysLeft} days` : `${daysLeft} days left`}
    </span>
  )
}

function ScholarshipCard({ scholarship, applied }: { scholarship: Scholarship; applied: boolean }) {
  return (
    <li className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <DeadlineBadge daysLeft={scholarship.daysLeft} />
      </div>
      <h2 className="mt-3 font-heading text-base font-bold text-navy-text">{scholarship.name}</h2>
      <p className="text-xs text-muted-foreground">{scholarship.provider}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">
          {scholarship.amount}
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">
          {scholarship.eligibility}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Deadline: {scholarship.deadline}</p>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold',
            applied ? 'bg-success/10 text-success' : 'bg-primary text-primary-foreground',
          )}
        >
          {applied ? 'Application started' : 'Apply now'}
          {!applied && <ExternalLink className="size-3.5" aria-hidden="true" />}
        </span>
      </div>
    </li>
  )
}

export default function ScholarshipsPage() {
  const [showPreview, setShowPreview] = useState(false)
  const [applied, setApplied] = useState<string[]>([])

  return (
    <AppShell title="Scholarships">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Scholarships &amp; funding</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          We list verified scholarships here as they become available. Check back often or sign up to get notified.
        </p>
      </section>

      <div className="px-4 pt-4">
        <DemoStateToggle
          state={showPreview ? 'populated' : 'empty'}
          onChange={(s) => setShowPreview(s === 'populated')}
        />
      </div>

      {showPreview ? (
        <>
          <p className="px-4 pt-4 text-xs font-medium text-muted-foreground">
            Layout preview · sorted by deadline
          </p>
          <ul className="flex flex-col gap-3 px-4 pt-3 pb-8">
            {previewCards.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} applied={applied.includes(s.id)} />
            ))}
          </ul>
        </>
      ) : (
        <section
          className="flex flex-col items-center px-6 pt-6 pb-10 text-center"
          aria-label="No scholarships available"
        >
          <Image
            src="/images/empty-telescope.png"
            alt="Illustration of a character searching the sky with a telescope"
            width={200}
            height={200}
            className="rounded-3xl"
          />
          <h2 className="mt-4 font-heading text-lg font-bold text-navy-text">No scholarships listed yet</h2>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            We&apos;re scanning for new opportunities every week. Drop your email and we&apos;ll tell you first — no
            spam, promise.
          </p>
          <div className="mt-5 w-full max-w-xs">
            <NotifyMeForm topic="scholarships" />
          </div>
        </section>
      )}
    </AppShell>
  )
}

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
  applyUrl: string
}

const scholarships: Scholarship[] = [
  {
    id: 'mtn',
    name: 'MTN Bright Scholarship',
    provider: 'MTN Ghana Foundation',
    amount: 'Full tuition + stipend',
    deadline: 'Mar 15, 2026',
    daysLeft: 39,
    eligibility: 'CWA 65+ · Continuing students',
    applyUrl: 'https://www.mtn.com.gh/mtn-bright-scholarship',
  },
  {
    id: 'getfund',
    name: 'GETFund Scholarship',
    provider: 'Ghana Education Trust Fund',
    amount: 'Tuition support',
    deadline: 'Feb 28, 2026',
    daysLeft: 24,
    eligibility: 'All levels · Needs-based',
    applyUrl: 'https://www.getfund.gov.gh',
  },
  {
    id: 'vodafone',
    name: 'Telecel STEM Award',
    provider: 'Telecel Ghana',
    amount: 'GHS 10,000 / year',
    deadline: 'Feb 20, 2026',
    daysLeft: 16,
    eligibility: 'Women in engineering · Year 2+',
    applyUrl: 'https://www.telecel.com.gh/stem-award',
  },
  {
    id: 'knust-dean',
    name: "Dean's Merit Grant",
    provider: 'KNUST College of Engineering',
    amount: 'GHS 5,000 one-time',
    deadline: 'Feb 10, 2026',
    daysLeft: 6,
    eligibility: 'Top 5% of class · Any year',
    applyUrl: 'https://coe.knust.edu.gh/merit-grant',
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

export default function ScholarshipsPage() {
  const [demoState, setDemoState] = useState<'populated' | 'empty'>('populated')
  const [applied, setApplied] = useState<string[]>([])

  const visible = demoState === 'empty' ? [] : scholarships

  return (
    <AppShell title="Scholarships">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Scholarships &amp; funding</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Verified opportunities for Computer Engineering students, updated by the ACES team.
        </p>
      </section>

      <div className="px-4 pt-4">
        <DemoStateToggle state={demoState} onChange={setDemoState} />
      </div>

      {visible.length > 0 ? (
        <>
          <p className="px-4 pt-4 text-xs font-medium text-muted-foreground">
            {visible.length} opportunities open · sorted by deadline
          </p>
          <ul className="flex flex-col gap-3 px-4 pt-3 pb-8">
            {[...visible]
              .sort((a, b) => a.daysLeft - b.daysLeft)
              .map((scholarship) => {
                const hasApplied = applied.includes(scholarship.id)
                return (
                  <li key={scholarship.id} className="rounded-2xl border border-border bg-card p-4">
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
                      <button
                        type="button"
                        onClick={() => {
                          if (!hasApplied) {
                            setApplied((prev) => [...prev, scholarship.id])
                            window.open(scholarship.applyUrl, '_blank', 'noopener,noreferrer')
                          }
                        }}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                          hasApplied
                            ? 'bg-success/10 text-success'
                            : 'bg-primary text-primary-foreground hover:opacity-90',
                        )}
                      >
                        {hasApplied ? 'Application started' : 'Apply now'}
                        {!hasApplied && <ExternalLink className="size-3.5" aria-hidden="true" />}
                      </button>
                    </div>
                  </li>
                )
              })}
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

import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Staff — ACES KNUST',
}

const staff = [
  { name: 'Prof. E. A. Frimpong', role: 'Head of Department', initials: 'EF', area: 'Computer Engineering' },
  { name: 'Dr. K. O. Gyasi', role: 'Faculty Advisor', initials: 'KG', area: 'Embedded Systems' },
  { name: 'Dr. A. S. Agbemenu', role: 'Senior Lecturer', initials: 'AA', area: 'Digital Systems' },
  { name: 'Dr. P. Y. Okyere', role: 'Senior Lecturer', initials: 'PO', area: 'Networks & Security' },
  { name: 'Dr. J. K. Arthur', role: 'Lecturer', initials: 'JA', area: 'Software Engineering' },
  { name: 'Dr. B. K. Nkansah', role: 'Lecturer', initials: 'BN', area: 'Machine Learning' },
]

export default function StaffPage() {
  return (
    <AppShell title="Staff">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy text-balance">Department staff</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          The lecturers and advisors supporting Computer Engineering at KNUST.
        </p>
      </section>

      <ul className="flex flex-col gap-3 px-4 pt-5 pb-8" aria-label="Staff members">
        {staff.map((member) => (
          <li key={member.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-primary"
              aria-hidden="true"
            >
              {member.initials}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold">{member.name}</h2>
              <p className="text-xs font-medium text-primary">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.area}</p>
            </div>
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-navy"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="size-4" aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>
    </AppShell>
  )
}

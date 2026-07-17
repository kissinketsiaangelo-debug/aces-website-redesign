import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Executives — ACES KNUST',
}

const executives = [
  { name: 'Kwame Mensah', role: 'President', initials: 'KM', color: 'bg-primary' },
  { name: 'Ama Owusu', role: 'Vice President', initials: 'AO', color: 'bg-navy' },
  { name: 'Yaw Boateng', role: 'General Secretary', initials: 'YB', color: 'bg-primary' },
  { name: 'Akosua Asante', role: 'Financial Secretary', initials: 'AA', color: 'bg-navy' },
  { name: 'Kofi Adjei', role: 'Organizing Secretary', initials: 'KA', color: 'bg-primary' },
  { name: 'Efua Darko', role: 'PRO', initials: 'ED', color: 'bg-navy' },
  { name: 'Nana Osei', role: "Women's Commissioner", initials: 'NO', color: 'bg-primary' },
  { name: 'Kojo Appiah', role: 'Sports Secretary', initials: 'KA', color: 'bg-navy' },
]

export default function ExecutivesPage() {
  return (
    <AppShell title="Executives">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-foreground text-balance">Your 2025/26 executives</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Elected by you, working for you. Reach any of them through the ACES office.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 px-4 pt-5 pb-8" aria-label="Executive team">
        {executives.map((exec) => (
          <article
            key={`${exec.name}-${exec.role}`}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center"
          >
            <span
              className={`flex size-14 items-center justify-center rounded-full ${exec.color} font-heading text-base font-bold text-white`}
              aria-hidden="true"
            >
              {exec.initials}
            </span>
            <h2 className="mt-3 text-sm font-semibold leading-snug">{exec.name}</h2>
            <p className="mt-0.5 text-xs font-medium text-primary">{exec.role}</p>
          </article>
        ))}
      </section>
    </AppShell>
  )
}

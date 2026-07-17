'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Users } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

const executivesByYear: Record<string, { initials: string; name: string; role: string; dark?: boolean }[]> = {
  '2025/26': [
    { initials: 'KM', name: 'Kwame Mensah', role: 'President' },
    { initials: 'AO', name: 'Ama Owusu', role: 'Vice President', dark: true },
    { initials: 'YB', name: 'Yaw Boateng', role: 'General Secretary' },
    { initials: 'AA', name: 'Akosua Asante', role: 'Financial Secretary', dark: true },
    { initials: 'KA', name: 'Kofi Adjei', role: 'Organizing Secretary' },
    { initials: 'ED', name: 'Efua Darko', role: 'PRO', dark: true },
    { initials: 'NO', name: 'Nana Osei', role: "Women's Commissioner" },
    { initials: 'KA', name: 'Kojo Appiah', role: 'Sports Secretary', dark: true },
  ],
  '2024/25': [
    { initials: 'JB', name: 'Joseph Baidoo', role: 'President' },
    { initials: 'MF', name: 'Mercy Frimpong', role: 'Vice President', dark: true },
    { initials: 'DA', name: 'Daniel Amankwah', role: 'General Secretary' },
    { initials: 'PS', name: 'Priscilla Sarpong', role: 'Financial Secretary', dark: true },
    { initials: 'EO', name: 'Emmanuel Owusu', role: 'Organizing Secretary' },
    { initials: 'RT', name: 'Rita Tetteh', role: 'PRO', dark: true },
    { initials: 'SB', name: 'Sarah Boakye', role: "Women's Commissioner" },
    { initials: 'IK', name: 'Isaac Kumi', role: 'Sports Secretary', dark: true },
  ],
  '2023/24': [
    { initials: 'FO', name: 'Francis Ofori', role: 'President' },
    { initials: 'GN', name: 'Gifty Nkrumah', role: 'Vice President', dark: true },
    { initials: 'BA', name: 'Bernard Anim', role: 'General Secretary' },
    { initials: 'LT', name: 'Linda Twumasi', role: 'Financial Secretary', dark: true },
    { initials: 'SM', name: 'Samuel Mensah', role: 'Organizing Secretary' },
    { initials: 'CA', name: 'Comfort Asare', role: 'PRO', dark: true },
    { initials: 'VD', name: 'Vera Darko', role: "Women's Commissioner" },
    { initials: 'PO', name: 'Patrick Owusu', role: 'Sports Secretary', dark: true },
  ],
}

const years = Object.keys(executivesByYear)

export default function ExecutivesPage() {
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const executives = executivesByYear[selectedYear]

  return (
    <AppShell title="Executives">
      {/* Hero image */}
      <section className="px-4 pt-5">
        <div className="relative h-48 overflow-hidden rounded-3xl">
          <Image
            src="/images/gallery-6.jpg"
            alt="ACES executive team"
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h1 className="font-heading text-2xl font-bold text-white drop-shadow-sm">Meet Your Leaders</h1>
            <p className="mt-1 text-sm leading-relaxed text-white/85 drop-shadow-sm text-pretty">
              The students elected to serve and represent the Computer Engineering community at KNUST.
            </p>
          </div>
        </div>
      </section>

      {/* Intro text */}
      <section className="px-4 pt-6">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          We are a student-led association that aims to provide an environment where students can grow and
          develop their skills. It is with great honor and enthusiasm that we, the executives leading the
          Noble Association, extend our warmest welcome to each and every one of you.
        </p>
      </section>

      {/* Year selector */}
      <section className="px-4 pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Academic year</p>
        <div className="relative mt-2 inline-block">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-navy-foreground"
          >
            {selectedYear} Executives
            <ChevronDown className="size-4" aria-hidden="true" />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    setSelectedYear(year)
                    setDropdownOpen(false)
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary/50 ${
                    year === selectedYear ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Executives grid */}
      <section className="px-4 pt-6 pb-8">
        <h2 className="font-heading text-lg font-bold text-foreground">Your {selectedYear} executives</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Elected by you, working for you. Reach any of them through the ACES office.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {executives.map((exec, i) => (
            <div key={i} className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center">
              <span
                className={`flex size-14 items-center justify-center rounded-full font-heading text-sm font-bold ${
                  exec.dark ? 'bg-navy text-navy-foreground' : 'bg-primary text-primary-foreground'
                }`}
              >
                {exec.initials}
              </span>
              <p className="mt-2 text-sm font-semibold text-foreground">{exec.name}</p>
              <p className="text-xs font-medium text-primary">{exec.role}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  )
}

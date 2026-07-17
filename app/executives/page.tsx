'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Eye } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { ExecutiveModal, type ExecutiveData } from '@/components/executives/executive-modal'

type ExecInfo = ExecutiveData

function exe(name: string, role: string, year: string, dept: string, email: string, linkedin: string): ExecInfo {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
  return {
    initials,
    name,
    role,
    photo: `https://picsum.photos/seed/${name.replace(/\s+/g, '-').toLowerCase()}/200/200`,
    year,
    department: dept,
    email,
    linkedin,
  }
}

const executivesByYear: Record<string, ExecInfo[]> = {
  '2025/26': [
    exe('Kwame Mensah', 'President', 'Year 4', 'Computer Engineering', 'k.mensah@aces.edu', 'https://linkedin.com/in/kwamemensah'),
    exe('Ama Owusu', 'Vice President', 'Year 3', 'Computer Engineering', 'a.owusu@aces.edu', 'https://linkedin.com/in/amaowusu'),
    exe('Yaw Boateng', 'General Secretary', 'Year 3', 'Computer Engineering', 'y.boateng@aces.edu', 'https://linkedin.com/in/yawboateng'),
    exe('Akosua Asante', 'Financial Secretary', 'Year 4', 'Computer Engineering', 'a.asante@aces.edu', 'https://linkedin.com/in/akosuaasante'),
    exe('Kofi Adjei', 'Organizing Secretary', 'Year 3', 'Computer Engineering', 'k.adjei@aces.edu', 'https://linkedin.com/in/kofiadjei'),
    exe('Efua Darko', 'PRO', 'Year 4', 'Computer Engineering', 'e.darko@aces.edu', 'https://linkedin.com/in/efuadarko'),
    exe('Nana Osei', "Women's Commissioner", 'Year 3', 'Computer Engineering', 'n.osei@aces.edu', 'https://linkedin.com/in/nanaosei'),
    exe('Kojo Appiah', 'Sports Secretary', 'Year 2', 'Computer Engineering', 'k.appiah@aces.edu', 'https://linkedin.com/in/kojoappiah'),
  ],
  '2024/25': [
    exe('Joseph Baidoo', 'President', 'Year 4', 'Computer Engineering', 'j.baidoo@aces.edu', 'https://linkedin.com/in/josephbaidoo'),
    exe('Mercy Frimpong', 'Vice President', 'Year 4', 'Computer Engineering', 'm.frimpong@aces.edu', 'https://linkedin.com/in/mercyfrimpong'),
    exe('Daniel Amankwah', 'General Secretary', 'Year 3', 'Computer Engineering', 'd.amankwah@aces.edu', 'https://linkedin.com/in/danielamankwah'),
    exe('Priscilla Sarpong', 'Financial Secretary', 'Year 4', 'Computer Engineering', 'p.sarpong@aces.edu', 'https://linkedin.com/in/priscillasarpong'),
    exe('Emmanuel Owusu', 'Organizing Secretary', 'Year 3', 'Computer Engineering', 'e.owusu@aces.edu', 'https://linkedin.com/in/emmanuelowusu'),
    exe('Rita Tetteh', 'PRO', 'Year 3', 'Computer Engineering', 'r.tetteh@aces.edu', 'https://linkedin.com/in/ritatetteh'),
    exe('Sarah Boakye', "Women's Commissioner", 'Year 4', 'Computer Engineering', 's.boakye@aces.edu', 'https://linkedin.com/in/sarahboakye'),
    exe('Isaac Kumi', 'Sports Secretary', 'Year 2', 'Computer Engineering', 'i.kumi@aces.edu', 'https://linkedin.com/in/isaackumi'),
  ],
  '2023/24': [
    exe('Francis Ofori', 'President', 'Year 4', 'Computer Engineering', 'f.ofori@aces.edu', 'https://linkedin.com/in/francisofori'),
    exe('Gifty Nkrumah', 'Vice President', 'Year 4', 'Computer Engineering', 'g.nkrumah@aces.edu', 'https://linkedin.com/in/giftynkrumah'),
    exe('Bernard Anim', 'General Secretary', 'Year 3', 'Computer Engineering', 'b.anim@aces.edu', 'https://linkedin.com/in/bernardanim'),
    exe('Linda Twumasi', 'Financial Secretary', 'Year 4', 'Computer Engineering', 'l.twumasi@aces.edu', 'https://linkedin.com/in/lindatwumasi'),
    exe('Samuel Mensah', 'Organizing Secretary', 'Year 3', 'Computer Engineering', 's.mensah@aces.edu', 'https://linkedin.com/in/samuelmensah'),
    exe('Comfort Asare', 'PRO', 'Year 3', 'Computer Engineering', 'c.asare@aces.edu', 'https://linkedin.com/in/comfortasare'),
    exe('Vera Darko', "Women's Commissioner", 'Year 4', 'Computer Engineering', 'v.darko@aces.edu', 'https://linkedin.com/in/veradarko'),
    exe('Patrick Owusu', 'Sports Secretary', 'Year 2', 'Computer Engineering', 'p.owusu@aces.edu', 'https://linkedin.com/in/patrickowusu'),
  ],
}

const years = Object.keys(executivesByYear)

export default function ExecutivesPage() {
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [profile, setProfile] = useState<ExecInfo | null>(null)
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
          Elected by you, working for you. Tap &ldquo;View Profile&rdquo; to reach out.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {executives.map((exec, i) => (
            <div
              key={exec.name}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center"
            >
              {/* Photo */}
              <div className="relative size-16 overflow-hidden rounded-full border-2 border-border">
                <Image
                  src={exec.photo}
                  alt={exec.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  priority={i < 4}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{exec.name}</p>
              <p className="text-xs font-medium text-primary">{exec.role}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {exec.year} &middot; {exec.department}
              </p>
              <button
                type="button"
                onClick={() => setProfile(exec)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-[11px] font-semibold text-foreground transition-colors hover:bg-accent active:scale-95"
              >
                <Eye className="size-3.5" aria-hidden="true" />
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Profile modal */}
      <ExecutiveModal exec={profile} open={profile !== null} onClose={() => setProfile(null)} />
    </AppShell>
  )
}

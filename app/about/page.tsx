'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Shield, GraduationCap, Target, Briefcase, Repeat, Globe, Lightbulb, Users } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

const tabs = ['Mission', 'Vision', 'Our Logo']

const objectives = [
  {
    icon: Briefcase,
    title: 'Internships',
    description: 'Create opportunities for students to obtain practical exposure through industrial attachments.',
  },
  {
    icon: Target,
    title: 'Skills',
    description: 'Create opportunities for students to acquire skills useful in the field of computer engineering.',
  },
  {
    icon: Repeat,
    title: 'Exchange',
    description: 'Organize exchange programs with other computer engineering institutions.',
  },
  {
    icon: Globe,
    title: 'Outreach',
    description: 'Make computer engineering attractive to students in second cycle institutions.',
  },
  {
    icon: Lightbulb,
    title: 'Application',
    description: 'Help students put into practice the knowledge acquired.',
  },
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <AppShell title="About ACES">
      <section className="px-4 pt-5">
        <div className="relative h-44 overflow-hidden rounded-3xl">
          <Image
            src="/images/aces-group-photo.png"
            alt="ACES group photo"
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 px-5 pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Technology For Our Age</p>
            <h1 className="font-heading text-xl font-bold text-navy-foreground text-balance">
              Association of Computer Engineering Students
            </h1>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <h2 className="font-heading text-lg font-bold text-navy-text">Who we are</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          ACES is the official student body representing all Computer Engineering students at KNUST. As a vibrant
          community of innovative and forward-thinking individuals, ACES serves as a platform for students to connect,
          learn, and grow together in the field of Computer Engineering.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
          Our association is committed to supporting students through a wide range of initiatives, including technical
          workshops, career development programs, mentorship, industrial visits, networking events, and community
          service. We organize events, competitions, conferences, and strive to bridge the gap between classroom
          learning and real-world application.
        </p>
      </section>

      <section className="px-4 pt-6">
        <div role="tablist" aria-label="About tabs" className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeTab === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-4" role="tabpanel">
          {activeTab === 0 && (
            <div>
              <Shield className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-2 text-sm font-bold text-navy-text">Our Mission</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                To unite, empower and represent Computer Engineering students at KNUST by fostering academic
                excellence, professional development and a strong sense of community.
              </p>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <GraduationCap className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-2 text-sm font-bold text-navy-text">Our Vision</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                A community where every Computer Engineering student thrives — academically, socially and
                professionally — and graduates ready to lead in Ghana&apos;s technology space.
              </p>
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex flex-col items-center text-center">
              <div className="relative size-20">
                <Image
                  src="/images/aceslogo.png"
                  alt="ACES Logo"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-navy-text">The ACES Emblem</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Our logo represents the fusion of computer engineering principles with African identity —
                symbolising innovation rooted in heritage.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pt-6" aria-labelledby="objectives-heading">
        <h2 id="objectives-heading" className="font-heading text-lg font-bold text-navy-text">
          Our Objectives
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          {objectives.map((obj) => {
            const Icon = obj.icon
            return (
              <div key={obj.title} className="flex items-start gap-4 rounded-2xl bg-secondary/60 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy-text">{obj.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{obj.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-4 pt-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              DH
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-text">Prof. E. A. Frimpong</p>
              <p className="text-xs text-muted-foreground">Department Head</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            Under the leadership of our department head, ACES continues to grow as a hub for innovation, academic
            excellence, and student development within the Computer Engineering Department.
          </p>
        </div>
      </section>

      <section className="px-4 pt-6 pb-8">
        <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <h2 className="font-heading text-lg font-bold">Meet the people behind ACES</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-foreground/80">
            Get to know the executives and staff who keep the association running.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/executives"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
            >
              Executives
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/staff"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-foreground/10 px-4 py-2.5 text-xs font-semibold text-navy-foreground"
            >
              Staff
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

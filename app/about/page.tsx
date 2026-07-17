import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Target, Heart, Users } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'About — ACES KNUST',
}

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We push each other to grow — academically, professionally and personally.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'From year 1 to final year, every ACES member belongs to one family.',
  },
  {
    icon: Heart,
    title: 'Service',
    description: 'We give back through mentorship, open resources and outreach programs.',
  },
]

export default function AboutPage() {
  return (
    <AppShell title="About ACES">
      <section className="px-4 pt-5">
        <div className="relative h-44 overflow-hidden rounded-3xl">
          <Image
            src="/images/gallery-5.jpg"
            alt="ACES students at CodeFest"
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 px-5 pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Est. at KNUST</p>
            <h1 className="font-heading text-xl font-bold text-navy-foreground text-balance">
              Association of Computer Engineering Students
            </h1>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <h2 className="font-heading text-lg font-bold text-navy-text">Who we are</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          ACES is the official student body for Computer Engineering students at the Kwame Nkrumah University of
          Science and Technology. We connect over 600 students through clubs, events, study resources and career
          opportunities — building the next generation of engineers in Ghana and beyond.
        </p>
      </section>

      <section className="px-4 pt-6" aria-labelledby="values-heading">
        <h2 id="values-heading" className="font-heading text-lg font-bold text-navy-text">
          What we stand for
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div key={value.title} className="flex items-start gap-4 rounded-2xl bg-secondary/60 p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy-text">{value.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </div>
            )
          })}
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

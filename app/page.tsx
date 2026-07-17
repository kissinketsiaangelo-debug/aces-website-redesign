import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Cpu,
  Code2,
  Bot,
  GraduationCap,
  ShoppingBag,
  Images,
  Quote,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'

const quickActions = [
  { href: '/courses', label: 'Courses', icon: BookOpen, description: 'Slides & past questions' },
  { href: '/scholarships', label: 'Scholarships', icon: GraduationCap, description: 'Funding opportunities' },
  { href: '/shop', label: 'ACES Shop', icon: ShoppingBag, description: 'Hoodies, tees & more' },
  { href: '/gallery', label: 'Gallery', icon: Images, description: 'Moments from events' },
]

const clubs = [
  {
    name: 'Arduino Club',
    icon: Cpu,
    image: '/images/club-arduino.jpg',
    description: 'Hands-on electronics and embedded systems with real hardware projects.',
  },
  {
    name: 'Coding Club',
    icon: Code2,
    image: '/images/club-coding.jpg',
    description: 'Build beautiful websites and apps with modern frameworks.',
  },
  {
    name: 'Robotics Club',
    icon: Bot,
    image: '/images/club-robotics.jpg',
    description: 'Design, build and program intelligent robots as a team.',
  },
]

const events = [
  { name: 'CodeFest 2026', date: 'Feb 21', image: '/images/event-codefest.jpg', detail: 'Coding challenges, workshops and networking.' },
  { name: 'Robotics Meeting', date: 'Mar 03', image: '/images/event-robotics-meeting.jpg', detail: 'Collaborate, build bots and automate solutions.' },
  { name: 'ACES Dinner 2026', date: 'Apr 18', image: '/images/event-dinner.jpg', detail: 'A night of fun, food and fellowship.' },
]

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="px-4 pt-5">
        <div className="relative h-72 overflow-hidden rounded-3xl">
          <Image
            src="/images/gallery-1.jpg"
            alt="ACES students collaborating in the engineering lab"
            fill
            priority
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/30" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/15 border-t border-white/25 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/90">Akwaaba, welcome back</p>
            <h1 className="mt-1 font-heading text-2xl font-bold leading-tight text-balance text-white drop-shadow-sm">
              The Land of ACES, now in your pocket
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/85 text-pretty drop-shadow-sm">
              Courses, scholarships, events and community for Computer Engineering students at KNUST.
            </p>
            <Link
              href="/courses"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Explore resources
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="px-4 pt-6" aria-labelledby="quick-actions">
        <h2 id="quick-actions" className="font-heading text-lg font-bold text-navy-text">
          Jump right in
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">{action.label}</span>
                <span className="text-xs leading-snug text-muted-foreground">{action.description}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Upcoming events */}
      <section className="px-4 pt-7" aria-labelledby="events-heading">
        <div className="flex items-center justify-between">
          <h2 id="events-heading" className="font-heading text-lg font-bold text-navy-text">
            Upcoming events
          </h2>
          <Link href="/events" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            View all
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-3 flex flex-col gap-3">
  {events.map((event) => (
    <li key={event.name} className="relative h-44 overflow-hidden rounded-2xl">
      <Image
        src={event.image}
        alt=""
        fill
        sizes="400px"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy/30" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 p-4 backdrop-blur-md bg-white/15 border-t border-white/25">
        <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-white/25 backdrop-blur-sm text-white">
          <Calendar className="size-4" aria-hidden="true" />
          <span className="mt-0.5 text-[10px] font-bold">{event.date}</span>
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white drop-shadow-sm">{event.name}</p>
          <p className="truncate text-xs text-white/90 drop-shadow-sm">{event.detail}</p>
        </div>
      </div>
    </li>
  ))}
</ul>
      </section>

      {/* Clubs */}
<section className="px-4 pt-7" aria-labelledby="clubs-heading">
  <h2 id="clubs-heading" className="font-heading text-lg font-bold text-navy-text">
    Our clubs
  </h2>
  <div className="mt-3 flex flex-col gap-3">
    {clubs.map((club) => {
      const Icon = club.icon
      return (
        <div
          key={club.name}
          className="relative h-40 overflow-hidden rounded-2xl"
        >
          <Image
            src={club.image}
            alt=""
            fill
            sizes="400px"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-navy/30" aria-hidden="true" />

          {/* Glass panel */}
          <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-white/15 border-t border-white/25">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/25 backdrop-blur-sm text-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white drop-shadow-sm">ACES {club.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/90 drop-shadow-sm">
                  {club.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    })}
  </div>
</section>

      {/* Testimonial */}
      <section className="px-4 pt-7 pb-6" aria-labelledby="testimonial-heading">
        <h2 id="testimonial-heading" className="sr-only">
          Student testimonial
        </h2>
        <figure className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <Quote className="size-6 text-primary" aria-hidden="true" />
          <blockquote className="mt-3 text-sm leading-relaxed text-pretty">
            &ldquo;This platform helped me study for examinations. I love how everything is organized and
            intuitive.&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              BA
            </span>
            <span>
              <span className="block text-sm font-semibold">Benjamin Etonam Abotsi</span>
              <span className="block text-xs text-navy-foreground/70">The great mind behind Prep AI</span>
            </span>
          </figcaption>
        </figure>
      </section>
    </AppShell>
  )
}

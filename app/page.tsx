'use client'

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
  UserCheck,
  UserPlus,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useRegistration } from '@/lib/registration-context'
import { cn } from '@/lib/utils'

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
    capacity: 30,
    members: 14,
  },
  {
    name: 'Coding Club',
    icon: Code2,
    image: '/images/club-coding.jpg',
    description: 'Build beautiful websites and apps with modern frameworks.',
    capacity: 40,
    members: 22,
  },
  {
    name: 'Robotics Club',
    icon: Bot,
    image: '/images/club-robotics.jpg',
    description: 'Design, build and program intelligent robots as a team.',
    capacity: 25,
    members: 18,
  },
]

const events = [
  { name: 'CodeFest 2026', date: 'Feb 21', image: '/images/event-codefest.jpg', detail: 'Coding challenges, workshops and networking.', capacity: 120, registered: 98 },
  { name: 'Robotics Meeting', date: 'Mar 03', image: '/images/event-robotics-meeting.jpg', detail: 'Collaborate, build bots and automate solutions.', capacity: 40, registered: 12 },
  { name: 'ACES Dinner 2026', date: 'Apr 18', image: '/images/event-dinner.jpg', detail: 'A night of fun, food and fellowship.', capacity: 200, registered: 145 },
]

function SeatsBadge({ left }: { left: number }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold',
        left <= 5 ? 'bg-destructive/15 text-destructive' : left <= 15 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success',
      )}
    >
      <UserCheck className="size-2.5" aria-hidden="true" />
      {left === 0 ? 'Full' : `${left} left`}
    </span>
  )
}

export default function HomePage() {
  const { register, isRegistered, joinClub, isMember } = useRegistration()
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/90 drop-shadow-sm">Akwaaba, welcome back</p>
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
  {events.map((event) => {
    const regd = isRegistered(event.name)
    const left = Math.max(0, event.capacity - event.registered - (regd ? 1 : 0))
    return (
    <li key={event.name} className="relative h-44 overflow-hidden rounded-2xl">
      <Image
        src={event.image}
        alt=""
        fill
        sizes="400px"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4">
        <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-white/30 text-white drop-shadow-sm">
          <Calendar className="size-4" aria-hidden="true" />
          <span className="mt-0.5 text-[10px] font-bold">{event.date}</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white drop-shadow-sm">{event.name}</p>
            <SeatsBadge left={left} />
          </div>
          <p className="truncate text-xs text-white/90 drop-shadow-sm">{event.detail}</p>
        </div>
        <button
          type="button"
          onClick={() => register(event.name)}
          disabled={left === 0 && !regd}
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors',
            regd
              ? 'bg-success/20 text-success'
              : left === 0
                ? 'bg-muted/30 text-white/50 cursor-not-allowed'
                : 'bg-white/25 text-white hover:bg-white/35',
          )}
        >
          {regd ? '✓' : left === 0 ? 'Full' : 'Register'}
        </button>
      </div>
    </li>
    )
  })}
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
      const member = isMember(club.name)
      const spots = club.capacity - club.members - (member ? 1 : 0)
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/30 text-white drop-shadow-sm">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white drop-shadow-sm">ACES {club.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/90 drop-shadow-sm">
                  {club.description}
                </p>
                <p className="mt-1 text-[10px] text-white/80 drop-shadow-sm">
                  {club.members} member{club.members !== 1 ? 's' : ''} · {Math.max(0, spots)} spot{spots !== 1 ? 's' : ''} left
                </p>
              </div>
              <button
                type="button"
                onClick={() => member ? {} : joinClub(club.name)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold transition-colors',
                  member
                    ? 'bg-success/20 text-success'
                    : 'bg-white/25 text-white hover:bg-white/35',
                )}
              >
                {member ? 'Member ✓' : 'Join'}
              </button>
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

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarPlus,
  Check,
  Cpu,
  Code2,
  Bot,
  ExternalLink,
  GraduationCap,
  ShoppingBag,
  Images,
  Quote,
  UserCheck,
  UserPlus,
  X,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useRegistration } from '@/lib/registration-context'
import { useAcesAuth } from '@/lib/aces-auth-context'
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
  { name: 'Career Fair', date: 'Jul 28', image: '/images/career-fair.jpg', detail: 'Meet industry partners across three days — register now!', capacity: 500, registered: 120, regLink: 'https://forms.gle/4J9d7qq1298kEjTWA' },
  { name: 'CodeFest 2026', date: 'Feb 21', image: '/images/event-codefest.jpg', detail: 'Coding challenges, workshops and networking.', capacity: 120, registered: 98 },
  { name: 'Robotics Meeting', date: 'Mar 03', image: '/images/event-robotics-meeting.jpg', detail: 'Collaborate, build bots and automate solutions.', capacity: 40, registered: 12 },
  { name: 'ACES Hangout', date: 'Aug 22', image: '/images/hangout.jpg', detail: 'Games, music and good vibes — a break from the books.', capacity: 100, registered: 44 },
]

function SeatsBadge({ left, className }: { left: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold',
        left <= 5 ? 'bg-destructive/15 text-destructive' : left <= 15 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success',
        className,
      )}
    >
      <UserCheck className="size-2.5" aria-hidden="true" />
      {left === 0 ? 'Full' : `${left} left`}
    </span>
  )
}

function JoinForm({ club, onClose }: { club: string; onClose: () => void }) {
  const { joinClub } = useRegistration()
  const { user } = useAcesAuth()
  const [year, setYear] = useState('')
  const [interests, setInterests] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    joinClub(club)
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-md items-end justify-center">
      <div className="absolute inset-0 bg-navy/50" onClick={onClose} aria-hidden="true" />
      <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-background px-6 pb-8 pt-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/15">
              <UserCheck className="size-7 text-success animate-check-bounce" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-bold text-foreground">Welcome to {club}!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks for joining. The club executive will reach out soon.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-lg font-bold text-foreground">Join ACES {club}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us a bit about yourself, {user?.name || ''}.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div>
                <label htmlFor="year" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current year
                </label>
                <select
                  id="year"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
                >
                  <option value="">Select your year</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                </select>
              </div>
              <div>
                <label htmlFor="interests" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Interests
                </label>
                <input
                  id="interests"
                  type="text"
                  required
                  placeholder="e.g. embedded systems, AI, web dev"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="reason" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Why do you want to join?
                </label>
                <textarea
                  id="reason"
                  required
                  rows={3}
                  placeholder="Tell us what you hope to learn or contribute..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              >
                Submit & join
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { register, isRegistered, joinClub, isMember } = useRegistration()
  const { isAuthenticated } = useAcesAuth()
  const router = useRouter()
  const [joinClubName, setJoinClubName] = useState<string | null>(null)

  const galleryImages = [
    { src: '/images/Acesshirt.jpg', alt: 'ACES Shirt' },
    { src: '/images/Jersey.jpg', alt: 'ACES Jersey' },
    { src: '/images/Trip.jpg', alt: 'ACES Trip' },
    { src: '/images/codefest.jpg', alt: 'CodeFest' },
  ]

  return (
    <AppShell>
      {/* CODEFEST Banner */}
      <section className="px-4 pt-4">
        <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 p-3">
          <span className="text-lg" aria-hidden="true">🔥</span>
          <p className="flex-1 text-xs font-semibold text-navy">
            CODEFEST is here! Register now for the challenges
          </p>
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) { router.push('/login?redirect=/'); return }
              register('CodeFest 2026')
            }}
            className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold text-primary-foreground transition-all duration-200 active:scale-[0.97]"
          >
            Register Now →
          </button>
        </div>
      </section>

      {/* Hero */}
      <section className="px-4 pt-5">
        <div className="relative h-72 overflow-hidden rounded-3xl">
          <Image
            src="/images/homeImage.png"
            alt="ACES students collaborating"
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
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
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

      {/* Our Gallery */}
      <section className="px-4 pt-7" aria-labelledby="gallery-heading">
        <div className="flex items-center justify-between">
          <h2 id="gallery-heading" className="font-heading text-lg font-bold text-navy-text">
            Our Gallery
          </h2>
          <Link href="/gallery" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            See more
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative h-36 w-56 shrink-0 overflow-hidden rounded-2xl">
              <Image src={img.src} alt={img.alt} fill sizes="224px" className="object-cover" />
            </div>
          ))}
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
            const hasRegLink = 'regLink' in event
            return (
              <li key={event.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image src={event.image} alt="" fill sizes="400px" className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-[2deg]" aria-hidden="true" />
                  <span className="absolute left-2 top-2 rounded-full bg-black/30 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    {event.date}
                  </span>
                  <span className="absolute right-2 top-2">
                    <SeatsBadge left={left} className="bg-black/40 backdrop-blur-sm text-white!" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <h2 className="text-sm font-semibold leading-snug text-foreground">{event.name}</h2>
                  <p className="text-xs text-muted-foreground line-clamp-2">{event.detail}</p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    {hasRegLink ? (
                      <a
                        href={(event as any).regLink as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Register for ${event.name}`}
                        className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuthenticated) { router.push('/login?redirect=/'); return }
                          register(event.name)
                        }}
                        disabled={(left === 0 && !regd) || (!isAuthenticated && regd)}
                        aria-label={regd ? 'Registered' : `Register for ${event.name}`}
                        className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {regd ? (
                          <Check className="size-3.5 animate-check-bounce" aria-hidden="true" />
                        ) : (
                          <UserCheck className="size-3.5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
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
            const member = isMember(club.name)
            const spots = club.capacity - club.members - (member ? 1 : 0)
            return (
              <div key={club.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image src={club.image} alt="" fill sizes="400px" className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-[2deg]" aria-hidden="true" />
                  {member && (
                    <span className="absolute right-2 top-2 rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-bold text-success backdrop-blur-sm">
                      Member ✓
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <h2 className="text-sm font-semibold leading-snug text-foreground">ACES {club.name}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{club.description}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {club.members} member{club.members !== 1 ? 's' : ''} · {Math.max(0, spots)} spot{spots !== 1 ? 's' : ''} left
                  </p>
                  <div className="mt-auto flex items-center justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (member) return
                        if (!isAuthenticated) { router.push('/login?redirect=/'); return }
                        setJoinClubName(club.name)
                      }}
                      disabled={member}
                      aria-label={member ? 'Member' : `Join ${club.name}`}
                      className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {member ? (
                        <Check className="size-3.5 animate-check-bounce" aria-hidden="true" />
                      ) : (
                        <UserPlus className="size-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {joinClubName && <JoinForm club={joinClubName} onClose={() => setJoinClubName(null)} />}

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

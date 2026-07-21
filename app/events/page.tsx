'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Calendar, CalendarPlus, MapPin, Clock, UserCheck, Timer, Check, ExternalLink } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useRegistration } from '@/lib/registration-context'
import { useAcesAuth } from '@/lib/aces-auth-context'
import { cn } from '@/lib/utils'

type Event = {
  name: string
  date: string
  month: string
  day: string
  detail: string
  time: string
  location: string
  category: 'academic' | 'social' | 'club'
  image: string
  capacity: number
  registered: number
  dateObj: Date
  pinned?: boolean
  regLink?: string
}

function buildEvents(): Event[] {
  return [
    { name: 'CodeFest 2026', date: 'Feb 21', month: 'FEB', day: '21', detail: 'Coding challenges, workshops and networking — a full day of tech.', time: '8:00 AM – 5:00 PM', location: 'Engineering Auditorium', category: 'academic', image: '/images/event-codefest.jpg', capacity: 120, registered: 98, dateObj: new Date(2026, 1, 21), pinned: true },
    { name: 'Robotics Meeting', date: 'Mar 03', month: 'MAR', day: '03', detail: 'Collaborate, build bots and automate solutions with the Robotics Club.', time: '3:00 PM – 6:00 PM', location: 'Robotics Lab', category: 'club', image: '/images/event-robotics-meeting.jpg', capacity: 40, registered: 12, dateObj: new Date(2026, 2, 3), pinned: true },
    { name: 'ACES Dinner 2026', date: 'Apr 18', month: 'APR', day: '18', detail: 'A night of fun, food and fellowship — awards and networking included.', time: '6:00 PM – 10:00 PM', location: 'Great Hall', category: 'social', image: '/images/event-dinner.jpg', capacity: 200, registered: 145, dateObj: new Date(2026, 3, 18) },
    { name: 'Arduino Workshop', date: 'May 10', month: 'MAY', day: '10', detail: 'Hands-on session on embedded systems and sensor interfacing.', time: '10:00 AM – 2:00 PM', location: 'CEB Lab 3', category: 'club', image: '/images/arduino-workshop.jpg', capacity: 30, registered: 28, dateObj: new Date(2026, 4, 10), pinned: true },
    { name: 'Career Fair', date: 'Jul 28', month: 'JUL', day: '28', detail: 'Meet industry partners — internships, graduate roles and mentorship across three days (28th, 29th & 30th July).', time: '9:00 am – 4:00 pm', location: 'Colleges, KNUST Great hall and within colleges', category: 'academic', image: '/images/career-fair.jpg', capacity: 500, registered: 120, dateObj: new Date(2026, 6, 28), pinned: true, regLink: 'https://forms.gle/4J9d7qq1298kEjTWA' },
    { name: 'Coding Bootcamp', date: 'Jul 12', month: 'JUL', day: '12', detail: 'Weekend crash course on web development with modern frameworks.', time: '9:00 AM – 3:00 PM', location: 'CS Department', category: 'academic', image: '/images/coding-bootcamp.jpg', capacity: 50, registered: 35, dateObj: new Date(2026, 6, 12), pinned: true },
    { name: 'ACES Hangout', date: 'Aug 22', month: 'AUG', day: '22', detail: 'Games, music and good vibes — a break from the books.', time: '2:00 PM – 7:00 PM', location: 'Unity Garden', category: 'social', image: '/images/hangout.jpg', capacity: 100, registered: 44, dateObj: new Date(2026, 7, 22) },
    { name: 'Freshmen Orientation', date: 'Sep 15', month: 'SEP', day: '15', detail: 'Welcome new ACES members — meet executives and learn the ropes.', time: '10:00 AM – 1:00 PM', location: 'LT 1', category: 'social', image: '/images/orientation.jpg', capacity: 80, registered: 61, dateObj: new Date(2026, 8, 15) },
  ]
}

const categories = [
  { key: 'all', label: 'All events' },
  { key: 'academic', label: 'Academic' },
  { key: 'social', label: 'Social' },
  { key: 'club', label: 'Club' },
]

type TimePeriod = 'upcoming' | 'past'

function SeatsBadge({ left, className }: { left: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold',
        left <= 5 ? 'bg-destructive/15 text-destructive' : left <= 15 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success',
        className,
      )}
    >
      <UserCheck className="size-3" aria-hidden="true" />
      {left === 0 ? 'Full' : `${left} seat${left !== 1 ? 's' : ''} left`}
    </span>
  )
}

function Countdown({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState('')

  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setRemaining('Started!'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setRemaining(`${d}d ${h}h ${m}m`)
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [target])

  if (!remaining) return null

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-[10px] font-semibold text-muted-foreground">
      <Timer className="size-3" aria-hidden="true" />
      {remaining}
    </span>
  )
}

const monthIdx: Record<string, string> = {
  JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
  JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
}

function getCalendarUrl(event: Event) {
  const m = monthIdx[event.month] || '01'
  const d = event.day.padStart(2, '0')

  function to24h(t: string) {
    const [h, m2] = t.replace(/(AM|PM)/i, '').trim().split(':').map(Number)
    const isPM = /pm/i.test(t)
    const hour = isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h
    return `${String(hour).padStart(2, '0')}${String(m2 || 0).padStart(2, '0')}00`
  }

  const [startT, endT] = event.time.split('–').map((s) => s.trim())
  const start = `2026${m}${d}T${to24h(startT)}`
  const end = `2026${m}${d}T${to24h(endT)}`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    dates: `${start}/${end}`,
    details: event.detail,
    location: event.location,
    sf: 'true',
    output: 'xml',
  })
  return `https://www.google.com/calendar/render?${params.toString()}`
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [period, setPeriod] = useState<TimePeriod>('upcoming')
  const { register, isRegistered } = useRegistration()
  const { isAuthenticated } = useAcesAuth()
  const router = useRouter()

  const events = buildEvents()
  const now = new Date()

  const byPeriod = period === 'upcoming'
    ? events.filter((e) => e.dateObj >= now || e.pinned)
    : events.filter((e) => e.dateObj < now && !e.pinned)

  const filtered = activeCategory === 'all'
    ? byPeriod
    : byPeriod.filter((e) => e.category === activeCategory)

  return (
    <AppShell title="Events">
      <section className="px-4 pt-5 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">ACES calendar</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Everything happening in the Land of ACES — mark your calendar.
        </p>
      </section>

      <div className="flex gap-2 px-4 pt-4 pb-1 lg:px-8" role="tablist" aria-label="Time period">
        {(['upcoming', 'past'] as TimePeriod[]).map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={period === p}
            onClick={() => setPeriod(p)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
              period === p
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent',
            )}
          >
            {p === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
          </button>
        ))}
      </div>

      <div role="tablist" aria-label="Filter events by category" className="flex gap-2 overflow-x-auto no-scrollbar px-4 pt-2 pb-1 lg:px-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
              activeCategory === cat.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <p className="px-4 pt-4 text-xs font-medium text-muted-foreground lg:px-8">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} {period === 'upcoming' ? 'coming up' : 'in the past'}
        </p>
      ) : (
        <p className="px-4 pt-4 text-xs font-medium text-muted-foreground lg:px-8">
          No {activeCategory} events {period === 'upcoming' ? 'scheduled' : 'found'} — check back soon.
        </p>
      )}

      <ul className="flex flex-col gap-3 px-4 pt-3 pb-8 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-8">
        {filtered.map((event) => {
          const registered = isRegistered(event.name)
          const left = Math.max(0, event.capacity - event.registered - (registered ? 1 : 0))
          return (
            <li key={event.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 lg:max-w-sm">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes="400px"
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-[2deg]"
                  aria-hidden="true"
                />
                <span className="absolute left-2 top-2 flex size-10 shrink-0 flex-col items-center justify-center rounded-xl bg-black/30 text-white backdrop-blur-sm">
                  <span className="text-[8px] font-bold tracking-wider">{event.month}</span>
                  <span className="-mt-0.5 text-xs font-bold leading-none">{event.day}</span>
                </span>
                {period === 'upcoming' && (
                  <span className="absolute right-2 top-2">
                    <SeatsBadge left={left} className="bg-black/40 backdrop-blur-sm text-white!" />
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <h2 className="text-sm font-semibold leading-snug text-foreground">{event.name}</h2>
                <p className="text-xs text-muted-foreground line-clamp-2">{event.detail}</p>
                <div className="mt-auto flex items-center gap-1 pt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="size-3" aria-hidden="true" />
                    {event.time}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="size-3" aria-hidden="true" />
                    {event.location}
                  </span>
                  {period === 'upcoming' && <Countdown target={event.dateObj} />}
                  <div className="ml-auto flex items-center gap-1.5">
                    <a
                      href={getCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Add ${event.name} to calendar`}
                      className="flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90"
                    >
                      <CalendarPlus className="size-3.5" aria-hidden="true" />
                    </a>
                    {period === 'upcoming' && event.regLink && (
                      <a
                        href={event.regLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Register for ${event.name}`}
                        className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {period === 'upcoming' && !event.regLink && (
                      <button
                        type="button"
                        onClick={() => {
                          if (!isAuthenticated) {
                            router.push('/login?redirect=events')
                            return
                          }
                          register(event.name)
                        }}
                        disabled={(left === 0 && !registered) || (!isAuthenticated && registered)}
                        aria-label={registered ? 'Registered' : `Register for ${event.name}`}
                        className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-110 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {registered ? (
                          <Check className="size-3.5 animate-check-bounce" aria-hidden="true" />
                        ) : (
                          <UserCheck className="size-3.5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </AppShell>
  )
}

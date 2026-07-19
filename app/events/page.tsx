'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Calendar, CalendarPlus, MapPin, Clock, UserCheck, Timer } from 'lucide-react'
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
}

function buildEvents(): Event[] {
  return [
    { name: 'CodeFest 2026', date: 'Feb 21', month: 'FEB', day: '21', detail: 'Coding challenges, workshops and networking — a full day of tech.', time: '8:00 AM – 5:00 PM', location: 'Engineering Auditorium', category: 'academic', image: '/images/event-codefest.jpg', capacity: 120, registered: 98, dateObj: new Date(2026, 1, 21) },
    { name: 'Robotics Meeting', date: 'Mar 03', month: 'MAR', day: '03', detail: 'Collaborate, build bots and automate solutions with the Robotics Club.', time: '3:00 PM – 6:00 PM', location: 'Robotics Lab', category: 'club', image: '/images/event-robotics-meeting.jpg', capacity: 40, registered: 12, dateObj: new Date(2026, 2, 3) },
    { name: 'ACES Dinner 2026', date: 'Apr 18', month: 'APR', day: '18', detail: 'A night of fun, food and fellowship — awards and networking included.', time: '6:00 PM – 10:00 PM', location: 'Great Hall', category: 'social', image: '/images/event-dinner.jpg', capacity: 200, registered: 145, dateObj: new Date(2026, 3, 18) },
    { name: 'Arduino Workshop', date: 'May 10', month: 'MAY', day: '10', detail: 'Hands-on session on embedded systems and sensor interfacing.', time: '10:00 AM – 2:00 PM', location: 'CEB Lab 3', category: 'club', image: '/images/arduino-workshop.jpg', capacity: 30, registered: 28, dateObj: new Date(2026, 4, 10) },
    { name: 'Career Fair', date: 'Jun 05', month: 'JUN', day: '05', detail: 'Meet industry partners — internships, graduate roles and mentorship.', time: '9:00 AM – 4:00 PM', location: 'Engineering Foyer', category: 'academic', image: '/images/career-fair.jpg', capacity: 150, registered: 72, dateObj: new Date(2026, 5, 5) },
    { name: 'Coding Bootcamp', date: 'Jul 12', month: 'JUL', day: '12', detail: 'Weekend crash course on web development with modern frameworks.', time: '9:00 AM – 3:00 PM', location: 'CS Department', category: 'academic', image: '/images/coding-bootcamp.jpg', capacity: 50, registered: 35, dateObj: new Date(2026, 6, 12) },
    { name: 'ACES Hangout', date: 'Aug 22', month: 'AUG', day: '22', detail: 'Games, music and good vibes — a break from the books.', time: '2:00 PM – 7:00 PM', location: 'Unity Garden', category: 'social', image: '/images/gallery-12.jpg', capacity: 100, registered: 44, dateObj: new Date(2026, 7, 22) },
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

function SeatsBadge({ left }: { left: number }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold',
        left <= 5 ? 'bg-destructive/15 text-destructive' : left <= 15 ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success',
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
    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold text-white/80">
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
    ? events.filter((e) => e.dateObj >= now)
    : events.filter((e) => e.dateObj < now)

  const filtered = activeCategory === 'all'
    ? byPeriod
    : byPeriod.filter((e) => e.category === activeCategory)

  return (
    <AppShell title="Events">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">ACES calendar</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Everything happening in the Land of ACES — mark your calendar.
        </p>
      </section>

      <div className="flex gap-2 px-4 pt-4 pb-1" role="tablist" aria-label="Time period">
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

      <div role="tablist" aria-label="Filter events by category" className="flex gap-2 overflow-x-auto px-4 pt-2 pb-1">
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
        <p className="px-4 pt-4 text-xs font-medium text-muted-foreground">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} {period === 'upcoming' ? 'coming up' : 'in the past'}
        </p>
      ) : (
        <p className="px-4 pt-4 text-xs font-medium text-muted-foreground">
          No {activeCategory} events {period === 'upcoming' ? 'scheduled' : 'found'} — check back soon.
        </p>
      )}

      <ul className="flex flex-col gap-3 px-4 pt-3 pb-8">
        {filtered.map((event) => {
          const registered = isRegistered(event.name)
          const left = Math.max(0, event.capacity - event.registered - (registered ? 1 : 0))
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
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-white/30 text-white drop-shadow-sm">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    <span className="mt-0.5 text-[8px] font-bold tracking-wider">{event.month}</span>
                    <span className="-mt-0.5 text-xs font-bold leading-none">{event.day}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-white drop-shadow-sm">{event.name}</h2>
                      {period === 'upcoming' && <SeatsBadge left={left} />}
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-white/90 drop-shadow-sm line-clamp-2">{event.detail}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/85">
                        <Clock className="size-3" aria-hidden="true" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/85">
                        <MapPin className="size-3" aria-hidden="true" />
                        {event.location}
                      </span>
                      {period === 'upcoming' && <Countdown target={event.dateObj} />}
                      <a
                        href={getCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Add ${event.name} to calendar`}
                        className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold text-white/80 transition-colors hover:bg-white/25"
                      >
                        <CalendarPlus className="size-3" aria-hidden="true" />
                        Calendar
                      </a>
                      {period === 'upcoming' && (
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
                          className={cn(
                            'ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold transition-colors',
                            registered
                              ? 'bg-success/20 text-success'
                              : left === 0 || (!isAuthenticated && !registered)
                                ? 'bg-muted/30 text-white/50 cursor-not-allowed'
                                : 'bg-white/25 text-white hover:bg-white/35',
                          )}
                        >
                          {registered ? 'Registered ✓' : !isAuthenticated ? 'Log in to register' : left === 0 ? 'Full' : 'Register — Free'}
                        </button>
                      )}
                    </div>
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

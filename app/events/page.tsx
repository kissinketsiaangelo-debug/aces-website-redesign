'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
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
}

const events: Event[] = [
  { name: 'CodeFest 2026', date: 'Feb 21', month: 'FEB', day: '21', detail: 'Coding challenges, workshops and networking — a full day of tech.', time: '8:00 AM – 5:00 PM', location: 'Engineering Auditorium', category: 'academic', image: '/images/event-codefest.jpg' },
  { name: 'Robotics Meeting', date: 'Mar 03', month: 'MAR', day: '03', detail: 'Collaborate, build bots and automate solutions with the Robotics Club.', time: '3:00 PM – 6:00 PM', location: 'Robotics Lab', category: 'club', image: '/images/event-robotics-meeting.jpg' },
  { name: 'ACES Dinner 2026', date: 'Apr 18', month: 'APR', day: '18', detail: 'A night of fun, food and fellowship — awards and networking included.', time: '6:00 PM – 10:00 PM', location: 'Great Hall', category: 'social', image: '/images/event-dinner.jpg' },
  { name: 'Arduino Workshop', date: 'May 10', month: 'MAY', day: '10', detail: 'Hands-on session on embedded systems and sensor interfacing.', time: '10:00 AM – 2:00 PM', location: 'CEB Lab 3', category: 'club', image: '/images/arduino-workshop.jpg' },
  { name: 'Career Fair', date: 'Jun 05', month: 'JUN', day: '05', detail: 'Meet industry partners — internships, graduate roles and mentorship.', time: '9:00 AM – 4:00 PM', location: 'Engineering Foyer', category: 'academic', image: '/images/career-fair.jpg' },
  { name: 'Coding Bootcamp', date: 'Jul 12', month: 'JUL', day: '12', detail: 'Weekend crash course on web development with modern frameworks.', time: '9:00 AM – 3:00 PM', location: 'CS Department', category: 'academic', image: '/images/coding-bootcamp.jpg' },
  { name: 'ACES Hangout', date: 'Aug 22', month: 'AUG', day: '22', detail: 'Games, music and good vibes — a break from the books.', time: '2:00 PM – 7:00 PM', location: 'Unity Garden', category: 'social', image: '/images/gallery-12.jpg' },
  { name: 'Freshmen Orientation', date: 'Sep 15', month: 'SEP', day: '15', detail: 'Welcome new ACES members — meet executives and learn the ropes.', time: '10:00 AM – 1:00 PM', location: 'LT 1', category: 'social', image: '/images/orientation.jpg' },
]

const categories = [
  { key: 'all', label: 'All events' },
  { key: 'academic', label: 'Academic' },
  { key: 'social', label: 'Social' },
  { key: 'club', label: 'Club' },
]

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? events
    : events.filter((e) => e.category === activeCategory)

  return (
    <AppShell title="Events">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">ACES calendar</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Everything happening in the Land of ACES — mark your calendar.
        </p>
      </section>

      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter events by category" className="flex gap-2 overflow-x-auto px-4 pt-4 pb-1">
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
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} coming up
        </p>
      ) : (
        <p className="px-4 pt-4 text-xs font-medium text-muted-foreground">
          No {activeCategory} events scheduled yet — check back soon.
        </p>
      )}

      <ul className="flex flex-col gap-3 px-4 pt-3 pb-8">
  {filtered.map((event) => (
    <li key={event.name} className="relative h-44 overflow-hidden rounded-2xl">
      <Image
        src={event.image}
        alt=""
        fill
        sizes="400px"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 backdrop-blur-md bg-white/20 border-t border-white/30">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm text-white">
            <Calendar className="size-3.5" aria-hidden="true" />
            <span className="mt-0.5 text-[8px] font-bold tracking-wider">{event.month}</span>
            <span className="-mt-0.5 text-xs font-bold leading-none">{event.day}</span>
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-white drop-shadow-sm">{event.name}</h2>
            <p className="mt-0.5 text-xs leading-snug text-white/90 drop-shadow-sm line-clamp-2">{event.detail}</p>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-white/85">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden="true" />
                {event.time}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" aria-hidden="true" />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>
    </AppShell>
  )
}

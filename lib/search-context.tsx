'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import Fuse from 'fuse.js'

export type SearchItem = {
  id: string
  title: string
  description: string
  category: string
  url: string
  image?: string
}

const searchableItems: SearchItem[] = [
  // Pages
  { id: 'page-home', title: 'Home', description: 'ACES KNUST landing page', category: 'Pages', url: '/' },
  { id: 'page-shop', title: 'ACES Shop', description: 'Official ACES KNUST merchandise', category: 'Pages', url: '/shop' },
  { id: 'page-marketplace', title: 'Marketplace', description: 'Peer-to-peer student marketplace', category: 'Pages', url: '/marketplace' },
  { id: 'page-events', title: 'Events', description: 'ACES calendar of events', category: 'Pages', url: '/events' },
  { id: 'page-courses', title: 'Courses', description: 'Course materials and downloads', category: 'Pages', url: '/courses' },
  { id: 'page-resources', title: 'Resources', description: 'Student resources', category: 'Pages', url: '/resources' },
  { id: 'page-executives', title: 'Executives', description: 'ACES executive members', category: 'Pages', url: '/executives' },
  { id: 'page-staff', title: 'Staff', description: 'Computer Engineering department staff', category: 'Pages', url: '/staff' },
  { id: 'page-about', title: 'About ACES', description: 'About the Association of Computer Engineering Students', category: 'Pages', url: '/about' },
  { id: 'page-gallery', title: 'Gallery', description: 'ACES photo gallery', category: 'Pages', url: '/gallery' },
  { id: 'page-profile', title: 'Profile', description: 'Your ACES profile', category: 'Pages', url: '/profile' },
  { id: 'page-cart', title: 'Cart', description: 'Your shopping cart', category: 'Pages', url: '/cart' },
  { id: 'page-wishlist', title: 'Wishlist', description: 'Your saved items', category: 'Pages', url: '/wishlist' },
  { id: 'page-scholarships', title: 'Scholarships', description: 'Available scholarships', category: 'Pages', url: '/scholarships' },
  // Events
  { id: 'event-codefest', title: 'CodeFest 2026', description: 'Coding challenges, workshops and networking — a full day of tech.', category: 'Events', url: '/events', image: '/images/event-codefest.jpg' },
  { id: 'event-robotics', title: 'Robotics Meeting', description: 'Collaborate, build bots and automate solutions with the Robotics Club.', category: 'Events', url: '/events', image: '/images/event-robotics-meeting.jpg' },
  { id: 'event-dinner', title: 'ACES Dinner 2026', description: 'A night of fun, food and fellowship — awards and networking included.', category: 'Events', url: '/events', image: '/images/event-dinner.jpg' },
  { id: 'event-arduino', title: 'Arduino Workshop', description: 'Hands-on session on embedded systems and sensor interfacing.', category: 'Events', url: '/events', image: '/images/arduino-workshop.jpg' },
  { id: 'event-career-fair', title: 'Career Fair', description: 'Meet industry partners — internships, graduate roles and mentorship.', category: 'Events', url: '/events', image: '/images/career-fair.jpg' },
  { id: 'event-bootcamp', title: 'Coding Bootcamp', description: 'Weekend crash course on web development with modern frameworks.', category: 'Events', url: '/events', image: '/images/coding-bootcamp.jpg' },
  { id: 'event-hangout', title: 'ACES Hangout', description: 'Games, music and good vibes — a break from the books.', category: 'Events', url: '/events', image: '/images/Nocte.jpg' },
  { id: 'event-orientation', title: 'Freshmen Orientation', description: 'Welcome new ACES members — meet executives and learn the ropes.', category: 'Events', url: '/events', image: '/images/orientation.jpg' },
  // Courses
  { id: 'course-coe152', title: 'COE 152 — Basic Electronics', description: 'Year 1, Sem 2 — 8 files (24 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe172', title: 'COE 172 — Introduction to Programming', description: 'Year 1, Sem 2 — 12 files (38 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe254', title: 'COE 254 — Digital Circuits', description: 'Year 2, Sem 1 — 10 files (31 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe272', title: 'COE 272 — Data Structures & Algorithms', description: 'Year 2, Sem 2 — 14 files (42 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe354', title: 'COE 354 — Microprocessor Systems', description: 'Year 3, Sem 1 — 9 files (27 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe372', title: 'COE 372 — Operating Systems', description: 'Year 3, Sem 2 — 11 files (35 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe454', title: 'COE 454 — Embedded Systems Design', description: 'Year 4, Sem 1 — 7 files (22 MB)', category: 'Courses', url: '/courses' },
  { id: 'course-coe476', title: 'COE 476 — Artificial Intelligence', description: 'Year 4, Sem 2 — 13 files (45 MB)', category: 'Courses', url: '/courses' },
  // Shop
  { id: 'shop-hoodie', title: 'ACES Navy Hoodie', description: 'GHS 180 — Best seller', category: 'Shop', url: '/shop', image: '/images/product-hoodie.png' },
  { id: 'shop-tee', title: 'ACES Classic Tee', description: 'GHS 90', category: 'Shop', url: '/shop', image: '/images/product-tee.png' },
  { id: 'shop-mug', title: 'ACES Coffee Mug', description: 'GHS 45', category: 'Shop', url: '/shop', image: '/images/product-mug.png' },
  { id: 'shop-stickers', title: 'Sticker Pack (x8)', description: 'GHS 25 — New', category: 'Shop', url: '/shop', image: '/images/product-stickers.png' },
]

const fuseOptions = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'category', weight: 0.5 },
  ],
  threshold: 0.4,
  minMatchCharLength: 1,
}

type SearchContextValue = {
  query: string
  results: SearchItem[]
  setQuery: (q: string) => void
  clear: () => void
  open: boolean
  setOpen: (v: boolean) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const fuseRef = useRef<Fuse<SearchItem> | null>(null)

  if (!fuseRef.current) {
    fuseRef.current = new Fuse(searchableItems, fuseOptions)
  }

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuseRef.current!.search(query.trim()).map((r) => r.item)
  }, [query])

  const clear = useCallback(() => setQuery(''), [])

  const value = useMemo(
    () => ({ query, results, setQuery, clear, open, setOpen }),
    [query, results, clear, open],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}

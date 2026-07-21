'use client'

import { useState, useEffect, useCallback } from 'react'
import { useNotifications } from '@/lib/notification-context'
import { ListSkeleton } from '@/components/skeleton'
import { Download, FileText, Check, WifiOff, Search, ExternalLink, BookOpen, GraduationCap, Layers } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { cn } from '@/lib/utils'

type Course = {
  code: string
  title: string
  year: number
  semester: string
  credits: number
  materials: number
  size: string
}

const courses: Course[] = [
  { code: 'COE 152', title: 'Basic Electronics', year: 1, semester: 'Sem 2', credits: 4, materials: 8, size: '24 MB' },
  { code: 'COE 172', title: 'Introduction to Programming', year: 1, semester: 'Sem 2', credits: 4, materials: 12, size: '38 MB' },
  { code: 'COE 254', title: 'Digital Circuits', year: 2, semester: 'Sem 1', credits: 4, materials: 10, size: '31 MB' },
  { code: 'COE 272', title: 'Data Structures & Algorithms', year: 2, semester: 'Sem 2', credits: 4, materials: 14, size: '42 MB' },
  { code: 'COE 354', title: 'Microprocessor Systems', year: 3, semester: 'Sem 1', credits: 4, materials: 9, size: '27 MB' },
  { code: 'COE 372', title: 'Operating Systems', year: 3, semester: 'Sem 2', credits: 4, materials: 11, size: '35 MB' },
  { code: 'COE 454', title: 'Embedded Systems Design', year: 4, semester: 'Sem 1', credits: 4, materials: 7, size: '22 MB' },
  { code: 'COE 476', title: 'Artificial Intelligence', year: 4, semester: 'Sem 2', credits: 4, materials: 13, size: '45 MB' },
]

const yearLabels: Record<number, string> = {
  1: 'Year 1 · Freshman',
  2: 'Year 2 · Sophomore',
  3: 'Year 3 · Junior',
  4: 'Year 4 · Senior',
}

const semesterLabels: Record<string, string> = {
  'Sem 1': 'First Semester',
  'Sem 2': 'Second Semester',
}

const DOWNLOADS_KEY = 'aces_downloaded_courses'

function getDownloads(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(DOWNLOADS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveDownload(code: string) {
  try {
    const existing = getDownloads()
    if (!existing.includes(code)) {
      localStorage.setItem(DOWNLOADS_KEY, JSON.stringify([...existing, code]))
    }
  } catch {
    /* storage unavailable */
  }
}

function CourseCard({ course }: { course: Course }) {
  const [downloaded, setDownloaded] = useState(false)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    setDownloaded(getDownloads().includes(course.code))
    setOffline(!navigator.onLine)
    const handler = () => setOffline(!navigator.onLine)
    window.addEventListener('online', handler)
    window.addEventListener('offline', handler)
    return () => {
      window.removeEventListener('online', handler)
      window.removeEventListener('offline', handler)
    }
  }, [course.code])

  function handleDownload() {
    const content = [
      `${course.code} - ${course.title}`,
      `Year ${course.year} · ${course.semester}`,
      `Materials: ${course.materials} files (${course.size})`,
      '',
      '--- Course Materials ---',
      '1. Lecture Notes (PDF)',
      '2. Tutorial Questions (PDF)',
      '3. Past Questions (PDF)',
      '4. Lab Manual (PDF)',
      '',
      'Downloaded from ACES KNUST digital library.',
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${course.code}-materials.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    saveDownload(course.code)
    setDownloaded(true)
  }

  return (
    <li className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-primary">{course.code}</p>
            <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
              {course.credits} Credits
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{course.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {course.materials} files · {course.size}
            {downloaded && (
              <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-semibold text-success">
                <Check className="size-2.5" aria-hidden="true" /> Downloaded
              </span>
            )}
            {offline && (
              <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-semibold text-warning">
                <WifiOff className="size-2.5" aria-hidden="true" /> Offline
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          aria-label={downloaded ? `${course.title} downloaded` : `Download ${course.title} materials`}
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full transition-colors',
            downloaded ? 'bg-success/15 text-success' : 'bg-primary text-primary-foreground hover:opacity-90',
          )}
        >
          {downloaded ? <Check className="size-4" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-secondary/50 px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">{course.title} — Course Materials</span>
        <ExternalLink className="ml-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>
    </li>
  )
}

export default function CoursesPage() {
  const [year, setYear] = useState(0)
  const [semester, setSemester] = useState('')
  const [search, setSearch] = useState('')
  const [notified, setNotified] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('aces_notify_slides') === 'true'
  })
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotifications()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const uniqueYears = [...new Set(courses.map((c) => c.year))].sort()
  const uniqueSemesters = [...new Set(courses.map((c) => c.semester))].sort()

  const q = search.toLowerCase().trim()

  const onNotify = useCallback(() => {
    try {
      localStorage.setItem('aces_notify_slides', 'true')
    } catch { /* noop */ }
    setNotified(true)
    addNotification({
      title: 'Slides notification enabled',
      body: "We'll let you know when new lecture slides are uploaded.",
      icon: '📚',
    })
  }, [addNotification])
  const visible = courses.filter((c) => {
    if (year !== 0 && c.year !== year) return false
    if (semester && c.semester !== semester) return false
    if (q && !c.code.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q)) return false
    return true
  })

  const grouped: Record<string, Course[]> = {}
  for (const c of visible) {
    const key = `${c.year}-${c.semester}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(c)
  }

  return (
    <AppShell title="Courses">
      {/* Gradient banner */}
      <section className="mx-4 mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-800 p-5 text-white lg:mx-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xs">
            <h1 className="font-heading text-xl font-bold">Computer Engineering</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">
              Access lecture slides, past questions, and study materials for every course.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center rounded-2xl bg-white/15 px-4 py-2.5">
              <span className="font-heading text-lg font-bold">{courses.filter((c) => !semester || c.semester === semester).length}</span>
              <span className="text-[10px] text-white/80">Courses</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white/15 px-4 py-2.5">
              <span className="font-heading text-lg font-bold">{uniqueYears.length}</span>
              <span className="text-[10px] text-white/80">Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 pt-4 lg:px-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by course name or code (e.g. COE 251)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </section>

      {/* Year tabs */}
      <section className="sticky top-[61px] z-30 bg-background/95 px-4 pt-4 backdrop-blur lg:px-8">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:flex-wrap lg:overflow-x-visible" role="tablist" aria-label="Filter by year">
          <button
            type="button"
            role="tab"
            aria-selected={year === 0}
            onClick={() => setYear(0)}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
              year === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent',
            )}
          >
            All Years
          </button>
          {uniqueYears.map((y) => (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={year === y}
              onClick={() => setYear(y)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                year === y ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent',
              )}
            >
              Year {y}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 lg:flex-wrap lg:overflow-x-visible" role="tablist" aria-label="Filter by semester">
          <button
            type="button"
            role="tab"
            aria-selected={semester === ''}
            onClick={() => setSemester('')}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-[10px] font-semibold transition-colors',
              semester === '' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            All Semesters
          </button>
          {uniqueSemesters.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={semester === s}
              onClick={() => setSemester(s)}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-[10px] font-semibold transition-colors',
                semester === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Course list */}
      <section className="px-4 pt-2 pb-8 lg:px-8">
        {loading ? (
          <div className="mt-4 flex flex-col gap-3">
            <ListSkeleton count={5} />
          </div>
        ) : Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([key, group]) => {
            const first = group[0]
            const sectionTitle = `${yearLabels[first.year] || `Year ${first.year}`} · ${semesterLabels[first.semester] || first.semester}`
            return (
              <div key={key} className="mt-6 first:mt-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-base font-bold text-foreground">{sectionTitle}</h2>
                  <span className="text-xs text-muted-foreground">{group.length} course{group.length !== 1 ? 's' : ''}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
                  {group.map((course) => (
                    <CourseCard key={course.code} course={course} />
                  ))}
                </ul>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <BookOpen className="size-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-foreground">No lecture slides yet.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              They'll appear once uploaded.{' '}
              {notified ? (
                <span className="font-medium text-green-600">✓ Notified</span>
              ) : (
                <button
                  onClick={onNotify}
                  className="font-medium text-primary hover:underline"
                >
                  Notify Me
                </button>
              )}
            </p>
          </div>
        )}
      </section>
    </AppShell>
  )
}

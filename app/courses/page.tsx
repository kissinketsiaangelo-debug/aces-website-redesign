'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Download, FileText, Check, WifiOff } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { DemoStateToggle } from '@/components/demo-state-toggle'
import { NotifyMeForm } from '@/components/notify-me-form'
import { cn } from '@/lib/utils'

type Course = {
  code: string
  title: string
  year: number
  semester: string
  materials: number
  size: string
}

const courses: Course[] = [
  { code: 'COE 152', title: 'Basic Electronics', year: 1, semester: 'Sem 2', materials: 8, size: '24 MB' },
  { code: 'COE 172', title: 'Introduction to Programming', year: 1, semester: 'Sem 2', materials: 12, size: '38 MB' },
  { code: 'COE 254', title: 'Digital Circuits', year: 2, semester: 'Sem 1', materials: 10, size: '31 MB' },
  { code: 'COE 272', title: 'Data Structures & Algorithms', year: 2, semester: 'Sem 2', materials: 14, size: '42 MB' },
  { code: 'COE 354', title: 'Microprocessor Systems', year: 3, semester: 'Sem 1', materials: 9, size: '27 MB' },
  { code: 'COE 372', title: 'Operating Systems', year: 3, semester: 'Sem 2', materials: 11, size: '35 MB' },
  { code: 'COE 454', title: 'Embedded Systems Design', year: 4, semester: 'Sem 1', materials: 7, size: '22 MB' },
  { code: 'COE 476', title: 'Artificial Intelligence', year: 4, semester: 'Sem 2', materials: 13, size: '45 MB' },
]

const filters = [
  { label: 'All years', value: 0 },
  { label: 'Year 1', value: 1 },
  { label: 'Year 2', value: 2 },
  { label: 'Year 3', value: 3 },
  { label: 'Year 4', value: 4 },
]

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
    <li className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-secondary text-primary">
        <FileText className="size-4" aria-hidden="true" />
        <span className="mt-0.5 text-[9px] font-bold">Y{course.year}</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-primary">{course.code}</p>
        <p className="truncate text-sm font-semibold">{course.title}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          {course.semester} · {course.materials} files · {course.size}
          {downloaded && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-success">
              <Check className="size-2.5" aria-hidden="true" /> Downloaded
            </span>
          )}
          {offline && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-warning">
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
    </li>
  )
}

export default function CoursesPage() {
  const [year, setYear] = useState(0)
  const [demoState, setDemoState] = useState<'populated' | 'empty'>('populated')

  const visible = demoState === 'empty' ? [] : courses.filter((c) => year === 0 || c.year === year)

  return (
    <AppShell title="Courses">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text text-balance">Course materials</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Slides, notes and past questions — download once, study anywhere.
        </p>
      </section>

      <div className="px-4 pt-4">
        <DemoStateToggle state={demoState} onChange={setDemoState} />
      </div>

      {/* Filter tabs */}
      <div className="sticky top-[61px] z-30 bg-background/95 px-4 py-3 backdrop-blur">
        <div role="tablist" aria-label="Filter courses by year" className="flex gap-2 overflow-x-auto pb-0.5">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={year === filter.value}
              onClick={() => setYear(filter.value)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                year === filter.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent',
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <p className="px-4 pt-1 text-xs font-medium text-muted-foreground">
            {visible.length} course{visible.length !== 1 ? 's' : ''} available
          </p>
          <ul className="flex flex-col gap-3 px-4 pt-3 pb-8">
            {visible.map((course) => (
              <CourseCard key={course.code} course={course} />
            ))}
          </ul>
        </>
      ) : (
        <section className="flex flex-col items-center px-6 pt-6 pb-10 text-center" aria-label="No courses available">
          <Image
            src="/images/empty-telescope.png"
            alt="Illustration of a character searching with a telescope"
            width={200}
            height={200}
            className="rounded-3xl"
          />
          <h2 className="mt-4 font-heading text-lg font-bold text-navy-text">No course materials here yet</h2>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            The course reps are uploading materials as lecturers release them. Want a heads-up when they land?
          </p>
          <div className="mt-5 w-full max-w-xs">
            <NotifyMeForm topic="course materials" />
          </div>
        </section>
      )}
    </AppShell>
  )
}

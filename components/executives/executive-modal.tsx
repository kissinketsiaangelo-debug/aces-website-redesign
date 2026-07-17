'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Mail, ExternalLink, GraduationCap, Building } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ExecutiveData = {
  initials: string
  name: string
  role: string
  photo: string
  year: string
  department: string
  email: string
  linkedin: string
}

export function ExecutiveModal({
  exec,
  open,
  onClose,
}: {
  exec: ExecutiveData | null
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!exec) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${exec.name} profile`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Sheet */}
      <div
        className={cn(
          'relative w-full max-w-md rounded-t-3xl bg-background px-6 pb-8 pt-6 shadow-2xl transition-transform duration-300',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-accent"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        {/* Photo */}
        <div className="flex justify-center">
          <div className="relative size-28 overflow-hidden rounded-full border-4 border-border shadow-lg">
            <Image
              src={exec.photo}
              alt={exec.name}
              fill
              sizes="112px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name + role */}
        <div className="mt-4 text-center">
          <h2 className="font-heading text-xl font-bold text-foreground">{exec.name}</h2>
          <p className="mt-0.5 text-sm font-semibold text-primary">{exec.role}</p>
        </div>

        {/* Info rows */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
            <GraduationCap className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Year</p>
              <p className="text-sm font-medium text-foreground">{exec.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
            <Building className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <p className="text-sm font-medium text-foreground">{exec.department}</p>
            </div>
          </div>
          <a
            href={`mailto:${exec.email}`}
            className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 transition-colors hover:bg-accent"
          >
            <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-foreground">{exec.email}</p>
            </div>
            <ExternalLink className="ml-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </a>
          <a
            href={exec.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 transition-colors hover:bg-accent"
          >
            <svg className="size-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">LinkedIn</p>
              <p className="truncate text-sm font-medium text-foreground">{exec.linkedin}</p>
            </div>
            <ExternalLink className="ml-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

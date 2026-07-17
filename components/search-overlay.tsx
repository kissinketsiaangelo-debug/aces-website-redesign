'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, ArrowRight } from 'lucide-react'
import { useSearch } from '@/lib/search-context'
import { cn } from '@/lib/utils'

export function SearchOverlay() {
  const { query, results, setQuery, clear, open, setOpen } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 mx-auto w-full max-w-md">
      <div className="absolute inset-0 bg-navy/50" onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="relative flex h-full flex-col bg-background">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search events, courses, products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search"
          />
          {query && (
            <button type="button" onClick={clear} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
          <kbd className="hidden rounded-md border border-border px-1.5 text-[10px] text-muted-foreground sm:inline">ESC</kbd>
        </div>

        <div className="flex-1 overflow-y-auto">
          {query && results.length === 0 && (
            <p className="px-4 pt-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.length > 0 && (
            <ul className="flex flex-col gap-1 px-3 py-3">
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    onClick={() => { setOpen(false); setQuery('') }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-secondary"
                  >
                    {item.image && (
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={item.image} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                      {item.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="px-4 pt-8 text-center">
              <Search className="mx-auto size-10 text-muted-foreground/30" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted-foreground">
                Type to search across events, courses, shop, and more.
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Press <kbd className="rounded-md border border-border px-1.5 font-mono text-[10px]">⌘K</kbd> to search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

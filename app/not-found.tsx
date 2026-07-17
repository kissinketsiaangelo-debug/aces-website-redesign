import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export default function NotFound() {
  return (
    <AppShell title="Page not found">
      <div className="flex flex-col items-center px-6 pt-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
          <Compass className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-heading text-xl font-bold text-foreground text-balance">
          Oops! You&apos;ve wandered off the map
        </h1>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
          Don&apos;t worry, it happens to the best of us. Let&apos;s get you back to the Land of ACES.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Take me home
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </AppShell>
  )
}

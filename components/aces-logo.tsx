import { cn } from '@/lib/utils'

export function AcesMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-9', className)}
      aria-hidden="true"
    >
      {/* chip pins */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M13 4v-3M20 4v-3M27 4v-3" />
        <path d="M13 39v-3M20 39v-3M27 39v-3" />
        <path d="M4 13H1M4 20H1M4 27H1" />
        <path d="M39 13h-3M39 20h-3M39 27h-3" />
      </g>
      {/* chip body */}
      <rect x="4" y="4" width="32" height="32" rx="8" fill="currentColor" />
      {/* letter A */}
      <path
        d="M13.5 28 20 12l6.5 16"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M16.2 22.5h7.6" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function AcesLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('flex items-center gap-2 text-primary', className)}>
      <AcesMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold tracking-tight text-navy">ACES</span>
          <span className="text-[10px] font-medium tracking-widest text-muted-foreground">KNUST</span>
        </span>
      )}
    </span>
  )
}

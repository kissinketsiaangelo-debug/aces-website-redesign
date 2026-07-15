import Image from 'next/image'
import { cn } from '@/lib/utils'

export function AcesMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/aces-logo.png"
      alt="Association of Computer Engineering Students Logo"
      width={100}
      height={100}
      className={cn('size-14 object-contain', className)}
    />
  )
}

export function AcesLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('flex items-center gap-3 text-primary', className)}>
      <AcesMark />
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-heading text-sm font-bold tracking-tight text-navy">
            Association of Computer
          </span>
          <span className="font-heading text-sm font-bold tracking-tight text-navy">
            Engineering Students
          </span>
        </span>
      )}
    </span>
  )
}
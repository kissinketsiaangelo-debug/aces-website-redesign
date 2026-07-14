'use client'

import { cn } from '@/lib/utils'

export function DemoStateToggle({
  state,
  onChange,
}: {
  state: 'populated' | 'empty'
  onChange: (state: 'populated' | 'empty') => void
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-secondary/40 px-4 py-3">
      <p className="text-xs font-medium leading-snug text-muted-foreground">
        Prototype demo:
        <br />
        preview both states
      </p>
      <div role="group" aria-label="Preview state" className="flex rounded-full bg-background p-1 shadow-sm">
        {(['populated', 'empty'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={state === option}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors',
              state === option ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

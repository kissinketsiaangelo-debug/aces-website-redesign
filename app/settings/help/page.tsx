import { HelpCircle } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export default function HelpPage() {
  return (
    <AppShell title="Help & feedback">
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <HelpCircle className="size-7 text-primary" aria-hidden="true" />
        </div>
        <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Help & feedback</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          Have a question or suggestion? Reach the ACES team anytime. Coming soon.
        </p>
      </section>
    </AppShell>
  )
}

import { Settings } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export default function AccountSettingsPage() {
  return (
    <AppShell title="Account settings">
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <Settings className="size-7 text-primary" aria-hidden="true" />
        </div>
        <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Account settings</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          Update your profile details, year group, and privacy preferences. Coming soon.
        </p>
      </section>
    </AppShell>
  )
}

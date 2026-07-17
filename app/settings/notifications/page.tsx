import { Bell } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export default function NotificationsPage() {
  return (
    <AppShell title="Notification preferences">
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <Bell className="size-7 text-primary" aria-hidden="true" />
        </div>
        <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Notification preferences</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          Manage how ACES notifies you about events, scholarships, and course updates. Coming soon.
        </p>
      </section>
    </AppShell>
  )
}

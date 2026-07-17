'use client'

import Link from 'next/link'
import { Bell, CheckCheck, Trash2, ArrowLeft, ShoppingBag, Calendar, UserPlus, Store } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useNotifications, type AppNotification } from '@/lib/notification-context'
import { cn } from '@/lib/utils'

const iconMap: Record<string, typeof ShoppingBag> = {
  bag: ShoppingBag,
  calendar: Calendar,
  user: UserPlus,
  store: Store,
  bell: Bell,
}

function NotifItem({ notif }: { notif: AppNotification }) {
  const { markRead } = useNotifications()
  const Icon = iconMap[notif.icon] || Bell

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border p-4 transition-colors',
        notif.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/5',
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl',
          notif.read ? 'bg-secondary text-muted-foreground' : 'bg-primary/15 text-primary',
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm', notif.read ? 'text-foreground' : 'font-semibold text-foreground')}>
            {notif.title}
          </p>
          {!notif.read && (
            <button
              type="button"
              onClick={() => markRead(notif.id)}
              aria-label="Mark as read"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <CheckCheck className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{notif.body}</p>
        {notif.link && (
          <Link
            href={notif.link}
            onClick={() => markRead(notif.id)}
            className="mt-1.5 inline-block text-xs font-semibold text-primary underline"
          >
            View details
          </Link>
        )}
        <p className="mt-1 text-[10px] text-muted-foreground/60">
          {new Date(notif.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications()

  return (
    <AppShell title="Notifications">
      <section className="px-4 pt-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back home
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold text-foreground">Notifications</h1>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-xs font-medium text-primary underline"
                >
                  Mark all read
                </button>
              )}
              <button type="button" onClick={clearAll} aria-label="Clear all notifications" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">{unreadCount} unread</p>
        )}
      </section>

      {notifications.length === 0 ? (
        <section className="flex flex-col items-center px-6 py-16 text-center">
          <Bell className="size-12 text-muted-foreground/30" aria-hidden="true" />
          <h2 className="mt-4 font-heading text-lg font-bold text-foreground">No notifications yet</h2>
          <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
            Notifications about events, orders, and updates will appear here.
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Browse events
          </Link>
        </section>
      ) : (
        <section className="flex flex-col gap-3 px-4 pt-5 pb-8">
          {notifications.map((n) => (
            <NotifItem key={n.id} notif={n} />
          ))}
        </section>
      )}
    </AppShell>
  )
}

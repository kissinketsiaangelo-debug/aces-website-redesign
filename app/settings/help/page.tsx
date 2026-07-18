'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Send, MessageCircle, Mail, HelpCircle } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'How do I register for an event?', a: 'Create an ACES account or log in, then tap the Register button on any event card. You\'ll get a confirmation and reminder notifications.' },
  { q: 'How do I join a club?', a: 'Log in to your ACES account, go to the homepage, tap Join on any club card, then fill in the short membership form.' },
  { q: 'How does the marketplace work?', a: 'Marketplace uses a separate account. Register or log in via the Marketplace tab to browse, buy, or sell products from fellow students.' },
  { q: 'How do I download course materials?', a: 'Go to Courses, filter by year and semester, then tap the download button on any course card. Downloaded materials are available offline.' },
  { q: 'How do I track my orders?', a: 'Go to Profile → My orders to view items you\'ve added to cart from the ACES Shop.' },
]

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!feedback.trim()) return
    setSent(true)
    setTimeout(() => { setSent(false); setFeedback('') }, 3000)
  }

  return (
    <AppShell title="Help & feedback">
      <section className="px-4 pt-5">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-3.5 rotate-180" aria-hidden="true" />
          Back to profile
        </Link>
        <h1 className="mt-3 font-heading text-2xl font-bold text-foreground">Help & feedback</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Frequently asked questions and a way to reach the ACES team.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-4 pt-6">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <HelpCircle className="size-4 text-primary" aria-hidden="true" />
          Frequently asked questions
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary/40"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{i + 1}</span>
                <span className="flex-1">{faq.q}</span>
                <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', openFaq === i && 'rotate-180')} aria-hidden="true" />
              </button>
              {openFaq === i && (
                <div className="border-t border-border px-4 py-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 pt-6">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <Mail className="size-4 text-primary" aria-hidden="true" />
          Contact us
        </h2>
        <div className="mt-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
              <MessageCircle className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Reach the ACES office</p>
              <p className="text-xs text-muted-foreground">aces@coe.knust.edu.gh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback form */}
      <section className="px-4 pt-6 pb-8">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <Send className="size-4 text-primary" aria-hidden="true" />
          Send feedback
        </h2>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
          <textarea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us how we can improve the app…"
            className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            disabled={!feedback.trim() || sent}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {sent ? 'Sent! Thanks for the feedback' : 'Send feedback'}
          </button>
        </form>
      </section>
    </AppShell>
  )
}

'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Send, MessageCircle, Mail, HelpCircle, Phone } from 'lucide-react'
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
          Frequently asked questions, contact info, and a way to reach the ACES team.
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

      {/* Current Administration */}
      <section className="px-4 pt-6">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <Phone className="size-4 text-primary" aria-hidden="true" />
          Current Administration
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">Current President</p>
            <div className="mt-2 flex flex-col gap-2">
              <a href="tel:0205671946" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Phone className="size-3.5" aria-hidden="true" />
                0205671946
              </a>
              <a href="https://wa.me/233205671946" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                0205671946 (WhatsApp)
              </a>
              <a href="mailto:hanzsintm@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Mail className="size-3.5" aria-hidden="true" />
                hanzsintm@gmail.com
              </a>
              <a href="https://linkedin.com/in/hanzsofosuheneintm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                linkedin.com/in/hanzsofosuheneintm
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">Vice President</p>
            <div className="mt-2 flex flex-col gap-2">
              <a href="tel:0550621262" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Phone className="size-3.5" aria-hidden="true" />
                0550621262
              </a>
              <a href="https://linkedin.com/in/lawrinda-kwaah-obo-a9b28725a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                linkedin.com/in/lawrinda-kwaah-obo-a9b28725a
              </a>
            </div>
          </div>
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

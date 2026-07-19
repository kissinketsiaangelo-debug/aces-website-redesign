'use client'

import { useState } from 'react'
import { Send, CheckCircle, Mail, MessageSquare, User } from 'lucide-react'
import { AppShell } from '@/components/app-shell'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AppShell title="Contact">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy-text">Get in touch</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Questions, suggestions, or need help? Send us a message and we&apos;ll get back to you.
        </p>
      </section>

      {submitted ? (
        <section className="flex flex-col items-center px-6 pt-12 pb-10 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle className="size-8" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-bold text-navy-text">Message sent!</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            Thanks for reaching out. We usually respond within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Send another message
          </button>
        </section>
      ) : (
        <section className="px-4 pt-5 pb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="contact-name" className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <User className="size-3" aria-hidden="true" /> Name
              </label>
              <input id="contact-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label htmlFor="contact-email" className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Mail className="size-3" aria-hidden="true" /> Email
              </label>
              <input id="contact-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label htmlFor="contact-subject" className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <MessageSquare className="size-3" aria-hidden="true" /> Subject
              </label>
              <select id="contact-subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="">Select a topic</option>
                <option value="general">General inquiry</option>
                <option value="shop">Shop / Order help</option>
                <option value="marketplace">Marketplace issue</option>
                <option value="technical">Website bug</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="text-xs font-semibold text-muted-foreground">Message</label>
              <textarea id="contact-message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what's on your mind..." className="mt-1.5 w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary" />
            </div>
            <button type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              <Send className="size-4" aria-hidden="true" />
              Send message
            </button>
          </form>
        </section>
      )}
    </AppShell>
  )
}
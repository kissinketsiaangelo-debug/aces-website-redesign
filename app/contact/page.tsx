'use client'

import { useState } from 'react'
import { Send, CheckCircle, Mail, MessageSquare, User, Phone } from 'lucide-react'
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
        <h1 className="font-heading text-2xl font-bold text-navy-text">Contact us</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Reach out to the ACES administration or send us a message.
        </p>
      </section>

      <section className="px-4 pt-5">
        <h2 className="font-heading text-lg font-bold text-navy-text">Current Administration</h2>
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

      <section className="px-4 pt-6 pb-8">
        <h2 className="font-heading text-lg font-bold text-navy-text">Send a message</h2>
        {submitted ? (
          <div className="flex flex-col items-center px-6 pt-8 pb-4 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle className="size-8" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold text-navy-text">Message sent!</h3>
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
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-4">
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
        )}
      </section>
    </AppShell>
  )
}

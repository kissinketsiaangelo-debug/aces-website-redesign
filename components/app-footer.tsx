import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Globe } from 'lucide-react'

export function AppFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-md flex-col gap-5 px-4 py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo-white.png" alt="ACES Logo" width={40} height={40} className="size-8 object-contain" />
          <span className="text-xs font-bold leading-snug">Association of Computer Engineering Students</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/company/aces-knust/" target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/aces_knust/" target="_blank" rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a
            href="https://x.com/aces_knust" target="_blank" rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <Link href="/gallery" className="ml-auto text-[10px] font-semibold text-navy-foreground/70 transition-colors hover:text-navy-foreground">
            ACES Gallery
          </Link>
        </div>

        <p className="text-xs leading-relaxed text-navy-foreground/70">
          KNUST-CoE, Vodafone Building - Ground Floor
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-navy-foreground/50">Explore</h4>
            <ul className="mt-2 flex flex-col gap-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/executives', label: 'Executives' },
                { href: '/staff', label: 'Staff' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/events', label: 'Events' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-navy-foreground/50">Marketplace</h4>
            <ul className="mt-2 flex flex-col gap-1">
              {[
                { href: '/marketplace', label: 'Browse Products' },
                { href: '/register', label: 'Register' },
                { href: '/login', label: 'Login' },
                { href: '/vendor-dashboard', label: 'Vendor Dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-navy-foreground/50">Resources</h4>
            <ul className="mt-2 flex flex-col gap-1">
              {[
                { href: '/scholarships', label: 'Scholarships' },
                { href: '/courses', label: 'Courses' },
                { href: '/shop', label: 'ACES Shop' },
                { href: '/shop/track', label: 'Track Order' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Us — Current Administration */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-navy-foreground/50">Contact Us</h4>
          <div className="mt-2 flex flex-col gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold text-navy-foreground">Current President</p>
              <div className="mt-1.5 flex flex-col gap-1.5">
                <a href="tel:0205671946" className="flex items-center gap-1.5 text-[11px] text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                  <Phone className="size-3" aria-hidden="true" />
                  0205671946
                </a>
                <a href="https://wa.me/233205671946" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  0205671946
                </a>
                <a href="mailto:hanzsintm@gmail.com" className="flex items-center gap-1.5 text-[11px] text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                  <Mail className="size-3" aria-hidden="true" />
                  hanzsintm@gmail.com
                </a>
                <a href="https://linkedin.com/in/hanzsofosuheneintm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  linkedin.com/in/hanzsofosuheneintm
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold text-navy-foreground">Vice President</p>
              <div className="mt-1.5 flex flex-col gap-1.5">
                <a href="tel:0550621262" className="flex items-center gap-1.5 text-[11px] text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                  <Phone className="size-3" aria-hidden="true" />
                  0550621262
                </a>
                <a href="https://linkedin.com/in/lawrinda-kwaah-obo-a9b28725a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] text-navy-foreground/70 transition-colors hover:text-navy-foreground">
                  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  linkedin.com/in/lawrinda-kwaah-obo-a9b28725a
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-navy-foreground/50">Newsletter</h4>
          <p className="mt-1.5 text-xs leading-relaxed text-navy-foreground/70">
            Get exclusive news concerning ACES by signing up to our Newsletter
          </p>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-navy-foreground placeholder:text-navy-foreground/40 outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-[10px] text-navy-foreground/50">
            Technology For Our Age &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-3">
            <Link href="#" className="text-[10px] text-navy-foreground/50 transition-colors hover:text-navy-foreground">
              Terms and Conditions
            </Link>
            <Link href="#" className="text-[10px] text-navy-foreground/50 transition-colors hover:text-navy-foreground">
              Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

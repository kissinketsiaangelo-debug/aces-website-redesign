'use client'

import { useState, type FormEvent, use, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useMarketplaceAuth } from '@/lib/marketplace-context'
import { useAcesAuth } from '@/lib/aces-auth-context'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const { login: mpLogin } = useMarketplaceAuth()
  const { login: acesLogin } = useAcesAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }

    // If redirect is set, log in via ACES auth; otherwise marketplace auth
    if (redirect) {
      const result = acesLogin({ email: email.trim(), password })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setSuccess(true)
      setTimeout(() => {
        router.push(redirect)
      }, 1000)
    } else {
      const result = mpLogin({ email: email.trim(), password })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setSuccess(true)
      setTimeout(() => {
        router.push('/marketplace')
      }, 1000)
    }
  }

  if (success) {
    return (
      <AppShell title="Logged in">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <ArrowRight className="size-7 text-primary animate-check-bounce" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Welcome back!</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            {redirect ? 'Taking you there…' : 'Redirecting you to the marketplace…'}
          </p>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Log in">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          {redirect ? 'Log in to your ACES account.' : 'Log in to your ACES Marketplace account.'}
        </p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-6 pb-8">
        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kwame@st.knust.edu.gh"
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() => alert('Password reset coming soon. Reach out to the ACES office for help.')}
            className="text-xs font-medium text-primary underline"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]"
        >
          Log in
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href={redirect ? `/register-aces?redirect=${encodeURIComponent(redirect)}` : '/register'}
            className="font-semibold text-primary underline"
          >
            {redirect ? 'Create ACES account' : 'Register'}
          </Link>
        </p>
      </form>
    </AppShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AppShell title="Log in"><div className="px-4 pt-5" /></AppShell>}>
      <LoginForm />
    </Suspense>
  )
}

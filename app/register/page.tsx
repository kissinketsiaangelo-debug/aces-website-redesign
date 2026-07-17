'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Store, User, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useMarketplaceAuth } from '@/lib/marketplace-context'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useMarketplaceAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [userType, setUserType] = useState<'buyer' | 'vendor'>('buyer')
  const [agreed, setAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirm.trim()) {
      setError('All fields are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (!agreed) {
      setError('You must agree to the terms and conditions.')
      return
    }

    const result = register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      type: userType,
    })

    if (!result.ok) {
      setError(result.error)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/marketplace')
    }, 1200)
  }

  if (success) {
    return (
      <AppShell title="Registration successful">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Store className="size-7 text-primary" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Account created!</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Welcome to the ACES Marketplace. Redirecting you now…
          </p>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Register">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Create your account</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Join the ACES Marketplace — buy and sell with fellow students.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 pt-6 pb-8">
        {/* User type toggle */}
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            I want to…
          </legend>
          <div className="mt-2 flex gap-2">
            {(['buyer', 'vendor'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setUserType(type)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors',
                  userType === type
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40',
                )}
              >
                {type === 'buyer' ? <User className="size-4" /> : <Store className="size-4" />}
                {type === 'buyer' ? 'Buy' : 'Sell'}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Name */}
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kwame Mensah"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Email */}
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
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="054 123 4567"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Password */}
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
              placeholder="At least 6 characters"
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

        {/* Confirm password */}
        <div>
          <label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Confirm password
          </label>
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 accent-primary"
          />
          I agree to the <span className="text-primary underline">Terms and Conditions</span> and{' '}
          <span className="text-primary underline">Privacy Policy</span>
        </label>

        {/* Error */}
        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          Create account
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary underline">
            Log in
          </Link>
        </p>
      </form>
    </AppShell>
  )
}

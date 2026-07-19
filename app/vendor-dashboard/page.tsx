'use client'

import { useState, useEffect, type FormEvent } from 'react'
import Link from 'next/link'
import { Package, Plus, Edit3, Trash2, Store, ArrowLeft, X, Check } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { useMarketplaceAuth } from '@/lib/marketplace-context'
import { products, categories } from '@/lib/marketplace-data'
import { cn } from '@/lib/utils'

export default function VendorDashboardPage() {
  const { user, isAuthenticated, isVendor, logout } = useMarketplaceAuth()

  const [vendorProducts, setVendorProducts] = useState(
    products.filter((p) => p.vendor.name === user?.name),
  )
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2500)
      return () => clearTimeout(t)
    }
  }, [saved])

  const emptyForm = { name: '', description: '', price: '', category: 'other', image: '' }
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  function resetForm() {
    setForm(emptyForm)
    setFormError('')
    setEditingId(null)
    setShowForm(false)
  }

  function handleSave(e: FormEvent) {
    e.preventDefault()
    setFormError('')

    if (!form.name.trim() || !form.description.trim() || !form.price.trim()) {
      setFormError('Name, description, and price are required.')
      return
    }
    const price = parseFloat(form.price)
    if (isNaN(price) || price <= 0) {
      setFormError('Price must be a positive number.')
      return
    }

    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const image = form.image.trim() || '/placeholder.svg'

    if (editingId) {
      setVendorProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name: form.name.trim(), description: form.description.trim(), price, images: [image], category: form.category }
            : p,
        ),
      )
    } else {
      const newProduct = {
        id: `v-${Date.now()}`,
        slug,
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        images: [image],
        category: form.category,
        vendor: { name: user!.name, phone: user!.phone, email: user!.email },
        createdAt: new Date().toISOString().split('T')[0],
      }
      setVendorProducts((prev) => [newProduct, ...prev])
    }

    resetForm()
    setSaved(true)
  }

  function startEdit(id: string) {
    const p = vendorProducts.find((x) => x.id === id)
    if (!p) return
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category, image: p.images[0] })
    setEditingId(id)
    setShowForm(true)
  }

  function confirmDelete(id: string) {
    setVendorProducts((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  // Guard — not logged in
  if (!isAuthenticated) {
    return (
      <AppShell title="Vendor Dashboard">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <Store className="size-12 text-muted-foreground/40" aria-hidden="true" />
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Log in to continue</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            You need to log in to access the vendor dashboard.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Log in
          </Link>
          <Link href="/register" className="mt-3 text-xs font-medium text-primary underline">
            Don&apos;t have an account? Register
          </Link>
        </section>
      </AppShell>
    )
  }

  // Guard — not a vendor
  if (!isVendor) {
    return (
      <AppShell title="Vendor Dashboard">
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <Package className="size-12 text-muted-foreground/40" aria-hidden="true" />
          <h1 className="mt-4 font-heading text-lg font-bold text-foreground">Vendor access only</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Your account is set up as a buyer. Switch to a vendor account to sell on the marketplace.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Register as vendor
          </Link>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Vendor Dashboard">
      {/* Header */}
      <section className="px-4 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">Your store</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">Welcome, {user?.name}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{vendorProducts.length}</p>
            <p className="text-xs text-muted-foreground">Products listed</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground">Orders received</p>
          </div>
        </div>
      </section>

      {/* Add product button */}
      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add new product
        </button>
      </section>

      {/* Add / Edit form */}
      {showForm && (
        <section className="px-4 pt-5">
          <form onSubmit={handleSave} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                {editingId ? 'Edit product' : 'New product'}
              </h2>
              <button type="button" onClick={resetForm} aria-label="Close form">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price (GH₵)"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <input
                type="url"
                placeholder="Image URL (optional — random auto-generated)"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            {formError && (
              <p className="mt-3 rounded-xl bg-destructive/10 px-4 py-2.5 text-xs font-medium text-destructive" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Check className="size-4" aria-hidden="true" />
              {editingId ? 'Save changes' : 'Add product'}
            </button>
          </form>
        </section>
      )}

      {/* Product list */}
      <section className="px-4 pt-5 pb-8">
        <h2 className="text-sm font-bold text-foreground">Your products</h2>

        {vendorProducts.length === 0 ? (
          <div className="mt-4 flex flex-col items-center py-12 text-center">
            <Package className="size-8 text-muted-foreground/40" aria-hidden="true" />
            <p className="mt-2 text-sm text-muted-foreground">No products listed yet.</p>
            <p className="text-xs text-muted-foreground">Tap the button above to add your first one.</p>
          </div>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {vendorProducts.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
              >
                <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img src={p.images[0]} alt="" className="size-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs font-medium text-primary">GH₵ {p.price}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(p.id)}
                    aria-label={`Edit ${p.name}`}
                    className="flex size-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-accent"
                  >
                    <Edit3 className="size-4" />
                  </button>
                  {deleteId === p.id ? (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => confirmDelete(p.id)}
                        aria-label="Confirm delete"
                        className="flex size-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                      >
                        <Check className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(null)}
                        aria-label="Cancel delete"
                        className="flex size-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteId(p.id)}
                      aria-label={`Delete ${p.name}`}
                      className="flex size-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {saved && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-success px-4 py-3 text-sm font-semibold text-white shadow-xl">
          <Check className="mr-2 inline size-4" aria-hidden="true" />
          Product saved successfully
        </div>
      )}
    </AppShell>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { categories } from '@/app/gallery/data'

export default function GalleryPage() {
  return (
    <AppShell title="Gallery">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-foreground text-balance">Moments from ACES</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          Browse through photos organised by category — tap any album to explore.
        </p>
      </section>

      <section className="flex flex-col gap-4 px-4 pt-5 pb-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/gallery/${cat.slug}`}
            className="group relative h-48 overflow-hidden rounded-3xl"
          >
            <Image
              src={cat.cover}
              alt=""
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/85 drop-shadow-sm">{cat.count} photos</p>
                  <h2 className="mt-0.5 font-heading text-xl font-bold text-white drop-shadow-sm">{cat.name}</h2>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-white/85 drop-shadow-sm text-pretty">{cat.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </AppShell>
  )
}

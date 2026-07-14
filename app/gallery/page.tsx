import Image from 'next/image'
import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'Gallery — ACES KNUST',
}

const photos = [
  {
    src: '/images/gallery-codefest.png',
    alt: 'Students competing at CodeFest hackathon',
    caption: 'CodeFest 2025',
    detail: 'A full day of coding challenges and workshops.',
  },
  {
    src: '/images/gallery-robotics.png',
    alt: 'Students building a robot with Arduino boards',
    caption: 'Robotics Club build night',
    detail: 'From breadboards to a working line-follower.',
  },
  {
    src: '/images/gallery-dinner.png',
    alt: 'Students at the annual ACES dinner event',
    caption: 'ACES Dinner 2025',
    detail: 'A night of food, awards and fellowship.',
  },
  {
    src: '/images/gallery-hangout.png',
    alt: 'Students relaxing outdoors during ACES hangout',
    caption: 'ACES Hangout',
    detail: 'Games, laughter and good vibes on campus.',
  },
]

export default function GalleryPage() {
  return (
    <AppShell title="Gallery">
      <section className="px-4 pt-5">
        <h1 className="font-heading text-2xl font-bold text-navy text-balance">Moments from the Land of ACES</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
          A look back at the events that bring us together.
        </p>
      </section>

      <section className="flex flex-col gap-4 px-4 pt-5 pb-8" aria-label="Photo gallery">
        {photos.map((photo) => (
          <figure key={photo.caption} className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative aspect-[3/2]">
              <Image src={photo.src || '/placeholder.svg'} alt={photo.alt} fill sizes="(max-width: 448px) 100vw, 448px" className="object-cover" />
            </div>
            <figcaption className="px-4 py-3">
              <p className="font-heading text-sm font-bold text-navy">{photo.caption}</p>
              <p className="text-xs text-muted-foreground">{photo.detail}</p>
            </figcaption>
          </figure>
        ))}
      </section>
    </AppShell>
  )
}

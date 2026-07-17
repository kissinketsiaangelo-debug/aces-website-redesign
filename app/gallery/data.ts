export type Category = {
  slug: string
  name: string
  description: string
  cover: string
  count: number
  photos: { src: string; caption: string }[]
}

export const categories: Category[] = [
  {
    slug: 'events',
    name: 'Events',
    description: 'CodeFest, ACES Dinner, Career Fair, Freshmen Orientation and more.',
    cover: '/images/gallery-1.jpg',
    count: 15,
    photos: Array.from({ length: 15 }, (_, i) => ({
      src: `/images/gallery-${i + 1}.jpg`,
      caption: 'ACES Moment',
    })),
  },
  {
    slug: 'workshops-clubs',
    name: 'Workshops & Clubs',
    description: 'Arduino, Robotics, Coding Bootcamps and hands-on lab sessions.',
    cover: '/images/gallery-16.jpg',
    count: 12,
    photos: Array.from({ length: 12 }, (_, i) => ({
      src: `/images/gallery-${i + 16}.jpg`,
      caption: 'ACES Moment',
    })),
  },
  {
    slug: 'social-community',
    name: 'Social & Community',
    description: 'Outreach, parties, team-building and general gatherings.',
    cover: '/images/gallery-28.jpg',
    count: 16,
    photos: Array.from({ length: 16 }, (_, i) => ({
      src: `/images/gallery-${i + 28}.jpg`,
      caption: 'ACES Moment',
    })),
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

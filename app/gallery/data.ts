export type Category = {
  slug: string
  name: string
  description: string
  cover: string
  count: number
  photos: { src: string; caption: string }[]
}

const allPhotos = [
  { src: '/images/Acesshirt.jpg', caption: 'ACES Shirt' },
  { src: '/images/codefest.jpg', caption: 'CodeFest' },
  { src: '/images/homeImage.png', caption: 'ACES Community' },
  { src: '/images/Jersey.jpg', caption: 'ACES Jersey' },
  { src: '/images/Nocte.jpg', caption: 'Nocte' },
  { src: '/images/official.jpg', caption: 'Official Group Photo' },
  { src: '/images/Trip.jpg', caption: 'ACES Trip' },
  { src: '/images/About.jpg', caption: 'About ACES' },
  { src: '/images/aces-group-photo.png', caption: 'ACES Group Photo' },
]

export const categories: Category[] = [
  {
    slug: 'aces-moments',
    name: 'ACES Moments',
    description: 'Memorable moments from ACES events, trips, and community gatherings.',
    cover: '/images/Acesshirt.jpg',
    count: allPhotos.length,
    photos: allPhotos,
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

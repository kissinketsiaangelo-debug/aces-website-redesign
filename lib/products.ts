export type ColorVariant = {
  name: string
  hex: string
  images: string[]
}

export type RichProduct = {
  id: string
  name: string
  price: number
  image: string
  images: string[]
  tag?: string
  description: string
  sizing?: { label: string; inStock: boolean }[]
  stock: number
  details: string[]
  material?: string
  colors?: ColorVariant[]
}

export const products: RichProduct[] = [
  {
    id: 'codefest-tech-polo',
    name: 'CODEFEST-TECH-POLO',
    price: 60,
    image: '/images/product-codefest-2.jpeg',
    images: ['/images/product-codefest-2.jpeg', '/images/product-codefest-1.jpeg'],
    tag: 'Limited',
    description:
      "Official ACES, CSS and BMESS CODEFEST '26 Premium T-Shirt. Gear up for the ultimate tech showdown with the official merchandise! Crafted from premium, ultra-soft 100% combed cotton, this shirt offers maximum comfort whether you're coding, debugging, wiring up hardware, or designing interfaces.",
    sizing: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
      { label: 'XXL', inStock: false },
    ],
    stock: 40,
    details: [
      '100% Premium Combed Cotton (220 GSM)',
      'Soft-touch, highly breathable fabric',
      'Modern retail fit with durable double-needle stitching',
      'High-quality screen-printed graphics (won\'t crack or fade)',
      'Perfect souvenir for all participants, designers, and tech enthusiasts',
    ],
    material: '100% Premium Combed Cotton',
    colors: [
      { name: 'Black', hex: '#111111', images: ['/images/product-codefest-2.jpeg', '/images/product-codefest-1.jpeg'] },
      { name: 'White', hex: '#F5F5F5', images: ['/images/whitefront.webp', '/images/whiteback.webp'] },
      { name: 'Blue', hex: '#0B5FFF', images: ['/images/bluefront.webp', '/images/blueback.webp'] },
      { name: 'Green', hex: '#2E7D32', images: ['/images/greenfront.webp', '/images/greenback.webp'] },
    ],
  },
]

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

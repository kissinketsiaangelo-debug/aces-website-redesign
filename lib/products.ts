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
    id: 'hoodie',
    name: 'ACES Navy Hoodie',
    price: 180,
    image: '/images/product-hoodie.png',
    images: ['/images/product-hoodie.png', '/images/product-hoodie.png'],
    tag: 'Best seller',
    description:
      'Stay cozy while representing ACES in style. This premium navy hoodie features the iconic ACES chip logo embroidered on the chest.',
    sizing: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
    stock: 15,
    details: [
      'Premium 350 GSM fleece fabric',
      'Embroidered ACES chip logo on chest',
      'Ribbed cuffs and hem for a snug fit',
      'Kangaroo pocket with media port',
      'Unisex fit — size down for a slimmer look',
    ],
    material: '80% Cotton, 20% Polyester',
  },
  {
    id: 'tee',
    name: 'ACES Classic Tee',
    price: 90,
    image: '/images/product-tee.png',
    images: ['/images/product-tee.png', '/images/product-tee.png'],
    description:
      'A timeless classic. The ACES Classic Tee is a lightweight, breathable essential for everyday wear — whether you are in the lab, in class, or on the go.',
    sizing: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
    stock: 28,
    details: [
      'Lightweight 180 GSM jersey fabric',
      'Screen-printed ACES chip logo on front',
      'Reinforced neck and shoulder seams',
      'Pre-shrunk fabric — stays true to size',
      'Machine washable, tumble dry low',
    ],
    material: '100% Combed Ring-Spun Cotton',
  },
  {
    id: 'mug',
    name: 'ACES Coffee Mug',
    price: 45,
    image: '/images/product-mug.png',
    images: ['/images/product-mug.png', '/images/product-mug.png'],
    description:
      'Start your morning right with the ACES Coffee Mug. Featuring a sleek matte finish and the ACES chip logo, it is perfect for your caffeine fix before that 7 AM lecture.',
    stock: 22,
    details: [
      'Ceramic with matte finish',
      'ACES chip logo printed on both sides',
      'Holds 350 ml (12 oz)',
      'Microwave and dishwasher safe',
      'BPA-free, food-grade materials',
    ],
    material: 'High-quality Ceramic',
  },
  {
    id: 'notebook',
    name: 'ACES Engineering Notebook',
    price: 35,
    image: '/images/product-notebook.png',
    images: ['/images/product-notebook.png', '/images/product-notebook.png'],
    tag: 'New',
    description:
      'The perfect companion for lectures, labs, and debugging sessions. This premium notebook features the ACES chip logo embossed on a hardcover with 200 pages of dotted grid paper.',
    stock: 30,
    details: [
      'Hardcover with embossed ACES chip logo',
      '200 pages of 5 mm dotted grid paper',
      'Lay-flat spiral binding',
      'Ribbon bookmark and elastic closure',
      'A5 size — fits in your bag',
    ],
    material: 'Kraft paper cover, 100 GSM acid-free paper',
  },
  {
    id: 'codefest',
    name: "CodeFest '26 Premium T-Shirt",
    price: 120,
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

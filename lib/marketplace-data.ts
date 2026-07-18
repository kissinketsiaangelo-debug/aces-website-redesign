export type Vendor = {
  name: string
  phone: string
  email: string
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  vendor: Vendor
  createdAt: string
}

export type Category = {
  key: string
  label: string
  icon: string
}

export const categories: Category[] = [
  { key: 'food-beverages', label: 'Food & Beverages', icon: 'Coffee' },
  { key: 'fashion-apparel', label: 'Fashion & Apparel', icon: 'Shirt' },
  { key: 'tech-electronics', label: 'Technology & Electronics', icon: 'Laptop' },
  { key: 'services', label: 'Services', icon: 'Wrench' },
  { key: 'beauty-cosmetics', label: 'Beauty & Cosmetics', icon: 'Sparkles' },
  { key: 'other', label: 'Other', icon: 'Package' },
]

const jpgFiles = new Set([
  'Graphic Design - Flyer',
  'Motivational Wall',
  'Web Development Package',
])

const localImages: Record<string, string> = {
  'campus-jollof-combo': 'Campus Jollof Combo',
  'smoothie-bowl': 'Smoothie Bowl',
  'campus-lunch-box': 'Campus Lunch Box',
  'fresh-fruit-platter': 'Fresh Fruit Platter',
  'protein-shake-pack': 'Protein Shake Pack',
  'bubble-tea-kit': 'Bubble Tea Kit',
  'healthy-salad-jar': 'Healthy Salad Jar',
  'custom-crewneck': 'Custom Crewneck Sweatshirt',
  'denim-jacket': 'Denim Jacket',
  'baseball-cap': 'Baseball Cap',
  'wristband-pack': 'Wristband Pack',
  'wireless-earbuds': 'Wireless Earbuds',
  'power-bank-20000': 'Power Bank 20000mAh',
  'usb-c-hub': 'USB-C Hub 7-in 1',
  'mechanical-keyboard': 'Mechanical Keyboard',
  'laptop-stand': 'Adjustable Laptop Stand',
  'webcam-1080p': '1080p Webcam',
  'smartwatch-band': 'Smartwatch Band',
  'bluetooth-speaker': 'Portal Bluethooth Speaker',
  'xl-mouse-pad': 'Gaming Mouse Pad XL',
  'hdmi-cable-pack': 'HDMI Cable',
  'web-dev-package': 'Web Development Package',
  'graphic-design-flyer': 'Graphic Design - Flyer',
  'photography-session': 'Photography Session',
  'cv-review': 'cv',
  'python-crash-course': 'Python Crash Course',
  'logo-design': 'Logo Design',
  'video-editing': 'Video Editing',
  'academic-proofreading': 'Academic Proofreading',
  'social-media-management': 'Social Media Management',
  'shea-butter-cream': 'Shea Butter Cream',
  'lip-gloss-set': 'Lip Gloss Set',
  'face-serum': 'vitamin c',
  'body-scrub': 'sugar body',
  'beard-oil-kit': 'Bread Oil Kit',
  'nail-polish-pack': 'Nail Polish Pack',
  'hair-growth-oil': 'Hair Growth Oil',
  'perfume-roll-on': 'perfume roll on',
  'eyeshadow-palette': 'Eyeshadow Palette',
  'skincare-bundle': 'Skincare',
  'notebook-set': 'Notebook Set',
  'academic-planner': 'Academic Planner',
  'sticker-pack': 'Tech Sticker Pack',
  'wall-poster': 'Motivational Wall',
  'water-bottle': 'Insluted water',
  'desk-organizer': 'Desk organizer',
  'keychain-set': 'engraved key',
  'phone-stand': 'phone satnd',
  'bookmark-collection': 'Bookmark Collection',
  'puzzle-set': 'Campus Puzzle Set',
}

function img(slug: string): string[] {
  const base = '/images/marketplace/'
  const local = localImages[slug]
  if (!local) {
    return [`https://picsum.photos/seed/${slug}-1/400/400`, `https://picsum.photos/seed/${slug}-2/400/400`]
  }
  const ext = jpgFiles.has(local) ? '.jpg' : '.webp'
  return [`${base}${local}${ext}`, `https://picsum.photos/seed/${slug}/400/400`]
}

const C = 'Campus Kitchen'
const T = 'TechConnect Hub'
const S = 'StyleLab'
const G = 'GlowStudio'
const B = 'SkillBridge'
const V = 'VibeCollective'
const F = 'FreshBite'
const GU = 'GadgetGuru'
const U = 'Urban Threads'
const E = 'Elegance Cosmetics'
const P = 'TutorPro Services'
const H = 'CraftHub'

export const products: Product[] = [
  // ── Food & Beverages (10) ──
  { id: 'f1', slug: 'campus-jollof-combo', name: 'Campus Jollof Combo', description: 'Classic Ghanaian jollof rice with grilled chicken, plantain, and a side of fresh salad. Perfect for lunch on the go.', price: 35, images: img('campus-jollof'), category: 'food-beverages', vendor: { name: C, phone: '054 123 4567', email: 'campus.kitchen@aces.edu' }, createdAt: '2026-01-15' },
  { id: 'f2', slug: 'smoothie-bowl', name: 'Smoothie Bowl', description: 'Blended tropical fruits topped with granola, chia seeds, and honey. A refreshing and healthy breakfast option.', price: 20, images: img('smoothie-bowl'), category: 'food-beverages', vendor: { name: C, phone: '054 123 4567', email: 'campus.kitchen@aces.edu' }, createdAt: '2026-01-18' },
  { id: 'f3', slug: 'protein-shake-pack', name: 'Protein Shake Pack', description: 'Pack of 5 premium whey protein shakes in assorted flavours — chocolate, vanilla, and strawberry.', price: 60, images: img('protein-shake'), category: 'food-beverages', vendor: { name: F, phone: '055 987 6543', email: 'freshbite@aces.edu' }, createdAt: '2026-02-01' },
  { id: 'f4', slug: 'grilled-chicken-wrap', name: 'Grilled Chicken Wrap', description: 'Spiced grilled chicken breast with lettuce, tomatoes, and ranch dressing wrapped in a warm tortilla.', price: 25, images: img('chicken-wrap'), category: 'food-beverages', vendor: { name: F, phone: '055 987 6543', email: 'freshbite@aces.edu' }, createdAt: '2026-02-05' },
  { id: 'f5', slug: 'fresh-fruit-platter', name: 'Fresh Fruit Platter', description: 'Seasonal fresh fruits — watermelon, pineapple, mango, oranges, and grapes. Great for group study sessions.', price: 30, images: img('fruit-platter'), category: 'food-beverages', vendor: { name: C, phone: '054 123 4567', email: 'campus.kitchen@aces.edu' }, createdAt: '2026-02-10' },
  { id: 'f6', slug: 'coffee-bundle', name: 'Coffee Bundle', description: 'Bag of freshly roasted Ghanaian coffee beans plus a reusable stainless steel tumbler. Fuel your code sessions.', price: 45, images: img('coffee-bundle'), category: 'food-beverages', vendor: { name: C, phone: '054 123 4567', email: 'campus.kitchen@aces.edu' }, createdAt: '2026-02-14' },
  { id: 'f7', slug: 'energy-bites', name: 'Energy Bites', description: 'Homemade oat-and-peanut-butter energy balls with dark chocolate chips. Pack of 12.', price: 15, images: img('energy-bites'), category: 'food-beverages', vendor: { name: F, phone: '055 987 6543', email: 'freshbite@aces.edu' }, createdAt: '2026-02-20' },
  { id: 'f8', slug: 'campus-lunch-box', name: 'Campus Lunch Box', description: 'Daily lunch box special — changes every day. Includes a main, side, drink, and dessert. Order by 10 AM.', price: 40, images: img('lunch-box'), category: 'food-beverages', vendor: { name: C, phone: '054 123 4567', email: 'campus.kitchen@aces.edu' }, createdAt: '2026-03-01' },
  { id: 'f9', slug: 'bubble-tea-kit', name: 'Bubble Tea Kit', description: 'Make your own bubble tea at home! Includes tapioca pearls, flavoured powders (taro, matcha, brown sugar), and straws.', price: 28, images: img('bubble-tea'), category: 'food-beverages', vendor: { name: F, phone: '055 987 6543', email: 'freshbite@aces.edu' }, createdAt: '2026-03-05' },
  { id: 'f10', slug: 'healthy-salad-jar', name: 'Healthy Salad Jar', description: 'Layered mason jar salad with quinoa, grilled chicken, mixed greens, cherry tomatoes, and vinaigrette.', price: 22, images: img('salad-jar'), category: 'food-beverages', vendor: { name: C, phone: '054 123 4567', email: 'campus.kitchen@aces.edu' }, createdAt: '2026-03-10' },

  // ── Fashion & Apparel (10) ──
  { id: 'a1', slug: 'custom-crewneck', name: 'Custom Crewneck Sweatshirt', description: 'Comfortable unisex crewneck with custom ACES-inspired embroidery. Perfect for cool evenings on campus.', price: 85, images: img('custom-crewneck'), category: 'fashion-apparel', vendor: { name: S, phone: '050 321 7890', email: 'stylelab@aces.edu' }, createdAt: '2026-01-12' },
  { id: 'a2', slug: 'denim-jacket', name: 'Denim Jacket', description: 'Classic blue denim jacket with a modern slim fit. Features embroidered patches you can swap.', price: 120, images: img('denim-jacket'), category: 'fashion-apparel', vendor: { name: U, phone: '053 456 7890', email: 'urban.threads@aces.edu' }, createdAt: '2026-01-20' },
  { id: 'a3', slug: 'streetwear-tee', name: 'Streetwear Graphic Tee', description: 'Bold graphic print t-shirt with oversized fit. 100% organic cotton. Multiple colourways available.', price: 45, images: img('streetwear-tee'), category: 'fashion-apparel', vendor: { name: S, phone: '050 321 7890', email: 'stylelab@aces.edu' }, createdAt: '2026-02-08' },
  { id: 'a4', slug: 'baseball-cap', name: 'Baseball Cap', description: 'Adjustable dad-cap style with embroidered engineering-themed patch. One size fits most.', price: 30, images: img('baseball-cap'), category: 'fashion-apparel', vendor: { name: U, phone: '053 456 7890', email: 'urban.threads@aces.edu' }, createdAt: '2026-02-15' },
  { id: 'a5', slug: 'canvas-tote-bag', name: 'Canvas Tote Bag', description: 'Heavy-duty canvas tote with reinforced stitching. Big enough for a laptop and textbooks.', price: 35, images: img('tote-bag'), category: 'fashion-apparel', vendor: { name: S, phone: '050 321 7890', email: 'stylelab@aces.edu' }, createdAt: '2026-02-22' },
  { id: 'a6', slug: 'sneaker-set', name: 'Sneaker Care Set', description: 'Clean and protect your kicks with this kit: shoe cleaner, brush, and waterproof spray.', price: 50, images: img('sneaker-care'), category: 'fashion-apparel', vendor: { name: U, phone: '053 456 7890', email: 'urban.threads@aces.edu' }, createdAt: '2026-03-02' },
  { id: 'a7', slug: 'pullover-hoodie', name: 'Pullover Hoodie', description: 'Ultra-soft fleece pullover with kangaroo pocket and adjustable drawstring hood. Your go-to campus layer.', price: 75, images: img('pullover-hoodie'), category: 'fashion-apparel', vendor: { name: S, phone: '050 321 7890', email: 'stylelab@aces.edu' }, createdAt: '2026-03-08' },
  { id: 'a8', slug: 'bucket-hat', name: 'Bucket Hat', description: 'Trendy bucket hat in neutral tones. Reversible design — two looks in one.', price: 25, images: img('bucket-hat'), category: 'fashion-apparel', vendor: { name: U, phone: '053 456 7890', email: 'urban.threads@aces.edu' }, createdAt: '2026-03-15' },
  { id: 'a9', slug: 'phone-pouch', name: 'Crossbody Phone Pouch', description: 'Compact vegan-leather pouch that fits your phone, cards, and keys. Hands-free campus carry.', price: 32, images: img('phone-pouch'), category: 'fashion-apparel', vendor: { name: S, phone: '050 321 7890', email: 'stylelab@aces.edu' }, createdAt: '2026-03-22' },
  { id: 'a10', slug: 'wristband-pack', name: 'Wristband Pack', description: 'Pack of 6 silicone wristbands with motivational tech quotes. Give one to your study buddy.', price: 12, images: img('wristband-pack'), category: 'fashion-apparel', vendor: { name: U, phone: '053 456 7890', email: 'urban.threads@aces.edu' }, createdAt: '2026-04-01' },

  // ── Technology & Electronics (10) ──
  { id: 't1', slug: 'wireless-earbuds', name: 'Wireless Earbuds', description: 'Bluetooth 5.3 earbuds with noise isolation, 24-hour battery life, and IPX5 water resistance.', price: 95, images: img('wireless-earbuds'), category: 'tech-electronics', vendor: { name: T, phone: '020 456 7890', email: 'techconnect@aces.edu' }, createdAt: '2026-01-10' },
  { id: 't2', slug: 'power-bank-20000', name: 'Power Bank 20000mAh', description: 'High-capacity power bank with dual USB-A and USB-C output. Charges a laptop once and a phone 5 times.', price: 80, images: img('power-bank'), category: 'tech-electronics', vendor: { name: GU, phone: '024 567 8901', email: 'gadgetguru@aces.edu' }, createdAt: '2026-01-25' },
  { id: 't3', slug: 'usb-c-hub', name: 'USB-C Hub 7-in-1', description: 'Expand your laptop with HDMI 4K, USB-A × 3, SD/microSD, and 100W PD pass-through charging.', price: 65, images: img('usbc-hub'), category: 'tech-electronics', vendor: { name: T, phone: '020 456 7890', email: 'techconnect@aces.edu' }, createdAt: '2026-02-05' },
  { id: 't4', slug: 'mechanical-keyboard', name: 'Mechanical Keyboard', description: 'Compact 75% mechanical keyboard with hot-swappable switches and per-key RGB lighting.', price: 110, images: img('mechanical-keyboard'), category: 'tech-electronics', vendor: { name: GU, phone: '024 567 8901', email: 'gadgetguru@aces.edu' }, createdAt: '2026-02-12' },
  { id: 't5', slug: 'laptop-stand', name: 'Adjustable Laptop Stand', description: 'Ergonomic aluminium laptop stand with adjustable height and angle. Folds flat for your bag.', price: 55, images: img('laptop-stand'), category: 'tech-electronics', vendor: { name: T, phone: '020 456 7890', email: 'techconnect@aces.edu' }, createdAt: '2026-02-18' },
  { id: 't6', slug: 'webcam-1080p', name: '1080p Webcam', description: 'Full HD webcam with built-in ring light and noise-cancelling microphone. Plug-and-play USB.', price: 70, images: img('webcam-hd'), category: 'tech-electronics', vendor: { name: GU, phone: '024 567 8901', email: 'gadgetguru@aces.edu' }, createdAt: '2026-03-01' },
  { id: 't7', slug: 'smartwatch-band', name: 'Smartwatch Band', description: 'Premium silicone replacement band compatible with Apple Watch and Samsung Galaxy Watch. Multiple colours.', price: 25, images: img('smartwatch-band'), category: 'tech-electronics', vendor: { name: T, phone: '020 456 7890', email: 'techconnect@aces.edu' }, createdAt: '2026-03-10' },
  { id: 't8', slug: 'bluetooth-speaker', name: 'Portable Bluetooth Speaker', description: 'Waterproof portable speaker with 360° sound, 12-hour battery, and a built-in carabiner.', price: 60, images: img('bt-speaker'), category: 'tech-electronics', vendor: { name: GU, phone: '024 567 8901', email: 'gadgetguru@aces.edu' }, createdAt: '2026-03-18' },
  { id: 't9', slug: 'xl-mouse-pad', name: 'Gaming Mouse Pad XL', description: '900 × 400 mm extended mouse pad with stitched edges and a smooth microfiber surface.', price: 28, images: img('mousepad-xl'), category: 'tech-electronics', vendor: { name: T, phone: '020 456 7890', email: 'techconnect@aces.edu' }, createdAt: '2026-03-25' },
  { id: 't10', slug: 'hdmi-cable-pack', name: 'HDMI Cable Pack', description: 'Pack of 2 premium HDMI 2.1 cables (1.5m and 3m) supporting 4K@120Hz and eARC.', price: 22, images: img('hdmi-pack'), category: 'tech-electronics', vendor: { name: GU, phone: '024 567 8901', email: 'gadgetguru@aces.edu' }, createdAt: '2026-04-02' },

  // ── Services (10) ──
  { id: 's1', slug: 'web-dev-package', name: 'Web Development Package', description: 'Complete website build — landing page or portfolio with up to 5 sections. Includes hosting setup and domain guidance.', price: 350, images: img('web-dev'), category: 'services', vendor: { name: B, phone: '057 789 0123', email: 'skillbridge@aces.edu' }, createdAt: '2026-01-08' },
  { id: 's2', slug: 'graphic-design-flyer', name: 'Graphic Design — Flyer', description: 'Professionally designed A5 or A4 flyer for your event, club, or business. Includes 2 revision rounds.', price: 80, images: img('graphic-flyer'), category: 'services', vendor: { name: B, phone: '057 789 0123', email: 'skillbridge@aces.edu' }, createdAt: '2026-01-22' },
  { id: 's3', slug: 'photography-session', name: 'Photography Session', description: '30-minute campus photoshoot with 10 edited digital photos. Great for LinkedIn profiles or graduation.', price: 120, images: img('photography'), category: 'services', vendor: { name: P, phone: '059 876 5432', email: 'tutorpro@aces.edu' }, createdAt: '2026-02-04' },
  { id: 's4', slug: 'math-tutoring', name: 'Mathematics Tutoring', description: 'One-on-one tutoring for Calculus, Linear Algebra, and Differential Equations. 1-hour sessions, online or in-person.', price: 30, images: img('math-tutor'), category: 'services', vendor: { name: P, phone: '059 876 5432', email: 'tutorpro@aces.edu' }, createdAt: '2026-02-14' },
  { id: 's5', slug: 'cv-review', name: 'CV Review Service', description: 'Detailed review of your CV and cover letter with actionable feedback. Fast 48-hour turnaround.', price: 50, images: img('cv-review'), category: 'services', vendor: { name: B, phone: '057 789 0123', email: 'skillbridge@aces.edu' }, createdAt: '2026-02-20' },
  { id: 's6', slug: 'python-crash-course', name: 'Python Crash Course', description: '4-week accelerated Python course covering data structures, OOP, and a final project. Weekend classes.', price: 150, images: img('python-course'), category: 'services', vendor: { name: P, phone: '059 876 5432', email: 'tutorpro@aces.edu' }, createdAt: '2026-03-01' },
  { id: 's7', slug: 'logo-design', name: 'Logo Design', description: 'Custom logo for your brand, club, or startup. Delivered in PNG, SVG, and EPS formats with full rights.', price: 95, images: img('logo-design'), category: 'services', vendor: { name: B, phone: '057 789 0123', email: 'skillbridge@aces.edu' }, createdAt: '2026-03-10' },
  { id: 's8', slug: 'video-editing', name: 'Video Editing', description: 'Professional video editing for short form content — reels, promos, or event recaps. Includes colour grading.', price: 100, images: img('video-edit'), category: 'services', vendor: { name: P, phone: '059 876 5432', email: 'tutorpro@aces.edu' }, createdAt: '2026-03-18' },
  { id: 's9', slug: 'academic-proofreading', name: 'Academic Proofreading', description: 'Proofreading service for reports, theses, and assignments. Corrections tracked for your review.', price: 40, images: img('proofreading'), category: 'services', vendor: { name: B, phone: '057 789 0123', email: 'skillbridge@aces.edu' }, createdAt: '2026-03-28' },
  { id: 's10', slug: 'social-media-management', name: 'Social Media Management', description: '1-month social media management for your brand. Includes 12 posts, engagement, and analytics report.', price: 200, images: img('social-media'), category: 'services', vendor: { name: P, phone: '059 876 5432', email: 'tutorpro@aces.edu' }, createdAt: '2026-04-05' },

  // ── Beauty & Cosmetics (10) ──
  { id: 'b1', slug: 'shea-butter-cream', name: 'Shea Butter Cream', description: 'Handcrafted unrefined shea butter blended with coconut oil and vitamin E. Deep moisture without the grease.', price: 25, images: img('shea-butter'), category: 'beauty-cosmetics', vendor: { name: G, phone: '056 234 5678', email: 'glowstudio@aces.edu' }, createdAt: '2026-01-14' },
  { id: 'b2', slug: 'lip-gloss-set', name: 'Lip Gloss Set', description: 'Set of 4 high-shine lip glosses in nude, rose, berry, and clear. Cruelty-free and long-lasting.', price: 35, images: img('lip-gloss'), category: 'beauty-cosmetics', vendor: { name: E, phone: '058 345 6789', email: 'elegance.cosmetics@aces.edu' }, createdAt: '2026-01-28' },
  { id: 'b3', slug: 'face-serum', name: 'Vitamin C Face Serum', description: 'Brightening vitamin C serum with hyaluronic acid. Reduces dark spots and evens skin tone.', price: 40, images: img('face-serum'), category: 'beauty-cosmetics', vendor: { name: G, phone: '056 234 5678', email: 'glowstudio@aces.edu' }, createdAt: '2026-02-08' },
  { id: 'b4', slug: 'body-scrub', name: 'Sugar Body Scrub', description: 'Exfoliating sugar scrub with shea butter and essential oils. Leaves your skin smooth and nourished.', price: 28, images: img('body-scrub'), category: 'beauty-cosmetics', vendor: { name: E, phone: '058 345 6789', email: 'elegance.cosmetics@aces.edu' }, createdAt: '2026-02-18' },
  { id: 'b5', slug: 'beard-oil-kit', name: 'Beard Oil Kit', description: 'Set of 3 premium beard oils — sandalwood, citrus, and unscented. Softens and conditions.', price: 32, images: img('beard-oil'), category: 'beauty-cosmetics', vendor: { name: G, phone: '056 234 5678', email: 'glowstudio@aces.edu' }, createdAt: '2026-02-25' },
  { id: 'b6', slug: 'nail-polish-pack', name: 'Nail Polish Pack', description: 'Pack of 6 vibrant nail polishes in trending colours. Quick-dry formula, chip-resistant.', price: 20, images: img('nail-polish'), category: 'beauty-cosmetics', vendor: { name: E, phone: '058 345 6789', email: 'elegance.cosmetics@aces.edu' }, createdAt: '2026-03-05' },
  { id: 'b7', slug: 'hair-growth-oil', name: 'Hair Growth Oil', description: 'Natural hair growth oil infused with rosemary, peppermint, and castor oil. Promotes thicker, healthier hair.', price: 30, images: img('hair-oil'), category: 'beauty-cosmetics', vendor: { name: G, phone: '056 234 5678', email: 'glowstudio@aces.edu' }, createdAt: '2026-03-12' },
  { id: 'b8', slug: 'perfume-roll-on', name: 'Perfume Roll-On', description: 'Roll-on perfume oil in a portable bottle. Long-lasting scent — choose from floral, woody, or fresh.', price: 18, images: img('perfume-roll'), category: 'beauty-cosmetics', vendor: { name: E, phone: '058 345 6789', email: 'elegance.cosmetics@aces.edu' }, createdAt: '2026-03-22' },
  { id: 'b9', slug: 'eyeshadow-palette', name: 'Eyeshadow Palette', description: '16-colour eyeshadow palette with matte, shimmer, and glitter finishes. Highly pigmented and blendable.', price: 45, images: img('eyeshadow'), category: 'beauty-cosmetics', vendor: { name: G, phone: '056 234 5678', email: 'glowstudio@aces.edu' }, createdAt: '2026-03-30' },
  { id: 'b10', slug: 'skincare-bundle', name: 'Skincare Starter Bundle', description: 'Complete skincare set: cleanser, toner, serum, and moisturiser. Perfect for a fresh complexion.', price: 65, images: img('skincare-bundle'), category: 'beauty-cosmetics', vendor: { name: E, phone: '058 345 6789', email: 'elegance.cosmetics@aces.edu' }, createdAt: '2026-04-05' },

  // ── Other (10) ──
  { id: 'o1', slug: 'notebook-set', name: 'Notebook Set', description: 'Set of 3 A5 dotted-grid notebooks with 160 pages each. Lay-flat binding and 100gsm paper.', price: 35, images: img('notebook-set'), category: 'other', vendor: { name: V, phone: '051 678 9012', email: 'vibecollective@aces.edu' }, createdAt: '2026-01-12' },
  { id: 'o2', slug: 'academic-planner', name: 'Academic Planner 2026', description: 'Undated weekly planner designed for university students. Includes semester overview, grade tracker, and habit log.', price: 28, images: img('academic-planner'), category: 'other', vendor: { name: H, phone: '052 789 0123', email: 'crafthub@aces.edu' }, createdAt: '2026-01-20' },
  { id: 'o3', slug: 'sticker-pack', name: 'Tech Sticker Pack', description: 'Pack of 20 vinyl stickers with programming jokes, OS logos, and engineering icons. Waterproof.', price: 15, images: img('sticker-pack'), category: 'other', vendor: { name: V, phone: '051 678 9012', email: 'vibecollective@aces.edu' }, createdAt: '2026-02-05' },
  { id: 'o4', slug: 'wall-poster', name: 'Motivational Wall Poster', description: 'A2-sized poster with a custom design featuring engineering blueprints and a motivational quote.', price: 25, images: img('wall-poster'), category: 'other', vendor: { name: H, phone: '052 789 0123', email: 'crafthub@aces.edu' }, createdAt: '2026-02-15' },
  { id: 'o5', slug: 'water-bottle', name: 'Insulated Water Bottle', description: 'Stainless steel vacuum-insulated bottle, 750ml. Keeps drinks cold for 24 hours or hot for 12 hours.', price: 40, images: img('water-bottle'), category: 'other', vendor: { name: V, phone: '051 678 9012', email: 'vibecollective@aces.edu' }, createdAt: '2026-02-22' },
  { id: 'o6', slug: 'desk-organizer', name: 'Desk Organizer', description: 'Bamboo desk organiser with compartments for pens, phone, sticky notes, and small accessories.', price: 32, images: img('desk-organizer'), category: 'other', vendor: { name: H, phone: '052 789 0123', email: 'crafthub@aces.edu' }, createdAt: '2026-03-04' },
  { id: 'o7', slug: 'keychain-set', name: 'Engraved Keychain Set', description: 'Set of 3 aluminium keychains with engineering symbols — gear, resistor, and processor. Laser engraved.', price: 18, images: img('keychain-set'), category: 'other', vendor: { name: V, phone: '051 678 9012', email: 'vibecollective@aces.edu' }, createdAt: '2026-03-12' },
  { id: 'o8', slug: 'phone-stand', name: 'Phone Stand', description: 'Adjustable phone stand made from recycled aluminium. Compatible with all phone sizes and cases.', price: 20, images: img('phone-stand'), category: 'other', vendor: { name: H, phone: '052 789 0123', email: 'crafthub@aces.edu' }, createdAt: '2026-03-20' },
  { id: 'o9', slug: 'bookmark-collection', name: 'Bookmark Collection', description: 'Set of 8 metal bookmarks featuring famous scientists and engineers. Each with a short bio on the back.', price: 14, images: img('bookmark-set'), category: 'other', vendor: { name: V, phone: '051 678 9012', email: 'vibecollective@aces.edu' }, createdAt: '2026-03-28' },
  { id: 'o10', slug: 'puzzle-set', name: 'Campus Puzzle Set', description: '500-piece jigsaw puzzle featuring a beautiful illustration of KNUST campus landmarks. Great for hall decor.', price: 38, images: img('puzzle-set'), category: 'other', vendor: { name: H, phone: '052 789 0123', email: 'crafthub@aces.edu' }, createdAt: '2026-04-04' },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()
  if (!q) return products
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.vendor.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  )
}

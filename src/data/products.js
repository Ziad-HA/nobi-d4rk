export const formatPrice = (n) => `${n.toLocaleString('en-US')} EGP`

export const categories = [
  {
    slug: 'hoodies',
    name: 'Hoodies',
    nameAr: 'هوديز',
    image:
      'https://images.unsplash.com/photo-1556821840-3a69f8430e75?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 't-shirts',
    name: 'T-Shirts',
    nameAr: 'تيشرتات',
    image:
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'pants',
    name: 'Pants',
    nameAr: 'بناطيل',
    image:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'jackets',
    name: 'Jackets',
    nameAr: 'جاكيتات',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    nameAr: 'إكسسوارات',
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
  },
]

export const collections = [
  {
    slug: 'new-drops',
    name: 'New Drops',
    tagline: 'Every month',
    cta: 'Explore',
    image:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'essentials',
    name: 'Essentials',
    tagline: 'Everyday staples',
    cta: 'Explore',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'sale',
    name: 'Up to 30% Off',
    tagline: 'Limited time only',
    cta: 'Shop sale',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  },
]

export const instagramPosts = [
  'https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1496360166961-10a51d5f367a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f872be6?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
]

export const products = [
  {
    id: 'midnight-hoodie',
    name: 'Midnight Hoodie',
    price: 1450,
    category: 'hoodies',
    collection: 'new-drops',
    trending: true,
    image:
      'https://images.unsplash.com/photo-1556821840-3a69f8430e75?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1578768079052-aa76e52c4d1d?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Heavyweight black hoodie with a soft brushed interior and a boxy, relaxed fit. Clean front, small back detail.',
  },
  {
    id: 'downtown-tee',
    name: 'Downtown Tee',
    price: 650,
    category: 't-shirts',
    collection: 'new-drops',
    trending: true,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Cream cotton tee with a small chest print. Soft hand-feel, slightly oversized, made to be worn on repeat.',
  },
  {
    id: 'sahara-washed-tee',
    name: 'Sahara Washed Tee',
    price: 690,
    category: 't-shirts',
    collection: 'essentials',
    trending: true,
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Garment-washed brown tee with a sun-faded look and a lived-in drape. Each piece washes slightly differently.',
  },
  {
    id: 'utility-cargo-pants',
    name: 'Utility Cargo Pants',
    price: 1250,
    category: 'pants',
    collection: 'essentials',
    trending: true,
    image:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    sizes: ['28', '30', '32', '34', '36'],
    description:
      'Relaxed cargo pants in sturdy cotton twill with reinforced pockets and an adjustable hem. Built for everyday wear.',
  },
  {
    id: 'sekka-oversized-tee',
    name: 'Sekka Oversized Tee',
    price: 750,
    category: 't-shirts',
    collection: 'new-drops',
    trending: true,
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1618354690439-27c07003b58c?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Charcoal oversized tee with dropped shoulders. A staple for layering or wearing on its own.',
  },
  {
    id: 'essential-hoodie',
    name: 'Essential Hoodie',
    price: 1350,
    category: 'hoodies',
    collection: 'essentials',
    trending: true,
    image:
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1578587018452-892b722df76b?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Sand-tone fleece hoodie. Clean lines, no pilling, made for everyday rotation.',
  },
  {
    id: 'sekka-back-print-tee',
    name: 'Sekka Back Print Tee',
    price: 850,
    category: 't-shirts',
    collection: 'essentials',
    trending: false,
    image:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1496360166961-10a51d5f367a?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Black boxy tee with the Sekka print across the back. The house staple.',
  },
  {
    id: 'night-bomber',
    name: 'Night Bomber Jacket',
    price: 2400,
    category: 'jackets',
    collection: 'essentials',
    trending: false,
    sale: true,
    originalPrice: 3000,
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Black bomber jacket, fully lined, with ribbed cuffs and a clean zip. Light enough for Cairo winters.',
  },
  {
    id: 'night-cap',
    name: 'Night Cap',
    price: 380,
    category: 'accessories',
    collection: 'sale',
    trending: false,
    sale: true,
    originalPrice: 520,
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
    sizes: ['OS'],
    description:
      'Structured black cap with a low profile and a small embroidered mark. One size, adjustable.',
  },
  {
    id: 'ink-denim',
    name: 'Ink Wash Denim',
    price: 1450,
    category: 'pants',
    collection: 'sale',
    trending: false,
    sale: true,
    originalPrice: 1850,
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    sizes: ['28', '30', '32', '34', '36'],
    description:
      'Straight-leg black denim with a faint wash. Sturdy fabric, clean finish, no unnecessary details.',
  },
  {
    id: 'studio-coach',
    name: 'Studio Coach Jacket',
    price: 1900,
    category: 'jackets',
    collection: 'new-drops',
    trending: false,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1548126032-079ad6481a60?auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Lightweight coach jacket in matte black. Snap buttons and a drawcord hem.',
  },
  {
    id: 'crest-beanie',
    name: 'Crest Beanie',
    price: 320,
    category: 'accessories',
    collection: 'sale',
    trending: false,
    sale: true,
    originalPrice: 450,
    image:
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=80',
    hoverImage:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
    sizes: ['OS'],
    description:
      'Rib-knit beanie in charcoal. Soft, stretchy, and a quiet everyday extra.',
  },
]

export function getProduct(id) {
  return products.find((p) => p.id === id)
}

export function filterProducts({ category, collection, q, trending } = {}) {
  return products.filter((p) => {
    if (category && p.category !== category) return false
    if (collection && p.collection !== collection) return false
    if (trending && !p.trending) return false
    if (q) {
      const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase()
      if (!hay.includes(q.toLowerCase())) return false
    }
    return true
  })
}

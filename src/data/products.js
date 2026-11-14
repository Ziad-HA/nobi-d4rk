export const formatPrice = (n) => `${n.toLocaleString("en-US")} EGP`;

// Photos: put your own in /public/images/products and name them after the product id (for example /images/products/d4rk-dad-cap.jpg).
// Until a photo exists the tile just stays empty.
const img = (name) => `/images/products/${name}.jpg`;

export const categories = [
  { slug: "caps", name: "Caps", nameAr: "كابات", image: img("cat-caps") },
  { slug: "beanies", name: "Beanies", nameAr: "بيني", image: img("cat-beanies") },
  { slug: "bags", name: "Bags", nameAr: "شنط", image: img("cat-bags") },
  { slug: "jewelry", name: "Jewelry", nameAr: "إكسسوارات معدن", image: img("cat-jewelry") },
  { slug: "eyewear", name: "Eyewear", nameAr: "نظارات", image: img("cat-eyewear") },
];

export const collections = [
  { slug: "new-drops", name: "New Drops", tagline: "Every month", cta: "Explore", image: img("col-new-drops") },
  { slug: "essentials", name: "Essentials", tagline: "Everyday carry", cta: "Explore", image: img("col-essentials") },
  { slug: "sale", name: "Up to 30% Off", tagline: "Limited time only", cta: "Shop sale", image: img("col-sale") },
];

export const products = [
  {
    id: "d4rk-dad-cap",
    name: "D4RK Dad Cap",
    price: 450,
    category: "caps",
    collection: "new-drops",
    trending: true,
    image: img("d4rk-dad-cap"),
    sizes: ["OS"],
    description: "Washed black cotton cap with a tonal D4RK stitch on the front. Adjustable strap.",
  },
  {
    id: "night-5-panel",
    name: "Night 5-Panel",
    price: 520,
    category: "caps",
    collection: "essentials",
    trending: false,
    image: img("night-5-panel"),
    sizes: ["OS"],
    description: "Flat-brim 5-panel in matte black nylon. Clean front, small tag on the back.",
  },
  {
    id: "washed-trucker",
    name: "Washed Trucker",
    price: 480,
    category: "caps",
    collection: "sale",
    trending: false,
    sale: true,
    originalPrice: 600,
    image: img("washed-trucker"),
    sizes: ["OS"],
    description: "Faded black trucker with a mesh back and a snap closure.",
  },
  {
    id: "fold-beanie",
    name: "Fold Beanie",
    price: 350,
    category: "beanies",
    collection: "new-drops",
    trending: true,
    image: img("fold-beanie"),
    sizes: ["OS"],
    description: "Rib-knit fold beanie in black. Soft, stretchy, sits low.",
  },
  {
    id: "crest-beanie",
    name: "Crest Beanie",
    price: 320,
    category: "beanies",
    collection: "sale",
    trending: false,
    sale: true,
    originalPrice: 450,
    image: img("crest-beanie"),
    sizes: ["OS"],
    description: "Rib-knit beanie in charcoal with a small woven D4RK tag.",
  },
  {
    id: "night-balaclava",
    name: "Night Balaclava",
    price: 400,
    category: "beanies",
    collection: "new-drops",
    trending: true,
    image: img("night-balaclava"),
    sizes: ["OS"],
    description: "Thin knit balaclava in black. Wear it up as a beanie or pulled down.",
  },
  {
    id: "crossbody-bag",
    name: "Crossbody Bag",
    price: 750,
    category: "bags",
    collection: "new-drops",
    trending: true,
    image: img("crossbody-bag"),
    sizes: ["OS"],
    description: "Compact crossbody in water-resistant black nylon. Two zip pockets and an adjustable strap.",
  },
  {
    id: "mini-shoulder-bag",
    name: "Mini Shoulder Bag",
    price: 650,
    category: "bags",
    collection: "essentials",
    trending: false,
    image: img("mini-shoulder-bag"),
    sizes: ["OS"],
    description: "Small shoulder bag that fits your phone, wallet and keys. Matte hardware.",
  },
  {
    id: "everyday-tote",
    name: "Everyday Tote",
    price: 380,
    category: "bags",
    collection: "essentials",
    trending: false,
    image: img("everyday-tote"),
    sizes: ["OS"],
    description: "Heavy canvas tote in black with an inner pocket. Fits a laptop.",
  },
  {
    id: "steel-chain",
    name: "Steel Chain",
    price: 550,
    category: "jewelry",
    collection: "new-drops",
    trending: true,
    image: img("steel-chain"),
    sizes: ["45 cm", "50 cm", "55 cm"],
    description: "Stainless steel chain that will not tarnish. Pick the length that sits where you like.",
  },
  {
    id: "dog-tag",
    name: "D4RK Dog Tag",
    price: 420,
    category: "jewelry",
    collection: "essentials",
    trending: false,
    image: img("dog-tag"),
    sizes: ["OS"],
    description: "Brushed steel tag on a ball chain, engraved with the D4RK mark.",
  },
  {
    id: "ring-set",
    name: "Ring Set (3)",
    price: 280,
    category: "jewelry",
    collection: "essentials",
    trending: false,
    image: img("ring-set"),
    sizes: ["OS"],
    description: "Three stackable steel rings. Adjustable, so they fit most fingers.",
  },
  {
    id: "shield-sunglasses",
    name: "Shield Sunglasses",
    price: 480,
    category: "eyewear",
    collection: "essentials",
    trending: true,
    image: img("shield-sunglasses"),
    sizes: ["OS"],
    description: "Wraparound shield frame with dark UV400 lenses.",
  },
  {
    id: "slim-frame",
    name: "Slim Frame Sunglasses",
    price: 420,
    category: "eyewear",
    collection: "sale",
    trending: false,
    sale: true,
    originalPrice: 560,
    image: img("slim-frame"),
    sizes: ["OS"],
    description: "Narrow black frame with tinted UV400 lenses. Light on the face.",
  },
];

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function filterProducts({ category, collection, q, trending } = {}) {
  return products.filter((p) => {
    if (category && p.category !== category) return false;
    if (collection && p.collection !== collection) return false;
    if (trending && !p.trending) return false;
    if (q) {
      const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });
}

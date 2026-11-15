export const formatPrice = (n) => `${n.toLocaleString("en-US")} EGP`;

// Photos: put your own in /public/images/products and name them after the product id (for example /images/products/d4rk-dad-cap.jpg).
// Until a photo exists the tile just stays empty.
const img = (name) => `/images/products/${name}.jpg`;

export const categories = [
  { slug: "caps", name: "Caps", nameAr: "كابات", image: img("cat-caps") },
  { slug: "beanies", name: "Beanies", nameAr: "بيني", image: img("cat-beanies") },
  { slug: "bags", name: "Backpacks", nameAr: "شنط", image: img("cat-bags") },
  { slug: "jewelry", name: "Rings", nameAr: "خواتم", image: img("cat-jewelry") },
  { slug: "eyewear", name: "Eyewear", nameAr: "نظارات", image: img("cat-eyewear") },
];

export const collections = [
  { slug: "new-drops", name: "New Drops", tagline: "Every month", cta: "Explore", image: img("col-new-drops") },
  { slug: "essentials", name: "Essentials", tagline: "Everyday carry", cta: "Explore", image: img("col-essentials") },
  { slug: "sale", name: "Up to 30% Off", tagline: "Limited time only", cta: "Shop sale", image: img("col-sale") },
];

export const products = [
  {
    id: "flame-cap",
    name: "Flame Cap",
    price: 450,
    category: "caps",
    collection: "new-drops",
    trending: true,
    image: img("flame-cap"),
    sizes: ["OS"],
    description: "Washed black cap with silver flame embroidery across the crown and brim, and studs along the brim edge. Adjustable strap.",
  },
  {
    id: "patch-trucker",
    name: "Patch Trucker",
    price: 520,
    category: "caps",
    collection: "essentials",
    trending: false,
    image: img("patch-trucker"),
    sizes: ["OS"],
    description: "Black foam trucker with a woven patch on the front and a mesh back. Snapback closure.",
  },
  {
    id: "star-trucker",
    name: "Star Trucker",
    price: 480,
    category: "caps",
    collection: "sale",
    trending: false,
    sale: true,
    originalPrice: 600,
    image: img("star-trucker"),
    sizes: ["OS"],
    description: "White foam trucker with black embroidered stars and a front emblem. Mesh back, snapback closure.",
  },
  {
    id: "thorn-beanie",
    name: "Thorn Beanie",
    price: 350,
    category: "beanies",
    collection: "new-drops",
    trending: true,
    image: img("thorn-beanie"),
    sizes: ["OS"],
    description: "Jacquard-knit beanie in black with a white thorn print and a small woven mark. Soft and stretchy.",
  },
  {
    id: "shadow-beanie",
    name: "Shadow Beanie",
    price: 320,
    category: "beanies",
    collection: "sale",
    trending: false,
    sale: true,
    originalPrice: 450,
    image: img("shadow-beanie"),
    sizes: ["OS"],
    description: "Jacquard-knit beanie in black with a faded portrait pattern. Fits close to the head.",
  },
  {
    id: "cross-beanie",
    name: "Cross Beanie",
    price: 400,
    category: "beanies",
    collection: "new-drops",
    trending: true,
    image: img("cross-beanie"),
    sizes: ["OS"],
    description: "Jacquard-knit beanie in black with a double cross print. Soft, stretchy, one size.",
  },
  {
    id: "shark-backpack",
    name: "Shark Backpack",
    price: 850,
    category: "bags",
    collection: "new-drops",
    trending: true,
    image: img("shark-backpack"),
    sizes: ["OS"],
    description: "Checkerboard backpack in charcoal with a bold shark-mouth print on the front. Padded back, zip front pocket and a top handle.",
  },
  {
    id: "crystal-backpack",
    name: "Crystal Backpack",
    price: 1100,
    category: "bags",
    collection: "essentials",
    trending: false,
    image: img("crystal-backpack"),
    sizes: ["OS"],
    description: "Black checkerboard backpack with a torn-open panel of sparkling crystals. Silver hardware and a top handle.",
  },
  {
    id: "smoke-backpack",
    name: "Smoke Backpack",
    price: 900,
    category: "bags",
    collection: "essentials",
    trending: false,
    image: img("smoke-backpack"),
    sizes: ["OS"],
    description: "Charcoal checkerboard backpack with a white smoke print across the front. Fits a laptop.",
  },
  {
    id: "ribbed-ring",
    name: "Ribbed Ring",
    price: 380,
    category: "jewelry",
    collection: "new-drops",
    trending: true,
    image: img("ribbed-ring"),
    sizes: ["S", "M", "L"],
    description: "Oxidized silver-tone ring with a hand-finished ribbed, bone-like band. Heavy and sculptural.",
  },
  {
    id: "numbers-ring",
    name: "Numbers Ring",
    price: 320,
    category: "jewelry",
    collection: "essentials",
    trending: false,
    image: img("numbers-ring"),
    sizes: ["S", "M", "L"],
    description: "Slim steel band with raised numbers around the outside. Plain polished inside.",
  },
  {
    id: "signet-ring",
    name: "Signet Ring",
    price: 420,
    category: "jewelry",
    collection: "essentials",
    trending: false,
    image: img("signet-ring"),
    sizes: ["S", "M", "L"],
    description: "Flat-top signet ring in brushed antique silver with a numbered plate on the front.",
  },
  {
    id: "cross-frame",
    name: "Cross Frame",
    price: 480,
    category: "eyewear",
    collection: "essentials",
    trending: true,
    image: img("cross-frame"),
    sizes: ["OS"],
    description: "Square black acetate frame with silver cross hardware on the front and temples. Clear lenses.",
  },
  {
    id: "clear-frame",
    name: "Clear Frame",
    price: 420,
    category: "eyewear",
    collection: "sale",
    trending: false,
    sale: true,
    originalPrice: 560,
    image: img("clear-frame"),
    sizes: ["OS"],
    description: "Crystal-clear frame with a silver fleur hardware detail on the temple. Clear lenses.",
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

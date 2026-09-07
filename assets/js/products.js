// Ally Shop - Cosmetic Products Catalog Database
const PRODUCTS_DATA = [
  {
    id: "ally-01",
    name: "Velvet Matte Liquid Lipstick",
    category: "lips",
    price: 1450,
    originalPrice: 1950,
    discount: "25% OFF",
    rating: 4.9,
    reviewsCount: 128,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
    description: "Intense, long-lasting matte color with a velvety feather-light finish. Non-drying formula enriched with Vitamin E and Jojoba Oil for 16-hour transfer-proof wear.",
    shades: [
      { name: "Royal Plum", hex: "#7E224F" },
      { name: "Ruby Queen", hex: "#9E192D" },
      { name: "Rose Velvet", hex: "#C75D7A" },
      { name: "Nude Elegance", hex: "#B87D70" }
    ],
    features: ["16-Hour Transfer Proof", "Enriched with Vitamin E", "100% Smudge Resistant", "Cruelty-Free"]
  },
  {
    id: "ally-02",
    name: "Sunset Romance 18-Shade Eyeshadow Palette",
    category: "eyes",
    price: 2850,
    originalPrice: 3800,
    discount: "25% OFF",
    rating: 5.0,
    reviewsCount: 94,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    description: "An exquisite curation of 18 rich pigment shades ranging from buttery smooth mattes to ultra-reflective diamond shimmers and metallic duochromes.",
    shades: [
      { name: "Palette Standard", hex: "#D4738C" }
    ],
    features: ["Ultra-Blendable Formula", "Waterproof & Crease-Resistant", "High Color Payoff", "Mirror Included"]
  },
  {
    id: "ally-03",
    name: "Luminous Silk 24H Liquid Foundation",
    category: "face",
    price: 2650,
    originalPrice: 3300,
    discount: "20% OFF",
    rating: 4.8,
    reviewsCount: 156,
    isBestSeller: true,
    isNew: false,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80",
    description: "Weightless, breathable foundation that blurs pores and evens skin tone for a natural, lit-from-within glow with buildable medium-to-full coverage.",
    shades: [
      { name: "Fair Ivory", hex: "#F3DAC5" },
      { name: "Warm Beige", hex: "#E7C5A3" },
      { name: "Golden Honey", hex: "#D2A277" },
      { name: "Caramel Bronze", hex: "#B37E52" }
    ],
    features: ["24-Hour Hydrating Glow", "SPF 25 Sun Protection", "Oil-Free & Non-Comedogenic", "Sweat-Resistant"]
  },
  {
    id: "ally-04",
    name: "24K Gold Radiant Primer & Serum",
    category: "skincare",
    price: 1950,
    originalPrice: 2500,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 87,
    isBestSeller: false,
    isNew: true,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1608248597359-bb5835697672?auto=format&fit=crop&w=800&q=80",
    description: "Infused with genuine 24-karat gold flakes and Hyaluronic Acid to hydrate, smooth skin texture, and lock makeup in place all day long.",
    shades: [
      { name: "Pure Gold", hex: "#D4AF37" }
    ],
    features: ["Instant Pore Blurring", "Deep 48H Hydration", "Preps & Extends Makeup", "Anti-Aging Peptides"]
  },
  {
    id: "ally-05",
    name: "10-Piece Luxury Makeup Brush Set & Pouch",
    category: "brushes-kits",
    price: 3200,
    originalPrice: 4500,
    discount: "28% OFF",
    rating: 4.9,
    reviewsCount: 210,
    isBestSeller: true,
    isNew: false,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-soft, cruelty-free synthetic bristles with ergonomic violet-gold metallic handles. Includes all essentials for powder, foundation, contour, and eye looks.",
    shades: [
      { name: "Aylle Violet & Gold", hex: "#6C2EB9" },
      { name: "Rose Gold Luxe", hex: "#B76E79" }
    ],
    features: ["Dense Fluffy Bristles", "Shed-Free Guarantee", "Includes Velvet Travel Bag", "Easy to Clean"]
  },
  {
    id: "ally-06",
    name: "Aylle Signature Eau De Parfum (100ml)",
    category: "perfumes",
    price: 3950,
    originalPrice: 5200,
    discount: "24% OFF",
    rating: 5.0,
    reviewsCount: 142,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    description: "An enchanting luxury fragrance blending Moroccan Jasmine, Pink Peony, Sweet Vanilla orchid, and rich Amberwood for an unforgettable signature trail.",
    shades: [
      { name: "Signature 100ml", hex: "#8A3AB9" }
    ],
    features: ["Long-Lasting 18+ Hours", "French Perfume Oils", "Luxury Glass Crystal Bottle", "Gift Ready Packaging"]
  },
  {
    id: "ally-07",
    name: "Baked Starlight Highlighter & Glow Powder",
    category: "face",
    price: 1650,
    originalPrice: 2200,
    discount: "25% OFF",
    rating: 4.8,
    reviewsCount: 79,
    isBestSeller: false,
    isNew: false,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    description: "Micro-fine pearls deliver a seamless, blinding glass-skin finish without accentuating texture or fine lines.",
    shades: [
      { name: "Champagne Glow", hex: "#F7E7CE" },
      { name: "Rose Quartz", hex: "#E8A3B8" },
      { name: "Bronze Goddess", hex: "#C68B59" }
    ],
    features: ["Silky Baked Texture", "Blinding Multi-Dimensional Glow", "Zero Chunky Glitter", "All Day Wear"]
  },
  {
    id: "ally-08",
    name: "Dramatic 3D Volume & Curl Mascara",
    category: "eyes",
    price: 1350,
    originalPrice: 1750,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 165,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    description: "Achieve false lash effect instantly. Hourglass brush coats every lash from root to tip without clumping, flaking, or smudging.",
    shades: [
      { name: "Carbon Black", hex: "#000000" },
      { name: "Deep Espresso", hex: "#3B2219" }
    ],
    features: ["10x Instant Lash Volume", "100% Smudge & Tear Proof", "Ophthalmologist Tested", "Easy Removal"]
  },
  {
    id: "ally-09",
    name: "Plumping Crystal Gloss & Lip Oil",
    category: "lips",
    price: 1250,
    originalPrice: 1600,
    discount: "21% OFF",
    rating: 4.7,
    reviewsCount: 92,
    isBestSeller: false,
    isNew: true,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
    description: "High-shine glassy gloss with gentle peptide plumping complex and Rosehip seed oil. Leaves lips pillow-soft, non-sticky, and visibly fuller.",
    shades: [
      { name: "Clear Diamond", hex: "#F3EFF7" },
      { name: "Pink Frosting", hex: "#FCA1BC" },
      { name: "Berry Sparkle", hex: "#A83861" }
    ],
    features: ["Instant Plumping Effect", "Non-Sticky Glaze Formula", "Deep Nourishing Oils", "High Mirror Shine"]
  },
  {
    id: "ally-10",
    name: "Petal Soft Velvet Powder Blush Trio",
    category: "face",
    price: 1750,
    originalPrice: 2300,
    discount: "23% OFF",
    rating: 4.8,
    reviewsCount: 68,
    isBestSeller: false,
    isNew: false,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description: "Three harmonious blush shades in matte and luminous finishes to sculpt, warm, and add a youthful flush to cheeks.",
    shades: [
      { name: "Sweet Coral", hex: "#F08080" },
      { name: "Berry Blossom", hex: "#C05280" },
      { name: "Peachy Sunset", hex: "#FF8C69" }
    ],
    features: ["Buildable Color Intensity", "Silky Micronized Powder", "Soft Focus Blurring", "Long Wearing"]
  },
  {
    id: "ally-11",
    name: "Precision Waterproof Gel Eyeliner Pen",
    category: "eyes",
    price: 950,
    originalPrice: 1300,
    discount: "26% OFF",
    rating: 4.9,
    reviewsCount: 114,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-fine 0.1mm flexible brush tip for razor-sharp wings and tightlining. Quick-drying waterproof jet black ink that doesn't smudge.",
    shades: [
      { name: "Midnight Black", hex: "#000000" },
      { name: "Chocolate Matte", hex: "#4A2E18" }
    ],
    features: ["0.1mm Ultra Fine Tip", "24H Waterproof & Sweatproof", "Fade-Proof Ink Flow", "Quick 3-Sec Dry"]
  },
  {
    id: "ally-12",
    name: "Hydra-Mist Rose Glow Setting Spray",
    category: "skincare",
    price: 1550,
    originalPrice: 2000,
    discount: "22% OFF",
    rating: 4.8,
    reviewsCount: 78,
    isBestSeller: false,
    isNew: true,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1608248597359-bb5835697672?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-fine micro-mist with Organic Rose Water, Niacinamide, and Aloe Vera. Melts powder into skin and sets makeup for up to 16 hours.",
    shades: [
      { name: "Dewy Rose (120ml)", hex: "#F3A9BB" }
    ],
    features: ["Continuous Micro-Mist Spray", "16H Makeup Lock", "Refreshes & Hydrates", "Anti-Pollution Shield"]
  },
  {
    id: "ally-13",
    name: "Bridal Glam All-In-One Makeup Master Kit",
    category: "brushes-kits",
    price: 7999,
    originalPrice: 11500,
    discount: "30% OFF",
    rating: 5.0,
    reviewsCount: 312,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description: "The complete luxury bridal & party makeup box: 18-Shade Palette, Foundation, 2 Liquid Lipsticks, Mascara, Highlighter, Brush Set, and Aylle Beauty Sponge.",
    shades: [
      { name: "Deluxe Bridal Box", hex: "#7B1FA2" }
    ],
    features: ["Complete 7-Piece Full Size Kit", "Save 30% on Bundle", "Free Luxury Gift Box", "Guaranteed 100% Authentic"]
  },
  {
    id: "ally-14",
    name: "Melt & Glow Cleansing Balm & Makeup Remover",
    category: "skincare",
    price: 1850,
    originalPrice: 2400,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 89,
    isBestSeller: false,
    isNew: true,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    description: "Sherbet-like cleansing balm transforms into silky oil, effortlessly melting away waterproof mascara, foundation, and sunscreen without stripping skin moisture.",
    shades: [
      { name: "Lavender & Chamomile (100g)", hex: "#9575CD" }
    ],
    features: ["Melts Stubborn Waterproof Makeup", "Leaves Skin Nourished & Soft", "No Greasy Residue", "Free of Mineral Oils"]
  },
  {
    id: "ally-15",
    name: "Sculpt & Tame 36H Micro Brow Pomade & Spoolie",
    category: "eyes",
    price: 1150,
    originalPrice: 1500,
    discount: "23% OFF",
    rating: 4.8,
    reviewsCount: 104,
    isBestSeller: false,
    isNew: false,
    isFlashSale: false,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description: "Creamy, smudge-free formula creates hair-like strokes to define, fill, and lock brows in place with a natural laminated finish.",
    shades: [
      { name: "Dark Brown", hex: "#3A2618" },
      { name: "Medium Brown", hex: "#5C3E26" },
      { name: "Soft Charcoal", hex: "#2B2B2B" }
    ],
    features: ["Dual-Ended with Angled Brush", "Waterproof 36H Hold", "Buildable Natural Definition", "No Flaking or Smudge"]
  },
  {
    id: "ally-16",
    name: "Rose Gold Velvet Shimmer Body & Hair Mist",
    category: "perfumes",
    price: 2150,
    originalPrice: 2800,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 135,
    isBestSeller: false,
    isNew: true,
    isFlashSale: true,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    description: "Infused with fine diamond shimmer dust and intoxicating notes of Turkish Rose, Vanilla Bean, and Warm Cashmere. Leaves skin radiant and smelling divine.",
    shades: [
      { name: "Rose Gold Shimmer (150ml)", hex: "#B76E79" }
    ],
    features: ["Diamond Shimmer Glow", "12+ Hour Fragrance", "Non-Sticky Moisturizing Mist", "For Body & Hair"]
  }
];

// Promotional Coupons
const PROMO_COUPONS = {
  "ALLY10": { discountPercent: 10, minOrder: 1000, description: "10% Off on orders above Rs. 1000" },
  "WELCOME15": { discountPercent: 15, minOrder: 2500, description: "15% Welcome Discount for New Customers" },
  "GLAM20": { discountPercent: 20, minOrder: 5000, description: "20% Super Glam discount on bulk orders" }
};

// Customer Reviews Data
const TESTIMONIALS_DATA = [
  {
    name: "Ayesha Malik",
    city: "Lahore",
    rating: 5,
    date: "2 days ago",
    comment: "Aylle Shop ki Velvet Matte Lipstick and Sunset palette bohot zabardast hain! 100% original cosmetics, packaging bohat classy thi aur delivery 2 din me mil gayi.",
    product: "Velvet Matte Liquid Lipstick"
  },
  {
    name: "Fatima Noor",
    city: "Karachi",
    rating: 5,
    date: "5 days ago",
    comment: "WhatsApp par order kiya tha, WhatsApp number 03148604291 par direct confirmation mili. 24K Gold Primer is magic on skin! Highly recommended store.",
    product: "24K Gold Radiant Primer"
  },
  {
    name: "Zainab Khan",
    city: "Islamabad",
    rating: 5,
    date: "1 week ago",
    comment: "Bridal Master Kit meri sister ki wedding ke liye mangwai thi. Sub products premium quality hain, foundation and brushes are top notch!",
    product: "Bridal Glam All-In-One Kit"
  },
  {
    name: "Mariam Tariq",
    city: "Faisalabad",
    rating: 5,
    date: "2 weeks ago",
    comment: "Aylle Eau de Parfum fragrance is so long lasting! Pure original fragrance and fast cash on delivery. Will definitely buy again.",
    product: "Aylle Signature Eau De Parfum"
  }
];

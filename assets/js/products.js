// Aylle Shop - Products Catalog Database
const PRODUCTS_DATA = [
  {
    id: "aylle-01",
    name: "Black Floral Handchain",
    category: "jewelry",
    price: 650,
    originalPrice: 850,
    discount: "24% OFF",
    rating: 4.9,
    reviewsCount: 88,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/black-floral-handchain-clean.png",
    secondaryImage: "assets/images/black-floral-handchain.png",
    description: "Elegant gold-tone delicate handchain bracelet featuring exquisite black floral charm embellishments and an attached finger ring chain. Lightweight, anti-tarnish, and gives a royal graceful touch to any outfit or occasion.",
    shades: [
      { name: "Black Floral & Gold", hex: "#1A1A1A" }
    ],
    features: [
      "Delicate Black Floral Charms",
      "Premium Gold Plating",
      "Adjustable Wrist & Ring Chain",
      "Anti-Tarnish Long Lasting Luster"
    ]
  },
  {
    id: "aylle-02",
    name: "Premium Quality Stainless Steel Handcuff",
    category: "jewelry",
    price: 450,
    originalPrice: 650,
    discount: "30% OFF",
    rating: 4.8,
    reviewsCount: 112,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "assets/images/stainless-steel-handcuff-clean.png",
    secondaryImage: "assets/images/stainless-steel-handcuff.png",
    description: "Statement luxury open handcuff bracelet with intricate organic coral/branch cut-out filigree. Crafted from premium-grade stainless steel with a rich gleaming gold finish that won't fade or rust.",
    shades: [
      { name: "Luxe Gold", hex: "#D4AF37" }
    ],
    features: [
      "100% Stainless Steel Quality",
      "Rust & Water Resistant",
      "Adjustable Open Cuff Fit",
      "Statement Coral Branch Design"
    ]
  },
  {
    id: "aylle-03",
    name: "Luxury Handmade Press-On Nails",
    category: "pressons",
    price: 550,
    originalPrice: 800,
    discount: "31% OFF",
    rating: 5.0,
    reviewsCount: 95,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/luxury-handmade-pressons-clean.png",
    secondaryImage: "assets/images/luxury-handmade-pressons.png",
    description: "Handcrafted luxury salon-grade press-on nails in royal wine red / maroon. Decorated with 3D blooming white flower artwork, genuine mini faux pearls, shimmering rhinestones, and French tip accents. Reusable & durable.",
    shades: [
      { name: "Royal Floral Maroon Set", hex: "#5E0E1B" }
    ],
    features: [
      "100% Handmade Luxury Nail Art",
      "3D Pearls & Floral Jewels",
      "Reusable with Proper Care",
      "Includes Application Kit"
    ]
  },
  {
    id: "aylle-04",
    name: "Wine Red Cat Eye Square Nails (With Application Kit)",
    category: "pressons",
    price: 350,
    originalPrice: 500,
    discount: "30% OFF",
    rating: 4.9,
    reviewsCount: 146,
    isBestSeller: true,
    isNew: false,
    isFlashSale: true,
    image: "assets/images/wine-red-cateye-nails-clean.png",
    secondaryImage: "assets/images/wine-red-cateye-nails.png",
    description: "Deep glossy wine-red magnetic cat-eye press-on nails with sleek square shape. Features mesmerizing velvet cat-eye light reflection. Comes complete with full application kit (adhesive tabs, nail file & prep pad).",
    shades: [
      { name: "Wine Red Cat Eye Set", hex: "#670318" }
    ],
    features: [
      "Glossy Magnetic Cat-Eye Glow",
      "Full Application Kit Included",
      "Instant 5-Minute Salon Nails",
      "Comfortable Short Square Fit"
    ]
  },
  {
    id: "aylle-05",
    name: "Miss Rose Peel Off Nail Polish (Pack of 12)",
    category: "nail-paints",
    price: 899,
    originalPrice: 1350,
    discount: "33% OFF",
    rating: 4.9,
    reviewsCount: 230,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/pack-12-nail-paints-clean.png",
    secondaryImage: "assets/images/pack-12-nail-paints.png",
    description: "Value pack of 12 authentic Miss Rose peel-off nail polishes in vibrant everyday and party shades (shimmer blues, metallic copper, rich burgundy, ruby pink, emerald & neutral nudes). Odorless, quick-drying, and peels off effortlessly without acetone.",
    shades: [
      { name: "12 Mixed Color Pack", hex: "#B83253" }
    ],
    features: [
      "Pack of 12 Assorted Shades",
      "Easy Peel-Off Formulation",
      "No Acetone / Remover Needed",
      "Quick Dry & High Gloss Finish"
    ]
  }
];

// Promotional Coupons
const PROMO_COUPONS = {
  "AYLLE10": { discountPercent: 10, minOrder: 500, description: "10% Off on orders above Rs. 500" },
  "ALLY10": { discountPercent: 10, minOrder: 500, description: "10% Off on orders above Rs. 500" },
  "WELCOME15": { discountPercent: 15, minOrder: 1000, description: "15% Welcome Discount for New Customers" },
  "GLAM20": { discountPercent: 20, minOrder: 2000, description: "20% Super Glam discount on bundle orders" }
};

// Customer Reviews Data
const TESTIMONIALS_DATA = [
  {
    name: "Ayesha Malik",
    city: "Lahore",
    rating: 5,
    date: "2 days ago",
    comment: "Black Floral Handchain bohot khoobsurat ha! Same jesa picture me tha wesa hi aya. Finishing bohot pyari hai aur delivery sirf 2 din me mil gayi.",
    product: "Black Floral Handchain"
  },
  {
    name: "Fatima Noor",
    city: "Karachi",
    rating: 5,
    date: "4 days ago",
    comment: "Luxury handmade pressons meri wedding function k liye perfect rahe! 3D flowers aur pearls ki quality top notch ha. Highly recommended!",
    product: "Luxury Handmade Press-On Nails"
  },
  {
    name: "Zainab Khan",
    city: "Islamabad",
    rating: 5,
    date: "1 week ago",
    comment: "Stainless steel handcuff ka design bohot unique aur classy ha. Gold polish bohat bright hai aur bilkul tarnish nahi hota.",
    product: "Premium Quality Stainless Steel Handcuff"
  },
  {
    name: "Mariam Tariq",
    city: "Faisalabad",
    rating: 5,
    date: "2 weeks ago",
    comment: "Miss Rose 12 nail paints pack bohot affordable aur best deal hai! Peel off formula bohot easy ha lagana aur utarna.",
    product: "Miss Rose Peel Off Nail Polish (Pack of 12)"
  }
];

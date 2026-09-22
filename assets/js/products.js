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
    isNew: false,
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
    isNew: false,
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
    isNew: false,
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
  },
  {
    id: "aylle-06",
    name: "Silver Butterfly Crystal Stud Earrings",
    category: "jewelry",
    price: 150,
    originalPrice: 250,
    discount: "40% OFF",
    rating: 4.8,
    reviewsCount: 76,
    isBestSeller: false,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/silver-butterfly-earrings-clean.png",
    secondaryImage: "assets/images/silver-butterfly-earrings.png",
    description: "Dainty Hansweet silver-tone butterfly stud earrings encrusted with sparkling faceted crystal stones. Lightweight, hypoallergenic, and perfect for everyday elegance or festive wear.",
    shades: [
      { name: "Silver Crystal", hex: "#C0C0C0" }
    ],
    features: [
      "Sparkling Crystal Embellishments",
      "Lightweight & Comfortable",
      "Hypoallergenic Earring Posts",
      "Delicate Butterfly Silhouette"
    ]
  },
  {
    id: "aylle-07",
    name: "Silver Bow Ribbon Metallic Stud Earrings",
    category: "jewelry",
    price: 250,
    originalPrice: 400,
    discount: "37% OFF",
    rating: 4.9,
    reviewsCount: 84,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/silver-bow-earrings-clean.png",
    secondaryImage: "assets/images/silver-bow-and-blossom.png",
    description: "Trendy JBG silver metallic ribbon bow stud earrings featuring textured reflective chrome finish. Eye-catching chic aesthetic that elevates any casual or formal outfit.",
    shades: [
      { name: "Metallic Chrome Silver", hex: "#E0E0E0" }
    ],
    features: [
      "High-Shine Chrome Metallic Finish",
      "Textured Ribbon Bow Design",
      "Lightweight & Secure Fit",
      "Coquette Aesthetic Trend"
    ]
  },
  {
    id: "aylle-08",
    name: "Blossom Minimal & Pretty 3-Pair Earring Set",
    category: "jewelry",
    price: 299,
    originalPrice: 450,
    discount: "33% OFF",
    rating: 5.0,
    reviewsCount: 118,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/blossom-earrings-set-clean.png",
    secondaryImage: "assets/images/silver-bow-and-blossom.png",
    description: "3-in-1 combo card featuring 3 gorgeous pairs of earrings: classic faux pearl studs, sparkling crystal solitaire studs, and pearl wreath bow drop earrings. Incredible value pack for multiple styling options.",
    shades: [
      { name: "3-Pair Combo Set", hex: "#F5F5F5" }
    ],
    features: [
      "Includes 3 Gorgeous Pairs",
      "Classic Pearl + Solitaire + Wreath Bow",
      "Mix & Match Everyday Styling",
      "Great Gift Item"
    ]
  },
  {
    id: "aylle-09",
    name: "Customized Reseller Deal (21 Products Mega Bundle)",
    category: "deals",
    price: 2800,
    originalPrice: 4200,
    discount: "33% OFF",
    rating: 5.0,
    reviewsCount: 310,
    isBestSeller: true,
    isNew: true,
    isFlashSale: true,
    image: "assets/images/customized-reseller-deal-clean.png",
    secondaryImage: "assets/images/customized-reseller-deal.png",
    description: "Mega 21-in-1 complete beauty & cosmetics bundle: includes liquid lipsticks, lip glosses, lip liners, eyebrow pencil, Creamy Cheeks blush, Fit Me compact powder, foundation tube, capsule mascara, glitter liner, Kuromi character gloss, highlighter pot, and more! Unbeatable bulk reseller deal.",
    shades: [
      { name: "21-Product Full Deal", hex: "#C71585" }
    ],
    features: [
      "Complete 21-Piece Makeup Kit",
      "Huge Reseller Value Bundle",
      "Lipsticks, Mascara, Blush & Liners",
      "Massive Savings Deal"
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
    comment: "Silver Bow earrings and Blossom 3-pair set bohot cute hain! Quality bohat achi hai aur price bhi reasonable hai.",
    product: "Silver Bow & Blossom Earring Set"
  },
  {
    name: "Hina Riaz",
    city: "Rawalpindi",
    rating: 5,
    date: "3 days ago",
    comment: "Customized 21 products deal mangwai thi, pure Rs. 2800 me itna sara makeup mil gaya! Saari items 100% original aur zabardast hain.",
    product: "Customized Reseller Deal (21 Products)"
  }
];

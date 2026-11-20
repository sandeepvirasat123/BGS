/* =========================================================
   BGS Industrial Solution — product catalogue
   Single source of truth. Content taken from the
   STICKOVA catalog. Edit here and every page updates.
   ========================================================= */

window.BGS = window.BGS || {};

BGS.contact = {
  phone: "+91-8054004498",
  phoneHref: "tel:+918054004498",
  whatsapp: "918054004498",
  email: "info@bgsindustrialsolutions.com",
  web: "www.bgsindustrialsolution.com",
};

BGS.categories = [
  {
    id: "tile",
    name: "Tile Adhesives & Grout",
    short: "Tile Adhesives",
    blurb:
      "Polymer-modified, cement-based adhesives and grout for tiles, vitrified slabs and natural stone — indoors, outdoors, dry or wet.",
  },
  {
    id: "rubber",
    name: "Synthetic Rubber Adhesives",
    short: "Rubber Adhesives",
    blurb:
      "High-strength, fast-drying FR rubber adhesives for bus bodies, seating, mattresses and foam — by brush, spray gun or both.",
  },
  {
    id: "wood",
    name: "White / Water-Based Adhesives",
    short: "Wood Adhesives",
    blurb:
      "Versatile synthetic adhesives for laminates, plywood, veneer and furniture — from DIY jobs to professional carpentry.",
  },
];

BGS.products = [
  /* ---------------- Tile adhesives ---------------- */
  {
    id: "pearl",
    name: "StickoStrong Pearl",
    line: "StickoStrong",
    category: "tile",
    tagline: "Grey polymer-modified tile adhesive",
    accent: "#E9A800",
    media: { type: "img", src: "assets/img/pearl.webp" },
    description:
      "STICKOSTRONG PEARL is a grey, high polymer modified, cement based tile adhesive suitable for fixing tiles, natural stones and vitrified tiles in interior and exterior situations.",
    applications: ["New flooring only", "Interiors", "Dry & wet areas", "Parking areas"],
    highlights: ["C1T · Type 1", "Floor pasting", "Grey, high polymer modified", "Vitrified & natural stone"],
    shelfLife: "12 months from the date of manufacturing in unopened condition. Store in a cool and dry place.",
    packaging: ["20 KG"],
    tags: ["floor", "stone", "vitrified", "parking", "wet", "interior"],
  },
  {
    id: "amber",
    name: "StickoStrong Amber",
    line: "StickoStrong",
    category: "tile",
    tagline: "High-bond adhesive for ceramic tiles on floors & walls",
    accent: "#F28C1B",
    media: { type: "img", src: "assets/img/amber.webp" },
    description:
      "STICKOSTRONG AMBER is a high bond tile adhesive from our Domestic Range, made for pasting ceramic tiles on floors and walls. It is easy to use, long lasting and high strength, and is classified C1T (Type 1).",
    applications: ["Ceramic tiles", "Floors", "Walls", "Interior & exterior"],
    highlights: ["C1T · Type 1", "Domestic range", "Floor & wall pasting", "Easy to use · High strength"],
    shelfLife: "12 months from the date of manufacturing in unopened condition. Store in a cool and dry place.",
    packaging: ["20 KG"],
    tags: ["ceramic", "floor", "wall", "interior", "exterior", "domestic"],
  },
  {
    id: "ruby",
    name: "StickoStrong Ruby",
    line: "StickoStrong",
    category: "tile",
    tagline: "Wall & floor adhesive — pools and tile-on-tile",
    accent: "#D7263D",
    media: { type: "img", src: "assets/img/ruby.webp" },
    description:
      "STICKOSTRONG RUBY is a high polymer modified, cement based wall and floor tile adhesive, suitable for fixing tiles and natural stones in interior and exterior situations, including swimming pools, and for fixing tiles on tile.",
    applications: [
      "Floors",
      "Walls up to 2ft × 2ft",
      "2ft × 4ft till 15ft",
      "Interiors",
      "Exteriors",
      "Dry & wet areas",
    ],
    highlights: ["C2T · Type 2", "Wall pasting", "Swimming pools", "Tile-on-tile"],
    shelfLife: "12 months from the date of manufacturing in unopened condition. Store in a cool and dry place.",
    packaging: ["20 KG"],
    tags: ["floor", "wall", "large", "stone", "pool", "tile-on-tile", "wet", "exterior", "interior"],
  },
  {
    id: "sapphire",
    name: "StickoStrong Sapphire",
    line: "StickoStrong",
    category: "tile",
    tagline: "Premium white adhesive — water & frost resistant",
    accent: "#1C7ED6",
    media: { type: "img", src: "assets/img/sapphire.webp" },
    description:
      "STICKOSTRONG SAPPHIRE is a premium white, water and frost resistant, high polymer modified cementitious wall and floor tile adhesive, specially formulated for fixing mosaic tiles, ceramic and glass mosaic. It is also suitable for ceramic and vitrified wall and floor tiles, metal or glass tiles, marble, granite, quartz stone, terrazzo and other natural stone in interior and exterior locations — including swimming pools, tile-on-tile and stone.",
    applications: [
      "Floors",
      "Walls up to 2ft × 2ft",
      "2ft × 4ft till 15ft",
      "Interiors",
      "Exteriors",
      "Dry & wet areas",
    ],
    highlights: ["C2TE · Type 3", "Marble & granite pasting", "White — ideal for glass mosaic", "Water & frost resistant"],
    shelfLife: "12 months from the date of manufacturing in unopened condition. Store in a cool and dry place.",
    packaging: ["20 KG"],
    tags: ["floor", "wall", "large", "mosaic", "glass", "stone", "pool", "tile-on-tile", "wet", "exterior", "interior"],
    featured: true,
  },
  {
    id: "tile-grout",
    name: "StickoStrong Tile Grout",
    line: "StickoStrong",
    category: "tile",
    tagline: "Fine, water-resistant polymer grout",
    accent: "#138A80",
    media: { type: "img", src: "assets/img/tile-grout.webp", light: true },
    description:
      "STICKOSTRONG TILE GROUT is a high quality, fine, polymer modified, water-resistant, cement based powder grout designed for grouting glazed wall tiles, mosaics, vitrified and fully vitrified tiles, floor tiles and industrial floor tiles. Where chemical resistance, hygiene and sterility are important, use an epoxy grout.",
    applications: ["Walls", "Floors", "Interiors & exteriors", "Dry areas", "Work tops"],
    highlights: ["Fine, smooth finish", "Water resistant", "Mosaic to industrial floors"],
    shelfLife: "12 months from the date of manufacturing in unopened condition. Store in a cool and dry place.",
    packaging: ["1 KG pouch"],
    tags: ["grout", "floor", "wall", "mosaic", "worktop", "interior", "exterior"],
  },

  /* ---------------- Synthetic rubber adhesives ---------------- */
  {
    id: "sr-1386",
    name: "StickoBond SR 1386",
    line: "StickoBond",
    category: "rubber",
    tagline: "High-strength spray-grade rubber adhesive",
    accent: "#1C7ED6",
    media: { type: "tin", src: "assets/img/tin.webp", code: "SR 1386" },
    description:
      "STICKOBOND SR 1386 is a high-strength synthetic rubber adhesive. It is applied with a spray gun only, and is primarily used where a strong bond is needed.",
    applications: ["Bus body", "Seats", "Mattress", "Other material"],
    highlights: ["Spray gun application", "High-strength bond", "Synthetic rubber"],
    method: ["Spray"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["25 KG"],
    tags: ["bus", "seat", "mattress", "spray"],
  },
  {
    id: "sp-1411-b",
    name: "StickoBond SP 1411 B",
    line: "StickoBond",
    category: "rubber",
    tagline: "Hybrid FR adhesive — brush or spray",
    accent: "#1C7ED6",
    media: { type: "tin", src: "assets/img/tin.webp", code: "SP 1411 B", fr: true },
    description:
      "STICKOBOND SP 1411 B is a high-strength, fast drying synthetic rubber FR adhesive. It is hybrid in nature — it can be applied by brush or spray gun — and is primarily used where a strong bond is needed.",
    applications: ["Bus body", "Seats", "Mattress", "Foam to foam", "Other material"],
    highlights: ["Fire retardant (FR)", "Brush + spray hybrid", "Fast drying"],
    method: ["Brush", "Spray"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["25 KG"],
    tags: ["bus", "seat", "mattress", "foam", "fr", "brush", "spray"],
    featured: true,
  },
  {
    id: "sp-1415-h",
    name: "StickoBond SP 1415 H",
    line: "StickoBond",
    category: "rubber",
    tagline: "Hybrid FR adhesive for heavy-duty bonds",
    accent: "#1C7ED6",
    media: { type: "tin", src: "assets/img/tin.webp", code: "SP 1415 H", fr: true },
    description:
      "STICKOBOND SP 1415 H is a high-strength, fast drying synthetic rubber FR adhesive. It is hybrid in nature — it can be applied by brush or spray gun — and is primarily used where a strong bond is needed.",
    applications: ["Bus body", "Seats", "Mattress", "Other material"],
    highlights: ["Fire retardant (FR)", "Brush + spray hybrid", "Fast drying"],
    method: ["Brush", "Spray"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["25 KG"],
    tags: ["bus", "seat", "mattress", "fr", "brush", "spray"],
  },
  {
    id: "sr-1430",
    name: "StickoBond SR 1430",
    line: "StickoBond",
    category: "rubber",
    tagline: "Brush-grade FR adhesive for foam",
    accent: "#1C7ED6",
    media: { type: "tin", src: "assets/img/tin.webp", code: "SR 1430", fr: true },
    description:
      "STICKOBOND SR 1430 is a high-strength, fast drying synthetic rubber FR adhesive. It is applied by brush and is primarily used where a strong bond is needed.",
    applications: ["Bus body", "Seats", "Mattress", "Foam to foam", "Other material"],
    highlights: ["Fire retardant (FR)", "Brush application", "Fast drying"],
    method: ["Brush"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["25 KG"],
    tags: ["bus", "seat", "mattress", "foam", "fr", "brush"],
  },

  /* ---------------- White / water-based adhesives ---------------- */
  {
    id: "ezee",
    name: "StickoBond Ezee",
    line: "StickoBond",
    category: "wood",
    tagline: "All-round adhesive for laminates & veneer",
    accent: "#1C7ED6",
    media: { type: "bucket", src: "assets/img/drum.webp", code: "EZEE" },
    description:
      "STICKOBOND EZEE is a high-performance adhesive that is perfect for bonding laminates, furniture, veneer and many other materials. It is a versatile adhesive for a wide range of applications, from DIY projects to professional carpentry and furniture making.",
    applications: ["Laminates", "Wood", "Plywood", "Other material"],
    highlights: ["Laminates & veneer", "DIY to professional", "Versatile"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["50 KG", "20 KG", "5 KG", "1 KG"],
    tags: ["laminate", "wood", "plywood", "veneer", "furniture"],
  },
  {
    id: "super",
    name: "StickoBond Super",
    line: "StickoBond",
    category: "wood",
    tagline: "High-strength, fast-drying wood adhesive",
    accent: "#1C7ED6",
    media: { type: "bucket", src: "assets/img/drum.webp", code: "SUPER" },
    description:
      "STICKOBOND SUPER is a high-strength, fast drying synthetic adhesive, primarily used for bonding wood, plywood, laminates and other materials.",
    applications: ["Laminates", "Wood", "Plywood", "Other material"],
    highlights: ["High strength", "Fast drying", "Wood & plywood"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["50 KG", "20 KG", "5 KG", "1 KG"],
    tags: ["laminate", "wood", "plywood"],
  },
  {
    id: "super-plus",
    name: "StickoBond Super Plus",
    line: "StickoBond",
    category: "wood",
    tagline: "Pro-grade adhesive for furniture making",
    accent: "#1C7ED6",
    media: { type: "bucket", src: "assets/img/drum.webp", code: "SUPER PLUS" },
    description:
      "STICKOBOND SUPER PLUS is a high-strength, fast drying synthetic adhesive, primarily used for bonding wood, plywood, laminates and other materials — built for furniture making and carpentry.",
    applications: ["Laminates", "Wood", "Plywood", "Furniture making", "Carpentry", "Other material"],
    highlights: ["Furniture & carpentry", "High strength", "Fast drying"],
    shelfLife: "6 – 12 months from the date of manufacturing.",
    packaging: ["50 KG", "20 KG", "5 KG", "1 KG"],
    tags: ["laminate", "wood", "plywood", "veneer", "furniture"],
    featured: true,
  },
];

/* Product-finder questions: each option maps to product tags */
BGS.finder = [
  { id: "floor", label: "Floor tiles", group: "tile" },
  { id: "wall", label: "Wall tiles", group: "tile" },
  { id: "large", label: "Large format (2×4 ft)", group: "tile" },
  { id: "mosaic", label: "Mosaic / glass tiles", group: "tile" },
  { id: "stone", label: "Marble, granite & stone", group: "tile" },
  { id: "pool", label: "Swimming pools", group: "tile" },
  { id: "tile-on-tile", label: "Tile over old tile", group: "tile" },
  { id: "grout", label: "Filling tile joints", group: "tile" },
  { id: "bus", label: "Bus body & seats", group: "rubber" },
  { id: "foam", label: "Foam to foam / mattress", group: "rubber" },
  { id: "laminate", label: "Laminates & plywood", group: "wood" },
  { id: "furniture", label: "Furniture & carpentry", group: "wood" },
];

/* Tile adhesive calculator — indicative consumption by notch-trowel size.
   These are typical industry figures, NOT values from the catalog: confirm
   with the technical team and edit here if you have tested Stickova numbers. */
BGS.calculator = {
  bagKg: 20,
  trowels: [
    { id: "6", label: "6 mm notch", hint: "Small wall tiles, smooth walls", kgPerM2: 3.5 },
    { id: "8", label: "8 mm notch", hint: "Standard floor & wall tiles", kgPerM2: 4.5 },
    { id: "10", label: "10 mm notch", hint: "Large-format & vitrified tiles", kgPerM2: 5.5 },
    { id: "12", label: "12 mm notch", hint: "Natural stone, uneven surfaces", kgPerM2: 7 },
  ],
  wastage: [5, 10, 15],
};

/* FAQs — answers drawn from the catalog */
BGS.faq = [
  {
    q: "Which tile adhesive should I use for a swimming pool?",
    a: 'Use <a href="products.html#sapphire">StickoStrong Sapphire</a> or <strong>StickoStrong Topaz</strong>. Both are suitable for swimming pools. Sapphire is a premium white, water- and frost-resistant adhesive, ideal for glass and ceramic mosaic.',
  },
  {
    q: "Can I fix new tiles directly over existing tiles?",
    a: 'Yes. <a href="products.html#ruby">StickoStrong Ruby</a>, <a href="products.html#sapphire">StickoStrong Sapphire</a> and <strong>StickoStrong Topaz</strong> are all suitable for fixing tile-on-tile. Sapphire is also suitable for tile-on-stone.',
  },
  {
    q: "Which adhesive is best for marble, granite or glass mosaic?",
    a: 'Use <a href="products.html#sapphire">StickoStrong Sapphire</a> or <strong>StickoStrong Topaz</strong>. Sapphire is formulated for mosaic, glass mosaic, metal or glass tiles, marble, granite, quartz stone, terrazzo and other natural stone, in interior and exterior locations.',
  },
  {
    q: "Which adhesive should I use for ceramic tiles at home?",
    a: 'Use <a href="products.html#amber">StickoStrong Amber</a>. It is a high-bond C1T (Type 1) tile adhesive from our Domestic Range, made for pasting ceramic tiles on floors and walls. It is easy to use, long lasting and high strength.',
  },
  {
    q: "Which adhesive should I use for vitrified tiles on a new floor or a parking area?",
    a: 'Use <a href="products.html#pearl">StickoStrong Pearl</a>. It is a grey, high polymer modified, cement based adhesive for fixing tiles, natural stone and vitrified tiles on new flooring, in dry and wet areas, and in parking areas.',
  },
  {
    q: "When should I use an epoxy grout instead of Tile Grout?",
    a: "StickoStrong Tile Grout is a fine, polymer-modified, water-resistant cement grout for walls, floors, mosaics and vitrified tiles. Where chemical resistance, hygiene and sterility are important, use an epoxy grout.",
  },
  {
    q: "What does “FR” mean on StickoBond rubber adhesives?",
    a: "FR stands for fire retardant. StickoBond SP 1411 B, SP 1415 H and SR 1430 are high-strength, fast-drying synthetic rubber FR adhesives, used for bus bodies, seats, mattresses and foam.",
  },
  {
    q: "Brush or spray gun — which StickoBond grade do I need?",
    a: "SR 1386 is applied with a spray gun only. SP 1411 B and SP 1415 H are hybrid, so you can use either a brush or a spray gun. SR 1430 is applied by brush.",
  },
  {
    q: "What pack sizes and shelf life do your products have?",
    a: "Tile adhesives come in 20 KG packs with a 12-month shelf life (unopened, stored cool and dry). Synthetic rubber adhesives come in 25 KG tins, and white adhesives in 50, 20, 5 and 1 KG packs. Both have a 6–12 month shelf life from manufacture.",
  },
  {
    q: "How do I become a dealer or distributor?",
    a: 'We partner with dealers, distributors, contractors, applicators, builders and architects. Apply on our <a href="partner.html">Partner With Us</a> page or call +91-8054004498.',
  },
];

import { Product, Collection, Customer, B2BCompany } from '../types/shopify';

export const HERO_IMAGE = '/src/assets/images/hero_scandinavian_modern_1793240687528.jpg';
export const CHAIR_IMAGE = '/src/assets/images/product_lounge_chair_1793240702125.jpg';
export const PENDANT_IMAGE = '/src/assets/images/product_brass_pendant_1793240702509.jpg';
export const CERAMIC_IMAGE = '/src/assets/images/product_ceramic_vessel_1793240703607.jpg';
export const SPEAKER_IMAGE = '/src/assets/images/product_audio_speaker_1793240702841.jpg';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'gid://shopify/Collection/101',
    handle: 'minimalist-living',
    title: 'Living & Seating',
    description: 'Architectural lounge chairs, tactile bouclé textiles, and handcrafted oak structures designed for contemplative spaces.',
    image: {
      url: CHAIR_IMAGE,
      altText: 'Minimalist living furniture collection',
    },
    productsCount: 4,
  },
  {
    id: 'gid://shopify/Collection/102',
    handle: 'lighting-fixtures',
    title: 'Luminaires & Ambient',
    description: 'Sculptural brushed brass and hand-blown opal glass fixtures creating soft diffused illumination.',
    image: {
      url: PENDANT_IMAGE,
      altText: 'Architectural lighting fixtures',
    },
    productsCount: 3,
  },
  {
    id: 'gid://shopify/Collection/103',
    handle: 'ceramics-accents',
    title: 'Ceramics & Accents',
    description: 'Fluted stoneware and hand-thrown vessels crafted with organic raw sandstone and matte bone glaze.',
    image: {
      url: CERAMIC_IMAGE,
      altText: 'Artisanal ceramics and vessels',
    },
    productsCount: 4,
  },
  {
    id: 'gid://shopify/Collection/104',
    handle: 'architectural-audio',
    title: 'Acoustics & Technology',
    description: 'Precision-machined anodized aluminum and solid smoked walnut high-fidelity sound systems.',
    image: {
      url: SPEAKER_IMAGE,
      altText: 'Minimalist acoustic speaker hardware',
    },
    productsCount: 2,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/89201',
    handle: 'viggo-boucle-lounge-chair',
    title: 'Viggo Bouclé Lounge Chair',
    description: 'An architectural study in calm proportions. Crafted with FSC-certified solid white oak joinery and upholstered in heavyweight Danish wool bouclé. Generously deep seat profile angled for hours of ergonomic reading and relaxation.',
    vendor: 'Studio Aethel',
    productType: 'Seating',
    tags: ['Furniture', 'Lounge', 'Oak', 'Living Room', 'Featured'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '1280.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '1420.00', currencyCode: 'USD' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '1450.00', currencyCode: 'USD' },
    },
    images: [
      { id: 'img-1', url: CHAIR_IMAGE, altText: 'Viggo Bouclé Lounge Chair in Natural Oak & Off-White Boucle' },
      { id: 'img-1b', url: HERO_IMAGE, altText: 'Viggo Lounge Chair placed in architectural concept gallery' },
    ],
    options: [
      { id: 'opt-wood', name: 'Wood Finish', values: ['Solid White Oak', 'Smoked Walnut'] },
      { id: 'opt-fabric', name: 'Textile', values: ['Natural Cream Bouclé', 'Slate Textured Wool'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/8920101',
        title: 'Solid White Oak / Natural Cream Bouclé',
        availableForSale: true,
        price: { amount: '1280.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '1450.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '960.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Wood Finish', value: 'Solid White Oak' },
          { name: 'Textile', value: 'Natural Cream Bouclé' },
        ],
        quantityAvailable: 14,
        sku: 'AET-VIGGO-OAK-NAT',
        image: { url: CHAIR_IMAGE, altText: 'White Oak Natural Bouclé' },
      },
      {
        id: 'gid://shopify/ProductVariant/8920102',
        title: 'Solid White Oak / Slate Textured Wool',
        availableForSale: true,
        price: { amount: '1320.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '1480.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '990.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Wood Finish', value: 'Solid White Oak' },
          { name: 'Textile', value: 'Slate Textured Wool' },
        ],
        quantityAvailable: 6,
        sku: 'AET-VIGGO-OAK-SLT',
        image: { url: CHAIR_IMAGE, altText: 'White Oak Slate Wool' },
      },
      {
        id: 'gid://shopify/ProductVariant/8920103',
        title: 'Smoked Walnut / Natural Cream Bouclé',
        availableForSale: true,
        price: { amount: '1420.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '1580.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '1065.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Wood Finish', value: 'Smoked Walnut' },
          { name: 'Textile', value: 'Natural Cream Bouclé' },
        ],
        quantityAvailable: 4,
        sku: 'AET-VIGGO-WLN-NAT',
        image: { url: CHAIR_IMAGE, altText: 'Smoked Walnut Natural Boucle' },
      },
    ],
    metafields: {
      material: 'Solid North American White Oak, High-resilience foam core, 85% New Zealand wool bouclé',
      dimensions: 'W 82cm × D 88cm × H 76cm · Seat Height: 41cm',
      origin: 'Handcrafted in Copenhagen, Denmark',
      care: 'Vacuum regularly with soft brush attachment. Professional upholstery cleaning recommended.',
    },
    minOrderQuantityB2B: 2,
  },
  {
    id: 'gid://shopify/Product/89202',
    handle: 'halo-opal-brass-pendant',
    title: 'Halo Opal & Brass Pendant',
    description: 'A luminous sphere suspended within a continuous machined brass ring. Features mouth-blown triplex opal glass for smooth, shadowless illumination. Warm dimming 2700K LED module compatible with standard TRIAC dimmers.',
    vendor: 'Studio Aethel',
    productType: 'Lighting',
    tags: ['Lighting', 'Pendant', 'Brass', 'Ambient', 'Featured'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '420.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '460.00', currencyCode: 'USD' },
    },
    images: [
      { id: 'img-2', url: PENDANT_IMAGE, altText: 'Halo Opal and Brass Pendant Light fixture' },
    ],
    options: [
      { id: 'opt-metal', name: 'Finish', values: ['Brushed Raw Brass', 'Burnished Bronze'] },
      { id: 'opt-cord', name: 'Suspension Drop', values: ['Standard 1.5m', 'Extended 3.0m'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/8920201',
        title: 'Brushed Raw Brass / Standard 1.5m',
        availableForSale: true,
        price: { amount: '420.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '315.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Finish', value: 'Brushed Raw Brass' },
          { name: 'Suspension Drop', value: 'Standard 1.5m' },
        ],
        quantityAvailable: 28,
        sku: 'AET-HALO-BRS-15M',
        image: { url: PENDANT_IMAGE, altText: 'Brushed Raw Brass Pendant' },
      },
      {
        id: 'gid://shopify/ProductVariant/8920202',
        title: 'Burnished Bronze / Standard 1.5m',
        availableForSale: true,
        price: { amount: '460.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '345.00', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Finish', value: 'Burnished Bronze' },
          { name: 'Suspension Drop', value: 'Standard 1.5m' },
        ],
        quantityAvailable: 12,
        sku: 'AET-HALO-BRZ-15M',
        image: { url: PENDANT_IMAGE, altText: 'Burnished Bronze Pendant' },
      },
    ],
    metafields: {
      material: 'Spun Solid Brass with anti-tarnish protective micro-coating, hand-blown triplex glass',
      dimensions: 'Diameter: 34cm · Sphere: 20cm · Canopy: 12cm',
      origin: 'Precision assembled in Milan, Italy',
      care: 'Dust with dry microfiber cloth. Avoid abrasive detergents.',
    },
    minOrderQuantityB2B: 4,
  },
  {
    id: 'gid://shopify/Product/89203',
    handle: 'fluted-sandstone-ceramic-vessels',
    title: 'Fluted Sandstone Ceramic Vessels',
    description: 'Set of two sculpted ceramic vessels wheel-thrown from coarse mineral-rich stoneware clay. The tactile fluted ridges catch side-lighting while the unglazed raw sand exterior contrasts with a waterproof interior glaze.',
    vendor: 'Kanso Ceramics',
    productType: 'Decor',
    tags: ['Ceramics', 'Decor', 'Vases', 'Handmade', 'Featured'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '185.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '185.00', currencyCode: 'USD' },
    },
    images: [
      { id: 'img-3', url: CERAMIC_IMAGE, altText: 'Pair of artisanal fluted ceramic vases on travertine' },
    ],
    options: [
      { id: 'opt-clay', name: 'Glaze Tone', values: ['Bone & Sand Duo', 'Charcoal & Ochre'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/8920301',
        title: 'Bone & Sand Duo',
        availableForSale: true,
        price: { amount: '185.00', currencyCode: 'USD' },
        compareAtPrice: { amount: '210.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '138.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Glaze Tone', value: 'Bone & Sand Duo' }],
        quantityAvailable: 32,
        sku: 'AET-VESSEL-BONE-PAIR',
        image: { url: CERAMIC_IMAGE, altText: 'Bone and Sand Duo Vases' },
      },
    ],
    metafields: {
      material: '100% High-fire stoneware, food and water-safe interior glaze',
      dimensions: 'Tall: H 28cm × Ø 14cm · Broad: H 22cm × Ø 16cm',
      origin: 'Studio thrown in Kyoto, Japan',
      care: 'Hand wash with mild soap. Dry completely before placing on unsealed wood.',
    },
    minOrderQuantityB2B: 6,
  },
  {
    id: 'gid://shopify/Product/89204',
    handle: 'aether-one-wireless-speaker',
    title: 'Aether One Hi-Fi Wireless Speaker',
    description: 'Studio-fidelity active speaker engineered with CNC-milled 5-axis anodized aluminum chassis and an acoustic smoked walnut baffle. Features Wi-Fi AirPlay 2, Spotify Connect, Bluetooth 5.3, and lossless 24-bit/192kHz DAC.',
    vendor: 'Acoustics Lab',
    productType: 'Audio',
    tags: ['Audio', 'Acoustics', 'Hardware', 'Featured'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '640.00', currencyCode: 'USD' },
      maxVariantPrice: { amount: '690.00', currencyCode: 'USD' },
    },
    images: [
      { id: 'img-4', url: SPEAKER_IMAGE, altText: 'Aether One audio speaker with machined aluminum and smoked walnut' },
    ],
    options: [
      { id: 'opt-enclosure', name: 'Enclosure Material', values: ['Space Gray Aluminum & Walnut', 'Matte Black & Ebony'] },
    ],
    variants: [
      {
        id: 'gid://shopify/ProductVariant/8920401',
        title: 'Space Gray Aluminum & Walnut',
        availableForSale: true,
        price: { amount: '640.00', currencyCode: 'USD' },
        b2bWholesalePrice: { amount: '480.00', currencyCode: 'USD' },
        selectedOptions: [{ name: 'Enclosure Material', value: 'Space Gray Aluminum & Walnut' }],
        quantityAvailable: 19,
        sku: 'AET-SPK-SG-WLN',
        image: { url: SPEAKER_IMAGE, altText: 'Space Gray Aluminum & Walnut' },
      },
    ],
    metafields: {
      material: 'Anodized 6061-T6 Aluminum, Solid American Walnut, custom Kevlar woofer, silk dome tweeter',
      dimensions: 'W 18cm × D 16cm × H 26cm · Weight: 4.8kg',
      origin: 'Acoustic calibration in Stockholm, Sweden',
      care: 'Wipe with microfiber. Keep away from direct excessive radiator heat.',
    },
    minOrderQuantityB2B: 2,
  },
];

export const MOCK_CUSTOMER: Customer = {
  id: 'gid://shopify/Customer/771920',
  email: 'chandra.thapa@vinomofo.com',
  firstName: 'Chandra',
  lastName: 'Thapa',
  phone: '+1 (555) 234-8901',
  defaultAddress: {
    id: 'gid://shopify/MailingAddress/901',
    address1: '420 Design Boulevard, Suite 5A',
    city: 'San Francisco',
    province: 'California',
    zip: '94107',
    country: 'United States',
    isDefault: true,
  },
  addresses: [
    {
      id: 'gid://shopify/MailingAddress/901',
      address1: '420 Design Boulevard, Suite 5A',
      city: 'San Francisco',
      province: 'California',
      zip: '94107',
      country: 'United States',
      isDefault: true,
    },
    {
      id: 'gid://shopify/MailingAddress/902',
      address1: '18 Architecture Way',
      city: 'Seattle',
      province: 'Washington',
      zip: '98101',
      country: 'United States',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'gid://shopify/Order/10982',
      orderNumber: '#AET-10982',
      processedAt: '2026-10-18T14:32:00Z',
      financialStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      totalPrice: { amount: '1280.00', currencyCode: 'USD' },
      trackingCompany: 'FedEx Freight Direct',
      trackingNumber: 'FDX-99482019482',
      shippingAddress: {
        id: 'gid://shopify/MailingAddress/901',
        address1: '420 Design Boulevard, Suite 5A',
        city: 'San Francisco',
        province: 'California',
        zip: '94107',
        country: 'United States',
        isDefault: true,
      },
      lineItems: [
        {
          title: 'Viggo Bouclé Lounge Chair',
          variantTitle: 'Solid White Oak / Natural Cream Bouclé',
          quantity: 1,
          price: { amount: '1280.00', currencyCode: 'USD' },
          imageUrl: CHAIR_IMAGE,
        },
      ],
    },
    {
      id: 'gid://shopify/Order/10850',
      orderNumber: '#AET-10850',
      processedAt: '2026-09-24T09:15:00Z',
      financialStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      totalPrice: { amount: '420.00', currencyCode: 'USD' },
      trackingCompany: 'UPS Worldwide',
      trackingNumber: '1Z9999999999999999',
      shippingAddress: {
        id: 'gid://shopify/MailingAddress/901',
        address1: '420 Design Boulevard, Suite 5A',
        city: 'San Francisco',
        province: 'California',
        zip: '94107',
        country: 'United States',
        isDefault: true,
      },
      lineItems: [
        {
          title: 'Halo Opal & Brass Pendant',
          variantTitle: 'Brushed Raw Brass / Standard 1.5m',
          quantity: 1,
          price: { amount: '420.00', currencyCode: 'USD' },
          imageUrl: PENDANT_IMAGE,
        },
      ],
    },
  ],
};

export const MOCK_B2B_COMPANY: B2BCompany = {
  id: 'gid://shopify/Company/9801',
  name: 'Studio Kanso Architects & Interiors',
  location: 'Pacific Design Center, West Hollywood, CA',
  paymentTerms: 'NET_30',
  tierDiscount: 0.25, // 25% off commercial catalog
  taxExempt: true,
  creditLimit: { amount: '50000.00', currencyCode: 'USD' },
  availableCredit: { amount: '42300.00', currencyCode: 'USD' },
};

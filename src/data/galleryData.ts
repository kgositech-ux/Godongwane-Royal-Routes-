export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Resort & Pools' | 'Suites & Bedrooms' | 'Beach & Ocean' | 'Safari Chalets' | 'Aviation & In-Flight';
  description: string;
  image: string;
  tag: string;
  serviceFeatures: string[];
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-pool-oasis',
    title: 'Oasis Lagoon Pool & Palm Garden Sanctuary',
    category: 'Resort & Pools',
    description: 'Immaculately manicured lawn, palm groves, and circular mosaic pool with shaded loungers overlooking the azure coastline.',
    image: '/assets/aistudio/IMG-20261025-WA0020_3d0b4c1d.jpg',
    tag: 'Outdoor Resort Experience',
    serviceFeatures: ['Poolside beverage butler', 'Heated water', 'Private sunbed cabanas', 'Direct beach access']
  },
  {
    id: 'gal-ocean-master-suite',
    title: 'Executive Ocean Panorama Master Suite',
    category: 'Suites & Bedrooms',
    description: 'Expansive contemporary suite featuring floor-to-ceiling glass terrace doors, plush sofa lounge, and unhindered sea horizons.',
    image: '/assets/aistudio/IMG-20261025-WA0034_b1356528.jpg',
    tag: 'Ultra-Luxury Accommodation',
    serviceFeatures: ['Private ocean balcony', 'King-size pillowtop bed', 'En-suite marble vanity', 'In-room dining']
  },
  {
    id: 'gal-clifftop-pool',
    title: 'Clifftop Oceanview Pool & Timber Deck',
    category: 'Resort & Pools',
    description: 'Perched high above the breakers with indigenous coastal gardens, deep blue swimming waters, and endless ocean views.',
    image: '/assets/aistudio/IMG-20261025-WA0040_35eba96f.jpg',
    tag: 'Private Leisure Facility',
    serviceFeatures: ['Panoramic ocean horizon', 'Hardwood sundeck', 'Aloe & palm flora', 'Sunset viewing terrace']
  },
  {
    id: 'gal-boutique-suite',
    title: 'Boutique Coastal Deluxe Bedroom',
    category: 'Suites & Bedrooms',
    description: 'Elegant architectural wainscoting, crisp white linen with fresh floral accents, ambient reading lamps, and modern wooden floors.',
    image: '/assets/aistudio/IMG-20261025-WA0031_8fc57c78.jpg',
    tag: 'Bespoke Guest Comfort',
    serviceFeatures: ['Double-quilted mattress', 'Custom cabinetry', 'High-speed Starlink WiFi', 'Daily royal housekeeping']
  },
  {
    id: 'gal-stone-presidential',
    title: 'Royal Stone Hearth Fireplace Suite',
    category: 'Suites & Bedrooms',
    description: 'Warm stacked-stone accent wall with integrated hearth, rich hardwood parquet floors, mahogany nightstands, and king suite comfort.',
    image: '/assets/aistudio/IMG-20261025-WA0022_72e4f3f5.jpg',
    tag: 'Signature Executive Living',
    serviceFeatures: ['Natural stone feature wall', 'Bedside sconce lighting', 'In-room bar & espresso', 'Private dressing area']
  },
  {
    id: 'gal-family-pool-village',
    title: 'Village Pool with Slide & Thatched Rondavels',
    category: 'Resort & Pools',
    description: 'Family-friendly free-form lagoon pool with water slide, stone pathways, and traditional African conical-roof chalets.',
    image: '/assets/aistudio/IMG-20261025-WA0043_d0cd334b.jpg',
    tag: 'Recreational Amenities',
    serviceFeatures: ['Water slide for all ages', 'Shaded thatch gazebos', 'Paved courtyard lounge', 'Kiddies splash zone']
  },
  {
    id: 'gal-thatched-chalet',
    title: 'Heritage Thatched Safari Chalet',
    category: 'Safari Chalets',
    description: 'Authentic African thatched-roof cottage with timber balustrade porch, private brick braai (barbecue), and sub-tropical garden.',
    image: '/assets/aistudio/IMG-20261025-WA0047_23ee68e6.jpg',
    tag: 'Indigenous African Architecture',
    serviceFeatures: ['Private outdoor veranda', 'Dedicated brick barbecue', 'Surrounded by lush flora', 'Secluded birding paths']
  },
  {
    id: 'gal-beach-cove',
    title: 'Private Golden Beach & Coastal Surf Cove',
    category: 'Beach & Ocean',
    description: 'Expansive golden sand beach with rolling turquoise waves, rock pools for exploring, and beach shade gazebos.',
    image: '/assets/aistudio/IMG-20261025-WA0046_c99eb2f2.jpg',
    tag: 'Marine & Beach Experience',
    serviceFeatures: ['Lifeguard monitored swimming', 'Surfing and bodyboarding', 'Private beach gazebos', 'Warm coastal waters']
  },
  {
    id: 'gal-coastal-resort-curved',
    title: 'Godongwane Coastal Resort & Surf Hotel',
    category: 'Resort & Pools',
    description: 'Tiered multi-level hotel architecture with curved private balconies directly overlooking the white-sand beach and ocean waves.',
    image: '/assets/aistudio/IMG-20261025-WA0007_044527a6.jpg',
    tag: 'Grand Coastal Property',
    serviceFeatures: ['Full-service beachfront hotel', 'Elevated ocean views', 'Lawn sunbathing deck', 'Conference & event salons']
  },
  {
    id: 'gal-hostess-cabin',
    title: 'Dedicated Royal In-Flight Hostess Service',
    category: 'Aviation & In-Flight',
    description: 'Attentive, personalized white-glove hospitality in the air. Fresh gourmet refreshments and fine dining at 40,000 feet.',
    image: '/assets/aistudio/IMG-20261025-WA0009_409d638f.jpg',
    tag: 'Royal Flight Hospitality',
    serviceFeatures: ['Individual passenger attention', 'Michelin dining presentation', 'Champagne and beverage service', 'VIP cabin comfort']
  },
  {
    id: 'gal-sunset-flight',
    title: 'Golden Hour Sky Cruising Over Clouds',
    category: 'Aviation & In-Flight',
    description: 'Private airliner and executive jet corridors soaring into golden sunset horizons with smooth cruising and zero commercial delays.',
    image: '/assets/aistudio/IMG-20261025-WA0008_8a4ed7dd.jpg',
    tag: 'Private Sky Liner Network',
    serviceFeatures: ['Low-noise cabin interior', 'High-speed satellite connectivity', 'Lie-flat executive seating', 'Custom departure schedules']
  },
  {
    id: 'gal-cpt-airport',
    title: 'Cape Town Signature Terminal Departures',
    category: 'Aviation & In-Flight',
    description: 'Direct tarmac boarding and takeoff past Cape Town International airport signature terminal with fast-track biometric clearance.',
    image: '/assets/aistudio/IMG-20261025-WA0015_a2f87a29.jpg',
    tag: 'Hub & Departure Facilities',
    serviceFeatures: ['Private VIP apron gate', 'Dedicated customs escort', 'No commercial terminal queues', 'Chauffeur tarmac drop-off']
  },
  {
    id: 'gal-night-terminal',
    title: 'Illuminated VIP International Air Terminal',
    category: 'Aviation & In-Flight',
    description: 'State-of-the-art glass air terminal illuminated for midnight departures and overnight intercontinental connections.',
    image: '/assets/aistudio/IMG-20261025-WA0019_f1c6369f.jpg',
    tag: '24/7 Aviation Hub',
    serviceFeatures: ['Round-the-clock aircraft handling', 'VIP passenger lounge access', 'Executive boarding bridges', 'Dedicated hangar security']
  },
  {
    id: 'gal-grand-palace',
    title: 'The Sovereign Grand Palace & Water Fountains',
    category: 'Resort & Pools',
    description: 'Majestic neoclassical palace hotel featuring illuminated musical dancing water fountains and golden royal illumination.',
    image: '/assets/aistudio/IMG-20261025-WA0011_2d19e864.jpg',
    tag: 'Palatial City Living',
    serviceFeatures: ['Choreographed water fountain show', 'Grand Italian marble lobbies', 'Fine dining sommelier cellars', 'Bentley chauffeur service']
  }
];

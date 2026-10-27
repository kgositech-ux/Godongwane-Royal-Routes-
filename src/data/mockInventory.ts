import { TravelInventoryItem } from '../types';

export const USER_ASSET_IMAGES = {
  // Aviation & Terminal
  inFlightService: '/assets/aistudio/IMG-20261025-WA0009_409d638f.jpg',
  sunsetFlight: '/assets/aistudio/IMG-20261025-WA0008_8a4ed7dd.jpg',
  capeTownAirportTakeoff: '/assets/aistudio/IMG-20261025-WA0015_a2f87a29.jpg',
  nightVIPTerminal: '/assets/aistudio/IMG-20261025-WA0019_f1c6369f.jpg',
  grandPalaceFountain: '/assets/aistudio/IMG-20261025-WA0011_2d19e864.jpg',
  coastalResort: '/assets/aistudio/IMG-20261025-WA0007_044527a6.jpg',

  // Suites, Pools, Chalets & Beach
  oasisPoolLawn: '/assets/aistudio/IMG-20261025-WA0020_3d0b4c1d.jpg',
  oceanMasterSuite: '/assets/aistudio/IMG-20261025-WA0034_b1356528.jpg',
  clifftopPoolDeck: '/assets/aistudio/IMG-20261025-WA0040_35eba96f.jpg',
  boutiqueDeluxeRoom: '/assets/aistudio/IMG-20261025-WA0031_8fc57c78.jpg',
  stoneHearthFireplaceSuite: '/assets/aistudio/IMG-20261025-WA0022_72e4f3f5.jpg',
  villagePoolSlide: '/assets/aistudio/IMG-20261025-WA0043_d0cd334b.jpg',
  thatchedSafariChalet: '/assets/aistudio/IMG-20261025-WA0047_23ee68e6.jpg',
  beachCoveSurf: '/assets/aistudio/IMG-20261025-WA0046_c99eb2f2.jpg'
};

export const LUXURY_INVENTORY: TravelInventoryItem[] = [
  // FLIGHTS
  {
    id: 'flight-jnb-cpt-101',
    type: 'flight',
    title: 'The Sovereign Shuttle: JNB to Cape Town',
    tagline: 'Direct private-suite airliner arriving into Cape Town International with Table Mountain panoramas',
    origin: 'Johannesburg (OR Tambo Royal Wing)',
    destination: 'Cape Town (CPT Signature Lounge)',
    rating: 4.99,
    reviewCount: 312,
    pricePerUnit: 18500,
    currency: 'ZAR',
    flightCode: 'GRR 101',
    aircraftOrStyle: 'Airbus A350 Sovereign Royal Interior',
    durationOrNights: '2h 10m Non-Stop',
    departureTime: '09:30 AM',
    arrivalTime: '11:40 AM',
    heroImage: USER_ASSET_IMAGES.capeTownAirportTakeoff,
    galleryImages: [
      USER_ASSET_IMAGES.inFlightService,
      USER_ASSET_IMAGES.sunsetFlight,
      USER_ASSET_IMAGES.nightVIPTerminal
    ],
    amenities: [
      'Dedicated Royal In-Flight Concierge & Hostess Service',
      'Dom Pérignon Vintage Champagne Welcome',
      'Lie-flat Silk Suite with Massage Function',
      'Rolls-Royce Tarmac Chauffeur Escort',
      'Fast-track Biometric Clearance at Cape Town International'
    ],
    cabinClasses: [
      { name: 'Royal First Suite', multiplier: 1.0, description: 'Fully enclosed suite with sliding door and private wardrobe', baggageAllowance: '3x 32kg + 2 Cabin' },
      { name: 'Crown Imperial Suite', multiplier: 1.5, description: 'Double bed configuration with en-suite shower spa access', baggageAllowance: '4x 32kg + Unlimited' }
    ],
    highlights: [
      'Private biometric fast-track border clearance',
      'Sommelier wine pairing from Franschhoek Royal Vineyards',
      'Dedicated cabin crew trained in African royal protocol'
    ],
    availableSlots: 4,
    coordinates: { lat: -33.9715, lng: 18.6021 }
  },
  {
    id: 'flight-jnb-vfa-204',
    type: 'flight',
    title: 'Sunset Royal Falcon: Golden Hour Sky Crossing',
    tagline: 'Private executive jet cruising at golden hour over dramatic wilderness landscapes',
    origin: 'Johannesburg (OR Tambo Royal Wing)',
    destination: 'Victoria Falls (VFA Executive Airbase)',
    rating: 4.98,
    reviewCount: 184,
    pricePerUnit: 24900,
    currency: 'ZAR',
    flightCode: 'GRR 204',
    aircraftOrStyle: 'Bombardier Global 7500 Executive Jet',
    durationOrNights: '1h 45m Direct',
    departureTime: '04:15 PM',
    arrivalTime: '06:00 PM',
    heroImage: USER_ASSET_IMAGES.sunsetFlight,
    galleryImages: [
      USER_ASSET_IMAGES.inFlightService,
      USER_ASSET_IMAGES.nightVIPTerminal
    ],
    amenities: [
      'Sunset aerial banking with golden hour photography view',
      'Glenfiddich & Kavalan Reserve Tasting Bar',
      'Personalized in-seat tea and coffee service with Royal Hostess',
      'Private VIP customs escort on touchdown'
    ],
    cabinClasses: [
      { name: 'Executive Club Chair', multiplier: 1.0, description: 'Handcrafted Connolly leather recliner with panoramic window view', baggageAllowance: '2x 32kg' },
      { name: 'Sovereign Stateroom', multiplier: 1.4, description: 'Dedicated lounge and dining zone with satellite telephony', baggageAllowance: '3x 32kg' }
    ],
    highlights: [
      'Sunset low-altitude pass over Zambezi gorge',
      'Gourmet safari brunch served on Royal Wedgwood china'
    ],
    availableSlots: 3,
    coordinates: { lat: -17.9243, lng: 25.8572 }
  },
  {
    id: 'flight-lhr-jnb-777',
    type: 'flight',
    title: 'The Sovereign Midnight Liner: Global VIP Corridor',
    tagline: 'Late-night executive charter departing from illuminated private terminals with zero customs delay',
    origin: 'London Heathrow (Windsor VIP Suite)',
    destination: 'Johannesburg & Cape Town (Private VIP Hub)',
    rating: 5.0,
    reviewCount: 420,
    pricePerUnit: 68000,
    currency: 'ZAR',
    flightCode: 'GRR 777',
    aircraftOrStyle: 'Boeing 787-9 Sovereign Flagship Liner',
    durationOrNights: '10h 50m Overnight',
    departureTime: '10:30 PM',
    arrivalTime: '10:20 AM (+1)',
    heroImage: USER_ASSET_IMAGES.nightVIPTerminal,
    galleryImages: [
      USER_ASSET_IMAGES.inFlightService,
      USER_ASSET_IMAGES.capeTownAirportTakeoff
    ],
    amenities: [
      'Private Double Bed Stateroom with Cashmere Linens',
      'Caviar & Vintage Krug Service on demand',
      'Full onboard marble shower spa',
      'Seamless transit through lighted private executive terminal'
    ],
    cabinClasses: [
      { name: 'Grand Sovereign Suite', multiplier: 1.0, description: 'Individual cabin with personal mini-bar, 42-inch 4K screen, and queen bed', baggageAllowance: '4x 32kg' },
      { name: 'Imperial Sky Residence', multiplier: 1.8, description: 'Three-room aerial penthouse with private living room and bedroom', baggageAllowance: 'Unlimited luggage' }
    ],
    highlights: [
      'Zero jet lag lighting and customized sleep aroma therapy',
      'Direct apron Rolls-Royce transfer upon arrival'
    ],
    availableSlots: 2,
    coordinates: { lat: -26.1367, lng: 28.2411 }
  },

  // HOTELS & RESORTS
  {
    id: 'hotel-coastal-resort-sanctuary',
    type: 'resort',
    title: 'The Godongwane Royal Coastal Sanctuary & Beach Resort',
    tagline: 'Curved tiered architectural masterpiece overlooking turquoise waters with private ocean pools and manicured lawns',
    destination: 'Atlantic Coastal Seaboard, South Africa',
    rating: 4.99,
    reviewCount: 395,
    pricePerUnit: 14500,
    currency: 'ZAR',
    durationOrNights: 'Min 2 nights',
    heroImage: USER_ASSET_IMAGES.coastalResort,
    galleryImages: [
      USER_ASSET_IMAGES.oasisPoolLawn,
      USER_ASSET_IMAGES.oceanMasterSuite,
      USER_ASSET_IMAGES.beachCoveSurf,
      USER_ASSET_IMAGES.boutiqueDeluxeRoom
    ],
    amenities: [
      'Curved private balcony suites with direct panoramic ocean breakers',
      'Oceanfront circular seawater swimming pool & poolside cabanas',
      'Private sandy beach cove with dedicated sunbed butler service',
      'Fine dining coastal seafood pavilion and champagne terrace',
      'Helipad arrival directly on the coastal estate grounds'
    ],
    roomTypes: [
      { name: 'Panoramic Ocean Master Suite', multiplier: 1.0, description: 'Spacious living salon with floor-to-ceiling glass doors opening onto the sea', capacity: '2 Guests' },
      { name: 'Boutique Coastal Deluxe Room', multiplier: 0.85, description: 'Wainscoted bedroom with fresh floral accents and ambient sconces', capacity: '2 Guests' },
      { name: 'Royal Presidential Penthouse', multiplier: 1.9, description: 'Wraparound top-tier terrace, private chef service, and dedicated plunge pool', capacity: '4 Guests' }
    ],
    highlights: [
      'Direct stepped descent to private pristine tidal beach',
      'Complimentary champagne and fresh oyster reception at sunset'
    ],
    availableSlots: 5,
    coordinates: { lat: -29.7285, lng: 31.0825 }
  },
  {
    id: 'hotel-clifftop-manor-pools',
    type: 'hotel',
    title: 'The Sovereign Clifftop Manor & Stone Hearth Suites',
    tagline: 'Clifftop heated infinity pool overlooking the ocean, stone-hearth fireplace suites, and private beach cove',
    destination: 'Coastal Ridge, South Africa',
    rating: 4.97,
    reviewCount: 288,
    pricePerUnit: 16800,
    currency: 'ZAR',
    durationOrNights: '1 night minimum',
    heroImage: USER_ASSET_IMAGES.clifftopPoolDeck,
    galleryImages: [
      USER_ASSET_IMAGES.stoneHearthFireplaceSuite,
      USER_ASSET_IMAGES.oceanMasterSuite,
      USER_ASSET_IMAGES.beachCoveSurf
    ],
    amenities: [
      'Heated clifftop swimming pool perched directly above the ocean waves',
      'Handcrafted natural stone fireplace hearths in every master suite',
      'Private pathway down to secluded golden surf beach cove',
      'Sunset cocktail deck with indigenous aloe and coastal palm flora'
    ],
    roomTypes: [
      { name: 'Stone Hearth Fireplace Suite', multiplier: 1.0, description: 'Rustic stone accent wall, private hearth, and hardwood flooring', capacity: '2 Guests' },
      { name: 'Executive Ocean Panorama Suite', multiplier: 1.4, description: 'Balcony glass doors with uninterrupted horizon ocean view', capacity: '2 Guests' }
    ],
    highlights: [
      'Complimentary evening fire-lighting & sommelier tasting',
      'Private secluded timber pool deck reserved for residents'
    ],
    availableSlots: 4,
    coordinates: { lat: -34.0501, lng: 18.3755 }
  },
  {
    id: 'resort-safari-chalets-village',
    type: 'resort',
    title: 'Godongwane Thatched Safari Chalets & Village Pool',
    tagline: 'Authentic African thatched-roof rondavels, private braai decks, and family lagoon pool with water slide',
    destination: 'Sub-Tropical Coastal Reserve, South Africa',
    rating: 4.96,
    reviewCount: 310,
    pricePerUnit: 6500,
    currency: 'ZAR',
    durationOrNights: 'Min 2 nights',
    heroImage: USER_ASSET_IMAGES.thatchedSafariChalet,
    galleryImages: [
      USER_ASSET_IMAGES.villagePoolSlide,
      USER_ASSET_IMAGES.boutiqueDeluxeRoom,
      USER_ASSET_IMAGES.oasisPoolLawn
    ],
    amenities: [
      'Traditional African thatch-roofed chalets and conical rondavels',
      'Private brick barbecue (braai) patio and timber balustrade porch',
      'Free-form resort swimming pool with water slide and sun loungers',
      'Lush tropical gardens with indigenous palm trees and birdlife'
    ],
    roomTypes: [
      { name: 'Heritage Thatched Safari Chalet', multiplier: 1.0, description: 'Secluded cottage with timber veranda, braai, and garden outlook', capacity: '2-4 Guests' },
      { name: 'Family Rondavel Suite', multiplier: 1.3, description: 'Traditional round pavilion with loft and direct pool village access', capacity: '4 Guests' }
    ],
    highlights: [
      'Evening braai wood and coals delivered daily with chef spice pack',
      'Relaxing pool slide and shaded thatch gazebos'
    ],
    availableSlots: 6,
    coordinates: { lat: -30.0821, lng: 30.8654 }
  },
  {
    id: 'hotel-godongwane-grand-palace',
    type: 'hotel',
    title: 'The Sovereign Grand Palace & Water Gardens',
    tagline: 'Illuminated classical palace featuring majestic dancing water fountains, golden towers, and grand ballrooms',
    destination: 'City of Gold & Royal Promenade',
    rating: 4.98,
    reviewCount: 512,
    pricePerUnit: 22000,
    currency: 'ZAR',
    durationOrNights: '1 night minimum',
    heroImage: USER_ASSET_IMAGES.grandPalaceFountain,
    galleryImages: [
      USER_ASSET_IMAGES.coastalResort,
      USER_ASSET_IMAGES.nightVIPTerminal,
      USER_ASSET_IMAGES.oceanMasterSuite
    ],
    amenities: [
      'World-famous choreographed musical water fountain displays',
      'Grand Italian marble lobbies with 24K gold gilded accents',
      'Michelin-starred private dining salons and sommelier vaults',
      'Heated Mediterranean courtyard pools surrounded by citrus trees'
    ],
    roomTypes: [
      { name: 'Fountain View Royal Suite', multiplier: 1.0, description: 'High-floor suite with uninterrupted panoramic view of illuminated water fountains', capacity: '2 Guests' },
      { name: 'Monarch Imperial Villa', multiplier: 2.2, description: 'Two-story neoclassical villa with private garden and 24/7 royal butler staff', capacity: '4 Guests' }
    ],
    highlights: [
      'VIP front-row fountain terrace seating with vintage champagne',
      'Chauffeur Bentley service throughout your stay'
    ],
    availableSlots: 6,
    coordinates: { lat: -26.1076, lng: 28.0567 }
  },
  {
    id: 'package-royal-service-experience',
    type: 'package',
    title: 'The Royal In-Flight Hospitality & Palace Circuit',
    tagline: 'All-inclusive sovereign journey featuring personalized cabin hostess care, sunset jet travel, and oceanfront sanctuary suites',
    destination: 'Cape Town • Coastal Sanctuary • Grand Palace',
    rating: 5.0,
    reviewCount: 142,
    pricePerUnit: 125000,
    currency: 'ZAR',
    durationOrNights: '5 Days / 4 Nights',
    heroImage: USER_ASSET_IMAGES.inFlightService,
    galleryImages: [
      USER_ASSET_IMAGES.sunsetFlight,
      USER_ASSET_IMAGES.coastalResort,
      USER_ASSET_IMAGES.grandPalaceFountain,
      USER_ASSET_IMAGES.capeTownAirportTakeoff,
      USER_ASSET_IMAGES.oceanMasterSuite
    ],
    amenities: [
      'Attentive dedicated royal cabin hostess attending to every in-flight comfort',
      'Private sunset charter flights connecting all destinations',
      'Oceanfront coastal resort suite & Grand Palace fountain penthouse',
      'All gourmet meals, private sommelier wines, and chauffeur transfers included'
    ],
    roomTypes: [
      { name: 'Royal Sovereign Circuit', multiplier: 1.0, description: 'Full first-class airline stateroom and ocean panorama suites', capacity: '2 Guests' },
      { name: 'Imperial Heritage Delegation', multiplier: 1.7, description: 'Complete private jet charter and presidential compound accommodations', capacity: '4 Guests' }
    ],
    highlights: [
      'White-glove personalized service from private hangar takeoff to resort checkout',
      'Zero commercial queues with tarmac VIP immigration escorts'
    ],
    availableSlots: 2,
    coordinates: { lat: -33.9249, lng: 18.4241 }
  }
];

export const AIRPORT_HUBS = [
  { code: 'CPT', name: 'Cape Town International Signature Terminal', city: 'Cape Town', country: 'South Africa' },
  { code: 'JNB', name: 'Johannesburg OR Tambo Royal Wing', city: 'Johannesburg', country: 'South Africa' },
  { code: 'MQP', name: 'Kruger Mpumalanga Executive Gate', city: 'Kruger Sabi Sands', country: 'South Africa' },
  { code: 'VFA', name: 'Victoria Falls Private Airbase', city: 'Victoria Falls', country: 'Zimbabwe' },
  { code: 'DUR', name: 'King Shaka Coastal VIP Executive', city: 'Durban Coast', country: 'South Africa' },
  { code: 'LHR', name: 'London Heathrow Windsor Suite', city: 'London', country: 'United Kingdom' },
  { code: 'DXB', name: 'Dubai Royal Al Maktoum VIP', city: 'Dubai', country: 'UAE' }
];

export const CONCIERGE_QUICK_INQUIRIES = [
  "Inquire about Royal In-Flight hostess service & menu",
  "Request Rolls-Royce Phantom airport tarmac transfer",
  "Upgrade to Ocean Panorama Suite or Thatched Safari Chalet",
  "Inquire about pool facilities, water slide & private beach cove",
  "Confirm baggage allowance for Cape Town private jet departure",
  "Dietary requirements: arrange Halal/Kosher Michelin chef menu",
  "Request early check-in at Coastal Sanctuary Resort"
];

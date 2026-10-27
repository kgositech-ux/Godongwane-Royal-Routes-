export type TravelType = 'flight' | 'hotel' | 'resort' | 'package';

export type BookingStatus = 'confirmed' | 'checked_in' | 'modified' | 'cancelled' | 'completed';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  memberTier: 'Royal Emerald' | 'Crown Sapphire' | 'Imperial Diamond';
  pointsBalance: number;
  passportNumber?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelInventoryItem {
  id: string;
  type: TravelType;
  title: string;
  tagline: string;
  destination: string;
  origin?: string;
  rating: number;
  reviewCount: number;
  pricePerUnit: number;
  currency: string;
  heroImage: string;
  galleryImages: string[];
  durationOrNights?: string;
  departureTime?: string;
  arrivalTime?: string;
  flightCode?: string;
  aircraftOrStyle?: string;
  amenities: string[];
  cabinClasses?: {
    name: string;
    multiplier: number;
    description: string;
    baggageAllowance: string;
  }[];
  roomTypes?: {
    name: string;
    multiplier: number;
    description: string;
    capacity: string;
  }[];
  highlights: string[];
  availableSlots: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  bookingReference: string;
  type: TravelType;
  title: string;
  destination: string;
  origin?: string;
  startDate: string;
  endDate?: string;
  passengersOrGuests: number;
  cabinOrRoomType: string;
  totalAmount: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: 'paid' | 'refunded';
  paymentMethod: string;
  specialRequests: string;
  flightNumber?: string;
  seatOrRoomNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  userId: string;
  bookingId?: string;
  senderName: string;
  senderRole: 'traveler' | 'concierge';
  text: string;
  createdAt: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  time: string;
  location: string;
  description: string;
  iconName: string;
  highlightBadge?: string;
}

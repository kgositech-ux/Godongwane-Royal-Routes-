import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Booking, SupportMessage, UserProfile, ItineraryDay } from '../types';

/**
 * Generates an alphanumeric Royal PNR booking reference (e.g., GRR-8492X)
 */
export function generateBookingReference(prefix: string = 'GRR'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${result}`;
}

/**
 * Upsert or fetch traveler profile in /users/{userId}
 */
export async function syncUserProfile(
  userId: string,
  email: string,
  displayName: string,
  photoURL?: string
): Promise<UserProfile> {
  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);

    if (snap.exists()) {
      return snap.data() as UserProfile;
    }

    const newProfile: UserProfile = {
      id: userId,
      email: email || '',
      displayName: displayName || 'Royal Traveler',
      photoURL: photoURL || '',
      phoneNumber: '+27 (0) 82 555 0199',
      memberTier: 'Royal Emerald',
      pointsBalance: 12500,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(userDocRef, newProfile);
    return newProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Listen to all bookings for the authenticated user
 */
export function subscribeUserBookings(
  userId: string,
  onUpdate: (bookings: Booking[]) => void,
  onError?: (error: Error) => void
) {
  const path = 'bookings';
  const q = query(collection(db, path), where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const bookings: Booking[] = [];
      snapshot.forEach((d) => {
        bookings.push({ id: d.id, ...d.data() } as Booking);
      });
      // Sort in client by creation date desc
      bookings.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      onUpdate(bookings);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

/**
 * Create a new travel reservation
 */
export async function createBooking(booking: Omit<Booking, 'id'>): Promise<string> {
  const path = 'bookings';
  const newId = `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const bookingDoc: Booking = {
    ...booking,
    id: newId
  };

  try {
    await setDoc(doc(db, path, newId), bookingDoc);
    return newId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${path}/${newId}`);
  }
}

/**
 * Update an existing booking (e.g. modify dates, upgrade cabin/room, special requests, seat)
 */
export async function updateBooking(
  bookingId: string,
  updates: Partial<Pick<Booking, 'startDate' | 'endDate' | 'cabinOrRoomType' | 'status' | 'specialRequests' | 'seatOrRoomNumber' | 'notes' | 'passengersOrGuests' | 'totalAmount' | 'paymentStatus'>>
): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Cancel a booking with automated refund calculation
 */
export async function cancelBooking(bookingId: string, reason?: string): Promise<void> {
  return updateBooking(bookingId, {
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: reason ? `Cancelled by traveler: ${reason}` : 'Cancelled by traveler with royal satisfaction refund guarantee'
  });
}

/**
 * Subscribe to Support / Concierge Messages
 */
export function subscribeSupportMessages(
  userId: string,
  onUpdate: (messages: SupportMessage[]) => void,
  onError?: (error: Error) => void
) {
  const path = 'supportMessages';
  const q = query(collection(db, path), where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const msgs: SupportMessage[] = [];
      snapshot.forEach((d) => {
        msgs.push({ id: d.id, ...d.data() } as SupportMessage);
      });
      // Sort in client by creation date asc
      msgs.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      onUpdate(msgs);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

/**
 * Send a message to royal concierge desk
 */
export async function sendSupportMessage(
  userId: string,
  senderName: string,
  senderRole: 'traveler' | 'concierge',
  text: string,
  bookingId?: string
): Promise<string> {
  const path = 'supportMessages';
  const msgId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const messageDoc: SupportMessage = {
    id: msgId,
    userId,
    bookingId: bookingId || '',
    senderName,
    senderRole,
    text,
    createdAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, path, msgId), messageDoc);
    return msgId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${path}/${msgId}`);
  }
}

/**
 * Seed initial royal welcome messages and starter bookings if traveler has zero bookings
 */
export async function seedInitialTravelerData(userId: string, userEmail: string, displayName: string) {
  const bookingsPath = 'bookings';
  try {
    const q = query(collection(db, bookingsPath), where('userId', '==', userId));
    const snap = await getDocs(q);

    if (snap.empty) {
      // Create a premier upcoming royal booking
      const starterBooking: Omit<Booking, 'id'> = {
        userId,
        userEmail,
        bookingReference: generateBookingReference('GRR'),
        type: 'flight',
        title: 'The Sovereign Shuttle: JNB to Cape Town',
        origin: 'Johannesburg (OR Tambo Royal Wing)',
        destination: 'Cape Town (CPT Signature Lounge)',
        startDate: '2026-11-12T09:30:00Z',
        endDate: '2026-11-12T11:40:00Z',
        passengersOrGuests: 2,
        cabinOrRoomType: 'Royal First Suite',
        totalAmount: 37000,
        currency: 'ZAR',
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'Royal Crown Black Card •••• 8821',
        specialRequests: 'Dom Pérignon 2013 on ice upon boarding, gluten-free canapés, Rolls-Royce tarmac escort.',
        flightNumber: 'GRR 101',
        seatOrRoomNumber: 'Suite 1A & 1B',
        notes: 'Complimentary private helicopter connection to Atlantic Seaboard available on arrival.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await createBooking(starterBooking);

      // Seed a starter message from the Royal Concierge desk
      await sendSupportMessage(
        userId,
        'Lady Naledi Khumalo (Head of Royal Concierge)',
        'concierge',
        `Sawubona & Welcome to Godongwane Royal Routes, ${displayName}! Your royal flight GRR 101 from Johannesburg to Cape Town is confirmed. I am your personal flight & itinerary liaison. How may my team and I attend to your upcoming voyage?`
      );
    }
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
}

/**
 * Generates an interactive day-by-day travel itinerary schedule
 */
export function generateItineraryForBooking(booking: Booking): ItineraryDay[] {
  const isFlight = booking.type === 'flight';
  const isResort = booking.type === 'resort' || booking.type === 'hotel';

  if (isFlight) {
    return [
      {
        dayNumber: 1,
        title: 'VIP Chauffeur & Private Hangar Reception',
        time: '07:30 AM',
        location: booking.origin || 'Private Departure Terminal',
        description: 'Your armored Rolls-Royce Cullinan chauffeur arrives at your residence. Fast-track customs and baggage tagging in the Royal Sovereign Salon.',
        iconName: 'Car',
        highlightBadge: 'VIP Tarmac Fast-Track'
      },
      {
        dayNumber: 1,
        title: 'Boarding & Vintage Champagne Toast',
        time: '09:00 AM',
        location: 'Executive Gate 1A',
        description: `Boarding ${booking.flightNumber || 'GRR Royal Liner'}. Settling into your ${booking.cabinOrRoomType} with personalized cashmere slippers and vintage champagne tasting.`,
        iconName: 'PlaneTakeoff',
        highlightBadge: 'Pre-flight Service'
      },
      {
        dayNumber: 1,
        title: 'In-Flight Michelin African Degustation',
        time: '10:15 AM',
        location: 'Cruising at 41,000 ft',
        description: 'Four-course luncheon curated by Chef Wandile, featuring Karoo lamb noisettes and Franschhoek reserve Pinotage.',
        iconName: 'Utensils',
        highlightBadge: 'In-Flight Dining'
      },
      {
        dayNumber: 1,
        title: 'Touchdown & Helicopter Transfer',
        time: '11:40 AM',
        location: booking.destination,
        description: `Direct tarmac descent at ${booking.destination}. Hand-luggage escort and optional direct heli-flip to your villa or yacht.`,
        iconName: 'Compass',
        highlightBadge: 'Arrival Concierge'
      }
    ];
  }

  if (isResort) {
    return [
      {
        dayNumber: 1,
        title: 'Arrival & Welcome Boma Gathering',
        time: '02:00 PM',
        location: booking.destination,
        description: `Private bush-airstrip landing followed by cold Marula towels and check-in to your ${booking.cabinOrRoomType}. Sunset canapés overlooking the waterhole.`,
        iconName: 'Hotel',
        highlightBadge: 'Royal Reception'
      },
      {
        dayNumber: 1,
        title: 'Golden Hour Big-5 Safari Expedition',
        time: '04:30 PM',
        location: 'Sabi Sands Game Concession',
        description: 'Tracking leopard prides and white rhinos with Master Tracker Sipho in an open-canopy electric Land Cruiser.',
        iconName: 'Binoculars',
        highlightBadge: 'Exclusive Big-5'
      },
      {
        dayNumber: 2,
        title: 'Dawn Wilderness Walk & Bush Breakfast',
        time: '06:00 AM',
        location: 'Granite Kopjes Overlook',
        description: 'Interpretive guided walk identifying medicinal flora and predator tracks, concluding with a champagne bush breakfast under ancient baobabs.',
        iconName: 'Sunrise',
        highlightBadge: 'Wilderness Walk'
      },
      {
        dayNumber: 2,
        title: 'Private Starlight Boma Feast',
        time: '07:30 PM',
        location: 'Royal Sanctuary Boma',
        description: 'Braai feast with slow-roasted springbok loin, wild herbs, and storytelling around the sacred fire accompanied by traditional acoustic harp.',
        iconName: 'Flame',
        highlightBadge: 'Starlight Boma'
      }
    ];
  }

  // Package circuit
  return [
    {
      dayNumber: 1,
      title: 'Departure & Flight to Cape Town',
      time: 'Day 1 - 09:00 AM',
      location: 'Johannesburg to Cape Town',
      description: 'Private Sovereign shuttle flight with Table Mountain private scenic loop.',
      iconName: 'PlaneTakeoff',
      highlightBadge: 'Sky Crossing'
    },
    {
      dayNumber: 2,
      title: 'Cape Clifftop Leisure & Sunset Yacht Charter',
      time: 'Day 2 - 04:00 PM',
      location: 'Clifton Beach & Bantry Bay',
      description: 'Private 65-foot Princess Yacht cruise to Clifton 4th beach with fresh oysters and Cap Classique.',
      iconName: 'Ship',
      highlightBadge: 'Yacht Charter'
    },
    {
      dayNumber: 4,
      title: 'Private Airliner to Kruger Sanctuary',
      time: 'Day 4 - 11:00 AM',
      location: 'Greater Kruger Reserve',
      description: 'Transfer to private airstrip and transfer into Riverfront Royal Suite.',
      iconName: 'Compass',
      highlightBadge: 'Wilderness Transfer'
    },
    {
      dayNumber: 6,
      title: 'Victoria Falls Aerial Flight & Zambezi Cruise',
      time: 'Day 6 - 02:00 PM',
      location: 'Victoria Falls Royal Palace',
      description: 'Helicopter tour over the roaring cascades and sundowner cruise on the upper Zambezi.',
      iconName: 'Waves',
      highlightBadge: 'Wonder of the World'
    }
  ];
}

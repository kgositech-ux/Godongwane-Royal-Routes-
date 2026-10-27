import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser, GoogleAuthProvider } from 'firebase/auth';
import { 
  auth, 
  signInWithPopup, 
  signOut, 
  googleProvider,
  handleFirestoreError,
  OperationType,
  setCachedAccessToken
} from './firebase';
import { 
  UserProfile, 
  Booking, 
  TravelInventoryItem, 
  SupportMessage, 
  TravelType 
} from './types';
import { LUXURY_INVENTORY } from './data/mockInventory';
import { 
  syncUserProfile, 
  subscribeUserBookings, 
  subscribeSupportMessages, 
  createBooking, 
  updateBooking, 
  cancelBooking, 
  sendSupportMessage,
  seedInitialTravelerData
} from './services/bookingService';

import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { InventoryCard } from './components/InventoryCard';
import { BookingModal } from './components/BookingModal';
import { PaymentModal } from './components/PaymentModal';
import { Dashboard } from './components/Dashboard';
import { PhotoGallery } from './components/PhotoGallery';
import { ModifyBookingModal } from './components/ModifyBookingModal';
import { CancelBookingModal } from './components/CancelBookingModal';
import { BoardingPassModal } from './components/BoardingPassModal';
import { ItineraryModal } from './components/ItineraryModal';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { GoogleDriveExportModal } from './components/GoogleDriveExportModal';
import { UserProfileModal } from './components/UserProfileModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';
import { ContactUs } from './components/ContactUs';

import { 
  Crown, 
  Compass, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Plane, 
  Hotel, 
  ArrowRight,
  HardDriveDownload,
  LogIn,
  Camera
} from 'lucide-react';

export default function App() {
  // Navigation & User State
  const [currentTab, setCurrentTab] = useState<'book' | 'gallery' | 'dashboard' | 'itinerary' | 'concierge' | 'contact'>('book');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currency, setCurrency] = useState<string>('ZAR');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  // Theme State: Night (dark) or Light
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('grr_theme');
    if (saved) return saved === 'dark';
    return true; // Default royal sovereign aesthetic
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('grr_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Firestore Real-time Collections
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);

  // Search & Catalog Filter State
  const [selectedType, setSelectedType] = useState<'all' | TravelType>('all');
  const [searchDestination, setSearchDestination] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [travelDate, setTravelDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);

  // Active Modals State
  const [selectedItemForBooking, setSelectedItemForBooking] = useState<TravelInventoryItem | null>(null);
  const [bookingConfigForPayment, setBookingConfigForPayment] = useState<any | null>(null);
  const [activeBookingForModify, setActiveBookingForModify] = useState<Booking | null>(null);
  const [activeBookingForCancel, setActiveBookingForCancel] = useState<Booking | null>(null);
  const [activeBookingForPass, setActiveBookingForPass] = useState<Booking | null>(null);
  const [activeBookingForItinerary, setActiveBookingForItinerary] = useState<Booking | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [isDriveExportOpen, setIsDriveExportOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Helper toast notifier
  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    setToast({
      id: String(Date.now()),
      type,
      title,
      message
    });
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        try {
          const profile = await syncUserProfile(
            fbUser.uid,
            fbUser.email || '',
            fbUser.displayName || 'Royal Traveler',
            fbUser.photoURL || undefined
          );
          setUser(profile);

          // Seed sample premier booking if first time
          await seedInitialTravelerData(
            fbUser.uid,
            fbUser.email || '',
            fbUser.displayName || 'Royal Traveler'
          );
        } catch (err) {
          console.error("Auth sync error:", err);
        }
      } else {
        setUser(null);
        setBookings([]);
        setSupportMessages([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Real-time Firestore Listeners (only when authenticated)
  useEffect(() => {
    if (!user) return;

    // Listen to traveler's bookings
    const unsubBookings = subscribeUserBookings(
      user.id,
      (liveBookings) => {
        setBookings(liveBookings);
      },
      (err) => {
        console.error("Bookings subscription error:", err);
      }
    );

    // Listen to concierge support messages
    const unsubMessages = subscribeSupportMessages(
      user.id,
      (liveMessages) => {
        setSupportMessages(liveMessages);
      },
      (err) => {
        console.error("Support messages subscription error:", err);
      }
    );

    return () => {
      unsubBookings();
      unsubMessages();
    };
  }, [user]);

  // Handle Google Sign In
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setCachedAccessToken(credential.accessToken);
      }
      showToast('success', 'Welcome to Godongwane Royal Routes', 'Signed in successfully via Google.');
    } catch (err: any) {
      console.error("Login failed:", err);
      showToast('error', 'Sign In Could Not Proceed', err.message || 'Please retry.');
    }
  };

  // Handle Sign Out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCachedAccessToken(null);
      setUser(null);
      setIsProfileOpen(false);
      showToast('info', 'Signed Out', 'You have been signed out of your royal account.');
    } catch (err: any) {
      console.error("Sign out error:", err);
    }
  };

  // Catalog filtering
  const filteredCatalog = LUXURY_INVENTORY.filter((item) => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (selectedOrigin && item.origin && !item.origin.toLowerCase().includes(selectedOrigin.toLowerCase())) {
      return false;
    }
    if (searchDestination.trim()) {
      const q = searchDestination.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDest = item.destination.toLowerCase().includes(q);
      const matchTag = item.tagline.toLowerCase().includes(q);
      return matchTitle || matchDest || matchTag;
    }
    return true;
  });

  // Booking Flow Triggers
  const handleStartBooking = (item: TravelInventoryItem) => {
    if (!user) {
      handleLogin();
      return;
    }
    setSelectedItemForBooking(item);
  };

  const handleProceedToPayment = (config: any) => {
    setSelectedItemForBooking(null);
    setBookingConfigForPayment(config);
  };

  const handlePaymentSuccess = async (newBooking: Booking) => {
    if (!user) return;
    try {
      await createBooking({
        ...newBooking,
        userId: user.id,
        userEmail: user.email
      });

      // Send automated confirmation message from concierge
      await sendSupportMessage(
        user.id,
        'Lady Naledi Khumalo (Head of Royal Concierge)',
        'concierge',
        `Greetings ${user.displayName}! Your reservation for ${newBooking.title} (PNR: ${newBooking.bookingReference}) has been confirmed and registered with flight & lodge dispatch. I have initiated your tarmac luggage clearance.`,
        newBooking.id
      );

      showToast('success', 'Royal Reservation Confirmed!', `PNR: ${newBooking.bookingReference} has been issued.`);
      setCurrentTab('dashboard');
    } catch (err: any) {
      console.error("Booking creation error:", err);
      showToast('error', 'Booking Error', 'Could not record booking in Firestore.');
    }
  };

  // Modification Flow
  const handleSaveModification = async (
    bookingId: string,
    updates: any
  ) => {
    try {
      await updateBooking(bookingId, updates);
      showToast('success', 'Reservation Modified', 'Your travel dates, class, and concierge notes have been updated.');
    } catch (err: any) {
      console.error("Modification failed:", err);
      showToast('error', 'Modification Failed', err.message || 'Unable to update reservation.');
      throw err;
    }
  };

  // Cancellation Flow
  const handleConfirmCancel = async (bookingId: string, reason: string) => {
    try {
      await cancelBooking(bookingId, reason);
      showToast('info', 'Reservation Cancelled & 100% Refunded', 'The refund has been credited back to your original payment method.');
    } catch (err: any) {
      console.error("Cancellation error:", err);
      showToast('error', 'Cancellation Failed', err.message || 'Could not process cancellation.');
      throw err;
    }
  };

  // Send Support Message
  const handleSendMessage = async (text: string, bookingId?: string) => {
    if (!user) return;
    try {
      await sendSupportMessage(user.id, user.displayName, 'traveler', text, bookingId);

      // Automated realistic concierge response simulation
      setTimeout(async () => {
        const lower = text.toLowerCase();
        let reply = "Thank you for reaching out to the Royal Concierge desk. I am reviewing your request with our station flight coordinator and will ensure all details are impeccably arranged.";
        if (lower.includes('luggage') || lower.includes('baggage')) {
          reply = "Your Royal First Suite ticket includes 3 complimentary checked bags up to 32kg each, plus 2 cabin pieces. We also provide direct tarmac chauffeur luggage escort.";
        } else if (lower.includes('rolls-royce') || lower.includes('transfer')) {
          reply = "Your armored Rolls-Royce Cullinan chauffeur has been noted and assigned. Your chauffeur will greet you with a name placard directly at the private terminal apron.";
        } else if (lower.includes('dietary') || lower.includes('halal') || lower.includes('kosher') || lower.includes('champagne')) {
          reply = "Your dietary and culinary preferences have been communicated directly to Executive Chef Wandile. Vintage champagne is chilled to 6°C awaiting your arrival.";
        } else if (lower.includes('helicopter') || lower.includes('victoria falls')) {
          reply = "The Victoria Falls scenic helicopter circuit has been provisionally reserved for your arrival afternoon. Our dispatch will confirm the exact helipad boarding slot.";
        } else if (lower.includes('photo') || lower.includes('gallery') || lower.includes('chalet') || lower.includes('pool')) {
          reply = "Our full photo gallery features our authentic coastal resort pools, thatched safari chalets, and master suites. Let me know if you would like me to reserve a specific suite shown in the gallery.";
        }

        await sendSupportMessage(
          user.id,
          'Lady Naledi Khumalo (Head of Royal Concierge)',
          'concierge',
          reply,
          bookingId
        );
      }, 1500);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col font-sans selection:bg-amber-500 selection:text-black ${
      isDarkMode ? 'bg-[#070d08] text-white' : 'bg-[#faf7f2] text-stone-900'
    }`}>
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'concierge') {
            setIsConciergeOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenDriveExport={() => setIsDriveExportOpen(true)}
        bookingCount={bookings.length}
        unreadSupportCount={supportMessages.filter((m: SupportMessage) => m.senderRole === 'concierge').length}
        currency={currency}
        setCurrency={setCurrency}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Unauthenticated Traveler Callout Banner */}
        {!user && (
          <div className={`mb-8 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-amber-950/60 via-[#122116] to-amber-950/60 border-amber-500/30' 
              : 'bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/90 border-amber-300'
          }`}>
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className={`font-serif font-bold text-sm sm:text-base ${
                  isDarkMode ? 'text-white' : 'text-stone-900'
                }`}>
                  Sign in with Google to Access Your Traveler Self-Management Dashboard
                </h3>
                <p className={`text-xs mt-0.5 ${
                  isDarkMode ? 'text-gray-300' : 'text-stone-600'
                }`}>
                  Track, modify, and manage your private flights, Kruger sanctuaries, and Google Drive itineraries in real-time.
                </p>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Connect with Google</span>
            </button>
          </div>
        )}

        {/* TAB 1: BOOKING & EXPLORATION ENGINE */}
        {currentTab === 'book' && (
          <div>
            {/* Hero Search Bar */}
            <HeroSearch
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              searchDestination={searchDestination}
              setSearchDestination={setSearchDestination}
              selectedOrigin={selectedOrigin}
              setSelectedOrigin={setSelectedOrigin}
              travelDate={travelDate}
              setTravelDate={setTravelDate}
              guestCount={guestCount}
              setGuestCount={setGuestCount}
              totalResultsCount={filteredCatalog.length}
            />

            {/* Quick Link to Photos Gallery */}
            <div className="my-6 p-4 rounded-2xl bg-[#0c180f] border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Explore Our Service & Suite Photos Gallery
                  </h4>
                  <p className="text-xs text-gray-400">
                    Browse real photos of our lagoon pools, clifftop decks, ocean suites, thatched safari chalets, and flight service.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentTab('gallery')}
                className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Catalog Grid Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                    Featured Royal Corridors & Sanctuaries
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Real-time seat and villa inventory synchronized with Godongwane dispatch.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Instant E-Ticket Issuance</span>
                </div>
              </div>

              {filteredCatalog.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-sm bg-black/30 rounded-3xl border border-white/10">
                  No royal routes matched your search criteria. Try modifying your destination or filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCatalog.map((item) => (
                    <InventoryCard
                      key={item.id}
                      item={item}
                      currency={currency}
                      onSelect={(selected) => handleStartBooking(selected)}
                      onQuickBook={(selected) => handleStartBooking(selected)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PHOTOS GALLERY & SERVICES SHOWCASE */}
        {currentTab === 'gallery' && (
          <PhotoGallery
            onBookService={(category, title) => {
              if (category === 'Aviation & In-Flight') {
                setSelectedType('flight');
              } else if (category === 'Suites & Bedrooms') {
                setSelectedType('hotel');
              } else if (category === 'Resort & Pools' || category === 'Safari Chalets' || category === 'Beach & Ocean') {
                setSelectedType('resort');
              } else {
                setSelectedType('all');
              }
              setCurrentTab('book');
              showToast('info', `Filtering for ${title}`, 'Ready to schedule this experience.');
            }}
          />
        )}

        {/* TAB 3: TRAVELER SELF-MANAGEMENT DASHBOARD */}
        {currentTab === 'dashboard' && (
          <div>
            {!user ? (
              <div className="py-20 text-center max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                  <Crown className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Traveler Self-Management Portal
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Please sign in with Google to view and manage your travel bookings, modify flight dates, request upgrades, print boarding passes, and download itineraries.
                </p>
                <button
                  onClick={handleLogin}
                  className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 mx-auto"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              </div>
            ) : (
              <Dashboard
                bookings={bookings}
                user={user}
                currency={currency}
                onModifyBooking={(b) => setActiveBookingForModify(b)}
                onCancelBooking={(b) => setActiveBookingForCancel(b)}
                onViewBoardingPass={(b) => setActiveBookingForPass(b)}
                onViewItinerary={(b) => setActiveBookingForItinerary(b)}
                onContactConcierge={(b) => {
                  setIsConciergeOpen(true);
                }}
                onExploreRoutes={() => setCurrentTab('book')}
                onOpenDriveExport={() => setIsDriveExportOpen(true)}
                onSetTripReminder={(booking) => {
                  showToast(
                    'success',
                    'Trip Reminder Saved (.ics)',
                    `Calendar reminder downloaded for ${booking.bookingReference}. Open it to add to your Apple Calendar, Outlook, or Google Calendar.`
                  );
                }}
              />
            )}
          </div>
        )}

        {/* TAB 4: CONTACT US SECTION */}
        {currentTab === 'contact' && (
          <ContactUs
            onSelectRouteForBooking={(selected) => handleStartBooking(selected)}
            currency={currency}
          />
        )}
      </main>


      {/* Footer */}
      <footer className={`border-t text-xs py-12 mt-16 transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-[#050805] border-amber-500/20 text-gray-400' 
          : 'bg-[#eee8dc] border-amber-300/60 text-stone-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span className={`font-serif font-bold text-sm tracking-wider ${
                isDarkMode ? 'text-white' : 'text-stone-900'
              }`}>
                GODONGWANE ROYAL ROUTES
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-gray-400">
              The premier sovereign luxury liner and safari corridor network. Private aviation, clifftop manors, and exclusive Big-5 sanctuaries across the African continent and world capitals.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/27744805297?text=Hello%20Godongwane%20Royal%20Routes,%20I%20would%20like%20to%20book%20a%20route."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-semibold text-xs border border-[#25D366]/40 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Book Route via WhatsApp: 074 480 5297</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white mb-3 text-xs uppercase tracking-wider text-amber-300">
              Royal Fleet & Sanctuaries
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>The Sovereign Boeing 787-9 Stateroom</li>
              <li>Victoria Falls Royal Falcon Express</li>
              <li>The Coastal Sanctuary & Beach Resort</li>
              <li>The Sovereign Grand Palace & Fountains</li>
              <li>Heritage Thatched Safari Chalets</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white mb-3 text-xs uppercase tracking-wider text-amber-300">
              Services & Showcase
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setCurrentTab('gallery')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Photos Gallery & Facilities
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Contact Us (Skhaleni, Empangeni)
                </button>
              </li>
              <li>Real-Time Availability & Booking</li>
              <li>Online Date & Suite Modification</li>
              <li>Digital Boarding Pass & QR Voucher</li>
              <li>Google Drive Travel Dossier Sync</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white mb-3 text-xs uppercase tracking-wider text-amber-300">
              Contact Us & Operations
            </h4>
            <p className="text-[11px] leading-relaxed mb-2 text-gray-300">
              Regional Operations Hub: <strong className="text-white">Skhaleni, Empangeni</strong>
            </p>
            <p className="text-[11px] text-gray-400">Phone / WhatsApp:</p>
            <a 
              href="https://wa.me/27744805297?text=Hello%20Godongwane%20Royal%20Routes,%20I%20would%20like%20to%20book%20a%20royal%20route." 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-[#25D366] hover:underline text-xs font-bold block"
            >
              074 480 5297 (+27 74 480 5297)
            </a>
            <p className="text-[11px] text-gray-400 mt-2">Official Email:</p>
            <a 
              href="mailto:godongwaneroyalroutes@gmail.com" 
              className="font-mono text-amber-300 hover:underline text-xs block break-all"
            >
              godongwaneroyalroutes@gmail.com
            </a>
            <p className="text-[10px] text-gray-500 mt-2">
              Office Location: Skhaleni, Empangeni, KwaZulu-Natal
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} Godongwane Royal Routes. All sovereign rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>PCI-DSS Level 1 Encrypted</span>
            <span>•</span>
            <span>Firestore Persistent ABAC Security</span>
          </div>
        </div>
      </footer>

      {/* ALL MODALS */}
      {selectedItemForBooking && (
        <BookingModal
          item={selectedItemForBooking}
          isOpen={!!selectedItemForBooking}
          onClose={() => setSelectedItemForBooking(null)}
          onProceedToPayment={handleProceedToPayment}
          currency={currency}
          defaultDate={travelDate}
          defaultGuests={guestCount}
          userDefaultName={user?.displayName}
        />
      )}

      {bookingConfigForPayment && user && (
        <PaymentModal
          isOpen={!!bookingConfigForPayment}
          onClose={() => setBookingConfigForPayment(null)}
          bookingConfig={bookingConfigForPayment}
          userId={user.id}
          userEmail={user.email}
          currency={currency}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {activeBookingForModify && (
        <ModifyBookingModal
          booking={activeBookingForModify}
          isOpen={!!activeBookingForModify}
          onClose={() => setActiveBookingForModify(null)}
          onSave={handleSaveModification}
          currency={currency}
        />
      )}

      {activeBookingForCancel && (
        <CancelBookingModal
          booking={activeBookingForCancel}
          isOpen={!!activeBookingForCancel}
          onClose={() => setActiveBookingForCancel(null)}
          onConfirmCancel={handleConfirmCancel}
          currency={currency}
        />
      )}

      {activeBookingForPass && (
        <BoardingPassModal
          booking={activeBookingForPass}
          isOpen={!!activeBookingForPass}
          onClose={() => setActiveBookingForPass(null)}
          onExportToDrive={() => {
            setActiveBookingForPass(null);
            setIsDriveExportOpen(true);
          }}
          currency={currency}
        />
      )}

      {activeBookingForItinerary && (
        <ItineraryModal
          booking={activeBookingForItinerary}
          isOpen={!!activeBookingForItinerary}
          onClose={() => setActiveBookingForItinerary(null)}
          onExportToDrive={() => {
            setActiveBookingForItinerary(null);
            setIsDriveExportOpen(true);
          }}
        />
      )}

      {isConciergeOpen && user && (
        <ConciergeChatModal
          isOpen={isConciergeOpen}
          onClose={() => setIsConciergeOpen(false)}
          messages={supportMessages}
          onSendMessage={handleSendMessage}
          userId={user.id}
          userName={user.displayName}
        />
      )}

      {isDriveExportOpen && (
        <GoogleDriveExportModal
          isOpen={isDriveExportOpen}
          onClose={() => setIsDriveExportOpen(false)}
          bookings={bookings}
          userName={user?.displayName || 'Royal Patron'}
        />
      )}

      {isProfileOpen && user && (
        <UserProfileModal
          user={user}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onLogout={handleLogout}
          onUpdateProfile={async (updates) => {
            try {
              const updated = await syncUserProfile(
                user.id,
                user.email,
                updates.displayName || user.displayName,
                user.photoURL
              );
              setUser({ ...user, ...updates, ...updated });
              showToast('success', 'Profile Updated', 'Your royal patron details have been updated.');
            } catch (err: any) {
              showToast('error', 'Update Failed', err.message);
            }
          }}
        />
      )}

      {/* Global Toast */}
      <NotificationToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

import React from 'react';
import { 
  Plane, 
  Hotel, 
  Palmtree, 
  Sparkles, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Crown,
  MessageSquare,
  Phone
} from 'lucide-react';
import { TravelType } from '../types';
import { AIRPORT_HUBS, USER_ASSET_IMAGES } from '../data/mockInventory';

interface HeroSearchProps {
  selectedType: 'all' | TravelType;
  setSelectedType: (type: 'all' | TravelType) => void;
  searchDestination: string;
  setSearchDestination: (val: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (val: string) => void;
  travelDate: string;
  setTravelDate: (val: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  totalResultsCount: number;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  selectedType,
  setSelectedType,
  searchDestination,
  setSearchDestination,
  selectedOrigin,
  setSelectedOrigin,
  travelDate,
  setTravelDate,
  guestCount,
  setGuestCount,
  totalResultsCount
}) => {
  const showcaseGallery = [
    {
      title: 'Private Sunset Jet Flights',
      subtitle: 'Sovereign Aviation',
      image: USER_ASSET_IMAGES.sunsetFlight
    },
    {
      title: 'Dedicated Royal Cabin Service',
      subtitle: 'Attentive Hostesses',
      image: USER_ASSET_IMAGES.inFlightService
    },
    {
      title: 'Cape Town Signature Hub',
      subtitle: 'VIP Terminal Departure',
      image: USER_ASSET_IMAGES.capeTownAirportTakeoff
    },
    {
      title: 'Coastal Beach Resorts',
      subtitle: 'Oceanfront Sanctuaries',
      image: USER_ASSET_IMAGES.coastalResort
    },
    {
      title: 'Grand Palace & Fountains',
      subtitle: 'Neoclassical Architecture',
      image: USER_ASSET_IMAGES.grandPalaceFountain
    },
    {
      title: '24/7 Executive Terminal',
      subtitle: 'Lighted Private Apron',
      image: USER_ASSET_IMAGES.nightVIPTerminal
    }
  ];

  return (
    <div className="relative mb-12 space-y-6">
      {/* Hero Visual Background Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-gradient-to-b from-[#0e1a10] via-[#09110a] to-[#060a06]">
        {/* Main Background using uploaded Sunset Flight image */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen bg-cover bg-center filter brightness-110"
          style={{
            backgroundImage: `url('${USER_ASSET_IMAGES.sunsetFlight}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a06] via-[#060a06]/75 to-transparent" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16 max-w-5xl mx-auto text-center">
          {/* Royal Crest Subhead */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serif tracking-widest uppercase mb-6 backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Godongwane Royal Routes • Sovereign Aviation & Sanctuaries
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Curated Flights, Grand Palaces & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Luxury Coastal Beach Resorts
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Experience the zenith of luxury travel. Private airliner departures via Cape Town International, personalized royal cabin hostess service, and iconic oceanfront sanctuaries.
          </p>

          {/* Search Engine Panel */}
          <div className="mt-10 bg-[#0d160f]/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-amber-500/30 shadow-2xl text-left">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/10 text-xs sm:text-sm font-medium">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  selectedType === 'all'
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> All Royal Routes
              </button>
              <button
                onClick={() => setSelectedType('flight')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  selectedType === 'flight'
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Plane className="w-3.5 h-3.5" /> Private Flights & Jets
              </button>
              <button
                onClick={() => setSelectedType('hotel')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  selectedType === 'hotel'
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Hotel className="w-3.5 h-3.5" /> Grand Palaces
              </button>
              <button
                onClick={() => setSelectedType('resort')}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  selectedType === 'resort'
                    ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Palmtree className="w-3.5 h-3.5" /> Coastal Beach Resorts
              </button>
            </div>

            {/* Input Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Origin / Departure */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 focus-within:border-amber-400 transition-colors">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" /> Origin Hub
                </label>
                <select
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-gray-900 text-gray-300">Any Departure Hub</option>
                  {AIRPORT_HUBS.map((hub) => (
                    <option key={hub.code} value={hub.city} className="bg-gray-900 text-white">
                      {hub.code} - {hub.city} ({hub.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 focus-within:border-amber-400 transition-colors">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Search className="w-3 h-3 text-amber-400" /> Destination
                </label>
                <input
                  type="text"
                  placeholder="Cape Town, Coastal Sanctuary, Palace..."
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Date */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 focus-within:border-amber-400 transition-colors">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" /> Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none [color-scheme:dark] cursor-pointer"
                />
              </div>

              {/* Travelers */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 focus-within:border-amber-400 transition-colors">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" /> Guests / Party
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-gray-900 text-white">1 Royal Guest</option>
                  <option value={2} className="bg-gray-900 text-white">2 Royal Guests</option>
                  <option value={4} className="bg-gray-900 text-white">4 Royal Guests (Private Suite)</option>
                  <option value={6} className="bg-gray-900 text-white">6+ Royal Delegation</option>
                </select>
              </div>
            </div>

            {/* Quick Status Bar & WhatsApp Route Booking Link */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {totalResultsCount} Verified Royal Schedules Available Online
              </span>

              <a
                href="https://wa.me/27744805297?text=Hello%20Godongwane%20Royal%20Routes,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20route%20from%20your%20Skhaleni,%20Empangeni%20hub."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-semibold text-xs border border-[#25D366]/40 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Book Route via WhatsApp: 074 480 5297</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Visual Showcase Strip with all 6 uploaded assets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-amber-300">
              Godongwane Royal Routes Portfolio
            </span>
          </div>
          <span className="text-[11px] font-mono text-gray-400">
            Official Fleet & Sanctuary Destinations
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {showcaseGallery.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-amber-500/20 bg-black/50 shadow-lg hover:border-amber-400/60 transition-all duration-300"
            >
              <div className="h-28 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest leading-none">
                  {item.subtitle}
                </p>
                <p className="text-xs font-serif font-bold text-white truncate mt-0.5">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

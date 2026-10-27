import React, { useState } from 'react';
import { 
  Crown, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Compass, 
  ArrowRight,
  Plane,
  Building,
  CheckCircle2
} from 'lucide-react';
import { LUXURY_INVENTORY } from '../data/mockInventory';
import { TravelInventoryItem } from '../types';

interface ContactUsProps {
  onSelectRouteForBooking?: (item: TravelInventoryItem) => void;
  currency?: string;
}

export const ContactUs: React.FC<ContactUsProps> = ({
  onSelectRouteForBooking,
  currency = 'ZAR'
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick WhatsApp Route Inquiry Form State
  const [selectedRouteId, setSelectedRouteId] = useState<string>(LUXURY_INVENTORY[0]?.id || '');
  const [travelerName, setTravelerName] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(2);
  const [customNotes, setCustomNotes] = useState('');

  const selectedRoute = LUXURY_INVENTORY.find((item) => item.id === selectedRouteId) || LUXURY_INVENTORY[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('godongwaneroyalroutes@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0744805297');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // Helper to generate pre-filled WhatsApp link
  const buildWhatsAppRouteLink = () => {
    const routeTitle = selectedRoute ? selectedRoute.title : 'General Route Inquiry';
    const originDest = selectedRoute?.origin 
      ? ` (${selectedRoute.origin} to ${selectedRoute.destination})` 
      : (selectedRoute ? ` (${selectedRoute.destination})` : '');
    
    const lines = [
      `👑 *GODONGWANE ROYAL ROUTES - BOOKING INQUIRY*`,
      `---------------------------------`,
      `✈️ *Selected Route:* ${routeTitle}${originDest}`,
      `👤 *Lead Traveler:* ${travelerName.trim() || 'Royal Guest'}`,
      `📅 *Preferred Travel Date:* ${travelDate || 'Flexible / Next Available'}`,
      `👥 *Number of Royal Guests:* ${passengerCount}`,
      customNotes.trim() ? `📝 *Special Requests:* ${customNotes.trim()}` : '',
      `📍 *Operations Hub:* Skhaleni, Empangeni`,
      `---------------------------------`,
      `Please provide immediate booking confirmation, suite availability, and flight itinerary.`
    ].filter(Boolean);

    const message = lines.join('\n');
    return `https://wa.me/27744805297?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Royal Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#121f14] via-[#0b140d] to-[#070b07] p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serif tracking-widest uppercase mb-4 backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            Official Royal Liaison Desk • Skhaleni, Empangeni
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Contact Godongwane <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Royal Routes Concierge
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            Whether chartering sovereign private airliners, curating clifftop coastal sanctuaries, or customizing Big-5 safari corridors, our headquarters in Skhaleni, Empangeni provides 24/7 direct navigation and booking assistance.
          </p>

          {/* Quick Direct Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/27744805297?text=Hello%20Godongwane%20Royal%20Routes,%20I%20would%20like%20to%20book%20a%20royal%20travel%20route."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] shadow-lg shadow-emerald-900/40 transition-all duration-200 flex items-center gap-2.5 cursor-pointer hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Book Route on WhatsApp (074 480 5297)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="tel:0744805297"
              className="px-6 py-3.5 rounded-xl font-serif font-medium text-xs uppercase tracking-wider text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Direct: 074 480 5297</span>
            </a>

            <a
              href="mailto:godongwaneroyalroutes@gmail.com"
              className="px-6 py-3.5 rounded-xl font-serif font-medium text-xs uppercase tracking-wider text-gray-200 bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Email Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Core Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Channel 1: WhatsApp / Phone */}
        <div className="bg-[#0e1710] border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-emerald-400" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
            Instant Route Booking & WhatsApp
          </span>
          <h3 className="text-xl font-serif font-bold text-white mt-1">
            Phone & WhatsApp
          </h3>
          <p className="text-2xl font-mono font-bold text-amber-300 mt-3 tracking-wider">
            074 480 5297
          </p>
          <p className="text-xs text-gray-400 mt-1">
            International: <span className="font-mono text-gray-300">+27 74 480 5297</span>
          </p>
          <p className="text-xs text-gray-300 mt-3 leading-relaxed">
            Direct navigation link to our reservation dispatchers. Receive instant itinerary quotes, suite availability, and digital boarding passes.
          </p>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
            <a
              href="https://wa.me/27744805297?text=Hello%20Godongwane%20Royal%20Routes,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20route."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>

            <button
              onClick={handleCopyPhone}
              className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Copy phone number"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Channel 2: Email Address */}
        <div className="bg-[#0e1710] border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-amber-400" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Official Inquiries & Itinerary Dossiers
          </span>
          <h3 className="text-xl font-serif font-bold text-white mt-1">
            Email Concierge
          </h3>
          <p className="text-sm font-mono font-bold text-amber-300 mt-3 break-all">
            godongwaneroyalroutes@gmail.com
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Formal charters, corporate partnerships & invoices
          </p>
          <p className="text-xs text-gray-300 mt-3 leading-relaxed">
            Send bespoke requirements, group manifest rosters, or custom flight schedules directly to our administration team.
          </p>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
            <a
              href="mailto:godongwaneroyalroutes@gmail.com?subject=Royal%20Route%20Booking%20Inquiry"
              className="flex-1 py-2.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Copy email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Channel 3: Physical Headquarters Location */}
        <div className="bg-[#0e1710] border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-400/60 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-yellow-400" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 font-semibold">
            Regional Operations & Dispatch Hub
          </span>
          <h3 className="text-xl font-serif font-bold text-white mt-1">
            Physical Location
          </h3>
          <p className="text-xl font-serif font-bold text-amber-300 mt-3">
            Skhaleni, Empangeni
          </p>
          <p className="text-xs text-gray-400 mt-1">
            King Cetshwayo District • KwaZulu-Natal, South Africa
          </p>
          <p className="text-xs text-gray-300 mt-3 leading-relaxed">
            Centrally anchored in the Skhaleni corridor of Empangeni, orchestrating routes connecting Zululand, Richards Bay air corridors, and national destinations.
          </p>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
            <a
              href="https://maps.google.com/?q=Skhaleni,+Empangeni,+KwaZulu-Natal,+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>View On Maps</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Dedicated Interactive Route Booking to WhatsApp Navigation Hub */}
      <div className="bg-[#0a120c] border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-medium border border-emerald-500/30">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              Direct WhatsApp Route Booking Engine
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Navigate Route Booking to WhatsApp Numbers
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
              Select any royal route below to immediately navigate to WhatsApp with our reservation dispatchers (<span className="text-amber-300 font-mono font-semibold">074 480 5297</span>). All details are pre-formatted for instant handling.
            </p>
          </div>

          <div className="bg-[#0f1b11] border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Select Route */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-amber-400" />
                  Select Booking Route
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full bg-black/60 border border-amber-500/40 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {LUXURY_INVENTORY.map((item) => (
                    <option key={item.id} value={item.id} className="bg-gray-900 text-white">
                      {item.type.toUpperCase()} • {item.title} {item.origin ? `(${item.origin} → ${item.destination})` : `(${item.destination})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Traveler Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Lead Royal Guest Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prince Ndlovu / Lady Sarah Jenkins"
                  value={travelerName}
                  onChange={(e) => setTravelerName(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Preferred Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Preferred Departure / Arrival Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 [color-scheme:dark] cursor-pointer"
                />
              </div>

              {/* Number of Passengers */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Party Size (Guests / Passengers)
                </label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value={1} className="bg-gray-900 text-white">1 Royal Guest</option>
                  <option value={2} className="bg-gray-900 text-white">2 Royal Guests</option>
                  <option value={4} className="bg-gray-900 text-white">4 Royal Guests (Private Suite)</option>
                  <option value={6} className="bg-gray-900 text-white">6+ Royal Delegation</option>
                </select>
              </div>

              {/* Location Badge Indicator */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="bg-black/40 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-xs text-gray-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dispatch Location:</span>
                  </span>
                  <span className="font-semibold text-emerald-300">Skhaleni, Empangeni</span>
                </div>
              </div>

              {/* Custom Notes */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Special Route Notes & Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Helipad transfer required from Richards Bay, champagne service on arrival, custom departure timing..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            {/* Selected Route Preview Card */}
            {selectedRoute && (
              <div className="bg-black/50 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={selectedRoute.heroImage}
                  alt={selectedRoute.title}
                  className="w-full sm:w-28 h-20 object-cover rounded-lg border border-amber-500/30"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-amber-300 font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 uppercase font-bold">{selectedRoute.type}</span>
                    {selectedRoute.flightCode && <span>{selectedRoute.flightCode}</span>}
                    <span>• {selectedRoute.destination}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-white mt-1">
                    {selectedRoute.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1">{selectedRoute.tagline}</p>
                </div>
                <div className="text-center sm:text-right shrink-0">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">Standard Tariff</p>
                  <p className="text-lg font-serif font-bold text-amber-400">
                    R {selectedRoute.pricePerUnit.toLocaleString('en-ZA')}
                  </p>
                </div>
              </div>
            )}

            {/* Primary Action Button: Navigate to WhatsApp */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Direct Line to WhatsApp: <strong>074 480 5297</strong></span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onSelectRouteForBooking && selectedRoute && (
                  <button
                    onClick={() => onSelectRouteForBooking(selectedRoute)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View In-App Booking
                  </button>
                )}

                <a
                  href={buildWhatsAppRouteLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 via-[#25D366] to-emerald-500 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Navigate to WhatsApp to Book Route</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Routes Direct WhatsApp Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Quick WhatsApp Navigation for Popular Routes
            </h3>
            <p className="text-xs text-gray-400">
              Click any route to open a direct WhatsApp reservation request to 074 480 5297
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LUXURY_INVENTORY.slice(0, 6).map((item) => {
            const itemWhatsAppUrl = `https://wa.me/27744805297?text=${encodeURIComponent(
              `Hello Godongwane Royal Routes, I want to book the route: ${item.title} (${item.origin ? `${item.origin} to ` : ''}${item.destination}). Tariff: R ${item.pricePerUnit.toLocaleString('en-ZA')}. Please confirm availability from your Skhaleni, Empangeni desk.`
            )}`;

            return (
              <div 
                key={item.id}
                className="bg-[#0b140d] border border-amber-500/20 hover:border-amber-400/60 rounded-2xl p-4 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img 
                      src={item.heroImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30 uppercase">
                      {item.type}
                    </div>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {item.destination} {item.durationOrNights ? `• ${item.durationOrNights}` : ''}
                  </p>
                  <p className="text-xs font-mono font-bold text-amber-400 mt-2">
                    R {item.pricePerUnit.toLocaleString('en-ZA')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <a
                    href={itemWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Book on WhatsApp (0744805297)</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Location Summary */}
      <div className="rounded-2xl border border-amber-500/20 bg-black/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-300">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="font-serif font-bold text-white text-sm">Godongwane Royal Routes Headquarters</p>
            <p className="text-gray-400">Skhaleni, Empangeni, KwaZulu-Natal, South Africa</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp Line: 074 480 5297</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>godongwaneroyalroutes@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Skhaleni, Empangeni Base</span>
          </div>
        </div>
      </div>
    </div>
  );
};

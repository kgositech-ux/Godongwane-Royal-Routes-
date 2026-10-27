import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Check, 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Wine, 
  Eye, 
  ArrowRight,
  Clock,
  MessageSquare
} from 'lucide-react';
import { TravelInventoryItem } from '../types';

interface BookingModalProps {
  item: TravelInventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: (bookingConfig: {
    item: TravelInventoryItem;
    cabinOrRoomType: string;
    startDate: string;
    endDate?: string;
    passengersOrGuests: number;
    specialRequests: string;
    addons: string[];
    totalAmount: number;
    travelerName: string;
    passportNumber: string;
  }) => void;
  currency: string;
  defaultDate?: string;
  defaultGuests?: number;
  userDefaultName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  isOpen,
  onClose,
  onProceedToPayment,
  currency,
  defaultDate,
  defaultGuests = 1,
  userDefaultName = ''
}) => {
  if (!isOpen) return null;

  // Selected tier
  const options = item.type === 'flight' ? (item.cabinClasses || []) : (item.roomTypes || []);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(
    defaultDate || new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 86400000 * 8).toISOString().split('T')[0]
  );
  const [guests, setGuests] = useState<number>(defaultGuests);
  const [travelerName, setTravelerName] = useState<string>(userDefaultName || '');
  const [passportNumber, setPassportNumber] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'VIP Fast-Track Biometric Clearance'
  ]);

  const addonPrices: Record<string, number> = {
    'Rolls-Royce Cullinan Airport Tarmac Escort': 4500,
    'Dom Pérignon Vintage & Caviar In-Flight Service': 3800,
    'Dedicated Big-5 Wildlife Tracker & Armed Ranger': 5500,
    'VIP Fast-Track Biometric Clearance': 0, // Complimentary
    'Helipad Transfer & Private Terminal Salon': 6500
  };

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const currentOption = options[selectedOptionIndex];
  const multiplier = currentOption ? currentOption.multiplier : 1.0;
  const baseRate = item.pricePerUnit * multiplier * guests;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + (addonPrices[a] || 0), 0);
  const totalAmount = baseRate + addonsTotal;

  const formatPrice = (amountZar: number) => {
    switch (currency) {
      case 'USD':
        return `$ ${(amountZar / 18.5).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      case 'EUR':
        return `€ ${(amountZar / 20.0).toLocaleString('en-EU', { maximumFractionDigits: 0 })}`;
      case 'GBP':
        return `£ ${(amountZar / 23.5).toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
      case 'ZAR':
      default:
        return `R ${amountZar.toLocaleString('en-ZA')}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToPayment({
      item,
      cabinOrRoomType: currentOption ? currentOption.name : 'Royal Suite Standard',
      startDate,
      endDate: item.type === 'flight' ? undefined : endDate,
      passengersOrGuests: guests,
      specialRequests,
      addons: selectedAddons,
      totalAmount,
      travelerName: travelerName || 'Royal Route Guest',
      passportNumber: passportNumber || 'A-8941098'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c130d] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
              <Crown className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                Bespoke Royal Reservation
              </h2>
              <p className="text-xs text-amber-300/80 font-mono">
                {item.flightCode ? `${item.flightCode} • ` : ''}{item.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Hero Banner Preview */}
          <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={item.heroImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500 text-black font-bold tracking-widest">
                  {item.type}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {item.destination}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-mono">Starting From</span>
                <p className="text-xl font-serif font-bold text-amber-400">
                  {formatPrice(item.pricePerUnit)}
                </p>
              </div>
            </div>
          </div>

          {/* Tier / Cabin / Suite Selection */}
          {options.length > 0 && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                Select Royal Class / Suite Configuration
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedOptionIndex(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/10'
                          : 'border-white/10 bg-black/40 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-serif font-bold text-sm text-white">
                          {opt.name}
                        </span>
                        <span className="text-xs font-mono text-amber-300">
                          +{((opt.multiplier - 1.0) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed mb-2">
                        {opt.description}
                      </p>
                      <div className="text-[11px] text-emerald-400 font-mono">
                        {'baggageAllowance' in opt ? (opt as any).baggageAllowance : (opt as any).capacity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Travel Dates & Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Departure / Check-In
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>

            {item.type !== 'flight' && (
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Check-Out Date
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none [color-scheme:dark] cursor-pointer"
                />
              </div>
            )}

            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" /> Royal Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-gray-900 text-white">1 Traveler</option>
                <option value={2} className="bg-gray-900 text-white">2 Travelers (Suite Pair)</option>
                <option value={4} className="bg-gray-900 text-white">4 Travelers (Family Suite)</option>
              </select>
            </div>
          </div>

          {/* Concierge Add-Ons */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Royal Concierge & Aviation Enhancements
            </label>
            <div className="space-y-2">
              {Object.entries(addonPrices).map(([addon, price]) => {
                const checked = selectedAddons.includes(addon);
                return (
                  <div
                    key={addon}
                    onClick={() => toggleAddon(addon)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      checked
                        ? 'border-amber-400/60 bg-amber-500/10 text-white'
                        : 'border-white/10 bg-black/30 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          checked ? 'bg-amber-400 border-amber-400 text-black' : 'border-gray-500'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-medium">{addon}</span>
                    </div>
                    <span className="font-mono text-amber-300">
                      {price === 0 ? 'Complimentary' : `+${formatPrice(price)}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Passenger & Special Concierge Requests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1">
                Primary Royal Traveler Full Legal Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lord Kgosi Mthembu"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
              />
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1">
                Passport / ID Document Number
              </label>
              <input
                type="text"
                placeholder="e.g. ZA-92841029"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-3">
            <label className="block text-[11px] font-mono text-amber-400/90 uppercase tracking-wider mb-1">
              Concierge Instructions & Dietary Preferences
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Dom Pérignon 2013 on arrival, strictly Halal dining, celebratory anniversary rose bouquet in suite..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-transparent text-white text-xs placeholder-gray-500 focus:outline-none resize-none"
            />
          </div>

          {/* Total & Submit Button */}
          <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400 font-mono uppercase">
                Grand Royal Total ({currency})
              </p>
              <p className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                {formatPrice(totalAmount)}
              </p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Includes 24/7 Royal Concierge & Full Refund Protection
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/27744805297?text=${encodeURIComponent(
                  `👑 *GODONGWANE ROYAL ROUTES - ROUTE RESERVATION REQUEST*\n` +
                  `---------------------------------\n` +
                  `✈️ *Route:* ${item.title} ${item.origin ? `(${item.origin} to ${item.destination})` : `(${item.destination})`}\n` +
                  `🛏️ *Cabin/Suite:* ${currentOption?.name || 'Royal Standard'}\n` +
                  `👤 *Guest Name:* ${travelerName || 'Royal Guest'}\n` +
                  `📅 *Date:* ${startDate} ${endDate ? `to ${endDate}` : ''}\n` +
                  `👥 *Guests:* ${guests}\n` +
                  `💰 *Estimated Total:* ${formatPrice(totalAmount)}\n` +
                  `📍 *Operations Hub:* Skhaleni, Empangeni\n` +
                  `---------------------------------\n` +
                  `Please confirm this royal route reservation on WhatsApp.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] shadow-lg shadow-emerald-900/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Book Route on WhatsApp (074 480 5297)</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

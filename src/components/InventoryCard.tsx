import React from 'react';
import { 
  Plane, 
  Hotel, 
  Palmtree, 
  Sparkles, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Users,
  MessageSquare
} from 'lucide-react';
import { TravelInventoryItem } from '../types';

interface InventoryCardProps {
  item: TravelInventoryItem;
  currency: string;
  onSelect: (item: TravelInventoryItem) => void;
  onQuickBook: (item: TravelInventoryItem) => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({
  item,
  currency,
  onSelect,
  onQuickBook
}) => {
  // Pre-computed WhatsApp link to book this specific route directly with Royal Concierge
  const whatsAppBookingUrl = `https://wa.me/27744805297?text=${encodeURIComponent(
    `Hello Godongwane Royal Routes (Skhaleni, Empangeni desk),\nI would like to book the route: *${item.title}* ${item.origin ? `(${item.origin} to ${item.destination})` : `(${item.destination})`}.\nPrice: R ${item.pricePerUnit.toLocaleString('en-ZA')}.\nPlease confirm availability and payment details.`
  )}`;

  // Currency formatting with ZAR as primary
  const getConvertedPrice = (amountZar: number, cur: string) => {
    switch (cur) {
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

  const getCategoryIcon = () => {
    switch (item.type) {
      case 'flight':
        return <Plane className="w-4 h-4 text-amber-400" />;
      case 'hotel':
        return <Hotel className="w-4 h-4 text-emerald-400" />;
      case 'resort':
        return <Palmtree className="w-4 h-4 text-teal-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="group bg-[#0d160f]/90 border border-amber-500/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between">
      {/* Visual Header */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={item.heroImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d160f] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40 flex items-center gap-1.5 uppercase tracking-wider">
            {getCategoryIcon()}
            {item.type}
          </span>
          {item.availableSlots <= 3 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-950/80 backdrop-blur-md text-red-300 border border-red-500/40 animate-pulse">
              Only {item.availableSlots} left today
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{item.rating.toFixed(2)}</span>
          <span className="text-gray-400 text-[10px]">({item.reviewCount})</span>
        </div>

        {/* Flight code or duration overlay */}
        {item.flightCode && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-mono font-semibold">
            {item.flightCode} • {item.aircraftOrStyle}
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin & Destination if flight */}
          {item.origin && (
            <div className="flex items-center gap-2 text-xs text-amber-300/80 font-mono mb-1.5">
              <span className="truncate max-w-[140px]">{item.origin.split('(')[0]}</span>
              <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate max-w-[140px]">{item.destination.split('(')[0]}</span>
            </div>
          )}

          <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs text-gray-300 line-clamp-2 leading-relaxed">
            {item.tagline}
          </p>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-[180px]">{item.destination}</span>
            </span>
            {item.durationOrNights && (
              <span className="flex items-center gap-1 shrink-0">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {item.durationOrNights}
              </span>
            )}
          </div>

          {/* Luxury Inclusions Preview */}
          <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
            {item.amenities.slice(0, 2).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Call to Action */}
        <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
              {item.type === 'flight' ? 'Per Royal Passenger' : 'Per Night Experience'}
            </p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
              {getConvertedPrice(item.pricePerUnit, currency)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Book this route directly on WhatsApp (074 480 5297)"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#25D366] bg-[#25D366]/15 hover:bg-[#25D366] hover:text-black border border-[#25D366]/40 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => onSelect(item)}
              className="px-3 py-2 rounded-xl text-xs font-medium text-amber-300 bg-white/5 hover:bg-white/10 border border-amber-500/30 transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => onQuickBook(item)}
              className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1"
            >
              Reserve
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

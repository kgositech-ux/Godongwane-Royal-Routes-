import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  Calendar, 
  Users, 
  Crown, 
  Check, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Booking } from '../types';

interface ModifyBookingModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    bookingId: string,
    updates: {
      startDate: string;
      endDate?: string;
      cabinOrRoomType: string;
      specialRequests: string;
      seatOrRoomNumber: string;
      passengersOrGuests: number;
      totalAmount: number;
      status: 'modified';
    }
  ) => Promise<void>;
  currency: string;
}

export const ModifyBookingModal: React.FC<ModifyBookingModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSave,
  currency
}) => {
  if (!isOpen || !booking) return null;

  const [startDate, setStartDate] = useState<string>(
    booking.startDate ? booking.startDate.split('T')[0] : ''
  );
  const [endDate, setEndDate] = useState<string>(
    booking.endDate ? booking.endDate.split('T')[0] : ''
  );
  const [cabinOrRoomType, setCabinOrRoomType] = useState<string>(booking.cabinOrRoomType);
  const [specialRequests, setSpecialRequests] = useState<string>(booking.specialRequests || '');
  const [seatOrRoomNumber, setSeatOrRoomNumber] = useState<string>(booking.seatOrRoomNumber || '');
  const [guests, setGuests] = useState<number>(booking.passengersOrGuests || 1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(booking.id, {
        startDate,
        endDate: booking.endDate ? endDate : undefined,
        cabinOrRoomType,
        specialRequests,
        seatOrRoomNumber,
        passengersOrGuests: guests,
        totalAmount: booking.totalAmount, // Retain royal guaranteed rate or adjust
        status: 'modified'
      });
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0c140e] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Modify Royal Reservation
              </h2>
              <p className="text-[11px] text-amber-300/80 font-mono">
                PNR: {booking.bookingReference} • {booking.title}
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

        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              As a Godongwane Royal Routes patron, modifications are free of administrative fees. Date shifts are subject to fleet & villa inventory availability.
            </p>
          </div>

          {/* Date controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1 flex items-center gap-1">
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

            {booking.endDate && (
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Return / Check-Out
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
          </div>

          {/* Cabin / Suite Class Upgrade Selection */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-3">
            <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1 flex items-center gap-1">
              <Crown className="w-3 h-3" /> Cabin Class / Villa Suite
            </label>
            <select
              value={cabinOrRoomType}
              onChange={(e) => setCabinOrRoomType(e.target.value)}
              className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              <option value="Royal First Suite" className="bg-gray-900 text-white">Royal First Suite (Enclosed with sliding door)</option>
              <option value="Crown Imperial Suite" className="bg-gray-900 text-white">Crown Imperial Suite (Double Bed & Private Shower)</option>
              <option value="Riverfront Royal Suite" className="bg-gray-900 text-white">Riverfront Royal Suite (Waterhole Overlook)</option>
              <option value="Godongwane Presidential Enclave" className="bg-gray-900 text-white">Godongwane Presidential Enclave (Private Compound & Ranger)</option>
              <option value="Executive Club Chair" className="bg-gray-900 text-white">Executive Club Chair (Panoramic Recliner)</option>
            </select>
          </div>

          {/* Seat / Suite Allocation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                Seat / Villa Allocation
              </label>
              <input
                type="text"
                placeholder="e.g. Suite 1A, Villa Sovereign 02"
                value={seatOrRoomNumber}
                onChange={(e) => setSeatOrRoomNumber(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none font-mono"
              />
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" /> Royal Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-gray-900 text-white">1 Guest</option>
                <option value={2} className="bg-gray-900 text-white">2 Guests</option>
                <option value={4} className="bg-gray-900 text-white">4 Guests</option>
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-3">
            <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
              Updated Concierge Requests & Dietary Notes
            </label>
            <textarea
              rows={3}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-transparent text-white text-xs focus:outline-none resize-none"
              placeholder="e.g. Change arrival champagne to Vintage Rosé, request Rolls-Royce tarmac pickup..."
            />
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Confirm Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

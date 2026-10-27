import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  Loader2,
  DollarSign
} from 'lucide-react';
import { Booking } from '../types';

interface CancelBookingModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (bookingId: string, reason: string) => Promise<void>;
  currency: string;
}

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  booking,
  isOpen,
  onClose,
  onConfirmCancel,
  currency
}) => {
  if (!isOpen || !booking) return null;

  const [reason, setReason] = useState<string>('Schedule change / Private engagement rescheduled');
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

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onConfirmCancel(booking.id, reason);
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#110e0e] border border-red-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-gradient-to-r from-red-950/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-400/50 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Cancel Royal Reservation
              </h2>
              <p className="text-[11px] text-red-300 font-mono">
                PNR: {booking.bookingReference}
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

        <form onSubmit={handleCancelSubmit} className="p-6 space-y-5">
          <div>
            <h3 className="text-base font-serif font-bold text-white">
              {booking.title}
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Scheduled for {new Date(booking.startDate).toLocaleDateString()}
            </p>
          </div>

          {/* Refund Notice Card */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Royal Refund Protection
              </span>
              <span className="text-sm font-serif font-bold text-emerald-400">
                100% Eligible
              </span>
            </div>
            <p className="text-xs text-gray-300">
              The full amount of{' '}
              <strong className="text-white font-mono">{formatPrice(booking.totalAmount)}</strong> will be credited directly back to your payment method ({booking.paymentMethod}) within 1 to 2 business days.
            </p>
          </div>

          {/* Reason Selector */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-3">
            <label className="block text-[11px] font-mono text-red-300 uppercase mb-1">
              Select Cancellation Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
            >
              <option value="Schedule change / Private engagement rescheduled" className="bg-gray-900 text-white">Schedule change / Private engagement rescheduled</option>
              <option value="Rebooking alternative Godongwane route" className="bg-gray-900 text-white">Rebooking alternative Godongwane route</option>
              <option value="Unforeseen personal or family reason" className="bg-gray-900 text-white">Unforeseen personal or family reason</option>
              <option value="Corporate / Delegation requirement change" className="bg-gray-900 text-white">Corporate / Delegation requirement change</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Keep Reservation
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Refund...</span>
                </>
              ) : (
                <span>Confirm Cancellation & Full Refund</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Loader2, 
  Crown, 
  Smartphone, 
  Building2,
  Calendar,
  Ticket,
  MapPin,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TravelInventoryItem, Booking } from '../types';
import { generateBookingReference } from '../services/bookingService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingConfig: {
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
  };
  userId: string;
  userEmail: string;
  currency: string;
  onPaymentSuccess: (booking: Booking) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingConfig,
  userId,
  userEmail,
  currency,
  onPaymentSuccess
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'crown_card' | 'card' | 'apple_pay' | 'wire'>('crown_card');
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 9821');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvc, setCardCvc] = useState<string>('842');
  const [cardHolder, setCardHolder] = useState<string>(bookingConfig.travelerName || 'Lord Kgosi Mthembu');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

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

  const handleAuthorize = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate luxury bank 3D-Secure biometric verification
    await new Promise((res) => setTimeout(res, 1800));

    const pnrRef = generateBookingReference('GRR');
    const newBooking: Booking = {
      id: '', // Will be assigned by service
      userId,
      userEmail,
      bookingReference: pnrRef,
      type: bookingConfig.item.type,
      title: bookingConfig.item.title,
      origin: bookingConfig.item.origin,
      destination: bookingConfig.item.destination,
      startDate: bookingConfig.startDate,
      endDate: bookingConfig.endDate,
      passengersOrGuests: bookingConfig.passengersOrGuests,
      cabinOrRoomType: bookingConfig.cabinOrRoomType,
      totalAmount: bookingConfig.totalAmount,
      currency,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod:
        paymentMethod === 'crown_card'
          ? 'Godongwane Royal Crown Black Card •••• 8821'
          : paymentMethod === 'card'
          ? `Private Visa Infinite •••• ${cardNumber.slice(-4)}`
          : paymentMethod === 'apple_pay'
          ? 'Apple Pay Biometric Pass'
          : 'Royal Treasury Wire Transfer',
      specialRequests: bookingConfig.specialRequests,
      flightNumber: bookingConfig.item.flightCode || 'GRR 800',
      seatOrRoomNumber: bookingConfig.item.type === 'flight' ? 'Suite 1A & 1B' : 'Villa Sovereign 01',
      notes: `Add-ons: ${bookingConfig.addons.join(', ')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setIsProcessing(false);
    setConfirmedBooking(newBooking);

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFD700', '#10B981', '#FFFFFF']
      });
    } catch (err) {
      // Ignore if unavailable
    }

    onPaymentSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b120c] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                {confirmedBooking ? 'Reservation Confirmed' : 'Royal Payment Gateway (256-Bit SSL)'}
              </h2>
              <p className="text-[11px] text-emerald-400 font-mono">
                {confirmedBooking ? 'E-Ticket Issued' : 'PCI-DSS Level 1 Encrypted Terminal'}
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

        {confirmedBooking ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/60 mx-auto flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Payment Authorized & Verified
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-3">
                Your Royal Voyage is Reserved
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto mt-2">
                Booking Reference PNR:{' '}
                <span className="font-mono font-bold text-amber-400 text-lg bg-black/50 px-2 py-0.5 rounded border border-amber-500/30">
                  {confirmedBooking.bookingReference}
                </span>
              </p>
            </div>

            {/* Travel Summary Card */}
            <div className="bg-black/40 border border-amber-500/30 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-gray-400 font-mono">EXPEDITION</span>
                <span className="font-serif font-bold text-white">{confirmedBooking.title}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block font-mono">PRIMARY TRAVELER</span>
                  <span className="font-semibold text-white">{bookingConfig.travelerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-mono">CLASS / SUITE</span>
                  <span className="font-semibold text-amber-300">{confirmedBooking.cabinOrRoomType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-mono">DEPARTURE / CHECK-IN</span>
                  <span className="font-semibold text-white">{confirmedBooking.startDate}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-mono">TOTAL CHARGED</span>
                  <span className="font-bold text-emerald-400">{formatPrice(confirmedBooking.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Go to Traveler Dashboard</span>
              </button>
            </div>
          </div>
        ) : (
          /* Payment Processing Form */
          <form onSubmit={handleAuthorize} className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Order Summary Snapshot */}
            <div className="bg-black/40 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-300/80 font-mono uppercase">Reservation Summary</p>
                <p className="font-serif font-bold text-white text-base mt-0.5">{bookingConfig.item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {bookingConfig.cabinOrRoomType} • {bookingConfig.passengersOrGuests} Guest(s)
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-mono">Amount Due</span>
                <p className="text-xl font-serif font-bold text-amber-400">
                  {formatPrice(bookingConfig.totalAmount)}
                </p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                Select Royal Payment Instrument
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crown_card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'crown_card'
                      ? 'border-amber-400 bg-amber-500/20 text-white shadow-md'
                      : 'border-white/10 bg-black/30 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-[11px] font-medium">Royal Black Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-amber-400 bg-amber-500/20 text-white shadow-md'
                      : 'border-white/10 bg-black/30 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span className="text-[11px] font-medium">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'apple_pay'
                      ? 'border-amber-400 bg-amber-500/20 text-white shadow-md'
                      : 'border-white/10 bg-black/30 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  <span className="text-[11px] font-medium">Apple / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'wire'
                      ? 'border-amber-400 bg-amber-500/20 text-white shadow-md'
                      : 'border-white/10 bg-black/30 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <span className="text-[11px] font-medium">Treasury Wire</span>
                </button>
              </div>
            </div>

            {/* Simulated Card Fields */}
            {paymentMethod === 'crown_card' && (
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-5 rounded-2xl border border-amber-500/40 relative shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-amber-400 font-serif font-bold text-sm">
                    <Crown className="w-4 h-4" />
                    <span>GODONGWANE ROYAL CROWN CARD</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                    UNLIMITED LINE
                  </span>
                </div>
                <div className="font-mono text-lg tracking-widest text-amber-200 mb-4">
                  4820 •••• •••• 8821
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <div>
                    <span className="text-[9px] block">CARDHOLDER</span>
                    <span className="text-white uppercase">{bookingConfig.travelerName || 'ROYAL TRAVELER'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] block">EXPIRES</span>
                    <span className="text-white">12/32</span>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                  <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-transparent text-white font-mono text-sm focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                    <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-transparent text-white font-mono text-sm focus:outline-none"
                    />
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                    <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="password"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-transparent text-white font-mono text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Authorize Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl font-serif font-bold text-sm tracking-widest uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying 3D-Secure Biometric Authorization...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Payment of {formatPrice(bookingConfig.totalAmount)}</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Guaranteed by Godongwane Royal Treasury • Automatic Itinerary Confirmation
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

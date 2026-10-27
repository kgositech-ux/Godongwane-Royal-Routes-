import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Crown, 
  Plane, 
  QrCode, 
  MapPin, 
  HardDriveDownload,
  ShieldCheck,
  Check,
  CalendarPlus
} from 'lucide-react';
import { Booking } from '../types';
import { downloadBookingIcs } from '../utils/calendarIcs';

interface BoardingPassModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onExportToDrive: (booking: Booking) => void;
  currency: string;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  booking,
  isOpen,
  onClose,
  onExportToDrive,
  currency
}) => {
  const [reminderSaved, setReminderSaved] = useState<boolean>(false);

  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSetReminder = () => {
    downloadBookingIcs(booking);
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0c140e] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden flex flex-col">
        {/* Header Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-serif font-bold text-white tracking-wide">
              Official Royal Boarding Pass & Itinerary Voucher
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSetReminder}
              title="Set Trip Reminder in Calendar (.ics)"
              className="px-3 py-1.5 rounded-lg text-xs bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {reminderSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reminder Added</span>
                </>
              ) : (
                <>
                  <CalendarPlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Trip Reminder</span>
                </>
              )}
            </button>
            <button
              onClick={() => onExportToDrive(booking)}
              className="px-3 py-1.5 rounded-lg text-xs bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <HardDriveDownload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Drive Sync</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Boarding Pass Canvas Card */}
        <div className="p-6 sm:p-8 overflow-y-auto print:p-0">
          <div className="bg-gradient-to-b from-[#111d13] to-[#0a110a] border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl relative text-white">
            {/* Top Royal Band */}
            <div className="bg-gradient-to-r from-amber-900/80 via-[#1c3021] to-amber-900/80 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold tracking-widest text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                    GODONGWANE ROYAL ROUTES
                  </h3>
                  <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                    First Class Sovereign Sky Liner & Sanctuary Pass
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">PNR REFERENCE</span>
                <span className="font-mono text-base font-bold text-amber-300 bg-black/60 px-2.5 py-0.5 rounded border border-amber-500/40">
                  {booking.bookingReference}
                </span>
              </div>
            </div>

            {/* Main Pass Info Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Left Route & Flight Details */}
              <div className="md:col-span-2 space-y-5">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                    VOYAGE & EXPEDITION
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                    {booking.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-amber-300 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{booking.origin ? `${booking.origin} → ${booking.destination}` : booking.destination}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">PRIMARY TRAVELER</span>
                    <span className="font-semibold text-white text-sm">
                      {booking.userEmail.split('@')[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">ROYAL CLASS</span>
                    <span className="font-semibold text-amber-300 text-sm">
                      {booking.cabinOrRoomType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">FLIGHT / VILLA</span>
                    <span className="font-semibold text-emerald-400 text-sm font-mono">
                      {booking.flightNumber || 'GRR 101'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">SUITE / SEAT</span>
                    <span className="font-semibold text-white text-sm font-mono">
                      {booking.seatOrRoomNumber || 'Suite 1A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">DEPARTURE DATE</span>
                    <span className="font-semibold text-white text-sm">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">BOARDING TIME</span>
                    <span className="font-semibold text-amber-300 text-sm font-mono">
                      08:45 AM
                    </span>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="bg-black/30 p-3 rounded-xl border border-white/5 text-[11px] text-gray-300">
                    <strong className="text-amber-400 font-mono uppercase text-[10px] block mb-0.5">
                      CONCIERGE SPECIAL ARRANGEMENTS
                    </strong>
                    {booking.specialRequests}
                  </div>
                )}
              </div>

              {/* Right Cut-out Stub / Barcode */}
              <div className="border-t md:border-t-0 md:border-l border-dashed border-amber-500/30 pt-6 md:pt-0 md:pl-6 flex flex-col items-center justify-between text-center space-y-4">
                <div className="w-full">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block tracking-wider">
                    FAST-TRACK GATE
                  </span>
                  <span className="text-3xl font-serif font-bold text-white">
                    ROYAL 1A
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                    Terminal VIP Sovereign
                  </span>
                </div>

                {/* Simulated QR Code Graphic */}
                <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-amber-400">
                  <div className="w-28 h-28 bg-black flex flex-col items-center justify-center p-2 rounded-lg">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                </div>

                <div className="w-full">
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">STATUS</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    CONFIRMED & READY
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Barcode Strip */}
            <div className="bg-black/80 px-6 py-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between text-[10px] font-mono text-gray-400 gap-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED BIOMETRIC PASS
              </span>
              <span className="tracking-widest">
                |||||| | |||| ||| ||||||| |||| || |||||||| |||| | ||||||
              </span>
              <span>ISSUED BY GODONGWANE ROYAL DESK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

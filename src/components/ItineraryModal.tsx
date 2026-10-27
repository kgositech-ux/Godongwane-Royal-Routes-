import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  MapPin, 
  Clock, 
  HardDriveDownload, 
  Printer, 
  Sparkles,
  PlaneTakeoff,
  Hotel,
  Car,
  Utensils,
  Sun,
  ShieldCheck,
  CheckCircle2,
  CalendarPlus,
  Check
} from 'lucide-react';
import { Booking, ItineraryDay } from '../types';
import { generateItineraryForBooking } from '../services/bookingService';
import { downloadBookingIcs } from '../utils/calendarIcs';

interface ItineraryModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onExportToDrive: (booking: Booking) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  booking,
  isOpen,
  onClose,
  onExportToDrive
}) => {
  const [reminderSaved, setReminderSaved] = useState<boolean>(false);

  if (!isOpen || !booking) return null;

  const handleSetReminder = () => {
    downloadBookingIcs(booking);
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 3000);
  };

  const schedule: ItineraryDay[] = generateItineraryForBooking(booking);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-5 h-5 text-amber-400" />;
      case 'Hotel':
        return <Hotel className="w-5 h-5 text-emerald-400" />;
      case 'Car':
        return <Car className="w-5 h-5 text-cyan-400" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-yellow-400" />;
      default:
        return <Compass className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0c140e] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Interactive Royal Travel Itinerary
              </h2>
              <p className="text-[11px] text-amber-300/80 font-mono">
                {booking.bookingReference} • {booking.title}
              </p>
            </div>
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
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Trip Header Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-black to-amber-950/30 p-5 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                DESTINATION & CORRIDOR
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                {booking.destination}
              </h3>
              <p className="text-xs text-gray-300 mt-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Commencing {new Date(booking.startDate).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-amber-300 font-mono">{booking.cabinOrRoomType}</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">STATUS</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 inline-block mt-0.5">
                Active Itinerary Confirmed
              </span>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-8">
            {schedule.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#0b130c] border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">
                  {getStepIcon(item.iconName)}
                </div>

                <div className="bg-black/40 border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        {item.time}
                      </span>
                      {item.highlightBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-medium">
                          {item.highlightBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Weather & Concierge Insights */}
          <div className="bg-[#121c13] border border-amber-500/20 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-mono text-amber-400 uppercase text-[10px] block mb-1">
                DESTINATION CLIMATE & ATTIRE
              </span>
              <p className="text-gray-300 leading-relaxed">
                Expect warm sunny afternoons (26°C / 79°F) and crisp evening bush breezes. Light linen attire recommended for transit and neutral earth tones for morning safari game drives.
              </p>
            </div>
            <div>
              <span className="font-mono text-emerald-400 uppercase text-[10px] block mb-1">
                LUGGAGE & CHAUFFEUR DIRECTIVE
              </span>
              <p className="text-gray-300 leading-relaxed">
                Your luggage is tagged with Royal VIP tags. Tarmac luggage transfer directly into your private suite is handled seamlessly by your route liaison.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

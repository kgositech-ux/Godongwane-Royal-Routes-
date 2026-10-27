import React, { useState } from 'react';
import { 
  Calendar, 
  Plane, 
  Hotel, 
  Palmtree, 
  Sparkles, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  Edit3, 
  Trash2, 
  Ticket, 
  Compass, 
  MessageSquare, 
  ShieldCheck, 
  Crown,
  Search,
  Filter,
  ArrowRight,
  RefreshCw,
  CalendarPlus,
  Bell,
  HardDriveDownload
} from 'lucide-react';
import { Booking, BookingStatus, UserProfile } from '../types';
import { downloadBookingIcs } from '../utils/calendarIcs';

interface DashboardProps {
  bookings: Booking[];
  user: UserProfile | null;
  currency: string;
  onModifyBooking: (booking: Booking) => void;
  onCancelBooking: (booking: Booking) => void;
  onViewBoardingPass: (booking: Booking) => void;
  onViewItinerary: (booking: Booking) => void;
  onContactConcierge: (booking: Booking) => void;
  onExploreRoutes: () => void;
  onSetTripReminder?: (booking: Booking) => void;
  onOpenDriveExport?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  bookings,
  user,
  currency,
  onModifyBooking,
  onCancelBooking,
  onViewBoardingPass,
  onViewItinerary,
  onContactConcierge,
  onExploreRoutes,
  onSetTripReminder,
  onOpenDriveExport
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reminderSetPnr, setReminderSetPnr] = useState<string | null>(null);

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

  const handleCopyPnr = (pnr: string) => {
    navigator.clipboard.writeText(pnr);
    setCopiedId(pnr);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSetTripReminder = (booking: Booking) => {
    downloadBookingIcs(booking);
    setReminderSetPnr(booking.bookingReference);
    setTimeout(() => setReminderSetPnr(null), 3500);
    if (onSetTripReminder) {
      onSetTripReminder(booking);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    // Status filter
    if (filterStatus === 'active' && (b.status === 'cancelled' || b.status === 'completed')) return false;
    if (filterStatus === 'completed' && b.status !== 'completed') return false;
    if (filterStatus === 'cancelled' && b.status !== 'cancelled') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchPnr = b.bookingReference.toLowerCase().includes(q);
      const matchTitle = b.title.toLowerCase().includes(q);
      const matchDest = b.destination.toLowerCase().includes(q);
      return matchPnr || matchTitle || matchDest;
    }
    return true;
  });

  // Calculate stats
  const activeCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'checked_in' || b.status === 'modified').length;
  const totalInvestment = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.totalAmount : sum, 0);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Confirmed
          </span>
        );
      case 'modified':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-amber-400" />
            Modified
          </span>
        );
      case 'checked_in':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/40 flex items-center gap-1">
            <Check className="w-3 h-3 text-blue-400" />
            Checked In
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-red-950/80 text-red-300 border border-red-500/40">
            Cancelled & Refunded
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-gray-800 text-gray-300 border border-gray-600">
            Voyage Completed
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Traveler VIP Membership Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0c180f] via-[#09110a] to-[#121c13] border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-xl">
              <div className="w-full h-full bg-[#0a120a] rounded-[14px] flex items-center justify-center">
                <Crown className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {user ? user.displayName : 'Royal Traveler'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {user?.memberTier || 'Royal Emerald'}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1 font-mono">
                Member ID: <span className="text-amber-400">{user?.id ? user.id.slice(0, 10).toUpperCase() : 'GRR-VIP-001'}</span> •{' '}
                <span className="text-emerald-400 font-semibold">{user?.pointsBalance || 12500} Royal Points Earned</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-3 sm:gap-6 bg-black/40 border border-amber-500/20 rounded-2xl p-4 justify-between sm:justify-start">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                  Active Itineraries
                </span>
                <span className="text-xl font-serif font-bold text-amber-400">
                  {activeCount} Voyages
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                  Total Royal Value
                </span>
                <span className="text-xl font-serif font-bold text-white">
                  {formatPrice(totalInvestment)}
                </span>
              </div>
            </div>

            {onOpenDriveExport && (
              <button
                onClick={onOpenDriveExport}
                title="Add All Projects to Google Drive"
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#0a2313] to-emerald-900/60 hover:from-emerald-900 hover:to-emerald-800 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-lg group shrink-0"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <HardDriveDownload className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white leading-tight">
                    Add to Google Drive
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Sync All {bookings.length} Projects
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-xs overflow-x-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            All Reservations ({bookings.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'active'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Active & Upcoming ({activeCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'completed'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'cancelled'
                ? 'bg-amber-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PNR reference, route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c140e] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-[#0b120c] border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            No Reservations Found
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {searchQuery
              ? 'No reservations matched your search query. Try another keyword or PNR reference.'
              : 'You do not have any travel bookings matching this filter. Schedule a royal private flight or sanctuary escape now.'}
          </p>
          <button
            onClick={onExploreRoutes}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Explore Royal Routes
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isCancelled = booking.status === 'cancelled';
            return (
              <div
                key={booking.id}
                className={`bg-[#0c140e] border rounded-2xl overflow-hidden shadow-xl transition-all ${
                  isCancelled
                    ? 'border-red-950/40 opacity-75'
                    : 'border-amber-500/20 hover:border-amber-400/40'
                }`}
              >
                {/* Top PNR Header Bar */}
                <div className="px-5 py-3 bg-black/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-mono">PNR REFERENCE:</span>
                    <span className="font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {booking.bookingReference}
                    </span>
                    <button
                      onClick={() => handleCopyPnr(booking.bookingReference)}
                      title="Copy Reference"
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedId === booking.bookingReference ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-mono text-[11px]">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>

                {/* Main Body */}
                <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Route / Destination Details */}
                  <div className="lg:col-span-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono">
                      {booking.type === 'flight' && <Plane className="w-3.5 h-3.5" />}
                      {booking.type === 'hotel' && <Hotel className="w-3.5 h-3.5" />}
                      {booking.type === 'resort' && <Palmtree className="w-3.5 h-3.5" />}
                      {booking.type === 'package' && <Sparkles className="w-3.5 h-3.5" />}
                      <span className="uppercase font-semibold tracking-wider">
                        {booking.type}
                      </span>
                      {booking.flightNumber && (
                        <span>• {booking.flightNumber}</span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white">
                      {booking.title}
                    </h3>

                    {booking.origin && (
                      <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                        <span>{booking.origin}</span>
                        <ArrowRight className="w-3 h-3 text-amber-400" />
                        <span>{booking.destination}</span>
                      </div>
                    )}

                    <div className="text-xs text-emerald-400 font-mono">
                      {booking.cabinOrRoomType} • {booking.seatOrRoomNumber || 'Assigned Suite'}
                    </div>

                    {booking.specialRequests && (
                      <p className="text-[11px] text-gray-400 italic line-clamp-1 bg-black/20 p-1.5 rounded">
                        Special Requests: {booking.specialRequests}
                      </p>
                    )}
                  </div>

                  {/* Center: Timing & Dates */}
                  <div className="lg:col-span-3 space-y-2 text-xs border-y lg:border-y-0 lg:border-x border-white/10 py-3 lg:py-0 lg:px-6">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                        Departure / Check-In
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {new Date(booking.startDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {booking.endDate && (
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                          Return / Check-Out
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {new Date(booking.endDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                        Travelers / Party
                      </span>
                      <span className="font-semibold text-gray-200">
                        {booking.passengersOrGuests} Royal Guest(s)
                      </span>
                    </div>
                  </div>

                  {/* Right: Pricing & Self-Service Actions */}
                  <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-4">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                        {isCancelled ? 'Refunded Total' : 'Total Investment'}
                      </span>
                      <span className={`text-xl font-serif font-bold ${isCancelled ? 'text-gray-400 line-through' : 'text-amber-400'}`}>
                        {formatPrice(booking.totalAmount)}
                      </span>
                      <span className="block text-[10px] text-emerald-400 font-mono">
                        {booking.paymentMethod}
                      </span>
                    </div>

                    {/* Self-Management Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Set Trip Reminder (.ics) */}
                      {!isCancelled && (
                        <button
                          onClick={() => handleSetTripReminder(booking)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            reminderSetPnr === booking.bookingReference
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/30'
                              : 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                          }`}
                          title="Add this booking date to your local calendar (Apple, Outlook, Google) via .ics download"
                        >
                          {reminderSetPnr === booking.bookingReference ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Reminder Added!</span>
                            </>
                          ) : (
                            <>
                              <CalendarPlus className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Set Trip Reminder</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Boarding Pass / E-Ticket */}
                      <button
                        onClick={() => onViewBoardingPass(booking)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Ticket className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pass</span>
                      </button>

                      {/* Interactive Itinerary View */}
                      <button
                        onClick={() => onViewItinerary(booking)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>Itinerary</span>
                      </button>

                      {/* Modify Reservation */}
                      {!isCancelled && (
                        <button
                          onClick={() => onModifyBooking(booking)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Modify</span>
                        </button>
                      )}

                      {/* Cancel Reservation */}
                      {!isCancelled && (
                        <button
                          onClick={() => onCancelBooking(booking)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/40 transition-colors cursor-pointer"
                          title="Cancel Reservation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Concierge Message */}
                      <button
                        onClick={() => onContactConcierge(booking)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors cursor-pointer"
                        title="Chat with Royal Concierge regarding this booking"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

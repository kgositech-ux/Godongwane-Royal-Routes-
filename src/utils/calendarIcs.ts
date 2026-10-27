import { Booking } from '../types';

/**
 * Formats a Date object or ISO string to UTC iCalendar format (YYYYMMDDTHHMMSSZ)
 */
function formatDateToIcs(dateInput: string | Date, isAllDay: boolean = false): string {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) {
    // Fallback to today + 5 days
    const fallback = new Date(Date.now() + 86400000 * 5);
    return fallback.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const year = d.getUTCFullYear();
  const month = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  const hours = pad(d.getUTCHours());
  const minutes = pad(d.getUTCMinutes());
  const seconds = pad(d.getUTCSeconds());

  if (isAllDay) {
    return `${year}${month}${day}`;
  }

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates and triggers the download of an .ics file for a booking
 */
export function downloadBookingIcs(booking: Booking): void {
  const now = new Date();
  const dtStamp = formatDateToIcs(now);

  const startDate = new Date(booking.startDate);
  // If startDate doesn't have specific time (e.g., date-only string), set to 09:00 AM UTC
  if (!booking.startDate.includes('T')) {
    startDate.setUTCHours(9, 0, 0, 0);
  }
  const dtStart = formatDateToIcs(startDate);

  let endDate: Date;
  if (booking.endDate) {
    endDate = new Date(booking.endDate);
    if (!booking.endDate.includes('T')) {
      endDate.setUTCHours(18, 0, 0, 0);
    }
  } else if (booking.type === 'flight') {
    // 3 hours default flight duration
    endDate = new Date(startDate.getTime() + 3 * 3600000);
  } else {
    // 1 day default stay
    endDate = new Date(startDate.getTime() + 24 * 3600000);
  }
  const dtEnd = formatDateToIcs(endDate);

  const uid = `${booking.bookingReference}-${booking.id || Date.now()}@godongwane-royal.co.za`;
  const location = booking.origin
    ? `${booking.origin} -> ${booking.destination}`
    : booking.destination;

  const description = [
    `Godongwane Royal Routes - Official Travel Itinerary`,
    `PNR Reference: ${booking.bookingReference}`,
    `Expedition: ${booking.title}`,
    `Class / Suite: ${booking.cabinOrRoomType}`,
    `Assigned: ${booking.seatOrRoomNumber || 'VIP Allocation'}`,
    `Guests: ${booking.passengersOrGuests}`,
    booking.specialRequests ? `Special Concierge Requests: ${booking.specialRequests}` : '',
    `Liaison Hotline: +27 (0) 11 884 9000 (VIP Operations Wing)`,
    `Customer Service: concierge@godongwane-royal.co.za`
  ]
    .filter(Boolean)
    .join('\\n');

  const summary = `Godongwane Royal Routes: ${booking.title} (${booking.bookingReference})`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Godongwane Royal Routes//Travel Itinerary Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Godongwane Royal Routes',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${description.replace(/,/g, '\\,')}`,
    `LOCATION:${location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    // 24 Hour Reminder Alarm
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Upcoming Voyage with Godongwane Royal Routes (${booking.bookingReference})`,
    'END:VALARM',
    // 2 Hour Reminder Alarm for Day-of-Departure/Check-in
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Departure in 2 Hours - Tarmac Chauffeur on Standby (${booking.bookingReference})`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Godongwane_Trip_Reminder_${booking.bookingReference}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

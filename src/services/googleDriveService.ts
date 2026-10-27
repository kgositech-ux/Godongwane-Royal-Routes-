/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Booking } from '../types';
import { generateItineraryForBooking } from './bookingService';

export interface DriveUploadResult {
  id: string;
  name: string;
  webViewLink?: string;
}

export interface DriveExportResult {
  folderId: string;
  folderName: string;
  folderLink?: string;
  files: DriveUploadResult[];
}

/**
 * Creates a dedicated folder in Google Drive.
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string
): Promise<{ id: string; name: string; webViewLink?: string }> {
  const metadata = {
    name: folderName,
    mimeType: 'application/vnd.google.apps.folder',
  };

  const response = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create folder (${response.status})`);
  }

  return await response.json();
}

/**
 * Uploads a text or json file to Google Drive using multipart upload.
 */
export async function uploadFileToDrive(
  accessToken: string,
  fileName: string,
  content: string,
  mimeType: string,
  parentFolderId?: string
): Promise<DriveUploadResult> {
  const boundary = '-------GodongwaneRoyalRoutesBoundary' + Math.random().toString(36).substring(2);
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const fileMetadata: Record<string, any> = {
    name: fileName,
    mimeType: mimeType,
  };

  if (parentFolderId) {
    fileMetadata.parents = [parentFolderId];
  }

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(fileMetadata) +
    delimiter +
    `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
    content +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to upload ${fileName} (${response.status})`);
  }

  return await response.json();
}

/**
 * Generates an executive master itinerary summary text document.
 */
function buildMasterItineraryText(bookings: Booking[], userName: string): string {
  const now = new Date().toLocaleString('en-ZA', { dateStyle: 'full', timeStyle: 'short' });
  const lines: string[] = [
    '========================================================================',
    '                   GODONGWANE ROYAL ROUTES                     ',
    '            SOVEREIGN TRAVEL PORTFOLIO & MASTER DOSSIER         ',
    '========================================================================',
    '',
    `PATRON: ${userName.toUpperCase()}`,
    `DATE EXPORTED: ${now}`,
    `TOTAL RESERVATIONS / PROJECTS: ${bookings.length}`,
    `CURRENCY: ZAR (South African Rands)`,
    '',
    '------------------------------------------------------------------------',
    'PROJECT OVERVIEW & RESERVATION SUMMARY',
    '------------------------------------------------------------------------',
  ];

  bookings.forEach((b, idx) => {
    lines.push(
      `\n[PROJECT #${idx + 1}] ${b.title.toUpperCase()}`,
      `  • PNR Reference: ${b.bookingReference}`,
      `  • Type: ${b.type.toUpperCase()}`,
      `  • Status: ${b.status.toUpperCase()}`,
      `  • Origin: ${b.origin || 'VIP Terminal / Private Apron'}`,
      `  • Destination: ${b.destination}`,
      `  • Travel Date: ${b.startDate}${b.endDate ? ` to ${b.endDate}` : ''}`,
      `  • Suite / Class: ${b.cabinOrRoomType}`,
      `  • Assigned Unit: ${b.seatOrRoomNumber || 'Priority Allocation'}`,
      `  • Guests: ${b.passengersOrGuests}`,
      `  • Total Value: ${b.currency} ${b.totalAmount.toLocaleString()}`,
      `  • Payment Status: ${b.paymentStatus.toUpperCase()}`,
      `  • Special Requests: ${b.specialRequests || 'Standard Royal Protocol'}`
    );

    // Add Itinerary schedule
    const schedule = generateItineraryForBooking(b);
    if (schedule.length > 0) {
      lines.push('  • Royal Itinerary Highlights:');
      schedule.forEach((item) => {
        lines.push(`     * [Day ${item.dayNumber} - ${item.time}] ${item.title} (${item.location})`);
        lines.push(`       ${item.description}`);
      });
    }
  });

  lines.push(
    '',
    '========================================================================',
    '                     24/7 ROYAL CONCIERGE DESK                         ',
    '  Telephone (VIP Wing): +27 (0) 11 884 9000                             ',
    '  Liaison Email: concierge@godongwane-royal.co.za                       ',
    '  Head of Concierge: Lady Naledi Khumalo                                ',
    '========================================================================',
    'Thank you for selecting Godongwane Royal Routes for your sovereign voyages.'
  );

  return lines.join('\n');
}

/**
 * Builds individual project itinerary document text.
 */
function buildIndividualBookingText(booking: Booking, userName: string): string {
  const schedule = generateItineraryForBooking(booking);
  const lines: string[] = [
    '========================================================================',
    `GODONGWANE ROYAL ROUTES - ${booking.title.toUpperCase()}`,
    '========================================================================',
    `PATRON: ${userName}`,
    `PNR RECORD LOCATOR: ${booking.bookingReference}`,
    `SERVICE TYPE: ${booking.type.toUpperCase()}`,
    `STATUS: ${booking.status.toUpperCase()}`,
    `DATES: ${booking.startDate}${booking.endDate ? ` to ${booking.endDate}` : ''}`,
    `ROUTE / DESTINATION: ${booking.origin ? `${booking.origin} -> ` : ''}${booking.destination}`,
    `CLASS / SUITE: ${booking.cabinOrRoomType}`,
    `ALLOCATION: ${booking.seatOrRoomNumber || 'Executive Priority'}`,
    `GUESTS: ${booking.passengersOrGuests}`,
    `TOTAL VALUE: ${booking.currency} ${booking.totalAmount.toLocaleString()}`,
    `PAYMENT: ${booking.paymentStatus.toUpperCase()} (PCI-DSS Encrypted)`,
    `SPECIAL PREFERENCES: ${booking.specialRequests || 'Royal Executive Protocol'}`,
    '',
    '------------------------------------------------------------------------',
    'DAY-BY-DAY CURATED ROYAL ITINERARY',
    '------------------------------------------------------------------------',
  ];

  schedule.forEach((item) => {
    lines.push(`\n[DAY ${item.dayNumber} - ${item.time}] ${item.title}`);
    lines.push(`  Location: ${item.location}`);
    lines.push(`  Details: ${item.description}`);
  });

  lines.push(
    '',
    '------------------------------------------------------------------------',
    'ARRIVAL & CHAUFFEUR PROTOCOL',
    '------------------------------------------------------------------------',
    '1. VIP Tarmac Escort: Your name placard will be held by our station coordinator.',
    '2. Armored Luggage Handling: Baggage is cleared directly to your suite.',
    '3. Rolls-Royce Cullinan or Private Helicopter: Available at your liaison time.',
    '',
    'Concierge Line: +27 (0) 11 884 9000 | concierge@godongwane-royal.co.za'
  );

  return lines.join('\n');
}

/**
 * Uploads all projects/reservations to Google Drive into a dedicated folder.
 */
export async function exportAllProjectsToGoogleDrive(
  accessToken: string,
  bookings: Booking[],
  userName: string,
  onProgress?: (progressText: string, currentStep: number, totalSteps: number) => void
): Promise<DriveExportResult> {
  const folderDate = new Date().toISOString().split('T')[0];
  const folderName = `Godongwane Royal Routes - Travel Projects (${folderDate})`;

  const totalSteps = 2 + bookings.length;
  let currentStep = 0;

  // Step 1: Create dedicated folder
  if (onProgress) {
    onProgress(`Creating Google Drive folder "${folderName}"...`, ++currentStep, totalSteps);
  }
  const folder = await createDriveFolder(accessToken, folderName);

  const uploadedFiles: DriveUploadResult[] = [];

  // Step 2: Upload Master JSON dossier
  if (onProgress) {
    onProgress('Uploading Master Project Dossier (JSON)...', ++currentStep, totalSteps);
  }
  const dossierData = {
    agency: 'Godongwane Royal Routes',
    patron: userName,
    exportedAt: new Date().toISOString(),
    totalBookingsCount: bookings.length,
    bookings: bookings.map((b) => ({
      bookingReference: b.bookingReference,
      type: b.type,
      title: b.title,
      origin: b.origin || 'Executive Terminal',
      destination: b.destination,
      startDate: b.startDate,
      endDate: b.endDate || 'Same-day schedule',
      cabinOrRoomType: b.cabinOrRoomType,
      seatOrRoomNumber: b.seatOrRoomNumber,
      status: b.status,
      totalAmount: `${b.currency} ${b.totalAmount.toLocaleString()}`,
      paymentStatus: b.paymentStatus,
      specialRequests: b.specialRequests || 'Standard Royal Treatment',
    })),
  };

  const jsonUpload = await uploadFileToDrive(
    accessToken,
    `Godongwane_All_Projects_Summary_${folderDate}.json`,
    JSON.stringify(dossierData, null, 2),
    'application/json',
    folder.id
  );
  uploadedFiles.push(jsonUpload);

  // Step 3: Upload Master Itinerary text document
  const masterItineraryContent = buildMasterItineraryText(bookings, userName);
  const masterUpload = await uploadFileToDrive(
    accessToken,
    `Godongwane_Master_Travel_Dossier_${folderDate}.txt`,
    masterItineraryContent,
    'text/plain',
    folder.id
  );
  uploadedFiles.push(masterUpload);

  // Step 4: Upload each individual booking / project document
  for (let i = 0; i < bookings.length; i++) {
    const b = bookings[i];
    if (onProgress) {
      onProgress(
        `Uploading project document ${i + 1}/${bookings.length} (${b.bookingReference})...`,
        ++currentStep,
        totalSteps
      );
    }
    const safeTitle = b.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const docName = `Project_${b.bookingReference}_${safeTitle}.txt`;
    const docContent = buildIndividualBookingText(b, userName);

    const fileUpload = await uploadFileToDrive(
      accessToken,
      docName,
      docContent,
      'text/plain',
      folder.id
    );
    uploadedFiles.push(fileUpload);
  }

  return {
    folderId: folder.id,
    folderName: folder.name,
    folderLink: folder.webViewLink || `https://drive.google.com/drive/folders/${folder.id}`,
    files: uploadedFiles,
  };
}

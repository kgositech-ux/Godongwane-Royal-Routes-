/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  HardDriveDownload, 
  Crown, 
  CheckCircle2, 
  FileText, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Loader2,
  FolderSync,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { Booking } from '../types';
import { getCachedAccessToken, ensureGoogleDriveToken } from '../firebase';
import { 
  exportAllProjectsToGoogleDrive, 
  DriveExportResult 
} from '../services/googleDriveService';

interface GoogleDriveExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  userName: string;
}

export const GoogleDriveExportModal: React.FC<GoogleDriveExportModalProps> = ({
  isOpen,
  onClose,
  bookings,
  userName
}) => {
  if (!isOpen) return null;

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<{ text: string; current: number; total: number } | null>(null);
  const [syncResult, setSyncResult] = useState<DriveExportResult | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [confirmPending, setConfirmPending] = useState<boolean>(true);

  // Fallback local backup download
  const handleDownloadLocalBackup = () => {
    const dossier = {
      agency: 'Godongwane Royal Routes',
      patron: userName || 'Royal Patron',
      exportedAt: new Date().toISOString(),
      activeVoyagesCount: bookings.length,
      bookings: bookings.map((b) => ({
        bookingReference: b.bookingReference,
        type: b.type,
        title: b.title,
        origin: b.origin || 'Executive Terminal',
        destination: b.destination,
        startDate: b.startDate,
        endDate: b.endDate || 'Same-day arrival',
        cabinOrRoomType: b.cabinOrRoomType,
        seatOrRoomNumber: b.seatOrRoomNumber,
        status: b.status,
        totalAmount: `${b.currency} ${b.totalAmount.toLocaleString()}`,
        paymentStatus: b.paymentStatus,
        specialRequests: b.specialRequests || 'Standard Royal Treatment'
      }))
    };

    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Godongwane_Royal_Routes_Dossier_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Live direct Google Drive upload
  const handleProceedGoogleDriveUpload = async () => {
    setConfirmPending(false);
    setIsSyncing(true);
    setSyncError(null);

    try {
      // Ensure we have Google Drive access token
      const token = await ensureGoogleDriveToken();

      const result = await exportAllProjectsToGoogleDrive(
        token,
        bookings,
        userName || 'Royal Patron',
        (text, current, total) => {
          setSyncProgress({ text, current, total });
        }
      );

      setSyncResult(result);
    } catch (err: any) {
      console.error('Google Drive Sync error:', err);
      setSyncError(err.message || 'An error occurred while uploading to Google Drive.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0c140e] border border-emerald-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <HardDriveDownload className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Google Drive Travel Dossier Sync
              </h2>
              <p className="text-[11px] text-emerald-300 font-mono">
                Add All Travel Projects & Documents to Google Drive
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

        <div className="p-6 space-y-6">
          {/* Explanation */}
          <p className="text-xs text-gray-300 leading-relaxed">
            Archive all your Godongwane Royal Routes flight reservations, safari sanctuaries, and day-by-day expedition itineraries directly to your personal Google Drive in an organized folder.
          </p>

          {/* Portfolio Breakdown */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                PORTFOLIO CONTENTS ({bookings.length} TRAVEL PROJECTS)
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                1 Master Dossier + {bookings.length} Project Docs
              </span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
              {bookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white truncate">{b.title}</span>
                  </div>
                  <span className="font-mono text-amber-300 text-[11px] shrink-0">
                    {b.bookingReference}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* STATE 1: Error Display */}
          {syncError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Upload Failed</span>
              </div>
              <p className="text-gray-300 text-[11px]">{syncError}</p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleProceedGoogleDriveUpload}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/40 text-xs cursor-pointer"
                >
                  Retry Upload
                </button>
                <button
                  onClick={handleDownloadLocalBackup}
                  className="text-xs text-amber-300 underline cursor-pointer"
                >
                  Download Local Backup Instead
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: Sync in Progress */}
          {isSyncing && (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <div>
                <h4 className="text-sm font-serif font-bold text-white">
                  Adding Projects to Google Drive...
                </h4>
                <p className="text-xs text-emerald-300/90 mt-1 font-mono">
                  {syncProgress ? syncProgress.text : 'Contacting Google Drive API...'}
                </p>
              </div>
              {syncProgress && (
                <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-emerald-500/30">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300"
                    style={{ width: `${(syncProgress.current / syncProgress.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* STATE 3: Sync Completed Successfully */}
          {syncResult && !isSyncing && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-white">
                  All Projects Added to Google Drive!
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  Folder <span className="text-emerald-300 font-semibold font-mono">"{syncResult.folderName}"</span> and {syncResult.files.length} travel project dossiers are now preserved in your Google Drive.
                </p>
              </div>

              {/* Uploaded Documents List */}
              <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-left max-h-32 overflow-y-auto space-y-1.5 text-xs">
                {syncResult.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between py-0.5 text-gray-300 text-[11px]">
                    <span className="truncate pr-2">• {file.name}</span>
                    {file.webViewLink && (
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 shrink-0 flex items-center gap-1 font-mono"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={syncResult.folderLink || 'https://drive.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-black flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Open Folder in Google Drive</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: Initial Confirmation Form (User Confirmation Mandatory) */}
          {!syncResult && !isSyncing && confirmPending && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#09120a] border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmation Required</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Are you ready to create a dedicated Google Drive folder and upload all <span className="text-white font-bold">{bookings.length} travel project dossiers</span>?
                </p>
                <div className="pt-1 text-[11px] text-gray-400 space-y-1 font-mono">
                  <div>• Destination: Personal Google Drive Root</div>
                  <div>• Folder: Godongwane Royal Routes - Travel Projects ({new Date().toISOString().split('T')[0]})</div>
                  <div>• Formats: Executive JSON Portfolio + Formatted Text Dossiers</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadLocalBackup}
                  className="w-full sm:w-auto text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-white/5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Local JSON Backup</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedGoogleDriveUpload}
                    disabled={bookings.length === 0}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FolderSync className="w-4 h-4" />
                    <span>Upload All to Google Drive</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

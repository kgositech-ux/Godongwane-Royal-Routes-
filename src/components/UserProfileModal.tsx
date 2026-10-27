import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  User, 
  Mail, 
  Phone, 
  Award, 
  ShieldCheck, 
  LogOut, 
  Save, 
  Sparkles,
  Plane,
  Heart
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
  onUpdateProfile
}) => {
  if (!isOpen || !user) return null;

  const [displayName, setDisplayName] = useState<string>(user.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber || '+27 82 555 0199');
  const [passportNumber, setPassportNumber] = useState<string>(user.passportNumber || 'ZA-8841029');
  const [country, setCountry] = useState<string>(user.country || 'South Africa');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onUpdateProfile({
        displayName,
        phoneNumber,
        passportNumber,
        country
      });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0c140e] border border-amber-500/40 rounded-3xl shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center">
              <Crown className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Royal Patron Membership
              </h2>
              <p className="text-[11px] text-amber-300/80 font-mono">
                {user.memberTier} • {user.pointsBalance} Points
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

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Avatar & Tier Card */}
          <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-lg">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-white text-base">
                  {user.displayName}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-bold">
                  {user.memberTier}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-emerald-400 font-mono mt-1">
                ⭐ {user.pointsBalance.toLocaleString()} Royal Sovereign Points
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                  Telephone / Liaison
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none font-mono"
                />
              </div>

              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-3">
              <label className="block text-[11px] font-mono text-amber-400/90 uppercase mb-1">
                Country of Residence
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Member Privileges */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs space-y-2">
            <span className="font-mono text-amber-300 uppercase text-[10px] block font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ROYAL EMERALD PRIVILEGES
            </span>
            <ul className="space-y-1 text-gray-300 list-disc list-inside">
              <li>Guaranteed first-choice private jet and villa reservations</li>
              <li>Complimentary Rolls-Royce tarmac chauffeur service</li>
              <li>Direct 24/7 hotline to Chief Route Dispatcher</li>
            </ul>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onLogout}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : saveSuccess ? (
                <span>Profile Updated!</span>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

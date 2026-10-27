import React, { useState } from 'react';
import { 
  Crown, 
  Plane, 
  Calendar, 
  MessageSquare, 
  User, 
  LogOut, 
  LogIn, 
  HardDriveDownload,
  ShieldCheck,
  Compass,
  Camera,
  Phone,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: 'book' | 'gallery' | 'dashboard' | 'itinerary' | 'concierge' | 'contact';
  setCurrentTab: (tab: 'book' | 'gallery' | 'dashboard' | 'itinerary' | 'concierge' | 'contact') => void;
  user: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  onOpenDriveExport: () => void;
  bookingCount: number;
  unreadSupportCount: number;
  currency: string;
  setCurrency: (cur: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onLogin,
  onLogout,
  onOpenProfile,
  onOpenDriveExport,
  bookingCount,
  unreadSupportCount,
  currency,
  setCurrency,
  isDarkMode = true,
  onToggleTheme
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (tab: 'book' | 'gallery' | 'dashboard' | 'itinerary' | 'concierge' | 'contact') => {
    setCurrentTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#0c120c]/95 border-b border-amber-600/20 text-white shadow-2xl backdrop-blur-md' 
        : 'bg-white/95 border-b border-amber-200 text-stone-900 shadow-md backdrop-blur-md'
    }`}>
      {/* Top Royal Announcement Bar */}
      <div className={`py-1.5 px-4 text-xs font-serif transition-colors duration-200 border-b tracking-widest uppercase flex items-center justify-between ${
        isDarkMode 
          ? 'bg-gradient-to-r from-amber-950/70 via-[#132216] to-amber-950/70 text-amber-200/95 border-amber-500/10' 
          : 'bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/90 text-amber-950 border-amber-200/60'
      }`}>
        {/* Left: Brand & Headquarters */}
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="flex items-center gap-1.5 text-amber-500 font-semibold truncate">
            <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">Godongwane Royal Routes</span>
          </span>
          <span className="hidden md:inline text-amber-600/70">•</span>
          <span className={`hidden md:inline text-[11px] font-sans tracking-normal ${isDarkMode ? 'text-gray-300' : 'text-stone-600'}`}>
            Skhaleni, Empangeni Headquarters
          </span>
        </div>

        {/* Right: Replaced WhatsApp with Night/Light Toggle and Menu Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Night / Light Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            type="button"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium transition-all duration-200 border cursor-pointer ${
              isDarkMode
                ? 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-500/40 shadow-xs'
                : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Night Mode'}
            aria-label="Toggle Night/Light theme"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3 h-3 text-amber-400 animate-[spin_12s_linear_infinite]" />
                <span className="font-semibold text-[10px]">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-indigo-700" />
                <span className="font-semibold text-[10px]">Night</span>
              </>
            )}
          </button>

          {/* Menu Bar Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-sans font-medium transition-all duration-200 border cursor-pointer ${
              isMenuOpen
                ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-sm'
                : isDarkMode
                  ? 'bg-black/50 hover:bg-white/10 text-amber-300 border-amber-500/30'
                  : 'bg-white hover:bg-amber-50 text-stone-900 border-amber-300 shadow-xs'
            }`}
            title={isMenuOpen ? 'Close Menu' : 'Open Menu Bar'}
            aria-label="Toggle Menu Bar"
          >
            {isMenuOpen ? (
              <>
                <X className="w-3 h-3 text-current" />
                <span className="font-semibold text-[10px]">Close</span>
              </>
            ) : (
              <>
                <Menu className="w-3 h-3 text-amber-400" />
                <span className="font-semibold text-[10px]">Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Royal Title */}
          <button 
            onClick={() => handleNavClick('book')} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-all duration-300">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center border border-amber-300/30 ${
                isDarkMode ? 'bg-[#0a110a]' : 'bg-stone-900'
              }`}>
                <Crown className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600">
                  GODONGWANE
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-sans font-semibold tracking-widest uppercase bg-amber-500/20 text-amber-400 rounded border border-amber-500/40">
                  ROYAL ROUTES
                </span>
              </div>
              <p className={`text-[10px] sm:text-xs tracking-widest font-mono uppercase ${
                isDarkMode ? 'text-emerald-400/90' : 'text-emerald-700'
              }`}>
                Aviation & Sovereign Retreats
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('book')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                currentTab === 'book'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-semibold'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              Book Routes
            </button>

            <button
              onClick={() => handleNavClick('gallery')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                currentTab === 'gallery'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-semibold'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              Photos Gallery
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 relative cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-semibold'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              My Royal Dashboard
              {bookingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-amber-500 text-black font-bold rounded-full">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('concierge')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 relative cursor-pointer ${
                currentTab === 'concierge'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-semibold'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Royal Concierge
              {unreadSupportCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                currentTab === 'contact'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-semibold'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Contact Us
            </button>
          </nav>

          {/* Right Action Controls: Currency, Drive Sync, Profile / Sign In, Theme & Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency selector */}
            <div className={`hidden sm:flex items-center border rounded-lg px-2 py-1 text-xs ${
              isDarkMode 
                ? 'bg-black/40 border-amber-600/30' 
                : 'bg-stone-50 border-amber-300'
            }`}>
              <span className={`mr-1.5 font-mono ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>CUR:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`bg-transparent font-medium focus:outline-none cursor-pointer ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-800'
                }`}
              >
                <option value="ZAR" className="bg-gray-900 text-white">ZAR (R)</option>
                <option value="USD" className="bg-gray-900 text-white">USD ($)</option>
                <option value="EUR" className="bg-gray-900 text-white">EUR (€)</option>
                <option value="GBP" className="bg-gray-900 text-white">GBP (£)</option>
              </select>
            </div>

            {/* Google Drive Export Button */}
            <button
              onClick={onOpenDriveExport}
              title="Sync & Export Itineraries to Google Drive"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-500/30' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-400/50'
              }`}
            >
              <HardDriveDownload className="w-3.5 h-3.5 text-emerald-500" />
              <span>Drive Sync</span>
            </button>

            {/* Night / Light Mode Toggle (Header Button) */}
            <button
              onClick={onToggleTheme}
              type="button"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border cursor-pointer ${
                isDarkMode
                  ? 'bg-black/40 hover:bg-white/10 text-amber-300 border-amber-600/30'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Night Mode'}
              aria-label="Toggle Night/Light Mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-medium">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-700" />
                  <span className="text-[11px] font-medium">Night</span>
                </>
              )}
            </button>

            {/* User State */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  className={`flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all cursor-pointer group ${
                    isDarkMode 
                      ? 'bg-black/40 hover:bg-white/5 border-amber-600/30' 
                      : 'bg-stone-50 hover:bg-stone-100 border-amber-300'
                  }`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border border-amber-400 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 text-xs font-bold">
                      {user.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden md:block pr-1">
                    <p className={`text-xs font-medium truncate max-w-[120px] ${
                      isDarkMode ? 'text-white group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-700'
                    }`}>
                      {user.displayName}
                    </p>
                    <p className="text-[10px] text-amber-500 font-serif">
                      {user.memberTier}
                    </p>
                  </div>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg border border-transparent hover:border-red-900/40 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wider uppercase rounded-lg shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Royal Sign In</span>
                <span className="xs:hidden">Sign In</span>
              </button>
            )}

            {/* Menu Bar Hamburger Button (Rightmost on Header) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                isMenuOpen
                  ? 'bg-amber-500 text-black border-amber-400 shadow-md scale-105'
                  : isDarkMode
                    ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
              }`}
              title="Menu Bar Navigation"
              aria-label="Toggle Full Menu Bar"
            >
              {isMenuOpen ? (
                <>
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation Strip */}
        <div className={`lg:hidden flex items-center justify-between py-2 border-t text-xs overflow-x-auto gap-2 ${
          isDarkMode ? 'border-amber-500/10' : 'border-amber-200/50'
        }`}>
          <button
            onClick={() => handleNavClick('book')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'book' ? 'bg-amber-500 text-black font-semibold' : isDarkMode ? 'text-gray-300' : 'text-stone-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Book Routes
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'gallery' ? 'bg-amber-500 text-black font-semibold' : isDarkMode ? 'text-gray-300' : 'text-stone-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Gallery
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'dashboard' ? 'bg-amber-500 text-black font-semibold' : isDarkMode ? 'text-gray-300' : 'text-stone-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Bookings {bookingCount > 0 ? `(${bookingCount})` : ''}
          </button>
          <button
            onClick={() => handleNavClick('concierge')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'concierge' ? 'bg-amber-500 text-black font-semibold' : isDarkMode ? 'text-gray-300' : 'text-stone-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Concierge
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'contact' ? 'bg-amber-500 text-black font-semibold' : isDarkMode ? 'text-gray-300' : 'text-stone-700'
            }`}
          >
            <Phone className="w-3.5 h-3.5" /> Contact
          </button>
        </div>
      </div>

      {/* Expandable Menu Bar Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[110px] z-50 overflow-y-auto">
          {/* Backdrop blur */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer container */}
          <div className="relative max-w-lg mx-auto p-4 sm:p-6 mt-2">
            <div className={`rounded-2xl border p-6 shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-[#0f1710] border-amber-500/30 text-white' 
                : 'bg-white border-amber-300 text-stone-900'
            }`}>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-amber-400">
                      ROYAL MENU & NAVIGATION
                    </h3>
                    <p className={`text-[11px] font-mono ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                      Godongwane Royal Routes Hub
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-stone-100 text-stone-600'
                  }`}
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Night / Light Mode Switch Row inside Menu */}
              <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between ${
                isDarkMode 
                  ? 'bg-black/40 border-amber-500/20' 
                  : 'bg-amber-50/70 border-amber-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-600" />
                  )}
                  <div>
                    <p className="text-xs font-semibold">
                      {isDarkMode ? 'Night Mode Active' : 'Light Mode Active'}
                    </p>
                    <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-stone-600'}`}>
                      {isDarkMode ? 'Deep sovereign emerald & dark gold' : 'Daylight royal ivory & parchment gold'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggleTheme}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isDarkMode 
                      ? 'bg-amber-400 text-black hover:bg-amber-300' 
                      : 'bg-stone-900 text-amber-300 hover:bg-stone-800'
                  }`}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-black" />
                      <span>Switch to Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Switch to Night</span>
                    </>
                  )}
                </button>
              </div>

              {/* Navigation Menu List */}
              <div className="mt-4 space-y-1.5">
                <p className="text-[10px] font-mono tracking-widest uppercase text-amber-500 px-1 font-bold">
                  Sovereign Destinations
                </p>

                {/* Tab: Book Routes */}
                <button
                  onClick={() => handleNavClick('book')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentTab === 'book'
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                      : isDarkMode
                        ? 'hover:bg-white/5 border border-transparent text-gray-200'
                        : 'hover:bg-amber-50/60 border border-transparent text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Book Sovereign Routes</p>
                      <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                        Private jets, Kruger safari chalets & coastal retreats
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>

                {/* Tab: Gallery */}
                <button
                  onClick={() => handleNavClick('gallery')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentTab === 'gallery'
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                      : isDarkMode
                        ? 'hover:bg-white/5 border border-transparent text-gray-200'
                        : 'hover:bg-amber-50/60 border border-transparent text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <Camera className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Photos Gallery</p>
                      <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                        Resort pools, thatched chalets & jet cabins
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>

                {/* Tab: Dashboard */}
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentTab === 'dashboard'
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                      : isDarkMode
                        ? 'hover:bg-white/5 border border-transparent text-gray-200'
                        : 'hover:bg-amber-50/60 border border-transparent text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center relative">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      {bookingCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center">
                          {bookingCount}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">My Royal Dashboard</p>
                        {bookingCount > 0 && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/40">
                            {bookingCount} active
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                        Self-management, boarding passes & calendar reminders
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>

                {/* Tab: Concierge */}
                <button
                  onClick={() => handleNavClick('concierge')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentTab === 'concierge'
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                      : isDarkMode
                        ? 'hover:bg-white/5 border border-transparent text-gray-200'
                        : 'hover:bg-amber-50/60 border border-transparent text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center relative">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      {unreadSupportCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Royal Concierge 24/7</p>
                      <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                        Lady Naledi Khumalo • Chauffeur & vintage champagne requests
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>

                {/* Tab: Contact Us */}
                <button
                  onClick={() => handleNavClick('contact')}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    currentTab === 'contact'
                      ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold'
                      : isDarkMode
                        ? 'hover:bg-white/5 border border-transparent text-gray-200'
                        : 'hover:bg-amber-50/60 border border-transparent text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact Us</p>
                      <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-stone-500'}`}>
                        Skhaleni, Empangeni • Email & direct WhatsApp route dispatch
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Quick Actions Footer inside Drawer */}
              <div className={`mt-5 pt-4 border-t space-y-3 ${
                isDarkMode ? 'border-white/10' : 'border-stone-200'
              }`}>
                {/* Currency & Drive sync in drawer */}
                <div className="flex items-center gap-2">
                  <div className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg border text-xs ${
                    isDarkMode ? 'bg-black/30 border-white/10' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <span className="font-mono text-gray-400">Currency:</span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className={`bg-transparent font-semibold focus:outline-none cursor-pointer ${
                        isDarkMode ? 'text-amber-300' : 'text-amber-800'
                      }`}
                    >
                      <option value="ZAR" className="bg-gray-900 text-white">ZAR (R)</option>
                      <option value="USD" className="bg-gray-900 text-white">USD ($)</option>
                      <option value="EUR" className="bg-gray-900 text-white">EUR (€)</option>
                      <option value="GBP" className="bg-gray-900 text-white">GBP (£)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenDriveExport();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-semibold cursor-pointer"
                  >
                    <HardDriveDownload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Drive Sync</span>
                  </button>
                </div>

                {/* Account / Profile Action in Drawer */}
                {user ? (
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenProfile();
                      }}
                      className="flex items-center gap-2.5 text-left cursor-pointer group"
                    >
                      <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold text-sm">
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isDarkMode ? 'text-white group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-700'}`}>
                          {user.displayName}
                        </p>
                        <p className="text-[10px] text-amber-500 font-mono">
                          {user.memberTier} Patron
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-950/40 border border-red-900/30 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogin();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In with Google</span>
                  </button>
                )}

                {/* Headquarters Location Notice in Drawer */}
                <div className="pt-2 text-center">
                  <p className={`text-[10px] flex items-center justify-center gap-1 font-mono ${
                    isDarkMode ? 'text-gray-400' : 'text-stone-500'
                  }`}>
                    <MapPin className="w-3 h-3 text-amber-500" />
                    Skhaleni, Empangeni Headquarters • godongwaneroyalroutes@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

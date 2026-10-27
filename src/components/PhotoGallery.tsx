import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  Search, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Maximize2,
  Calendar,
  ArrowRight,
  Crown
} from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/galleryData';

interface PhotoGalleryProps {
  onBookService: (category: string, title: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    'All',
    'Resort & Pools',
    'Suites & Bedrooms',
    'Beach & Ocean',
    'Safari Chalets',
    'Aviation & In-Flight'
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (selectedCategory !== 'All' && photo.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = photo.title.toLowerCase().includes(q);
      const matchDesc = photo.description.toLowerCase().includes(q);
      const matchTag = photo.tag.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTag;
    }
    return true;
  });

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1a10] via-[#09110a] to-[#142317] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            Verified Fleet, Sanctuary & Hospitality Showcase
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Godongwane Services &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Sanctuary Photo Gallery
            </span>
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
            Explore authentic photographs of our luxury guest suites, sparkling lagoon pools, private coastal beaches, safari chalets, and dedicated in-flight hospitality.
          </p>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-black/40 text-gray-300 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search suites, pools, beach..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c140e] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group bg-[#0c140e] border border-amber-500/20 hover:border-amber-400/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container with Zoom Trigger */}
            <div 
              onClick={() => setActivePhoto(photo)}
              className="relative h-60 w-full overflow-hidden cursor-pointer"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c140e] via-transparent to-black/40" />

              {/* Badges */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40">
                  {photo.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                  {photo.tag}
                </span>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {photo.title}
                </h3>
              </div>
            </div>

            {/* Description & Features */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                {photo.description}
              </p>

              {/* Feature Chips */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                {photo.serviceFeatures.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActivePhoto(photo)}
                  className="px-3 py-2 rounded-xl text-xs text-amber-300 hover:text-white bg-white/5 hover:bg-white/10 border border-amber-500/30 transition-colors cursor-pointer"
                >
                  Inspect Photo
                </button>
                <button
                  onClick={() => onBookService(photo.category, photo.title)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1"
                >
                  <span>Book Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0c140e] border border-amber-500/40 rounded-3xl shadow-2xl text-white overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-transparent">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-white text-base">
                    {activePhoto.title}
                  </h3>
                  <p className="text-[11px] text-amber-300 font-mono">
                    {activePhoto.category} • {activePhoto.tag}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Image Frame with Navigation */}
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10 group bg-black">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />

                {/* Left / Right arrows */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Service Details & Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-base font-serif font-bold text-amber-300">
                    Service Description & Amenities
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activePhoto.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {activePhoto.serviceFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#121c13] border border-amber-500/20 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                      RESERVATION DESK
                    </span>
                    <h5 className="font-serif font-bold text-white text-base mt-0.5">
                      Reserve this Experience
                    </h5>
                    <p className="text-[11px] text-gray-300 mt-1">
                      Available across our scheduled sovereign flights, resorts, and vacation villas.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const cat = activePhoto.category;
                      const title = activePhoto.title;
                      setActivePhoto(null);
                      onBookService(cat, title);
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Check Availability</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

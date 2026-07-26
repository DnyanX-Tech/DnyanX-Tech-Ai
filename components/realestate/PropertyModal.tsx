'use client';

import React, { useState } from 'react';
import { Property } from '@/data/properties';
import { X, MapPin, Bed, Bath, Maximize, CheckCircle2, Phone, MessageSquare, Building, ShieldCheck } from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  lang: 'en' | 'mr';
  onClose: () => void;
}

export default function PropertyModal({ property, lang, onClose }: PropertyModalProps) {
  if (!property) return null;
  const [selectedImg, setSelectedImg] = useState(property.image);

  const whatsappMessage = encodeURIComponent(
    `Hello DnyanX RealEstate Team, I am interested in: ${property.title} (${property.price}) located at ${property.location}. Please share complete details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              {lang === 'mr' ? property.typeMr : property.type}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {lang === 'mr' ? property.titleMr : property.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Gallery Display */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img src={selectedImg} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-emerald-400 font-extrabold text-lg">
                {property.price}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {property.gallery && property.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {property.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(imgUrl)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      selectedImg === imgUrl ? 'border-emerald-400 scale-105' : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <img src={imgUrl} alt="gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location & Title */}
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
              <MapPin size={14} />
              <span>{property.location}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'mr' ? property.titleMr : property.title}
            </h1>
          </div>

          {/* Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            {property.bhk > 0 && (
              <div className="p-2">
                <Bed size={18} className="text-emerald-400 mx-auto mb-1" />
                <p className="text-[11px] text-slate-400">Bedrooms</p>
                <p className="text-sm font-bold text-slate-200">{property.bhk} BHK</p>
              </div>
            )}
            <div className="p-2">
              <Maximize size={18} className="text-amber-400 mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Carpet Area</p>
              <p className="text-sm font-bold text-slate-200">{property.sqft} sqft</p>
            </div>
            <div className="p-2">
              <Bath size={18} className="text-emerald-400 mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Bathrooms</p>
              <p className="text-sm font-bold text-slate-200">{property.bathrooms}</p>
            </div>
            <div className="p-2">
              <Building size={18} className="text-amber-400 mx-auto mb-1" />
              <p className="text-[11px] text-slate-400">Possession</p>
              <p className="text-sm font-bold text-slate-200">{property.possession}</p>
            </div>
          </div>

          {/* Overview Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
              {lang === 'mr' ? 'प्रॉपर्टी तपशील' : 'Property Overview'}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
              {lang === 'mr' ? property.descriptionMr : property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
              {lang === 'mr' ? 'सुविधा आणि सोयी (Amenities)' : 'Amenities & Facilities'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(lang === 'mr' ? property.amenitiesMr : property.amenities).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Builder Verification */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-slate-200">{property.builder}</p>
                <p className="text-[11px] text-emerald-400">RERA Verified Developer & Property</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-neon-green"
          >
            <MessageSquare size={16} />
            <span>{lang === 'mr' ? 'WhatsApp वर चौकशी करा' : 'WhatsApp Inquiry'}</span>
          </a>

          <a
            href="tel:+919876543210"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <Phone size={16} className="text-amber-400" />
            <span>{lang === 'mr' ? 'थेट कॉल करा (+91 98765 43210)' : 'Call Sales (+91 98765 43210)'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Property } from '@/data/properties';
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight, ShieldCheck } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  lang: 'en' | 'mr';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export default function PropertyCard({
  property,
  lang,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}: PropertyCardProps) {
  return (
    <div className="group bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      {/* Property Image & Overlay Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {property.featured && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
              <ShieldCheck size={12} /> {lang === 'mr' ? 'प्रीमियम' : 'Featured'}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[11px] font-bold">
            {lang === 'mr' ? property.typeMr : property.type}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 text-slate-200 hover:text-red-400 transition"
          title="Favorite Property"
        >
          <Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {/* Bottom Price Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="px-3 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-extrabold text-base shadow-lg">
            {property.price}
          </div>
          <span className="text-[11px] font-semibold text-slate-300 bg-slate-900/80 px-2.5 py-0.5 rounded-lg border border-slate-800">
            {property.possession}
          </span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium mb-1">
            <MapPin size={13} className="text-amber-400 shrink-0" />
            <span>{property.location}</span>
          </div>

          <h3 className="text-base font-bold text-slate-100 line-clamp-1 group-hover:text-emerald-400 transition">
            {lang === 'mr' ? property.titleMr : property.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {lang === 'mr' ? property.descriptionMr : property.description}
          </p>
        </div>

        {/* Specs Pill List */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-950/60 rounded-2xl border border-slate-800/60 text-xs text-slate-300">
          {property.bhk > 0 && (
            <div className="flex items-center gap-1.5 justify-center">
              <Bed size={14} className="text-emerald-400" />
              <span className="font-semibold">{property.bhk} BHK</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 justify-center">
            <Maximize size={14} className="text-amber-400" />
            <span className="font-semibold">{property.sqft} sqft</span>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <Bath size={14} className="text-emerald-400" />
            <span className="font-semibold">{property.bathrooms} Bath</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelectProperty(property)}
          className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-emerald-400 font-semibold text-xs transition duration-300 flex items-center justify-center gap-2 group-hover:shadow-neon-green"
        >
          <span>{lang === 'mr' ? 'माहिती व व्हर्च्युअल टूर' : 'View Details & Inquiry'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

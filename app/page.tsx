'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/realestate/Header';
import PropertyCard from '@/components/realestate/PropertyCard';
import PropertyModal from '@/components/realestate/PropertyModal';
import AiPropertyAdvisor from '@/components/realestate/AiPropertyAdvisor';
import EmiCalculator from '@/components/realestate/EmiCalculator';
import { INITIAL_PROPERTIES, Property } from '@/data/properties';
import { Search, Filter, Sparkles, Building, MapPin, CheckCircle2, Shield, Heart, ArrowRight } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'mr' : 'en'));

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      if (showFavoritesOnly && !favorites.includes(prop.id)) return false;
      if (selectedCity !== 'All' && prop.city !== selectedCity) return false;
      if (selectedType !== 'All' && prop.type !== selectedType) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(q) || prop.titleMr.toLowerCase().includes(q);
        const matchLoc = prop.location.toLowerCase().includes(q);
        const matchBuilder = prop.builder.toLowerCase().includes(q);
        return matchTitle || matchLoc || matchBuilder;
      }
      return true;
    });
  }, [properties, searchQuery, selectedCity, selectedType, favorites, showFavoritesOnly]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        favoritesCount={favorites.length}
        onOpenAiAdvisor={() => setIsAiOpen(true)}
        onOpenFavorites={() => setShowFavoritesOnly(prev => !prev)}
      />

      {/* Hero Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-neon-green">
          <Sparkles size={14} className="text-amber-400" />
          <span>{lang === 'mr' ? 'DnyanX AI द्वारे संचलित रिअल इस्टेट पोर्टल' : 'Powered by DnyanX AI & RAG Search'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          {lang === 'mr' ? (
            <>महाराष्ट्रातील तुमचे स्वप्नातील घर <span className="text-emerald-400">शोधा AI च्या मदतीने</span></>
          ) : (
            <>Find Your Dream Property in Maharashtra with <span className="text-emerald-400">DnyanX AI</span></>
          )}
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {lang === 'mr'
            ? 'पुणे, मुंबई, नाशिक आणि संभाजीनगर मधील सत्यापित लक्झरी फ्लॅट्स, व्हिला आणि कमर्शियल प्रॉपर्टीज पहा.'
            : 'Explore RERA-verified luxury apartments, villas, and commercial properties across Pune, Mumbai, Nashik & Sambhajinagar.'}
        </p>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 shadow-2xl space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'mr' ? 'शहर, परिसर किंवा बिल्डर शोधा... (उदा. बाणेर, पुणे)' : 'Search by locality, project name or builder (e.g. Baner, Pune)...'}
                className="w-full bg-slate-950/80 pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => setIsAiOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition hover:scale-105 flex items-center justify-center gap-2 shadow-neon-green shrink-0"
            >
              <Sparkles size={16} />
              <span>{lang === 'mr' ? 'AI प्रॉपर्टी सल्ला' : 'AI Assistant'}</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-slate-400 font-semibold px-2 flex items-center gap-1">
                <MapPin size={13} className="text-amber-400" />
                {lang === 'mr' ? 'शहर:' : 'City:'}
              </span>
              {['All', 'Pune', 'Mumbai', 'Nashik', 'Chhatrapati Sambhajinagar'].map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded-xl transition font-semibold text-[11px] ${
                    selectedCity === city
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Property Category */}
            <div className="flex items-center gap-1.5">
              {['All', 'Apartment', 'Villa', 'Penthouse', 'Commercial'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1 rounded-xl transition font-semibold text-[11px] ${
                    selectedType === type
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Section */}
      <section id="properties" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Building className="text-emerald-400" size={22} />
              {showFavoritesOnly
                ? (lang === 'mr' ? 'जतन केलेल्या आवडत्या प्रॉपर्टीज' : 'Saved Favorite Properties')
                : (lang === 'mr' ? 'उपलब्ध प्रिमियम प्रॉपर्टीज' : 'Featured Properties')}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {filteredProperties.length} {lang === 'mr' ? 'प्रॉपर्टीज सापडल्या' : 'properties found matching criteria'}
            </p>
          </div>

          {showFavoritesOnly && (
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              ← {lang === 'mr' ? 'सर्व प्रॉपर्टीज दाखवा' : 'Show All Properties'}
            </button>
          )}
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                lang={lang}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={toggleFavorite}
                onSelectProperty={setSelectedProperty}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
            <Building className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">
              {lang === 'mr' ? 'कोणतीही प्रॉपर्टी सापडली नाही' : 'No properties match your filter'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' ? 'कृपया फिल्टर बदला किंवा नवीन शोध घ्या.' : 'Try resetting your search query or city filter.'}
            </p>
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedType('All');
                setSearchQuery('');
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition"
            >
              {lang === 'mr' ? 'सर्व फिल्टर्स रिसेट करा' : 'Reset All Filters'}
            </button>
          </div>
        )}
      </section>

      {/* EMI Calculator Section */}
      <EmiCalculator lang={lang} />

      {/* Post Property Banner CTA */}
      <section className="my-16 max-w-5xl mx-auto px-4">
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {lang === 'mr' ? 'तुम्ही तुमची प्रॉपर्टी विकू किंवा भाड्याने देऊ इच्छिता?' : 'Are You a Property Owner or Developer?'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            {lang === 'mr'
              ? 'DnyanX Tech AI सोबत तुमची प्रॉपर्टी लिस्ट करा आणि AI व्हर्च्युअल मॅचिंगद्वारे त्वरित खरेदीदार मिळवा.'
              : 'List your flat or villa with DnyanX Tech RealEstate AI to get instant qualified leads & buyers.'}
          </p>

          <a
            href="https://wa.me/919876543210?text=I%20want%20to%20list%20my%20property%20on%20DnyanX%20RealEstate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition duration-300 shadow-neon-green"
          >
            <span>{lang === 'mr' ? 'प्रॉपर्टी मोफत लिस्ट करा' : 'List Your Property Free'}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-200 font-bold text-sm">
          <span>DnyanX RealEstate AI</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Built with ❤️ by <span className="text-amber-400 font-semibold">DnyanX Tech</span>. RERA Verified Housing Portal.
        </p>
      </footer>

      {/* Property Details Modal */}
      <PropertyModal
        property={selectedProperty}
        lang={lang}
        onClose={() => setSelectedProperty(null)}
      />

      {/* AI Advisor Modal Widget */}
      <AiPropertyAdvisor
        isOpen={isAiOpen}
        lang={lang}
        onClose={() => setIsAiOpen(false)}
      />
    </div>
  );
}

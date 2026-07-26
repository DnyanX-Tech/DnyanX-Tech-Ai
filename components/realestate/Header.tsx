'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Sparkles, Heart, Globe, Building2, PhoneCall } from 'lucide-react';
import UserMenu from '@/components/UserMenu';

interface HeaderProps {
  lang: 'en' | 'mr';
  onToggleLang: () => void;
  favoritesCount: number;
  onOpenAiAdvisor: () => void;
  onOpenFavorites: () => void;
}

export default function Header({
  lang,
  onToggleLang,
  favoritesCount,
  onOpenAiAdvisor,
  onOpenFavorites,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 p-0.5 shadow-neon-green group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-lg">
              DX
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1">
              DnyanX <span className="text-emerald-400">RealEstate</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                AI
              </span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium leading-none">
              {lang === 'mr' ? 'महाराष्ट्रातील स्मार्ट रिअल इस्टेट पोर्टल' : 'Maharashtra’s Smart AI Housing Portal'}
            </p>
          </div>
        </Link>
      </div>

      {/* Center Quick Features */}
      <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
        <a href="#properties" className="hover:text-emerald-400 transition flex items-center gap-1.5">
          <Building2 size={14} className="text-emerald-400" />
          {lang === 'mr' ? 'सर्व प्रॉपर्टीज' : 'All Properties'}
        </a>
        <a href="#emi-calculator" className="hover:text-emerald-400 transition flex items-center gap-1.5">
          <Home size={14} className="text-amber-400" />
          {lang === 'mr' ? 'होम लोन कॅल्क्युलेटर' : 'EMI Calculator'}
        </a>
        <button
          onClick={onOpenAiAdvisor}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 transition flex items-center gap-1.5 animate-pulse"
        >
          <Sparkles size={13} className="text-amber-300" />
          {lang === 'mr' ? 'AI प्रॉपर्टी सल्लागार' : 'AI Property Match'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:border-emerald-500/40 transition"
          title="Switch Language"
        >
          <Globe size={14} className="text-emerald-400" />
          <span>{lang === 'mr' ? 'मराठी' : 'English'}</span>
        </button>

        {/* Favorites Badge Button */}
        <button
          onClick={onOpenFavorites}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition"
          title="Saved Favorites"
        >
          <Heart size={18} className={favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* GitHub User Auth Widget */}
        <UserMenu />
      </div>
    </header>
  );
}

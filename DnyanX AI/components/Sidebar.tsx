'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, PlusCircle, ShieldCheck, ExternalLink, Cpu } from 'lucide-react';

interface SidebarProps {
  currentSessionId: string;
  onNewChat: () => void;
}

export default function Sidebar({ currentSessionId, onNewChat }: SidebarProps) {
  return (
    <aside className="w-full md:w-64 glass-panel border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6 p-2 rounded-xl bg-slate-900/50 border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00FF66]/20 to-[#FFD700]/20 border border-[#00FF66]/50 flex items-center justify-center font-bold text-xl text-[#00FF66]">
            X
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-wide flex items-center gap-1.5">
              DnyanX <span className="text-[#00FF66]">AI</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">DnyanX Tech Assistant</p>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full mb-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:shadow-neon-green transition-all transform active:scale-95"
        >
          <PlusCircle className="w-4 h-4" /> New Conversation
        </button>

        {/* Navigation Links */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 px-3 mb-2">Navigation</p>
          <Link
            href="/chat"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-200 bg-slate-800/60 border border-slate-700 font-medium"
          >
            <MessageSquare className="w-4 h-4 text-[#00FF66]" /> Chat Assistant
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-[#FFD700]" /> Knowledge Admin
          </Link>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-4 border-t border-slate-800/80 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-[#00FF66]" /> Powered by RAG & OpenAI
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Built with ❤️ by <span className="text-[#FFD700] font-semibold">DnyanX Tech</span>
        </p>
      </div>
    </aside>
  );
}

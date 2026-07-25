'use client';

import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3 rounded-2xl glass-ai max-w-xs text-slate-300">
      <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 flex items-center justify-center border border-[#FFD700]/50 text-xs font-bold text-[#FFD700]">
        X
      </div>
      <span className="text-xs text-slate-400 font-medium">DnyanX AI is thinking</span>
      <div className="flex gap-1 items-center ml-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-bounce"></span>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { User, Sparkles, FileText } from 'lucide-react';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function ChatBubble({ role, content, sources }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isUser
            ? 'bg-[#00FF66]/20 border border-[#00FF66]/50 text-[#00FF66]'
            : 'bg-[#FFD700]/20 border border-[#FFD700]/50 text-[#FFD700]'
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </div>

      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 ${isUser ? 'glass-user text-slate-100' : 'glass-ai text-slate-100'}`}>
        <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        {!isUser && sources && sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-[#FFD700]">
              <FileText className="w-3.5 h-3.5" /> Sources:
            </span>
            {sources.map((src, idx) => (
              <span key={idx} className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                {src}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

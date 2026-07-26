'use client';

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Github, LogOut, User as UserIcon } from 'lucide-react';

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse border border-slate-700" />
    );
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 backdrop-blur-md">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="w-7 h-7 rounded-full border border-emerald-500/50 object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
            <UserIcon size={14} />
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-slate-200 leading-none">
            {session.user.name || 'GitHub User'}
          </p>
          <p className="text-[10px] text-slate-400 leading-tight">
            {session.user.email || 'Authenticated'}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          title="Sign Out"
          className="ml-1 p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
        >
          <LogOut size={15} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('github')}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-slate-200 text-xs font-semibold hover:border-emerald-500/60 transition shadow-sm"
    >
      <Github size={15} className="text-emerald-400" />
      <span>GitHub Login</span>
    </button>
  );
}

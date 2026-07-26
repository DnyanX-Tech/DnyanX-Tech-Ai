'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Github, ShieldCheck, Sparkles, ArrowRight, BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Static Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Cyber Grid Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md transition"
        >
          ← Back to DnyanX AI
        </Link>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/60 border border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Logo Badge */}
        <div className="w-14 h-14 bg-slate-950 border border-emerald-500/50 rounded-2xl flex items-center justify-center text-emerald-400 font-bold text-xl shadow-neon-green mb-6">
          DX
        </div>

        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome to <span className="text-emerald-400">DnyanX AI</span>
        </h1>
        <p className="text-slate-400 text-xs mt-2 max-w-xs leading-relaxed">
          Sign in with your GitHub account to access personalized AI chats, saved sessions, and custom RAG knowledge bases.
        </p>

        {/* Feature Highlights */}
        <div className="w-full my-6 py-4 px-4 bg-slate-950/50 border border-slate-800/80 rounded-2xl space-y-2.5 text-left text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant RAG AI Assistant Access</span>
          </div>
          <div className="flex items-center gap-2.5">
            <BotMessageSquare className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>Persisted Chat Sessions & Prompts</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Secure OAuth 2.0 GitHub Authentication</span>
          </div>
        </div>

        {/* GitHub Sign-in Button */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/chat' })}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 hover:border-emerald-400 text-slate-100 font-semibold text-sm transition duration-300 flex items-center justify-center gap-3 shadow-lg group hover:shadow-neon-green"
        >
          <Github className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>Continue with GitHub</span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform ml-auto" />
        </button>

        <p className="text-[11px] text-slate-500 mt-6">
          By continuing, you agree to DnyanX Tech&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}

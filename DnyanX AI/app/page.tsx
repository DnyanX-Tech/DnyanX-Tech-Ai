import Link from 'next/link';
import { MessageSquare, ShieldCheck, Sparkles, ArrowRight, Zap, Database, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Navigation */}
      <header className="flex justify-between items-center max-w-6xl mx-auto w-full z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00FF66]/20 to-[#FFD700]/20 border border-[#00FF66]/50 flex items-center justify-center font-bold text-xl text-[#00FF66]">
            X
          </div>
          <span className="font-black text-xl text-white tracking-wide">
            DnyanX <span className="text-[#00FF66]">AI</span>
          </span>
        </div>

        <div className="flex gap-4">
          <Link
            href="/chat"
            className="px-4 py-2 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold text-sm hover:bg-[#00FF66]/20 transition"
          >
            Open Chat
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm hover:bg-slate-700 transition"
          >
            Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center my-auto z-10 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-semibold text-[#FFD700] mb-6 border border-[#FFD700]/30">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Agency AI Assistant
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
          Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#FFD700]">DnyanX AI</span> — Your Intelligent Business Co-Pilot
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Powered by Next.js 14, FastAPI, RAG, and pgvector embeddings. Answers client queries, estimates quotes, and delivers brand-aligned advice in English & Marathi.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/chat"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-slate-950 font-bold text-base flex items-center justify-center gap-2 hover:shadow-neon-green transition transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5" /> Start Chatting Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/admin"
            className="px-8 py-4 rounded-xl glass-panel text-slate-200 font-bold text-base flex items-center justify-center gap-2 border border-slate-700 hover:border-[#FFD700]/50 transition"
          >
            <ShieldCheck className="w-5 h-5 text-[#FFD700]" /> Knowledge Base Admin
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <Zap className="w-8 h-8 text-[#00FF66] mb-3" />
            <h3 className="font-bold text-white text-lg mb-1">Instant Quotes & RAG</h3>
            <p className="text-xs text-slate-400">Contextual answers pulled directly from DnyanX Tech documentation.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <Brain className="w-8 h-8 text-[#FFD700] mb-3" />
            <h3 className="font-bold text-white text-lg mb-1">Brand Voice Embed</h3>
            <p className="text-xs text-slate-400">Incorporates value equations and agency philosophies seamlessly.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <Database className="w-8 h-8 text-[#00FF66] mb-3" />
            <h3 className="font-bold text-white text-lg mb-1">pgvector Memory</h3>
            <p className="text-xs text-slate-400">Supabase pgvector search & persistent conversation memory.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 z-10">
        Built with ❤️ by <span className="text-[#FFD700] font-semibold">DnyanX Tech</span>
      </footer>
    </div>
  );
}

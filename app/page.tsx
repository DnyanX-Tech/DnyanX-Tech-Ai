import React from 'react';
import { BotMessageSquare, User, CornerDownLeft, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const messages = [
    { sender: 'You', text: 'नमस्कार ज्ञानX! हे डिझाईन कडक दिसतय!', bold: true },
    { sender: 'AI', text: "शुभ प्रभात! मी तुमच्या 'Custom AI Agent' (DnyanX AI) साठी तयार आहे. RAG & Vector Search द्वारे मी तुमच्या सर्व प्रश्नांची अचूक उत्तरे देऊ शकतो. काय सुरुवात करायची?" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Static Ambient Glows - (Performant Version) */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Subtle Dot Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 border border-emerald-500/30 rounded-xl flex items-center justify-center font-bold text-emerald-400 shadow-neon-green">
            DX
          </div>
          <h1 className="text-xl font-semibold text-slate-200">
            Dnyan<span className="text-yellow-400">X</span> AI <span className="text-slate-400 text-sm font-normal">Assistant</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 transition"
          >
            <ShieldCheck size={16} className="text-yellow-400" /> Admin Panel
          </Link>
          <Link
            href="/chat"
            className="text-xs text-slate-950 font-bold bg-emerald-400 hover:bg-emerald-300 px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Live Chat
          </Link>
        </div>
      </header>

      {/* Chat Area - Minimalist/DeepSeek Style */}
      <div className="relative z-10 flex-grow flex flex-col gap-6 py-8 overflow-y-auto max-w-5xl w-full mx-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-4 items-start ${msg.sender === 'You' ? 'justify-end' : ''}`}>
            {msg.sender === 'AI' && (
              <div className="w-9 h-9 mt-1 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <BotMessageSquare className="text-emerald-500" size={18} />
              </div>
            )}
            
            <div className={`relative px-6 py-4 rounded-3xl ${
              msg.sender === 'You' 
                ? 'bg-slate-900/60 border border-slate-700/50 backdrop-blur-md text-slate-200' 
                : 'bg-slate-800/30 text-slate-300 border border-yellow-500/20'
            }`}>
              {msg.bold ? (
                <p className="font-medium text-slate-100">{msg.text}</p>
              ) : (
                <p className="leading-relaxed">{msg.text}</p>
              )}
            </div>

            {msg.sender === 'You' && (
              <div className="w-9 h-9 mt-1 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center shrink-0">
                <User className="text-emerald-300" size={18} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area - Cyber-Glassmorphism */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto pb-6">
        <Link href="/chat">
          <div className="relative bg-slate-900/40 border border-emerald-500/20 backdrop-blur-xl rounded-2xl p-2 flex items-center gap-2 group hover:border-emerald-500/40 transition duration-300 cursor-pointer">
            <input 
              type="text" 
              placeholder="AI शी बोला... (Click to launch live RAG chat)" 
              readOnly
              className="flex-grow bg-transparent px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none cursor-pointer"
            />
            <button className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl transition flex items-center gap-2 font-semibold text-sm">
              <span>Send</span>
              <CornerDownLeft size={16} />
            </button>
          </div>
        </Link>
      </footer>
    </main>
  );
}

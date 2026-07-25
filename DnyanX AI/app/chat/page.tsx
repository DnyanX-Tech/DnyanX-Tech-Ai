'use client';

import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { Send, RefreshCw, Sparkles, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: (
        "**TL;DR:** Namaskar! Welcome to DnyanX Tech AI Assistant.\n\n" +
        "I am ready to help you with:\n" +
        "• Services & Fixed Pricing Packages\n" +
        "• Project Scope & Instant Quote Clarifications\n" +
        "• Tech Advice (Next.js, FastAPI, RAG, AI Assistants)\n\n" +
        "How can DnyanX Tech assist you today?"
      )
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('session_' + Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          session_id: sessionId
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          sources: data.sources
        }
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback friendly AI message if server is offline or starting up
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: (
            "**TL;DR:** I am operating in offline demonstration mode.\n\n" +
            "• **DnyanX Tech Services**: Custom AI Assistants ($1,500+), Full-Stack Next.js Apps ($2,000+), SaaS MVP.\n" +
            "• **Our Motto**: *Value = Pain × People × Frequency*.\n" +
            "• **Note**: To enable live OpenAI/pgvector backend responses, please ensure FastAPI backend is running on `http://localhost:8000`."
          ),
          sources: ["offline_knowledge.md"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setSessionId('session_' + Math.random().toString(36).substring(7));
    setMessages([
      {
        role: 'assistant',
        content: "**TL;DR:** New conversation started! What would you like to build with DnyanX Tech today?"
      }
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#020617] overflow-hidden text-slate-100 relative">
      {/* Dynamic Cyber-Minimalist Ambient Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-[#00FF66]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-[#FFD700]/10 rounded-full blur-[120px] pointer-events-none animate-pulse [animation-delay:2s]"></div>

      {/* Sidebar */}
      <Sidebar currentSessionId={sessionId} onNewChat={handleNewChat} />


      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Top Bar Header */}
        <header className="h-16 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#00FF66]/50 flex items-center justify-center font-bold text-sm text-[#00FF66]">
                X
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00FF66] rounded-full border border-slate-900"></span>
            </div>
            <div>
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                DnyanX AI Assistant
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-medium">
                  RAG Online
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Session ID: {sessionId}</p>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Chat
          </button>
        </header>

        {/* Message History Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
            />
          ))}

          {loading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length < 3 && (
          <div className="px-6 py-2 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => handleSend("What are your services and pricing packages?")}
              className="px-3 py-1.5 rounded-full glass-panel text-slate-300 border border-slate-700 hover:border-[#00FF66]/50 hover:text-[#00FF66] transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#FFD700]" /> Services & Pricing
            </button>
            <button
              onClick={() => handleSend("I want a quote for a Next.js AI web application.")}
              className="px-3 py-1.5 rounded-full glass-panel text-slate-300 border border-slate-700 hover:border-[#00FF66]/50 hover:text-[#00FF66] transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3 h-3 text-[#00FF66]" /> Get a Project Quote
            </button>
            <button
              onClick={() => handleSend("तुमचे चार्जेस आणि सर्व्हिसेस काय आहेत?")}
              className="px-3 py-1.5 rounded-full glass-panel text-slate-300 border border-slate-700 hover:border-[#00FF66]/50 hover:text-[#00FF66] transition flex items-center gap-1.5"
            >
              मराठी मध्ये विचार (Marathi Query)
            </button>
          </div>
        )}

        {/* Input Bar Footer */}
        <div className="p-4 glass-panel border-t border-slate-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 max-w-4xl mx-auto bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 focus-within:border-[#00FF66]/60 transition"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask DnyanX AI about services, quotes, tech advice..."
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00FF66] to-[#00CC52] text-slate-950 flex items-center justify-center hover:shadow-neon-green transition disabled:opacity-40 disabled:hover:shadow-none"
            >
              <Send className="w-4 h-4 font-bold" />
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-500 mt-2">
            DnyanX AI can answer questions in English & Marathi. Built with ❤️ by DnyanX Tech.
          </p>
        </div>
      </main>
    </div>
  );
}

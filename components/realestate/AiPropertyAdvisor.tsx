'use client';

import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, Building2, MapPin } from 'lucide-react';

interface AiPropertyAdvisorProps {
  isOpen: boolean;
  lang: 'en' | 'mr';
  onClose: () => void;
}

interface ChatMsg {
  sender: 'ai' | 'user';
  text: string;
}

export default function AiPropertyAdvisor({ isOpen, lang, onClose }: AiPropertyAdvisorProps) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      sender: 'ai',
      text: lang === 'mr'
        ? 'नमस्कार! मी DnyanX AI प्रॉपर्टी सल्लागार आहे. तुमचे बजेट, पसंतीचे शहर (पुणे, मुंबई, नाशिक इ.) किंवा १BHK, २BHK, व्हिला याबद्दल विचारू शकता!'
        : 'Namaskar! I am DnyanX AI Property Match Assistant. Ask me about property prices in Pune/Mumbai, budget advice, or home loan guidance!'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textQuery?: string) => {
    const query = textQuery || input;
    if (!query.trim()) return;

    const userMsg: ChatMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textQuery) setInput('');

    // Generate intelligent AI real estate advice
    setTimeout(() => {
      let aiReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('pune') || lower.includes('पुणे') || lower.includes('baner')) {
        aiReply = lang === 'mr'
          ? 'पुण्यातील बाणेर आणि हिंजवडी मध्ये उत्तम १.२५ कोटी ते ३.८० कोटी मधील लक्झरी ३BHK व व्हिला उपलब्ध आहेत. हे आयटी हब जवळ असल्याने उत्तम रिटर्न्स मिळतात!'
          : 'In Pune (Baner & Koregaon Park), prime 3BHK flats and 4BHK Luxury Villas range from ₹1.25 Cr to ₹3.80 Cr with high ROI due to IT Park proximity!';
      } else if (lower.includes('budget') || lower.includes('५०') || lower.includes('50') || lower.includes('लख') || lower.includes('lakh')) {
        aiReply = lang === 'mr'
          ? 'नाशिक मधील गंगापूर रोड येथे ₹४८ लाखांत प्रशस्त २BHK फ्लॅट उपलब्ध आहे, तसेच छत्रपती संभाजीनगर मध्ये ₹९५ लाखांत पेंटहाउस उपलब्ध आहे.'
          : 'For budget under ₹50-90 Lakhs, check out Gangapur Road Nashik (2BHK at ₹48 Lakhs) and Cidco Sambhajinagar Penthouse at ₹95 Lakhs!';
      } else if (lower.includes('mumbai') || lower.includes('मुंबई')) {
        aiReply = lang === 'mr'
          ? 'बांद्रा वेस्ट मध्ये सी-व्ह्यू २BHK स्मार्ट होम ₹२.४५ कोटी मध्ये उपलब्ध आहे.'
          : 'Bandra West Mumbai features 2BHK Sea Breeze Smart Homes starting from ₹2.45 Cr with luxury Italian marble.';
      } else if (lower.includes('loan') || lower.includes('लोन') || lower.includes('emi')) {
        aiReply = lang === 'mr'
          ? 'सध्या होम लोन व्याजदर सुमारे ८.५% ते ९.०% वर्षाला आहे. ₹५० लाखांच्या २० वर्षांच्या लोनसाठी अंदाजे EMI ₹४३,३९१/महिना येतो.'
          : 'Home loan interest rates currently range around 8.5% p.a. For a ₹50 Lakh loan for 20 years, monthly EMI is approx ₹43,391/month.';
      } else {
        aiReply = lang === 'mr'
          ? 'तुमच्या गरजेनुसार आमच्याकडे बाणेर (पुणे), बांद्रा (मुंबई), गंगापूर रोड (नाशिक) व संभाजीनगर मध्ये उत्तम पर्याय उपलब्ध आहेत! कोणत्याही प्रॉपर्टीवर क्लिक करून थेट व्हॉट्सॲप चौकशी करा.'
          : 'We have verified prime properties in Pune, Mumbai, Nashik & Sambhajinagar ranging from ₹48 Lakhs to ₹3.80 Cr! Click on any card to inquire via WhatsApp.';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[550px] text-slate-100">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 p-0.5 shadow-neon-green">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                <Bot size={18} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                DnyanX AI Property Match
                <Sparkles size={13} className="text-amber-400" />
              </h3>
              <p className="text-[10px] text-emerald-400">Instant Real Estate Advice</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200">
            <X size={18} />
          </button>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-slate-950 font-medium rounded-br-none'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-800/60 flex flex-wrap gap-1.5 text-[11px]">
          <button
            onClick={() => handleSend('Best 3BHK flat in Pune under 1.5 Cr')}
            className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition"
          >
            🏡 Pune 3BHK
          </button>
          <button
            onClick={() => handleSend('Budget homes under 50 Lakhs')}
            className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition"
          >
            💰 Budget under 50L
          </button>
          <button
            onClick={() => handleSend('Home loan EMI rates')}
            className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition"
          >
            📊 Home Loan EMI
          </button>
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'mr' ? 'प्रॉपर्टी बद्दल प्रश्न विचारा...' : 'Ask AI about budget, location, loan...'}
            className="flex-1 bg-slate-900 px-3.5 py-2 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none border border-slate-800 focus:border-emerald-500"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold hover:bg-emerald-400 transition"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}

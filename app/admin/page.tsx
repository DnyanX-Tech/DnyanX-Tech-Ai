'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { UploadCloud, CheckCircle, AlertCircle, FileText, Database, ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatusMsg(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatusMsg(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Upload failed');
      }

      setStatusMsg({
        type: 'success',
        text: `Success: Indexed "${data.filename}" into pgvector with ${data.chunks_created} vector chunks!`,
      });
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({
        type: 'error',
        text: `Upload Error: ${err.message || 'Could not connect to FastAPI backend.'}`,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#030712] overflow-hidden text-slate-100">
      <Sidebar currentSessionId="admin" onNewChat={() => {}} />

      <main className="flex-1 overflow-y-auto p-6 sm:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Knowledge Base Admin Dashboard</h1>
              <p className="text-xs text-slate-400">
                Upload Markdown (.md) or PDF (.pdf) documentation to chunk, embed, and index into Supabase pgvector.
              </p>
            </div>
          </div>

          {/* Upload Drop Zone */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00FF66]/10 border border-[#00FF66]/30 mx-auto flex items-center justify-center text-[#00FF66]">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-white">Upload Document to RAG Pipeline</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Drag and drop your file below or click to browse. Supports .md, .txt, and .pdf documents up to 10MB.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-6 py-3 rounded-xl bg-slate-900 border border-dashed border-slate-700 hover:border-[#00FF66] transition text-sm font-semibold text-slate-300 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#00FF66]" />
                {file ? file.name : 'Choose File (.md, .txt, .pdf)'}
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".md,.txt,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {file && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-slate-950 font-bold text-sm hover:shadow-neon-green transition disabled:opacity-50"
              >
                {uploading ? 'Processing & Embedding Chunks...' : 'Upload & Index to Vector DB'}
              </button>
            )}

            {/* Status Feedback */}
            {statusMsg && (
              <div
                className={`p-4 rounded-xl text-xs flex items-center justify-center gap-2 max-w-lg mx-auto ${
                  statusMsg.type === 'success'
                    ? 'bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66]'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {statusMsg.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}
          </div>

          {/* Active Knowledge Files Info */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#FFD700]" /> Pre-Indexed Knowledge Files
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="font-semibold text-slate-200">services_and_pricing.md</p>
                <p className="text-[11px] text-slate-400 mt-1">Fixed pricing matrix & service packages.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="font-semibold text-slate-200">portfolio_and_bio.md</p>
                <p className="text-[11px] text-slate-400 mt-1">Agency info & past project portfolio.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="font-semibold text-slate-200">philosophy_and_faq.md</p>
                <p className="text-[11px] text-slate-400 mt-1">Value equations, Marathi support & FAQ.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

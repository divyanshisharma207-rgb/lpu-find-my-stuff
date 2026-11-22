import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Clock, MapPin, Sparkles } from 'lucide-react';

export default function StatsBanner({ items, onQuickFilterStatus, onOpenSafety }) {
  const lostCount = items.filter(i => i.status === 'lost').length;
  const foundCount = items.filter(i => i.status === 'found').length;
  const pendingCount = items.filter(i => i.status === 'claim pending').length;
  const returnedCount = items.filter(i => i.status === 'returned').length;

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden my-6 border border-slate-800">
      
      {/* Decorative glows styled with the 6-color warm palette */}
      <div 
        style={{ backgroundColor: '#FA8952', opacity: 0.16 }}
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        style={{ backgroundColor: '#FAD352', opacity: 0.14 }}
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        style={{ backgroundColor: '#FAA596', opacity: 0.12 }}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left text & Privacy badge */}
        <div className="max-w-2xl space-y-3">
          <div 
            style={{ 
              background: 'linear-gradient(90deg, rgba(250,137,82,0.2) 0%, rgba(250,166,82,0.2) 50%, rgba(250,211,82,0.2) 100%)',
              borderColor: 'rgba(250,191,82,0.6)',
              color: '#FAD352'
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FABF52]" />
            LPU Verified Item Recovery Network
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Lost Something on Campus?{' '}
            <span 
              style={{
                background: 'linear-gradient(90deg, #FA8952 0%, #FAA652 35%, #FABF52 70%, #FAD352 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Let's Bring It Back.
            </span>
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Report lost items or post found belongings across LPU blocks. Our{' '}
            <span className="text-[#FAD352] font-semibold">Secret Proof Verification</span> and{' '}
            <span className="text-[#FAA652] font-semibold">Anonymous Masked Chat</span> ensure students reconnect safely without ever exposing personal phone numbers or email addresses.
          </p>

          {/* Privacy & Safe Meeting Guarantee pills */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div 
              style={{ borderColor: 'rgba(250,191,82,0.3)', backgroundColor: 'rgba(250,166,82,0.1)' }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-emerald-300"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Masked Identity &amp; In-App Chat</span>
            </div>
            
            <div 
              style={{ borderColor: 'rgba(250,211,173,0.3)', backgroundColor: 'rgba(250,211,173,0.1)' }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[#FAD3AD]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FAD3AD]" />
              <span>Owner Secret Detail Verification</span>
            </div>

            <button 
              onClick={onOpenSafety}
              className="text-xs text-[#FAA652] hover:text-[#FAD352] underline underline-offset-2 flex items-center gap-1 font-medium transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Campus Security Drop-off Desks
            </button>
          </div>
        </div>

        {/* Right metrics grid styled with the 6 palette colors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {/* #FA8952 for Lost Items */}
          <div 
            onClick={() => onQuickFilterStatus('lost')}
            style={{ borderColor: 'rgba(250,137,82,0.45)' }}
            className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border hover:border-[#FA8952] transition-all p-3.5 rounded-xl text-center group"
          >
            <div style={{ color: '#FA8952' }} className="text-2xl font-black group-hover:scale-105 transition-transform">
              {lostCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <AlertCircle style={{ color: '#FA8952' }} className="w-3 h-3" />
              Active Lost
            </div>
          </div>

          {/* #FAA652 for Found Items */}
          <div 
            onClick={() => onQuickFilterStatus('found')}
            style={{ borderColor: 'rgba(250,166,82,0.45)' }}
            className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border hover:border-[#FAA652] transition-all p-3.5 rounded-xl text-center group"
          >
            <div style={{ color: '#FAA652' }} className="text-2xl font-black group-hover:scale-105 transition-transform">
              {foundCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <MapPin style={{ color: '#FAA652' }} className="w-3 h-3" />
              Items Found
            </div>
          </div>

          {/* #FABF52 for Claim Pending */}
          <div 
            onClick={() => onQuickFilterStatus('claim pending')}
            style={{ borderColor: 'rgba(250,191,82,0.45)' }}
            className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border hover:border-[#FABF52] transition-all p-3.5 rounded-xl text-center group"
          >
            <div style={{ color: '#FABF52' }} className="text-2xl font-black group-hover:scale-105 transition-transform">
              {pendingCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <Clock style={{ color: '#FABF52' }} className="w-3 h-3" />
              Claims Pending
            </div>
          </div>

          {/* #FAD352 for Reunited! */}
          <div 
            onClick={() => onQuickFilterStatus('returned')}
            style={{ borderColor: 'rgba(250,211,82,0.45)' }}
            className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border hover:border-[#FAD352] transition-all p-3.5 rounded-xl text-center group"
          >
            <div style={{ color: '#FAD352' }} className="text-2xl font-black group-hover:scale-105 transition-transform">
              {returnedCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 style={{ color: '#FAD352' }} className="w-3 h-3" />
              Reunited!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

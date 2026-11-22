import React from 'react';
import { Search, PlusCircle, ShieldCheck, RefreshCw, UserCheck } from 'lucide-react';

export default function Navbar({ onOpenPost, currentAlias, onResetData, onOpenSafety }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#FAD3AD]/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & College Identity: Palette Gradient #FA8952 -> #FAA652 -> #FABF52 */}
          <div className="flex items-center gap-3">
            <div 
              style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)' }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md shadow-[#FA8952]/30 font-black text-xl tracking-tight"
            >
              LPU
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Find My Stuff
                </span>
                <span 
                  style={{ backgroundColor: '#FAD3AD40', color: '#FA8952', borderColor: '#FABF52' }}
                  className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-full border"
                >
                  Campus Lost &amp; Found
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Lovely Professional University Official Item Recovery &amp; Anonymous Claim Portal
              </p>
            </div>
          </div>

          {/* Action buttons with the 6-color palette */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Safety guidelines link */}
            <button
              onClick={onOpenSafety}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-[#FA8952] hover:bg-[#FAD3AD]/30 rounded-lg transition-colors border border-transparent hover:border-[#FAA652]/40"
              title="Campus Handover Safety & Security Guidelines"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Campus Guidelines</span>
            </button>

            {/* Post Lost Button: Palette #FA8952 */}
            <button
              onClick={() => onOpenPost('lost')}
              style={{ borderColor: '#FA8952', color: '#FA8952', backgroundColor: '#FAA59618' }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border hover:bg-[#FA8952]/20 active:scale-95 transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Lost</span>
            </button>

            {/* Post Found Button: Gradient #FAA652 -> #FABF52 */}
            <button
              onClick={() => onOpenPost('found')}
              style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)' }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold text-white hover:brightness-105 active:scale-95 transition-all shadow-sm shadow-[#FA8952]/25"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Report Found</span>
            </button>

            {/* Active User Masked Alias Pill (#FAD3AD & #FAA652) */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div 
                style={{ backgroundColor: '#FAD3AD25', borderColor: '#FAD3AD' }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium text-slate-700"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#FA8952]" />
                <span>Masked: <strong className="text-slate-900">{currentAlias}</strong></span>
              </div>
            </div>

            {/* Reset Seed Data */}
            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

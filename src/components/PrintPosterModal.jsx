import React from 'react';
import { X, Printer, QrCode, Shield, MapPin, Calendar, Tag } from 'lucide-react';

export default function PrintPosterModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#FAD352]" />
            <span className="font-bold text-sm">Printable Campus Notice Flyer</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)' }}
              className="px-3.5 py-1.5 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Notice Sheet */}
        <div className="p-8 sm:p-10 space-y-6 bg-white text-slate-900" id="printable-notice">
          
          {/* Official College Header with Palette Stripe */}
          <div 
            style={{ borderBottomColor: '#FA8952' }}
            className="border-b-4 pb-4 text-center"
          >
            <div 
              style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)' }}
              className="inline-block px-3 py-1 text-white font-black text-sm tracking-widest rounded mb-1 shadow-xs"
            >
              LOVELY PROFESSIONAL UNIVERSITY
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 mt-1">
              OFFICIAL {item.type === 'lost' ? 'LOST PROPERTY' : 'FOUND BELONGING'} NOTICE
            </h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
              Campus Security &amp; Student Welfare Item Recovery Portal • Reference #{item.id}
            </p>
          </div>

          {/* Central Item Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="aspect-4/3 rounded-xl overflow-hidden border-2 border-slate-300 bg-slate-100 flex items-center justify-center">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6 text-slate-400">
                  <Tag className="w-12 h-12 stroke-1 text-slate-300 mx-auto mb-1" />
                  <p className="text-xs">No Photo</p>
                </div>
              )}
            </div>

            {/* Key details */}
            <div className="space-y-3">
              <span 
                style={{
                  backgroundColor: item.type === 'lost' ? '#FA8952' : '#FAA652',
                  color: '#ffffff'
                }}
                className="inline-block px-3 py-1 rounded text-xs font-black uppercase tracking-wider shadow-xs"
              >
                {item.type === 'lost' ? 'Missing / Lost' : 'Found on Campus'}
              </span>

              <h2 className="text-xl font-black text-slate-900 leading-snug">
                {item.title}
              </h2>

              <div className="text-xs space-y-1.5 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Campus Spot:</strong> {item.building}</p>
                {item.specificLocation && <p><strong>Specific:</strong> {item.specificLocation}</p>}
                <p><strong>Date:</strong> {item.date} {item.time ? `(${item.time})` : ''}</p>
                <p><strong>Status:</strong> {item.status.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs leading-relaxed">
            <strong className="block text-slate-900 font-bold uppercase mb-1">Details &amp; Description:</strong>
            <p className="text-slate-700">{item.description}</p>
          </div>

          {/* How to Claim / Secret Proof Instructions */}
          <div 
            style={{ backgroundColor: '#FAD3AD25', borderColor: '#FABF52' }}
            className="p-4 rounded-xl border-2 border-dashed flex items-center justify-between gap-4"
          >
            <div className="space-y-1 text-xs">
              <h4 style={{ color: '#FA8952' }} className="font-bold uppercase">
                HOW TO SAFELY CLAIM OR RETURN:
              </h4>
              <p className="text-slate-800">
                1. Visit the portal or scan the code below.
              </p>
              <p className="text-slate-800">
                2. Enter reference code <strong>#{item.id}</strong>.
              </p>
              <p className="text-slate-800">
                3. Provide the secret identifying detail that only the owner knows.
              </p>
              <p className="text-slate-800">
                4. Coordinate handover at UniMall or Block Security Desks.
              </p>
            </div>

            <div className="w-24 h-24 bg-white border border-slate-300 rounded-lg p-2 flex flex-col items-center justify-center shrink-0 text-center shadow-xs">
              <QrCode className="w-12 h-12 text-slate-900" />
              <span className="text-[9px] font-mono font-bold mt-1 text-slate-600">#{item.id}</span>
            </div>
          </div>

          {/* Privacy footer */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-3">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Masked Student Contact: <strong>{item.reporterAlias}</strong> (Phone/Email securely masked)</span>
            </div>
            <span>LPU Find My Stuff Portal</span>
          </div>

          {/* Tear-off Slips at the bottom */}
          <div className="border-t-2 border-dashed border-slate-300 pt-4 mt-6">
            <div className="text-[10px] text-slate-400 uppercase font-mono text-center mb-2">
              ✂ Tear-off contact slip for students
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-slate-600 font-mono">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2 border border-slate-300 rounded bg-slate-50 space-y-0.5">
                  <div className="font-bold text-slate-800 truncate">{item.title}</div>
                  <div style={{ color: '#FA8952' }} className="font-bold">#{item.id}</div>
                  <div className="text-[9px] text-slate-500">findmystuff.lpu.in</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

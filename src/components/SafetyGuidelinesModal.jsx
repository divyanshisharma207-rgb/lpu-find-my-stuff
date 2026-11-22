import React from 'react';
import { X, ShieldCheck, MapPin, AlertTriangle, Lock, CheckCircle2, PhoneCall } from 'lucide-react';
import { SAFE_MEETUP_POINTS } from '../constants/data';

export default function SafetyGuidelinesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">
              <ShieldCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Campus Safety & Handover Protocols</h2>
              <p className="text-xs text-emerald-100">Official student protection guidelines for LPU campus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
          
          {/* Privacy Protection */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-blue-900">1. Why We Keep Personal Details Hidden</h4>
              <p className="text-blue-800 text-xs leading-relaxed">
                To protect students from phishing, social engineering, and phone harassment, real phone numbers, registration numbers, and personal emails are never published. Always communicate through the in-app Masked Chat.
              </p>
            </div>
          </div>

          {/* Secret Proof Requirement */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900">2. Owner Secret Verification Rule</h4>
              <p className="text-amber-800 text-xs leading-relaxed">
                Never hand over an item without asking for a detail that is not visible on the outside (such as lock screen wallpaper, engraving, specific scratches, items inside a pocket, or invoice).
              </p>
            </div>
          </div>

          {/* Official Campus Drop-off Points */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Recommended Campus Security Meeting Points</span>
            </h4>
            <div className="space-y-1.5">
              {SAFE_MEETUP_POINTS.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Rules */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Campus Security Golden Rules:
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>Meet during daylight hours (9:00 AM – 5:30 PM).</li>
              <li>Always meet in open, public, CCTV-monitored university zones.</li>
              <li>Never transfer money, courier fees, or "security deposits" to anyone claiming to have found your item.</li>
              <li>Ask the student to present their original LPU University Identity Card before final handover.</li>
            </ul>
          </div>

          {/* Security emergency contact */}
          <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-orange-400" />
              <span>Campus Security Control Room (24x7): <strong>01824-517000 / Ext: 4444</strong></span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}

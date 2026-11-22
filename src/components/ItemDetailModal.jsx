import React from 'react';
import { 
  X, MapPin, Calendar, Clock, Tag, Shield, Key, CheckCircle2, 
  AlertCircle, MessageSquare, Printer, Share2, HelpCircle, ArrowRight 
} from 'lucide-react';
import { ITEM_STATUSES } from '../constants/data';

export default function ItemDetailModal({
  isOpen,
  onClose,
  item,
  onOpenClaim,
  onOpenChat,
  onOpenPoster,
  onUpdateStatus
}) {
  if (!isOpen || !item) return null;

  const getStepActive = (stepName) => {
    if (item.status === 'returned') return true;
    if (item.status === 'claim pending') {
      return stepName === 'reported' || stepName === 'claimed';
    }
    if (item.status === 'lost' || item.status === 'found') {
      return stepName === 'reported';
    }
    if (item.status === 'expired') {
      return stepName === 'reported';
    }
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span
              style={{
                backgroundColor: item.type === 'lost' ? '#FA8952' : '#FAA652',
                color: '#ffffff'
              }}
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
            >
              {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
            </span>
            <span className="font-mono text-xs text-slate-400">
              Reference #{item.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPoster(item)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-medium flex items-center gap-1.5"
              title="Print Campus Notice"
            >
              <Printer className="w-4 h-4 text-[#FAD352]" />
              <span className="hidden sm:inline">Print Poster</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Status Lifecycle Progress Tracker */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-[#FAD3AD]/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Item Status Lifecycle Tracker
              </span>
              <span 
                style={{
                  backgroundColor: item.status === 'lost' ? '#FA895220' : item.status === 'found' ? '#FAA65220' : item.status === 'claim pending' ? '#FABF5225' : item.status === 'returned' ? '#FAD35235' : '#64748b20',
                  color: item.status === 'lost' ? '#FA8952' : item.status === 'found' ? '#FAA652' : item.status === 'claim pending' ? '#b45309' : item.status === 'returned' ? '#92400e' : '#475569',
                  borderColor: item.status === 'lost' ? '#FA895260' : item.status === 'found' ? '#FAA65260' : item.status === 'claim pending' ? '#FABF5280' : item.status === 'returned' ? '#FAD352' : '#64748b60'
                }}
                className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border"
              >
                Current: {item.status}
              </span>
            </div>

            {/* Step Pipeline using Palette Colors */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div 
                style={getStepActive('reported') ? { backgroundColor: '#FA895215', borderColor: '#FA895280', color: '#FA8952' } : {}}
                className="p-2 rounded-xl border bg-white border-slate-200 text-slate-400 font-semibold"
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Step 1</div>
                <div>1. Item Reported</div>
              </div>

              <div 
                style={getStepActive('claimed') ? { backgroundColor: '#FABF5220', borderColor: '#FABF5290', color: '#b45309' } : {}}
                className="p-2 rounded-xl border bg-white border-slate-200 text-slate-400 font-semibold"
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Step 2</div>
                <div>2. Claim &amp; Secret Proof</div>
              </div>

              <div 
                style={item.status === 'returned' ? { backgroundColor: '#FAD35235', borderColor: '#FAD352', color: '#92400e' } : {}}
                className="p-2 rounded-xl border bg-white border-slate-200 text-slate-400 font-semibold"
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Step 3</div>
                <div>3. Verified &amp; Returned</div>
              </div>
            </div>

            {/* Quick Status Override Buttons */}
            <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 font-medium">Update Status Tracking:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {['lost', 'found', 'claim pending', 'returned', 'expired'].map((st) => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(item.id, st)}
                    style={item.status === st ? { background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)', color: '#ffffff' } : {}}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                      item.status === st
                        ? 'border-transparent shadow-xs'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Info Columns: Photo & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Photo */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 flex items-center justify-center">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 text-slate-400">
                  <Tag className="w-12 h-12 stroke-1 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs">No photograph provided</p>
                </div>
              )}
            </div>

            {/* Right Meta details */}
            <div className="space-y-4">
              <div>
                <span 
                  style={{ backgroundColor: '#FAD3AD35', color: '#FA8952', borderColor: '#FAD3AD' }}
                  className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md mb-2 border"
                >
                  <Tag style={{ color: '#FAA652' }} className="w-3.5 h-3.5" />
                  {item.category}
                </span>
                <h1 className="text-xl font-bold text-slate-900 leading-snug">
                  {item.title}
                </h1>
              </div>

              {/* Location Card */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-start gap-2 text-slate-900 font-semibold">
                  <MapPin style={{ color: '#FA8952' }} className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{item.building}</span>
                </div>
                {item.specificLocation && (
                  <p className="text-slate-600 pl-6">
                    Exact Spot: {item.specificLocation}
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-700">
                  <Calendar style={{ color: '#FAA652' }} className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-700">
                  <Clock style={{ color: '#FABF52' }} className="w-4 h-4" />
                  <span>{item.time || 'Approx. Time'}</span>
                </div>
              </div>

              {/* Masked Reporter & Privacy Note */}
              <div 
                style={{ backgroundColor: '#FAD3AD15', borderColor: '#FAD3AD' }}
                className="p-3 border rounded-xl text-xs text-slate-800 flex items-start gap-2.5"
              >
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    Reported by Masked Student: <span style={{ color: '#FA8952' }} className="font-mono">{item.reporterAlias}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    No phone number or personal email is exposed. All communication happens safely through the portal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Item Details &amp; Description
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {item.description}
            </div>
          </div>

          {/* Verification Question if present */}
          {item.secretQuestion && (
            <div 
              style={{ backgroundColor: '#FAD3AD25', borderColor: '#FABF52' }}
              className="p-4 rounded-xl border text-xs space-y-1"
            >
              <div className="flex items-center gap-2 font-bold" style={{ color: '#FA8952' }}>
                <HelpCircle className="w-4 h-4 text-[#FAA652]" />
                <span>Verification Question from Finder:</span>
              </div>
              <p className="text-slate-800 pl-6 font-medium">
                "{item.secretQuestion}"
              </p>
            </div>
          )}

          {/* Claims & Claims Queue */}
          {(item.claims && item.claims.length > 0) && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#FAA652]" />
                <span>Submitted Claims ({item.claims.length})</span>
              </h4>
              <div className="space-y-2">
                {item.claims.map((claim) => (
                  <div
                    key={claim.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        Claimed by: {claim.claimerAlias}
                      </span>
                      <span 
                        style={{
                          backgroundColor: claim.status === 'approved' ? '#10b98120' : claim.status === 'rejected' ? '#FA895220' : '#FABF5225',
                          color: claim.status === 'approved' ? '#047857' : claim.status === 'rejected' ? '#FA8952' : '#b45309'
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                      >
                        {claim.status}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-700">
                      <strong>Secret Proof:</strong> {claim.secretProof}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline History */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Timeline History
            </h4>
            <div className="space-y-2 border-l-2 border-slate-200 ml-2 pl-4 text-xs">
              {(item.timeline || []).map((tl, idx) => (
                <div key={idx} className="relative">
                  <div 
                    style={{ backgroundColor: '#FA8952' }}
                    className="w-2 h-2 rounded-full absolute -left-[21px] top-1.5" 
                  />
                  <p className="font-semibold text-slate-800">{tl.action}</p>
                  <p className="text-[11px] text-slate-400">{tl.date} • {tl.user}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onOpenPoster(item)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Generate Notice Flyer</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Masked Chat */}
            <button
              onClick={() => {
                onClose();
                onOpenChat(item);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#FAD352]" />
              <span>Masked Chat</span>
            </button>

            {/* Claim button */}
            {item.status !== 'returned' && item.status !== 'expired' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenClaim(item);
                }}
                style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)' }}
                className="px-4 py-2 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#FA8952]/20 active:scale-95 transition-all hover:brightness-105"
              >
                <Key className="w-3.5 h-3.5 text-white" />
                <span>
                  {item.type === 'found' ? 'Claim This Item' : 'I Found This Item'}
                </span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

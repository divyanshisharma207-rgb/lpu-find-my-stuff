import React, { useState } from 'react';
import { X, Key, Shield, HelpCircle, Upload, CheckCircle2, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClaimModal({
  isOpen,
  onClose,
  item,
  onSubmitClaim,
  currentAlias
}) {
  if (!isOpen || !item) return null;

  const [secretProof, setSecretProof] = useState('');
  const [proofPhotoUrl, setProofPhotoUrl] = useState('');
  const [claimerAlias, setClaimerAlias] = useState(currentAlias || `Student_${Math.floor(2000 + Math.random() * 7000)}`);
  const [initialMessage, setInitialMessage] = useState('');
  const [error, setError] = useState('');

  const handleProofPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image should be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProofPhotoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!secretProof.trim()) {
      setError("Please describe a secret detail only the true owner would know to prevent fraud.");
      return;
    }

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FA8952', '#FABF52', '#FAA652', '#FAA596', '#FAD352', '#FAD3AD']
      });
    } catch (e) {}

    const claimData = {
      id: `claim-${Date.now()}`,
      claimerAlias: claimerAlias.trim() || 'Claimant_Student',
      createdAt: new Date().toISOString(),
      secretProof: secretProof.trim(),
      proofPhotoUrl: proofPhotoUrl.trim(),
      status: 'pending',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderAlias: claimerAlias.trim() || 'Claimant_Student',
          senderRole: 'claimer',
          text: initialMessage.trim() || `Hello! I have submitted an ownership claim for this item with my secret verification detail: "${secretProof.trim()}". Can we coordinate a safe handover at a campus security desk?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    onSubmitClaim(item.id, claimData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Header using Palette: #FA8952 to #FAA652 to #FABF52 */}
        <div 
          style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)' }}
          className="p-5 text-white flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Claim Ownership Verification</h2>
              <p className="text-xs text-white/90">
                LPU Anti-Fraud System: Provide proof only the owner knows
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Claim Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          
          {/* Item Snapshot Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-[#FAD3AD]/80">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <span>#{item.id}</span>
                <span>•</span>
                <span style={{ color: '#FA8952' }} className="font-semibold">{item.category}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
              <p className="text-xs text-slate-500 truncate">{item.building}</p>
            </div>
          </div>

          {/* Finder's Question if provided */}
          {item.secretQuestion ? (
            <div 
              style={{ backgroundColor: '#FAD3AD25', borderColor: '#FABF52' }}
              className="p-3.5 rounded-xl border text-xs space-y-1"
            >
              <div className="flex items-center gap-1.5 font-bold" style={{ color: '#FA8952' }}>
                <HelpCircle className="w-4 h-4 text-[#FAA652]" />
                <span>Verification Question from Finder:</span>
              </div>
              <p className="text-slate-800 font-medium pl-5">
                "{item.secretQuestion}"
              </p>
            </div>
          ) : (
            <div 
              style={{ backgroundColor: '#FAD3AD15', borderColor: '#FAD3AD' }}
              className="p-3 rounded-xl border text-xs text-slate-800 flex items-start gap-2"
            >
              <Shield style={{ color: '#FA8952' }} className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                To prevent false claims, describe distinct marks, contents, wallpaper, scratches, or serial numbers that prove ownership.
              </span>
            </div>
          )}

          {/* Secret Proof Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Secret Detail (Only Owner Would Know) *</span>
              <span style={{ color: '#FA8952' }} className="text-[11px] font-semibold">Required for review</span>
            </label>
            <textarea
              rows={4}
              placeholder="e.g. 'Inside the front zipper is a silver keychain with 3 keys. The phone wallpaper is a night sky. Bottom right corner has a small scratch from last week.'"
              value={secretProof}
              onChange={(e) => {
                setSecretProof(e.target.value);
                if (error) setError('');
              }}
              className={`w-full p-3 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/30 text-slate-900 ${
                error ? 'border-[#FA8952]' : 'border-slate-300'
              }`}
            />
            {error && (
              <p className="text-[#FA8952] text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          {/* Optional Proof Attachment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Optional Supporting Proof Photo (Invoice, Box, or ID Match)
            </label>
            <div className="flex items-center gap-3">
              <label className="flex-1 border border-dashed border-slate-300 hover:border-[#FA8952] rounded-xl p-2.5 text-center cursor-pointer bg-slate-50 text-xs font-medium text-slate-700 flex items-center justify-center gap-2">
                <Upload style={{ color: '#FAA652' }} className="w-4 h-4" />
                <span>Upload bill, receipt, or original box photo</span>
                <input type="file" accept="image/*" onChange={handleProofPhoto} className="hidden" />
              </label>
              {proofPhotoUrl && (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-300 shrink-0">
                  <img src={proofPhotoUrl} alt="Proof" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setProofPhotoUrl('')}
                    className="absolute top-0 right-0 bg-slate-900/80 text-white rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Initial Message to Finder */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              First Masked Message to Finder (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Hi! I can meet you at UniMall Security Desk around 3 PM today."
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/30"
            />
          </div>

          {/* Masked Alias Info */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Contacting as: <strong className="text-slate-900">{claimerAlias}</strong></span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
              Phone &amp; Email Protected
            </span>
          </div>

          {/* Notice: Status Shift */}
          <div 
            style={{ backgroundColor: '#FABF5220', borderColor: '#FABF5280', color: '#b45309' }}
            className="p-2.5 rounded-lg border text-[11px] flex items-center gap-2 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FABF52] shrink-0" />
            <span>
              Submitting this claim will automatically change item status to <strong>Claim Pending</strong> while you and the finder confirm details.
            </span>
          </div>

          {/* Footer Actions with Palette button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)' }}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white hover:brightness-105 shadow-md shadow-[#FA8952]/25 active:scale-95 transition-all flex items-center gap-2"
            >
              <Key className="w-4 h-4 text-white" />
              <span>Submit Secret Claim</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, Send, Shield, Lock, MapPin, CheckCircle2, Clock, 
  AlertTriangle, User, Key, Sparkles, Building 
} from 'lucide-react';
import { SAFE_MEETUP_POINTS } from '../constants/data';
import confetti from 'canvas-confetti';

export default function AnonymousChatModal({
  isOpen,
  onClose,
  item,
  onSendMessage,
  onUpdateClaimStatus,
  currentAlias
}) {
  if (!isOpen || !item) return null;

  const claims = item.claims || [];
  const activeClaim = claims[0] || null;
  const messages = activeClaim ? activeClaim.messages || [] : [];

  const [inputMessage, setInputMessage] = useState('');
  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState(SAFE_MEETUP_POINTS[0]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    onSendMessage(item.id, activeClaim ? activeClaim.id : null, {
      id: `msg-${Date.now()}`,
      senderAlias: currentAlias || 'Student_User',
      senderRole: 'student',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setInputMessage('');
  };

  const handleInsertMeetup = () => {
    setInputMessage(
      `Let's coordinate a safe handover at the official campus security desk: ${selectedMeetingPoint}. Are you available around 3:30 PM today?`
    );
  };

  const handleApproveAndReturn = () => {
    if (confirm("Are you satisfied with the secret proof provided and want to confirm handover? This will mark the item as 'Returned'.")) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FA8952', '#FABF52', '#FAA652', '#FAA596', '#FAD352', '#FAD3AD']
        });
      } catch (e) {}

      onUpdateClaimStatus(item.id, activeClaim.id, 'approved', 'returned');
    }
  };

  const handleRejectClaim = () => {
    if (confirm("Reject this claim? The claimant's secret proof did not match. Item will remain active.")) {
      onUpdateClaimStatus(item.id, activeClaim.id, 'rejected', item.type === 'found' ? 'found' : 'lost');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Chat Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div 
              style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)' }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
            >
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">Masked Campus Chat</h3>
                <span 
                  style={{ backgroundColor: '#FAD3AD35', color: '#FAD352', borderColor: '#FABF52' }}
                  className="border px-2 py-0.2 rounded-full text-[10px] font-bold"
                >
                  Privacy Protected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Item: <span className="text-white font-medium">{item.title}</span> (#{item.id})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Privacy Shield Notice Strip */}
        <div 
          style={{ backgroundColor: '#FAD3AD20', borderColor: '#FAD3AD' }}
          className="border-b px-4 py-2 flex items-center justify-between text-xs text-slate-800 shrink-0"
        >
          <div className="flex items-center gap-2">
            <Shield style={{ color: '#FA8952' }} className="w-4 h-4 shrink-0" />
            <span>
              Real phone numbers and emails are <strong>strictly hidden</strong>. You are chatting as <strong style={{ color: '#FA8952' }} className="font-mono">"{currentAlias}"</strong>.
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-600 hidden sm:inline">
            Status: <strong className="uppercase" style={{ color: '#FAA652' }}>{item.status}</strong>
          </span>
        </div>

        {/* Secret Proof Evaluation Banner */}
        {activeClaim && (
          <div 
            style={{ backgroundColor: '#FAD3AD15', borderColor: '#FABF52' }}
            className="border-b p-3.5 shrink-0 text-xs text-slate-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold" style={{ color: '#FA8952' }}>
                <Key className="w-4 h-4 text-[#FAA652]" />
                <span>Claimant's Secret Identifying Detail:</span>
              </div>
              <span 
                style={{
                  backgroundColor: activeClaim.status === 'approved' ? '#10b98120' : activeClaim.status === 'rejected' ? '#FA895220' : '#FABF5225',
                  color: activeClaim.status === 'approved' ? '#047857' : activeClaim.status === 'rejected' ? '#FA8952' : '#b45309'
                }}
                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
              >
                Claim {activeClaim.status}
              </span>
            </div>
            
            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 italic">
              "{activeClaim.secretProof}"
            </p>

            {activeClaim.status === 'pending' && (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleApproveAndReturn}
                  style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)' }}
                  className="px-3.5 py-1.5 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors hover:brightness-105"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify Secret &amp; Mark Returned</span>
                </button>
                <button
                  onClick={handleRejectClaim}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-[#FA8952]/15 hover:text-[#FA8952] text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Does Not Match (Reject)
                </button>
              </div>
            )}

            {activeClaim.status === 'approved' && (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified! Claim approved and item marked as Returned.</span>
              </div>
            )}
          </div>
        )}

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Shield style={{ color: '#FAA652' }} className="w-12 h-12 stroke-1 mb-2 opacity-60" />
              <p className="text-sm font-semibold text-slate-700">Secure In-App Discussion</p>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Use this chat to verify item specifics, ask questions, and arrange a safe handover at one of the official campus security desks.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderAlias === currentAlias;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-0.5 px-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="font-semibold text-slate-600">{msg.senderAlias}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    style={isMe ? { background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)', color: '#ffffff' } : {}}
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-xs ${
                      isMe
                        ? 'rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Safe Campus Meeting Point Quick Selector */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Building style={{ color: '#FA8952' }} className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Safe Campus Drop-off:</span>
            <select
              value={selectedMeetingPoint}
              onChange={(e) => setSelectedMeetingPoint(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 max-w-xs truncate font-normal"
            >
              {SAFE_MEETUP_POINTS.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleInsertMeetup}
            style={{ color: '#FA8952', borderColor: '#FABF52' }}
            className="px-2.5 py-1 bg-white hover:bg-[#FAD3AD]/30 border rounded font-semibold text-xs transition-colors flex items-center gap-1"
          >
            <MapPin style={{ color: '#FA8952' }} className="w-3 h-3" />
            <span>Insert Meetup Suggestion</span>
          </button>
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Type a safe message (Do not share bank OTP or personal passwords)..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/40 focus:border-[#FA8952] text-slate-900"
          />
          <button
            type="submit"
            style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)' }}
            className="p-2.5 text-white rounded-xl transition-colors active:scale-95 shadow-xs hover:brightness-105"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>

      </div>
    </div>
  );
}

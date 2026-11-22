import React from 'react';
import { 
  MapPin, Calendar, Clock, Tag, MessageSquare, Shield, 
  Key, CheckCircle2, AlertCircle, Printer, ChevronRight, User 
} from 'lucide-react';
import { ITEM_STATUSES } from '../constants/data';

export default function ItemCard({
  item,
  onOpenDetail,
  onOpenClaim,
  onOpenChat,
  onOpenPoster
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'lost':
        return (
          <span 
            style={{ backgroundColor: '#FA895220', color: '#FA8952', borderColor: '#FA895260' }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-xs"
          >
            <AlertCircle className="w-3 h-3 text-[#FA8952]" />
            Lost
          </span>
        );
      case 'found':
        return (
          <span 
            style={{ backgroundColor: '#FAA65220', color: '#FAA652', borderColor: '#FAA65260' }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-xs"
          >
            <MapPin className="w-3 h-3 text-[#FAA652]" />
            Found
          </span>
        );
      case 'claim pending':
        return (
          <span 
            style={{ backgroundColor: '#FABF5225', color: '#b45309', borderColor: '#FABF5280' }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-xs animate-pulse-subtle"
          >
            <Clock className="w-3 h-3 text-[#FABF52]" />
            Claim Pending
          </span>
        );
      case 'returned':
        return (
          <span 
            style={{ backgroundColor: '#FAD35235', color: '#92400e', borderColor: '#FAD352' }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border"
          >
            <CheckCircle2 className="w-3 h-3 text-[#FABF52]" />
            Returned
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-300">
            Expired
          </span>
        );
      default:
        return null;
    }
  };

  const totalMessages = (item.claims || []).reduce(
    (acc, claim) => acc + (claim.messages ? claim.messages.length : 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl border border-[#FAD3AD]/80 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group hover:border-[#FAA652]/60">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
            <Tag className="w-10 h-10 stroke-1 text-slate-300 mb-1" />
            <span className="text-xs font-medium">No photo provided</span>
          </div>
        )}

        {/* Floating Type Pill (#FA8952 for LOST, #FAA652 for FOUND) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            style={{
              backgroundColor: item.type === 'lost' ? '#FA8952' : '#FAA652',
              color: '#ffffff'
            }}
            className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md"
          >
            {item.type === 'lost' ? '● LOST ITEM' : '● FOUND ITEM'}
          </span>
        </div>

        {/* Floating Status Pill */}
        <div className="absolute top-3 right-3 shadow-xs">
          {getStatusBadge(item.status)}
        </div>

        {/* Reference ID Pill */}
        <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded font-mono">
          #{item.id}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          
          {/* Category & Date */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span 
              style={{ backgroundColor: '#FAD3AD35', color: '#FA8952', borderColor: '#FAD3AD' }}
              className="inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-md border"
            >
              <Tag style={{ color: '#FAA652' }} className="w-3 h-3" />
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Calendar className="w-3 h-3" />
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetail(item)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-[#FA8952] cursor-pointer transition-colors"
          >
            {item.title}
          </h3>

          {/* Location details */}
          <div className="space-y-1 text-xs text-slate-600 bg-[#FAD3AD]/10 p-2.5 rounded-xl border border-[#FAD3AD]/40">
            <div className="flex items-start gap-1.5 font-semibold text-slate-800">
              <MapPin style={{ color: '#FA8952' }} className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item.building}</span>
            </div>
            {item.specificLocation && (
              <p className="text-[11px] text-slate-500 pl-5 line-clamp-1">
                Spot: {item.specificLocation}
              </p>
            )}
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Masked Reporter & Privacy notice */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1" title="Real personal details are masked for student privacy">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Masked: <strong>{item.reporterAlias}</strong></span>
            </div>
            <span className="text-slate-400 font-mono text-[10px]">
              {item.time || 'Approx time'}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col gap-2">
          {/* Main Action: Claim or Report Having Found */}
          {item.status !== 'returned' && item.status !== 'expired' && (
            <button
              onClick={() => onOpenClaim(item)}
              style={{
                background: item.type === 'found'
                  ? 'linear-gradient(135deg, #FA8952 0%, #FAA652 50%, #FABF52 100%)'
                  : 'linear-gradient(135deg, #FAA652 0%, #FABF52 50%, #FAD352 100%)'
              }}
              className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 hover:brightness-105 transition-all active:scale-98 shadow-sm shadow-[#FA8952]/20"
            >
              <Key className="w-3.5 h-3.5 text-white" />
              <span>
                {item.type === 'found' ? 'Claim This Item (Prove Detail)' : 'I Found This! (Notify Owner)'}
              </span>
            </button>
          )}

          {/* Secondary Buttons Row: In-App Chat, Detail, Print Poster */}
          <div className="flex items-center gap-1.5">
            {/* Anonymous Masked Chat Button */}
            <button
              onClick={() => onOpenChat(item)}
              className="flex-1 py-1.5 px-2.5 bg-slate-100 hover:bg-[#FAD3AD]/30 hover:text-[#FA8952] text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              title="Secure In-App Chat without revealing phone or email"
            >
              <MessageSquare style={{ color: '#FA8952' }} className="w-3.5 h-3.5" />
              <span>Masked Chat</span>
              {totalMessages > 0 && (
                <span 
                  style={{ backgroundColor: '#FA8952' }}
                  className="ml-0.5 px-1.5 py-0.2 text-white rounded-full text-[10px] font-bold"
                >
                  {totalMessages}
                </span>
              )}
            </button>

            {/* View Full Details Button */}
            <button
              onClick={() => onOpenDetail(item)}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 flex items-center gap-1"
              title="View lifecycle history, claims, and full photos"
            >
              <span>Details</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </button>

            {/* Print Notice flyer */}
            <button
              onClick={() => onOpenPoster(item)}
              className="p-1.5 text-slate-500 hover:text-[#FA8952] hover:bg-[#FAD3AD]/30 rounded-lg transition-colors border border-slate-200"
              title="Generate printable Campus Notice poster"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, Upload, Camera, MapPin, Calendar, Tag, Shield, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { CAMPUS_BUILDINGS, ITEM_CATEGORIES } from '../constants/data';

const PRESET_PHOTOS = [
  { label: 'Laptop', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { label: 'AirPods / Earbuds', url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80' },
  { label: 'ID Card / Lanyard', url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80' },
  { label: 'Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' },
  { label: 'Keys & Wallet', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80' },
  { label: 'Calculator / Study', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Water Bottle / Flask', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
  { label: 'Eyeglasses', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80' }
];

export default function PostItemModal({ isOpen, onClose, initialType = 'lost', onSave, currentAlias }) {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const currentTimeStr = new Date().toTimeString().slice(0, 5);

  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(ITEM_CATEGORIES[0]);
  const [building, setBuilding] = useState(CAMPUS_BUILDINGS[0]);
  const [specificLocation, setSpecificLocation] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(currentTimeStr);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [secretAnswerHint, setSecretAnswerHint] = useState('');
  const [reporterAlias, setReporterAlias] = useState(currentAlias || `Student_${Math.floor(1000 + Math.random() * 9000)}`);
  const [errors, setErrors] = useState({});

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size should be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Item title is required";
    if (!description.trim()) errs.description = "Please provide an accurate description";
    if (!building) errs.building = "Campus location/building is required";
    if (!date) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newItem = {
      id: `LPU-2026-${Math.floor(200 + Math.random() * 800)}`,
      type,
      status: type === 'lost' ? 'lost' : 'found',
      title: title.trim(),
      category,
      building,
      specificLocation: specificLocation.trim(),
      date,
      time,
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      reporterAlias: reporterAlias.trim() || 'AnonymousStudent',
      reporterRole: type === 'lost' ? 'owner' : 'finder',
      contactMethod: 'In-App Masked Chat',
      secretQuestion: secretQuestion.trim(),
      secretAnswerHint: secretAnswerHint.trim(),
      claims: [],
      timeline: [
        {
          action: type === 'lost' ? 'Item Reported Lost by Owner' : 'Item Found & Reported by Finder',
          date: `${date} ${time || ''}`,
          user: reporterAlias
        }
      ],
      createdAt: new Date().toISOString()
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        
        {/* Header using Palette Gradient */}
        <div 
          style={{
            background: type === 'lost'
              ? 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)'
              : 'linear-gradient(135deg, #FAA652 0%, #FABF52 100%)'
          }}
          className="p-5 text-white flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Camera className="w-5 h-5 text-white" />
              {type === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}
            </h2>
            <p className="text-xs text-white/90 mt-0.5">
              {type === 'lost' 
                ? 'Help the LPU campus community locate your missing item.'
                : 'Help a fellow student retrieve their misplaced belongings safely.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Post Type Selector Switch */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              What do you want to report?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('lost')}
                style={type === 'lost' ? { borderColor: '#FA8952', backgroundColor: '#FA895215', color: '#FA8952' } : {}}
                className={`py-2.5 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  type === 'lost'
                    ? 'ring-2 ring-[#FA8952]/30 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <AlertCircle className={`w-4 h-4 ${type === 'lost' ? 'text-[#FA8952]' : 'text-slate-400'}`} />
                <span>I Lost Something</span>
              </button>

              <button
                type="button"
                onClick={() => setType('found')}
                style={type === 'found' ? { borderColor: '#FAA652', backgroundColor: '#FAA65215', color: '#FAA652' } : {}}
                className={`py-2.5 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  type === 'found'
                    ? 'ring-2 ring-[#FAA652]/30 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <MapPin className={`w-4 h-4 ${type === 'found' ? 'text-[#FAA652]' : 'text-slate-400'}`} />
                <span>I Found Something</span>
              </button>
            </div>
          </div>

          {/* Item Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Item Title / Name *
            </label>
            <input
              type="text"
              placeholder={type === 'lost' ? "e.g., Space Gray MacBook Air M2 in navy sleeve" : "e.g., Casio Scientific Calculator or Student ID Card"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952] ${
                errors.title ? 'border-[#FA8952]' : 'border-slate-300'
              }`}
            />
            {errors.title && <p className="text-[#FA8952] text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Category & College Building */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952]"
              >
                {ITEM_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                College Building / Campus Spot *
              </label>
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952]"
              >
                {CAMPUS_BUILDINGS.map((bld) => (
                  <option key={bld} value={bld}>
                    {bld}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Specific Room / Location Spot */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Exact Room / Bench / Corridor Spot (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Room 302 2nd bench, or UniMall food court table 12"
              value={specificLocation}
              onChange={(e) => setSpecificLocation(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/30"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date {type === 'lost' ? 'Lost' : 'Found'} *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Approximate Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              placeholder={
                type === 'lost'
                  ? "Describe color, model, visible features, when you last saw it, etc."
                  : "Describe visible features, where it was spotted, current condition (Keep secret details for verification!)"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/30 ${
                errors.description ? 'border-[#FA8952]' : 'border-slate-300'
              }`}
            />
            {errors.description && <p className="text-[#FA8952] text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Photo Upload & Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Item Photo (Upload or Choose Campus Preset)
            </label>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <label className="flex-1 w-full border-2 border-dashed border-slate-300 hover:border-[#FA8952] rounded-xl p-3 text-center cursor-pointer bg-slate-50 hover:bg-[#FAD3AD]/20 transition-colors">
                <Upload style={{ color: '#FAA652' }} className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700">Click to upload photo from device</span>
                <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>

              {imageUrl && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 hover:bg-slate-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-2.5">
              <span className="text-[11px] font-medium text-slate-500 block mb-1">
                Or quick-pick a matching stock campus photo:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PHOTOS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="text-[11px] px-2 py-1 bg-slate-100 hover:bg-[#FAD3AD]/30 hover:text-[#FA8952] text-slate-700 rounded-md border border-slate-200 transition-colors"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Question & Secret Hint */}
          <div 
            style={{ backgroundColor: '#FAD3AD20', borderColor: '#FABF52' }}
            className="p-4 rounded-xl border space-y-2.5"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: '#FA8952' }}>
              <HelpCircle className="w-4 h-4 text-[#FAA652]" />
              <span>Owner Verification Question (Anti-Fraud Protection)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {type === 'found'
                ? "Ask a question that only the real owner can answer (e.g. 'What sticker is on the back?', 'What is the phone wallpaper?', 'What name is written inside?')."
                : "Optionally ask what proof someone who found it should verify before returning."}
            </p>
            <input
              type="text"
              placeholder="e.g. What sticker is on the laptop lid or what is the keychain ring shape?"
              value={secretQuestion}
              onChange={(e) => setSecretQuestion(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#FABF52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FABF52]/30 text-slate-800"
            />
          </div>

          {/* Privacy Preservation Info */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800">
                Privacy Guaranteed: Zero Public Contact Leak
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Your post will only display your anonymized alias (<strong className="text-slate-700">{reporterAlias}</strong>). Interested students will message you via our built-in masked chat.
              </p>
            </div>
          </div>

          {/* Form Actions with Palette gradient */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: type === 'lost'
                  ? 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)'
                  : 'linear-gradient(135deg, #FAA652 0%, #FABF52 100%)'
              }}
              className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all hover:brightness-105"
            >
              {type === 'lost' ? 'Publish Lost Item' : 'Publish Found Item'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

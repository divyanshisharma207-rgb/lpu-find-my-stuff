import React from 'react';
import { Search, Filter, X, Calendar, MapPin, Tag, Layers, RefreshCw } from 'lucide-react';
import { CAMPUS_BUILDINGS, ITEM_CATEGORIES, ITEM_STATUSES } from '../constants/data';

export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalMatching,
  typeCounts
}) {
  const isFiltered =
    filters.search ||
    filters.type !== 'all' ||
    filters.category !== 'all' ||
    filters.building !== 'all' ||
    filters.status !== 'all' ||
    filters.dateRange !== 'all' ||
    filters.customDate;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#FAD3AD]/60 p-4 sm:p-5 mb-6 space-y-4">
      {/* Top row: Type Tabs and Search Box */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Type toggle buttons styled with palette */}
        <div className="inline-flex p-1 bg-[#FAD3AD]/20 rounded-xl border border-[#FAD3AD]/60 text-xs sm:text-sm font-medium self-start md:self-auto">
          {/* All Items */}
          <button
            onClick={() => onFilterChange('type', 'all')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              filters.type === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>All Items</span>
            <span className="px-1.5 py-0.2 bg-slate-200/80 text-slate-700 rounded-md text-[11px]">
              {typeCounts.all}
            </span>
          </button>

          {/* Lost Items: #FA8952 */}
          <button
            onClick={() => onFilterChange('type', 'lost')}
            style={filters.type === 'lost' ? { backgroundColor: '#FA8952', color: '#ffffff' } : {}}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              filters.type === 'lost'
                ? 'shadow-xs font-semibold'
                : 'text-slate-600 hover:text-[#FA8952]'
            }`}
          >
            <span>Lost Items</span>
            <span 
              style={filters.type === 'lost' ? { backgroundColor: 'rgba(0,0,0,0.2)', color: '#ffffff' } : { backgroundColor: '#FA895220', color: '#FA8952' }}
              className="px-1.5 py-0.2 rounded-md text-[11px] font-bold"
            >
              {typeCounts.lost}
            </span>
          </button>

          {/* Found Items: #FAA652 */}
          <button
            onClick={() => onFilterChange('type', 'found')}
            style={filters.type === 'found' ? { backgroundColor: '#FAA652', color: '#ffffff' } : {}}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              filters.type === 'found'
                ? 'shadow-xs font-semibold'
                : 'text-slate-600 hover:text-[#FAA652]'
            }`}
          >
            <span>Found Items</span>
            <span 
              style={filters.type === 'found' ? { backgroundColor: 'rgba(0,0,0,0.2)', color: '#ffffff' } : { backgroundColor: '#FAA65220', color: '#FAA652' }}
              className="px-1.5 py-0.2 rounded-md text-[11px] font-bold"
            >
              {typeCounts.found}
            </span>
          </button>
        </div>

        {/* Live Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by item name, room, description, ID..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FABF52]/40 focus:border-[#FA8952] transition-all text-slate-900 placeholder:text-slate-400"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Second row: Granular Filter Dropdowns (Category, Building, Date, Status) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        {/* Category Filter */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Tag style={{ color: '#FA8952' }} className="w-3 h-3" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952]"
          >
            <option value="all">All Categories</option>
            {ITEM_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Campus Building Filter */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin style={{ color: '#FAA652' }} className="w-3 h-3" />
            College Building / Location
          </label>
          <select
            value={filters.building}
            onChange={(e) => onFilterChange('building', e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952]"
          >
            <option value="all">All Campus Locations</option>
            {CAMPUS_BUILDINGS.map((bld) => (
              <option key={bld} value={bld}>
                {bld}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar style={{ color: '#FABF52' }} className="w-3 h-3" />
            Date Period
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952]"
          >
            <option value="all">Anytime (All Dates)</option>
            <option value="today">Today</option>
            <option value="last3days">Past 3 Days</option>
            <option value="last7days">Past 7 Days</option>
            <option value="last30days">Past 30 Days</option>
          </select>
        </div>

        {/* Item Status Tracking Filter */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers style={{ color: '#FAD352' }} className="w-3 h-3" />
            Item Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#FABF52]/30 focus:border-[#FA8952]"
          >
            {ITEM_STATUSES.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter summary bar */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-slate-800">{totalMatching}</strong> items matching criteria
          </span>
          {isFiltered && (
            <span 
              style={{ backgroundColor: '#FAD3AD50', color: '#FA8952', borderColor: '#FABF52' }}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border"
            >
              Filters Active
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            style={{ color: '#FA8952' }}
            className="text-xs font-bold hover:underline flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset All Filters
          </button>
        )}
      </div>
    </div>
  );
}

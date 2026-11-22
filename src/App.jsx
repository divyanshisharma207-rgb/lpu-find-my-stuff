import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBanner from './components/StatsBanner';
import FilterBar from './components/FilterBar';
import ItemCard from './components/ItemCard';
import PostItemModal from './components/PostItemModal';
import ClaimModal from './components/ClaimModal';
import AnonymousChatModal from './components/AnonymousChatModal';
import ItemDetailModal from './components/ItemDetailModal';
import PrintPosterModal from './components/PrintPosterModal';
import SafetyGuidelinesModal from './components/SafetyGuidelinesModal';

import { INITIAL_ITEMS } from './constants/data';
import { Sparkles, Plus, AlertCircle, CheckCircle, Search, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'lpu_find_my_stuff_v1_items';
const USER_KEY = 'lpu_current_student_alias';

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Could not load from localStorage:", e);
    }
    return INITIAL_ITEMS;
  });

  const [currentAlias, setCurrentAlias] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return saved;
    } catch (e) {}
    const generated = `Student_${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      localStorage.setItem(USER_KEY, generated);
    } catch (e) {}
    return generated;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Could not save items:", e);
    }
  }, [items]);

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    building: 'all',
    dateRange: 'all',
    status: 'all',
    customDate: ''
  });

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [postInitialType, setPostInitialType] = useState('lost');

  const [detailItem, setDetailItem] = useState(null);
  const [claimItem, setClaimItem] = useState(null);
  const [chatItem, setChatItem] = useState(null);
  const [posterItem, setPosterItem] = useState(null);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      building: 'all',
      dateRange: 'all',
      status: 'all',
      customDate: ''
    });
  };

  const handleQuickFilterStatus = (statusValue) => {
    setFilters(prev => ({
      ...prev,
      status: statusValue,
      type: 'all'
    }));
  };

  const handleResetData = () => {
    if (confirm("Reset portal to initial demo items? Any created test items will be restored.")) {
      setItems(INITIAL_ITEMS);
      localStorage.removeItem(STORAGE_KEY);
      showToast("Portal reset to initial campus items!");
    }
  };

  const handleSaveNewItem = (newItem) => {
    setItems(prev => [newItem, ...prev]);
    showToast(
      newItem.type === 'lost'
        ? "Lost item posted successfully! Other students can now help locate it."
        : "Found item posted! Genuine owner can now submit secret verification to claim."
    );
  };

  const handleUpdateStatus = (itemId, newStatus) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const updatedTimeline = [
            ...(item.timeline || []),
            {
              action: `Status manually updated to "${newStatus}"`,
              date: new Date().toLocaleString(),
              user: currentAlias
            }
          ];
          return { ...item, status: newStatus, timeline: updatedTimeline };
        }
        return item;
      })
    );

    setDetailItem(prev => {
      if (prev && prev.id === itemId) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });

    showToast(`Status updated to "${newStatus}"!`);
  };

  const handleSubmitClaim = (itemId, claimData) => {
    let targetItem = null;
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const updatedClaims = [claimData, ...(item.claims || [])];
          const updatedTimeline = [
            ...(item.timeline || []),
            {
              action: `Claim submitted by ${claimData.claimerAlias} with secret proof`,
              date: new Date().toLocaleString(),
              user: claimData.claimerAlias
            },
            {
              action: `Status updated to "claim pending"`,
              date: new Date().toLocaleString(),
              user: 'System'
            }
          ];
          const updated = {
            ...item,
            status: 'claim pending',
            claims: updatedClaims,
            timeline: updatedTimeline
          };
          targetItem = updated;
          return updated;
        }
        return item;
      })
    );

    showToast("Secret claim submitted! Status shifted to 'Claim Pending'. Opening in-app chat...");
    if (targetItem) {
      setTimeout(() => {
        setChatItem(targetItem);
      }, 500);
    }
  };

  const handleSendMessage = (itemId, claimId, message) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const claims = (item.claims || []).map(c => {
            if (!claimId || c.id === claimId) {
              return {
                ...c,
                messages: [...(c.messages || []), message]
              };
            }
            return c;
          });

          if (claims.length === 0) {
            claims.push({
              id: `claim-${Date.now()}`,
              claimerAlias: currentAlias,
              createdAt: new Date().toISOString(),
              secretProof: 'In-app discussion initiated',
              status: 'pending',
              messages: [message]
            });
          }

          const updated = { ...item, claims };
          if (chatItem && chatItem.id === itemId) {
            setChatItem(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleUpdateClaimStatus = (itemId, claimId, claimStatus, newItemStatus) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const updatedClaims = (item.claims || []).map(c => {
            if (c.id === claimId) {
              return { ...c, status: claimStatus };
            }
            return c;
          });

          const updatedTimeline = [
            ...(item.timeline || []),
            {
              action: `Claim ${claimStatus} by poster. Item status set to "${newItemStatus}"`,
              date: new Date().toLocaleString(),
              user: currentAlias
            }
          ];

          const updated = {
            ...item,
            status: newItemStatus,
            claims: updatedClaims,
            timeline: updatedTimeline
          };

          if (chatItem && chatItem.id === itemId) {
            setChatItem(updated);
          }
          if (detailItem && detailItem.id === itemId) {
            setDetailItem(updated);
          }
          return updated;
        }
        return item;
      })
    );

    showToast(
      claimStatus === 'approved'
        ? "Claim approved! Item marked as Returned."
        : "Claim rejected. Item restored to active search."
    );
  };

  const typeCounts = useMemo(() => {
    return {
      all: items.length,
      lost: items.filter(i => i.type === 'lost').length,
      found: items.filter(i => i.type === 'found').length
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    const today = new Date();

    return items.filter(item => {
      if (filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      if (filters.building !== 'all' && item.building !== filters.building) {
        return false;
      }
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      if (filters.dateRange !== 'all') {
        const itemDate = new Date(item.date);
        const diffDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));

        if (filters.dateRange === 'today' && diffDays > 0) return false;
        if (filters.dateRange === 'last3days' && diffDays > 3) return false;
        if (filters.dateRange === 'last7days' && diffDays > 7) return false;
        if (filters.dateRange === 'last30days' && diffDays > 30) return false;
      }

      if (filters.customDate && item.date !== filters.customDate) {
        return false;
      }

      if (filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchBuilding = item.building?.toLowerCase().includes(q);
        const matchSpecific = item.specificLocation?.toLowerCase().includes(q);
        const matchCategory = item.category?.toLowerCase().includes(q);
        const matchId = item.id?.toLowerCase().includes(q);
        const matchAlias = item.reporterAlias?.toLowerCase().includes(q);

        if (!matchTitle && !matchDesc && !matchBuilding && !matchSpecific && !matchCategory && !matchId && !matchAlias) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col selection:bg-[#FA8952] selection:text-white">
      {/* Toast alert */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-200">
          <div 
            style={{ borderColor: '#FABF52' }}
            className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border text-sm max-w-md"
          >
            <CheckCircle className="w-4 h-4 text-[#FAD352] shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        onOpenPost={(type) => {
          setPostInitialType(type);
          setIsPostOpen(true);
        }}
        currentAlias={currentAlias}
        onResetData={handleResetData}
        onOpenSafety={() => setIsSafetyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Banner with Stats & Privacy Guarantee */}
        <StatsBanner
          items={items}
          onQuickFilterStatus={handleQuickFilterStatus}
          onOpenSafety={() => setIsSafetyOpen(true)}
        />

        {/* Filter & Search Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalMatching={filteredItems.length}
          typeCounts={typeCounts}
        />

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#FAD3AD]/60 p-12 text-center my-6 space-y-4">
            <div className="w-16 h-16 bg-[#FAD3AD]/20 rounded-full flex items-center justify-center mx-auto text-[#FAA652]">
              <Search className="w-8 h-8 stroke-1" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">No items match your active filters</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                Try clearing your search query, choosing "All Categories", or expanding your campus location and date range.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-[#FAD3AD]/20 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => {
                  setPostInitialType('lost');
                  setIsPostOpen(true);
                }}
                style={{ background: 'linear-gradient(135deg, #FA8952 0%, #FAA652 100%)' }}
                className="px-4 py-2 text-white text-xs font-bold rounded-xl transition-colors shadow-sm hover:brightness-105"
              >
                + Report a Lost Item
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onOpenDetail={(i) => setDetailItem(i)}
                onOpenClaim={(i) => setClaimItem(i)}
                onOpenChat={(i) => setChatItem(i)}
                onOpenPoster={(i) => setPosterItem(i)}
              />
            ))}
          </div>
        )}

      </main>

      {/* College Lost & Found Footer */}
      <footer className="bg-white border-t border-[#FAD3AD]/60 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">LPU Find My Stuff</span>
            <span>•</span>
            <span>Lovely Professional University Student Item Recovery System</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => setIsSafetyOpen(true)} className="hover:text-[#FA8952] transition-colors">
              Campus Security Desks
            </button>
            <span>•</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Student Privacy Shield
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PostItemModal
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        initialType={postInitialType}
        onSave={handleSaveNewItem}
        currentAlias={currentAlias}
      />

      <ClaimModal
        isOpen={!!claimItem}
        onClose={() => setClaimItem(null)}
        item={claimItem}
        onSubmitClaim={handleSubmitClaim}
        currentAlias={currentAlias}
      />

      <AnonymousChatModal
        isOpen={!!chatItem}
        onClose={() => setChatItem(null)}
        item={chatItem}
        onSendMessage={handleSendMessage}
        onUpdateClaimStatus={handleUpdateClaimStatus}
        currentAlias={currentAlias}
      />

      <ItemDetailModal
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        item={detailItem}
        onOpenClaim={(i) => setClaimItem(i)}
        onOpenChat={(i) => setChatItem(i)}
        onOpenPoster={(i) => setPosterItem(i)}
        onUpdateStatus={handleUpdateStatus}
      />

      <PrintPosterModal
        isOpen={!!posterItem}
        onClose={() => setPosterItem(null)}
        item={posterItem}
      />

      <SafetyGuidelinesModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

    </div>
  );
}

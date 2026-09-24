import { useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/mockData';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, filteredProducts, setSelectedProduct, filterCategory, setFilterCategory } = useStore();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearchOpen, setSearchQuery]);

  if (!searchOpen) return null;

  const handleSelect = (id) => {
    const el = document.querySelector('#collection');
    setSearchOpen(false);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      const product = filteredProducts.find((p) => p.id === id);
      if (product) setSelectedProduct(product);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[80]" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative z-10 max-w-2xl mx-auto pt-32 px-6"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeSlideDown 0.25s ease' }}
      >
        {/* Search input */}
        <div className="relative">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search watches, categories…"
            className="w-full bg-[#1A1A1A]/95 border border-white/15 text-white placeholder:text-[#A0A0A0]/50 text-lg px-5 py-4 pl-14 rounded-2xl focus:outline-none focus:border-[#00C896]/50 font-display font-light"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0A0] hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category quick filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilterCategory(cat); setSearchOpen(false); setSearchQuery(''); document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`px-3 py-1.5 font-mono-vt text-[10px] tracking-[0.15em] uppercase rounded-full border transition-all ${
                filterCategory === cat ? 'bg-[#00C896] text-black border-[#00C896]' : 'border-white/15 text-[#A0A0A0] hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {searchQuery && (
          <div className="mt-4 bg-[#111111] border border-white/8 rounded-2xl overflow-hidden max-h-80 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-display text-lg text-white/30">No results for "{searchQuery}"</p>
              </div>
            ) : (
              filteredProducts.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/4 transition-colors border-b border-white/5 last:border-b-0 text-left"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#1A1A1A]">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-white text-base leading-tight">{p.name}</p>
                    <p className="font-mono-vt text-[9px] tracking-[0.15em] uppercase text-[#A0A0A0]/60">{p.subtitle} · {p.category}</p>
                  </div>
                  <p className="font-display text-[#00C896] text-sm flex-shrink-0">${p.price.toLocaleString()}</p>
                </button>
              ))
            )}
          </div>
        )}

        <p className="mt-4 text-center font-mono-vt text-[10px] tracking-[0.15em] uppercase text-[#A0A0A0]/30">
          Press ESC to close
        </p>
      </div>
      <style>{`@keyframes fadeSlideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

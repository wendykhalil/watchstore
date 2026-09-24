import { useStore } from '../../context/StoreContext';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../../data/mockData';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Name A–Z' },
];

export default function Collection() {
  const { filteredProducts, filterCategory, setFilterCategory, sortBy, setSortBy, searchQuery } = useStore();

  return (
    <section id="collection" className="py-28 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="font-mono-vt text-[10px] tracking-[0.4em] uppercase text-[#00C896] mb-4">Our Offerings</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight">
              The Collection
            </h2>
            <p className="text-[#A0A0A0] max-w-xs lg:text-right leading-relaxed">
              Designed for those who value every second.
            </p>
          </div>
          <div className="h-px bg-gradient-to-r from-[#00C896]/40 via-white/5 to-transparent" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 font-mono-vt text-[10px] tracking-[0.15em] uppercase rounded-full border transition-all duration-200 ${
                  filterCategory === cat
                    ? 'bg-[#00C896] text-black border-[#00C896]'
                    : 'border-white/15 text-[#A0A0A0] hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1A1A1A] border border-white/15 text-[#A0A0A0] font-mono-vt text-[10px] tracking-[0.1em] uppercase rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00C896]/50 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-white/30 mb-2">No results</p>
            <p className="font-mono-vt text-[11px] tracking-[0.2em] uppercase text-[#A0A0A0]/40">
              {searchQuery ? `No watches match "${searchQuery}"` : 'No watches in this category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

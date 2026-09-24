import { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function FavoritesDrawer() {
  const { favoritesOpen, setFavoritesOpen, favorites, products, toggleFavorite, addToCart, setSelectedProduct } = useStore();
  const favProducts = products.filter((p) => favorites.includes(p.id));

  useEffect(() => {
    if (favoritesOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [favoritesOpen]);

  if (!favoritesOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end" onClick={() => setFavoritesOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md bg-[#111111] border-l border-white/8 h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideInRight 0.3s ease' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-light text-white">Saved</h2>
            {favProducts.length > 0 && (
              <span className="w-6 h-6 rounded-full bg-[#00C896] text-black text-[10px] font-bold flex items-center justify-center">
                {favProducts.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setFavoritesOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {favProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-7 h-7 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </svg>
              </div>
              <p className="font-display text-xl text-white/40">No saved pieces</p>
              <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]/40">
                Heart a watch to save it here
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {favProducts.map((product) => (
                <div key={product.id} className="flex gap-4 p-4 bg-[#1A1A1A] rounded-xl border border-white/5">
                  <button
                    onClick={() => { setFavoritesOpen(false); setSelectedProduct(product); }}
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#222] hover:opacity-80 transition-opacity"
                  >
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-display text-base text-white leading-tight">{product.name}</p>
                        <p className="font-mono-vt text-[9px] tracking-[0.15em] uppercase text-[#A0A0A0]/60 mt-0.5">
                          {product.subtitle}
                        </p>
                        <p className="font-display text-[#00C896] mt-1">${product.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="text-[#00C896] hover:text-red-400 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => { addToCart(product.id, product.colors[0].hex); setFavoritesOpen(false); }}
                      className="mt-3 w-full py-2 border border-[#00C896]/40 text-[#00C896] font-mono-vt text-[9px] tracking-[0.2em] uppercase hover:bg-[#00C896] hover:text-black transition-all duration-200 rounded-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

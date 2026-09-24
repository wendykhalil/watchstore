import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const { favorites, toggleFavorite, setSelectedProduct, addToCart } = useStore();
  const liked = favorites.includes(product.id);

  const changeImage = (dir) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setImgIndex((i) => (i + dir + product.images.length) % product.images.length);
      setFading(false);
    }, 180);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, product.colors[0].hex);
  };

  return (
    <div className="group bg-[#111111] border border-white/6 rounded-2xl overflow-hidden hover:border-[#00C896]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,150,0.06)] flex flex-col">
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A1A] flex-shrink-0">
        <img
          src={product.images[imgIndex]}
          alt={product.name}
          style={{ transition: 'opacity 0.18s ease, transform 0.5s ease' }}
          className={`w-full h-full object-cover group-hover:scale-105 ${fading ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent pointer-events-none" />

        {/* Low stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 rounded font-mono-vt text-[9px] tracking-[0.15em] uppercase text-amber-400">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-red-500/20 border border-red-500/40 rounded font-mono-vt text-[9px] tracking-[0.15em] uppercase text-red-400">
            Sold out
          </div>
        )}

        {/* Heart button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/10 hover:border-[#00C896]/50 transition-all"
          aria-label="Toggle favorite"
        >
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${liked ? 'fill-[#00C896] stroke-[#00C896]' : 'fill-none stroke-white/70'}`}
            viewBox="0 0 24 24" strokeWidth="1.5"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </button>

        {/* Nav arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); changeImage(-1); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#00C896]/50"
          aria-label="Previous image"
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); changeImage(1); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:border-[#00C896]/50"
          aria-label="Next image"
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
              style={{ transition: 'width 0.3s ease, background-color 0.3s ease' }}
              className={`h-1.5 rounded-full ${i === imgIndex ? 'w-5 bg-[#00C896]' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#00C896] mb-1">{product.subtitle}</p>
            <h3 className="font-display text-2xl font-normal text-white">{product.name}</h3>
          </div>
          <span className="font-display text-xl text-white font-light">${product.price.toLocaleString()}</span>
        </div>
        <p className="text-[#A0A0A0] text-sm leading-relaxed mb-5 flex-1">{product.description}</p>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-5">
          <span className="font-mono-vt text-[9px] tracking-[0.2em] uppercase text-[#A0A0A0]/60 mr-1">Colors</span>
          {product.colors.map((c) => (
            <div
              key={c.name}
              title={c.name}
              className="w-4 h-4 rounded-full border border-white/20 hover:scale-110 transition-transform cursor-default"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedProduct(product)}
            className="flex-1 py-3 border border-white/15 text-white font-mono-vt text-[10px] tracking-[0.2em] uppercase hover:border-[#00C896] hover:text-[#00C896] transition-all duration-300 rounded-lg"
          >
            View Details
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 py-3 bg-[#00C896]/10 border border-[#00C896]/30 text-[#00C896] font-mono-vt text-[10px] tracking-[0.2em] uppercase hover:bg-[#00C896] hover:text-black transition-all duration-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function ProductModal() {
  const { selectedProduct: product, setSelectedProduct, addToCart, favorites, toggleFavorite } = useStore();
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setImgIndex(0);
      setSelectedColor(0);
      setQty(1);
      setAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;
  const liked = favorites.includes(product.id);

  const handleAdd = () => {
    addToCart(product.id, product.colors[selectedColor].hex, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={() => setSelectedProduct(null)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 bg-[#111111] border border-white/8 rounded-t-3xl sm:rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid sm:grid-cols-2 gap-0">
          {/* Image gallery */}
          <div className="relative bg-[#1A1A1A] rounded-t-3xl sm:rounded-l-2xl sm:rounded-tr-none overflow-hidden">
            <div className="aspect-square">
              <img
                src={product.images[imgIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-200"
              />
            </div>
            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === imgIndex ? 'border-[#00C896]' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col gap-6 overflow-y-auto max-h-[80vh] sm:max-h-[92vh]">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-[#00C896] mb-2">{product.subtitle}</p>
                  <h2 className="font-display text-4xl font-light text-white">{product.name}</h2>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="mt-1 p-2 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Toggle favorite"
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${liked ? 'fill-[#00C896] stroke-[#00C896]' : 'fill-none stroke-white/60'}`}
                    viewBox="0 0 24 24" strokeWidth="1.5"
                  >
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                  </svg>
                </button>
              </div>
              <p className="font-display text-3xl text-[#00C896] mt-2">${product.price.toLocaleString()}</p>
            </div>

            <p className="text-[#A0A0A0] leading-relaxed text-sm">{product.longDescription}</p>

            {/* Color selector */}
            <div>
              <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]/60 mb-3">
                Color — <span className="text-white">{product.colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      i === selectedColor ? 'border-[#00C896] scale-110' : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]/60 mb-3">Quantity</p>
              <div className="flex items-center gap-0 border border-white/15 rounded-lg w-fit overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/8 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-mono-vt text-sm text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/8 transition-colors text-lg"
                >
                  +
                </button>
              </div>
              <p className="mt-2 font-mono-vt text-[9px] tracking-wider uppercase text-[#A0A0A0]/50">
                {product.stock} in stock
              </p>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`w-full py-4 font-mono-vt text-[11px] tracking-[0.2em] uppercase transition-all duration-300 rounded-lg ${
                added
                  ? 'bg-[#00C896]/20 border border-[#00C896] text-[#00C896]'
                  : product.stock === 0
                  ? 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-[#00C896] text-black hover:bg-[#00C896]/90 active:scale-[0.98]'
              }`}
            >
              {added ? '✓ Added to Cart' : product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>

            {/* Specs */}
            <div className="border-t border-white/8 pt-5">
              <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-[#A0A0A0]/60 mb-4">Specifications</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                {product.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="font-mono-vt text-[9px] tracking-wider uppercase text-[#A0A0A0]/50">{s.label}</dt>
                    <dd className="text-white text-sm mt-0.5">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

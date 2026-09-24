import { useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartTotal, cartCount, getProduct, removeFromCart, updateQty, setCheckoutOpen } = useStore();

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end" onClick={() => setCartOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md bg-[#111111] border-l border-white/8 h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideInRight 0.3s ease' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-light text-white">Cart</h2>
            {cartCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-[#00C896] text-black text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-7 h-7 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5M3.75 10.5h16.5L18.75 21H5.25L3.75 10.5z" />
                </svg>
              </div>
              <p className="font-display text-xl text-white/40">Your cart is empty</p>
              <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]/40">
                Add a timepiece to begin
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 px-6 py-3 border border-[#00C896] text-[#00C896] font-mono-vt text-[10px] tracking-[0.2em] uppercase hover:bg-[#00C896] hover:text-black transition-all duration-300"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {cart.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex gap-4 p-4 bg-[#1A1A1A] rounded-xl border border-white/5">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#222]">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-base text-white leading-tight">{product.name}</p>
                          <p className="font-mono-vt text-[9px] tracking-[0.15em] uppercase text-[#A0A0A0]/60 mt-0.5">
                            {product.subtitle}
                          </p>
                          <div
                            className="w-3 h-3 rounded-full mt-1.5 border border-white/20"
                            style={{ backgroundColor: item.selectedColor }}
                            title={product.colors.find((c) => c.hex === item.selectedColor)?.name}
                          />
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-[#A0A0A0]/40 hover:text-red-400 transition-colors flex-shrink-0"
                          aria-label="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item.productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-mono-vt text-xs text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-display text-base text-white">
                          ${(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-white/8 px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]">Subtotal</span>
              <span className="font-display text-xl text-white">${cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]">Shipping</span>
              <span className="font-mono-vt text-[10px] text-[#00C896]">Complimentary</span>
            </div>
            <div className="h-px bg-white/8" />
            <div className="flex justify-between items-center">
              <span className="font-mono-vt text-[11px] tracking-[0.2em] uppercase text-white">Total</span>
              <span className="font-display text-2xl text-white">${cartTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
              className="w-full py-4 bg-[#00C896] text-black font-mono-vt text-[11px] tracking-[0.2em] uppercase hover:bg-[#00C896]/90 active:scale-[0.98] transition-all duration-200 rounded-lg"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full py-3 border border-white/10 text-white/50 font-mono-vt text-[10px] tracking-[0.15em] uppercase hover:text-white hover:border-white/20 transition-all rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

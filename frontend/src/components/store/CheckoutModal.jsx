import { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cartTotal, createOrder, lastOrder, setLastOrder } = useStore();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (checkoutOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [checkoutOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      createOrder({
        fullName,
        phone,
        address,
        city,
        note,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setCheckoutOpen(false);
      setErrors({});
      if (lastOrder) {
        setLastOrder(null);
      }
    }
  };

  // Show order confirmation instead of form
  if (lastOrder) {
    return (
      <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center" onClick={handleClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div
          className="relative z-10 bg-[#111111] border border-white/8 rounded-t-3xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 sm:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success state */}
          <div className="text-center">
            {/* Success icon */}
            <div className="w-16 h-16 rounded-full bg-[#00C896]/20 border border-[#00C896] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#00C896]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="font-display text-3xl text-white mb-2">Commande Confirmée</h2>
            <p className="font-mono-vt text-[11px] tracking-[0.2em] uppercase text-[#00C896] mb-6">
              Order Confirmed
            </p>

            <div className="space-y-2 mb-8">
              <p className="text-[#A0A0A0] text-base">Merci pour votre commande.</p>
              <p className="text-white text-xl font-display">
                Votre commande <span className="text-[#00C896]">#{lastOrder.id}</span> a bien été enregistrée.
              </p>
            </div>

            {/* Order details */}
            <div className="bg-[#1A1A1A] border border-white/8 rounded-xl p-6 mb-8 text-left">
              <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-4">
                Détails de la commande
              </p>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/8">
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Client:</span>
                  <span className="text-white">{lastOrder.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Téléphone:</span>
                  <span className="text-white">{lastOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Adresse:</span>
                  <span className="text-white text-right">{lastOrder.customer.address}, {lastOrder.customer.city}</span>
                </div>
                {lastOrder.customer.note && (
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Note:</span>
                    <span className="text-white text-right text-sm">{lastOrder.customer.note}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Articles:</span>
                  <span className="text-white">{lastOrder.items.length} article{lastOrder.items.length > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Total:</span>
                  <span className="font-display text-xl text-[#00C896]">${lastOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/8">
                  <span className="text-[#A0A0A0]">Paiement:</span>
                  <span className="font-mono-vt text-[10px] tracking-[0.15em] uppercase text-white">À la livraison</span>
                </div>
              </div>
            </div>

            {/* Items list */}
            <div className="bg-[#1A1A1A] border border-white/8 rounded-xl p-6 mb-8 text-left max-h-48 overflow-y-auto">
              <p className="font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-4">
                Produits commandés
              </p>
              <div className="space-y-3">
                {lastOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start pb-3 border-b border-white/8 last:border-0">
                    <div className="flex-1">
                      <p className="text-white text-sm">{item.productName}</p>
                      <p className="text-[#A0A0A0] text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[#00C896] text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[#A0A0A0] text-sm mb-6">
              Votre commande sera livrée dans 5 à 10 jours ouvrables.<br />
              Paiement à la livraison (Cash on Delivery).
            </p>

            <button
              onClick={handleClose}
              className="w-full py-4 bg-[#00C896] text-black font-mono-vt text-[11px] tracking-[0.2em] uppercase hover:bg-[#00C896]/90 active:scale-[0.98] transition-all duration-200 rounded-lg"
            >
              Continuer les achats
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!checkoutOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-[#111111] border border-white/8 rounded-t-3xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111111] border-b border-white/8 px-6 sm:px-8 py-5 flex items-center justify-between">
          <h2 className="font-display text-2xl text-white">Passer la commande</h2>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Payment method info */}
          <div className="bg-[#1A1A1A] border border-[#00C896]/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#00C896]/20 border border-[#00C896] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-[#00C896]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-mono-vt tracking-[0.1em] uppercase">Paiement à la livraison</p>
                <p className="text-[#A0A0A0] text-xs mt-1">Vous paierez lors de la réception de votre commande</p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="Jean Dupont"
                className="w-full bg-[#1A1A1A] border border-white/15 text-white placeholder:text-[#A0A0A0]/40 text-base px-4 py-3 rounded-lg focus:outline-none focus:border-[#00C896]/50 transition-colors"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1 font-mono-vt">{errors.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-2">
                Numéro de téléphone *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="+33 1 23 45 67 89"
                className="w-full bg-[#1A1A1A] border border-white/15 text-white placeholder:text-[#A0A0A0]/40 text-base px-4 py-3 rounded-lg focus:outline-none focus:border-[#00C896]/50 transition-colors"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1 font-mono-vt">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-2">
                Adresse *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                placeholder="123 Rue de l'exemple"
                className="w-full bg-[#1A1A1A] border border-white/15 text-white placeholder:text-[#A0A0A0]/40 text-base px-4 py-3 rounded-lg focus:outline-none focus:border-[#00C896]/50 transition-colors"
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1 font-mono-vt">{errors.address}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-2">
                Ville *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                placeholder="Paris"
                className="w-full bg-[#1A1A1A] border border-white/15 text-white placeholder:text-[#A0A0A0]/40 text-base px-4 py-3 rounded-lg focus:outline-none focus:border-[#00C896]/50 transition-colors"
              />
              {errors.city && (
                <p className="text-red-400 text-xs mt-1 font-mono-vt">{errors.city}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block font-mono-vt text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-2">
                Note de livraison (optionnel)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Instructions de livraison ou notes spéciales..."
                rows={3}
                className="w-full bg-[#1A1A1A] border border-white/15 text-white placeholder:text-[#A0A0A0]/40 text-base px-4 py-3 rounded-lg focus:outline-none focus:border-[#00C896]/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Order summary */}
          <div className="border-t border-white/8 pt-6">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-[#A0A0A0]">Sous-total:</span>
                <span className="text-white">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A0A0A0]">Livraison:</span>
                <span className="font-mono-vt text-[10px] tracking-[0.1em] uppercase text-[#00C896]">Gratuite</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/8">
                <span className="text-white font-mono-vt text-[11px] tracking-[0.2em] uppercase">Total:</span>
                <span className="font-display text-2xl text-[#00C896]">${cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-mono-vt text-[11px] tracking-[0.2em] uppercase transition-all duration-200 rounded-lg ${
                isSubmitting
                  ? 'bg-[#00C896]/60 text-black/60 cursor-not-allowed'
                  : 'bg-[#00C896] text-black hover:bg-[#00C896]/90 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 border border-white/10 text-white/50 font-mono-vt text-[10px] tracking-[0.15em] uppercase hover:text-white hover:border-white/20 transition-all rounded-lg"
            >
              Annuler
            </button>
          </div>

          <p className="text-center text-[#A0A0A0] text-xs">
            En confirmant, vous acceptez nos conditions de livraison.
          </p>
        </form>
      </div>
    </div>
  );
}

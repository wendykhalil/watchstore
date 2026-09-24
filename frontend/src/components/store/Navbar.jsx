import { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Story', href: '#story' },
  { label: 'Craftsmanship', href: '#craftsmanship' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, favorites, setCartOpen, setFavoritesOpen, setSearchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/96 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="font-display text-xl font-semibold tracking-[0.2em] uppercase text-white hover:text-[#00C896] transition-colors"
        >
          Verdant Time
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNavClick(href)}
              className="font-mono-vt text-[11px] tracking-[0.2em] uppercase text-[#A0A0A0] hover:text-[#00C896] transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-[#A0A0A0] hover:text-white transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <button
            onClick={() => setFavoritesOpen(true)}
            className="relative text-[#A0A0A0] hover:text-white transition-colors"
            aria-label="Favorites"
          >
            <HeartIcon />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00C896] text-black text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-[#A0A0A0] hover:text-white transition-colors"
            aria-label="Cart"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00C896] text-black text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('#collection')}
            className="ml-2 px-5 py-2.5 border border-[#00C896] text-[#00C896] font-mono-vt text-[11px] tracking-[0.15em] uppercase hover:bg-[#00C896] hover:text-black transition-all duration-300"
          >
            Shop Collection
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-[#A0A0A0] hover:text-white transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <button
            onClick={() => setFavoritesOpen(true)}
            className="relative text-[#A0A0A0] hover:text-white transition-colors"
            aria-label="Favorites"
          >
            <HeartIcon />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00C896] text-black text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-[#A0A0A0] hover:text-white transition-colors"
            aria-label="Cart"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00C896] text-black text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#A0A0A0] hover:text-white transition-colors ml-1"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0A0A0A]/98 backdrop-blur-md border-b border-white/5`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNavClick(href)}
              className="text-left font-mono-vt text-[12px] tracking-[0.25em] uppercase text-[#A0A0A0] hover:text-[#00C896] transition-colors py-1"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { handleNavClick('#collection'); }}
            className="mt-2 px-5 py-3 border border-[#00C896] text-[#00C896] font-mono-vt text-[11px] tracking-[0.15em] uppercase text-center hover:bg-[#00C896] hover:text-black transition-all duration-300"
          >
            Shop Collection
          </button>
        </nav>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5M3.75 10.5h16.5L18.75 21H5.25L3.75 10.5z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

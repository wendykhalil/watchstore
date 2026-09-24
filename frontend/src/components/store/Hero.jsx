import { useState, useEffect } from 'react';

const SPECS = [
  { label: 'Automatic Movement', icon: '⚙' },
  { label: 'Sapphire Crystal', icon: '◇' },
  { label: '100M Water Resist.', icon: '◈' },
];

export default function Hero({
  headline = 'Time, Reimagined.',
  subline = 'Where Swiss precision meets contemporary design. Each Verdant Time piece is crafted for those who understand that time is everything.',
  ctaPrimary = 'Explore Collection',
  ctaSecondary = 'Discover Our Story',
  bgImage = 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=900&h=1100&fit=crop&auto=format',
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A] to-[#1B3B2B]/30 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-[#00C896]/5 blur-[140px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-28 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div
          style={{ transition: 'opacity 1s ease, transform 1s ease' }}
          className={`${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="font-mono-vt text-[10px] tracking-[0.4em] uppercase text-[#00C896] mb-8">
            Precision In Every Second
          </p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[90px] font-light leading-[0.92] tracking-tight text-white mb-8">
            {headline}
          </h1>
          <p className="text-[#A0A0A0] text-base lg:text-lg leading-relaxed max-w-md mb-12">{subline}</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('#collection')}
              className="px-8 py-4 bg-[#00C896] text-black font-mono-vt text-[11px] tracking-[0.2em] uppercase hover:bg-[#00C896]/90 active:scale-95 transition-all duration-200"
            >
              {ctaPrimary}
            </button>
            <button
              onClick={() => scrollTo('#story')}
              className="px-8 py-4 border border-white/20 text-white font-mono-vt text-[11px] tracking-[0.2em] uppercase hover:border-white/50 transition-all duration-300"
            >
              {ctaSecondary}
            </button>
          </div>
          <div className="flex flex-wrap gap-6 mt-16 pt-8 border-t border-white/8">
            {SPECS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="text-[#00C896] text-sm">{s.icon}</span>
                <span className="font-mono-vt text-[10px] tracking-[0.15em] uppercase text-[#A0A0A0]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div
          style={{ transition: 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s' }}
          className={`relative ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >
          <div className="relative aspect-[4/5] max-w-[520px] mx-auto">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src={bgImage}
                alt="Verdant Time luxury watch"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/8" />
            </div>
            <div className="absolute -inset-4 rounded-3xl bg-[#00C896]/8 blur-2xl -z-10" />
            {/* Floating tags */}
            <div className="absolute top-8 -left-12 bg-[#0A0A0A]/90 backdrop-blur border border-white/10 rounded-lg px-4 py-3 hidden lg:block">
              <p className="font-mono-vt text-[9px] tracking-[0.2em] uppercase text-[#00C896] mb-0.5">Movement</p>
              <p className="font-display text-sm text-white">Automatic</p>
            </div>
            <div className="absolute bottom-20 -right-10 bg-[#0A0A0A]/90 backdrop-blur border border-white/10 rounded-lg px-4 py-3 hidden lg:block">
              <p className="font-mono-vt text-[9px] tracking-[0.2em] uppercase text-[#00C896] mb-0.5">Crystal</p>
              <p className="font-display text-sm text-white">Sapphire</p>
            </div>
            <div className="absolute top-1/2 -right-16 bg-[#0A0A0A]/90 backdrop-blur border border-white/10 rounded-lg px-4 py-3 hidden lg:block -translate-y-1/2">
              <p className="font-mono-vt text-[9px] tracking-[0.2em] uppercase text-[#00C896] mb-0.5">Water Resist.</p>
              <p className="font-display text-sm text-white">100M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono-vt text-[9px] tracking-[0.3em] uppercase text-[#A0A0A0]/60">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00C896]/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

import { useState } from 'react';

// ─── Video Section ────────────────────────────────────────────────────────────

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying((v) => !v);
  };

  return (
    <section id="technology" className="py-16 lg:py-24 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className="relative rounded-3xl overflow-hidden aspect-video cursor-pointer group"
          onClick={handlePlayPause}
          role="button"
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          {!playing && (
            <img
              src="https://images.unsplash.com/photo-1605143185650-77944b152643?w=1800&h=1000&fit=crop&auto=format"
              alt="Crafted to be remembered"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          )}
          
          {playing && (
            <video
              autoPlay
              controls
              className="w-full h-full object-cover bg-black"
              src="https://videos.unsplash.com/video-1605143185650-77944b152643?w=1800&h=1000&fit=crop&auto=format"
            >
              Your browser does not support the video tag.
            </video>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-[#00C896]/15 pointer-events-none" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            {!playing && (
              <>
                <div
                  className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mb-10 transition-all duration-500 pointer-events-none ${
                    'border-white/60 group-hover:border-[#00C896] group-hover:scale-110'
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-white ml-1 group-hover:text-[#00C896] transition-colors"
                    fill="currentColor" viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-mono-vt text-[10px] tracking-[0.4em] uppercase text-[#00C896] mb-4">Watch the Film</p>
              </>
            )}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight">
              Crafted to be<br />Remembered.
            </h2>
            <p className="mt-6 text-[#A0A0A0] max-w-sm text-sm leading-relaxed">
              Four years in development. One hundred hands. Every component individually tested to
              tolerances invisible to the naked eye.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BentoSection() {
  return (
    <section id="craftsmanship" className="py-28 lg:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="font-mono-vt text-[10px] tracking-[0.4em] uppercase text-[#00C896] mb-4">Craftsmanship</p>
          <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl font-light text-white">
            Engineered<br /><em className="not-italic text-white/70">with Purpose.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {/* Large card */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/7] bg-[#1A1A1A]">
            <img
              src="https://images.unsplash.com/photo-1747995525955-92010650c3ae?w=1600&h=700&fit=crop&auto=format"
              alt="Verdant Time craftsmanship"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-end max-w-2xl">
              <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-[#00C896] mb-3">Heritage</p>
              <h3 className="font-display text-3xl lg:text-4xl font-light text-white mb-4 leading-snug">
                Seventy-three individual components. One singular vision.
              </h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-md">
                Every movement is assembled by a single master watchmaker, spending up to 200 hours on each
                timepiece. No automation. No shortcuts. Pure dedication to permanence.
              </p>
            </div>
            <div className="absolute top-6 right-6 flex gap-2">
              <span className="font-mono-vt text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/40 backdrop-blur border border-[#00C896]/30 text-[#00C896] rounded-full">Swiss Made</span>
              <span className="font-mono-vt text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/40 backdrop-blur border border-white/10 text-white/60 rounded-full">Since 2018</span>
            </div>
          </div>

          {/* Precision */}
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#1A1A1A]">
            <img
              src="https://images.unsplash.com/photo-1583198432859-635beb4e8600?w=700&h=700&fit=crop&auto=format"
              alt="Watch movement precision"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-[#00C896] mb-2">01</p>
              <h3 className="font-display text-3xl font-light text-white mb-2">Precision</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                ±2 seconds per day accuracy. Regulated to COSC chronometer standards.
              </p>
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="font-display text-2xl text-[#00C896]">±2s</p>
                  <p className="font-mono-vt text-[9px] tracking-wider uppercase text-[#A0A0A0]/60">Daily Accuracy</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-[#00C896]">72h</p>
                  <p className="font-mono-vt text-[9px] tracking-wider uppercase text-[#A0A0A0]/60">Power Reserve</p>
                </div>
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#1A1A1A]">
            <img
              src="https://images.unsplash.com/photo-1633451238042-85d93d267866?w=700&h=700&fit=crop&auto=format"
              alt="Premium watch materials"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B3B2B]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-[#00C896] mb-2">02</p>
              <h3 className="font-display text-3xl font-light text-white mb-2">Materials</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">
                Grade 5 titanium cases, double-domed sapphire crystal, Italian calfskin straps.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Titanium', 'Sapphire', 'Calfskin'].map((m) => (
                  <span key={m} className="font-mono-vt text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border border-white/15 text-white/60 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Story Section ────────────────────────────────────────────────────────────

export function StorySection() {
  return (
    <section id="story" className="py-28 lg:py-36 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1730151045649-828c248ed01e?w=700&h=900&fit=crop&auto=format"
                alt="Built for every moment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 to-transparent" />
            </div>
            <div className="absolute -left-4 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#00C896]/60 to-transparent hidden lg:block" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="font-mono-vt text-[10px] tracking-[0.4em] uppercase text-[#00C896] mb-6">Philosophy</p>
            <h2 className="font-display text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
              Built for<br /><em className="not-italic">Every Moment.</em>
            </h2>
            <div className="w-12 h-px bg-[#00C896] mb-8" />
            <div className="space-y-5 text-[#A0A0A0] leading-relaxed">
              <p>
                Verdant Time was founded on a simple conviction: that true luxury is not about exclusion,
                but about uncompromising standards. We create watches for those who have earned their moments.
              </p>
              <p>
                Every dial is a lesson in restraint. Every case a study in proportion. We work with a single
                atelier in Le Brassus, Switzerland, where three generations of watchmakers still use hand
                tools alongside modern metrology.
              </p>
              <p className="text-white/70 italic font-display font-light text-lg">
                "We don't make timepieces that count seconds. We make the seconds worth counting."
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 pt-10 border-t border-white/8">
              {[
                { value: '6', unit: 'Years', label: 'Of mastery' },
                { value: '847', unit: 'Pieces', label: 'Per year' },
                { value: '12', unit: 'Makers', label: 'In Le Brassus' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl text-white font-light">
                    {s.value}<span className="text-[#00C896] text-2xl">{s.unit[0]}</span>
                  </p>
                  <p className="font-mono-vt text-[9px] tracking-[0.2em] uppercase text-[#A0A0A0]/60 mt-1">
                    {s.unit} {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

export function CTASection() {
  const scrollToCollection = () =>
    document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="contact" className="py-28 lg:py-40 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1684573573596-38d19a0c0776?w=1800&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#1B3B2B]/20 to-[#0A0A0A]/90" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00C896]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <p className="font-mono-vt text-[10px] tracking-[0.4em] uppercase text-[#00C896] mb-6">Your Timepiece Awaits</p>
        <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-[96px] font-light text-white leading-[0.92] tracking-tight mb-8">
          Find Your<br />Time.
        </h2>
        <p className="text-[#A0A0A0] max-w-lg mx-auto leading-relaxed mb-12">
          Discover the collection created for those who never compromise on precision.
          Each piece is available in strictly limited numbers.
        </p>
        <button
          onClick={scrollToCollection}
          className="inline-block px-10 py-4 bg-[#00C896] text-black font-mono-vt text-[12px] tracking-[0.25em] uppercase hover:bg-white transition-colors duration-300 active:scale-95"
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Collection', 'Story', 'Craftsmanship', 'Technology', 'Contact'];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#080808] border-t border-white/6 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-2xl font-semibold tracking-[0.2em] uppercase text-white hover:text-[#00C896] transition-colors mb-4 block"
            >
              Verdant Time
            </button>
            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-xs mb-8">
              Swiss-made timepieces for those who understand that precision is not a feature — it is a standard.
            </p>
            <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Stay in Time</p>
            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-[#A0A0A0]/40 text-sm px-4 py-2.5 focus:outline-none focus:border-[#00C896]/50 transition-colors rounded"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#00C896] text-black font-mono-vt text-[10px] tracking-[0.15em] uppercase hover:bg-[#00C896]/90 transition-colors rounded whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 font-mono-vt text-[10px] tracking-wider uppercase text-[#00C896]">
                ✓ You're on the list.
              </p>
            )}
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-white mb-5">Navigation</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(`#${l.toLowerCase()}`)}
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-white mb-5">Customer</p>
            <ul className="space-y-3">
              {['Shipping', 'Returns', 'FAQ', 'Care Guide', 'Warranty'].map((l) => (
                <li key={l}>
                  <button className="text-[#A0A0A0] text-sm hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono-vt text-[10px] tracking-[0.3em] uppercase text-white mb-5">Follow</p>
            <ul className="space-y-3">
              {['Instagram', 'Facebook', 'TikTok', 'Pinterest'].map((l) => (
                <li key={l}>
                  <button className="text-[#A0A0A0] text-sm hover:text-[#00C896] transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-vt text-[10px] tracking-[0.15em] uppercase text-[#A0A0A0]/40">
            © 2026 Verdant Time. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <button key={l} className="font-mono-vt text-[10px] tracking-[0.1em] uppercase text-[#A0A0A0]/40 hover:text-[#A0A0A0] transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

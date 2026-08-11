import React, { useEffect, useState } from 'react';
import { businessData } from '../../data/business';
import { Leaf, Instagram, Facebook, MapPin, Shield } from 'lucide-react';

interface HeroOverlayProps {
  scrollProgress: number;
}

const FLOATING_LEAVES = [
  { x: '62%', delay: '0s',   duration: '9s',  size: 10, rotate: 15 },
  { x: '70%', delay: '2.5s', duration: '12s', size: 8,  rotate: -20 },
  { x: '78%', delay: '1.2s', duration: '10s', size: 12, rotate: 45 },
  { x: '85%', delay: '0.8s', duration: '14s', size: 9,  rotate: 30 },
  { x: '91%', delay: '3.2s', duration: '8s',  size: 6,  rotate: -35 },
];

// Navbar on mobile is ~80px (logo 2-line + py-5 padding)
const NAV_H_MOBILE = 84;
// Feature strip on mobile is ~56px
const STRIP_H_MOBILE = 56;

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ scrollProgress }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const opacity = Math.max(0, 1 - scrollProgress * 8.5);
  const bgY = scrollProgress * 30;

  if (opacity <= 0.01) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 w-full h-screen pointer-events-none z-20"
      style={{ opacity }}
    >
      {/* ── BACKGROUND IMAGE ── */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transform: `translateY(${bgY}px) scale(1.06)`,
          transformOrigin: 'center center',
          backgroundImage: 'url(/hero-botanical-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: '60% center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── LEFT CREAM GRADIENT (desktop) ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          background:
            'linear-gradient(to right, #f0ede6 32%, #f0ede6cc 50%, #f0ede699 62%, transparent 78%)',
        }}
      />

      {/* ── MOBILE: stronger cream overlay so text is readable ── */}
      <div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{ background: 'rgba(240, 237, 230, 0.82)' }}
      />

      {/* ── TOP FADE ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #f0ede6dd 0%, transparent 20%, transparent 70%, #f0ede6cc 100%)',
        }}
      />

      {/* ── FLOATING LEAVES (desktop only) ── */}
      <div className="hidden sm:block">
        {FLOATING_LEAVES.map((leaf, i) => (
          <div
            key={i}
            className="absolute bottom-28 pointer-events-none select-none"
            style={{
              left: leaf.x,
              animation: `float-leaf ${leaf.duration} ${leaf.delay} ease-in-out infinite`,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            <svg
              width={leaf.size * 2}
              height={leaf.size * 2.5}
              viewBox="0 0 20 26"
              fill="none"
              style={{ transform: `rotate(${leaf.rotate}deg)` }}
            >
              <path
                d="M10 1 C14 4 18 8 17 14 C16 20 12 24 10 25 C8 24 4 20 3 14 C2 8 6 4 10 1Z"
                fill="#386641"
                fillOpacity="0.55"
              />
              <path d="M10 4 C10 14 10 20 10 25" stroke="#52b788" strokeWidth="0.8" strokeOpacity="0.7" />
            </svg>
          </div>
        ))}
      </div>

      {/* ── AMBIENT HALO RING (desktop only) ── */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          right: '18%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1.5px solid rgba(56,102,65,0.16)',
          background: 'radial-gradient(circle, rgba(82,183,136,0.05) 0%, transparent 70%)',
          animation: 'pulse-ring 4s ease-in-out infinite',
        }}
      />

      {/* ── RIGHT SOCIAL RAIL (tablet+) ── */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2.5 z-30 pointer-events-auto">
        {[
          { href: businessData.instagramUrl,            icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
          { href: '#',                                   icon: <Facebook  className="w-4 h-4" />, label: 'Facebook'  },
          { href: businessData.googleMapsDirectionsUrl, icon: <MapPin    className="w-4 h-4" />, label: 'Location'  },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-md border border-emerald-900/10
                       hover:bg-[#386641] text-[#386641] hover:text-white
                       flex items-center justify-center transition-all shadow-natural hover:scale-110"
          >
            {icon}
          </a>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT — absolutely positioned,
          starts exactly below navbar, ends above strip
          ══════════════════════════════════════════ */}
      <div
        className="absolute left-0 right-0 sm:hidden pointer-events-none"
        style={{
          top: NAV_H_MOBILE,
          bottom: STRIP_H_MOBILE,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 20px',
        }}
      >
        <div className="pointer-events-auto">
          {/* Headline */}
          <h1
            className={`font-cinzel leading-none tracking-tight mb-2 ${mounted ? 'animate-reveal-up' : 'opacity-0'}`}
          >
            <span
              className="block font-extrabold text-[#0f2d21]"
              style={{ fontSize: 'clamp(2.6rem, 12vw, 3.4rem)' }}
            >
              SHEENEEKA
            </span>
            <span
              className="block font-extrabold text-[#386641]"
              style={{ fontSize: 'clamp(2.6rem, 12vw, 3.4rem)' }}
            >
              NURSERY
            </span>
          </h1>

          {/* Divider */}
          <div className={`flex items-center gap-2 mb-2 ${mounted ? 'animate-reveal-up-d1' : 'opacity-0'}`}>
            <div className="w-7 h-px bg-[#386641]/30" />
            <Leaf className="w-3 h-3 text-[#386641]" />
            <div className="w-7 h-px bg-[#386641]/30" />
          </div>

          {/* Subtitle */}
          <h2
            className={`font-playfair leading-snug mb-2 ${mounted ? 'animate-reveal-up-d1' : 'opacity-0'}`}
            style={{ fontSize: 'clamp(1.1rem, 5vw, 1.5rem)' }}
          >
            <span className="italic text-[#386641] font-normal">Bringing Nature </span>
            <span className="font-bold text-[#0f2d21] not-italic">Closer to You</span>
          </h2>

          {/* Description */}
          <p
            className={`text-[#3a5246]/80 text-xs font-light leading-relaxed mb-5 ${mounted ? 'animate-reveal-up-d2' : 'opacity-0'}`}
          >
            Discover a wide variety of healthy plants, flowers, fruit trees, pots &amp; gardening essentials.
          </p>

          {/* CTA Buttons */}
          <div className={`flex items-center gap-2.5 flex-wrap ${mounted ? 'animate-reveal-up-d3' : 'opacity-0'}`}>
            <button
              onClick={() => scrollToSection('plant-catalog')}
              className="px-5 py-2.5 bg-[#386641] text-white font-semibold text-xs rounded-full
                         shadow-natural-lg flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-200" />
              Explore Plants
            </button>
            <button
              onClick={() => scrollToSection('visit-us')}
              className="px-5 py-2.5 border border-[#386641]/50 bg-white/80
                         text-[#0f2d21] font-semibold text-xs rounded-full
                         shadow-natural flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <MapPin className="w-3.5 h-3.5 text-[#386641]" />
              Visit Us
            </button>
          </div>
        </div>

        {/* Scroll indicator — positioned at bottom of this area */}
        <div
          className={`flex flex-col items-center mt-auto pb-4 ${mounted ? 'animate-reveal-up-d4' : 'opacity-0'}`}
        >
          <span className="text-[8px] uppercase tracking-[0.28em] text-[#386641] font-bold mb-1.5">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 border-2 border-[#386641]/40 rounded-full flex justify-center items-start pt-1.5 bg-white/60">
            <div className="w-1 h-2 bg-[#386641] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT — flex column, pt accounts for navbar
          ══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 hidden sm:flex flex-col pointer-events-none"
      >
        <div className="flex-1 flex items-center pt-20 lg:pt-24 pb-24">
          <div className="pl-12 lg:pl-20 xl:pl-24 max-w-lg pointer-events-auto">

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                         bg-white/80 backdrop-blur-sm border border-emerald-900/10
                         text-[#386641] text-[10px] font-bold uppercase tracking-wider
                         mb-5 shadow-natural
                         ${mounted ? 'animate-reveal-up' : 'opacity-0'}`}
            >
              <Leaf className="w-3.5 h-3.5 flex-shrink-0" style={{ animation: 'leaf-sway 3s ease-in-out infinite' }} />
              <span>A Green Beginning to a Better Tomorrow</span>
            </div>

            {/* Headline */}
            <h1 className={`font-cinzel leading-none tracking-tight ${mounted ? 'animate-reveal-up-d1' : 'opacity-0'}`}>
              <span className="block font-extrabold text-[#0f2d21]" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
                SHEENEEKA
              </span>
              <span className="block font-extrabold text-[#386641]" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
                NURSERY
              </span>
            </h1>

            {/* Divider */}
            <div className={`flex items-center gap-2 my-3 ${mounted ? 'animate-reveal-up-d2' : 'opacity-0'}`}>
              <div className="w-8 h-px bg-[#386641]/30" />
              <Leaf className="w-3 h-3 text-[#386641]" style={{ animation: 'breathe 5s ease-in-out infinite' }} />
              <div className="w-8 h-px bg-[#386641]/30" />
            </div>

            {/* Subtitle */}
            <h2
              className={`font-playfair italic font-normal text-[#386641] leading-snug mb-3
                         ${mounted ? 'animate-reveal-up-d2' : 'opacity-0'}`}
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
            >
              Bringing Nature{' '}
              <span className="font-bold text-[#0f2d21] not-italic">Closer to You</span>
            </h2>

            {/* Description */}
            <p
              className={`text-[#3a5246]/80 text-sm font-light leading-relaxed mb-7 max-w-sm
                         ${mounted ? 'animate-reveal-up-d3' : 'opacity-0'}`}
            >
              Discover a wide variety of healthy plants, flowers, fruit trees, pots, and gardening essentials for every space.
            </p>

            {/* CTAs */}
            <div className={`flex items-center gap-3 flex-wrap ${mounted ? 'animate-reveal-up-d4' : 'opacity-0'}`}>
              <button
                onClick={() => scrollToSection('plant-catalog')}
                className="btn-shimmer px-7 py-3.5 bg-[#386641] hover:bg-[#2d5234]
                           text-white font-semibold text-sm rounded-full
                           shadow-natural-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <Leaf className="w-4 h-4 text-emerald-200" />
                Explore Plants
              </button>
              <button
                onClick={() => scrollToSection('visit-us')}
                className="px-7 py-3.5 border border-[#386641]/50
                           bg-white/80 backdrop-blur-sm hover:bg-white
                           text-[#0f2d21] font-semibold text-sm rounded-full
                           shadow-natural transition-all hover:scale-105 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#386641]" />
                Visit Us
              </button>
            </div>
          </div>
        </div>

        {/* Desktop scroll indicator */}
        <div className={`pb-[108px] flex flex-col items-center pointer-events-none
                        ${mounted ? 'animate-reveal-up-d5' : 'opacity-0'}`}>
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#386641] font-bold mb-1.5">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-10 border-2 border-[#386641]/40 rounded-full flex justify-center items-start pt-2 bg-white/60 backdrop-blur-sm">
            <div className="w-1.5 h-2.5 bg-[#386641] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* ── BOTTOM FEATURE STRIP ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-emerald-900/10 pointer-events-auto z-20 shadow-natural">

        {/* Mobile: compact 2-col strip */}
        <div className="grid grid-cols-2 md:hidden divide-x divide-emerald-900/8">
          {[
            { icon: <Leaf className="w-4 h-4" />, title: 'Healthy Plants',  sub: 'Carefully nurtured' },
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16" />
                </svg>
              ),
              title: 'Wide Variety', sub: 'Indoor, outdoor & more',
            },
          ].map(({ icon, title, sub }, i) => (
            <div key={i} className="flex items-center gap-2.5 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 text-[#386641]">
                {icon}
              </div>
              <div>
                <span className="text-xs font-bold text-[#0f2d21] block leading-tight">{title}</span>
                <span className="text-[10px] text-[#3a5246]/70 font-light">{sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: full 4-col strip */}
        <div className="hidden md:grid md:grid-cols-4 max-w-7xl mx-auto">
          {[
            { icon: <Leaf className="w-5 h-5 text-[#386641]" />, title: 'Healthy Plants', sub: 'Carefully nurtured\nfor perfect growth' },
            {
              icon: (
                <svg className="w-5 h-5 text-[#386641]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ),
              title: 'Wide Variety', sub: 'Indoor, outdoor,\nflowering & more',
            },
            {
              icon: (
                <svg className="w-5 h-5 text-[#386641]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20v-2a6 6 0 0112 0v2" />
                </svg>
              ),
              title: 'Expert Guidance', sub: 'Always here to help\nyou grow better',
            },
            { icon: <Shield className="w-5 h-5 text-[#386641]" />, title: 'Customer Trust', sub: 'Quality guarantee\nyou can rely on' },
          ].map(({ icon, title, sub }, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-emerald-50/50 transition-colors group
                         ${i < 3 ? 'border-r border-emerald-900/8' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center flex-shrink-0
                              group-hover:bg-[#386641] group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
              <div>
                <span className="text-sm font-bold text-[#0f2d21] block leading-tight">{title}</span>
                <span className="text-xs text-[#3a5246]/70 font-light block mt-0.5 whitespace-pre-line">{sub}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface StatConfig {
  target: number;
  suffix?: string;
  label: string;
}

const STATS_DATA: StatConfig[] = [
  { target: 80, suffix: '', label: 'Global Brands' },
  { target: 10, suffix: 'K', label: 'Items Delivered' },
  { target: 40, suffix: '', label: 'Trusted Vendors' },
  { target: 47, suffix: 'M', label: 'USD Stock Value' },
];

/**
 * AnimatedCounterItem
 * Smoothly animates numbers starting strictly from 0 to their target value
 * using quartic ease-out curve for a natural, silky smooth deceleration.
 */
const AnimatedCounterItem: React.FC<{
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}> = ({ target, suffix = '', label, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease out: 1 - (1 - progress)^4
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(ease * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <div className="flex flex-col items-start select-none">
      <div className="flex items-baseline font-black tracking-tight text-[#111624] leading-none">
        <span className="text-[#C8181E] font-black text-lg sm:text-xl lg:text-2xl mr-0.5">
          +
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-black tabular-nums tracking-tight">
          {count}
        </span>
        {suffix && (
          <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#C8181E] ml-0.5">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-xs sm:text-[13px] font-bold text-[#4E5463] mt-1.5 leading-snug tracking-tight whitespace-nowrap">
        {label}
      </p>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { setActivePage, openRFQModal } = useShop();

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-center -mt-[64px] sm:-mt-[70px] pt-[84px] sm:pt-[94px] pb-6 sm:pb-8 lg:min-h-[calc(100vh-40px)] lg:max-h-[820px]"
      style={{
        backgroundColor: '#F7F3EC',
        position: 'relative',
      }}
    >
      {/* ── Background image: hero-products.png (Full-bleed cover fitting the whole screen) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: "url('/images/hero-products.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
        }}
      />

      {/* Subtle ambient lighting glows */}
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-16 w-[380px] h-[380px] bg-[#C8181E]/5 rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Responsive soft gradient on smaller screens for crisp readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to right, rgba(247, 243, 236, 0.98) 0%, rgba(247, 243, 236, 0.94) 62%, rgba(247, 243, 236, 0.6) 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          MAIN HERO CONTENT AREA (Fits neatly on first screen)
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* ──────────────────────────────────────────
              LEFT COLUMN — Typography, CTAs & 6 Stats
          ────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Pill Eyebrow Badge */}
            <div className="mb-3.5 sm:mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E2DBD0] shadow-sm hover:border-[#C8181E]/40 transition-colors">
                <span className="text-[#C8181E] font-black text-sm">→</span>
                <span className="text-xs sm:text-[13px] font-bold text-[#2D3139] tracking-tight">
                  Trusted by 1000+ Businesses Worldwide
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-black text-[#111624] tracking-tight leading-[1.07] mb-3.5 sm:mb-4 text-[34px] sm:text-[44px] lg:text-[50px] xl:text-[56px]">
              Industrial Products<br />
              for a <span className="text-[#C8181E]">Safer, Stronger</span><br />
              <span className="text-[#C8181E]">Tomorrow</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-[#4E5463] max-w-[480px] leading-relaxed mb-6 sm:mb-7 font-normal">
              Find, compare and buy high-quality industrial products from verified suppliers — all in one place.
            </p>

            {/* ── TWO NEWLY DESIGNED CTA BUTTONS ── */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Primary Action Button */}
              <button
                onClick={() => setActivePage('catalog')}
                className="bg-[#C8181E] hover:bg-[#AA1318] active:scale-95 text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-[0_4px_16px_rgba(200,24,30,0.3)] hover:shadow-[0_8px_24px_rgba(200,24,30,0.4)] group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Action Button */}
              <button
                onClick={() => openRFQModal()}
                className="bg-white/85 hover:bg-white active:scale-95 text-[#111624] hover:text-[#C8181E] border border-[#D9D1C7] hover:border-[#C8181E]/40 px-6 sm:px-7 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow"
              >
                <FileText className="w-4 h-4 text-[#C8181E]" />
                <span>Request a Quote</span>
              </button>
            </div>

            {/* ── 4 KEY METRICS (No separate background, floating typography with elegant alignment) ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 lg:gap-8 pt-4 sm:pt-6 border-t border-[#DFD7CB]/80 max-w-[680px]">
              {STATS_DATA.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col justify-center ${
                    idx !== 0 ? 'sm:border-l sm:border-[#DFD7CB]/80 sm:pl-5 lg:pl-7' : ''
                  }`}
                >
                  <AnimatedCounterItem
                    target={stat.target}
                    suffix={stat.suffix}
                    label={stat.label}
                    duration={1800 + idx * 80}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ──────────────────────────────────────────
              RIGHT COLUMN — Space for background products
              + Floating Industrial Solutions Label
          ────────────────────────────────────────── */}
          <div className="lg:col-span-5 relative flex flex-col justify-between items-end self-stretch min-h-[160px] lg:min-h-[300px]">

            {/* Floating Top-Right Accent Label */}
            <div className="relative mt-2 bg-white/85 hover:bg-white backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-[#EADFD2] shadow-sm hover:shadow transition-all">
              <div className="border-l-2 border-[#C8181E] pl-3 py-0.5">
                <p className="text-[9.5px] font-extrabold tracking-[0.14em] text-[#C8181E] uppercase mb-0.5">
                  INDUSTRIAL SOLUTIONS
                </p>
                <p className="text-xs sm:text-[13.5px] font-extrabold text-[#111624] leading-tight">
                  Quality Products<br />for Every Industry
                </p>
                <button
                  onClick={() => setActivePage('catalog')}
                  aria-label="View all quality industrial products"
                  className="mt-1 text-[#C8181E] hover:text-[#95131A] inline-flex items-center gap-1 font-bold text-xs group"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* The products are integrated into the background hero-products.png */}
            <div className="hidden lg:block w-full flex-1" />
          </div>

        </div>
      </div>
    </section>
  );
};

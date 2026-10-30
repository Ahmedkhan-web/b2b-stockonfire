import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { useShop } from '../context/ShopContext';

/* ─────────────────────────────────────────────────────────
   STATS DATA
───────────────────────────────────────────────────────── */
interface StatConfig {
  target: number;
  suffix?: string;
  label: string;
  description: string;
}

const STATS_DATA: StatConfig[] = [
  { target: 80,  suffix: '+',  label: 'Global Brands',    description: 'Verified OEM partners' },
  { target: 10,  suffix: 'K+', label: 'Items Delivered',  description: 'Products dispatched'   },
  { target: 40,  suffix: '+',  label: 'Trusted Vendors',  description: 'Certified suppliers'   },
  { target: 47,  suffix: 'M',  label: 'USD Stock Value',  description: 'Ready inventory'       },
];

/* ─────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────── */
interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
  description: string;
  duration?: number;
  isVisible: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  suffix = '',
  label,
  description,
  duration = 1800,
  isVisible,
}) => {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  const animate = useCallback(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setCount(target);
      return;
    }

    let startTs: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(ease * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  useEffect(() => {
    if (isVisible && !hasRun.current) {
      hasRun.current = true;
      const cleanup = animate();
      return cleanup;
    }
  }, [isVisible, animate]);

  return (
    <div className="flex flex-col select-none">
      <div className="flex items-baseline gap-0.5 leading-none">
        <span
          className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-black tracking-tight text-[#111624] tabular-nums"
          aria-live="polite"
        >
          {count}
        </span>
        {suffix && (
          <span className="text-xl sm:text-2xl lg:text-[1.6rem] font-black text-[#C8181E] tracking-tight">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-[13px] sm:text-sm font-bold text-[#1A1F2E] mt-1.5 leading-none tracking-tight">
        {label}
      </p>
      <p className="text-[11px] text-[#7A8092] font-medium mt-0.5 leading-none tracking-tight">
        {description}
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
export const Hero: React.FC = () => {
  const { setActivePage } = useShop();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-center -mt-[64px] sm:-mt-[70px] pt-[84px] sm:pt-[94px] pb-8 sm:pb-10 lg:min-h-[100vh] lg:max-h-[820px]"
      aria-label="Hero section"
      style={{ backgroundColor: '#F7F3EC' }}
    >
      {/* ── Background hero image ── */}
      <picture
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0"
      >
        <source srcSet="/images/hero-products-sm.webp" type="image/webp" media="(max-width: 1023px)" />
        <source srcSet="/images/hero-products.webp"    type="image/webp" media="(min-width: 1024px)" />
        <img
          src="/images/hero-products.png"
          alt=""
          aria-hidden="true"
          width={1672}
          height={940}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
        />
      </picture>

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute -top-20 left-1/4 w-[480px] h-[480px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div aria-hidden="true" className="absolute top-1/3 -left-16 w-[380px] h-[380px] bg-[#C8181E]/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Mobile readability gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 lg:hidden"
        style={{ background: 'linear-gradient(to right, rgba(247,243,236,0.98) 0%, rgba(247,243,236,0.94) 62%, rgba(247,243,236,0.55) 100%)' }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* ── Eyebrow badge — bobs up & down continuously ── */}
            <div className="mb-5 sm:mb-6 hero-badge-bob hero-d0">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#E2DBD0] shadow-sm">
                {/* Pulsing dot */}
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8181E] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8181E]" />
                </span>
                <Users className="w-3.5 h-3.5 text-[#C8181E] flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-extrabold text-[#2D3139] tracking-[0.08em] uppercase">
                  Trusted by 1,000+ Businesses Worldwide
                </span>
              </div>
            </div>

            {/* ── Heading — each word/line reveals independently ── */}
            <h1
              className="font-black text-[#111624] tracking-tight leading-[1.06] mb-5 sm:mb-6 overflow-hidden"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.5rem)' }}
            >
              {/* Line 1 */}
              <span className="block overflow-hidden">
                <span className="hero-word-reveal hero-d1" style={{ animationDelay: '100ms' }}>
                  Your Strategic
                </span>{' '}
                <span className="hero-word-reveal" style={{ animationDelay: '180ms' }}>
                  Partner
                </span>
              </span>
              {/* Line 2 */}
              <span className="block overflow-hidden">
                <span className="hero-word-reveal" style={{ animationDelay: '260ms' }}>
                  in{' '}
                </span>
                <span
                  className="hero-word-reveal"
                  style={{
                    animationDelay: '320ms',
                    color: '#C8181E',
                  }}
                >
                  Industrial
                </span>
              </span>
              {/* Line 3 */}
              <span className="block overflow-hidden">
                <span
                  className="hero-word-reveal"
                  style={{
                    animationDelay: '400ms',
                    color: '#C8181E',
                  }}
                >
                  Procurement
                </span>
              </span>
            </h1>

            {/* ── Description — slides in from left ── */}
            <p
              className="text-[15px] sm:text-base text-[#4E5463] max-w-[480px] leading-[1.75] mb-7 sm:mb-8 font-normal hero-desc-reveal"
              style={{
                animationDelay: '500ms',
                fontStyle: 'italic',
                letterSpacing: '0.01em',
              }}
            >
              Source quality industrial products, compare competitive offers,
              and connect with trusted suppliers—all in one marketplace.
            </p>

            {/* ── CTAs ── */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10 hero-slide-up hero-d4">
              <button
                onClick={() => setActivePage('catalog')}
                className="bg-[#C8181E] hover:bg-[#AA1318] active:scale-95 text-white px-7 sm:px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-[0_4px_16px_rgba(200,24,30,0.3)] hover:shadow-[0_8px_24px_rgba(200,24,30,0.4)] group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                onClick={() => setActivePage('become-supplier')}
                className="bg-white/85 hover:bg-white active:scale-95 text-[#111624] hover:text-[#C8181E] border border-[#D9D1C7] hover:border-[#C8181E]/40 px-6 sm:px-7 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow"
              >
                <span>Become a Supplier</span>
              </button>
            </div>

            {/* ── STATISTICS ── */}
            <div
              ref={statsRef}
              className="hero-slide-up hero-d5"
              aria-label="Key marketplace statistics"
            >
              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-[#C8181E]/30 via-[#DFD7CB] to-transparent mb-6" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 sm:gap-x-0 max-w-[640px]">
                {STATS_DATA.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col ${
                      idx !== 0
                        ? 'sm:border-l sm:border-[#DFD7CB]/70 sm:pl-6 lg:pl-8'
                        : ''
                    }`}
                  >
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      label={stat.label}
                      description={stat.description}
                      duration={1600 + idx * 100}
                      isVisible={statsVisible}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — floating accent card */}
          <div className="lg:col-span-5 relative flex flex-col justify-between items-end self-stretch min-h-[160px] lg:min-h-[300px]">
            <div className="relative mt-2 bg-white/85 hover:bg-white backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-[#EADFD2] shadow-sm hover:shadow transition-all hero-fade-in hero-d5">
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
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="hidden lg:block w-full flex-1" />
          </div>

        </div>
      </div>
    </section>
  );
};

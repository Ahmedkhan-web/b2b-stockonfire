import React from 'react';
import { Factory, Flame, Plane, Droplets, HardHat, Pill, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ShopByIndustry: React.FC = () => {
  const { setActivePage, setSelectedCategoryFilter } = useShop();

  const industries = [
    {
      id: 'ind-oil-gas',
      name: 'Oil, Gas & Petrochemical',
      icon: Flame,
      categorySlug: 'fire-safety-equipment',
      skuCount: '6,400+ SKUs',
      highlights: 'Explosion-proof valves, flame arrestors, high-pressure piping & Class 1 Div 1 instrumentation.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'ind-automation',
      name: 'Automated Manufacturing',
      icon: Factory,
      categorySlug: 'industrial-automation',
      skuCount: '12,200+ SKUs',
      highlights: 'PLCs, robotics, servo drives, conveyor drives, machine vision & distributed I/O systems.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'ind-water',
      name: 'Water & Municipal Utilities',
      icon: Droplets,
      categorySlug: 'water-treatment',
      skuCount: '4,800+ SKUs',
      highlights: 'Commercial RO membranes, vertical multistage pumps, magnetic flowmeters & dosing systems.',
      image: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'ind-aerospace',
      name: 'Aerospace & Defense',
      icon: Plane,
      categorySlug: 'sensors-controls',
      skuCount: '3,100+ SKUs',
      highlights: 'Mil-spec connectors, precision torque tools, cryogenic sensors & thermal imaging.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'ind-construction',
      name: 'Heavy Plant & Construction',
      icon: HardHat,
      categorySlug: 'electrical-equipment',
      skuCount: '8,900+ SKUs',
      highlights: 'High-voltage switchgear, hydraulic breakers, fall arrest gear & heavy cable trays.',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'ind-pharma',
      name: 'Pharma & Cleanroom',
      icon: Pill,
      categorySlug: 'safety-equipment',
      skuCount: '2,900+ SKUs',
      highlights: 'PAPR respiratory systems, sanitary diaphragm valves, clean air blowers & passivators.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3EC] border border-[#E8E2D7] text-xs font-bold text-[#4E5463] uppercase tracking-wider mb-3">
            <Factory className="w-3.5 h-3.5 text-[#C8181E]" />
            <span>Targeted Industry Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight mb-3">
            Procure Tailored Equipment by Industry
          </h2>
          <p className="text-[15px] text-[#4E5463] leading-relaxed">
            Every sector requires specialised safety certifications, material compliance, and tolerance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                onClick={() => { setSelectedCategoryFilter(ind.categorySlug); setActivePage('catalog'); }}
                className="group relative rounded-2xl overflow-hidden border border-[#E8E2D7] shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer h-72"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${ind.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111624] via-[#111624]/80 to-[#111624]/20" />

                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#C8181E] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/10">
                      {ind.skuCount}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#F87171] transition-colors mb-1.5 flex items-center justify-between">
                      <span>{ind.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#A8B4C2] group-hover:text-[#F87171] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </h3>
                    <p className="text-xs text-[#A8B4C2] line-clamp-2 leading-relaxed">
                      {ind.highlights}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-3 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C8181E] w-1/2 rounded-full group-hover:w-full transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

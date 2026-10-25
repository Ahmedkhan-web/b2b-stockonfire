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
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'ind-automation',
      name: 'Automated Manufacturing',
      icon: Factory,
      categorySlug: 'industrial-automation',
      skuCount: '12,200+ SKUs',
      highlights: 'PLCs, robotics, servo drives, conveyor drives, machine vision & distributed I/O systems.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'ind-water',
      name: 'Water & Municipal Utilities',
      icon: Droplets,
      categorySlug: 'water-treatment',
      skuCount: '4,800+ SKUs',
      highlights: 'Commercial RO membranes, vertical multistage pumps, magnetic flowmeters & dosing systems.',
      image: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'ind-aerospace',
      name: 'Aerospace & Defense',
      icon: Plane,
      categorySlug: 'sensors-controls',
      skuCount: '3,100+ SKUs',
      highlights: 'Mil-spec connectors, precision torque tools, cryogenic sensors & thermal imaging.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'ind-construction',
      name: 'Heavy Plant & Construction',
      icon: HardHat,
      categorySlug: 'electrical-equipment',
      skuCount: '8,900+ SKUs',
      highlights: 'High-voltage switchgear, hydraulic breakers, fall arrest gear & heavy cable trays.',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'ind-pharma',
      name: 'Pharma & Cleanroom Processing',
      icon: Pill,
      categorySlug: 'safety-equipment',
      skuCount: '2,900+ SKUs',
      highlights: 'PAPR respiratory systems, sanitary diaphragm valves, clean air blowers & passivators.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold uppercase tracking-wider mb-5 shadow-lg shadow-blue-600/20">
            <Factory className="w-4 h-4" />
            <span>Targeted Industry Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Procure Tailored Equipment by Industry
          </h2>
          <p className="text-lg text-slate-600 mt-3">
            Every sector requires specialized safety certifications, material compliance, and tolerance standards.
          </p>
        </div>

        {/* Modern Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                onClick={() => {
                  setSelectedCategoryFilter(ind.categorySlug);
                  setActivePage('catalog');
                }}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col h-80"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${ind.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent" />

                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/10">
                      {ind.skuCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2 flex items-center justify-between">
                    <span>{ind.name}</span>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {ind.highlights}
                  </p>
                </div>

                <div className="mt-auto p-6 pt-0">
                  <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-2/3 rounded-full group-hover:w-full transition-all duration-500" />
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

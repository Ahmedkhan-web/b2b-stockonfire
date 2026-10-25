import React from 'react';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { useShop } from '../context/ShopContext';

export const TrustedBrands: React.FC = () => {
  const { setSelectedBrandFilter, setActivePage } = useShop();

  const handleBrandClick = (brandName: string) => {
    setSelectedBrandFilter(brandName);
    setActivePage('catalog');
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Authorized Global Distribution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trusted by World-Class Industrial Manufacturers
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Source with confidence. All partner brands meet rigorous ISO 9001 quality standards and come with full manufacturer warranties.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleBrandClick(brand.name)}
              className="group bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-5 flex flex-col items-center text-center justify-between cursor-pointer transition-all hover:shadow-card-hover"
            >
              <div className="w-full flex justify-between items-center text-[10px] text-slate-400 mb-3">
                <span className="font-semibold">{brand.country}</span>
                <span className="bg-white group-hover:bg-orange-50 group-hover:text-orange-600 px-1.5 py-0.5 rounded border border-slate-200/60 font-medium transition-colors">
                  {brand.badge}
                </span>
              </div>

              {/* Brand Name with Bold Typography */}
              <div className="my-3">
                <div className="text-base sm:text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight">
                  {brand.name}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {brand.category}
                </div>
              </div>

              <div className="w-full pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-slate-800">
                <span>{brand.productCount} Products</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

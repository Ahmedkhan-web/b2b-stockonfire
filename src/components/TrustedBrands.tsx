import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { useShop } from '../context/ShopContext';

export const TrustedBrands: React.FC = () => {
  const { setSelectedBrandFilter, setActivePage } = useShop();

  const handleBrandClick = (brandName: string) => {
    setSelectedBrandFilter(brandName);
    setActivePage('catalog');
  };

  return (
    <section className="py-16 bg-[#F7F3EC] border-y border-[#E8E2D7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D7] text-xs font-bold text-[#4E5463] uppercase tracking-wider mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8181E]" />
            <span>Authorized Global Distribution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111624] tracking-tight">
            Trusted World-Class Industrial Manufacturers
          </h2>
          <p className="text-sm text-[#4E5463] mt-2 leading-relaxed">
            All partner brands meet rigorous ISO 9001 quality standards and ship with full manufacturer warranties.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleBrandClick(brand.name)}
              className="group bg-white hover:bg-white rounded-2xl border border-[#E8E2D7] hover:border-[#C8181E]/30 p-5 flex flex-col items-center text-center justify-between cursor-pointer transition-all shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="w-full flex justify-between items-center text-[10px] text-[#8C93A0] mb-3">
                <span className="font-semibold">{brand.country}</span>
                <span className="bg-[#F7F3EC] group-hover:bg-[#C8181E]/10 group-hover:text-[#C8181E] px-1.5 py-0.5 rounded border border-[#E8E2D7] font-medium transition-colors">
                  {brand.badge}
                </span>
              </div>

              <div className="my-3">
                <div className="text-base sm:text-lg font-black text-[#111624] group-hover:text-[#C8181E] transition-colors tracking-tight">
                  {brand.name}
                </div>
                <div className="text-[11px] text-[#7A8092] font-medium mt-0.5">
                  {brand.category}
                </div>
              </div>

              <div className="w-full pt-3 border-t border-[#E8E2D7] flex items-center justify-between text-[11px] text-[#8C93A0] group-hover:text-[#4E5463] transition-colors">
                <span>{brand.productCount} Products</span>
                <ArrowRight className="w-3 h-3 text-[#DFD7CB] group-hover:text-[#C8181E] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

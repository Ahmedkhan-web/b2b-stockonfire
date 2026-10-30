import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, UserCheck, X } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-6 rounded-full bg-[#C8181E]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8181E]">Engineering Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight">
              Latest Industrial Articles & Buying Guides
            </h2>
            <p className="text-[#4E5463] mt-2 text-[15px] max-w-xl leading-relaxed">
              Authored by senior controls engineers, hazardous area specialists, and plant procurement officers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-[#F7F3EC] hover:bg-white rounded-2xl border border-[#E8E2D7] hover:border-[#C8181E]/30 shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden bg-[#E8E2D7]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#C8181E] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2.5 text-xs text-[#8C93A0] mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C8181E]" />
                    <span>{art.readTime}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#DFD7CB]" />
                  <span>{art.date}</span>
                </div>

                <h3 className="text-sm font-bold text-[#111624] group-hover:text-[#C8181E] transition-colors line-clamp-2 mb-2.5 leading-snug flex items-start gap-1">
                  <span>{art.title}</span>
                </h3>

                <p className="text-xs text-[#7A8092] line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt}
                </p>

                <div className="mt-auto pt-3 border-t border-[#E8E2D7] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#111624]">{art.author}</div>
                    <div className="text-[10px] text-[#8C93A0]">{art.authorRole}</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#C8181E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {art.author.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111624]/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E2D7]">
              <div className="relative h-60 bg-[#111624]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#111624]/80 text-white hover:bg-[#C8181E] transition-all"
                  aria-label="Close article"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-5 left-6">
                  <span className="bg-[#C8181E] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A8092] mb-4">
                  <span className="font-semibold text-[#111624]">{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>·</span>
                  <span className="font-semibold text-[#111624] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#C8181E]" />
                    {selectedArticle.author} ({selectedArticle.authorRole})
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#111624] mb-5 leading-snug">
                  {selectedArticle.title}
                </h2>

                <div className="space-y-4 text-sm text-[#4E5463] leading-relaxed">
                  <p className="font-medium text-[#111624] text-base">{selectedArticle.excerpt}</p>
                  <p>
                    Industrial procurement decisions carry deep structural consequences for plant safety, 
                    equipment lifecycle, and downtime mitigation. When specifying hardware in modern automation 
                    architectures, strict adherence to international standards—including IEC 61131-3 for PLCs 
                    and NFPA 70 / NEC guidelines for hazardous locations—is fundamental.
                  </p>
                  <div className="p-4 bg-[#FDF8F3] rounded-xl border border-[#E8E2D7]">
                    <div className="font-bold text-[#111624] mb-1 flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#C8181E]" />
                      Key Takeaway for Plant Engineers
                    </div>
                    <p>
                      Always require 3.1 Inspection Certificates and verify maximum surface temperature 
                      class ratings (T1–T6) when operating near volatile vapors or combustible dust atmospheres.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-[#E8E2D7] flex justify-center">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-[#C8181E] hover:bg-[#A81216] text-white px-8 py-3 rounded-2xl text-sm font-bold transition-all shadow-[0_4px_12px_rgba(200,24,30,0.25)]"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

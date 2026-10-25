import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Engineering Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Latest Industrial Articles & Buying Guides
            </h2>
            <p className="text-slate-600 mt-3 text-lg max-w-xl">
              Authored by senior control systems engineers, hazardous area specialists, and plant procurement officers.
            </p>
          </div>
        </div>

        {/* Modern Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-blue-600/30">
                    {art.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{art.readTime}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-slate-400">{art.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3 leading-snug">
                  {art.title}
                  <ArrowRight className="inline-block w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt}
                </p>

                {/* Author Info */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{art.author}</div>
                    <div className="text-xs text-slate-500">{art.authorRole}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {art.author.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="relative h-64 bg-slate-900">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black hover:scale-110 transition-all"
                >
                  <ArrowRight className="w-5 h-5 rotate-45" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-amber-500/30">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                  <span className="font-semibold text-slate-800">{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>•</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-500" />
                    {selectedArticle.author} ({selectedArticle.authorRole})
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 leading-snug">
                  {selectedArticle.title}
                </h2>

                <div className="prose prose-slate text-sm text-slate-700 space-y-4 leading-relaxed max-w-none">
                  <p className="font-medium text-slate-800 text-base">
                    {selectedArticle.excerpt}
                  </p>
                  <p>
                    Industrial procurement decisions often carry deep structural consequences for plant safety, 
                    equipment lifecycle, and downtime mitigation. When specifying hardware in modern automation 
                    architectures, strict adherence to international standardizations—including IEC 61131-3 for 
                    programmable logic controllers and NFPA 70 / NEC guidelines for hazardous locations—is fundamental.
                  </p>
                  <p>
                    At ForgeMarket, every catalog product is cross-referenced with accredited laboratories (such 
                    as UL, TÜV SÜD, and FM Global) to confirm that terminal housings, explosion-proof seals, and 
                    ingress protection ratings meet real factory floor criteria rather than unsubstantiated claims.
                  </p>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-xl border border-blue-100 text-sm text-slate-600">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-600" />
                      Key Takeaway for Plant Engineers
                    </div>
                    Always require 3.1 Inspection Certificates and verify maximum surface temperature class 
                    ratings (T1-T6) when operating near volatile vapors or combustible dust atmospheres.
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200 flex justify-center">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
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

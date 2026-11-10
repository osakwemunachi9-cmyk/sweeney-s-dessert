import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatNaira } from '../utils/format';

interface HeroProps {
  onExploreClick: () => void;
  onTastingClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onTastingClick }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20">
      {/* Light pink glow backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#881337] uppercase">
              <span>Handcrafted in Enugu</span>
              <span aria-hidden="true">·</span>
              <span>Eat healthy, Drink healthy</span>
              <span aria-hidden="true">·</span>
              <span>Triple-Strained Greek Yogurt</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#33111b] leading-[1.12] [text-wrap:balance]">
              Artisanal Greek yogurt desserts, crafted fresh in Enugu.
            </h1>

            {/* Body prose */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl">
              Thick, creamy whole-milk yogurt slow-strained in small daily batches. Fresh parfait cups with fruit coulis, chilled drinking yogurts, and artisan crunchy honey granola. Delivered cold across Enugu.
            </p>

            {/* Price discovery and quick actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#5c1d2e] text-white text-sm font-semibold rounded-xl hover:bg-[#431422] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Shop Fresh Menu from {formatNaira(1200)}</span>
                <ArrowRight className="w-4 h-4 text-rose-200" />
              </button>

              <button
                onClick={onTastingClick}
                className="px-6 py-3.5 border border-rose-300 text-[#5c1d2e] hover:bg-rose-100/40 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Parfait Cup with Spoon ({formatNaira(3500)})</span>
              </button>
            </div>

            {/* Trust points strip */}
            <div className="pt-6 border-t border-rose-200/70 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="space-y-1">
                <span className="font-bold text-stone-900 block font-mono text-sm tabular-nums">&lt; 4°C</span>
                <span className="text-stone-500">Enugu Chilled Dispatch</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-stone-900 block font-mono text-sm tabular-nums">From ₦1,200</span>
                <span className="text-stone-500">Fresh Artisan Dairy</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-stone-900 block font-mono text-sm tabular-nums">0810 244 6805</span>
                <span className="text-stone-500">Direct WhatsApp Orders</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real Product Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-rose-900/10 border border-rose-200/80 bg-rose-50/50 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.20_PM_4a468390.jpeg"
                alt="Sweeney's Parfait Cup with Spoon in Enugu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
              />

              {/* SWEENEY'S DESSERT Brand Sticker Seal */}
              <div className="absolute top-4 left-4 bg-white/95 text-[#881337] px-3.5 py-1.5 rounded-full border-2 border-rose-300 shadow-md backdrop-blur-xs flex items-center gap-1.5">
                <span className="text-sm">🧁</span>
                <span className="font-serif font-bold text-xs tracking-wider uppercase">
                  SWEENEY'S DESSERT
                </span>
              </div>

              {/* Floating caption bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-rose-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-serif font-bold text-stone-900">Parfait Cup with Spoon</p>
                  <p className="text-[11px] text-stone-500">Fresh fruit coulis & crunchy granola · Handcrafted in Enugu</p>
                </div>
                <span className="text-xs font-semibold font-mono text-[#5c1d2e] tabular-nums">
                  {formatNaira(3500)}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

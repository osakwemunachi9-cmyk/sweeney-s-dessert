import React from 'react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Heart } from 'lucide-react';
import { formatNaira } from '../utils/format';

interface BrandStoryLandingProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
}

export const BrandStoryLanding: React.FC<BrandStoryLandingProps> = ({
  onOrderNow,
  onExploreMenu,
}) => {
  return (
    <section id="our-story" className="py-16 md:py-24 border-t border-rose-200/70 bg-gradient-to-b from-[#fcf3f5] via-white/60 to-[#fdf5f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
        
        {/* Editorial Heading + Mission Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#881337] uppercase">
              <span>The Sweeney Kitchen</span>
              <span aria-hidden="true">·</span>
              <span>Enugu, Nigeria</span>
              <span aria-hidden="true">·</span>
              <span>Handcrafted Small Batches</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#33111b] leading-[1.15] [text-wrap:balance]">
              Pure whole milk yogurt, crafted by hand for Enugu dessert lovers.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-stone-600 leading-relaxed">
              We started Sweeney’s Dessert with a single principle: dessert should nourish as deeply as it delights. Real milk, slow gravity straining, zero shortcuts.
            </p>
          </div>
        </div>

        {/* 3-Step Kitchen Process / Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="bg-white rounded-3xl p-7 border border-rose-200/80 shadow-xs space-y-4 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-[#881337] tracking-widest block">
              01 · WHOLE COW MILK
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Pasteurized Fresh Dairy
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We use 100% whole milk from local dairy farms. No milk powder reconstitution, no artificial emulsifiers, and zero preservatives.
            </p>
            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Pure Whole Milk</span>
              <span className="font-semibold text-emerald-800">100% Clean</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-rose-200/80 shadow-xs space-y-4 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-[#881337] tracking-widest block">
              02 · 18-HOUR STRAINING
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Triple-Strained Gravity Method
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Slow gravity straining naturally removes liquid whey over 18 chilled hours, creating rich custard density without needing starch or gelatin.
            </p>
            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Gravity Whey Separation</span>
              <span className="font-semibold text-stone-800">Velvety Density</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-rose-200/80 shadow-xs space-y-4 hover:border-rose-300 transition-colors">
            <span className="font-mono text-xs font-bold text-[#881337] tracking-widest block">
              03 · PROMPT ENUGU DISPATCH
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Dedicated Chilled Courier
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Managed by courier Chinenye Adaeze (08102446805). Each bottle and cup travels in thermal insulated carriers directly to your doorstep.
            </p>
            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Thermal Transit</span>
              <span className="font-semibold text-[#881337]">&lt; 4°C Freshness</span>
            </div>
          </div>

        </div>

        {/* Highlight Feature Showcase Card with Authentic Real Photo */}
        <div className="bg-white rounded-3xl overflow-hidden border border-rose-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.37.21_PM_acfcb010.jpeg"
              alt="Sweeney's Chilled Drinking Yogurt Batch in Enugu"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/95 text-[#881337] px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider border border-rose-200 shadow-xs">
              Daily Ice Tub Chilled
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#881337] uppercase tracking-wider">
                <span>The Sweeney Promise</span>
                <span aria-hidden="true">·</span>
                <span>Eat healthy, Drink healthy</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#33111b] [text-wrap:balance]">
                Made fresh every morning, packed on ice, delivered straight to your home or office.
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether you need a quick ₦1,200 probiotic pocket bottle during busy work hours, a creamy ₦3,500 layered parfait cup with spoon included for lunch, or a ₦9,500 sharing tub for the family, Sweeney’s delivers wholesome goodness across Enugu.
              </p>
            </div>

            <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOrderNow}
                className="px-6 py-3.5 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Order Chilled Yogurt Now</span>
                <ArrowRight className="w-4 h-4 text-rose-200" />
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 border border-rose-300 text-[#5c1d2e] hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              >
                <span>View All 5 Fresh Products</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

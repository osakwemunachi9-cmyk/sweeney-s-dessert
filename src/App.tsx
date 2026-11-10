import React, { useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PaymentAccountProvider, usePaymentAccount } from './context/PaymentAccountContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ColdChainGuarantee } from './components/ColdChainGuarantee';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AuthModal } from './components/AuthModal';
import { CustomerAccountView } from './components/CustomerAccountView';
import { PaymentAccountSettingsModal } from './components/PaymentAccountSettingsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { BrandStoryLanding } from './components/BrandStoryLanding';
import { FaqLanding } from './components/FaqLanding';
import { Star } from 'lucide-react';
import { PRODUCTS } from './data/products';

function MainStorefront() {
  const catalogRef = useRef<HTMLDivElement>(null);
  const { setActiveProductModal } = useCart();
  const { orders } = useAuth();

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (
      sectionId === 'parfaits' ||
      sectionId === 'tubs' ||
      sectionId === 'drinks' ||
      sectionId === 'granola' ||
      sectionId === 'pots'
    ) {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'cold-chain') {
      document.getElementById('cold-chain-promise')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'our-story') {
      document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'faqs') {
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenParfaitCup = () => {
    const parfait = PRODUCTS.find((p) => p.id === 'swn-parfait-cup') || PRODUCTS[0];
    setActiveProductModal(parfait);
  };

  return (
    <div className="min-h-screen bg-[#fcf3f5] text-[#2d2126] flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      <Navbar onNavigateSection={handleNavigateSection} />

      <main className="flex-1">
        <Hero
          onExploreClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
          onTastingClick={handleOpenParfaitCup}
        />

        <div ref={catalogRef}>
          <ProductCatalog />
        </div>

        <BrandStoryLanding
          onOrderNow={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
          onExploreMenu={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />

        <ColdChainGuarantee />

        {/* Customer Reviews in Enugu */}
        <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#881337]">
              Enugu Customer Reviews
            </span>
            <h3 className="font-serif text-3xl font-semibold text-[#33111b] [text-wrap:balance]">
              Loved by dessert lovers across Enugu
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 p-6 rounded-2xl border border-rose-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "The Parfait Cup with spoon arrived fresh and icy cold to our office in GRA Enugu. The taste is 100% genuine—thick, velvety, and delicious. Outstanding packaging!"
              </p>
              <div className="pt-2 border-t border-rose-100 text-xs">
                <span className="font-bold text-stone-900 block">Dr. Ngozi Eze</span>
                <span className="text-stone-500 text-[11px]">GRA, Enugu</span>
              </div>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-rose-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "I sent payment directly to Sweeney's OPay account (8102446805). Delivered to Independence Layout within 30 minutes with our receipt confirmed on WhatsApp."
              </p>
              <div className="pt-2 border-t border-rose-100 text-xs">
                <span className="font-bold text-stone-900 block">Chidiebere Okoye</span>
                <span className="text-stone-500 text-[11px]">Independence Layout, Enugu</span>
              </div>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-rose-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "The 500ml Greek Strained Yogurt Tub and the Crunchy Honey Granola bag are a match made in heaven. Top-tier handcrafted quality here in Enugu."
              </p>
              <div className="pt-2 border-t border-rose-100 text-xs">
                <span className="font-bold text-stone-900 block">Somtochukwu Nnamani</span>
                <span className="text-stone-500 text-[11px]">New Haven, Enugu</span>
              </div>
            </div>
          </div>
        </section>

        <FaqLanding />
      </main>

      <Footer onNavigateSection={handleNavigateSection} />

      {/* Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <AuthModal />
      <CustomerAccountView />
      <PaymentAccountSettingsModal />

      <MobileBottomNav onNavigateSection={handleNavigateSection} />
    </div>
  );
}

export default function App() {
  return (
    <PaymentAccountProvider>
      <AuthProvider>
        <CartProvider>
          <MainStorefront />
        </CartProvider>
      </AuthProvider>
    </PaymentAccountProvider>
  );
}

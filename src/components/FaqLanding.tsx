import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { usePaymentAccount } from '../context/PaymentAccountContext';

export const FaqLanding: React.FC = () => {
  const { account } = usePaymentAccount();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does payment work for orders in Enugu?',
      a: `Payments are made via direct bank transfer or mobile money to our official OPay account: ${account.accountNumber} (${account.accountName}). Once you place your order, you can complete the transfer and click "I Have Completed Transfer" to generate your order receipt and WhatsApp verification message.`,
    },
    {
      q: 'Where do you deliver in Enugu and how long does it take?',
      a: 'We deliver throughout Enugu including Independence Layout, GRA, New Haven, Trans-Ekulu, Ogui Road, Achara Layout, UNEC Campus, Coal City Garden, Golf Estate, and Thinkers Corner. Typical delivery time is 30 to 45 minutes from our Independence Layout kitchen in refrigerated insulated bags.',
    },
    {
      q: 'Who handles the delivery and how do I contact the courier?',
      a: 'Our dedicated courier is Chinenye Adaeze (08102446805). You can call the courier directly or track live dispatch progress through our online order tracker.',
    },
    {
      q: 'What makes Sweeney’s Greek yogurt different?',
      a: 'We use 100% whole cow milk and traditional 18-hour gravity straining. We never add powdered milk, cornstarch, artificial thickeners, or chemical preservatives. Every tub, parfait cup, and drinking yogurt bottle is rich in natural protein and active live probiotic cultures.',
    },
    {
      q: 'Are spoons included with the parfait cups?',
      a: 'Yes! Every Sweeney’s Parfait Cup (₦3,500) comes sealed with an individual spoon included, layered with real fruit puree and freshly baked crunchy honey granola.',
    },
  ];

  return (
    <section id="faq-section" className="py-14 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-2 mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#881337] uppercase">
          <span>Got Questions?</span>
          <span aria-hidden="true">·</span>
          <span>Help & Ordering Guide</span>
        </div>
        <h3 className="font-serif text-3xl font-semibold text-[#33111b] [text-wrap:balance]">
          Frequently Asked Questions
        </h3>
        <p className="text-xs text-stone-600">
          Everything you need to know about ordering fresh yogurt, bank payments, and chilled delivery in Enugu.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-rose-200/80 shadow-2xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/40 transition-colors"
              >
                <span className="text-sm font-semibold text-stone-900 font-serif">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#881337]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-rose-100/70">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Bar */}
      <div className="mt-8 p-4 bg-[#fdf5f6] border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <Phone className="w-4 h-4 text-[#881337] shrink-0" />
          <span>Have an inquiry or bulk event order? WhatsApp / Call us directly</span>
        </div>
        <a
          href="https://wa.me/2348102446805?text=Hello%20Sweeney's%20Dessert!%20I%20have%20an%20inquiry%20about%20your%20fresh%20Greek%20yogurt."
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp 0810 244 6805</span>
        </a>
      </div>
    </section>
  );
};

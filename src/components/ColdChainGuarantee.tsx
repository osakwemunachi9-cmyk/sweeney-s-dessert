import React from 'react';
import {
  ThermometerSnowflake,
  Milk,
  Building2,
  Copy,
  Check,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { ENUGU_AREAS } from '../data/products';
import { usePaymentAccount } from '../context/PaymentAccountContext';

export const ColdChainGuarantee: React.FC = () => {
  const { account, setIsAccountSettingsOpen } = usePaymentAccount();
  const [copied, setCopied] = React.useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="cold-chain-promise" className="py-14 md:py-20 bg-[#f9ecf0]/60 border-y border-rose-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#881337] uppercase">
            <span>The Sweeney Standard</span>
            <span aria-hidden="true">·</span>
            <span>Enugu Freshness Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#33111b] [text-wrap:balance]">
            From our Enugu kitchen to your doorstep, strictly chilled under 4°C.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Every batch of Sweeney’s dessert yogurt is prepared fresh daily in Independence Layout, Enugu. Never diluted with powdered milk, artificial thickeners, or preservatives.
          </p>
        </div>

        {/* 3 Pillar Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-7 border border-rose-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
              <Milk className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                18-Hour Strained Purity
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Traditional slow gravity straining extracts natural whey, delivering a dense, velvet custard texture packed with live active probiotics and natural calcium.
              </p>
            </div>
            <div className="pt-2 border-t border-rose-100 flex items-center gap-2 text-xs text-stone-500">
              <span className="font-mono font-bold text-stone-900">0%</span>
              <span>Cornstarch, gelatins, or additives</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-7 border border-rose-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Chilled Delivery in Enugu
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our insulated dispatch service delivers between 2°C and 4°C directly to residences and offices across GRA, New Haven, Independence Layout, and Trans-Ekulu.
              </p>
            </div>
            <div className="pt-2 border-t border-rose-100 flex items-center gap-2 text-xs text-stone-500">
              <span className="font-mono font-bold text-stone-900">&lt; 4°C</span>
              <span>Thermal guaranteed arrival</span>
            </div>
          </div>

          {/* Pillar 3: Official Receiving Bank Account */}
          <div className="bg-white rounded-2xl p-7 border-2 border-rose-300 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Receiving Bank Account
                </h3>
                <span className="text-[10px] bg-rose-100 text-[#881337] px-2 py-0.5 rounded font-mono font-bold">
                  Active
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                All customer orders and payments go directly into Sweeney's official account:
              </p>
            </div>

            <div className="p-3 bg-[#fcf5f6] border border-rose-200 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Bank:</span>
                <span className="font-bold text-stone-900">{account.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Acct No:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-[#881337] text-sm">
                    {account.accountNumber}
                  </span>
                  <button
                    onClick={handleCopyAccount}
                    className="p-1 hover:bg-rose-200 rounded text-stone-600 cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Name:</span>
                <span className="font-semibold text-stone-900">{account.accountName}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs">
              <a
                href={`https://wa.me/234${account.accountNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#5c1d2e] hover:underline font-semibold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: {account.mobileMoneyNumber}</span>
              </a>

              <button
                onClick={() => setIsAccountSettingsOpen(true)}
                className="text-[11px] text-stone-500 hover:text-stone-900 underline cursor-pointer"
              >
                Change Details
              </button>
            </div>
          </div>

        </div>

        {/* Enugu Delivery Coverage Areas */}
        <div className="bg-white rounded-2xl p-6 border border-rose-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#881337]" />
            <span>Enugu Same-Day Delivery Coverage</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-stone-700">
            {ENUGU_AREAS.map((area) => (
              <span key={area} className="px-3 py-1 bg-rose-50 border border-rose-200/70 rounded-lg">
                {area}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

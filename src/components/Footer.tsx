import React from 'react';
import { MapPin, Phone, MessageCircle, Building2, Copy, Check, Globe, Truck } from 'lucide-react';
import { usePaymentAccount } from '../context/PaymentAccountContext';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const { account, setIsAccountSettingsOpen } = usePaymentAccount();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#240e16] text-rose-100/90 pt-16 pb-20 md:pb-16 border-t border-rose-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-rose-900/60">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white block">
              SWEENEY'S DESSERT
            </span>
            <p className="text-xs text-rose-200 font-medium">
              Eat healthy, Drink healthy.
            </p>
            <p className="text-xs text-rose-200/80 leading-relaxed">
              Handcrafted Greek yogurt, fruit parfaits, and artisan crunchy granola. Prepared fresh daily in small batches in Enugu, Nigeria.
            </p>
            <div className="text-xs text-rose-300 font-mono">
              <span>Independence Layout</span> · <span>GRA Enugu</span> · <span>New Haven</span>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-rose-200/90 font-mono">
              <Globe className="w-3.5 h-3.5 text-rose-300 shrink-0" />
              <a 
                href="https://www.sweeneysdessert.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white underline decoration-rose-500/50 underline-offset-2 transition-colors"
              >
                www.sweeneysdessert.com
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Menu Categories
            </span>
            <ul className="space-y-2 text-xs text-rose-200/80">
              <li>
                <button
                  onClick={() => onNavigateSection('parfaits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Parfait Cup with Spoon (₦3,500)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('tubs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Greek Yogurt Tubs (₦9,500)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('drinks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pocket Drinking Yogurt (₦1,200)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('drinks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Drinking Yogurt Bottles (₦1,500)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('granola')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Crunchy Honey Granola (₦4,000)
                </button>
              </li>
              <li className="pt-2 border-t border-rose-900/40">
                <button
                  onClick={() => onNavigateSection('our-story')}
                  className="hover:text-white transition-colors cursor-pointer text-rose-300"
                >
                  Our Story & Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faqs')}
                  className="hover:text-white transition-colors cursor-pointer text-rose-300"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Enugu Kitchen Hub & Courier */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Enugu Kitchen & Logistics
            </span>
            <div className="space-y-2.5 text-xs text-rose-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-300 shrink-0 mt-0.5" />
                <span>Plot 12 Rangers Avenue, Independence Layout, Enugu</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-300 shrink-0 mt-0.5" />
                <span>Pickup Hub: Bisalla Road, GRA, Enugu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>Kitchen: +234 810 244 6805</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-rose-900/60 text-rose-200">
                <Truck className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>Courier: <strong>Chinenye Adaeze</strong> (<a href="tel:08102446805" className="underline hover:text-white">08102446805</a>)</span>
              </div>
            </div>
          </div>

          {/* Receiving Bank Account Info */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block">
              Official Receiving Account
            </span>
            
            <div className="p-3 bg-rose-950/80 rounded-xl border border-rose-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-rose-300">{account.bankName}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-rose-900 rounded text-rose-300 cursor-pointer flex items-center gap-1 text-[10px]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <span className="font-mono text-base font-bold text-white tracking-wider block">
                  {account.accountNumber}
                </span>
                <span className="text-[11px] text-rose-300/90 font-medium block">
                  {account.accountName}
                </span>
              </div>
            </div>

            <div className="pt-1 flex flex-col gap-2">
              <a
                href={`https://wa.me/234${account.accountNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-800/80 hover:bg-emerald-700 rounded-lg text-xs font-medium text-white transition-colors w-fit"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>WhatsApp: 0810 244 6805</span>
              </a>
              <span className="text-[11px] text-rose-300/80 font-mono">
                TikTok: @ssweeneysdesserts
              </span>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-300/70">
          <p>© {new Date().getFullYear()} SWEENEY'S DESSERT LTD. Official Website: www.sweeneysdessert.com · Account: {account.accountNumber}. Handcrafted in Enugu.</p>
          <div className="flex items-center gap-6">
            <span>Eat healthy, Drink healthy</span>
            <span>·</span>
            <span>Freshness Guaranteed at 4°C</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

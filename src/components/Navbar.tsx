import React, { useState } from 'react';
import { ShoppingBag, User as UserIcon, Menu, X, Building2, Check, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePaymentAccount } from '../context/PaymentAccountContext';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { currentUser, setIsAuthModalOpen, setIsAccountDrawerOpen, orders, setActiveTrackingOrder } = useAuth();
  const { account, setIsAccountSettingsOpen } = usePaymentAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedHeaderAcct, setCopiedHeaderAcct] = useState(false);

  const activeOrdersCount = orders.filter((o) => o.status === 'in_transit' || o.status === 'crafting').length;

  const handleCopyHeaderAcct = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(account.accountNumber);
    setCopiedHeaderAcct(true);
    setTimeout(() => setCopiedHeaderAcct(false), 2000);
  };

  return (
    <>
      {/* Top Announcement Ribbon with receiving account */}
      <div className="bg-[#5c1d2e] text-rose-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 flex-wrap">
        <span>Payment Account: <strong className="font-mono text-white tracking-wider underline">{account.accountNumber}</strong> ({account.accountName})</span>
        <span aria-hidden="true">·</span>
        <span>Cold-Chain Delivered in Enugu</span>
        <span aria-hidden="true">·</span>
        <span>Eat healthy, Drink healthy</span>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-[#fdf5f6]/95 backdrop-blur-md border-b border-rose-100/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element Brand Wordmark */}
          <button
            onClick={() => onNavigateSection('hero')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3b1220] group-hover:text-rose-900 transition-colors whitespace-nowrap shrink-0">
              SWEENEY'S DESSERT
            </span>
          </button>

          {/* Zone 2: Single-line clean text nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button
              onClick={() => onNavigateSection('parfaits')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Parfait Cups
            </button>
            <button
              onClick={() => onNavigateSection('tubs')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Strained Tubs
            </button>
            <button
              onClick={() => onNavigateSection('drinks')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Drinking Yogurt
            </button>
            <button
              onClick={() => onNavigateSection('granola')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Crunchy Granola
            </button>
            <button
              onClick={() => onNavigateSection('cold-chain')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Enugu Delivery
            </button>
            <button
              onClick={() => onNavigateSection('our-story')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => onNavigateSection('faqs')}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              FAQs
            </button>
            <button
              onClick={() => {
                if (orders.length > 0) {
                  setActiveTrackingOrder(orders[0]);
                } else {
                  setIsAccountDrawerOpen(true);
                }
              }}
              className="hover:text-[#5c1d2e] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Track Orders</span>
              {activeOrdersCount > 0 && (
                <span className="text-[11px] font-mono text-[#be185d] font-bold">
                  ({activeOrdersCount})
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action, Receiving Account Pill, & Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Receiving Account Copy Pill */}
            <button
              type="button"
              onClick={handleCopyHeaderAcct}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-rose-100/70 hover:bg-rose-200/80 text-[#5c1d2e] rounded-xl text-xs font-semibold border border-rose-200 transition-colors cursor-pointer"
              title={`Click to copy payment account number: ${account.accountNumber}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Acct: <strong className="font-mono tracking-wider">{account.accountNumber}</strong></span>
              {copiedHeaderAcct ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-rose-600" />
              )}
            </button>

            {/* Account trigger */}
            <button
              onClick={() => {
                if (currentUser) {
                  setIsAccountDrawerOpen(true);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-stone-700 hover:text-[#5c1d2e] rounded-full hover:bg-rose-100/50 transition-colors flex items-center gap-2 cursor-pointer text-xs font-medium"
              title={currentUser ? `Account: ${currentUser.name}` : 'Customer Sign In'}
            >
              <UserIcon className="w-5 h-5 text-stone-700" />
              <span className="hidden xl:inline text-stone-800 font-medium">
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#5c1d2e] rounded-lg hover:bg-[#431422] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-rose-200" />
              <span>Cart</span>
              <span className="bg-rose-200 text-[#5c1d2e] text-[11px] font-bold px-1.5 py-0.2 rounded font-mono tabular-nums">
                {totalItems}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-rose-100/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fff6f7] border-b border-rose-200 px-6 py-4 space-y-3">
            <div className="p-3 bg-white border border-rose-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-500 uppercase block">Payment Receiving Account</span>
                <span className="font-mono text-sm font-bold text-[#881337]">{account.accountNumber}</span>
                <span className="text-[11px] text-stone-600 block">{account.accountName}</span>
              </div>
              <button
                onClick={handleCopyHeaderAcct}
                className="px-2.5 py-1 bg-rose-100 text-[#5c1d2e] text-xs font-semibold rounded-lg"
              >
                {copiedHeaderAcct ? 'Copied' : 'Copy'}
              </button>
            </div>

            <button
              onClick={() => {
                onNavigateSection('parfaits');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Parfait Cups (₦2,000)
            </button>
            <button
              onClick={() => {
                onNavigateSection('tubs');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Greek Strained Tubs (₦1,700)
            </button>
            <button
              onClick={() => {
                onNavigateSection('drinks');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Drinking Yogurt Bottles
            </button>
            <button
              onClick={() => {
                onNavigateSection('granola');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Crunchy Granola Bags (₦4,000)
            </button>
            <button
              onClick={() => {
                onNavigateSection('cold-chain');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Enugu Cold-Chain Promise
            </button>
            <button
              onClick={() => {
                onNavigateSection('our-story');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Our Story & Kitchen
            </button>
            <button
              onClick={() => {
                onNavigateSection('faqs');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-stone-800 hover:text-[#5c1d2e]"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => {
                if (orders.length > 0) {
                  setActiveTrackingOrder(orders[0]);
                } else {
                  setIsAccountDrawerOpen(true);
                }
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-[#be185d]"
            >
              Track Order Status
            </button>
          </div>
        )}
      </header>
    </>
  );
};

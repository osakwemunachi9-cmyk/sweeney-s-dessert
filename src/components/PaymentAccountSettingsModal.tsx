import React, { useState } from 'react';
import { X, Building2, Check, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { usePaymentAccount } from '../context/PaymentAccountContext';

export const PaymentAccountSettingsModal: React.FC = () => {
  const { account, updateAccount, isAccountSettingsOpen, setIsAccountSettingsOpen, resetAccount } = usePaymentAccount();

  const [bankName, setBankName] = useState(account.bankName);
  const [accountNumber, setAccountNumber] = useState(account.accountNumber);
  const [accountName, setAccountName] = useState(account.accountName);
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState(account.mobileMoneyNumber);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAccountSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAccount({
      bankName: bankName.trim(),
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim(),
      mobileMoneyNumber: mobileMoneyNumber.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAccountSettingsOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-rose-100 bg-[#fdf5f6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 text-[#5c1d2e] rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Receiving Bank Account
              </h3>
              <span className="text-[11px] text-stone-500">
                Where customer payments enter
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAccountSettingsOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-rose-100/50 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Receiving account updated successfully!</span>
            </div>
          )}

          <p className="text-xs text-stone-600 leading-relaxed">
            Customers making local bank transfers or mobile money transfers will send payments directly to this account number.
          </p>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-800 block">
              Bank Name / Mobile Money Service
            </label>
            <input
              type="text"
              required
              placeholder="e.g. OPay, Moniepoint, Zenith Bank, GTBank"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-800 block">
              Account Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 8102446805"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full text-xs font-mono font-bold bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#881337]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-800 block">
              Beneficiary Account Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. SWEENEY'S DESSERTS"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-800 block">
              Mobile Money / WhatsApp Notification Number
            </label>
            <input
              type="text"
              placeholder="0810 244 6805"
              value={mobileMoneyNumber}
              onChange={(e) => setMobileMoneyNumber(e.target.value)}
              className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={resetAccount}
              className="text-xs font-medium text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Reset to Default
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Save Account
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

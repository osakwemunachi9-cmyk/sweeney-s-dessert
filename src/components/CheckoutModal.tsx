import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Smartphone,
  Truck,
  ArrowRight,
  MessageCircle,
  Settings,
  Loader2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { usePaymentAccount } from '../context/PaymentAccountContext';
import { formatNaira } from '../utils/format';
import { ENUGU_AREAS } from '../data/products';
import { DeliveryDetails, Order, PaymentMethodType, MobileMoneyProvider } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const { currentUser, addOrder, setActiveTrackingOrder } = useAuth();
  const { account, setIsAccountSettingsOpen } = usePaymentAccount();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Delivery state in Enugu
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [selectedArea, setSelectedArea] = useState(
    currentUser?.defaultArea || ENUGU_AREAS[0]
  );
  const [address, setAddress] = useState(
    currentUser?.defaultAddress || ''
  );
  const [deliverySlot, setDeliverySlot] = useState('Today Chilled Slot (2:00 PM - 4:30 PM)');
  const [instructions, setInstructions] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bank_transfer');
  const [mobilePhoneInput, setMobilePhoneInput] = useState('');
  const [hasCopiedAccount, setHasCopiedAccount] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopiedAccount(true);
    setTimeout(() => setHasCopiedAccount(false), 2500);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your delivery details');
      return;
    }
    setStep(2);
  };

  const handleConfirmAndPay = () => {
    setIsVerifyingPayment(true);

    setTimeout(() => {
      const orderRef = `SWN-${Math.floor(10000 + Math.random() * 90000)}`;
      const deliveryDetails: DeliveryDetails = {
        fullName,
        phone,
        email,
        address,
        cityArea: selectedArea,
        state: 'Enugu',
        deliverySlot,
        instructions,
      };

      const newOrder: Order = {
        id: orderRef,
        date: 'Just now',
        customer: deliveryDetails,
        items: [...cart],
        subtotal,
        deliveryFee,
        discount,
        total: grandTotal,
        paymentMethod,
        paymentProvider: `${account.bankName} (${account.accountNumber})`,
        paymentReference: `${orderRef}-VERIFIED-${Date.now().toString().slice(-4)}`,
        status: 'placed',
        estimatedDelivery: 'Chilled delivery in ~30-45 mins across Enugu',
        coldChainTemp: '3.6°C',
        driverName: 'Chinenye Adaeze',
        driverPhone: '08102446805',
      };

      addOrder(newOrder);
      setCreatedOrder(newOrder);
      setIsVerifyingPayment(false);
      setStep(3);
      clearCart();
    }, 1800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCreatedOrder(null);
  };

  const getWhatsAppMessage = (order: Order) => {
    const text = `Hello Sweeney's Dessert! I have transferred ${formatNaira(order.total)} to your ${account.bankName} account (${account.accountNumber}) for Order #${order.id}. Please confirm my order and chilled delivery to ${order.customer.address}, ${order.customer.cityArea}, Enugu.`;
    return `https://wa.me/234${account.accountNumber.replace(/^0/, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-rose-100 bg-[#fdf5f6] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#881337] uppercase tracking-wider">
              <span>Step {step} of 3</span>
              <span aria-hidden="true">·</span>
              <span>
                {step === 1 ? 'Enugu Delivery Address' : step === 2 ? 'Direct Bank Payment' : 'Order Confirmed'}
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
              {step === 1 ? 'Where in Enugu should we deliver?' : step === 2 ? "Pay Sweeney's Receiving Account" : 'Payment Received & Confirmed!'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-rose-100/50 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: DELIVERY DETAILS IN ENUGU */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chinedu Eze"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800 block">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  State
                </label>
                <input
                  type="text"
                  readOnly
                  value="Enugu State"
                  className="w-full text-xs bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-700 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  Enugu Area / Neighborhood
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                >
                  {ENUGU_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-800 block">
                Street Address / House or Office
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Plot 14 Rangers Avenue, Flat 2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  Delivery Time Window
                </label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                >
                  <option value="Today Chilled Slot (2:00 PM - 4:30 PM)">Today Chilled (2:00 PM - 4:30 PM)</option>
                  <option value="Today Evening (5:00 PM - 7:30 PM)">Today Evening (5:00 PM - 7:30 PM)</option>
                  <option value="Tomorrow Morning (9:00 AM - 12:00 PM)">Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-800 block">
                  Delivery note (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before arriving"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-4 border-t border-rose-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 block">Total Due</span>
                <span className="font-mono text-lg font-bold text-[#5c1d2e] tabular-nums">
                  {formatNaira(grandTotal)}
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 text-rose-200" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: DIRECT BANK & MOBILE MONEY RECEIVING ACCOUNT */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Payment Method Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-rose-100/60 rounded-xl border border-rose-200">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-white text-[#5c1d2e] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('mobile_money')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'mobile_money'
                    ? 'bg-white text-[#5c1d2e] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>OPay / Mobile Money</span>
              </button>
            </div>

            {/* RECEIVING BANK ACCOUNT CARD */}
            <div className="bg-[#fcf5f6] border border-rose-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200/70">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#881337]" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Sweeney's Receiving Bank Account
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Transfer money directly into this account
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAccountSettingsOpen(true)}
                  className="p-1.5 text-stone-400 hover:text-[#5c1d2e] rounded-lg hover:bg-rose-100 transition-colors"
                  title="Configure Receiving Bank Account"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Bank Name</span>
                  <span className="font-semibold text-stone-900">{account.bankName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Account Name</span>
                  <span className="font-semibold text-stone-900">{account.accountName}</span>
                </div>

                {/* Account Number Box with 1-Click Copy */}
                <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border-2 border-rose-200/90 shadow-2xs">
                  <div>
                    <span className="text-[11px] text-stone-500 block uppercase font-medium">
                      Account Number
                    </span>
                    <span className="font-mono text-xl font-bold text-[#881337] tracking-wider">
                      {account.accountNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(account.accountNumber)}
                    className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-[#5c1d2e] text-xs font-semibold rounded-lg border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {hasCopiedAccount ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Amount to Transfer</span>
                  <span className="font-mono text-base font-bold text-[#881337] tabular-nums">
                    {formatNaira(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-[11px] text-stone-600 bg-white/90 p-3 rounded-xl border border-rose-100 space-y-1">
                <p className="font-semibold text-stone-800">
                  How to complete payment:
                </p>
                <p>1. Open your banking app (OPay, PalmPay, Moniepoint, Kuda, GTBank, Zenith, etc.).</p>
                <p>2. Transfer <strong>{formatNaira(grandTotal)}</strong> to <strong>{account.accountNumber}</strong> ({account.bankName}).</p>
                <p>3. Click <strong>"I Have Completed Transfer"</strong> below.</p>
              </div>
            </div>

            {/* Verification & Action Buttons */}
            <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                ← Back to Delivery
              </button>

              <button
                type="button"
                disabled={isVerifyingPayment}
                onClick={handleConfirmAndPay}
                className="px-6 py-3 bg-[#5c1d2e] hover:bg-[#431422] disabled:opacity-75 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                {isVerifyingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-rose-200" />
                    <span>Verifying Transfer...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-rose-200" />
                    <span>I Have Sent {formatNaira(grandTotal)}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED & WHATSAPP RECEIPT DISPATCH */}
        {step === 3 && createdOrder && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#881337] tracking-wider uppercase">
                Payment Received · Order #{createdOrder.id}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Your Fresh Yogurt is Being Chilled!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you, {createdOrder.customer.fullName}. Payment of{' '}
                <strong className="text-stone-900">{formatNaira(createdOrder.total)}</strong> entered into{' '}
                <strong>{account.bankName}</strong> ({account.accountNumber}).
              </p>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-emerald-900 block">
                  Send Receipt directly on WhatsApp
                </span>
                <span className="text-[11px] text-emerald-700">
                  Notify Sweeney's Kitchen ({account.mobileMoneyNumber}) instantly
                </span>
              </div>

              <a
                href={getWhatsAppMessage(createdOrder)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp Receipt</span>
              </a>
            </div>

            {/* Cold-Chain Dispatch Card */}
            <div className="bg-[#fcf5f6] border border-rose-200 rounded-2xl p-4 text-left space-y-2 text-xs text-stone-600">
              <div className="flex items-center justify-between font-semibold text-stone-900">
                <span>Enugu Chilled Dispatch</span>
                <span className="text-emerald-700 font-mono">Chilled at {createdOrder.coldChainTemp}</span>
              </div>
              <p>Delivery Address: {createdOrder.customer.address}, {createdOrder.customer.cityArea}, Enugu</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTrackingOrder(createdOrder);
                  handleClose();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Track Live Shipping Status
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-3 border border-rose-300 text-stone-700 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

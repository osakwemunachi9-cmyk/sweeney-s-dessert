import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../utils/format';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    discount,
    discountCode,
    applyPromoCode,
    removePromoCode,
    grandTotal,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const freeDeliveryShortfall = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fff7f8] shadow-2xl flex flex-col border-l border-rose-200">
          
          {/* Header */}
          <div className="p-6 border-b border-rose-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-[#5c1d2e] rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Your Fresh Cart</h3>
                <span className="text-xs text-stone-500 font-mono">
                  {cart.length} item{cart.length === 1 ? '' : 's'} selected
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-rose-50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-[#fcedf0] px-6 py-3 border-b border-rose-200/70">
            {freeDeliveryShortfall > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-[#881337]">
                  <span>Add {formatNaira(freeDeliveryShortfall)} for Free Chilled Delivery</span>
                  <span className="font-mono">{Math.round(freeDeliveryProgress)}%</span>
                </div>
                <div className="w-full bg-rose-200/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#881337] h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You’ve unlocked Free Chilled Cold-Chain Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-rose-100/60 flex items-center justify-center text-[#881337]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900">Your cart is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover our freshly strained Jos plateau Greek yogurts and handcrafted dessert chalices.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-[#5c1d2e] text-white text-xs font-semibold rounded-xl hover:bg-[#431422] transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                let extra = 0;
                if (item.selectedTopping.includes('+₦500')) extra = 500;
                else if (item.selectedTopping.includes('+₦600')) extra = 600;
                else if (item.selectedTopping.includes('+₦400')) extra = 400;
                else if (item.selectedTopping.includes('+₦300')) extra = 300;
                const unitPrice = item.product.price + extra;

                return (
                  <div
                    key={item.cartItemId}
                    className="bg-white p-4 rounded-2xl border border-rose-200/80 shadow-xs flex gap-3.5"
                  >
                    {/* Thumbnail */}
                    <div className="w-18 h-18 rounded-xl bg-rose-50 overflow-hidden shrink-0 border border-rose-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-stone-400 hover:text-rose-700 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#881337] truncate">
                          Topping: {item.selectedTopping.split(' (')[0]}
                        </p>
                        {item.notes && (
                          <p className="text-[11px] text-stone-600 italic truncate">
                            Note: "{item.notes}"
                          </p>
                        )}
                      </div>

                      {/* Stepper & Price */}
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center border border-rose-200 rounded-lg overflow-hidden bg-rose-50/50">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono font-bold text-stone-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                          {formatNaira(unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-rose-200 bg-white space-y-4">
              
              {/* Promo Code Strip */}
              <div className="space-y-1.5">
                {discountCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{discountCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-emerald-900 text-[11px] font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (SWEETFIRST)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs uppercase bg-[#fcf5f6] border border-rose-200 rounded-lg px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#881337]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-rose-100 hover:bg-rose-200 text-[#5c1d2e] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && !discountCode && (
                  <p className="text-[11px] text-rose-600">{promoFeedback.message}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-rose-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">{formatNaira(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">- {formatNaira(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold-Chain Delivery</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-rose-100">
                  <span>Total Amount (NGN)</span>
                  <span className="font-mono text-base text-[#5c1d2e] tabular-nums">
                    {formatNaira(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#5c1d2e] hover:bg-[#431422] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-rose-200" />
              </button>

              <p className="text-[11px] text-center text-stone-600">
                Accepting Local Nigerian Bank Transfer & Mobile Money (OPay, PalmPay, Moniepoint)
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

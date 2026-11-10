import React from 'react';
import {
  X,
  MapPin,
  Phone,
  Award,
  ChevronRight,
  LogOut,
  Truck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatNaira } from '../utils/format';
import { Order } from '../types';

export const CustomerAccountView: React.FC = () => {
  const {
    currentUser,
    orders,
    logout,
    isAccountDrawerOpen,
    setIsAccountDrawerOpen,
    setActiveTrackingOrder,
    setIsAuthModalOpen,
  } = useAuth();

  if (!isAccountDrawerOpen) return null;

  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          currentUser.savedOrders.includes(o.id) ||
          o.customer.email.toLowerCase() === currentUser.email.toLowerCase()
      )
    : orders;

  const handleTrackOrder = (order: Order) => {
    setActiveTrackingOrder(order);
    setIsAccountDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAccountDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fff7f8] shadow-2xl flex flex-col border-l border-rose-200">
          
          {/* Header */}
          <div className="p-6 border-b border-rose-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-[#5c1d2e] flex items-center justify-center font-serif font-bold text-base">
                {currentUser ? currentUser.name.charAt(0) : 'G'}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {currentUser ? currentUser.name : 'Guest Customer'}
                </h3>
                <span className="text-xs text-stone-500">
                  {currentUser ? currentUser.email : 'Not signed in'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAccountDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-rose-50 transition-colors"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Loyalty points banner */}
            {currentUser ? (
              <div className="bg-gradient-to-br from-rose-900 to-[#5c1d2e] text-rose-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-200">
                    Sweeney's Dessert Club
                  </span>
                  <Award className="w-4 h-4 text-rose-300" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-white tabular-nums">
                    {currentUser.dessertPoints}
                  </span>
                  <span className="text-xs text-rose-200">Dessert Points</span>
                </div>
                <p className="text-[11px] text-rose-200/90 leading-tight">
                  Earn points on every order in Enugu. Redeem for free yogurt jars and toppings.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-rose-200 rounded-2xl p-5 text-center space-y-3">
                <p className="text-xs text-stone-600">
                  Sign in or create an account to view your past orders, delivery receipts, and live shipments in Enugu.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountDrawerOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#5c1d2e] text-white text-xs font-semibold rounded-xl"
                >
                  Sign In / Register
                </button>
              </div>
            )}

            {/* Default Delivery Address Card */}
            {currentUser && (
              <div className="bg-white border border-rose-200/80 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Saved Delivery Address
                  </span>
                  <span className="text-[11px] font-semibold text-[#881337]">
                    Enugu State
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                    <span>{currentUser.defaultAddress}, {currentUser.defaultArea}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{currentUser.phone}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Order History Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Order History & Shipments
                </h4>
                <span className="text-xs text-stone-500 font-mono">
                  {userOrders.length} order{userOrders.length === 1 ? '' : 's'}
                </span>
              </div>

              {userOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center text-xs text-stone-500 border border-rose-200">
                  No orders placed yet. Choose your favorite artisanal pot from our menu!
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white border border-rose-200 rounded-2xl p-4 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="font-mono text-xs font-bold text-stone-900">
                            #{ord.id}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            {ord.date}
                          </span>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block ${
                              ord.status === 'in_transit'
                                ? 'bg-rose-100 text-[#881337]'
                                : ord.status === 'crafting'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {ord.status === 'in_transit'
                              ? 'Courier In Transit'
                              : ord.status === 'crafting'
                              ? 'Crafting & Chilling'
                              : 'Delivered'}
                          </span>
                          <span className="text-[10px] text-stone-500 block mt-0.5 font-mono">
                            Chilled: {ord.coldChainTemp}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-stone-600 line-clamp-1 border-t border-rose-100/70 pt-2">
                        {ord.items.map((it) => `${it.quantity}× ${it.product.name}`).join(', ')}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                          {formatNaira(ord.total)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleTrackOrder(ord)}
                          className="px-3 py-1.5 bg-[#fcf5f6] hover:bg-rose-100 text-[#5c1d2e] text-xs font-semibold rounded-lg border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Shipment</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {currentUser && (
            <div className="p-4 border-t border-rose-200 bg-white">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsAccountDrawerOpen(false);
                }}
                className="w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

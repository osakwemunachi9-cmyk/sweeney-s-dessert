import React, { useState } from 'react';
import {
  X,
  Truck,
  CheckCircle2,
  ThermometerSnowflake,
  MapPin,
  Phone,
  FileText,
  Search,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatNaira } from '../utils/format';
import { OrderStatus } from '../types';

export const OrderTrackerModal: React.FC = () => {
  const {
    activeTrackingOrder,
    setActiveTrackingOrder,
    getOrderById,
  } = useAuth();

  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');

  if (!activeTrackingOrder) return null;

  const currentOrder = activeTrackingOrder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = getOrderById(searchId.trim());
    if (found) {
      setActiveTrackingOrder(found);
      setSearchError('');
    } else {
      setSearchError(`Order #${searchId} not found. Please check your order reference.`);
    }
  };

  const steps: { status: OrderStatus; title: string; desc: string }[] = [
    {
      status: 'placed',
      title: 'Order Confirmed',
      desc: 'Payment received & verified via ' + currentOrder.paymentProvider,
    },
    {
      status: 'crafting',
      title: 'Crafting & Chilling',
      desc: 'Fresh whole milk slow-strained and sealed in cold dessert jars at our Enugu kitchen',
    },
    {
      status: 'in_transit',
      title: 'Out for Chilled Delivery in Enugu',
      desc: `In transit via refrigerated thermal courier · Chilled at ${currentOrder.coldChainTemp}`,
    },
    {
      status: 'delivered',
      title: 'Delivered',
      desc: 'Handed over fresh in insulated cold bag',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'crafting':
        return 1;
      case 'in_transit':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const currentIdx = getStepIndex(currentOrder.status);

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-rose-100 bg-[#fdf5f6] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#881337] uppercase tracking-wider">
              <span>Live Cold-Chain Dispatch Tracker</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{currentOrder.id}</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
              Order #{currentOrder.id}
            </h3>
          </div>
          <button
            onClick={() => setActiveTrackingOrder(null)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-rose-100/50 transition-colors"
            aria-label="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Quick Lookup Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order Reference (e.g. SWN-84920)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#881337]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-rose-100 hover:bg-rose-200 text-[#5c1d2e] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>
          {searchError && (
            <p className="text-[11px] text-rose-600 -mt-3">{searchError}</p>
          )}

          {/* Cold-Chain Health Meter */}
          <div className="bg-gradient-to-r from-rose-50 to-[#fff2f4] border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#881337] border border-rose-200 flex items-center justify-center shrink-0">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                  Cold-Chain Guarantee
                </span>
                <span className="text-sm font-bold text-stone-900">
                  Guaranteed Chilled Under 4°C in Enugu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/90 px-3.5 py-2 rounded-xl border border-rose-100 shadow-xs">
              <div className="text-right">
                <span className="text-[10px] text-stone-500 block uppercase">Transit Temp</span>
                <span className="font-mono text-xs font-bold text-[#be185d]">
                  {currentOrder.coldChainTemp}
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-800">
                Fresh & Active
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 pt-2">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
              Shipping Timeline
            </span>

            <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
              {steps.map((st, idx) => {
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={st.status} className="relative space-y-0.5">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                        isCurrent
                          ? 'bg-[#5c1d2e] border-white text-white shadow-xs'
                          : isCompleted
                          ? 'bg-rose-200 border-rose-300 text-[#5c1d2e]'
                          : 'bg-white border-stone-300 text-stone-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-[#881337]' : isCompleted ? 'text-stone-900' : 'text-stone-600'
                        }`}
                      >
                        {st.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[11px] font-mono text-[#be185d] font-bold">
                          Active Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Details */}
          {currentOrder.driverName && (
            <div className="bg-[#fcf5f6] border border-rose-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#5c1d2e] font-bold text-xs">
                  {currentOrder.driverName.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    {currentOrder.driverName}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Sweeney's Enugu Courier
                  </span>
                </div>
              </div>
              <a
                href={`tel:${currentOrder.driverPhone}`}
                className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-semibold text-[#5c1d2e] hover:bg-rose-50 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Courier</span>
              </a>
            </div>
          )}

          {/* Delivery Location & Order Details */}
          <div className="border border-rose-200/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <MapPin className="w-4 h-4 text-[#881337]" />
                <span>Enugu Destination</span>
              </div>
              <span className="text-xs text-stone-500">
                {currentOrder.customer.deliverySlot}
              </span>
            </div>

            <div className="text-xs text-stone-700 space-y-1">
              <p className="font-semibold text-stone-900">{currentOrder.customer.fullName}</p>
              <p>{currentOrder.customer.address}, {currentOrder.customer.cityArea}</p>
              <p>Enugu State, Nigeria</p>
              {currentOrder.customer.instructions && (
                <p className="text-stone-500 italic mt-1">Note: "{currentOrder.customer.instructions}"</p>
              )}
            </div>

            {/* Itemized List */}
            <div className="pt-3 border-t border-rose-100 space-y-2">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Dessert Items
              </span>
              {currentOrder.items.map((it) => (
                <div key={it.cartItemId} className="flex justify-between text-xs">
                  <span className="text-stone-800">
                    {it.quantity}× {it.product.name} ({it.selectedTopping.split(' (')[0]})
                  </span>
                  <span className="font-mono text-stone-900 font-semibold tabular-nums">
                    {formatNaira(it.product.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Paid in ₦ */}
            <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 block">Total Paid ({currentOrder.paymentProvider})</span>
                <span className="font-mono text-xs text-stone-600">Ref: {currentOrder.paymentReference}</span>
              </div>
              <span className="font-mono text-base font-bold text-[#5c1d2e] tabular-nums">
                {formatNaira(currentOrder.total)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrintReceipt}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Print Order Receipt</span>
            </button>

            <button
              onClick={() => setActiveTrackingOrder(null)}
              className="px-5 py-2.5 bg-[#5c1d2e] hover:bg-[#431422] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

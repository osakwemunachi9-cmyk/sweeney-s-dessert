import React from 'react';
import { ShoppingBag, Sparkles, User, Truck, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatNaira } from '../utils/format';

interface MobileBottomNavProps {
  onNavigateSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigateSection }) => {
  const { totalItems, grandTotal, setIsCartOpen } = useCart();
  const { currentUser, setIsAuthModalOpen, setIsAccountDrawerOpen, orders, setActiveTrackingOrder } = useAuth();

  const activeOrdersCount = orders.filter((o) => o.status === 'in_transit' || o.status === 'crafting').length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/90 h-14 flex items-center justify-around px-2 shadow-lg">
      
      {/* Menu Link */}
      <button
        onClick={() => onNavigateSection('parfaits')}
        className="flex flex-col items-center justify-center text-stone-600 hover:text-[#5c1d2e] py-1 px-2 cursor-pointer"
      >
        <Utensils className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">Menu</span>
      </button>

      {/* Granola */}
      <button
        onClick={() => onNavigateSection('granola')}
        className="flex flex-col items-center justify-center text-stone-600 hover:text-[#5c1d2e] py-1 px-2 cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span className="text-[10px] font-medium mt-0.5">Granola</span>
      </button>

      {/* Track Orders */}
      <button
        onClick={() => {
          if (orders.length > 0) {
            setActiveTrackingOrder(orders[0]);
          } else {
            setIsAccountDrawerOpen(true);
          }
        }}
        className="flex flex-col items-center justify-center text-stone-600 hover:text-[#5c1d2e] py-1 px-2 relative cursor-pointer"
      >
        <Truck className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">Track</span>
        {activeOrdersCount > 0 && (
          <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-[#be185d]" />
        )}
      </button>

      {/* Account */}
      <button
        onClick={() => {
          if (currentUser) {
            setIsAccountDrawerOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        className="flex flex-col items-center justify-center text-stone-600 hover:text-[#5c1d2e] py-1 px-2 cursor-pointer"
      >
        <User className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">
          {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
        </span>
      </button>

      {/* Cart Quick Trigger */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-1.5 bg-[#5c1d2e] text-white py-1.5 px-3 rounded-xl cursor-pointer shadow-xs active:scale-95 transition-transform"
      >
        <ShoppingBag className="w-3.5 h-3.5 text-rose-200" />
        <div className="text-left">
          <span className="text-[10px] block font-bold font-mono leading-none">
            {totalItems} · {formatNaira(grandTotal)}
          </span>
        </div>
      </button>

    </nav>
  );
};

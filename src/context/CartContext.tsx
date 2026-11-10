import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedTopping?: string, sweetnessLevel?: 'Low' | 'Medium' | 'Rich', notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  discount: number;
  discountCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (prod: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sweeneys_cart_enugu_v2';
const PROMO_STORAGE_KEY = 'sweeneys_promo_enugu_v2';
const FREE_DELIVERY_THRESHOLD = 6000;
const STANDARD_DELIVERY_FEE = 600;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, discountCode);
    } catch {
      // ignore
    }
  }, [discountCode]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedTopping = 'Toasted Almond & Oat Granola (+₦0)',
    sweetnessLevel: 'Low' | 'Medium' | 'Rich' = 'Medium',
    notes = ''
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedTopping === selectedTopping &&
          item.sweetnessLevel === sweetnessLevel &&
          item.notes === notes
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }

      const newItem: CartItem = {
        cartItemId: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        product,
        quantity,
        selectedTopping,
        sweetnessLevel,
        notes,
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    let extra = 0;
    if (item.selectedTopping.includes('+₦200')) extra = 200;
    else if (item.selectedTopping.includes('+₦150')) extra = 150;
    else if (item.selectedTopping.includes('+₦100')) extra = 100;
    return sum + (item.product.price + extra) * item.quantity;
  }, 0);

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;

  let discount = 0;
  if (discountCode.toUpperCase() === 'SWEENEYS' && subtotal > 0) {
    discount = Math.round(subtotal * 0.1); // 10% off
  } else if (discountCode.toUpperCase() === 'ENUGU' && subtotal >= 3000) {
    discount = 500;
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SWEENEYS') {
      setDiscountCode('SWEENEYS');
      return { success: true, message: 'Promo applied: 10% discount!' };
    }
    if (clean === 'ENUGU') {
      setDiscountCode('ENUGU');
      return { success: true, message: 'Promo applied: ₦500 off orders over ₦3,000!' };
    }
    return { success: false, message: 'Invalid promo code. Try SWEENEYS' };
  };

  const removePromoCode = () => {
    setDiscountCode('');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        discount,
        discountCode,
        applyPromoCode,
        removePromoCode,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductModal,
        setActiveProductModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

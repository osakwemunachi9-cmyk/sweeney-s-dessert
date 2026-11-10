export interface Product {
  id: string;
  name: string;
  category: 'parfaits' | 'tubs' | 'drinks' | 'pots' | 'granola';
  categoryLabel: string;
  description: string;
  detailedDescription: string;
  price: number; // in NGN (₦) - strictly <= 2000
  volume: string;
  image: string;
  ingredients: string[];
  dietary: string[];
  tasteNotes: string[];
  isRealPhoto?: boolean;
  isSignature?: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedTopping: string;
  sweetnessLevel: 'Low' | 'Medium' | 'Rich';
  notes?: string;
}

export type PaymentMethodType = 'bank_transfer' | 'mobile_money' | 'card';

export type MobileMoneyProvider = 'opay' | 'palmpay' | 'moniepoint' | 'kuda';

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  cityArea: string;
  state: 'Enugu';
  deliverySlot: string;
  instructions?: string;
}

export type OrderStatus = 'placed' | 'crafting' | 'in_transit' | 'delivered';

export interface OrderTrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  customer: DeliveryDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethodType;
  paymentProvider?: string;
  paymentReference: string;
  status: OrderStatus;
  estimatedDelivery: string;
  coldChainTemp: string;
  driverName?: string;
  driverPhone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  defaultAddress: string;
  defaultArea: string;
  defaultState: 'Enugu';
  savedOrders: string[];
  dessertPoints: number;
}

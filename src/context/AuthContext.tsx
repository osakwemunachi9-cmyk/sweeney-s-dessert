import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  orders: Order[];
  login: (email: string, password?: string) => { success: boolean; message: string };
  register: (name: string, email: string, phone: string, address: string, area: string, state: 'Enugu', password?: string) => { success: boolean; message: string };
  logout: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAccountDrawerOpen: boolean;
  setIsAccountDrawerOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'sweeneys_user_enugu_v2';
const REGISTERED_USERS_KEY = 'sweeneys_registered_db_v2';
const ORDERS_STORAGE_KEY = 'sweeneys_orders_enugu_v2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const login = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    try {
      const usersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredUsers: User[] = usersRaw ? JSON.parse(usersRaw) : [];
      const found = registeredUsers.find((u) => u.email === cleanEmail);

      if (found) {
        setCurrentUser(found);
        return { success: true, message: `Welcome back, ${found.name}!` };
      }
    } catch {
      // fallback
    }

    // If first-time login without prior registration, create clean profile
    const namePart = cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: formattedName,
      email: cleanEmail,
      phone: '0803 000 0000',
      defaultAddress: 'Independence Layout',
      defaultArea: 'Independence Layout',
      defaultState: 'Enugu',
      savedOrders: [],
      dessertPoints: 50,
    };

    setCurrentUser(newUser);

    try {
      const usersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredUsers: User[] = usersRaw ? JSON.parse(usersRaw) : [];
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...registeredUsers, newUser]));
    } catch {
      // ignore
    }

    return { success: true, message: `Welcome to Sweeney's Dessert, ${formattedName}!` };
  };

  const register = (
    name: string,
    email: string,
    phone: string,
    address: string,
    area: string,
    state: 'Enugu'
  ) => {
    if (!name.trim() || !email.trim()) {
      return { success: false, message: 'Name and email are required' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim() || '0803 000 0000',
      defaultAddress: address.trim() || 'Independence Layout',
      defaultArea: area || 'Independence Layout',
      defaultState: 'Enugu',
      savedOrders: [],
      dessertPoints: 100,
    };

    setCurrentUser(newUser);

    try {
      const usersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredUsers: User[] = usersRaw ? JSON.parse(usersRaw) : [];
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...registeredUsers, newUser]));
    } catch {
      // ignore
    }

    return { success: true, message: 'Account successfully registered!' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    if (currentUser) {
      const updated = {
        ...currentUser,
        savedOrders: [order.id, ...currentUser.savedOrders],
        dessertPoints: currentUser.dessertPoints + Math.floor(order.total / 100),
      };
      setCurrentUser(updated);

      try {
        const usersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
        if (usersRaw) {
          const registeredUsers: User[] = JSON.parse(usersRaw);
          const next = registeredUsers.map((u) => (u.id === updated.id ? updated : u));
          localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(next));
        }
      } catch {
        // ignore
      }
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (ord) => ord.id.toLowerCase() === orderId.trim().toLowerCase()
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        orders,
        login,
        register,
        logout,
        addOrder,
        updateOrderStatus,
        getOrderById,
        activeTrackingOrder,
        setActiveTrackingOrder,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAccountDrawerOpen,
        setIsAccountDrawerOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

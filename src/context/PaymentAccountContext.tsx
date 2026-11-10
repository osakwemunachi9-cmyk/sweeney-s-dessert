import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusinessAccount, DEFAULT_BUSINESS_ACCOUNT } from '../data/products';

interface PaymentAccountContextType {
  account: BusinessAccount;
  updateAccount: (updated: Partial<BusinessAccount>) => void;
  resetAccount: () => void;
  isAccountSettingsOpen: boolean;
  setIsAccountSettingsOpen: (open: boolean) => void;
}

const PaymentAccountContext = createContext<PaymentAccountContextType | undefined>(undefined);

const ACCOUNT_STORAGE_KEY = 'sweeneys_business_account_8102446805_v5';
const OLD_ACCOUNT_KEY = 'sweeneys_business_account_8092271100_v3';

export const PaymentAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<BusinessAccount>(() => {
    try {
      localStorage.removeItem(OLD_ACCOUNT_KEY);
      const stored = localStorage.getItem(ACCOUNT_STORAGE_KEY);
      return stored ? { ...DEFAULT_BUSINESS_ACCOUNT, ...JSON.parse(stored) } : DEFAULT_BUSINESS_ACCOUNT;
    } catch {
      return DEFAULT_BUSINESS_ACCOUNT;
    }
  });

  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
    } catch {
      // ignore
    }
  }, [account]);

  const updateAccount = (updated: Partial<BusinessAccount>) => {
    setAccount((prev) => ({ ...prev, ...updated }));
  };

  const resetAccount = () => {
    setAccount(DEFAULT_BUSINESS_ACCOUNT);
  };

  return (
    <PaymentAccountContext.Provider
      value={{
        account,
        updateAccount,
        resetAccount,
        isAccountSettingsOpen,
        setIsAccountSettingsOpen,
      }}
    >
      {children}
    </PaymentAccountContext.Provider>
  );
};

export const usePaymentAccount = () => {
  const context = useContext(PaymentAccountContext);
  if (!context) throw new Error('usePaymentAccount must be used within PaymentAccountProvider');
  return context;
};

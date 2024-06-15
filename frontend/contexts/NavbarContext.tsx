// context/NavbarContext.tsx
"use client";
import React, { createContext, useContext, useState } from 'react';

interface Wallet {
  connected: boolean;
}

export interface NavbarContextType {
  walletSituation: Wallet;
  setWalletSituation: (data: Wallet) => void;
}

interface NavbarProviderProps {
  children: React.ReactNode;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbarContext must be used within a NavbarProvider');
  }
  return context;
};

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [walletSituation, setWalletSituation] = useState<Wallet>({
    connected: false,
  });

  return (
    <NavbarContext.Provider value={{ walletSituation, setWalletSituation }}>
      {children}
    </NavbarContext.Provider>
  );
};

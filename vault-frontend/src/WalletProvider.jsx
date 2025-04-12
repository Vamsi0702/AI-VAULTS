import React from 'react';
import {
  AptosWalletAdapterProvider,
  WalletProvider,
} from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-wallet-adapter';

const wallets = [new PetraWallet()];

export const WalletContextProvider = ({ children }) => {
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <WalletProvider>{children}</WalletProvider>
    </AptosWalletAdapterProvider>
  );
};

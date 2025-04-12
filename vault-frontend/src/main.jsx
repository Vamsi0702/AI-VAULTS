import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 🦊 Aptos Wallets
import { WalletProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from '@aptos-labs/wallet-adapter-petra';

// Set up the Petra Wallet
const wallets = [new PetraWallet()];

ReactDOM.createRoot(document.getElementById('root')).render(
  <WalletProvider wallets={wallets} autoConnect={true}>
    <App />
  </WalletProvider>
);

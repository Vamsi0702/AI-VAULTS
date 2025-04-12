import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd';

function App() {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleDeposit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/deposit', {
        amount: amount,
      });
      setTransactionStatus(`Deposit successful! Transaction Hash: ${res.data.transaction_hash}`);
    } catch (err) {
      setTransactionStatus('Error with deposit');
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await axios.post('http://localhost:5000/withdraw', {
        amount: amount,
      });
      setTransactionStatus(`Withdraw successful! Transaction Hash: ${res.data.transaction_hash}`);
    } catch (err) {
      setTransactionStatus('Error with withdraw');
    }
  };

  const handleAllocate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/allocate', {
        vault_balance: balance,
      });
      setAllocation(res.data.allocation);
    } catch (err) {
      setTransactionStatus('Error with allocation');
    }
  };

  useEffect(() => {
    // Fetch balance logic if needed
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">🚀 AI Vault</h1>
      <div className="space-y-4">
        <Input
          placeholder="Enter amount to deposit/withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <Button type="primary" onClick={handleDeposit}>
          Deposit
        </Button>
        <Button danger onClick={handleWithdraw}>
          Withdraw
        </Button>
        
        <Button onClick={handleAllocate}>Get AI Allocation</Button>

        {transactionStatus && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="font-semibold text-lg">Transaction Status:</h2>
            <p>{transactionStatus}</p>
          </div>
        )}

        {allocation && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="font-semibold text-lg">AI Asset Allocation:</h2>
            <ul>
              {Object.keys(allocation).map((asset) => (
                <li key={asset}>{asset}: {allocation[asset].toFixed(2)} (APY: {assets[asset].apy}, Volatility: {assets[asset].volatility})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

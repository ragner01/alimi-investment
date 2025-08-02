import React, { useEffect, useState } from 'react';
import api from '../api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const [message, setMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (err) {
      setMessage('Error fetching transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post(`/transactions/${type}`, { amount: Number(amount) });
      setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      setAmount('');
      fetchTransactions();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error processing transaction');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-8">
        <select value={type} onChange={e => setType(e.target.value)} className="border rounded-lg px-2 py-1">
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₦)" className="border rounded-lg px-4 py-2" required />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
      {message && <div className="text-center text-primary-600 mb-4">{message}</div>}
      <h3 className="font-semibold mb-2">Transaction History</h3>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Type</th>
            <th className="p-2">Amount (₦)</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id} className="border-t">
              <td className="p-2 capitalize">{tx.type}</td>
              <td className="p-2">{tx.amount.toLocaleString()}</td>
              <td className="p-2">{tx.status}</td>
              <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions; 
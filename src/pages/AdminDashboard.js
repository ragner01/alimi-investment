import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const usersRes = await api.get('/admin/users');
      setUsers(usersRes.data);
      const txRes = await api.get('/admin/transactions');
      setTransactions(txRes.data);
    } catch (err) {
      setMessage('Error fetching admin data');
    }
  };  

  useEffect(() => {
    fetchData();
  }, []);

  const handleKyc = async (id, action) => {
    setMessage('');
    try {
      await api.post(`/admin/users/${id}/kyc/${action}`);
      setMessage(`KYC ${action}d!`);
      fetchData();
    } catch (err) {
      setMessage('Error updating KYC');
    }
  };

  // Only show if user isAdmin
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.isAdmin) return <div className="p-8 text-center">Access denied. Admins only.</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {message && <div className="text-center text-primary-600 mb-4">{message}</div>}
      <h3 className="font-semibold mb-2">Users</h3>
      <table className="w-full text-sm border mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">KYC</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.isKYCVerified ? 'Verified' : 'Not Verified'}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleKyc(u._id, 'approve')} className="btn-primary btn-sm">Approve</button>
                <button onClick={() => handleKyc(u._id, 'reject')} className="btn-secondary btn-sm">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="font-semibold mb-2">All Transactions</h3>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount (₦)</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id} className="border-t">
              <td className="p-2">{tx.user?.name} ({tx.user?.email})</td>
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

export default AdminDashboard; 
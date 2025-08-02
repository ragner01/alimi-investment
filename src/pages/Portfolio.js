import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import api from '../api';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [stats, setStats] = useState({ totalInvested: 0, totalReturns: 0, count: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.get('/portfolio');
        setPortfolio(res.data);
        const statsRes = await api.get('/portfolio/stats');
        setStats(statsRes.data);
      } catch (err) {
        setMessage('Error fetching portfolio');
      }
    };
    fetchPortfolio();
  }, []);

  const total = portfolio.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">My Portfolio</h1>
          <p className="text-lg text-gray-600">Overview of your investments and performance on ALIMI.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="stats-card">
            <div className="font-semibold text-gray-900 mb-2">Total Invested</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₦{stats.totalInvested.toLocaleString()}</div>
          </div>
          <div className="stats-card">
            <div className="font-semibold text-gray-900 mb-2">Returns</div>
            <div className="text-2xl font-bold text-green-600 mb-1">₦{stats.totalReturns.toLocaleString()}</div>
          </div>
          <div className="stats-card">
            <div className="font-semibold text-gray-900 mb-2">Investments</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.count}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Asset Allocation Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Asset Allocation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolio}
                  dataKey="amount"
                  nameKey="investment.name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {portfolio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.investment.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 text-center text-lg font-bold text-primary-600">
              Total Portfolio Value: ₦{total.toLocaleString()}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Performance (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart3 data={portfolio} />
            </ResponsiveContainer>
            <div className="mt-6 text-center text-lg font-bold text-green-600">
              +₦{stats.totalReturns.toLocaleString()} (+{((stats.totalReturns / stats.totalInvested) * 100).toFixed(2)}%)
            </div>
          </div>
        </div>

        {/* Investment Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Investment Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <div key={item._id} className="stats-card">
                <div className="font-semibold text-gray-900 mb-2">{item.investment?.name}</div>
                <div className="text-gray-600 text-sm mb-1">{item.investment?.description}</div>
                <div className="text-lg font-bold text-gray-900 mb-1">₦{item.amount.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mb-1">Duration: {item.duration} days</div>
                <div className="text-sm text-gray-500 mb-1">Status: {item.status}</div>
                <div className="text-sm text-green-600">Returns: ₦{item.returns.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
        {message && <div className="text-center text-primary-600 mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default Portfolio; 
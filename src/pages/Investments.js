import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  BarChart3, 
  Calculator,
  Info,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Star,
  Users,
  Building,
  Globe
} from 'lucide-react';
import api from '../api';

const investHeroImage = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80'; // Wealth/finance
const investSectionImage = 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=900&q=80'; // Nigerian business

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await api.get('/investments');
        setInvestments(res.data);
      } catch (err) {
        setMessage('Error fetching investments');
      }
    };
    fetchInvestments();
  }, []);

  const handleInvest = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!selected) return;
    try {
      await api.post('/portfolio', {
        investmentId: selected._id,
        amount: Number(amount),
        duration: Number(duration),
      });
      
      setMessage('Investment successful!');
      setSelected(null);
      setAmount('');
      setDuration('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error investing');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <section className="relative gradient-bg text-white py-20 overflow-hidden">
        <img src={investHeroImage} alt="Wealth investment" className="absolute inset-0 w-full h-full object-cover opacity-40" style={{zIndex: 0}} />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Investment Options</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow">
              Discover a wide range of investment opportunities tailored for Nigerian investors.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Section with Illustration */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          <img src={investSectionImage} alt="Nigerian business" className="w-full md:w-1/2 rounded-2xl shadow-xl mb-6 md:mb-0" />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Invest with ALIMI?</h2>
            <ul className="list-disc ml-6 text-lg text-gray-700 space-y-2">
              <li>Access to exclusive, high-yield investment products</li>
              <li>Regulated and secure platform</li>
              <li>Expert portfolio management</li>
              <li>Transparent returns and real-time analytics</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investments.map((inv, index) => (
              <motion.div
                key={inv._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="investment-card cursor-pointer shadow-xl hover:scale-105"
                onClick={() => setSelected(inv)}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{inv.name}</h3>
                <p className="text-gray-600 mb-4">{inv.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between"><span className="text-gray-600">Return:</span><span className="font-semibold text-green-600">{inv.returnRate}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="font-medium">{inv.duration}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Min Amount:</span><span className="font-medium">₦{inv.minAmount?.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Risk Level:</span><span className="font-medium">{inv.risk}</span></div>
                </div>
                <button className="w-full btn-primary shadow-lg">Invest</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Investment Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Calculator
            </h2>
            <p className="text-xl text-gray-600">
              Calculate potential returns on your investments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <Calculator className="w-6 h-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-semibold">Calculate Returns</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Investment Type
                  </label>
                  <select
                    value={selected?._id || ''}
                    onChange={(e) => {
                      const investment = investments.find(inv => inv._id === e.target.value);
                      setSelected(investment);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose an investment type</option>
                    {investments.map(investment => (
                      <option key={investment._id} value={investment._id}>
                        {investment.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount (₦)
                  </label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (e.g., 1,000,000)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Duration (days)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter duration in days"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary-600 mr-2" />
                <h3 className="text-xl font-semibold">Projected Returns</h3>
              </div>

              {selected && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ₦{selected.projectedReturns?.total?.toLocaleString()}
                      </div>
                      <div className="text-gray-600">Total Value</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        ₦{selected.projectedReturns?.principal?.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Principal</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ₦{selected.projectedReturns?.returns?.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Returns</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">
                      {selected.projectedReturns?.annualizedReturn}% Annual Return
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Invest Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Invest in {selected.name}</h2>
            <form onSubmit={handleInvest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₦)</label>
                <input type="number" min={selected.minAmount} value={amount} onChange={e => setAmount(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (days)</label>
                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full border rounded-lg px-4 py-2" required />
              </div>
              <button type="submit" className="btn-primary w-full">Confirm Investment</button>
              <button type="button" className="btn-secondary w-full" onClick={() => setSelected(null)}>Cancel</button>
            </form>
            {message && <div className="text-center text-primary-600 mt-4">{message}</div>}
          </motion.div>
        </div>
      )}
      {message && !selected && <div className="text-center text-primary-600 mt-4">{message}</div>}
    </div>
  );
};

export default Investments; 
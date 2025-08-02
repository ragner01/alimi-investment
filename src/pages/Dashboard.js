import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  PieChart,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  Settings,
  Bell,
  Download,
  Share2,
  RefreshCw,
  Calculator,
  TrendingDown,
  Shield,
  Users,
  Building,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    amount: '',
    duration: '',
    returnRate: '',
    investmentType: ''
  });

  // Mock data for charts
  const portfolioData = [
    { name: 'Jan', value: 12000000, returns: 800000 },
    { name: 'Feb', value: 13500000, returns: 1200000 },
    { name: 'Mar', value: 14200000, returns: 900000 },
    { name: 'Apr', value: 15800000, returns: 1400000 },
    { name: 'May', value: 16500000, returns: 1100000 },
    { name: 'Jun', value: 18200000, returns: 1700000 }
  ];

  const portfolioBreakdown = [
    { name: 'Commercial Papers', value: 8200000, color: '#3B82F6' },
    { name: 'Mutual Funds', value: 5300000, color: '#10B981' },
    { name: 'Treasury Bills', value: 2250000, color: '#8B5CF6' },
    { name: 'Bonds', value: 2450000, color: '#F59E0B' }
  ];

  const recentTransactions = [
    { id: 1, type: 'Investment', amount: 500000, status: 'completed', date: '2024-01-15', investment: 'Commercial Papers' },
    { id: 2, type: 'Withdrawal', amount: 200000, status: 'pending', date: '2024-01-14', investment: 'Mutual Funds' },
    { id: 3, type: 'Investment', amount: 300000, status: 'completed', date: '2024-01-13', investment: 'Treasury Bills' },
    { id: 4, type: 'Investment', amount: 750000, status: 'completed', date: '2024-01-12', investment: 'Bonds' }
  ];

  const quickActions = [
    { icon: Plus, title: 'New Investment', description: 'Start a new investment', color: 'from-blue-500 to-blue-600', link: '/investments' },
    { icon: Calculator, title: 'Investment Calculator', description: 'Calculate potential returns', color: 'from-green-500 to-green-600', action: () => setShowCalculator(true) },
    { icon: Download, title: 'Download Report', description: 'Export portfolio report', color: 'from-purple-500 to-purple-600', action: () => console.log('Download') },
    { icon: Share2, title: 'Share Portfolio', description: 'Share with advisor', color: 'from-orange-500 to-orange-600', action: () => console.log('Share') }
  ];

  const alerts = [
    { type: 'success', message: 'Your Commercial Papers investment matured successfully', time: '2 hours ago' },
    { type: 'info', message: 'New investment opportunity available', time: '1 day ago' },
    { type: 'warning', message: 'Portfolio rebalancing recommended', time: '3 days ago' }
  ];

  const calculateReturns = () => {
    const { amount, duration, returnRate } = calculatorData;
    if (!amount || !duration || !returnRate) return null;
    
    const principal = parseFloat(amount);
    const time = parseFloat(duration) / 12; // Convert months to years
    const rate = parseFloat(returnRate) / 100;
    
    const interest = principal * rate * time;
    const total = principal + interest;
    
    return { principal, interest, total, rate: returnRate };
  };

  const returns = calculateReturns();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, Adebayo!</h1>
              <p className="text-lg text-gray-600">Here's your investment overview for today</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="btn-secondary flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Investment</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+18.4%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₦18,200,000</div>
            <div className="text-sm text-gray-500">Total Portfolio Value</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="stats-card-success"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+15.6%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₦2,450,000</div>
            <div className="text-sm text-gray-500">Total Returns</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-600">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+12.3%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₦15,750,000</div>
            <div className="text-sm text-gray-500">Total Invested</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="stats-card-warning"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-yellow-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">3 Active</span>
          </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₦8,500,000</div>
            <div className="text-sm text-gray-500">Pending Maturity</div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Portfolio Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 chart-container"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Portfolio Performance</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">6M</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">1Y</button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">All</button>
          </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#667eea" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Portfolio Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="chart-container"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Portfolio Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={portfolioBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {portfolioBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">₦{(item.value / 1000000).toFixed(1)}M</span>
                </div>
              ))}
          </div>
          </motion.div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="chart-container"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="p-4 rounded-xl border border-gray-200 hover:border-primary-300 transition-all duration-200 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="chart-container"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
              <Link to="/transactions" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'Investment' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {transaction.type === 'Investment' ? (
                        <Plus className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.investment}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'Investment' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'Investment' ? '+' : '-'}₦{(transaction.amount / 1000).toFixed(0)}K
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="chart-container"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 ${
                alert.type === 'success' ? 'border-green-500 bg-green-50' :
                alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start space-x-3">
                  {alert.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  ) : (
                    <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Investment Calculator Modal */}
        <AnimatePresence>
          {showCalculator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCalculator(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₦)</label>
                    <input
                      type="number"
                      value={calculatorData.amount}
                      onChange={(e) => setCalculatorData({...calculatorData, amount: e.target.value})}
                      className="form-input"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (months)</label>
                    <input
                      type="number"
                      value={calculatorData.duration}
                      onChange={(e) => setCalculatorData({...calculatorData, duration: e.target.value})}
                      className="form-input"
                      placeholder="Enter duration"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Return Rate (%)</label>
                    <input
                      type="number"
                      value={calculatorData.returnRate}
                      onChange={(e) => setCalculatorData({...calculatorData, returnRate: e.target.value})}
                      className="form-input"
                      placeholder="Enter return rate"
                    />
                  </div>
                  
                  {returns && (
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Principal:</span>
                        <span className="font-semibold">₦{returns.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest:</span>
                        <span className="font-semibold text-green-600">₦{returns.interest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-primary-600">₦{returns.total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowCalculator(false)}
                      className="btn-secondary flex-1"
                    >
                      Close
                    </button>
                    <button className="btn-primary flex-1">
                      Calculate
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard; 
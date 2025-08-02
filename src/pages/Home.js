import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  DollarSign, 
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Globe,
  Building,
  Award,
  Zap,
  Target,
  PieChart,
  Calculator,
  Eye,
  Download,
  Share2,
  Bell,
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Quote,
  Heart,
  ThumbsUp,
  Award as AwardIcon,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const heroImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80';
const investImage = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80';
const testimonialAvatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Performance data for charts
  const performanceData = [
    { month: 'Jan', returns: 12.5, growth: 8.2 },
    { month: 'Feb', returns: 15.3, growth: 12.1 },
    { month: 'Mar', returns: 13.8, growth: 9.7 },
    { month: 'Apr', returns: 18.2, growth: 15.4 },
    { month: 'May', returns: 16.9, growth: 13.2 },
    { month: 'Jun', returns: 22.1, growth: 18.9 }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "SEC Regulated & Secure",
      description: "All investments are SEC-regulated and insured for your peace of mind with bank-grade security.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Management",
      description: "Managed by certified financial advisors with 15+ years of experience in Nigerian markets.",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track your portfolio performance with advanced analytics and AI-powered insights.",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Returns",
      description: "Earn up to 25% annually with our diverse portfolio of high-yield investment options.",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    }
  ];

  const investmentTypes = [
    {
      name: "Commercial Papers",
      return: "12-18%",
      duration: "30-365 days",
      minAmount: "₦100,000",
      risk: "Low",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      icon: <Building className="w-6 h-6" />,
      features: ["High liquidity", "Government backed", "Quick returns"]
    },
    {
      name: "Mutual Funds",
      return: "15-25%",
      duration: "1-5 years",
      minAmount: "₦50,000",
      risk: "Medium",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      icon: <PieChart className="w-6 h-6" />,
      features: ["Diversified portfolio", "Professional management", "Regular dividends"]
    },
    {
      name: "Treasury Bills",
      return: "8-12%",
      duration: "91-364 days",
      minAmount: "₦100,000",
      risk: "Very Low",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      icon: <Award className="w-6 h-6" />,
      features: ["Government guaranteed", "Fixed returns", "Tax benefits"]
    },
    {
      name: "Corporate Bonds",
      return: "10-15%",
      duration: "3-10 years",
      minAmount: "₦200,000",
      risk: "Low",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      icon: <Target className="w-6 h-6" />,
      features: ["Stable returns", "Regular interest", "Capital preservation"]
    }
  ];

  const testimonials = [
    {
      name: "Adebayo Oke",
      role: "Business Owner",
      content: "ALIMI has transformed my investment strategy. The returns are impressive and the platform is incredibly user-friendly. I've seen my portfolio grow by 18% in just 6 months!",
      rating: 5,
      avatar: testimonialAvatars[0],
      company: "Oke Enterprises Ltd"
    },
    {
      name: "Chioma Eze",
      role: "Medical Doctor",
      content: "As a busy professional, I needed a reliable investment platform. ALIMI exceeded my expectations with their expert management and transparent reporting. Highly recommended!",
      rating: 5,
      avatar: testimonialAvatars[1],
      company: "Lagos Medical Center"
    },
    {
      name: "Kemi Adebayo",
      role: "Entrepreneur",
      content: "The commercial papers investment has been my best financial decision this year. The platform is intuitive and the customer support is exceptional. I'm already planning my next investment!",
      rating: 5,
      avatar: testimonialAvatars[2],
      company: "Adebayo Ventures"
    }
  ];

  const stats = [
    { label: "Active Investors", value: "15,000+", icon: <Users className="w-6 h-6" />, color: "from-blue-500 to-blue-600" },
    { label: "Total Investments", value: "₦45B+", icon: <DollarSign className="w-6 h-6" />, color: "from-green-500 to-green-600" },
    { label: "Average Returns", value: "18.5%", icon: <TrendingUp className="w-6 h-6" />, color: "from-purple-500 to-purple-600" },
    { label: "Years Experience", value: "8+", icon: <Award className="w-6 h-6" />, color: "from-orange-500 to-orange-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Lagos cityscape" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full"
        ></motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full"
        ></motion.div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  🚀 #1 Investment Platform in Nigeria
                </div>
                <div className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm">
                  SEC Regulated
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                Build Your Wealth with
                <span className="block text-yellow-300 animate-pulse">Nigeria's Best</span>
                Investment Platform
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed drop-shadow max-w-2xl">
                Access premium investment opportunities including commercial papers, mutual funds, 
                treasury bills, and more. Start your wealth journey today with returns up to 25% annually.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center shadow-xl group">
                  Start Investing Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => setShowVideo(true)}
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center bg-white/20 backdrop-blur-sm border-white/30 group"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>SEC Regulated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Instant Access</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-effect rounded-2xl p-8 animate-float shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Portfolio Value</h3>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="text-sm font-semibold">+18.4%</span>
                  </div>
                </div>
                
                <div className="text-3xl font-bold mb-4">₦15,750,000</div>
                <div className="text-green-400 text-sm mb-6">+₦2,450,000 this month</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Commercial Papers</span>
                    <span className="text-sm font-semibold">₦8,200,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mutual Funds</span>
                    <span className="text-sm font-semibold">₦5,300,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '34%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Treasury Bills</span>
                    <span className="text-sm font-semibold">₦2,250,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '14%'}}></div>
                  </div>
                </div>
                
                <Link to="/portfolio" className="w-full btn-primary text-center">
                  View Full Portfolio
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ALIMI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the most comprehensive and secure investment platform in Nigeria, 
              backed by years of expertise and regulatory compliance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center group hover:scale-105 shadow-xl cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className={`text-gradient ${feature.color.replace('from-', 'from-').replace('to-', 'to-')}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Chart Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Consistent Performance
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our investment strategies have consistently delivered strong returns across all market conditions, 
                helping thousands of Nigerians build wealth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <span className="font-semibold text-gray-900">Average Annual Returns</span>
                  <span className="text-2xl font-bold text-green-600">18.5%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <span className="font-semibold text-gray-900">Total Assets Under Management</span>
                  <span className="text-2xl font-bold text-blue-600">₦45B+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <span className="font-semibold text-gray-900">Active Investors</span>
                  <span className="text-2xl font-bold text-purple-600">15,000+</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="chart-container"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
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
                    dataKey="returns" 
                    stroke="#667eea" 
                    fillOpacity={1} 
                    fill="url(#colorReturns)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Options Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our diverse range of investment products designed to meet your financial goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentTypes.map((investment, index) => (
              <motion.div
                key={investment.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="investment-card group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${investment.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {investment.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {investment.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return:</span>
                    <span className="font-semibold text-green-600">{investment.return}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{investment.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Amount:</span>
                    <span className="font-medium">{investment.minAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className={`font-medium ${
                      investment.risk === 'Very Low' ? 'text-green-600' :
                      investment.risk === 'Low' ? 'text-blue-600' :
                      investment.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {investment.risk}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  {investment.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/investments" 
                  className="w-full btn-primary text-center group"
                >
                  Invest Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied investors who trust ALIMI with their financial future.
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="card max-w-4xl mx-auto text-center"
              >
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name} 
                    className="w-16 h-16 rounded-full border-4 border-primary-500 mr-4" 
                  />
                  <div className="text-left">
                    <div className="flex items-center mb-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</p>
                    <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].company}</p>
                  </div>
                </div>
                
                <Quote className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <p className="text-lg text-gray-700 italic mb-6">
                  "{testimonials[currentTestimonial].content}"
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-gray-200">
              Join thousands of Nigerians who are already building wealth with ALIMI. 
              Start with as little as ₦50,000 and watch your money grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 group">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="btn-secondary text-lg px-8 py-4 bg-white/20 backdrop-blur-sm border-white/30">
                Speak to an Advisor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Demo video would play here</p>
                </div>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="mt-4 w-full btn-secondary"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home; 
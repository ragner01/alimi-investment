import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact ALIMI</h1>
          <p className="text-lg text-gray-600">We're here to help! Reach out to our team for support, partnership, or inquiries.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Contact Form</h2>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-lg text-green-700 font-semibold mb-2">Thank you for reaching out!</p>
                <p className="text-gray-600">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Company Info</h2>
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">+234 1 234 5678</span>
              </div>
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">info@alimi.ng</span>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Support</h2>
              <p className="text-gray-600 mb-2">For urgent support, call our 24/7 helpline or email us.</p>
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">+234 800 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-gray-700">support@alimi.ng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 
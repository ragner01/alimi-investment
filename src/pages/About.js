import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, Globe } from 'lucide-react';

const aboutHeroImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'; // Nigerian cityscape
const teamAvatars = [
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/43.jpg',
  'https://randomuser.me/api/portraits/women/32.jpg',
];

const team = [
  { name: 'Aisha Bello', role: 'CEO & Founder', img: teamAvatars[0], bio: '15+ years in finance and wealth management.' },
  { name: 'Chinedu Okafor', role: 'Chief Investment Officer', img: teamAvatars[1], bio: 'Expert in Nigerian capital markets.' },
  { name: 'Fatima Sani', role: 'Head of Client Relations', img: teamAvatars[2], bio: 'Dedicated to client success and support.' },
];

const About = () => (
  <div className="min-h-screen bg-gray-50 py-0">
    {/* Hero Section with Image */}
    <section className="relative gradient-bg text-white overflow-hidden py-20 mb-12">
      <img src={aboutHeroImage} alt="Lagos cityscape" className="absolute inset-0 w-full h-full object-cover opacity-40" style={{zIndex: 0}} />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">About ALIMI</h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow">
            ALIMI is Nigeria's leading digital wealth management platform, empowering individuals and businesses to grow and protect their wealth through innovative investment solutions.
          </p>
        </motion.div>
      </div>
    </section>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center shadow-xl">
          <TrendingUp className="w-10 h-10 mx-auto text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">To democratize access to premium investment opportunities for all Nigerians.</p>
        </div>
        <div className="card text-center shadow-xl">
          <Shield className="w-10 h-10 mx-auto text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">To be the most trusted and innovative wealth management brand in Africa.</p>
        </div>
        <div className="card text-center shadow-xl">
          <Globe className="w-10 h-10 mx-auto text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600">Integrity, Innovation, Client Success, and Financial Inclusion.</p>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="card text-center shadow-xl">
              <img src={member.img} alt={member.name} className="w-20 h-20 mx-auto rounded-full border-2 border-primary-500 mb-4 object-cover" />
              <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
              <p className="text-primary-600 text-sm mb-1">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About; 
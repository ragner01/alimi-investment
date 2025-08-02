const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number },
  returnRate: { type: String, required: true }, // e.g. '12-18%'
  duration: { type: String, required: true }, // e.g. '30-365 days'
  risk: { type: String, required: true },
  issuers: [{ type: String }],
  features: [{ type: String }],
  requirements: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Investment', InvestmentSchema); 
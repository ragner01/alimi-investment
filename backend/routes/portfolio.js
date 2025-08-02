const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const Investment = require('../models/Investment');
const auth = require('../middleware/auth');

// Add investment to portfolio
router.post('/', auth, async (req, res) => {
  try {
    const { investmentId, amount, duration } = req.body;
    const investment = await Investment.findById(investmentId);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    if (amount < investment.minAmount) return res.status(400).json({ message: 'Amount below minimum' });
    const portfolio = new Portfolio({
      user: req.user,
      investment: investmentId,
      amount,
      duration,
    });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(400).json({ message: 'Error adding investment', error: err.message });
  }
});

// List user's portfolio
router.get('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ user: req.user }).populate('investment');
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio', error: err.message });
  }
});

// Get portfolio stats/returns
router.get('/stats', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ user: req.user }).populate('investment');
    let totalInvested = 0;
    let totalReturns = 0;
    portfolio.forEach(item => {
      totalInvested += item.amount;
      totalReturns += item.returns;
    });
    res.json({ totalInvested, totalReturns, count: portfolio.length });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats', error: err.message });
  }
});

module.exports = router; 
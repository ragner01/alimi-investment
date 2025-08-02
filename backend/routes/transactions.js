const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// Deposit funds
router.post('/deposit', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const tx = new Transaction({ user: req.user, type: 'deposit', amount, status: 'completed' });
    await tx.save();
    res.status(201).json({ message: 'Deposit successful', tx });
  } catch (err) {
    res.status(400).json({ message: 'Error depositing', error: err.message });
  }
});

// Withdraw funds
router.post('/withdraw', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
    const tx = new Transaction({ user: req.user, type: 'withdraw', amount, status: 'completed' });
    await tx.save();
    res.status(201).json({ message: 'Withdrawal successful', tx });
  } catch (err) {
    res.status(400).json({ message: 'Error withdrawing', error: err.message });
  }
});

// List user transactions
router.get('/', auth, async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
});

module.exports = router; 
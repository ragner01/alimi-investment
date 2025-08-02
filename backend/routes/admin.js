const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// List all users
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Approve KYC
router.post('/users/:id/kyc/approve', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isKYCVerified = true;
    await user.save();
    res.json({ message: 'KYC approved', user });
  } catch (err) {
    res.status(500).json({ message: 'Error approving KYC', error: err.message });
  }
});

// Reject KYC
router.post('/users/:id/kyc/reject', auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isKYCVerified = false;
    await user.save();
    res.json({ message: 'KYC rejected', user });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting KYC', error: err.message });
  }
});

// List all transactions
router.get('/transactions', auth, admin, async (req, res) => {
  try {
    const txs = await Transaction.find().populate('user', 'name email');
    res.json(txs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
});

module.exports = router; 
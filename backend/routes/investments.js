const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create investment (admin)
router.post('/', auth, admin, async (req, res) => {
  try {
    const investment = new Investment(req.body);
    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    res.status(400).json({ message: 'Error creating investment', error: err.message });
  }
});

// Update investment (admin)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const investment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    res.json(investment);
  } catch (err) {
    res.status(400).json({ message: 'Error updating investment', error: err.message });
  }
});

// Delete investment (admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const investment = await Investment.findByIdAndDelete(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    res.json({ message: 'Investment deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting investment', error: err.message });
  }
});

// List all investments (public)
router.get('/', async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching investments', error: err.message });
  }
});

// Get investment details (public)
router.get('/:id', async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    res.json(investment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching investment', error: err.message });
  }
});

module.exports = router; 
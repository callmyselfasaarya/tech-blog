const express = require('express');
const Subscriber = require('../models/Subscriber');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email address is required.' });

    const existing = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed to Techniccal Insider.' });
    }

    const subscriber = new Subscriber({
      email: email.toLowerCase().trim(),
      status: 'active'
    });

    await subscriber.save();
    res.status(201).json({ success: true, message: 'Welcome to Techniccal Insider. Check your inbox soon.' });
  } catch (error) {
    res.status(500).json({ error: 'Subscription failed: ' + error.message });
  }
});

// Admin Get Subscribers (Admin+)
router.get('/admin/subscribers', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscribers.' });
  }
});

// Admin Delete Subscriber (Admin+)
router.delete('/admin/subscribers/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ error: 'Subscriber not found.' });
    res.json({ success: true, message: 'Subscriber removed.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subscriber.' });
  }
});

module.exports = router;

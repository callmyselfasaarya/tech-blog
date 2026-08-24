const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', SubscriberSchema);

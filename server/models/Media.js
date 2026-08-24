const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, default: 'image/jpeg' },
  size: { type: Number, default: 0 },
  uploadedAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);

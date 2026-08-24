const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, uppercase: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);

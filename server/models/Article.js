const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  author: {
    name: { type: String, default: 'Julian Vance' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    bio: { type: String, default: 'Writer and software architect.' },
    role: { type: String, default: 'Editor-in-Chief' }
  },
  category: { type: String, required: true, index: true },
  tags: [{ type: String }],
  publishedAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
  updatedAt: { type: String },
  readingTime: { type: String, default: '5 min read' },
  featured: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  views: { type: Number, default: 0 },
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
    ogImage: { type: String },
    canonicalUrl: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);

const mongoose = require('mongoose');
const Article = require('./models/Article');
const Category = require('./models/Category');
const Subscriber = require('./models/Subscriber');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aether_blog';

const seedArticles = [
  {
    title: 'The Art of Thinking Clearly in an Era of Noise',
    slug: 'the-art-of-thinking-clearly',
    excerpt: 'A foundational reflection on deliberate learning, technological craftsmanship, and the quiet power of building things that outlast the news cycle.',
    category: 'WRITING',
    tags: ['Learning', 'Philosophy', 'Craftsmanship', 'Focus'],
    publishedAt: '2026-08-20',
    readingTime: '8 min read',
    featured: true,
    pinned: true,
    status: 'published',
    views: 4120,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    content: `## Introduction\n\nWe live in a cultural moment dominated by velocity...`
  },
  {
    title: 'Why Building Slowly Is Sometimes Faster',
    slug: 'why-building-slowly-is-faster',
    excerpt: 'A reflection on patience, deliberate practice, and the hidden compound advantages of taking your time to establish firm foundations.',
    category: 'WRITING',
    tags: ['Patience', 'Engineering', 'Productivity'],
    publishedAt: '2026-08-18',
    readingTime: '6 min read',
    status: 'published',
    views: 2840,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    content: `## The Paradox of Speed\n\nThere is a well-known military proverb...`
  }
];

const seedCategories = [
  { name: 'WRITING', slug: 'writing', description: 'Thoughts on clarity, prose, and expression.', count: 4 },
  { name: 'TECHNOLOGY', slug: 'technology', description: 'Architectural perspectives on software & AI.', count: 5 },
  { name: 'DESIGN', slug: 'design', description: 'Minimalist aesthetics and user experience.', count: 3 },
  { name: 'MINDSET', slug: 'mindset', description: 'Mental models for long-term execution.', count: 3 },
  { name: 'SYSTEMS', slug: 'systems', description: 'Engineering simple structures for complex ideas.', count: 4 }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Article.deleteMany({});
    await Category.deleteMany({});
    await Subscriber.deleteMany({});

    await Article.insertMany(seedArticles);
    await Category.insertMany(seedCategories);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();

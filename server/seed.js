const mongoose = require('mongoose');
const Article = require('./models/Article');
const Category = require('./models/Category');
const Subscriber = require('./models/Subscriber');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techniccal_blog';

const seedArticles = [
  {
    title: 'Designing High-Throughput Distributed Systems at Scale',
    slug: 'designing-high-throughput-distributed-systems',
    excerpt: 'A deep-dive into event-driven patterns, backpressure strategies, and partitioning techniques for scaling modern data pipelines.',
    category: 'Software Architecture',
    tags: ['Distributed Systems', 'Kafka', 'Architecture', 'Performance'],
    publishedAt: '2026-08-23',
    readingTime: '8 min read',
    featured: true,
    pinned: true,
    status: 'published',
    views: 8420,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    content: `## The Foundations of Scalable Systems\n\nAs application workloads scale into millions of events per second, monolithic request-response models break down under network latency and concurrency bottlenecks. Building resilient infrastructure requires shifting toward decoupled, event-driven architectures.`
  },
  {
    title: 'Understanding LLM Reasoning Engines & Agentic Workflows',
    slug: 'llm-reasoning-engines-agentic-workflows',
    excerpt: 'How modern AI architectures are moving from simple text generation to multi-step autonomous planning, tool usage, and reflection loops.',
    category: 'AI & Machine Learning',
    tags: ['AI', 'LLM', 'Agentic Workflows'],
    publishedAt: '2026-08-21',
    readingTime: '6 min read',
    status: 'published',
    views: 6710,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    content: `## Beyond Simple Text Completion\n\nThe paradigm shift in artificial intelligence is moving from passive text generation to active reasoning engines.`
  }
];

const seedCategories = [
  { name: 'Software Architecture', slug: 'software-architecture', description: 'System patterns, microservices, and distributed architecture.', count: 4 },
  { name: 'AI & Machine Learning', slug: 'ai-machine-learning', description: 'LLM reasoning engines, vector databases, and AI agent systems.', count: 3 },
  { name: 'Systems Design', slug: 'systems-design', description: 'Low-latency protocols, concurrency models, and performance tuning.', count: 3 },
  { name: 'Cloud Infrastructure', slug: 'cloud-infrastructure', description: 'Kubernetes, serverless, CI/CD, and DevOps automation.', count: 2 },
  { name: 'Developer Tools', slug: 'developer-tools', description: 'Compilers, Rust, Go, and developer workflow tooling.', count: 2 }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding Techniccal DB...');

    await Article.deleteMany({});
    await Category.deleteMany({});
    await Subscriber.deleteMany({});

    await Article.insertMany(seedArticles);
    await Category.insertMany(seedCategories);

    console.log('Techniccal DB seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();

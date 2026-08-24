const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');

const Article = require('./models/Article');
const Category = require('./models/Category');
const Subscriber = require('./models/Subscriber');
const User = require('./models/User');
const Media = require('./models/Media');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'aether-secret-jwt-key-2026';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aether_blog';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

try {
  const fs = require('fs');
  const srcPath = 'C:/Users/91994/.gemini/antigravity-ide/brain/2f698e97-d93f-4a3b-9ddb-db434d813f10/media__1787568649883.jpg';
  const destPath = path.join(__dirname, '../client/public/aarya-portrait.jpg');
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Copied developer portrait to client/public/aarya-portrait.jpg');
  }
} catch (err) {
  console.error('Portrait copy info:', err.message);
}

// Connect to MongoDB if available
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.log('MongoDB connection warning (running fallback):', err.message));

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

/* --- REST API ROUTES --- */

// ARTICLES
// GET /api/articles
app.get('/api/articles', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { status: 'published' };

    if (category && category.toUpperCase() !== 'ALL') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (search) {
      const q = new RegExp(search, 'i');
      query.$or = [
        { title: q },
        { excerpt: q },
        { category: q },
        { tags: q },
        { content: q }
      ];
    }

    const articles = await Article.find(query).sort({ publishedAt: -1, createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/admin
app.get('/api/articles/admin', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/:slug
app.get('/api/articles/:slug', async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles
app.post('/api/articles', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();

    // Increment category count
    if (req.body.category) {
      await Category.findOneAndUpdate(
        { name: req.body.category.toUpperCase() },
        { $inc: { count: 1 } }
      );
    }

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/articles/:id
app.patch('/api/articles/:id', async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Article not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/articles/:id
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CATEGORIES
// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/categories
app.post('/api/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const cat = new Category({
      name: name.toUpperCase(),
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description
    });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/categories/:id
app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NEWSLETTER
// POST /api/newsletter/subscribe
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (subscriber) {
      return res.json({ success: true, message: 'You are already subscribed to Aether Letters.' });
    }
    subscriber = new Subscriber({ email: email.toLowerCase() });
    await subscriber.save();
    res.status(201).json({ success: true, message: 'Welcome to Aether Letters.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/admin/subscribers
app.get('/api/admin/subscribers', async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AUTH
// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@aether.blog' && password === 'admin123') {
    const user = {
      id: 'usr-admin-1',
      name: 'Julian Vance',
      email: 'admin@aether.blog',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Aether Editorial REST API Server running on port ${PORT}`);
});

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

// Role Auth Middleware
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient role privileges' });
    }
    next();
  };
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
      return res.json({ success: true, message: 'You are already subscribed to Techniccal Insider.' });
    }
    subscriber = new Subscriber({ email: email.toLowerCase() });
    await subscriber.save();
    res.status(201).json({ success: true, message: 'Welcome to Techniccal Insider.' });
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

// USER MANAGEMENT (SUPER ADMIN RBAC)
// GET /api/admin/users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/users
app.post('/api/admin/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password: password || 'default123', role: role || 'EDITOR' });
    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/admin/users/:id/role
app.patch('/api/admin/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/admin/users/:id
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AUTH
// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Pre-configured Role Accounts for Testing & Architecture Hierarchy Demonstration
  const demoUsers = {
    'superadmin@techniccal.com': { id: 'usr-super-1', name: 'Elena Rostova', email: 'superadmin@techniccal.com', role: 'SUPER_ADMIN', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    'admin@techniccal.com': { id: 'usr-admin-1', name: 'Julian Vance', email: 'admin@techniccal.com', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    'admin@aether.blog': { id: 'usr-admin-1', name: 'Julian Vance', email: 'admin@aether.blog', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    'editor@techniccal.com': { id: 'usr-editor-1', name: 'Marcus Sterling', email: 'editor@techniccal.com', role: 'EDITOR', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    'member@techniccal.com': { id: 'usr-member-1', name: 'Sophia Thorne', email: 'member@techniccal.com', role: 'MEMBER', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80', membershipStatus: 'pro', savedArticles: ['art-pinned-01', 'art-01'] },
    'reader@techniccal.com': { id: 'usr-reader-1', name: 'David Miller', email: 'reader@techniccal.com', role: 'READER', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', membershipStatus: 'free' }
  };

  const lowerEmail = email.toLowerCase();
  if (demoUsers[lowerEmail]) {
    const user = demoUsers[lowerEmail];
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user });
  }

  // Database verification if MongoDB is active
  try {
    const dbUser = await User.findOne({ email: lowerEmail });
    if (dbUser && await dbUser.comparePassword(password)) {
      const user = {
        id: dbUser._id.toString(),
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        avatar: dbUser.avatar,
        membershipStatus: dbUser.membershipStatus,
        savedArticles: dbUser.savedArticles
      };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user });
    }
  } catch (e) {}

  res.status(401).json({ error: 'Invalid credentials. Use a demo account or valid password.' });
});

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'MEMBER',
      membershipStatus: 'free'
    });
    await newUser.save();

    const user = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      membershipStatus: newUser.membershipStatus,
      savedArticles: []
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Techniccal Editorial REST API Server running on port ${PORT}`);
});

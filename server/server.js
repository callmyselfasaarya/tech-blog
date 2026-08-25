require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const userRoutes = require('./routes/userRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techniccal-blog';

// CORS configuration supporting credentials & cookies
const allowedOrigins = [
  process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173',
  'https://techniccal.com',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Allow configured origins
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static file serving for media uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api', userRoutes);
app.use('/api', mediaRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found on this server.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Database Connection & Server Listener
const HOST = '0.0.0.0';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`[Techniccal API Server] MongoDB connected cleanly to database: ${mongoose.connection.name}`);
    app.listen(PORT, HOST, () => {
      console.log(`[Techniccal API Server] Listening on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn(`[Techniccal API Server] MongoDB connection warning: ${err.message}`);
    console.warn('[Techniccal API Server] Starting server in offline/fallback mode...');
    app.listen(PORT, HOST, () => {
      console.log(`[Techniccal API Server] Listening on http://${HOST}:${PORT} (Offline Mode)`);
    });
  });

module.exports = app;

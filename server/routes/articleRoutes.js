const express = require('express');
const Article = require('../models/Article');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper to calculate reading time
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = (text || '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

// 1. Get Public Articles (Filtered by category and search)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = { status: 'published' };

    if (category && category.toUpperCase() !== 'ALL') {
      const cat = category.toUpperCase();
      filter.$or = [
        { category: new RegExp(cat, 'i') },
        { tags: new RegExp(cat, 'i') }
      ];
    }

    if (search && search.trim()) {
      const q = search.trim();
      const searchRegex = new RegExp(q, 'i');
      filter.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { content: searchRegex },
        { category: searchRegex },
        { tags: searchRegex }
      ];
    }

    const articles = await Article.find(filter).sort({ publishedAt: -1, createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles: ' + error.message });
  }
});

// 2. Get Admin Articles (Includes draft status - Editor+)
router.get('/admin', authenticate, authorize('EDITOR', 'ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin articles: ' + error.message });
  }
});

// 3. Get Article by Slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    // Increment view counter
    article.views = (article.views || 0) + 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article: ' + error.message });
  }
});

// 4. Create Article (Editor+)
router.post('/', authenticate, authorize('EDITOR', 'ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, tags, coverImage, featured, pinned, status, seo, author } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required.' });
    }

    const finalSlug = slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const existing = await Article.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({ error: 'An article with this slug already exists.' });
    }

    const article = new Article({
      title,
      slug: finalSlug,
      excerpt: excerpt || title,
      content,
      category,
      tags: tags || [],
      coverImage: coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      featured: featured || false,
      pinned: pinned || false,
      status: status || 'draft',
      readingTime: calculateReadingTime(content),
      author: author || {
        name: req.user.name,
        avatar: req.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: 'Writer and software architect.',
        role: req.user.role
      },
      seo: seo || { title, description: excerpt }
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article: ' + error.message });
  }
});

// 5. Update Article (Editor+)
router.patch('/:id', authenticate, authorize('EDITOR', 'ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    const updates = req.body;
    if (updates.content) {
      updates.readingTime = calculateReadingTime(updates.content);
    }
    updates.updatedAt = new Date().toISOString().split('T')[0];

    Object.assign(article, updates);
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article: ' + error.message });
  }
});

// 6. Delete Article (Admin+)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article: ' + error.message });
  }
});

module.exports = router;

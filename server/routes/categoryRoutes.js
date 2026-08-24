const express = require('express');
const Category = require('../models/Category');
const Article = require('../models/Article');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Get Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
});

// Create Category (Admin+)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required.' });

    const slug = name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    const existing = await Category.findOne({ name: name.toUpperCase() });
    if (existing) {
      return res.status(400).json({ error: 'Category already exists.' });
    }

    const count = await Article.countDocuments({ category: name });

    const category = new Category({
      name: name.toUpperCase(),
      slug,
      description: description || '',
      count
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category: ' + error.message });
  }
});

// Delete Category (Admin+)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    res.json({ success: true, message: 'Category deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

module.exports = router;

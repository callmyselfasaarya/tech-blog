const express = require('express');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// 1. Get All Users (Super Admin Only)
router.get('/admin/users', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users: ' + error.message });
  }
});

// 2. Create User with Assigned Role (Super Admin Only)
router.post('/admin/users', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required.' });
    }

    const validRoles = ['READER', 'MEMBER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Allowed roles: ${validRoles.join(', ')}` });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const initialPassword = password || 'TechniccalPass2026!';

    const user = new User({
      name,
      email: email.toLowerCase(),
      role,
      password: initialPassword,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user: ' + error.message });
  }
});

// 3. Update User Role (Super Admin Only)
router.patch('/admin/users/:id/role', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['READER', 'MEMBER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];

    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Allowed roles: ${validRoles.join(', ')}` });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Prevent demoting the last SUPER_ADMIN
    if (user.role === 'SUPER_ADMIN' && role !== 'SUPER_ADMIN') {
      const superAdminCount = await User.countDocuments({ role: 'SUPER_ADMIN' });
      if (superAdminCount <= 1) {
        return res.status(400).json({ error: 'Cannot demote the sole Super Admin of the application.' });
      }
    }

    user.role = role;
    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role: ' + error.message });
  }
});

// 4. Delete User (Super Admin Only)
router.delete('/admin/users/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (user.role === 'SUPER_ADMIN') {
      const superAdminCount = await User.countDocuments({ role: 'SUPER_ADMIN' });
      if (superAdminCount <= 1) {
        return res.status(400).json({ error: 'Cannot delete the sole Super Admin of the application.' });
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user: ' + error.message });
  }
});

module.exports = router;

const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authenticate, JWT_SECRET } = require('../middleware/authMiddleware');

const router = express.Router();

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'techniccal-refresh-secret-2026-production';

// Helper to issue access & refresh tokens
function generateTokens(user) {
  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

// 1. Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email address is already registered.' });
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'MEMBER',
      membershipStatus: 'free',
      savedArticles: [],
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
    });

    await user.save();

    const { accessToken, refreshToken } = generateTokens(user);

    // Save refresh token to user record
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        membershipStatus: user.membershipStatus,
        savedArticles: user.savedArticles
      },
      message: 'Account created successfully.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed: ' + error.message });
  }
});

// 2. Member Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        membershipStatus: user.membershipStatus,
        savedArticles: user.savedArticles
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed: ' + error.message });
  }
});

// 3. Admin / CMS Login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (!['EDITOR', 'ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      return res.status(403).json({
        error: `Access Denied: Account role '${user.role}' lacks administrative CMS access.`
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        membershipStatus: user.membershipStatus
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Admin authentication failed: ' + error.message });
  }
});

// 4. Refresh Token Rotation
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required.' });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // Verify token exists in user's refreshTokens array
    const tokenExists = user.refreshTokens.some(t => t.token === refreshToken);
    if (!tokenExists) {
      // Token reuse detected! Invalidate all refresh tokens for security
      user.refreshTokens = [];
      await user.save();
      return res.status(403).json({ error: 'Invalid or reused refresh token. Please sign in again.' });
    }

    // Remove consumed refresh token
    user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);

    // Generate new token pair
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);

    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        membershipStatus: user.membershipStatus
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token.' });
  }
});

// 5. Get Me (Current Session Status)
router.get('/me', authenticate, async (req, res) => {
  res.json({
    authenticated: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar,
      membershipStatus: req.user.membershipStatus,
      savedArticles: req.user.savedArticles || []
    }
  });
});

// 6. Forgot Password Workflow
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Return success even if email not found to prevent user enumeration
      return res.json({ success: true, message: 'If an account exists, a password reset link has been dispatched.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    res.json({
      success: true,
      message: 'Password reset link dispatched.',
      demoResetUrl: resetUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Password reset request failed: ' + error.message });
  }
});

// 7. Reset Password Confirmation
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Reset token and new password are required.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: 'Password has been updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Password reset failed: ' + error.message });
  }
});

// 8. Email Verification Workflow
router.post('/send-verification', authenticate, async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    req.user.emailVerificationTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    req.user.emailVerificationExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await req.user.save();

    const verifyUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email?token=${token}`;

    res.json({
      success: true,
      message: 'Verification link generated.',
      verifyUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification link.' });
  }
});

router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Verification token required.' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      emailVerificationTokenHash: hashedToken,
      emailVerificationExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Verification token is invalid or has expired.' });
    }

    user.isVerified = true;
    user.emailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpiresAt = undefined;

    await user.save();

    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Email verification failed.' });
  }
});

// 9. Logout
router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);
        await user.save();
      }
    } catch (e) {}
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Signed out successfully.' });
});

// 10. Saved Articles Toggle (Member Portal)
router.post('/saved-articles', authenticate, async (req, res) => {
  try {
    const { articleId } = req.body;
    if (!articleId) return res.status(400).json({ error: 'articleId is required.' });

    const index = req.user.savedArticles.indexOf(articleId);
    if (index === -1) {
      req.user.savedArticles.push(articleId);
    } else {
      req.user.savedArticles.splice(index, 1);
    }

    await req.user.save();
    res.json({ success: true, savedArticles: req.user.savedArticles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update saved articles.' });
  }
});

module.exports = router;

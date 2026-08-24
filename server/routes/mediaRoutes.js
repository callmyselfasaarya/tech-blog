const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure Uploads Folder
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image files and PDFs are allowed.'));
    }
  }
});

// 1. Get All Media Items (Editor+)
router.get('/admin/media', authenticate, authorize('EDITOR', 'ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch media assets.' });
  }
});

// 2. Upload Media Asset (Editor+)
router.post('/admin/media', authenticate, authorize('EDITOR', 'ADMIN', 'SUPER_ADMIN'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided for upload.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const media = new Media({
      filename: req.file.originalname,
      url: fileUrl,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ error: 'Media upload failed: ' + error.message });
  }
});

// 3. Delete Media Asset (Editor+)
router.delete('/admin/media/:id', authenticate, authorize('EDITOR', 'ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media asset not found.' });

    // Remove local file if exists
    const filename = path.basename(media.url);
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Media asset deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete media asset.' });
  }
});

module.exports = router;

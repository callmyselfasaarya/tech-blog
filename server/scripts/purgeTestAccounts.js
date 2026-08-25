require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techniccal-blog';

const TEST_EMAILS = [
  'superadmin@techniccal.com',
  'admin@techniccal.com',
  'editor@techniccal.com',
  'member@techniccal.com',
  'reader@techniccal.com'
];

async function purgeTestAccounts() {
  try {
    console.log('[Purge] Connecting to database...');
    await mongoose.connect(MONGODB_URI);

    const result = await User.deleteMany({ email: { $in: TEST_EMAILS } });
    console.log(`\n✅ Successfully purged ${result.deletedCount} demo test accounts from database.\n`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error purging test accounts:', err.message);
    process.exit(1);
  }
}

purgeTestAccounts();

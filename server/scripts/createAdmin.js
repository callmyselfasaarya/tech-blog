require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techniccal-blog';

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || process.argv[2];
  const password = process.env.ADMIN_PASSWORD || process.argv[3];
  const name = process.env.ADMIN_NAME || process.argv[4] || 'Production Super Admin';

  if (!email || !password) {
    console.error('\n❌ Usage: ADMIN_EMAIL=admin@domain.com ADMIN_PASSWORD=secret npm run create-admin');
    console.error('   or: node scripts/createAdmin.js <email> <password> [name]\n');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('❌ Error: Production password must be at least 8 characters long.');
    process.exit(1);
  }

  try {
    console.log(`[Production Admin] Connecting to database...`);
    await mongoose.connect(MONGODB_URI);

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      existing.role = 'SUPER_ADMIN';
      existing.password = password;
      existing.isVerified = true;
      existing.emailVerified = true;
      await existing.save();
      console.log(`\n✅ Promoted existing user ${email} to SUPER_ADMIN with updated password.\n`);
    } else {
      const admin = new User({
        name,
        email: email.toLowerCase(),
        password,
        role: 'SUPER_ADMIN',
        isVerified: true,
        emailVerified: true,
        membershipStatus: 'insider'
      });
      await admin.save();
      console.log(`\n✅ Production SUPER_ADMIN account created successfully for ${email}.\n`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating production admin:', err.message);
    process.exit(1);
  }
}

createAdmin();

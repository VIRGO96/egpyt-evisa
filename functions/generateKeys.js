const crypto = require('crypto');

console.log('\n========================================');
console.log('  API Security Key Generator');
console.log('========================================\n');

// Generate keys
const apiKey = crypto.randomBytes(32).toString('hex');
const apiSecret = crypto.randomBytes(32).toString('hex');
const encryptionKey = crypto.randomBytes(32).toString('hex');

console.log('🔑 Generated Keys:\n');
console.log('API_KEY:');
console.log(apiKey);
console.log('\nAPI_SECRET:');
console.log(apiSecret);
console.log('\nENCRYPTION_KEY:');
console.log(encryptionKey);

console.log('\n========================================');
console.log('  Firebase Functions Config Commands');
console.log('========================================\n');

console.log('Run these commands in your terminal:\n');
console.log(`firebase functions:config:set api.key="${apiKey}"`);
console.log(`firebase functions:config:set api.secret="${apiSecret}"`);
console.log(`firebase functions:config:set encryption.key="${encryptionKey}"`);

console.log('\n========================================');
console.log('  .env File Format');
console.log('========================================\n');

console.log('Copy this to functions/.env:\n');
console.log(`API_KEY=${apiKey}`);
console.log(`API_SECRET=${apiSecret}`);
console.log(`ENCRYPTION_KEY=${encryptionKey}`);

console.log('\n========================================');
console.log('  Frontend .env (VITE)');
console.log('========================================\n');

console.log('Copy this to root .env (for frontend):\n');
console.log(`VITE_API_KEY=${apiKey}`);
console.log('VITE_API_URL=https://app-ulcsaxetia-uc.a.run.app');

console.log('\n⚠️  SECURITY WARNING:');
console.log('- NEVER commit these keys to version control');
console.log('- Add .env files to .gitignore');
console.log('- API_SECRET should NEVER be exposed to frontend');
console.log('- ENCRYPTION_KEY should NEVER be exposed to frontend');
console.log('- Only API_KEY should be in frontend (VITE_API_KEY)\n');

console.log('✅ Keys generated successfully!\n');

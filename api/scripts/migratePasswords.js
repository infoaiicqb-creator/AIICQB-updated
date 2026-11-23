import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.resolve(__dirname, '../data/users.json');

export async function migratePasswords() {
  console.log('====================================================');
  console.log(' AICQB Safe Password Migration to Bcrypt Hashing');
  console.log('====================================================');

  if (!fs.existsSync(usersFilePath)) {
    console.log(`Users file not found at ${usersFilePath}. Skipping.`);
    return { migratedCount: 0, totalUsers: 0 };
  }

  const content = fs.readFileSync(usersFilePath, 'utf-8');
  let users = [];
  try {
    users = JSON.parse(content || '[]');
  } catch (err) {
    console.error('Failed to parse users.json:', err);
    throw err;
  }

  let migratedCount = 0;
  let alreadyHashedCount = 0;

  for (const user of users) {
    const rawPass = user.password;
    if (!rawPass) continue;

    const isBcrypt = typeof rawPass === 'string' && /^\$2[abxy]\$\d+\$/.test(rawPass);

    if (isBcrypt) {
      alreadyHashedCount++;
      console.log(`- [ALREADY SECURED] ${user.email} (${user.role}) - CandidateID: ${user.candidateId || 'N/A'}`);
    } else {
      const hashed = await bcrypt.hash(rawPass, 10);
      user.password = hashed;
      user.updatedAt = new Date().toISOString();
      migratedCount++;
      console.log(`✔ [MIGRATED] Hashed password for ${user.email} (${user.role}) - CandidateID: ${user.candidateId || 'N/A'}`);
    }
  }

  // Safely write back to users.json
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

  console.log('----------------------------------------------------');
  console.log(`Migration complete: ${migratedCount} passwords hashed, ${alreadyHashedCount} already secure. Total: ${users.length}`);
  console.log('====================================================');

  return { migratedCount, alreadyHashedCount, totalUsers: users.length };
}

// Run directly if invoked via CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  migratePasswords()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}

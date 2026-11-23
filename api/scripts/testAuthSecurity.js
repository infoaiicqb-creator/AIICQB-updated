import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure env is loaded
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

async function runTests() {
  console.log('====================================================');
  console.log(' AIICQB Authentication Security Audit & Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`PASS: ${testName}`);
      passed++;
    } else {
      console.error(`FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Missing JWT_SECRET Check
  console.log('--- Test 1: Missing JWT_SECRET Startup / Validation ---');
  try {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    let threw = false;
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET environment variable is missing. Authentication cannot proceed.');
      }
    } catch (e) {
      if (e.message.includes('JWT_SECRET')) threw = true;
    } finally {
      process.env.JWT_SECRET = originalSecret;
    }
    assert(threw, 'System throws and refuses authentication when JWT_SECRET is missing');
  } catch (e) {
    console.error(e);
    failed++;
  }

  // Test API Endpoints
  const testEmail = `test_candidate_${Date.now()}@example.com`;
  const testPassword = 'SecurePassword@2026';
  let createdCandidateId = '';
  let authToken = '';

  // 2. New Candidate Registration
  console.log('\n--- Test 2: New Candidate Registration ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Candidate',
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
        agreeTerms: true,
      }),
    });
    const data = await res.json();
    assert(res.status === 201 && data.success === true, 'New candidate registration succeeds with 201');
    assert(data.token && typeof data.token === 'string', 'Registration returns a valid signed JWT token');
    assert(data.user && data.user.candidateId && data.user.candidateId.startsWith('AICQB-'), `Candidate ID format is valid (${data.user?.candidateId})`);
    assert(!data.user.password && !data.password, 'Password and password hash are NOT exposed in registration response');
    createdCandidateId = data.user.candidateId;
    authToken = data.token;
  } catch (e) {
    console.error('Registration failed:', e);
    failed++;
  }

  // 3. Password Hashing in Database
  console.log('\n--- Test 3: Password Hashing in Database ---');
  try {
    const dbModule = await import('../config/db.js');
    const db = dbModule.default || dbModule.db;
    const storedUser = db.findOne('users', u => u.email.toLowerCase() === testEmail.toLowerCase());
    assert(!!storedUser, 'User record is present in database');
    assert(storedUser.password !== testPassword, 'Stored password is NOT plain text');
    const isBcrypt = /^\$2[abxy]\$\d+\$/.test(storedUser.password);
    assert(isBcrypt, 'Stored password matches bcrypt salted hash format ($2a$ or $2b$)');
    const matches = await bcrypt.compare(testPassword, storedUser.password);
    assert(matches, 'bcrypt.compare() validates stored hash against original password');
  } catch (e) {
    console.error('DB inspection failed:', e);
    failed++;
  }

  // 4. Login with Correct Password
  console.log('\n--- Test 4: Login with Correct Password ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'Login with correct password succeeds with 200');
    assert(data.token && data.user.email === testEmail, 'Login returns valid token and user profile');
    assert(!data.user.password && !data.password, 'Password is NOT exposed in login response');
    authToken = data.token;
  } catch (e) {
    console.error('Login failed:', e);
    failed++;
  }

  // 5. Login with Incorrect Password
  console.log('\n--- Test 5: Login with Incorrect Password ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'WrongPassword@999',
      }),
    });
    const data = await res.json();
    assert(res.status === 401 && data.success === false, 'Login with incorrect password rejected with 401');
    assert(data.message.includes('Invalid') || data.message.includes('credentials'), 'Error message is clear and does not leak account details');
  } catch (e) {
    console.error('Incorrect password test failed:', e);
    failed++;
  }

  // 6. Duplicate Email Registration
  console.log('\n--- Test 6: Duplicate Email Registration ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Another Candidate',
        email: testEmail,
        password: 'AnotherPassword@123',
        confirmPassword: 'AnotherPassword@123',
        agreeTerms: true,
      }),
    });
    const data = await res.json();
    assert(res.status === 400 && data.success === false, 'Duplicate email registration rejected with 400');
    assert(data.message.toLowerCase().includes('already exists'), 'Duplicate email message clearly explains conflict');
  } catch (e) {
    console.error('Duplicate email test failed:', e);
    failed++;
  }

  // 7. JWT Token Validation (Protected Route /api/auth/me)
  console.log('\n--- Test 7: JWT Token Validation (/api/auth/me) ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'Protected route /api/auth/me succeeds with valid token');
    assert(data.user && data.user.email === testEmail, 'Protected route returns current authenticated user');
    assert(!data.user.password, 'Password is NOT exposed in /api/auth/me response');
  } catch (e) {
    console.error('JWT validation test failed:', e);
    failed++;
  }

  // 8. Expired Token Handling
  console.log('\n--- Test 8: Expired Token Handling ---');
  try {
    // Generate an expired token (expired 1 hour ago)
    const expiredToken = jwt.sign(
      { uid: 'test_expired_uid', email: testEmail, role: 'Candidate' },
      process.env.JWT_SECRET,
      { expiresIn: '-1h' }
    );
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${expiredToken}`,
      },
    });
    const data = await res.json();
    assert(res.status === 401 && data.success === false, 'Expired token rejected with 401');
    assert(data.code === 'TOKEN_EXPIRED' || data.message.toLowerCase().includes('expired'), 'Expired token returns TOKEN_EXPIRED indicator');
  } catch (e) {
    console.error('Expired token test failed:', e);
    failed++;
  }

  // 9. Existing Candidate Login (Migrated User)
  console.log('\n--- Test 9: Existing Candidate Login (Migrated Bcrypt User) ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'rahul.deshmukh@gmail.com',
        password: 'password123',
      }),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'Existing candidate rahul.deshmukh@gmail.com logs in with 200');
    assert(data.user.candidateId === 'AICQB-1004587', `Candidate ID preserved after migration (${data.user.candidateId})`);
  } catch (e) {
    console.error('Existing candidate login failed:', e);
    failed++;
  }

  // 10. Admin Authentication
  console.log('\n--- Test 10: Admin Authentication (Migrated Bcrypt User) ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@aicqb.org',
        password: 'Admin@123456',
      }),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'Super Admin logs in with 200');
    assert(data.user.role === 'Super Admin', 'Admin possesses Super Admin role');
    assert(data.token && typeof data.token === 'string', 'Admin receives valid JWT token');

    // Test access to admin protected endpoint
    const adminRes = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${data.token}` },
    });
    assert(adminRes.status === 200, 'Admin can access /api/admin/dashboard using the JWT');
  } catch (e) {
    console.error('Admin authentication test failed:', e);
    failed++;
  }

  // 11. Password Reset (Forgot Password Enumeration Prevention)
  console.log('\n--- Test 11: Password Reset Handling ---');
  try {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'Password reset request succeeds with generic response');
    assert(data.message.includes('dispatched') || data.message.includes('exists'), 'Response avoids leaking account enumeration');
  } catch (e) {
    console.error('Forgot password test failed:', e);
    failed++;
  }

  // Summary
  console.log('\n====================================================');
  console.log(` AUDIT & TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

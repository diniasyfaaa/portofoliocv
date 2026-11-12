// ──────────────────────────────────────────────
//  UNIT TESTS: FORM VALIDATION
// ──────────────────────────────────────────────

const assert = require('assert');

// Ported validation functions for direct Node test runner
function validateName(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Nama tidak boleh kosong.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Nama minimal 3 karakter.' };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: 'Nama maksimal 60 karakter.' };
  }
  const nameRegex = /^[a-zA-Z\s'-.]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'Nama hanya boleh mengandung huruf dan spasi.' };
  }
  return { isValid: true };
}

function validateEmail(email) {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email tidak boleh kosong.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Format email tidak valid (contoh: nama@domain.com).' };
  }
  return { isValid: true };
}

function validateMessage(message) {
  const trimmed = (message || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Pesan tidak boleh kosong.' };
  }
  if (trimmed.length < 10) {
    return { isValid: false, error: 'Pesan terlalu singkat (minimal 10 karakter).' };
  }
  if (trimmed.length > 1000) {
    return { isValid: false, error: 'Pesan maksimal 1000 karakter.' };
  }
  return { isValid: true };
}

function runValidationTests() {
  console.log('🧪 Testing Validation Utilities...');

  // Test 1: Valid Name
  const validName = validateName('Dini Asyfa');
  assert.strictEqual(validName.isValid, true, 'Valid name should pass');

  // Test 2: Name too short
  const shortName = validateName('Di');
  assert.strictEqual(shortName.isValid, false, 'Name < 3 chars should fail');
  assert.ok(shortName.error.includes('minimal 3'), 'Error should mention minimum 3 chars');

  // Test 3: Name empty
  const emptyName = validateName('');
  assert.strictEqual(emptyName.isValid, false, 'Empty name should fail');

  // Test 4: Name with invalid symbols/numbers
  const invalidName = validateName('Dini123!');
  assert.strictEqual(invalidName.isValid, false, 'Name with numbers/symbols should fail');

  // Test 5: Valid Email
  const validEmail = validateEmail('diniasyfa@masoem.ac.id');
  assert.strictEqual(validEmail.isValid, true, 'Valid university email should pass');

  // Test 6: Invalid Email (no domain extension)
  const invalidEmail = validateEmail('diniasyfa@gmail');
  assert.strictEqual(invalidEmail.isValid, false, 'Email without extension should fail');

  // Test 7: Empty Email
  const emptyEmail = validateEmail('');
  assert.strictEqual(emptyEmail.isValid, false, 'Empty email should fail');

  // Test 8: Valid Message
  const validMsg = validateMessage('Halo Dini, saya tertarik berkolaborasi dalam proyek UI/UX design ini.');
  assert.strictEqual(validMsg.isValid, true, 'Proper length message should pass');

  // Test 9: Message too short
  const shortMsg = validateMessage('Halo');
  assert.strictEqual(shortMsg.isValid, false, 'Message < 10 chars should fail');

  // Test 10: Empty Message
  const emptyMsg = validateMessage('');
  assert.strictEqual(emptyMsg.isValid, false, 'Empty message should fail');

  console.log('  ✓ 10/10 validation test cases passed successfully!');
}

module.exports = { runValidationTests };

// ──────────────────────────────────────────────
//  UNIT TESTS: MOCK API & LMS INTEGRATION
// ──────────────────────────────────────────────

const assert = require('assert');
const profileRaw = require('../src/data/profile.json');
const portfolioRaw = require('../src/data/portfolio.json');
const academicRaw = require('../src/data/academic.json');

async function runApiTests() {
  console.log('🧪 Testing Mock API & LMS Integration Service...');

  // Test 1: Verify Profile Data Integrity
  assert.ok(profileRaw.nama, 'Profile must have nama');
  assert.ok(profileRaw.nim, 'Profile must have nim');
  assert.strictEqual(profileRaw.nim, '242505008');
  assert.ok(Array.isArray(profileRaw.pengalaman), 'Pengalaman must be an array');
  assert.ok(profileRaw.pengalaman.length >= 3, 'Must have at least 3 experiences');

  // Test 2: Verify Portfolio Data Structure
  assert.ok(Array.isArray(portfolioRaw), 'Portfolio must be an array');
  assert.ok(portfolioRaw.length >= 4, 'Portfolio must have at least 4 items');
  for (const item of portfolioRaw) {
    assert.ok(item.id, 'Item must have id');
    assert.ok(item.judul, 'Item must have judul');
    assert.ok(item.kategori, 'Item must have kategori');
    assert.ok(Array.isArray(item.tools), 'Item tools must be an array');
  }

  // Test 3: Portfolio Filtering by Category
  const brandingItems = portfolioRaw.filter((p) => p.kategori.toLowerCase() === 'branding');
  assert.ok(brandingItems.length > 0, 'Should find branding items');
  for (const item of brandingItems) {
    assert.strictEqual(item.kategori, 'Branding');
  }

  // Test 4: Portfolio Search by Keyword
  const figmaItems = portfolioRaw.filter(
    (p) =>
      p.judul.toLowerCase().includes('figma') ||
      p.tools.some((t) => t.toLowerCase().includes('figma'))
  );
  assert.ok(figmaItems.length > 0, 'Should find items using Figma tool');

  // Test 5: Verify Academic Data Structure
  assert.ok(academicRaw.identitas, 'Academic data must have identitas');
  assert.ok(academicRaw.currentScore, 'Academic data must have currentScore');
  assert.ok(typeof academicRaw.currentScore.nilai === 'number');
  assert.strictEqual(academicRaw.currentScore.grade, 'A');
  assert.ok(Array.isArray(academicRaw.learningProgress), 'Learning progress must be array');

  console.log('  ✓ 5/5 API & Data integrity test cases passed successfully!');
}

module.exports = { runApiTests };

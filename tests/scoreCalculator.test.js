// ──────────────────────────────────────────────
//  UNIT TESTS: ACADEMIC SCORE & TARGET SIMULATOR
// ──────────────────────────────────────────────

const assert = require('assert');

const GRADE_SCALES = [
  { minScore: 85, grade: 'A',  gpa: 4.0, description: 'Sangat Memuaskan' },
  { minScore: 80, grade: 'A-', gpa: 3.7, description: 'Memuaskan' },
  { minScore: 75, grade: 'B+', gpa: 3.3, description: 'Sangat Baik' },
  { minScore: 70, grade: 'B',  gpa: 3.0, description: 'Baik' },
  { minScore: 65, grade: 'B-', gpa: 2.7, description: 'Cukup Baik' },
  { minScore: 60, grade: 'C+', gpa: 2.3, description: 'Cukup' },
  { minScore: 55, grade: 'C',  gpa: 2.0, description: 'Sedang' },
  { minScore: 40, grade: 'D',  gpa: 1.0, description: 'Kurang' },
  { minScore: 0,  grade: 'E',  gpa: 0.0, description: 'Gagal' },
];

function calculateGrade(score) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  for (const item of GRADE_SCALES) {
    if (clamped >= item.minScore) {
      return { grade: item.grade, gpa: item.gpa, description: item.description };
    }
  }
  return { grade: 'E', gpa: 0.0, description: 'Gagal' };
}

function calculateAverageProgress(progressList) {
  if (!progressList || progressList.length === 0) return 0;
  const sum = progressList.reduce((acc, curr) => acc + curr.value, 0);
  return Math.round(sum / progressList.length);
}

function simulateRequiredFinalScore(
  currentScore,
  targetGrade,
  currentWeight = 0.6,
  finalWeight = 0.4
) {
  const target = GRADE_SCALES.find((g) => g.grade === targetGrade);
  const targetMin = target ? target.minScore : 85;

  const currentContribution = currentScore * currentWeight;
  const rawRequired = (targetMin - currentContribution) / finalWeight;
  const requiredScore = Math.max(0, Math.ceil(rawRequired));

  return {
    requiredScore,
    isAchievable: requiredScore <= 100,
  };
}

function runScoreCalculatorTests() {
  console.log('🧪 Testing Score & Academic Calculations...');

  // Test 1: Grade A calculation (score >= 85)
  const gradeA = calculateGrade(89);
  assert.strictEqual(gradeA.grade, 'A');
  assert.strictEqual(gradeA.gpa, 4.0);

  // Test 2: Grade B+ calculation (score 77)
  const gradeBPlus = calculateGrade(77);
  assert.strictEqual(gradeBPlus.grade, 'B+');
  assert.strictEqual(gradeBPlus.gpa, 3.3);

  // Test 3: Grade E calculation (score 25)
  const gradeE = calculateGrade(25);
  assert.strictEqual(gradeE.grade, 'E');
  assert.strictEqual(gradeE.gpa, 0.0);

  // Test 4: Average progress calculation
  const progressList = [
    { label: 'Attendance', value: 100 },
    { label: 'Practice', value: 87 },
    { label: 'Quest', value: 95 },
    { label: 'Challenge', value: 100 },
  ];
  const avg = calculateAverageProgress(progressList);
  // (100 + 87 + 95 + 100) / 4 = 382 / 4 = 95.5 -> round to 96
  assert.strictEqual(avg, 96, 'Average progress calculation should be 96%');

  // Test 5: Target simulation for achievable target
  // currentScore = 89, target = 'A' (min 85)
  // requiredScore: (85 - (89 * 0.6)) / 0.4 = (85 - 53.4) / 0.4 = 31.6 / 0.4 = 79
  const simA = simulateRequiredFinalScore(89, 'A');
  assert.strictEqual(simA.requiredScore, 79);
  assert.strictEqual(simA.isAchievable, true);

  // Test 6: Target simulation for low score trying to reach 'A'
  // currentScore = 50, target = 'A' (min 85)
  // requiredScore: (85 - (50 * 0.6)) / 0.4 = (85 - 30) / 0.4 = 55 / 0.4 = 137.5 -> 138 > 100
  const simUnachievable = simulateRequiredFinalScore(50, 'A');
  assert.strictEqual(simUnachievable.isAchievable, false);

  console.log('  ✓ 6/6 score calculation test cases passed successfully!');
}

module.exports = { runScoreCalculatorTests };

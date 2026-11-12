// ──────────────────────────────────────────────
//  AUTOMATED TEST SUITE RUNNER (LEVEL 10)
// ──────────────────────────────────────────────

const { runValidationTests } = require('./validation.test');
const { runScoreCalculatorTests } = require('./scoreCalculator.test');
const { runApiTests } = require('./api.test');

async function runAllTests() {
  console.log('========================================================');
  console.log('  🚀 RUNNING AUTOMATED UNIT TEST SUITE (LEVEL 10)       ');
  console.log('========================================================\n');

  const startTime = Date.now();
  let passedSuites = 0;
  const totalSuites = 3;

  try {
    runValidationTests();
    passedSuites++;
    console.log('');

    runScoreCalculatorTests();
    passedSuites++;
    console.log('');

    await runApiTests();
    passedSuites++;
    console.log('');

    const elapsed = Date.now() - startTime;
    console.log('========================================================');
    console.log(`  🎉 ALL TEST SUITES PASSED! (${passedSuites}/${totalSuites}) in ${elapsed}ms`);
    console.log('  ✓ Level 10 Testing Requirement: COMPLETED');
    console.log('========================================================');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ TEST SUITE FAILED:');
    console.error(err);
    process.exit(1);
  }
}

runAllTests();

// ──────────────────────────────────────────────
//  ACADEMIC CALCULATION UTILITIES (LEVEL 10)
// ──────────────────────────────────────────────

export interface GradeScale {
  minScore: number;
  grade: string;
  gpa: number;
  description: string;
}

export const GRADE_SCALES: GradeScale[] = [
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

export function calculateGrade(score: number): { grade: string; gpa: number; description: string } {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  for (const item of GRADE_SCALES) {
    if (clamped >= item.minScore) {
      return { grade: item.grade, gpa: item.gpa, description: item.description };
    }
  }
  return { grade: 'E', gpa: 0.0, description: 'Gagal' };
}

export function calculateAverageProgress(progressList: { value: number }[]): number {
  if (!progressList || progressList.length === 0) return 0;
  const sum = progressList.reduce((acc, curr) => acc + curr.value, 0);
  return Math.round(sum / progressList.length);
}

export function simulateRequiredFinalScore(
  currentScore: number,
  targetGrade: 'A' | 'A-' | 'B+' | 'B',
  currentWeight: number = 0.6,
  finalWeight: number = 0.4
): { requiredScore: number; isAchievable: boolean } {
  const target = GRADE_SCALES.find((g) => g.grade === targetGrade);
  const targetMin = target ? target.minScore : 85;

  // Formula: targetMin = (currentScore * currentWeight) + (requiredScore * finalWeight)
  // requiredScore = (targetMin - (currentScore * currentWeight)) / finalWeight
  const currentContribution = currentScore * currentWeight;
  const rawRequired = (targetMin - currentContribution) / finalWeight;
  const requiredScore = Math.max(0, Math.ceil(rawRequired));

  return {
    requiredScore,
    isAchievable: requiredScore <= 100,
  };
}

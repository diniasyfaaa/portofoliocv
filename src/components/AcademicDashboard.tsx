import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import SectionCard from './SectionCard';
import ProgressItem from './ProgressItem';

// ──────────────────────────────────────────────
//  TYPES
// ──────────────────────────────────────────────
type Identitas = {
  nama: string;
  nim: string;
  mataKuliah: string;
  dosen: string;
};
type CurrentScore = { nilai: number; grade: string };
type ProgressEntry = { label: string; value: number };
type AcademicDashboardProps = {
  identitas: Identitas;
  currentScore: CurrentScore;
  learningPoints: number;
  learningProgress: ProgressEntry[];
};

// Subtle monochrome progression shades
const PROGRESS_SHADES = ['#18181b', '#3f3f46', '#52525b', '#71717a'];
const PROGRESS_SHADES_DARK = ['#fafafa', '#e4e4e7', '#d4d4d8', '#a1a1aa'];

// ──────────────────────────────────────────────
//  COMPONENT (Monochrome Black & White)
// ──────────────────────────────────────────────
export default function AcademicDashboard({
  identitas,
  currentScore,
  learningPoints,
  learningProgress,
}: AcademicDashboardProps) {
  const theme = useTheme();

  // ── Animated score counter ──
  const [displayScore, setDisplayScore] = useState(0);
  const [displayLP, setDisplayLP] = useState(0);
  useEffect(() => {
    const scoreAnim = new Animated.Value(0);
    const lpAnim = new Animated.Value(0);

    scoreAnim.addListener(({ value }) => setDisplayScore(Math.round(value)));
    lpAnim.addListener(({ value }) => setDisplayLP(Math.round(value)));

    Animated.parallel([
      Animated.timing(scoreAnim, {
        toValue: currentScore.nilai,
        duration: 1400,
        delay: 400,
        useNativeDriver: false,
      }),
      Animated.timing(lpAnim, {
        toValue: learningPoints,
        duration: 1600,
        delay: 400,
        useNativeDriver: false,
      }),
    ]).start();

    return () => {
      scoreAnim.removeAllListeners();
      lpAnim.removeAllListeners();
    };
  }, [currentScore.nilai, learningPoints]);

  const shades = theme.isDark ? PROGRESS_SHADES_DARK : PROGRESS_SHADES;

  return (
    <SectionCard title="My Score" collapsible defaultOpen>
      {/* ── Identitas Akademik ── */}
      <View
        style={[
          styles.identitasBox,
          {
            backgroundColor: theme.surface,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <Text style={[styles.subSectionTitle, { color: theme.textMuted }]}>
          Identitas Akademik
        </Text>
        <View style={styles.identitasGrid}>
          {[
            { key: 'Nama', val: identitas.nama },
            { key: 'NIM', val: identitas.nim },
            { key: 'Mata Kuliah', val: identitas.mataKuliah },
            { key: 'Dosen', val: identitas.dosen },
          ].map(({ key, val }) => (
            <View key={key} style={styles.identitasItem}>
              <Text style={[styles.identitasKey, { color: theme.textMuted }]}>
                {key}
              </Text>
              <Text style={[styles.identitasVal, { color: theme.text }]}>
                {val}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Current Score Row ── */}
      <View style={styles.scoreRow}>
        <View
          style={[
            styles.scoreCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.scoreLabel, { color: theme.textMuted }]}>
            NILAI
          </Text>
          <Text style={[styles.scoreValue, { color: theme.text }]}>
            {displayScore}
          </Text>
        </View>

        <View
          style={[
            styles.scoreCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.scoreLabel, { color: theme.textMuted }]}>
            GRADE
          </Text>
          <Text style={[styles.scoreValue, { color: theme.text }]}>
            {currentScore.grade}
          </Text>
        </View>

        <View
          style={[
            styles.scoreCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.scoreLabel, { color: theme.textMuted }]}>
            TOTAL LP
          </Text>
          <Text style={[styles.scoreValueSmall, { color: theme.text }]}>
            {displayLP.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* ── Learning Progress ── */}
      <Text
        style={[
          styles.subSectionTitle,
          { color: theme.textMuted, marginBottom: 14 },
        ]}
      >
        Learning Progress
      </Text>
      {learningProgress.map((item, i) => (
        <ProgressItem
          key={item.label}
          label={item.label}
          value={item.value}
          color={shades[i % shades.length]}
        />
      ))}
    </SectionCard>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  subSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  identitasBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 18,
  },
  identitasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  identitasItem: {
    flex: 1,
    minWidth: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  identitasKey: { fontSize: 13, flex: 1 },
  identitasVal: { fontSize: 13, fontWeight: '700', flex: 2, textAlign: 'right' },
  scoreRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  scoreCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
  },
  scoreValueSmall: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 36,
  },
});

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCVData } from '../context/CVContext';
import ScreenContainer from '../components/navigation/ScreenContainer';
import SectionCard from '../components/SectionCard';
import ProgressItem from '../components/ProgressItem';
import { simulateRequiredFinalScore } from '../utils/scoreCalculator';

const TARGET_OPTIONS: ('A' | 'A-' | 'B+' | 'B')[] = ['A', 'A-', 'B+', 'B'];

export default function ScoreScreen() {
  const theme = useTheme();
  const { cvData, refresh } = useCVData();
  const [selectedTarget, setSelectedTarget] = useState<'A' | 'A-' | 'B+' | 'B'>('A');

  if (!cvData) return null;
  const { academic } = cvData;

  const simulation = simulateRequiredFinalScore(
    academic.currentScore.nilai,
    selectedTarget
  );

  return (
    <ScreenContainer
      title="My Score"
      subtitle="Academic War LMS Dashboard & Target Grade Simulator"
    >
      {/* ── 1. Identitas Akademik Mahasiswi ── */}
      <SectionCard title="Identitas Akademik & Status Perkuliahan" collapsible defaultOpen>
        <View style={styles.identitasGrid}>
          {[
            { label: 'Nama Mahasiswi', value: academic.identitas.nama },
            { label: 'Nomor Induk Mahasiswa (NIM)', value: academic.identitas.nim },
            { label: 'Mata Kuliah', value: academic.identitas.mataKuliah },
            { label: 'Dosen Pengampu', value: academic.identitas.dosen },
            { label: 'Semester Berjalan', value: academic.identitas.semester },
            { label: 'Indeks Prestasi Kumulatif (IPK)', value: `${academic.identitas.ipk} / 4.00` },
          ].map((item, i) => (
            <View
              key={i}
              style={[
                styles.identitasCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={[styles.idLabel, { color: theme.textMuted }]}>
                {item.label}
              </Text>
              <Text style={[styles.idValue, { color: theme.text }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* ── 2. Current Score Overview Cards ── */}
      <SectionCard title="Ringkasan Nilai & Poin LMS" collapsible defaultOpen>
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
              NILAI SEMENTARA
            </Text>
            <Text style={[styles.scoreValue, { color: theme.text }]}>
              {academic.currentScore.nilai}
            </Text>
            <Text style={[styles.scoreSub, { color: theme.textMuted }]}>
              Skala 0 - 100
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
              PREDIKSI GRADE
            </Text>
            <Text style={[styles.scoreValue, { color: theme.text }]}>
              {academic.currentScore.grade}
            </Text>
            <Text style={[styles.scoreSub, { color: theme.textMuted }]}>
              Sangat Memuaskan
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
              TOTAL LEARNING POINTS
            </Text>
            <Text style={[styles.scoreValue, { color: theme.text }]}>
              {academic.learningPoints.toLocaleString()}
            </Text>
            <Text style={[styles.scoreSub, { color: theme.textMuted }]}>
              Akumulasi Poin LMS
            </Text>
          </View>
        </View>
      </SectionCard>

      {/* ── 3. Learning Progress Breakdown ── */}
      <SectionCard title="Detail Progres Pembelajaran (Learning Progress)" collapsible defaultOpen>
        <View style={styles.progressContainer}>
          {academic.learningProgress.map((item) => (
            <ProgressItem
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </View>
      </SectionCard>

      {/* ── 4. Target Grade Simulator (Level 10 Industry Feature) ── */}
      <SectionCard title="Target Grade & Final Exam Simulator" collapsible defaultOpen>
        <Text style={[styles.simIntro, { color: theme.textMuted }]}>
          Pilih target grade akhir Anda untuk menghitung skor minimum Ujian Akhir Semester (UAS) yang harus diraih:
        </Text>

        <View style={styles.targetRow}>
          {TARGET_OPTIONS.map((t) => {
            const active = selectedTarget === t;
            return (
              <TouchableOpacity
                key={t}
                style={[
                  styles.targetBtn,
                  {
                    backgroundColor: active ? theme.text : theme.surface,
                    borderColor: active ? theme.text : theme.cardBorder,
                  },
                ]}
                onPress={() => setSelectedTarget(t)}
                accessibilityRole="button"
                accessibilityLabel={`Pilih target grade ${t}`}
              >
                <Text
                  style={[
                    styles.targetBtnText,
                    { color: active ? theme.primaryBtnText : theme.text },
                  ]}
                >
                  Grade {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={[
            styles.simResultCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.simResultCol}>
            <Text style={[styles.simResultLabel, { color: theme.textMuted }]}>
              Skor Minimum UAS Diperlukan:
            </Text>
            <Text style={[styles.simResultScore, { color: theme.text }]}>
              {simulation.requiredScore} / 100
            </Text>
            <Text style={[styles.simStatusText, { color: simulation.isAchievable ? theme.text : '#ef4444' }]}>
              {simulation.isAchievable
                ? `✓ Target Grade ${selectedTarget} realistis dan dapat dicapai dengan performa UAS yang baik.`
                : `✕ Skor melebihi 100. Target ${selectedTarget} membutuhkan tugas perbaikan tambahan.`}
            </Text>
          </View>
        </View>

        {/* Sync Button */}
        <TouchableOpacity
          style={[styles.syncBtn, { borderColor: theme.cardBorder, backgroundColor: theme.card }]}
          onPress={() => refresh()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Sinkronkan data dengan LMS"
        >
          <Text style={[styles.syncBtnText, { color: theme.text }]}>
            🔄 Sinkronkan Ulang Data LMS
          </Text>
        </TouchableOpacity>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  identitasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  identitasCard: {
    flex: 1,
    minWidth: 240,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  idLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  idValue: {
    fontSize: 14,
    fontWeight: '700',
  },

  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  scoreCard: {
    flex: 1,
    minWidth: 200,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,
  },
  scoreSub: {
    fontSize: 11,
    marginTop: 4,
  },

  progressContainer: {
    paddingVertical: 8,
  },

  simIntro: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  targetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  targetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
  },
  targetBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  simResultCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  simResultCol: {
    alignItems: 'center',
  },
  simResultLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  simResultScore: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 6,
  },
  simStatusText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 19,
  },
  syncBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  syncBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});

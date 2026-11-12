import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCVData } from '../context/CVContext';
import ScreenContainer from '../components/navigation/ScreenContainer';
import SectionCard from '../components/SectionCard';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';

// Tool proficiencies for enhanced industry presentation
const TOOL_PROFICIENCY: Record<string, { level: string; percent: number }> = {
  Figma: { level: 'Advanced', percent: 92 },
  Canva: { level: 'Advanced', percent: 95 },
  Affinity: { level: 'Intermediate', percent: 80 },
  'Adobe Photoshop': { level: 'Advanced', percent: 88 },
  'Adobe Illustrator': { level: 'Advanced', percent: 85 },
  Capcut: { level: 'Advanced', percent: 90 },
  Wireframing: { level: 'Advanced', percent: 85 },
  Prototyping: { level: 'Intermediate', percent: 82 },
  'UI Design': { level: 'Advanced', percent: 88 },
  'Design System': { level: 'Intermediate', percent: 78 },
};

export default function SkillsScreen() {
  const theme = useTheme();
  const { cvData } = useCVData();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredKemampuan = useMemo(() => {
    const list = cvData?.profile.kemampuan || [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((item) => item.toLowerCase().includes(q));
  }, [cvData?.profile.kemampuan, search]);

  const filteredKeahlian = useMemo(() => {
    const list = cvData?.profile.keahlian || [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((item) => item.toLowerCase().includes(q));
  }, [cvData?.profile.keahlian, search]);

  if (!cvData) return null;

  const noResults = filteredKemampuan.length === 0 && filteredKeahlian.length === 0;

  return (
    <ScreenContainer
      title="Skills"
      subtitle="Keterampilan Non-Teknis, Alat Desain, & Tingkat Kemahiran"
    >
      {/* ── Search Bar ── */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Cari kemampuan atau software (contoh: Figma, Desain, Riset)..."
        onClear={() => setSearch('')}
      />

      {noResults ? (
        <EmptyState
          title="Keterampilan Tidak Ditemukan"
          description={`Tidak ada keterampilan atau software yang cocok dengan pencarian "${search}".`}
          actionText="Tampilkan Semua Keterampilan"
          onAction={() => setSearch('')}
        />
      ) : (
        <>
          {/* ── 1. Soft Skills & Kemampuan Kolaboratif ── */}
          {filteredKemampuan.length > 0 && (
            <SectionCard title="Kemampuan Umum & Karakteristik" collapsible defaultOpen>
              <View style={styles.kemampuanGrid}>
                {filteredKemampuan.map((item, i) => (
                  <View
                    key={i}
                    style={[
                      styles.kemampuanCard,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.cardBorder,
                      },
                    ]}
                  >
                    <View style={[styles.bulletDot, { backgroundColor: theme.text }]} />
                    <Text style={[styles.kemampuanText, { color: theme.text }]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </SectionCard>
          )}

          {/* ── 2. Technical Tools & Proficiency ── */}
          {filteredKeahlian.length > 0 && (
            <SectionCard title="Keahlian Software & Creative Tools" collapsible defaultOpen>
              <Text style={[styles.toolsIntro, { color: theme.textMuted }]}>
                Ketuk salah satu alat desain untuk melihat detail tingkat kemahiran:
              </Text>

              <View style={styles.tagGrid}>
                {filteredKeahlian.map((tag) => {
                  const isSelected = selectedTag === tag;
                  const prof = TOOL_PROFICIENCY[tag] || { level: 'Proficient', percent: 80 };

                  return (
                    <Pressable
                      key={tag}
                      style={({ pressed }) => [
                        styles.tagCard,
                        {
                          backgroundColor: isSelected
                            ? theme.text
                            : pressed
                            ? theme.cardBorder
                            : theme.surface,
                          borderColor: isSelected ? theme.text : theme.cardBorder,
                        },
                      ]}
                      onPress={() => setSelectedTag(isSelected ? null : tag)}
                      accessibilityRole="button"
                      accessibilityLabel={`Skill ${tag}, tingkat ${prof.level}`}
                    >
                      <View style={styles.tagHeader}>
                        <Text
                          style={[
                            styles.tagName,
                            { color: isSelected ? theme.primaryBtnText : theme.text },
                          ]}
                        >
                          {tag}
                        </Text>
                        <Text
                          style={[
                            styles.tagLevel,
                            { color: isSelected ? theme.primaryBtnText : theme.textMuted },
                          ]}
                        >
                          {prof.level}
                        </Text>
                      </View>

                      {/* Mini Bar */}
                      <View
                        style={[
                          styles.barTrack,
                          {
                            backgroundColor: isSelected
                              ? 'rgba(255, 255, 255, 0.25)'
                              : theme.cardBorder,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.barFill,
                            {
                              width: `${prof.percent}%`,
                              backgroundColor: isSelected
                                ? theme.primaryBtnText
                                : theme.text,
                            },
                          ]}
                        />
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </SectionCard>
          )}
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  kemampuanGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kemampuanCard: {
    flex: 1,
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  kemampuanText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  toolsIntro: {
    fontSize: 13,
    marginBottom: 16,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tagCard: {
    flex: 1,
    minWidth: 200,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  tagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagName: {
    fontSize: 14,
    fontWeight: '700',
  },
  tagLevel: {
    fontSize: 11,
    fontWeight: '600',
  },
  barTrack: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});

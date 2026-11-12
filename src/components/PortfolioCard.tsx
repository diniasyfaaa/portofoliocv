import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// ──────────────────────────────────────────────
//  PROPS
// ──────────────────────────────────────────────
type PortfolioCardProps = {
  judul: string;
  kategori: string;
  deskripsi: string;
  tools: string[];
  warna?: string;
  tahun: string;
};

// ──────────────────────────────────────────────
//  COMPONENT (Dominantly Monochrome Black & White)
// ──────────────────────────────────────────────
export default function PortfolioCard({
  judul,
  kategori,
  deskripsi,
  tools,
  warna = '#09090b',
  tahun,
}: PortfolioCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: pressed ? theme.text : theme.cardBorder,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      {/* Top subtle accent strip */}
      <View
        style={[
          styles.strip,
          { backgroundColor: warna ? warna : theme.text },
        ]}
      />

      <View style={styles.body}>
        {/* Category + Year */}
        <View style={styles.meta}>
          <View
            style={[
              styles.kategoriChip,
              {
                backgroundColor: theme.surface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {/* Small accent dot */}
            <View style={[styles.accentDot, { backgroundColor: warna }]} />
            <Text style={[styles.kategoriText, { color: theme.text }]}>
              {kategori}
            </Text>
          </View>
          <Text style={[styles.tahun, { color: theme.textMuted }]}>{tahun}</Text>
        </View>

        {/* Title */}
        <Text style={[styles.judul, { color: theme.text }]}>{judul}</Text>

        {/* Description */}
        <Text
          style={[styles.deskripsi, { color: theme.textMuted }]}
          numberOfLines={3}
        >
          {deskripsi}
        </Text>

        {/* Tools */}
        <View style={styles.toolsRow}>
          {tools.map((t) => (
            <View
              key={t}
              style={[
                styles.tool,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Text style={[styles.toolText, { color: theme.text }]}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    width: 290,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  strip: {
    height: 4,
    width: '100%',
  },
  body: {
    padding: 16,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  kategoriChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 6,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  kategoriText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  tahun: {
    fontSize: 11,
    fontWeight: '600',
  },
  judul: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  deskripsi: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tool: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  toolText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

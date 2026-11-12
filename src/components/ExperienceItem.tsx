import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// ──────────────────────────────────────────────
//  PROPS
// ──────────────────────────────────────────────
type ExperienceItemProps = {
  role: string;
  organization: string;
  period: string;
  isLast?: boolean;
};

// ──────────────────────────────────────────────
//  COMPONENT (Monochrome Black & White)
// ──────────────────────────────────────────────
export default function ExperienceItem({
  role,
  organization,
  period,
  isLast = false,
}: ExperienceItemProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {/* Timeline indicator */}
      <View style={styles.timeline}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: theme.text,
              borderColor: theme.cardBorder,
            },
          ]}
        />
        {!isLast && (
          <View style={[styles.line, { backgroundColor: theme.cardBorder }]} />
        )}
      </View>

      {/* Content */}
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.titleCol}>
            <Text style={[styles.role, { color: theme.text }]}>{role}</Text>
            <Text style={[styles.org, { color: theme.textMuted }]}>
              {organization}
            </Text>
          </View>
          <View
            style={[
              styles.periodBadge,
              {
                backgroundColor: theme.surface,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.period, { color: theme.textMuted }]}>
              {period}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  // ── Timeline ──
  timeline: {
    alignItems: 'center',
    width: 20,
    marginRight: 14,
    paddingTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  line: {
    flex: 1,
    width: 2,
    marginTop: 4,
    marginBottom: -4,
  },

  // ── Text ──
  body: {
    flex: 1,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
  },
  titleCol: {
    flex: 1,
    minWidth: 200,
  },
  role: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  org: {
    fontSize: 13,
  },
  periodBadge: {
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  period: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

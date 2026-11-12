import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'Tidak Ada Data',
  description = 'Tidak ada item yang sesuai dengan kriteria filter atau pencarian Anda.',
  actionText = 'Reset Pencarian',
  onAction,
}: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surface, borderColor: theme.cardBorder },
      ]}
      accessible={true}
      accessibilityRole="text"
    >
      <View
        style={[
          styles.iconBox,
          { borderColor: theme.cardBorder, backgroundColor: theme.card },
        ]}
      >
        <Text style={[styles.iconText, { color: theme.textMuted }]}>∅</Text>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.textMuted }]}>
        {description}
      </Text>

      {onAction && (
        <TouchableOpacity
          style={[styles.actionBtn, { borderColor: theme.cardBorder, backgroundColor: theme.card }]}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={actionText}
        >
          <Text style={[styles.actionBtnText, { color: theme.text }]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 18,
    width: '100%',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  iconText: {
    fontSize: 26,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 420,
    marginBottom: 16,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useCVData } from '../../context/CVContext';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Terjadi kesalahan saat memuat data aplikasi.',
  onRetry,
}: ErrorStateProps) {
  const theme = useTheme();
  const { isErrorSimulationActive, toggleErrorSimulation, refresh } = useCVData();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      refresh();
    }
  };

  const handleDisableSimulation = () => {
    if (isErrorSimulationActive) {
      toggleErrorSimulation();
      refresh();
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.cardBorder },
      ]}
      accessible={true}
      accessibilityRole="alert"
    >
      <View style={[styles.iconCircle, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}>
        <Text style={[styles.iconText, { color: theme.text }]}>⚠</Text>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>Gagal Memuat Data</Text>

      <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.retryBtn, { backgroundColor: theme.primaryBtn }]}
          onPress={handleRetry}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Coba Lagi"
          accessibilityHint="Menekan tombol ini untuk menyegarkan dan mengambil ulang data"
        >
          <Text style={[styles.retryBtnText, { color: theme.primaryBtnText }]}>
            🔄 Coba Lagi
          </Text>
        </TouchableOpacity>

        {isErrorSimulationActive && (
          <TouchableOpacity
            style={[
              styles.simBtn,
              { borderColor: theme.cardBorder, backgroundColor: theme.surface },
            ]}
            onPress={handleDisableSimulation}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Nonaktifkan Simulasi Error"
          >
            <Text style={[styles.simBtnText, { color: theme.text }]}>
              Nonaktifkan Mode Error
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 480,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  retryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  retryBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  simBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  simBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

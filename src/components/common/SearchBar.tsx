import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Cari proyek atau keahlian...',
  onClear,
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <Text style={[styles.searchIcon, { color: theme.textMuted }]}>🔍</Text>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        autoCapitalize="none"
        accessibilityRole="search"
        accessibilityLabel="Kolom pencarian"
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            onChangeText('');
            if (onClear) onClear();
          }}
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
        >
          <Text style={[styles.clearBtnText, { color: theme.textMuted }]}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 16,
    width: '100%',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

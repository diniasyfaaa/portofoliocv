import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// ──────────────────────────────────────────────
//  PROPS
// ──────────────────────────────────────────────
type ProgressItemProps = {
  label: string;
  value: number; // 0–100
  color?: string;
};

// ──────────────────────────────────────────────
//  COMPONENT (Monochrome Black & White)
// ──────────────────────────────────────────────
export default function ProgressItem({
  label,
  value,
  color,
}: ProgressItemProps) {
  const theme = useTheme();
  const clampedValue = Math.min(100, Math.max(0, value));

  // Resolved bar color defaults to theme monochrome accent, with optional subtle accent color
  const barColor = color || theme.text;

  // Animate fill from 0 → clampedValue on mount
  const [animWidth] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: clampedValue,
      duration: 1100,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, [animWidth, clampedValue]);

  const widthInterpolated = animWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Label + percentage */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.percent, { color: theme.text }]}>
          {clampedValue}%
        </Text>
      </View>

      {/* Track */}
      <View style={[styles.track, { backgroundColor: theme.surface }]}>
        {/* Animated fill */}
        <Animated.View
          style={[styles.fill, { width: widthInterpolated, backgroundColor: barColor }]}
        />
      </View>
    </View>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: { fontSize: 13, fontWeight: '600' },
  percent: { fontSize: 13, fontWeight: '800' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});

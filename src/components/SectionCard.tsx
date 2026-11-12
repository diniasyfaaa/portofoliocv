import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ──────────────────────────────────────────────
//  PROPS
// ──────────────────────────────────────────────
type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  accentColor?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
};

// ──────────────────────────────────────────────
//  COMPONENT (Monochrome Black & White)
// ──────────────────────────────────────────────
export default function SectionCard({
  title,
  children,
  accentColor,
  collapsible = false,
  defaultOpen = true,
}: SectionCardProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [rotateAnim] = useState(() => new Animated.Value(defaultOpen ? 1 : 0));

  // Primary accent is monochrome theme.text unless specific subtle accent is passed
  const resolvedAccent = accentColor || theme.text;

  const handleToggle = () => {
    if (!collapsible) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
    setIsOpen((prev) => !prev);
  };

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.cardBorder },
      ]}
    >
      {/* ── Header (tappable if collapsible) ── */}
      <TouchableOpacity
        style={styles.header}
        onPress={handleToggle}
        activeOpacity={collapsible ? 0.7 : 1}
        disabled={!collapsible}
      >
        <View style={[styles.accent, { backgroundColor: resolvedAccent }]} />
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {collapsible && (
          <Animated.Text
            style={[
              styles.chevron,
              { color: theme.textMuted, transform: [{ rotate: chevronRotation }] },
            ]}
          >
            ▼
          </Animated.Text>
        )}
      </TouchableOpacity>

      {/* ── Separator ── */}
      {isOpen && (
        <View style={[styles.separator, { backgroundColor: theme.cardBorder }]} />
      )}

      {/* ── Content (collapsible) ── */}
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

// ──────────────────────────────────────────────
//  STYLES
// ──────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
    gap: 12,
  },
  accent: {
    width: 4,
    height: 20,
    borderRadius: 2,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  chevron: {
    fontSize: 11,
    fontWeight: '800',
  },
  separator: {
    height: 1,
    marginHorizontal: 22,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 22,
  },
});

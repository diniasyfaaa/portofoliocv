import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export function SkeletonBox({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}: {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}) {
  const theme = useTheme();
  const [pulseAnim] = useState(() => new Animated.Value(0.3));

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        {
          width: width as unknown as number,
          height,
          borderRadius,
          backgroundColor: theme.isDark ? '#27272a' : '#e4e4e7',
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
}

export default function LoadingSkeleton() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Banner Skeleton */}
      <View
        style={[
          styles.cardSkeleton,
          { backgroundColor: theme.card, borderColor: theme.cardBorder },
        ]}
      >
        <View style={styles.row}>
          <SkeletonBox width={140} height={140} borderRadius={70} />
          <View style={styles.col}>
            <SkeletonBox width={120} height={16} />
            <SkeletonBox width={240} height={32} style={{ marginTop: 10 }} />
            <SkeletonBox width={180} height={18} style={{ marginTop: 10 }} />
            <SkeletonBox width={140} height={28} borderRadius={14} style={{ marginTop: 14 }} />
          </View>
        </View>
      </View>

      {/* Row Card Skeletons */}
      {[1, 2, 3].map((idx) => (
        <View
          key={idx}
          style={[
            styles.cardSkeleton,
            { backgroundColor: theme.card, borderColor: theme.cardBorder },
          ]}
        >
          <SkeletonBox width={160} height={20} />
          <SkeletonBox width="100%" height={16} style={{ marginTop: 14 }} />
          <SkeletonBox width="85%" height={16} style={{ marginTop: 8 }} />
          <SkeletonBox width="60%" height={16} style={{ marginTop: 8 }} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    width: '100%',
  },
  cardSkeleton: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
    minWidth: 200,
  },
});

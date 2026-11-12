import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Pattern of bar widths and gaps for realistic UPC/Code128 barcode rendering
const BAR_PATTERN = [
  { w: 2, filled: true },
  { w: 1, filled: false },
  { w: 3, filled: true },
  { w: 2, filled: false },
  { w: 1, filled: true },
  { w: 1, filled: false },
  { w: 4, filled: true },
  { w: 2, filled: false },
  { w: 2, filled: true },
  { w: 1, filled: false },
  { w: 3, filled: true },
  { w: 1, filled: false },
  { w: 2, filled: true },
  { w: 2, filled: false },
  { w: 4, filled: true },
  { w: 1, filled: false },
  { w: 1, filled: true },
  { w: 3, filled: false },
  { w: 3, filled: true },
  { w: 1, filled: false },
  { w: 2, filled: true },
  { w: 2, filled: false },
  { w: 1, filled: true },
  { w: 1, filled: false },
  { w: 4, filled: true },
  { w: 2, filled: false },
  { w: 3, filled: true },
  { w: 1, filled: false },
  { w: 2, filled: true },
  { w: 2, filled: false },
  { w: 1, filled: true },
  { w: 1, filled: false },
  { w: 3, filled: true },
  { w: 2, filled: false },
  { w: 4, filled: true },
  { w: 1, filled: false },
  { w: 2, filled: true },
];

type BarcodeProps = {
  code?: string;
  height?: number;
  color?: string;
  textColor?: string;
};

export default function Barcode({
  code = '3 5 4 6 8 9 5 0 1 8 7 8 4',
  height = 36,
  color = '#000000',
  textColor,
}: BarcodeProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.barsRow, { height }]}>
        {BAR_PATTERN.map((item, idx) => (
          <View
            key={idx}
            style={{
              width: item.w,
              height: '100%',
              backgroundColor: item.filled ? color : 'transparent',
              marginRight: 0.5,
            }}
          />
        ))}
      </View>
      <Text style={[styles.codeText, { color: textColor || color }]}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 4,
  },
  codeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.2,
    fontFamily: 'monospace',
  },
});

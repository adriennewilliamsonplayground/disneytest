import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

interface MapPinProps {
  label: string;
  waitTime?: number;
  isSelected?: boolean;
  onPress?: () => void;
  style?: object;
}

export default function MapPin({
  label,
  waitTime,
  isSelected = false,
  onPress,
  style,
}: MapPinProps) {
  const getWaitColor = (time: number) => {
    if (time <= 15) return colors.waitTime.low;
    if (time <= 30) return colors.waitTime.moderate;
    if (time <= 60) return colors.waitTime.high;
    return colors.waitTime.extreme;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.pin, isSelected && styles.pinSelected]}>
        {waitTime !== undefined ? (
          <Text
            style={[styles.waitText, { color: getWaitColor(waitTime) }]}
          >
            {waitTime}
          </Text>
        ) : (
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        )}
      </View>
      <View style={[styles.pointer, isSelected && styles.pointerSelected]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  pin: {
    minWidth: 36,
    height: 28,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  pinSelected: {
    backgroundColor: colors.primary.purple,
    borderColor: colors.primary.purple,
  },
  waitText: {
    ...typography.caption,
    fontWeight: '700',
  },
  label: {
    ...typography.caption,
    color: colors.neutral.charcoal,
    fontWeight: '600',
  },
  pointer: {
    width: 8,
    height: 8,
    backgroundColor: colors.neutral.white,
    transform: [{ rotate: '45deg' }],
    marginTop: -4,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: colors.neutral.lightGray,
  },
  pointerSelected: {
    backgroundColor: colors.primary.purple,
    borderColor: colors.primary.purple,
  },
});

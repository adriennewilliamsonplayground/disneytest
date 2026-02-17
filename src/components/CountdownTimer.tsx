import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { PreTripPhase } from '../types';

interface CountdownTimerProps {
  daysUntilTrip: number;
  phase: PreTripPhase;
}

const phaseConfig: Record<
  PreTripPhase,
  { emoji: string; message: string; bg: string }
> = {
  far_out: {
    emoji: '🏰',
    message: 'Your magical day is coming!',
    bg: colors.primary.blue,
  },
  planning: {
    emoji: '📋',
    message: 'Time to start planning!',
    bg: colors.primary.purple,
  },
  countdown: {
    emoji: '🎉',
    message: 'Almost time for magic!',
    bg: '#C42E91',
  },
  tomorrow: {
    emoji: '✨',
    message: "It's almost here!",
    bg: colors.primary.gold,
  },
};

export default function CountdownTimer({
  daysUntilTrip,
  phase,
}: CountdownTimerProps) {
  const config = phaseConfig[phase];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Text style={styles.emoji}>{config.emoji}</Text>
      <Text style={styles.days}>{daysUntilTrip}</Text>
      <Text style={styles.daysLabel}>
        day{daysUntilTrip !== 1 ? 's' : ''} to go
      </Text>
      <Text style={styles.message}>{config.message}</Text>

      {phase === 'planning' && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipIcon}>{'💡'}</Text>
          <Text style={styles.tipText}>
            Start building your plan — Genie can help!
          </Text>
        </View>
      )}

      {phase === 'tomorrow' && (
        <View style={styles.checklist}>
          <Text style={styles.checkItem}>{'✅ Pack your bag'}</Text>
          <Text style={styles.checkItem}>{'✅ Charge your phone'}</Text>
          <Text style={styles.checkItem}>{'✅ Check park hours'}</Text>
          <Text style={styles.checkItem}>{'✅ Get some rest!'}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.md,
  },
  emoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  days: {
    ...typography.countdown,
    color: colors.neutral.white,
  },
  daysLabel: {
    ...typography.h3,
    color: 'rgba(255,255,255,0.8)',
    marginTop: -spacing.sm,
  },
  message: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.md,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tipIcon: {
    fontSize: 14,
    marginRight: spacing.sm,
  },
  tipText: {
    ...typography.bodySmall,
    color: colors.neutral.white,
  },
  checklist: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
  checkItem: {
    ...typography.body,
    color: 'rgba(255,255,255,0.9)',
  },
});

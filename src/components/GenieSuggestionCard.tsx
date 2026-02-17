import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { GenieSuggestion } from '../types';

const CARD_WIDTH = Dimensions.get('window').width * 0.7;

interface GenieSuggestionCardProps {
  suggestion: GenieSuggestion;
  onPress: () => void;
}

export default function GenieSuggestionCard({
  suggestion,
  onPress,
}: GenieSuggestionCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Top accent */}
      <View style={styles.accent} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.genieIcon}>
            <Text style={styles.genieEmoji}>{'🧞'}</Text>
          </View>
          <Text style={styles.genieLabel}>Genie Pick</Text>
        </View>

        <Text style={styles.title}>{suggestion.title}</Text>
        <Text style={styles.subtitle}>{suggestion.subtitle}</Text>

        <View style={styles.reasonContainer}>
          <Text style={styles.reason} numberOfLines={2}>
            {suggestion.reason}
          </Text>
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaText}>View Details</Text>
          <Text style={styles.ctaArrow}>{'→'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.neutral.white,
    overflow: 'hidden',
    ...shadows.md,
  },
  accent: {
    height: 4,
    backgroundColor: colors.primary.purple,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  genieIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(91, 44, 142, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  genieEmoji: {
    fontSize: 12,
  },
  genieLabel: {
    ...typography.caption,
    color: colors.primary.purple,
    fontWeight: '600',
  },
  title: {
    ...typography.h4,
    color: colors.neutral.charcoal,
    marginBottom: spacing.xxs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.neutral.darkGray,
    marginBottom: spacing.md,
  },
  reasonContainer: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.offWhite,
    marginBottom: spacing.md,
  },
  reason: {
    ...typography.caption,
    color: colors.neutral.darkGray,
    fontStyle: 'italic',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    ...typography.buttonSmall,
    color: colors.primary.purple,
  },
  ctaArrow: {
    marginLeft: spacing.xs,
    color: colors.primary.purple,
    fontSize: 16,
  },
});

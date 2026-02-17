import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Attraction } from '../types';
import { getLandDisplayName, getWaitTimeColor } from '../data/attractions';

const { width } = Dimensions.get('window');

interface AttractionCardProps {
  attraction: Attraction;
  onPress: () => void;
  onFavorite: () => void;
  compact?: boolean;
}

export default function AttractionCard({
  attraction,
  onPress,
  onFavorite,
  compact = false,
}: AttractionCardProps) {
  const waitTimeColor = getWaitTimeColor(attraction.waitTime);

  const categoryIcon =
    attraction.category === 'ride'
      ? '🎢'
      : attraction.category === 'show'
      ? '🎭'
      : attraction.category === 'character_meet'
      ? '🤗'
      : attraction.category === 'entertainment'
      ? '🎪'
      : '📍';

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Image placeholder */}
      <View style={[styles.imagePlaceholder, compact && styles.imagePlaceholderCompact]}>
        <Text style={styles.imageEmoji}>{categoryIcon}</Text>

        {/* Lightning Lane badge */}
        {attraction.lightningLane && (
          <View style={styles.llBadge}>
            <Text style={styles.llBadgeText}>
              LL{attraction.lightningLanePrice ? ` $${attraction.lightningLanePrice}` : ''}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {attraction.name}
            </Text>
            <Text style={styles.land}>
              {getLandDisplayName(attraction.land)}
            </Text>
          </View>
          <TouchableOpacity onPress={onFavorite} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.heart}>
              {attraction.isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {attraction.shortDescription}
          </Text>
        )}

        <View style={styles.bottomRow}>
          <View style={[styles.waitBadge, { backgroundColor: waitTimeColor + '20' }]}>
            <View style={[styles.waitDot, { backgroundColor: waitTimeColor }]} />
            <Text style={[styles.waitText, { color: waitTimeColor }]}>
              {attraction.waitTime > 0 ? `${attraction.waitTime} min` : 'Walk-on'}
            </Text>
          </View>

          {attraction.heightRequirement && (
            <Text style={styles.heightReq}>
              {attraction.heightRequirement}" min
            </Text>
          )}

          <Text style={styles.rating}>
            {'⭐'} {attraction.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardCompact: {
    flexDirection: 'row',
    height: 100,
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderCompact: {
    width: 100,
    height: '100%',
  },
  imageEmoji: {
    fontSize: 40,
  },
  llBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lightningLane.background,
  },
  llBadgeText: {
    ...typography.caption,
    color: colors.neutral.white,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.h4,
    color: colors.neutral.charcoal,
  },
  land: {
    ...typography.caption,
    color: colors.neutral.gray,
    marginTop: spacing.xxs,
  },
  heart: {
    fontSize: 18,
  },
  description: {
    ...typography.bodySmall,
    color: colors.neutral.darkGray,
    marginTop: spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  waitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.pill,
  },
  waitDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  waitText: {
    ...typography.caption,
    fontWeight: '700',
  },
  heightReq: {
    ...typography.caption,
    color: colors.neutral.gray,
  },
  rating: {
    ...typography.caption,
    color: colors.neutral.darkGray,
  },
});

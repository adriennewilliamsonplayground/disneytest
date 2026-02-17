import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleFavorite } from '../../store/slices/attractionsSlice';
import { getLandDisplayName, getWaitTimeColor } from '../../data/attractions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type AttractionDetailScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ AttractionDetail: { attractionId: string } }, 'AttractionDetail'>;
};

export default function AttractionDetailScreen({
  navigation,
  route,
}: AttractionDetailScreenProps) {
  const dispatch = useAppDispatch();
  const { attractionId } = route.params;
  const attraction = useAppSelector(state =>
    state.attractions.items.find(a => a.id === attractionId)
  );

  if (!attraction) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Attraction not found</Text>
      </View>
    );
  }

  const waitTimeColor = getWaitTimeColor(attraction.waitTime);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Placeholder */}
        <View style={styles.heroImage}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroEmoji}>
              {attraction.category === 'ride'
                ? '🎢'
                : attraction.category === 'show'
                ? '🎭'
                : attraction.category === 'character_meet'
                ? '🤗'
                : '🎪'}
            </Text>
          </View>

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{'←'}</Text>
          </TouchableOpacity>

          {/* Favorite button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => dispatch(toggleFavorite(attraction.id))}
          >
            <Text style={styles.favoriteEmoji}>
              {attraction.isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: waitTimeColor }]}>
              {attraction.waitTime > 0 ? `${attraction.waitTime} min` : 'Walk-on'}
            </Text>
            <Text style={styles.statLabel}>Wait Time</Text>
          </View>
          {attraction.heightRequirement && (
            <View style={styles.statDivider} />
          )}
          {attraction.heightRequirement && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {attraction.heightRequirement}"
              </Text>
              <Text style={styles.statLabel}>Height Req.</Text>
            </View>
          )}
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{attraction.duration} min</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          {attraction.lightningLane && <View style={styles.statDivider} />}
          {attraction.lightningLane && (
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.lightningLane.background }]}>
                {attraction.lightningLanePrice
                  ? `$${attraction.lightningLanePrice}`
                  : 'Included'}
              </Text>
              <Text style={styles.statLabel}>Lightning Lane</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.name}>{attraction.name}</Text>
          <TouchableOpacity style={styles.landBadge}>
            <Text style={styles.landBadgeText}>
              {getLandDisplayName(attraction.land)}
            </Text>
          </TouchableOpacity>

          <Text style={styles.description}>{attraction.description}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {attraction.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Thrill Level</Text>
              <Text style={styles.infoValue}>
                {attraction.thrillLevel.charAt(0).toUpperCase() +
                  attraction.thrillLevel.slice(1)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Best For</Text>
              <Text style={styles.infoValue}>
                {attraction.ageGroups
                  .map(g => g.charAt(0).toUpperCase() + g.slice(1))
                  .join(', ')}
              </Text>
            </View>
            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>Rating</Text>
              <Text style={styles.infoValue}>
                {'⭐'.repeat(Math.round(attraction.rating))} {attraction.rating}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CTAs */}
      <View style={styles.ctaContainer}>
        {attraction.lightningLane && (
          <TouchableOpacity style={styles.ctaLightning}>
            <Text style={styles.ctaLightningText}>
              Join Lightning Lane
              {attraction.lightningLanePrice
                ? ` - $${attraction.lightningLanePrice}`
                : ''}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.ctaPlan,
            !attraction.lightningLane && { flex: 1 },
          ]}
        >
          <Text style={styles.ctaPlanText}>Add to Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    ...typography.body,
    color: colors.neutral.gray,
  },
  heroImage: {
    width: width,
    height: 280,
    backgroundColor: colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 48,
  },
  backButton: {
    position: 'absolute',
    top: spacing.huge,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: colors.neutral.white,
    fontSize: 20,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.huge,
    right: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteEmoji: {
    fontSize: 20,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral.white,
    ...shadows.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h4,
    color: colors.neutral.charcoal,
  },
  statLabel: {
    ...typography.caption,
    color: colors.neutral.gray,
    marginTop: spacing.xxs,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.neutral.lightGray,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    ...typography.h1,
    color: colors.neutral.charcoal,
    marginBottom: spacing.sm,
  },
  landBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary.purple + '15',
    marginBottom: spacing.lg,
  },
  landBadgeText: {
    ...typography.caption,
    color: colors.primary.purple,
    fontWeight: '600',
  },
  description: {
    ...typography.bodyLarge,
    color: colors.neutral.darkGray,
    marginBottom: spacing.xl,
    lineHeight: 26,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.neutral.offWhite,
  },
  tagText: {
    ...typography.caption,
    color: colors.neutral.darkGray,
  },
  infoCard: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.neutral.offWhite,
    padding: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  infoLabel: {
    ...typography.body,
    color: colors.neutral.gray,
  },
  infoValue: {
    ...typography.body,
    color: colors.neutral.charcoal,
    fontWeight: '600',
  },
  ctaContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
    backgroundColor: colors.neutral.white,
    ...shadows.lg,
  },
  ctaLightning: {
    flex: 1,
    height: 52,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.lightningLane.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLightningText: {
    ...typography.buttonSmall,
    color: colors.neutral.white,
  },
  ctaPlan: {
    flex: 1,
    height: 52,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPlanText: {
    ...typography.buttonSmall,
    color: colors.neutral.white,
  },
});

import React, { useMemo } from 'react';
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
import { setViewMode } from '../../store/slices/userSlice';
import { toggleFavorite } from '../../store/slices/attractionsSlice';
import AttractionCard from '../../components/AttractionCard';
import GenieSearchBar from '../../components/GenieSearchBar';
import CountdownTimer from '../../components/CountdownTimer';
import GenieSuggestionCard from '../../components/GenieSuggestionCard';
import { genieSuggestions } from '../../data/genieSuggestions';
import { getLandDisplayName } from '../../data/attractions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useAppDispatch();
  const { mode, preTripPhase, tripDate, viewMode } = useAppSelector(
    state => state.user
  );
  const attractions = useAppSelector(state => state.attractions.items);

  const daysUntilTrip = useMemo(() => {
    if (!tripDate) return 86; // default mock
    const now = new Date();
    const trip = new Date(tripDate);
    return Math.max(0, Math.ceil((trip.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }, [tripDate]);

  const topAttractions = useMemo(
    () => attractions.filter(a => a.rating >= 4.5).slice(0, 5),
    [attractions]
  );

  const handleAttractionPress = (id: string) => {
    navigation.navigate('AttractionDetail', { attractionId: id });
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {mode === 'in_park' ? 'Good afternoon!' : 'Hey there!'}
            </Text>
            <Text style={styles.parkName}>Magic Kingdom</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileEmoji}>{'👤'}</Text>
          </TouchableOpacity>
        </View>

        {/* Countdown / In-Park Status */}
        {mode === 'pre_trip' && (
          <CountdownTimer
            daysUntilTrip={daysUntilTrip}
            phase={preTripPhase}
          />
        )}

        {mode === 'in_park' && (
          <View style={styles.inParkBanner}>
            <Text style={styles.inParkIcon}>{'✨'}</Text>
            <View>
              <Text style={styles.inParkTitle}>You're in the Magic!</Text>
              <Text style={styles.inParkSubtitle}>
                Park hours: 9:00 AM - 11:00 PM
              </Text>
            </View>
          </View>
        )}

        {/* Ideas / Plans Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'ideas' && styles.toggleButtonActive,
            ]}
            onPress={() => dispatch(setViewMode('ideas'))}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'ideas' && styles.toggleTextActive,
              ]}
            >
              Ideas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'plans' && styles.toggleButtonActive,
            ]}
            onPress={() => dispatch(setViewMode('plans'))}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'plans' && styles.toggleTextActive,
              ]}
            >
              Plans
            </Text>
          </TouchableOpacity>
        </View>

        {viewMode === 'ideas' ? (
          <>
            {/* Genie Suggestions */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Genie Picks for You</Text>
                <Text style={styles.genieSmall}>{'🧞'}</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {genieSuggestions.slice(0, 3).map(suggestion => (
                  <GenieSuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onPress={() => handleAttractionPress(suggestion.attractionId)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Top Attractions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Attractions</Text>
              <Text style={styles.sectionSubtitle}>
                Must-do experiences at Magic Kingdom
              </Text>
              {topAttractions.map(attraction => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  onPress={() => handleAttractionPress(attraction.id)}
                  onFavorite={() => handleToggleFavorite(attraction.id)}
                />
              ))}
            </View>

            {/* By Land */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Explore by Land</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {[
                  'adventureland',
                  'frontierland',
                  'fantasyland',
                  'tomorrowland',
                  'liberty_square',
                  'main_street',
                ].map(land => (
                  <TouchableOpacity key={land} style={styles.landChip}>
                    <Text style={styles.landChipText}>
                      {getLandDisplayName(land)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        ) : (
          /* Plans View */
          <View style={styles.plansContainer}>
            <View style={styles.emptyPlans}>
              <Text style={styles.emptyIcon}>{'📋'}</Text>
              <Text style={styles.emptyTitle}>No plans yet</Text>
              <Text style={styles.emptySubtitle}>
                Browse Ideas and add attractions to your plan
              </Text>
              <TouchableOpacity
                style={styles.browseCta}
                onPress={() => dispatch(setViewMode('ideas'))}
              >
                <Text style={styles.browseCtaText}>Browse Ideas</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Genie Search Bar (bottom-anchored) */}
      <GenieSearchBar onPress={() => navigation.navigate('Search')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.huge,
    paddingBottom: spacing.lg,
    backgroundColor: colors.neutral.white,
  },
  greeting: {
    ...typography.body,
    color: colors.neutral.darkGray,
  },
  parkName: {
    ...typography.h1,
    color: colors.neutral.charcoal,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
    fontSize: 20,
  },
  inParkBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary.purple,
  },
  inParkIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  inParkTitle: {
    ...typography.h4,
    color: colors.neutral.white,
  },
  inParkSubtitle: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.neutral.lightGray,
    borderRadius: borderRadius.pill,
    padding: spacing.xxs,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: colors.neutral.white,
    ...shadows.sm,
  },
  toggleText: {
    ...typography.buttonSmall,
    color: colors.neutral.gray,
  },
  toggleTextActive: {
    color: colors.primary.purple,
  },
  section: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.neutral.charcoal,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.neutral.darkGray,
    marginBottom: spacing.lg,
  },
  genieSmall: {
    fontSize: 20,
    marginLeft: spacing.sm,
    marginBottom: spacing.xs,
  },
  horizontalList: {
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  landChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  landChipText: {
    ...typography.buttonSmall,
    color: colors.neutral.charcoal,
  },
  plansContainer: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  emptyPlans: {
    alignItems: 'center',
    paddingVertical: spacing.massive,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.neutral.charcoal,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.neutral.gray,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  browseCta: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary.purple,
  },
  browseCtaText: {
    ...typography.buttonSmall,
    color: colors.neutral.white,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store';
import { setAppMode, setPreTripPhase } from '../../store/slices/userSlice';
import { resetOnboarding } from '../../store/slices/onboardingSlice';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { mode, preTripPhase } = useAppSelector(state => state.user);
  const onboarding = useAppSelector(state => state.onboarding);

  const isInPark = mode === 'in_park';

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{'🏰'}</Text>
          </View>
          <Text style={styles.name}>Disney Explorer</Text>
          <Text style={styles.email}>explorer@magickingdom.com</Text>
        </View>

        {/* Preferences Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Preferences</Text>
          <View style={styles.prefRow}>
            <Text style={styles.prefLabel}>Franchises</Text>
            <Text style={styles.prefValue}>
              {onboarding.selectedFranchises.length > 0
                ? onboarding.selectedFranchises.join(', ')
                : 'None selected'}
            </Text>
          </View>
          <View style={styles.prefRow}>
            <Text style={styles.prefLabel}>Experiences</Text>
            <Text style={styles.prefValue}>
              {onboarding.selectedExperiences.length > 0
                ? onboarding.selectedExperiences.join(', ')
                : 'None selected'}
            </Text>
          </View>
        </View>

        {/* Demo Mode Toggles */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Demo Controls</Text>
          <Text style={styles.cardSubtitle}>
            Switch between app states for testing
          </Text>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>In-Park Mode</Text>
            <Switch
              value={isInPark}
              onValueChange={(value) =>
                dispatch(setAppMode(value ? 'in_park' : 'pre_trip'))
              }
              trackColor={{
                false: colors.neutral.lightGray,
                true: colors.primary.purple,
              }}
              thumbColor={colors.neutral.white}
            />
          </View>

          {!isInPark && (
            <View style={styles.phaseButtons}>
              <Text style={styles.phaseLabel}>Pre-trip Phase:</Text>
              {(['far_out', 'planning', 'countdown', 'tomorrow'] as const).map(
                (phase) => (
                  <TouchableOpacity
                    key={phase}
                    style={[
                      styles.phaseButton,
                      preTripPhase === phase && styles.phaseButtonActive,
                    ]}
                    onPress={() => dispatch(setPreTripPhase(phase))}
                  >
                    <Text
                      style={[
                        styles.phaseButtonText,
                        preTripPhase === phase && styles.phaseButtonTextActive,
                      ]}
                    >
                      {phase.replace('_', ' ')}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        </View>

        {/* Reset */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => dispatch(resetOnboarding())}
        >
          <Text style={styles.resetText}>Reset Onboarding</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
  },
  content: {
    paddingBottom: spacing.huge,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.massive,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.neutral.white,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(91, 44, 142, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 36,
  },
  name: {
    ...typography.h2,
    color: colors.neutral.charcoal,
  },
  email: {
    ...typography.body,
    color: colors.neutral.gray,
    marginTop: spacing.xxs,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.neutral.white,
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.neutral.charcoal,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.bodySmall,
    color: colors.neutral.gray,
    marginBottom: spacing.lg,
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.offWhite,
  },
  prefLabel: {
    ...typography.body,
    color: colors.neutral.darkGray,
  },
  prefValue: {
    ...typography.body,
    color: colors.neutral.charcoal,
    textTransform: 'capitalize',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  toggleLabel: {
    ...typography.body,
    color: colors.neutral.charcoal,
  },
  phaseButtons: {
    marginTop: spacing.md,
  },
  phaseLabel: {
    ...typography.bodySmall,
    color: colors.neutral.darkGray,
    marginBottom: spacing.sm,
  },
  phaseButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.neutral.offWhite,
    marginBottom: spacing.sm,
  },
  phaseButtonActive: {
    backgroundColor: colors.primary.purple,
  },
  phaseButtonText: {
    ...typography.buttonSmall,
    color: colors.neutral.darkGray,
  },
  phaseButtonTextActive: {
    color: colors.neutral.white,
  },
  resetButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.semantic.error,
    alignItems: 'center',
  },
  resetText: {
    ...typography.buttonSmall,
    color: colors.semantic.error,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ExperienceType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  toggleExperience,
  completeOnboarding,
} from '../../store/slices/onboardingSlice';

const { width } = Dimensions.get('window');

interface ExperienceOption {
  id: ExperienceType;
  label: string;
  description: string;
  icon: string;
  gradient: string[];
}

const experienceOptions: ExperienceOption[] = [
  {
    id: 'thrills',
    label: 'Thrills',
    description: 'Roller coasters, drops, and high-speed adventures',
    icon: '🎢',
    gradient: ['#FF6B6B', '#EE5A24'],
  },
  {
    id: 'tastes',
    label: 'Tastes',
    description: 'Iconic snacks, unique dining, and culinary magic',
    icon: '🍦',
    gradient: ['#F2B138', '#E8851C'],
  },
  {
    id: 'relaxation',
    label: 'Relaxation',
    description: 'Gentle rides, scenic strolls, and peaceful moments',
    icon: '🌿',
    gradient: ['#0FA3B1', '#0D8A96'],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    description: 'Shows, parades, fireworks, and character meets',
    icon: '🎭',
    gradient: ['#5B2C8E', '#8E44AD'],
  },
];

interface ExperienceSelectionScreenProps {
  onComplete: () => void;
}

export default function ExperienceSelectionScreen({
  onComplete,
}: ExperienceSelectionScreenProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.onboarding.selectedExperiences);

  const handleSelect = (experience: ExperienceType) => {
    dispatch(toggleExperience(experience));
  };

  const handleFinish = () => {
    dispatch(completeOnboarding());
    onComplete();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Genie Header */}
        <View style={styles.genieHeader}>
          <View style={styles.genieAvatar}>
            <Text style={styles.genieEmoji}>{'🧞'}</Text>
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              What kind of magic are you looking for?
            </Text>
            <Text style={styles.speechSubtext}>
              I'll craft the perfect day based on your vibe!
            </Text>
          </View>
        </View>

        {/* Experience Cards */}
        <View style={styles.cardList}>
          {experienceOptions.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.card,
                  isSelected && {
                    borderColor: option.gradient[0],
                    backgroundColor: option.gradient[0] + '10',
                  },
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: option.gradient[0] + '20' },
                    ]}
                  >
                    <Text style={styles.cardIcon}>{option.icon}</Text>
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardLabel}>{option.label}</Text>
                    <Text style={styles.cardDescription}>
                      {option.description}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.radio,
                    isSelected && {
                      backgroundColor: option.gradient[0],
                      borderColor: option.gradient[0],
                    },
                  ]}
                >
                  {isSelected && (
                    <Text style={styles.radioCheck}>{'✓'}</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selected.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleFinish}
          disabled={selected.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Let's go!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFinish}>
          <Text style={styles.skipText}>Skip for now</Text>
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
  content: {
    padding: spacing.lg,
    paddingTop: spacing.huge,
  },
  genieHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xxxl,
  },
  genieAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(91, 44, 142, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  genieEmoji: {
    fontSize: 28,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
    borderRadius: borderRadius.xl,
    borderTopLeftRadius: borderRadius.sm,
    padding: spacing.lg,
  },
  speechText: {
    ...typography.h3,
    color: colors.neutral.charcoal,
    marginBottom: spacing.xs,
  },
  speechSubtext: {
    ...typography.bodySmall,
    color: colors.neutral.darkGray,
  },
  cardList: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.neutral.lightGray,
    backgroundColor: colors.neutral.white,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardText: {
    flex: 1,
  },
  cardLabel: {
    ...typography.h4,
    color: colors.neutral.charcoal,
    marginBottom: spacing.xxs,
  },
  cardDescription: {
    ...typography.bodySmall,
    color: colors.neutral.darkGray,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  radioCheck: {
    color: colors.neutral.white,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    height: 52,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.primary.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  continueButtonDisabled: {
    opacity: 0.4,
  },
  continueText: {
    ...typography.button,
    color: colors.neutral.white,
  },
  skipText: {
    ...typography.body,
    color: colors.neutral.gray,
  },
});

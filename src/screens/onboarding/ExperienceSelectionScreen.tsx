import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { colors, spacing } from '../../theme';
import { ExperienceType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  toggleExperience,
  completeOnboarding,
} from '../../store/slices/onboardingSlice';

const { width } = Dimensions.get('window');
const DARK_BG = '#0D1B3E';
const CARD_GAP = 16;
const CARD_SIZE = (width - spacing.lg * 2 - CARD_GAP) / 2;

interface ExperienceOption {
  id: ExperienceType;
  label: string;
  emoji: string;
  // In production, replace emoji with actual image URIs:
  // imageUri: string;
}

const experienceOptions: ExperienceOption[] = [
  { id: 'thrills', label: 'Thrills', emoji: '🎢' },
  { id: 'tastes', label: 'Tastes', emoji: '🍽️' },
  { id: 'relaxation', label: 'Relaxation', emoji: '🧖' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎭' },
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

  const canContinue = selected.length > 0;

  return (
    <View style={styles.container}>
      {/* Genie character at top center — lamp form */}
      <View style={styles.genieContainer}>
        <View style={styles.genieCircle}>
          <Text style={styles.genieEmoji}>🧞</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Add a magical dash of...</Text>

      {/* 2×2 Image Grid */}
      <View style={styles.grid}>
        {experienceOptions.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}
              onPress={() => handleSelect(option.id)}
              activeOpacity={0.7}
            >
              {/* Image placeholder — replace with <Image> when assets are available */}
              <View style={styles.cardImageArea}>
                <Text style={styles.cardEmoji}>{option.emoji}</Text>
              </View>

              {/* Toggle badge: + or ✓ */}
              <View style={[
                styles.toggleBadge,
                isSelected && styles.toggleBadgeSelected,
              ]}>
                <Text style={[
                  styles.toggleText,
                  isSelected && styles.toggleTextSelected,
                ]}>
                  {isSelected ? '✓' : '+'}
                </Text>
              </View>

              {/* Label */}
              <Text style={styles.cardLabel}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Pointer hand hint (optional visual) */}

      {/* Forward arrow button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.arrowButton,
            !canContinue && styles.arrowButtonDisabled,
          ]}
          onPress={handleFinish}
          disabled={!canContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: spacing.lg,
  },
  genieContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  genieCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(91, 44, 142, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genieEmoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    rowGap: CARD_GAP,
  },
  card: {
    width: CARD_SIZE,
    alignItems: 'center',
    position: 'relative',
  },
  cardSelected: {
    // Could add a subtle glow or border if desired
  },
  cardImageArea: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardEmoji: {
    fontSize: 56,
  },
  toggleBadge: {
    position: 'absolute',
    top: CARD_SIZE - 20,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: DARK_BG,
  },
  toggleBadgeSelected: {
    backgroundColor: colors.neutral.white,
  },
  toggleText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral.white,
  },
  toggleTextSelected: {
    color: DARK_BG,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral.white,
    marginTop: 12,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  arrowButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  arrowButtonDisabled: {
    opacity: 0.3,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '700',
    color: DARK_BG,
  },
});

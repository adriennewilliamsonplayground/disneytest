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
import { Franchise } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleFranchise, setCurrentStep } from '../../store/slices/onboardingSlice';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - spacing.lg * 3) / 2;

interface FranchiseOption {
  id: Franchise;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const franchiseOptions: FranchiseOption[] = [
  {
    id: 'disney',
    label: 'Disney',
    icon: '🏰',
    color: '#1A1D4E',
    bgColor: '#E8E0F0',
  },
  {
    id: 'pixar',
    label: 'Pixar',
    icon: '🚀',
    color: '#0D7C3F',
    bgColor: '#D4F5E0',
  },
  {
    id: 'marvel',
    label: 'Marvel',
    icon: '🦸',
    color: '#C42E2E',
    bgColor: '#FFE0E0',
  },
  {
    id: 'starwars',
    label: 'Star Wars',
    icon: '⚔️',
    color: '#2C2832',
    bgColor: '#E0E0E8',
  },
];

interface FranchiseSelectionScreenProps {
  onNext: () => void;
}

export default function FranchiseSelectionScreen({ onNext }: FranchiseSelectionScreenProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.onboarding.selectedFranchises);

  const handleSelect = (franchise: Franchise) => {
    dispatch(toggleFranchise(franchise));
  };

  const handleContinue = () => {
    dispatch(setCurrentStep(2));
    onNext();
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
              Which Disney worlds speak to your heart?
            </Text>
            <Text style={styles.speechSubtext}>
              Pick as many as you like — I'll personalize your experience!
            </Text>
          </View>
        </View>

        {/* Franchise Grid */}
        <View style={styles.grid}>
          {franchiseOptions.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.card,
                  { backgroundColor: option.bgColor },
                  isSelected && styles.cardSelected,
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.cardIcon}>{option.icon}</Text>
                <Text style={[styles.cardLabel, { color: option.color }]}>
                  {option.label}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>{'✓'}</Text>
                  </View>
                )}
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
          onPress={handleContinue}
          disabled={selected.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue}>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary.purple,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  cardLabel: {
    ...typography.h4,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.neutral.white,
    fontSize: 16,
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

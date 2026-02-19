import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, spacing } from '../../theme';
import { Franchise } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleFranchise, setCurrentStep } from '../../store/slices/onboardingSlice';

const { width } = Dimensions.get('window');
const DARK_BG = '#0D1B3E';
const PILL_BG = 'rgba(255, 255, 255, 0.08)';
const PILL_SELECTED = '#0057B8';
const PILL_BORDER = 'rgba(255, 255, 255, 0.12)';

interface FranchiseOption {
  id: Franchise;
  label: string;
  icon: string;
}

const franchiseOptions: FranchiseOption[] = [
  { id: 'disney', label: 'Disney', icon: '🏰' },
  { id: 'pixar', label: 'Pixar', icon: '🚀' },
  { id: 'marvel', label: 'Marvel', icon: '🦸' },
  { id: 'starwars', label: 'Star Wars', icon: '⚔️' },
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

  const canContinue = selected.length > 0;

  return (
    <View style={styles.container}>
      {/* Genie character at top center */}
      <View style={styles.genieContainer}>
        <View style={styles.genieCircle}>
          <Text style={styles.genieEmoji}>🧞</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose what you love</Text>

      {/* Franchise pill buttons */}
      <View style={styles.pillList}>
        {franchiseOptions.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.pill,
                isSelected && styles.pillSelected,
              ]}
              onPress={() => handleSelect(option.id)}
              activeOpacity={0.7}
            >
              <View style={styles.pillContent}>
                <Text style={styles.pillIcon}>{option.icon}</Text>
                <Text style={[
                  styles.pillLabel,
                  isSelected && styles.pillLabelSelected,
                ]}>
                  {option.label}
                </Text>
              </View>
              {isSelected && (
                <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Forward arrow button at bottom */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.arrowButton,
            !canContinue && styles.arrowButtonDisabled,
          ]}
          onPress={handleContinue}
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
    marginBottom: 36,
  },
  pillList: {
    width: '100%',
    gap: 14,
  },
  pill: {
    width: '100%',
    height: 72,
    borderRadius: 36,
    backgroundColor: PILL_BG,
    borderWidth: 2,
    borderColor: PILL_BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  pillSelected: {
    backgroundColor: PILL_SELECTED,
    borderColor: PILL_SELECTED,
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  pillLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.5,
  },
  pillLabelSelected: {
    color: colors.neutral.white,
  },
  checkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: '700',
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

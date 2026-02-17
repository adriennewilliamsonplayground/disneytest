import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../store';
import OnboardingNavigator from './OnboardingNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { useAppDispatch } from '../store';
import { completeOnboarding } from '../store/slices/onboardingSlice';

export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const hasCompletedOnboarding = useAppSelector(
    state => state.onboarding.hasCompleted
  );

  return (
    <NavigationContainer>
      {hasCompletedOnboarding ? (
        <BottomTabNavigator />
      ) : (
        <OnboardingNavigator
          onComplete={() => dispatch(completeOnboarding())}
        />
      )}
    </NavigationContainer>
  );
}

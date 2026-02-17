import React, { useState } from 'react';
import LoadingScreen from '../screens/onboarding/LoadingScreen';
import FranchiseSelectionScreen from '../screens/onboarding/FranchiseSelectionScreen';
import ExperienceSelectionScreen from '../screens/onboarding/ExperienceSelectionScreen';

interface OnboardingNavigatorProps {
  onComplete: () => void;
}

export default function OnboardingNavigator({ onComplete }: OnboardingNavigatorProps) {
  const [step, setStep] = useState<'loading' | 'franchise' | 'experience'>('loading');

  switch (step) {
    case 'loading':
      return <LoadingScreen onFinish={() => setStep('franchise')} />;
    case 'franchise':
      return <FranchiseSelectionScreen onNext={() => setStep('experience')} />;
    case 'experience':
      return <ExperienceSelectionScreen onComplete={onComplete} />;
    default:
      return null;
  }
}

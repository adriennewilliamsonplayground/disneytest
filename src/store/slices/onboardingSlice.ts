import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Franchise, ExperienceType } from '../../types';

interface OnboardingState {
  hasCompleted: boolean;
  selectedFranchises: Franchise[];
  selectedExperiences: ExperienceType[];
  currentStep: number; // 0 = loading, 1 = franchise, 2 = experience
}

const initialState: OnboardingState = {
  hasCompleted: false,
  selectedFranchises: [],
  selectedExperiences: [],
  currentStep: 0,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    toggleFranchise(state, action: PayloadAction<Franchise>) {
      const idx = state.selectedFranchises.indexOf(action.payload);
      if (idx >= 0) {
        state.selectedFranchises.splice(idx, 1);
      } else {
        state.selectedFranchises.push(action.payload);
      }
    },
    toggleExperience(state, action: PayloadAction<ExperienceType>) {
      const idx = state.selectedExperiences.indexOf(action.payload);
      if (idx >= 0) {
        state.selectedExperiences.splice(idx, 1);
      } else {
        state.selectedExperiences.push(action.payload);
      }
    },
    completeOnboarding(state) {
      state.hasCompleted = true;
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  toggleFranchise,
  toggleExperience,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

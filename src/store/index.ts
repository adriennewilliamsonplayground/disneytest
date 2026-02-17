import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import onboardingReducer from './slices/onboardingSlice';
import attractionsReducer from './slices/attractionsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    attractions: attractionsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

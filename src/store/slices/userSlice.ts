import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppMode, PreTripPhase, PlanItem } from '../../types';

interface UserState {
  mode: AppMode;
  preTripPhase: PreTripPhase;
  tripDate: string | null; // ISO date string
  planItems: PlanItem[];
  viewMode: 'ideas' | 'plans';
}

const initialState: UserState = {
  mode: 'pre_trip',
  preTripPhase: 'far_out',
  tripDate: null,
  planItems: [],
  viewMode: 'ideas',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAppMode(state, action: PayloadAction<AppMode>) {
      state.mode = action.payload;
    },
    setPreTripPhase(state, action: PayloadAction<PreTripPhase>) {
      state.preTripPhase = action.payload;
    },
    setTripDate(state, action: PayloadAction<string>) {
      state.tripDate = action.payload;
    },
    setViewMode(state, action: PayloadAction<'ideas' | 'plans'>) {
      state.viewMode = action.payload;
    },
    addPlanItem(state, action: PayloadAction<PlanItem>) {
      state.planItems.push(action.payload);
    },
    removePlanItem(state, action: PayloadAction<string>) {
      state.planItems = state.planItems.filter(item => item.id !== action.payload);
    },
    reorderPlanItems(state, action: PayloadAction<PlanItem[]>) {
      state.planItems = action.payload;
    },
  },
});

export const {
  setAppMode,
  setPreTripPhase,
  setTripDate,
  setViewMode,
  addPlanItem,
  removePlanItem,
  reorderPlanItems,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attraction } from '../../types';
import { attractions as mockAttractions } from '../../data/attractions';

interface AttractionsState {
  items: Attraction[];
  searchQuery: string;
  selectedLand: string | null;
  selectedCategory: string | null;
}

const initialState: AttractionsState = {
  items: mockAttractions,
  searchQuery: '',
  selectedLand: null,
  selectedCategory: null,
};

const attractionsSlice = createSlice({
  name: 'attractions',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const attraction = state.items.find(a => a.id === action.payload);
      if (attraction) {
        attraction.isFavorite = !attraction.isFavorite;
      }
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedLand(state, action: PayloadAction<string | null>) {
      state.selectedLand = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    updateWaitTime(state, action: PayloadAction<{ id: string; waitTime: number }>) {
      const attraction = state.items.find(a => a.id === action.payload.id);
      if (attraction) {
        attraction.waitTime = action.payload.waitTime;
      }
    },
  },
});

export const {
  toggleFavorite,
  setSearchQuery,
  setSelectedLand,
  setSelectedCategory,
  updateWaitTime,
} = attractionsSlice.actions;

export default attractionsSlice.reducer;

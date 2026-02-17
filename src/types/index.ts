// ─── Franchise & Preferences ─────────────────────────────────────────

export type Franchise = 'disney' | 'pixar' | 'marvel' | 'starwars';
export type ExperienceType = 'thrills' | 'tastes' | 'relaxation' | 'entertainment';

export interface UserPreferences {
  franchises: Franchise[];
  experienceTypes: ExperienceType[];
  hasCompletedOnboarding: boolean;
  tripDate: string | null; // ISO date string
}

// ─── Attractions ─────────────────────────────────────────────────────

export type AttractionCategory =
  | 'ride'
  | 'show'
  | 'dining'
  | 'character_meet'
  | 'shopping'
  | 'entertainment';

export type ThrillLevel = 'mild' | 'moderate' | 'thrilling' | 'extreme';
export type AgeGroup = 'toddler' | 'kids' | 'tweens' | 'teens' | 'adults' | 'all';
export type Land =
  | 'main_street'
  | 'adventureland'
  | 'frontierland'
  | 'liberty_square'
  | 'fantasyland'
  | 'tomorrowland';

export interface Attraction {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: AttractionCategory;
  land: Land;
  franchise: Franchise | null;
  thrillLevel: ThrillLevel;
  ageGroups: AgeGroup[];
  heightRequirement: number | null; // inches, null if none
  waitTime: number; // minutes (mock)
  lightningLane: boolean;
  lightningLanePrice: number | null;
  duration: number; // minutes
  imageUrl: string;
  heroImageUrl: string;
  coordinates: { x: number; y: number }; // for map positioning
  tags: string[];
  rating: number; // 1-5
  isFavorite: boolean;
}

// ─── Dining ──────────────────────────────────────────────────────────

export type DiningType = 'quick_service' | 'table_service' | 'snack' | 'lounge';
export type MealPeriod = 'breakfast' | 'lunch' | 'dinner' | 'all_day';
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export interface DiningLocation {
  id: string;
  name: string;
  description: string;
  diningType: DiningType;
  land: Land;
  mealPeriods: MealPeriod[];
  priceRange: PriceRange;
  cuisine: string[];
  imageUrl: string;
  waitTime: number;
  reservationRequired: boolean;
  coordinates: { x: number; y: number };
  tags: string[];
  rating: number;
  isFavorite: boolean;
}

// ─── Plan / Itinerary ────────────────────────────────────────────────

export interface PlanItem {
  id: string;
  attractionId: string;
  time: string; // HH:MM
  type: 'attraction' | 'dining' | 'show' | 'break';
  isLightningLane: boolean;
  notes: string;
}

export interface DayPlan {
  date: string; // ISO date
  items: PlanItem[];
}

// ─── Search ──────────────────────────────────────────────────────────

export interface SearchResult {
  id: string;
  type: 'attraction' | 'dining' | 'show' | 'amenity';
  name: string;
  description: string;
  imageUrl: string;
  land: Land;
}

// ─── Genie Suggestions ──────────────────────────────────────────────

export interface GenieSuggestion {
  id: string;
  title: string;
  subtitle: string;
  attractionId: string;
  reason: string; // why Genie recommends this
  confidence: number; // 0-1
  imageUrl: string;
}

// ─── App State ───────────────────────────────────────────────────────

export type AppMode = 'pre_trip' | 'in_park';

export type PreTripPhase =
  | 'far_out'    // 86+ days
  | 'planning'   // 10-85 days
  | 'countdown'  // 2-9 days
  | 'tomorrow';  // 1 day

export interface AppState {
  mode: AppMode;
  preTripPhase: PreTripPhase;
  userPreferences: UserPreferences;
}

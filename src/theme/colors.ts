/**
 * Disney Parks App - Color System
 * Based on official Disney brand palette with Magic Kingdom theming.
 */

export const colors = {
  // Primary brand colors
  primary: {
    blue: '#1A1D4E',        // Deep Disney blue
    purple: '#5B2C8E',      // Genie purple
    magenta: '#C42E91',     // Accent magenta
    gold: '#F2B138',        // Disney gold
    teal: '#0FA3B1',        // Teal accent
  },

  // Gradients (defined as arrays for LinearGradient)
  gradients: {
    genie: ['#5B2C8E', '#C42E91'],
    nightSky: ['#1A1D4E', '#2D1B69', '#5B2C8E'],
    sunrise: ['#F2B138', '#E8851C', '#C42E91'],
    card: ['#FFFFFF', '#F7F5FA'],
  },

  // Neutrals
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F7F5FA',
    lightGray: '#E8E4ED',
    gray: '#9B97A3',
    darkGray: '#5A5660',
    charcoal: '#2C2832',
    black: '#1A1720',
  },

  // Semantic colors
  semantic: {
    success: '#34C759',
    warning: '#F2B138',
    error: '#FF3B30',
    info: '#0FA3B1',
  },

  // Wait time indicators
  waitTime: {
    low: '#34C759',       // 0-15 min - green
    moderate: '#F2B138',  // 16-30 min - gold
    high: '#FF9500',      // 31-60 min - orange
    extreme: '#FF3B30',   // 60+ min - red
  },

  // Lightning Lane
  lightningLane: {
    background: '#0FA3B1',
    text: '#FFFFFF',
  },

  // Tab bar
  tabBar: {
    active: '#5B2C8E',
    inactive: '#9B97A3',
    background: '#FFFFFF',
  },
} as const;

export type Colors = typeof colors;

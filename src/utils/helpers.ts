import { PreTripPhase } from '../types';

/**
 * Calculate the pre-trip phase based on days until trip.
 */
export function getPreTripPhase(daysUntilTrip: number): PreTripPhase {
  if (daysUntilTrip <= 1) return 'tomorrow';
  if (daysUntilTrip <= 9) return 'countdown';
  if (daysUntilTrip <= 85) return 'planning';
  return 'far_out';
}

/**
 * Format a wait time for display.
 */
export function formatWaitTime(minutes: number): string {
  if (minutes === 0) return 'Walk-on';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

/**
 * Format a height requirement for display (inches to feet/inches).
 */
export function formatHeight(inches: number): string {
  const feet = Math.floor(inches / 12);
  const remaining = inches % 12;
  return `${feet}'${remaining}"`;
}

/**
 * Calculate days between now and a target date.
 */
export function daysUntil(dateString: string): number {
  const now = new Date();
  const target = new Date(dateString);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

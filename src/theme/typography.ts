import { TextStyle } from 'react-native';

/**
 * Disney Parks App - Typography System
 * Using system fonts with Disney-appropriate styling.
 */

export const fontFamilies = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
} as const;

export const fontWeights = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  extraBold: '800' as TextStyle['fontWeight'],
};

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: fontWeights.bold,
    lineHeight: 38,
    letterSpacing: -0.5,
  } as TextStyle,

  h2: {
    fontSize: 24,
    fontWeight: fontWeights.bold,
    lineHeight: 30,
    letterSpacing: -0.3,
  } as TextStyle,

  h3: {
    fontSize: 20,
    fontWeight: fontWeights.semiBold,
    lineHeight: 26,
  } as TextStyle,

  h4: {
    fontSize: 17,
    fontWeight: fontWeights.semiBold,
    lineHeight: 22,
  } as TextStyle,

  // Body text
  bodyLarge: {
    fontSize: 17,
    fontWeight: fontWeights.regular,
    lineHeight: 24,
  } as TextStyle,

  body: {
    fontSize: 15,
    fontWeight: fontWeights.regular,
    lineHeight: 22,
  } as TextStyle,

  bodySmall: {
    fontSize: 13,
    fontWeight: fontWeights.regular,
    lineHeight: 18,
  } as TextStyle,

  // Labels
  label: {
    fontSize: 13,
    fontWeight: fontWeights.semiBold,
    lineHeight: 18,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,

  // Caption
  caption: {
    fontSize: 11,
    fontWeight: fontWeights.regular,
    lineHeight: 14,
  } as TextStyle,

  // Button text
  button: {
    fontSize: 17,
    fontWeight: fontWeights.semiBold,
    lineHeight: 22,
  } as TextStyle,

  buttonSmall: {
    fontSize: 15,
    fontWeight: fontWeights.semiBold,
    lineHeight: 20,
  } as TextStyle,

  // Tab bar
  tabLabel: {
    fontSize: 10,
    fontWeight: fontWeights.medium,
    lineHeight: 12,
  } as TextStyle,

  // Countdown / large number display
  countdown: {
    fontSize: 64,
    fontWeight: fontWeights.extraBold,
    lineHeight: 72,
    letterSpacing: -2,
  } as TextStyle,
} as const;

export type Typography = typeof typography;

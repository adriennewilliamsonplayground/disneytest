import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the Genie lamp appearance
    Animated.sequence([
      // Fade in and scale up lamp
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Glow pulse
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Show text
      Animated.timing(textFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(1200),
    ]).start(() => {
      onFinish();
    });
  }, [fadeAnim, scaleAnim, glowAnim, textFade, onFinish]);

  return (
    <View style={styles.container}>
      {/* Background gradient effect using overlapping views */}
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      {/* Genie Lamp */}
      <Animated.View
        style={[
          styles.lampContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.lamp}>
          <Text style={styles.lampEmoji}>{'🪔'}</Text>
        </View>

        {/* Glow effect */}
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: glowAnim,
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1.5],
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.sparkle,
            {
              opacity: glowAnim,
              top: height * 0.3 + Math.sin(i * 1.2) * 80,
              left: width * 0.5 + Math.cos(i * 1.2) * 100 - 4,
            },
          ]}
        >
          <Text style={styles.sparkleText}>{'✨'}</Text>
        </Animated.View>
      ))}

      {/* Welcome text */}
      <Animated.View style={[styles.textContainer, { opacity: textFade }]}>
        <Text style={styles.welcomeText}>Your wish is my command</Text>
        <Text style={styles.subtitleText}>
          I'm Genie, your personal Magic Kingdom guide
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.blue,
  },
  bgTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary.blue,
    opacity: 0.9,
  },
  bgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: colors.primary.purple,
    opacity: 0.3,
  },
  lampContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.huge,
  },
  lamp: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(242, 177, 56, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lampEmoji: {
    fontSize: 64,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(196, 46, 145, 0.15)',
  },
  sparkle: {
    position: 'absolute',
  },
  sparkleText: {
    fontSize: 16,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  welcomeText: {
    ...typography.h2,
    color: colors.neutral.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitleText: {
    ...typography.body,
    color: colors.neutral.gray,
    textAlign: 'center',
  },
});

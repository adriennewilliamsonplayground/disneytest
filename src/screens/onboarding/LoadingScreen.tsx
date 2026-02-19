import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, spacing } from '../../theme';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;
  const trailAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Genie emerges with glow trail
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(trailAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // Glow pulse
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Memory cards float in staggered
      Animated.stagger(200, [
        Animated.spring(card1Anim, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
        Animated.spring(card2Anim, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
        Animated.spring(card3Anim, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
      ]),
      // Title text fades in
      Animated.timing(textFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Hold before advancing
      Animated.delay(1500),
    ]).start(() => {
      onFinish();
    });
  }, []);

  const renderMemoryCard = (
    anim: Animated.Value,
    emoji: string,
    style: object
  ) => (
    <Animated.View
      style={[
        styles.memoryCard,
        style,
        {
          opacity: anim,
          transform: [
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) },
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
          ],
        },
      ]}
    >
      <Text style={styles.memoryEmoji}>{emoji}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Subtle gradient layers */}
      <View style={styles.bgGradientTop} />
      <View style={styles.bgGradientBottom} />

      {/* Title text — positioned above Genie */}
      <Animated.View style={[styles.titleContainer, { opacity: textFade }]}>
        <Text style={styles.titleText}>Creating your dream</Text>
        <Text style={styles.titleText}>vacation...</Text>
      </Animated.View>

      {/* Genie character area */}
      <View style={styles.genieArea}>
        {/* Glowing trail beneath Genie */}
        <Animated.View
          style={[
            styles.glowTrail,
            {
              opacity: trailAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] }),
              transform: [{ scaleY: trailAnim }],
            },
          ]}
        />

        {/* Genie character */}
        <Animated.View
          style={[
            styles.genieContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.genieEmoji}>🧞</Text>
        </Animated.View>

        {/* Glow behind Genie */}
        <Animated.View
          style={[
            styles.genieGlow,
            {
              opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.3] }),
              transform: [
                { scale: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.8] }) },
              ],
            },
          ]}
        />

        {/* Memory photo cards orbiting */}
        {renderMemoryCard(card1Anim, '📸', styles.card1)}
        {renderMemoryCard(card2Anim, '🎆', styles.card2)}
        {renderMemoryCard(card3Anim, '🎠', styles.card3)}
      </View>

      {/* Sparkle particles */}
      {[...Array(8)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.sparkle,
            {
              opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.7] }),
              top: height * 0.25 + Math.sin(i * 0.9) * 140,
              left: width * 0.5 + Math.cos(i * 0.9) * 130 - 8,
            },
          ]}
        >
          <Text style={styles.sparkleText}>✨</Text>
        </Animated.View>
      ))}
    </View>
  );
}

const DARK_BG = '#0D1B3E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARK_BG,
  },
  bgGradientTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: DARK_BG,
  },
  bgGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: colors.primary.purple,
    opacity: 0.15,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    zIndex: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.neutral.white,
    textAlign: 'center',
    lineHeight: 40,
  },
  genieArea: {
    width: 280,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genieContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(91, 44, 142, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  genieEmoji: {
    fontSize: 80,
  },
  genieGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#5B2C8E',
  },
  glowTrail: {
    position: 'absolute',
    bottom: -20,
    width: 4,
    height: 160,
    backgroundColor: '#0FA3B1',
    borderRadius: 2,
  },
  memoryCard: {
    position: 'absolute',
    width: 100,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoryEmoji: {
    fontSize: 28,
  },
  card1: { top: 10, left: -30 },
  card2: { top: 30, right: -40 },
  card3: { bottom: 10, right: -20 },
  sparkle: {
    position: 'absolute',
    zIndex: 20,
  },
  sparkleText: {
    fontSize: 14,
  },
});

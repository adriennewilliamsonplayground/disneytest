import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

interface ContentCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
  accentColor?: string;
  children?: React.ReactNode;
}

export default function ContentCard({
  title,
  subtitle,
  icon,
  onPress,
  accentColor = colors.primary.purple,
  children,
}: ContentCardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={styles.card}
      {...(onPress ? { onPress, activeOpacity: 0.7 } : {})}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: accentColor + '15' }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 22,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h4,
    color: colors.neutral.charcoal,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.neutral.gray,
    marginTop: spacing.xxs,
  },
  content: {
    marginTop: spacing.md,
  },
});

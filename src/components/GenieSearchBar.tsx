import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

interface GenieSearchBarProps {
  onPress: () => void;
}

export default function GenieSearchBar({ onPress }: GenieSearchBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bar} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.genieAvatar}>
          <Text style={styles.genieEmoji}>{'🧞'}</Text>
        </View>
        <Text style={styles.placeholder}>Ask Genie anything...</Text>
        <View style={styles.searchIcon}>
          <Text style={styles.searchEmoji}>{'🔍'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.sm,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.neutral.white,
    paddingHorizontal: spacing.md,
    ...shadows.lg,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  genieAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(91, 44, 142, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  genieEmoji: {
    fontSize: 18,
  },
  placeholder: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.gray,
  },
  searchIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchEmoji: {
    fontSize: 16,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

interface DayTab {
  date: string;
  dayOfWeek: string;
  dayNumber: string;
  isToday: boolean;
}

interface DayTabStripProps {
  days: DayTab[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function DayTabStrip({
  days,
  selectedDate,
  onSelectDate,
}: DayTabStripProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {days.map(day => {
        const isSelected = day.date === selectedDate;
        return (
          <TouchableOpacity
            key={day.date}
            style={[styles.tab, isSelected && styles.tabSelected]}
            onPress={() => onSelectDate(day.date)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayOfWeek,
                isSelected && styles.dayOfWeekSelected,
              ]}
            >
              {day.dayOfWeek}
            </Text>
            <Text
              style={[
                styles.dayNumber,
                isSelected && styles.dayNumberSelected,
              ]}
            >
              {day.dayNumber}
            </Text>
            {day.isToday && <View style={styles.todayDot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  tab: {
    width: 52,
    height: 68,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.lightGray,
  },
  tabSelected: {
    backgroundColor: colors.primary.purple,
    borderColor: colors.primary.purple,
    ...shadows.sm,
  },
  dayOfWeek: {
    ...typography.caption,
    color: colors.neutral.gray,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dayOfWeekSelected: {
    color: 'rgba(255,255,255,0.7)',
  },
  dayNumber: {
    ...typography.h4,
    color: colors.neutral.charcoal,
    marginTop: spacing.xxs,
  },
  dayNumberSelected: {
    color: colors.neutral.white,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary.magenta,
    marginTop: spacing.xxs,
  },
});

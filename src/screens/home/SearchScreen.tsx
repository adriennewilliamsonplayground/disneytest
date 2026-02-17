import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { useAppSelector } from '../../store';
import { getLandDisplayName } from '../../data/attractions';
import { diningLocations } from '../../data/dining';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SearchScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const attractions = useAppSelector(state => state.attractions.items);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();

    const matchedAttractions = attractions
      .filter(
        a =>
          a.name.toLowerCase().includes(q) ||
          a.tags.some(t => t.includes(q)) ||
          a.land.includes(q) ||
          a.description.toLowerCase().includes(q)
      )
      .map(a => ({
        id: a.id,
        type: 'attraction' as const,
        name: a.name,
        subtitle: getLandDisplayName(a.land),
        icon: a.category === 'ride' ? '🎢' : a.category === 'show' ? '🎭' : '🎪',
      }));

    const matchedDining = diningLocations
      .filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.cuisine.some(c => c.toLowerCase().includes(q)) ||
          d.tags.some(t => t.includes(q))
      )
      .map(d => ({
        id: d.id,
        type: 'dining' as const,
        name: d.name,
        subtitle: `${d.diningType.replace('_', ' ')} - ${getLandDisplayName(d.land)}`,
        icon: '🍽️',
      }));

    return [...matchedAttractions, ...matchedDining];
  }, [query, attractions]);

  const quickSearches = [
    { label: 'Coasters', query: 'coaster' },
    { label: 'Family rides', query: 'family' },
    { label: 'Quick service', query: 'quick' },
    { label: 'Shows', query: 'show' },
    { label: 'Characters', query: 'character' },
  ];

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <View style={styles.genieAvatar}>
            <Text style={styles.genieEmoji}>{'🧞'}</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Ask Genie anything..."
            placeholderTextColor={colors.neutral.gray}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeText}>{'✕'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {query.length < 2 ? (
          <>
            {/* Quick Searches */}
            <Text style={styles.sectionTitle}>Quick Searches</Text>
            <View style={styles.quickSearches}>
              {quickSearches.map(item => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.quickChip}
                  onPress={() => setQuery(item.query)}
                >
                  <Text style={styles.quickChipText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Genie hint */}
            <View style={styles.genieHint}>
              <Text style={styles.genieHintIcon}>{'💡'}</Text>
              <Text style={styles.genieHintText}>
                Try asking "What should I ride next?" or "Where can I get a snack nearby?"
              </Text>
            </View>
          </>
        ) : results.length > 0 ? (
          <>
            <Text style={styles.resultCount}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </Text>
            {results.map(result => (
              <TouchableOpacity
                key={result.id}
                style={styles.resultRow}
                onPress={() => {
                  if (result.type === 'attraction') {
                    navigation.navigate('AttractionDetail', {
                      attractionId: result.id,
                    });
                  }
                }}
              >
                <Text style={styles.resultIcon}>{result.icon}</Text>
                <View style={styles.resultText}>
                  <Text style={styles.resultName}>{result.name}</Text>
                  <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsIcon}>{'🔍'}</Text>
            <Text style={styles.noResultsText}>
              No results for "{query}"
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  header: {
    paddingTop: spacing.huge,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.neutral.charcoal,
    paddingVertical: spacing.sm,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  closeText: {
    fontSize: 14,
    color: colors.neutral.darkGray,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.neutral.charcoal,
    marginBottom: spacing.md,
  },
  quickSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  quickChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.neutral.offWhite,
  },
  quickChipText: {
    ...typography.buttonSmall,
    color: colors.neutral.charcoal,
  },
  genieHint: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(91, 44, 142, 0.05)',
  },
  genieHintIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  genieHintText: {
    ...typography.body,
    color: colors.neutral.darkGray,
    flex: 1,
  },
  resultCount: {
    ...typography.bodySmall,
    color: colors.neutral.gray,
    marginBottom: spacing.md,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.offWhite,
  },
  resultIcon: {
    fontSize: 24,
    marginRight: spacing.md,
    width: 36,
    textAlign: 'center',
  },
  resultText: {
    flex: 1,
  },
  resultName: {
    ...typography.body,
    color: colors.neutral.charcoal,
    fontWeight: '600',
  },
  resultSubtitle: {
    ...typography.bodySmall,
    color: colors.neutral.gray,
    textTransform: 'capitalize',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: spacing.massive,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  noResultsText: {
    ...typography.body,
    color: colors.neutral.gray,
  },
});

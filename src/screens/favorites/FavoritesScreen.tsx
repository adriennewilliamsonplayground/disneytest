import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleFavorite } from '../../store/slices/attractionsSlice';
import AttractionCard from '../../components/AttractionCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FavoritesScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const dispatch = useAppDispatch();
  const attractions = useAppSelector(state => state.attractions.items);
  const favorites = attractions.filter(a => a.isFavorite);

  const handleAttractionPress = (id: string) => {
    navigation.navigate('AttractionDetail', { attractionId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} saved experience{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favorites.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {favorites.map(attraction => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onPress={() => handleAttractionPress(attraction.id)}
              onFavorite={() => dispatch(toggleFavorite(attraction.id))}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>{'❤️'}</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart on any attraction to save it here
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.offWhite,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.huge,
    paddingBottom: spacing.lg,
    backgroundColor: colors.neutral.white,
  },
  title: {
    ...typography.h1,
    color: colors.neutral.charcoal,
  },
  subtitle: {
    ...typography.body,
    color: colors.neutral.darkGray,
    marginTop: spacing.xs,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.neutral.charcoal,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.neutral.gray,
    textAlign: 'center',
  },
});

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/home/SearchScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AttractionDetailScreen from '../screens/attractions/AttractionDetailScreen';

// ─── Home Stack ──────────────────────────────────────────────────────

export type HomeStackParamList = {
  HomeMain: undefined;
  AttractionDetail: { attractionId: string };
  Search: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen
        name="AttractionDetail"
        component={AttractionDetailScreen}
      />
      <HomeStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ animation: 'fade' }}
      />
    </HomeStack.Navigator>
  );
}

// ─── Favorites Stack ─────────────────────────────────────────────────

export type FavoritesStackParamList = {
  FavoritesMain: undefined;
  AttractionDetail: { attractionId: string };
};

const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStack.Screen name="FavoritesMain" component={FavoritesScreen} />
      <FavoritesStack.Screen
        name="AttractionDetail"
        component={AttractionDetailScreen}
      />
    </FavoritesStack.Navigator>
  );
}

// ─── Bottom Tabs ─────────────────────────────────────────────────────

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inactive,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={styles.tabIcon}>{focused ? '❤️' : '🤍'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={styles.tabIcon}>
              {focused ? '🏰' : '🏠'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={styles.tabIcon}>{focused ? '👤' : '👤'}</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar.background,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
    height: 85,
    paddingTop: 8,
  },
  tabLabel: {
    ...typography.tabLabel,
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 22,
  },
});

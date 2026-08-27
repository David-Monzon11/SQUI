import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MealLogScreen } from '../screens/meal/MealLogScreen';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';
import { MenuScreen } from '../screens/menu/MenuScreen';
import { IconHomeLeaf, IconSquiCameraLog, IconSquiTrends, IconSquiSettings, IconSquiAcornBackground } from '../components/common/Icons';
import { tabNavigatorStyles as styles } from './TabNavigator.styles';
import { MealItem } from '../types';

export type MainTabKey = 'dashboard' | 'meal' | 'analytics' | 'settings';

export const TabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTabKey>('dashboard');
  const insets = useSafeAreaInsets();

  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: '1',
      mealCategory: 'BREAKFAST',
      foodName: 'Avocado Toast & Poached Egg',
      mealTime: '08:30 AM',
      portionSize: '1 serving',
      imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500&auto=format&fit=crop&q=80',
      nutrition: {
        sugarG: 2.1,
        sodiumMg: 380,
        caloriesKcal: 340,
        proteinG: 14,
        carbsG: 24,
        fatG: 18,
      },
    },
    {
      id: '2',
      mealCategory: 'LUNCH',
      foodName: 'Grilled Salmon Quinoa Bowl',
      mealTime: '12:45 PM',
      portionSize: '1 bowl',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
      nutrition: {
        sugarG: 3.5,
        sodiumMg: 520,
        caloriesKcal: 580,
        proteinG: 38,
        carbsG: 45,
        fatG: 22,
      },
    },
    {
      id: '3',
      mealCategory: 'SNACK',
      foodName: 'Greek Yogurt with Fresh Berries',
      mealTime: '04:15 PM',
      portionSize: '1 container',
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
      nutrition: {
        sugarG: 8.4,
        sodiumMg: 65,
        caloriesKcal: 180,
        proteinG: 15,
        carbsG: 17,
        fatG: 3.5,
      },
    },
  ]);

  const [waterIntakeMl, setWaterIntakeMl] = useState(1750);

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardScreen
            meals={meals}
            setMeals={setMeals}
            waterIntakeMl={waterIntakeMl}
            setWaterIntakeMl={setWaterIntakeMl}
            onNavigateToMeal={() => setActiveTab('meal')}
          />
        );
      case 'meal':
        return (
          <MealLogScreen
            meals={meals}
            onMealSaved={(newMeal) => {
              setMeals((prev) => [newMeal, ...prev]);
              setActiveTab('dashboard');
            }}
          />
        );
      case 'analytics':
        return <AnalyticsScreen />;
      case 'settings':
        return <MenuScreen />;
      default:
        return (
          <DashboardScreen
            meals={meals}
            setMeals={setMeals}
            waterIntakeMl={waterIntakeMl}
            setWaterIntakeMl={setWaterIntakeMl}
            onNavigateToMeal={() => setActiveTab('meal')}
          />
        );
    }
  };

  const tabs: { key: MainTabKey; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      key: 'dashboard',
      label: 'Today',
      icon: (active) => <IconHomeLeaf size={20} color={active ? '#1B432C' : '#5C7A68'} />,
    },
    {
      key: 'meal',
      label: 'Log Meal',
      icon: (active) => <IconSquiCameraLog size={20} color={active ? '#1B432C' : '#5C7A68'} />,
    },
    {
      key: 'analytics',
      label: 'Trends',
      icon: (active) => <IconSquiTrends size={20} color={active ? '#1B432C' : '#5C7A68'} />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: (active) => <IconSquiSettings size={20} color={active ? '#1B432C' : '#5C7A68'} />,
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {/* Streamlined 4-Tab Bottom Bar with Safe Inset */}
      <LinearGradient
        colors={['#FFFFFF', '#F5F7F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.tabBar, { bottom: Math.max(insets.bottom, 16) }]}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.key)}
            >
              {isActive && (
                <IconSquiAcornBackground size={54} color="#1B432C" />
              )}
              <View style={styles.tabItemContent}>
                <View style={styles.iconWrapper}>
                  {tab.icon(isActive)}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
};

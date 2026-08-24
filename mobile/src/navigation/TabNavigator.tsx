import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MealLogScreen } from '../screens/meal/MealLogScreen';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';
import { MenuScreen } from '../screens/menu/MenuScreen';
import { IconHome, IconFoodDiary, IconPulseTrend, IconSettings } from '../components/common/Icons';
import { tabNavigatorStyles as styles } from './TabNavigator.styles';

export type MainTabKey = 'dashboard' | 'meal' | 'analytics' | 'settings';

export const TabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTabKey>('dashboard');
  const insets = useSafeAreaInsets();

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'meal':
        return <MealLogScreen onMealSaved={() => setActiveTab('dashboard')} />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'settings':
        return <MenuScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const tabs: { key: MainTabKey; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      key: 'dashboard',
      label: 'Today',
      icon: (active) => <IconHome size={20} color={active ? COLORS.primary : COLORS.textMuted} />,
    },
    {
      key: 'meal',
      label: 'Log Meal',
      icon: (active) => <IconFoodDiary size={20} color={active ? COLORS.primary : COLORS.textMuted} />,
    },
    {
      key: 'analytics',
      label: 'Trends',
      icon: (active) => <IconPulseTrend size={20} color={active ? COLORS.primary : COLORS.textMuted} />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: (active) => <IconSettings size={20} color={active ? COLORS.primary : COLORS.textMuted} />,
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.screenContainer}>{renderScreen()}</View>

      {/* Streamlined 4-Tab Bottom Bar with Safe Inset */}
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.key)}
            >
              <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
                {tab.icon(isActive)}
              </View>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

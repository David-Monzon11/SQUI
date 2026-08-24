import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import { MascotBanner } from '../../components/dashboard/MascotBanner';
import { SquiLogo } from '../../components/common/SquiLogo';
import { IconScale, IconDroplet, IconCameraPlus } from '../../components/common/Icons';
import { dashboardStyles as styles } from './Dashboard.styles';

interface MealItem {
  id: string;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  name: string;
  time: string;
  sugarG: number;
  sodiumMg: number;
  caloriesKcal: number;
  proteinG: number;
  imageUrl?: string;
}

export const DashboardScreen: React.FC = () => {
  const [todayWeightKg, setTodayWeightKg] = useState(68.2);
  const [tempWeightInput, setTempWeightInput] = useState('68.2');
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [waterIntakeMl, setWaterIntakeMl] = useState(1750);

  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: 'meal-1',
      category: 'BREAKFAST',
      name: 'Rolled Oats with Fresh Blueberries',
      time: '8:30 AM',
      sugarG: 8,
      sodiumMg: 150,
      caloriesKcal: 380,
      proteinG: 12,
    },
    {
      id: 'meal-2',
      category: 'LUNCH',
      name: 'Grilled Salmon & Spinach Salad',
      time: '12:45 PM',
      sugarG: 6,
      sodiumMg: 920, // High sodium (>800mg) for testing
      caloriesKcal: 520,
      proteinG: 38,
    },
  ]);

  // Aggregate totals
  const totalSugar = meals.reduce((acc, m) => acc + m.sugarG, 0);
  const totalSodium = meals.reduce((acc, m) => acc + m.sodiumMg, 0);

  const sugarPct = Math.min(Math.round((totalSugar / 25) * 100), 100);
  const sodiumPct = Math.min(Math.round((totalSodium / 2000) * 100), 100);

  const getSugarColor = () => (totalSugar > 25 ? '#C53030' : totalSugar > 18 ? '#D97706' : '#2D6A4F');
  const getSodiumColor = () => (totalSodium > 2000 ? '#C53030' : totalSodium > 1400 ? '#D97706' : '#2D6A4F');

  const sugarStatus = totalSugar > 25 ? 'EXCEEDED' : totalSugar > 18 ? 'CAUTION' : 'SAFE';
  const sodiumStatus = totalSodium > 2000 ? 'EXCEEDED' : totalSodium > 1400 ? 'CAUTION' : 'SAFE';

  const handleWaterIncrement = () => {
    setWaterIntakeMl((prev) => prev + 250);
  };

  const handleSaveWeight = () => {
    const parsed = parseFloat(tempWeightInput);
    if (!isNaN(parsed) && parsed > 20 && parsed < 300) {
      setTodayWeightKg(parsed);
    }
    setIsWeightModalOpen(false);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Integrated Date & Circular Avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingTitle}>Good day, Alex</Text>
            <Text style={styles.greetingSubtitle}>Friday, Aug 21 • Mindful food choices</Text>
          </View>
          <SquiLogo size={46} variant="circle" />
        </View>

        {/* SQUI Mascot Reflection Banner */}
        <MascotBanner
          healthScore={88}
          tip="SQUI says: Mindful sugar balance today! Sodium was slightly higher from lunch—balance it with extra hydration before dinner."
        />

        {/* Section Label: Daily Vitals */}
        <Text style={styles.sectionLabel}>Daily Vitals</Text>

        {/* Row 1: Weight & Hydration */}
        <View style={styles.statsRow}>
          {/* Interactive Tap-to-Log Weight Card */}
          <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.7}
            onPress={() => {
              setTempWeightInput(todayWeightKg.toString());
              setIsWeightModalOpen(true);
            }}
          >
            <View style={styles.statTileHeader}>
              <Text style={styles.statLabel}>Weight Trend</Text>
              <IconScale size={16} color="#2D6A4F" />
            </View>
            <Text style={styles.statValue}>
              {todayWeightKg} <Text style={styles.statUnit}>kg</Text>
            </Text>
            <Text style={styles.statTrend}>-0.2 kg vs last wk ✎</Text>
          </TouchableOpacity>

          {/* Hydration Card */}
          <View style={styles.statCard}>
            <View style={styles.statTileHeader}>
              <Text style={styles.statLabel}>Daily Hydration</Text>
              <IconDroplet size={16} color="#2D6A4F" />
            </View>
            <Text style={styles.statValue}>
              {waterIntakeMl.toLocaleString()} <Text style={styles.statUnit}>ml</Text>
            </Text>
            <TouchableOpacity style={styles.quickWaterBtn} onPress={handleWaterIncrement}>
              <Text style={styles.quickWaterText}>+ 250ml Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Label: Daily Nutrient Limits */}
        <Text style={styles.sectionLabel}>Daily Nutrient Focus</Text>

        {/* Row 2: Separate 2-Column Cards for Sugar and Sodium */}
        <View style={styles.statsRow}>
          {/* Sugar Card */}
          <View style={styles.statCard}>
            <View style={styles.statTileHeader}>
              <Text style={styles.statLabel}>Sugar Intake</Text>
              <Text style={styles.statusBadge(sugarStatus)}>{sugarStatus}</Text>
            </View>
            <Text style={styles.statValue}>
              {totalSugar}
              <Text style={styles.statUnit}>g </Text>
              <Text style={{ fontSize: 11.5, color: '#849C8D' }}>/ 25g</Text>
            </Text>
            <View style={styles.trackBg}>
              <View style={styles.trackFill(sugarPct, getSugarColor())} />
            </View>
          </View>

          {/* Sodium Card */}
          <View style={styles.statCard}>
            <View style={styles.statTileHeader}>
              <Text style={styles.statLabel}>Sodium Intake</Text>
              <Text style={styles.statusBadge(sodiumStatus)}>{sodiumStatus}</Text>
            </View>
            <Text style={styles.statValue}>
              {totalSodium.toLocaleString()}
              <Text style={[styles.statUnit, { fontSize: 11 }]}>mg </Text>
              <Text style={{ fontSize: 11, color: '#849C8D' }}>/ 2000mg</Text>
            </Text>
            <View style={styles.trackBg}>
              <View style={styles.trackFill(sodiumPct, getSodiumColor())} />
            </View>
          </View>
        </View>

        {/* Food Journal Section Header */}
        <View style={styles.diarySectionHeader}>
          <Text style={styles.diarySectionTitle}>Visual Food Diary</Text>
          <TouchableOpacity>
            <Text style={styles.addMealLink}>+ Log Meal</Text>
          </TouchableOpacity>
        </View>

        {/* Rich Meal Cards */}
        {meals.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <SquiLogo size={44} variant="squircle" />
            <Text style={styles.emptyStateTitle}>No meals logged yet today</Text>
            <Text style={styles.emptyStateSub}>
              Snap a photo of your breakfast to kickstart your mindful food journey!
            </Text>
            <TouchableOpacity style={styles.emptyStateBtn}>
              <Text style={styles.emptyStateBtnText}>+ Log First Meal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          meals.map((meal) => {
            const isHighSodium = meal.sodiumMg >= 800;
            return (
              <View key={meal.id} style={styles.mealCard}>
                <View style={styles.mealPhotoWrap}>
                  {meal.imageUrl ? (
                    <Image source={{ uri: meal.imageUrl }} style={styles.mealPhoto} />
                  ) : (
                    <IconCameraPlus size={22} color="#2D6A4F" />
                  )}
                </View>
                <View style={styles.mealContent}>
                  <View style={styles.mealTopRow}>
                    <Text style={styles.mealCategoryPill}>{meal.category}</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  </View>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <View style={styles.mealMacrosRow}>
                    <Text style={styles.macroPill}>🍬 {meal.sugarG}g Sugar</Text>
                    <Text style={styles.macroPill}>•</Text>
                    <Text style={styles.macroPill}>🧂 {meal.sodiumMg}mg Sodium</Text>
                    {isHighSodium && (
                      <Text style={styles.highSodiumAlertPill}>⚠️ High Sodium</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Quick Weight Logger Modal */}
        <Modal visible={isWeightModalOpen} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Log Morning Weight</Text>
              <Text style={styles.modalSub}>
                Consistent morning weigh-ins provide the most accurate long-term trend.
              </Text>
              <TextInput
                style={styles.weightInput}
                value={tempWeightInput}
                onChangeText={setTempWeightInput}
                keyboardType="decimal-pad"
                placeholder="68.0"
                autoFocus
              />
              <TouchableOpacity style={styles.saveWeightBtn} onPress={handleSaveWeight}>
                <Text style={styles.saveWeightBtnText}>Save Weigh-in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsWeightModalOpen(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

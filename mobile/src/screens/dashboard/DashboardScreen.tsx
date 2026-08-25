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
import { LinearGradient } from 'expo-linear-gradient';
import { MascotBanner } from '../../components/dashboard/MascotBanner';
import { SquiLogo } from '../../components/common/SquiLogo';
import {
  IconSquiScale,
  IconSquiHydration,
  IconSquiSugar,
  IconSquiSodium,
  IconCameraPlus,
} from '../../components/common/Icons';
import { DailyNutrientDetailScreen } from '../nutrition/DailyNutrientDetailScreen';
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
  const [isNutrientDetailOpen, setIsNutrientDetailOpen] = useState(false);
  const [selectedNutrientType, setSelectedNutrientType] = useState<'SUGAR' | 'SODIUM'>('SUGAR');

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

  const getSugarColor = () => (totalSugar > 25 ? '#EF4444' : totalSugar > 18 ? '#F59E0B' : '#10B981');
  const getSodiumColor = () => (totalSodium > 2000 ? '#EF4444' : totalSodium > 1400 ? '#F59E0B' : '#10B981');

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

        {/* Row 1: Watermarked Bento Vitals Cards */}
        <View style={styles.statsRow}>
          {/* Weight Bento Card (Soft Botanical Forest Slate) */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setTempWeightInput(todayWeightKg.toString());
              setIsWeightModalOpen(true);
            }}
          >
            <LinearGradient
              colors={['#1E3A2F', '#152C23', '#0E2019']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark (Bottom-Right) */}
              <View style={styles.bentoWatermark}>
                <IconSquiScale size={74} color="#34D399" />
              </View>

              {/* 2. Top Row: Frosted Badge + Floating (+) Action */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('emerald')}>
                  <IconSquiScale size={18} color="#6EE7B7" />
                </View>
                <TouchableOpacity
                  style={styles.bentoFloatingPlus('emerald')}
                  activeOpacity={0.75}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => {
                    setTempWeightInput(todayWeightKg.toString());
                    setIsWeightModalOpen(true);
                  }}
                >
                  <Text style={styles.bentoPlusText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* 3. Metric Content Stack */}
              <View style={styles.bentoContent}>
                <Text style={styles.bentoLabel}>WEIGHT TREND</Text>
                <View style={styles.bentoValueRow}>
                  <Text style={styles.bentoMainValue}>
                    {todayWeightKg}
                    <Text style={styles.bentoUnit}> kg</Text>
                  </Text>
                </View>
                <Text style={styles.bentoSubText}>↓ 0.2 kg vs last wk</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Hydration Bento Card (Soft Nordic Slate Azure) */}
          <View style={styles.bentoTouchWrap}>
            <LinearGradient
              colors={['#1B3547', '#122736', '#0C1B26']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark (Bottom-Right) */}
              <View style={styles.bentoWatermark}>
                <IconSquiHydration size={74} color="#38BDF8" />
              </View>

              {/* 2. Top Row: Frosted Badge + Floating (+) Quick Water Log */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('cyan')}>
                  <IconSquiHydration size={18} color="#7DD3FC" />
                </View>
                <TouchableOpacity
                  style={styles.bentoFloatingPlus('cyan')}
                  activeOpacity={0.75}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={handleWaterIncrement}
                >
                  <Text style={styles.bentoPlusText}>+</Text>
                </TouchableOpacity>
              </View>

              {/* 3. Metric Content Stack */}
              <View style={styles.bentoContent}>
                <Text style={styles.bentoLabel}>DAILY HYDRATION</Text>
                <View style={styles.bentoValueRow}>
                  <Text style={styles.bentoMainValue}>
                    {waterIntakeMl.toLocaleString()}
                    <Text style={[styles.bentoUnit, { fontSize: 11 }]}> ml</Text>
                  </Text>
                </View>
                <Text style={styles.bentoSubText}>of 2,500ml target ({Math.round((waterIntakeMl / 2500) * 100)}%)</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Section Label: Daily Nutrients Consumed (Clean without redundant button) */}
        <Text style={styles.sectionLabel}>Daily Nutrients Consumed</Text>

        {/* Row 2: Interactive Watermarked Bento Nutrient Consumed Cards */}
        <View style={styles.statsRow}>
          {/* Sugar Consumed Bento Card (Soft Dark Amber Walnut Slate) */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedNutrientType('SUGAR');
              setIsNutrientDetailOpen(true);
            }}
          >
            <LinearGradient
              colors={['#3B2C20', '#2B1E14', '#1E140C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark */}
              <View style={styles.bentoWatermark}>
                <IconSquiSugar size={74} color="#FBBF24" />
              </View>

              {/* 2. Top Row: Frosted Badge + Glass Status Badge */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('amber')}>
                  <IconSquiSugar size={18} color="#FDE68A" />
                </View>
                <View style={styles.glassStatusBadge(sugarStatus)}>
                  <View style={styles.statusGlowDot(sugarStatus)} />
                  <Text style={styles.statusBadgeText(sugarStatus)}>{sugarStatus}</Text>
                </View>
              </View>

              {/* 3. Metric Content Stack */}
              <View style={styles.bentoContent}>
                <Text style={styles.bentoLabel}>SUGAR CONSUMED</Text>
                <View style={styles.bentoValueRow}>
                  <Text style={styles.bentoMainValue}>
                    {totalSugar}
                    <Text style={styles.bentoUnit}> g</Text>
                  </Text>
                </View>
                <Text style={styles.bentoSubText}>of 25g daily target</Text>
                <View style={styles.bentoTrackBg}>
                  <View style={styles.bentoTrackFill(sugarPct, getSugarColor())} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sodium Consumed Bento Card (Soft Jade Mineral Slate) */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedNutrientType('SODIUM');
              setIsNutrientDetailOpen(true);
            }}
          >
            <LinearGradient
              colors={['#1E3A2F', '#152C23', '#0E2019']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark */}
              <View style={styles.bentoWatermark}>
                <IconSquiSodium size={74} color="#34D399" />
              </View>

              {/* 2. Top Row: Frosted Badge + Glass Status Badge */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('emerald')}>
                  <IconSquiSodium size={18} color="#6EE7B7" />
                </View>
                <View style={styles.glassStatusBadge(sodiumStatus)}>
                  <View style={styles.statusGlowDot(sodiumStatus)} />
                  <Text style={styles.statusBadgeText(sodiumStatus)}>{sodiumStatus}</Text>
                </View>
              </View>

              {/* 3. Metric Content Stack */}
              <View style={styles.bentoContent}>
                <Text style={styles.bentoLabel}>SODIUM CONSUMED</Text>
                <View style={styles.bentoValueRow}>
                  <Text style={styles.bentoMainValue}>
                    {totalSodium.toLocaleString()}
                    <Text style={[styles.bentoUnit, { fontSize: 11 }]}> mg</Text>
                  </Text>
                </View>
                <Text style={styles.bentoSubText}>of 2,000mg daily cap</Text>
                <View style={styles.bentoTrackBg}>
                  <View style={styles.bentoTrackFill(sodiumPct, getSodiumColor())} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Food Journal Section Header */}
        <View style={styles.diarySectionHeader}>
          <View>
            <Text style={styles.diarySectionTitle}>Visual Food Diary</Text>
            <Text style={{ fontSize: 11.5, color: '#6B8775', marginTop: 1 }}>Meals calculate your consumed nutrients</Text>
          </View>
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

        {/* Daily Nutrient Deep-Dive Breakdown Modal (Filtered Exclusively to Tapped Nutrient) */}
        <Modal visible={isNutrientDetailOpen} animationType="slide" onRequestClose={() => setIsNutrientDetailOpen(false)}>
          <DailyNutrientDetailScreen
            onBack={() => setIsNutrientDetailOpen(false)}
            nutrientType={selectedNutrientType}
            totalSugar={totalSugar}
            totalSodium={totalSodium}
            meals={meals}
          />
        </Modal>
      </ScrollView>
    </View>
  );
};

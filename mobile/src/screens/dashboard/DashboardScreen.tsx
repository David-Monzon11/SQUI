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
import { WeatherCard } from '../../components/dashboard/WeatherCard';
import { SquiLogo } from '../../components/common/SquiLogo';
import {
  IconSquiScale,
  IconSquiHydration,
  IconSquiSugar,
  IconSquiSodium,
  IconCameraPlus,
  IconPlus,
  IconWeatherSunCloud,
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

  const [meals] = useState<MealItem[]>([
    {
      id: '1',
      category: 'BREAKFAST',
      name: 'Avocado Toast & Poached Egg',
      time: '08:30 AM',
      sugarG: 2.1,
      sodiumMg: 380,
      caloriesKcal: 340,
      proteinG: 14,
    },
    {
      id: '2',
      category: 'LUNCH',
      name: 'Grilled Salmon Quinoa Bowl',
      time: '12:45 PM',
      sugarG: 3.5,
      sodiumMg: 520,
      caloriesKcal: 580,
      proteinG: 38,
    },
    {
      id: '3',
      category: 'SNACK',
      name: 'Greek Yogurt with Fresh Berries',
      time: '04:15 PM',
      sugarG: 8.4,
      sodiumMg: 65,
      caloriesKcal: 180,
      proteinG: 15,
    },
  ]);

  const totalSugar = meals.reduce((acc, m) => acc + m.sugarG, 0);
  const totalSodium = meals.reduce((acc, m) => acc + m.sodiumMg, 0);

  const getSugarStatus = (val: number) => {
    if (val <= 17.5) return 'SAFE';
    if (val <= 25) return 'CAUTION';
    return 'EXCEEDED';
  };

  const getSodiumStatus = (val: number) => {
    if (val <= 1400) return 'SAFE';
    if (val <= 2000) return 'CAUTION';
    return 'EXCEEDED';
  };

  const sugarStatus = getSugarStatus(totalSugar);
  const sodiumStatus = getSodiumStatus(totalSodium);

  const sugarPct = Math.min(Math.round((totalSugar / 25) * 100), 100);
  const sodiumPct = Math.min(Math.round((totalSodium / 2000) * 100), 100);

  const handleWaterIncrement = () => {
    setWaterIntakeMl((prev) => prev + 250);
  };

  const handleSaveWeight = () => {
    const parsed = parseFloat(tempWeightInput);
    if (!isNaN(parsed) && parsed > 20 && parsed < 300) {
      setTodayWeightKg(parsed);
      setIsWeightModalOpen(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      {/* 📜 Scrollable Feed */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Integrated Date & Circular Avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingTitle}>Good day, Alex</Text>
            <Text style={styles.greetingSubtitle}>Friday, Aug 21 • Mindful food choices</Text>
          </View>
          <SquiLogo size={46} variant="circle" />
        </View>

        {/* SQUI Mascot Reflection Hero Banner */}
        <MascotBanner
          healthScore={88}
          tip="SQUI says: Mindful sugar balance today! Sodium was slightly higher from lunch—balance it with extra hydration before dinner."
        />

        {/* Section Label: Daily Vitals */}
        <Text style={styles.sectionLabel}>Daily Vitals</Text>

        {/* Row 1: Watermarked Bento Vitals Cards */}
        <View style={styles.statsRow}>
          {/* Weight Bento Card (2-Side Emerald Gradient) */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setTempWeightInput(todayWeightKg.toString());
              setIsWeightModalOpen(true);
            }}
          >
            <LinearGradient
              colors={['#10B981', '#059669', '#047857']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark (Bottom-Right Lifted) */}
              <View style={styles.bentoWatermark}>
                <IconSquiScale size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              {/* 2. Top Row: Frosted Badge + Circular Frosted (+) Action */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('emerald')}>
                  <IconSquiScale size={18} color="#FFFFFF" />
                </View>
                <TouchableOpacity
                  style={styles.bentoFloatingPlus}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  onPress={() => {
                    setTempWeightInput(todayWeightKg.toString());
                    setIsWeightModalOpen(true);
                  }}
                >
                  <IconPlus size={16} color="#FFFFFF" strokeWidth={2.4} />
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

          {/* Hydration Bento Card (2-Side Azure Gradient) */}
          <View style={styles.bentoTouchWrap}>
            <LinearGradient
              colors={['#0EA5E9', '#0284C7', '#0369A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark (Bottom-Right Lifted) */}
              <View style={styles.bentoWatermark}>
                <IconSquiHydration size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              {/* 2. Top Row: Frosted Badge + Circular Frosted (+) Quick Water Log */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('cyan')}>
                  <IconSquiHydration size={18} color="#FFFFFF" />
                </View>
                <TouchableOpacity
                  style={styles.bentoFloatingPlus}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  onPress={handleWaterIncrement}
                >
                  <IconPlus size={16} color="#FFFFFF" strokeWidth={2.4} />
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
          {/* Sugar Consumed Bento Card (2-Side Sunset Amber Gradient) */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedNutrientType('SUGAR');
              setIsNutrientDetailOpen(true);
            }}
          >
            <LinearGradient
              colors={['#F59E0B', '#EA580C', '#C2410C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark Lifted */}
              <View style={styles.bentoWatermark}>
                <IconSquiSugar size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              {/* 2. Top Row: Frosted Badge + Glass Status Badge */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('amber')}>
                  <IconSquiSugar size={18} color="#FFFFFF" />
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
                  <View style={styles.bentoTrackFill(sugarPct, '#FFFFFF')} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sodium Consumed Bento Card (2-Side Jade Forest Gradient) */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedNutrientType('SODIUM');
              setIsNutrientDetailOpen(true);
            }}
          >
            <LinearGradient
              colors={['#10B981', '#059669', '#065F46']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              {/* 1. Large Ambient Ghost Watermark Lifted */}
              <View style={styles.bentoWatermark}>
                <IconSquiSodium size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              {/* 2. Top Row: Frosted Badge + Glass Status Badge */}
              <View style={styles.bentoTopRow}>
                <View style={styles.bentoIconBadge('emerald')}>
                  <IconSquiSodium size={18} color="#FFFFFF" />
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
                  <View style={styles.bentoTrackFill(sodiumPct, '#FFFFFF')} />
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

        {/* ========================================================================= */}
        {/* 🌤️ 3D CLAYMORPHIC MINDFUL WEATHER & CLIMATE CARD (Montreal Reference)    */}
        {/* ========================================================================= */}
        <WeatherCard />

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

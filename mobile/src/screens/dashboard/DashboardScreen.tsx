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
  IconPlus,
} from '../../components/common/Icons';
import { DailyNutrientDetailScreen } from '../nutrition/DailyNutrientDetailScreen';
import { dashboardStyles as styles } from './Dashboard.styles';
import { MealItem } from '../../types';

interface DashboardScreenProps {
  meals: MealItem[];
  setMeals: React.Dispatch<React.SetStateAction<MealItem[]>>;
  waterIntakeMl: number;
  setWaterIntakeMl: React.Dispatch<React.SetStateAction<number>>;
  onNavigateToMeal: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  meals,
  setMeals,
  waterIntakeMl,
  setWaterIntakeMl,
  onNavigateToMeal,
}) => {
  const [todayWeightKg, setTodayWeightKg] = useState(68.2);
  const [tempWeightInput, setTempWeightInput] = useState('68.2');
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isNutrientDetailOpen, setIsNutrientDetailOpen] = useState(false);
  const [selectedNutrientType, setSelectedNutrientType] = useState<'SUGAR' | 'SODIUM'>('SUGAR');
  const [selectedDetailMeal, setSelectedDetailMeal] = useState<MealItem | null>(null);

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


  const totalSugar = meals.reduce((acc, m) => acc + (m.nutrition.sugarG || 0), 0);
  const totalSodium = meals.reduce((acc, m) => acc + (m.nutrition.sodiumMg || 0), 0);

  // SQUI Dynamic Health Score (0-100)
  const hydrationScore = Math.min((waterIntakeMl / 2500) * 20, 20);
  const sugarScore = totalSugar <= 25 ? 30 : totalSugar <= 50 ? 15 : 0;
  const sodiumScore = totalSodium <= 2000 ? 30 : totalSodium <= 3000 ? 15 : 0;
  const completenessScore = meals.length >= 3 ? 20 : meals.length === 2 ? 15 : meals.length === 1 ? 10 : 0;
  const healthScore = Math.round(hydrationScore + sugarScore + sodiumScore + completenessScore);

  const sugarStatus = totalSugar <= 17.5 ? 'SAFE' : totalSugar <= 25 ? 'CAUTION' : 'EXCEEDED';
  const sodiumStatus = totalSodium <= 1400 ? 'SAFE' : totalSodium <= 2000 ? 'CAUTION' : 'EXCEEDED';

  const sugarPct = Math.min(Math.round((totalSugar / 25) * 100), 100);
  const sodiumPct = Math.min(Math.round((totalSodium / 2000) * 100), 100);

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
          healthScore={healthScore}
          sugarG={totalSugar}
          sodiumMg={totalSodium}
          waterMl={waterIntakeMl}
          mealCount={meals.length}
        />

        {/* Section Label: Daily Vitals */}
        <Text style={styles.sectionLabel}>Daily Vitals</Text>

        {/* Row 1: Watermarked Bento Vitals Cards */}
        <View style={styles.statsRow}>
          {/* Weight Bento Card */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setTempWeightInput(todayWeightKg.toString());
              setIsWeightModalOpen(true);
            }}
          >
            <LinearGradient
              colors={['#1A2E22', '#101C15', '#0A120E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiScale size={66} color="#10B981" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('emerald'), { backgroundColor: '#10B981', borderColor: '#10B981' }]}>
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

          {/* Hydration Bento Card */}
          <View style={styles.bentoTouchWrap}>
            <LinearGradient
              colors={['#1A2E22', '#101C15', '#0A120E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiHydration size={66} color="#0EA5E9" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('cyan'), { backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' }]}>
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

        {/* Section Label: Daily Nutrients Consumed */}
        <Text style={styles.sectionLabel}>Daily Nutrients Consumed</Text>

        <View style={styles.statsRow}>
          {/* Sugar Consumed Bento Card */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedNutrientType('SUGAR');
              setIsNutrientDetailOpen(true);
            }}
          >
            <LinearGradient
              colors={['#1A2E22', '#101C15', '#0A120E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiSugar size={66} color="#F59E0B" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('amber'), { backgroundColor: '#F59E0B', borderColor: '#F59E0B' }]}>
                  <IconSquiSugar size={18} color="#FFFFFF" />
                </View>
                <View style={styles.glassStatusBadge(sugarStatus)}>
                  <View style={styles.statusGlowDot(sugarStatus)} />
                  <Text style={styles.statusBadgeText(sugarStatus)}>{sugarStatus}</Text>
                </View>
              </View>

              <View style={styles.bentoContent}>
                <Text style={styles.bentoLabel}>SUGAR CONSUMED</Text>
                <View style={styles.bentoValueRow}>
                  <Text style={styles.bentoMainValue}>
                    {totalSugar.toFixed(1)}
                    <Text style={styles.bentoUnit}> g</Text>
                  </Text>
                </View>
                <Text style={styles.bentoSubText}>of 25g daily target</Text>
                <View style={styles.bentoTrackBg}>
                  <View style={[styles.bentoTrackFill(sugarPct, '#FFFFFF'), { backgroundColor: '#F59E0B' }]} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sodium Consumed Bento Card */}
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setSelectedNutrientType('SODIUM');
              setIsNutrientDetailOpen(true);
            }}
          >
            <LinearGradient
              colors={['#1A2E22', '#101C15', '#0A120E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiSodium size={66} color="#10B981" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('emerald'), { backgroundColor: '#10B981', borderColor: '#10B981' }]}>
                  <IconSquiSodium size={18} color="#FFFFFF" />
                </View>
                <View style={styles.glassStatusBadge(sodiumStatus)}>
                  <View style={styles.statusGlowDot(sodiumStatus)} />
                  <Text style={styles.statusBadgeText(sodiumStatus)}>{sodiumStatus}</Text>
                </View>
              </View>

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
                  <View style={[styles.bentoTrackFill(sodiumPct, '#FFFFFF'), { backgroundColor: '#10B981' }]} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Section: Today's Food Gallery (Wrapped in Parent Bento Card Container) */}
        {meals.length > 0 && (
          <View style={styles.galleryParentCard}>
            {/* Food Journal Section Header inside Card */}
            <View style={styles.galleryCardHeader}>
              <View>
                <Text style={styles.galleryCardTitle}>Today's Food Gallery</Text>
                <Text style={{ fontSize: 11, color: '#6B8775', marginTop: 1 }}>Mindful record of today's nourishment</Text>
              </View>
              <TouchableOpacity onPress={onNavigateToMeal}>
                <Text style={styles.galleryCardAction}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              {meals.map((meal) => {
                const isHighSodium = meal.nutrition.sodiumMg >= 800;
                return (
                  <TouchableOpacity
                    key={meal.id}
                    style={styles.gridCard}
                    activeOpacity={0.9}
                    onPress={() => setSelectedDetailMeal(meal)}
                  >
                    <Image source={{ uri: meal.imageUrl }} style={styles.gridCardImage} />
                    
                    {isHighSodium && (
                      <View style={styles.gridCardWarningDot} />
                    )}

                    {/* Bottom Text Overlay */}
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.85)']}
                      style={styles.gridCardTextOverlay}
                    >
                      <Text style={styles.gridCardCategory} numberOfLines={1}>
                        {meal.mealCategory}
                      </Text>
                      <Text style={styles.gridCardName} numberOfLines={1}>
                        {meal.foodName}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Bottom Status Banner inside Card */}
            <View style={styles.galleryCardFooterBanner}>
              <Text style={styles.galleryCardFooterText}>
                🐿️ SQUI: {meals.length} meal{meals.length > 1 ? 's' : ''} logged. Today's health score is {healthScore}/100!
              </Text>
            </View>
          </View>
        )}

        {/* Meal Detail Modal */}
        <Modal
          visible={selectedDetailMeal !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedDetailMeal(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.detailModalCard}>
              {selectedDetailMeal && (
                <>
                  {/* Category and Time Row */}
                  <View style={styles.detailModalHeader}>
                    <Text style={styles.detailModalCategory}>
                      {selectedDetailMeal.mealCategory}
                    </Text>
                    <Text style={styles.detailModalTime}>
                      {selectedDetailMeal.mealTime}
                    </Text>
                  </View>

                  {/* Food Name */}
                  <Text style={styles.detailModalTitle}>
                    {selectedDetailMeal.foodName}
                  </Text>
                  <Text style={styles.detailModalPortion}>
                    Portion: {selectedDetailMeal.portionSize}
                  </Text>

                  {/* Large Covered Image */}
                  {selectedDetailMeal.imageUrl && (
                    <View style={styles.detailModalPhotoWrap}>
                      <Image
                        source={{ uri: selectedDetailMeal.imageUrl }}
                        style={styles.detailModalPhoto}
                      />
                    </View>
                  )}

                  {/* Macros Row */}
                  <View style={styles.detailModalMacros}>
                    <View style={styles.detailModalMacroBox}>
                      <Text style={styles.detailModalMacroVal}>
                        {selectedDetailMeal.nutrition.caloriesKcal}
                      </Text>
                      <Text style={styles.detailModalMacroLabel}>Calories</Text>
                    </View>
                    <View style={styles.detailModalMacroBox}>
                      <Text style={styles.detailModalMacroVal}>
                        {selectedDetailMeal.nutrition.sugarG}g
                      </Text>
                      <Text style={styles.detailModalMacroLabel}>Sugar</Text>
                    </View>
                    <View style={styles.detailModalMacroBox}>
                      <Text style={styles.detailModalMacroVal}>
                        {selectedDetailMeal.nutrition.sodiumMg}mg
                      </Text>
                      <Text style={styles.detailModalMacroLabel}>Sodium</Text>
                    </View>
                    <View style={styles.detailModalMacroBox}>
                      <Text style={styles.detailModalMacroVal}>
                        {selectedDetailMeal.nutrition.proteinG || 0}g
                      </Text>
                      <Text style={styles.detailModalMacroLabel}>Protein</Text>
                    </View>
                  </View>

                  {/* SQUI Mascot Reflection/Advice */}
                  <View style={styles.detailMascotFeedback}>
                    <Text style={styles.detailMascotText}>
                      {selectedDetailMeal.nutrition.sodiumMg >= 800
                        ? '🐿️ SQUI says: A little high on sodium for this meal! Balance it by drinking extra water and focusing on fresh leafy greens for your next meal.'
                        : selectedDetailMeal.nutrition.sugarG >= 10
                        ? '🐿️ SQUI says: A bit sweet! Keep an eye on your remaining sugar budget for today. Great job tracking!'
                        : '🌿 SQUI says: Wonderful, balanced choice! Prepared with mindful nutrients to fuel your sustainable wellness.'}
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  <TouchableOpacity
                    style={styles.detailModalCloseBtn}
                    onPress={() => setSelectedDetailMeal(null)}
                  >
                    <Text style={styles.detailModalCloseBtnText}>Done</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

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
            meals={meals.map((m) => ({
              id: m.id,
              category: m.mealCategory,
              name: m.foodName,
              time: m.mealTime,
              sugarG: m.nutrition.sugarG,
              sodiumMg: m.nutrition.sodiumMg,
            }))}
          />
        </Modal>
      </ScrollView>
    </View>
  );
};

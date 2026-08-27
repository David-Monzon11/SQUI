import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MascotBanner } from '../../components/dashboard/MascotBanner';
import { WeatherCard } from '../../components/dashboard/WeatherCard';
import { SquiLogo } from '../../components/common/SquiLogo';
import { FONTS } from '../../constants/typography';
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
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [tempWaterInput, setTempWaterInput] = useState('250');
  const [isNutrientDetailOpen, setIsNutrientDetailOpen] = useState(false);
  const [selectedNutrientType, setSelectedNutrientType] = useState<'SUGAR' | 'SODIUM'>('SUGAR');
  const [selectedDetailMeal, setSelectedDetailMeal] = useState<MealItem | null>(null);

  // Horizontal Food Gallery Carousel Configurations
  const { width: screenWidth } = Dimensions.get('window');
  const carouselItemWidth = screenWidth - 64; // Adjusted to fit container card horizontal bounds
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (meals.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prevIndex) => {
        const nextIndex = prevIndex === meals.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000); // Auto-scroll every 4 seconds
    return () => clearInterval(interval);
  }, [meals.length]);

  const handleSaveWater = () => {
    const parsed = parseInt(tempWaterInput, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 5000) {
      setWaterIntakeMl((prev) => prev + parsed);
      setIsWaterModalOpen(false);
    }
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

  // Weight Classification Status based on BMI (Baseline average height: 1.75m)
  const userBmi = todayWeightKg / (1.75 * 1.75);
  const weightStatus = userBmi < 18.5 ? 'UNDERWEIGHT' : userBmi < 25.0 ? 'NORMAL' : userBmi < 30.0 ? 'OVERWEIGHT' : 'OBESE';

  // Hydration Level Status represented as completion percentage
  const hydrationPct = Math.round((waterIntakeMl / 2500) * 100);

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
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiScale size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('emerald'), { backgroundColor: 'rgba(255, 255, 255, 0.20)', borderColor: 'rgba(255, 255, 255, 0.30)', borderWidth: 1 }]}>
                  <IconSquiScale size={18} color="#FFFFFF" />
                </View>
                <View style={styles.glassStatusBadge(weightStatus)}>
                  <View style={styles.statusGlowDot(weightStatus)} />
                  <Text style={styles.statusBadgeText(weightStatus)}>{weightStatus}</Text>
                </View>
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
          <TouchableOpacity
            style={styles.bentoTouchWrap}
            activeOpacity={0.88}
            onPress={() => {
              setTempWaterInput('250');
              setIsWaterModalOpen(true);
            }}
          >
            <LinearGradient
              colors={['#0EA5E9', '#0284C7']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiHydration size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('cyan'), { backgroundColor: 'rgba(255, 255, 255, 0.20)', borderColor: 'rgba(255, 255, 255, 0.30)', borderWidth: 1 }]}>
                  <IconSquiHydration size={18} color="#FFFFFF" />
                </View>
                <View style={styles.glassStatusBadge(`${hydrationPct}%`)}>
                  <View style={styles.statusGlowDot(`${hydrationPct}%`)} />
                  <Text style={styles.statusBadgeText(`${hydrationPct}%`)}>{hydrationPct}%</Text>
                </View>
              </View>

              <View style={styles.bentoContent}>
                <Text style={styles.bentoLabel}>DAILY HYDRATION</Text>
                <View style={styles.bentoValueRow}>
                  <Text style={styles.bentoMainValue}>
                    {waterIntakeMl.toLocaleString()}
                    <Text style={[styles.bentoUnit, { fontSize: 11 }]}> ml</Text>
                  </Text>
                </View>
                <Text style={styles.bentoSubText}>of 2,500ml target</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
              colors={['#F59E0B', '#EA580C']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiSugar size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('amber'), { backgroundColor: 'rgba(255, 255, 255, 0.20)', borderColor: 'rgba(255, 255, 255, 0.30)', borderWidth: 1 }]}>
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
                  <View style={[styles.bentoTrackFill(sugarPct, '#FFFFFF'), { backgroundColor: '#FFFFFF' }]} />
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
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bentoCard}
            >
              <View style={[styles.bentoWatermark, { opacity: 0.12 }]}>
                <IconSquiSodium size={66} color="#FFFFFF" strokeWidth={1.8} />
              </View>

              <View style={styles.bentoTopRow}>
                <View style={[styles.bentoIconBadge('emerald'), { backgroundColor: 'rgba(255, 255, 255, 0.20)', borderColor: 'rgba(255, 255, 255, 0.30)', borderWidth: 1 }]}>
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
                  <View style={[styles.bentoTrackFill(sodiumPct, '#FFFFFF'), { backgroundColor: '#FFFFFF' }]} />
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

            <View style={{ width: carouselItemWidth, overflow: 'hidden', marginVertical: 8 }}>
              <FlatList
                ref={flatListRef}
                data={meals}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(event) => {
                  const scrollOffset = event.nativeEvent.contentOffset.x;
                  const index = Math.round(scrollOffset / carouselItemWidth);
                  setActiveSlideIndex(index);
                }}
                getItemLayout={(_data, index) => ({
                  length: carouselItemWidth,
                  offset: carouselItemWidth * index,
                  index,
                })}
                renderItem={({ item }) => {
                  const isHighSodium = item.nutrition.sodiumMg >= 800;
                  return (
                    <TouchableOpacity
                      style={{ width: carouselItemWidth, paddingRight: 4 }}
                      activeOpacity={0.9}
                      onPress={() => setSelectedDetailMeal(item)}
                    >
                      <View style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                        <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 160, resizeMode: 'cover' }} />
                        {isHighSodium && (
                          <View style={styles.gridCardWarningDot} />
                        )}
                      </View>

                      {/* Redesigned Label and Title Below Image */}
                      <View style={{ marginTop: 10, paddingHorizontal: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginRight: 8 }}>
                            <Text style={{ fontFamily: FONTS.roundedBold, fontSize: 10, color: '#10B981', textTransform: 'uppercase' }}>
                              {item.mealCategory}
                            </Text>
                          </View>
                          {isHighSodium && (
                            <View style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 }}>
                              <Text style={{ fontFamily: FONTS.roundedBold, fontSize: 10, color: '#EF4444' }}>
                                ⚠️ HIGH SODIUM
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text style={{ fontFamily: FONTS.roundedBlack, fontSize: 14.5, color: '#0F2418', marginTop: 5 }} numberOfLines={1}>
                          {item.foodName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

              {/* Custom Dot Indicators */}
              {meals.length > 1 && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 4 }}>
                  {meals.map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: activeSlideIndex === index ? 16 : 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: activeSlideIndex === index ? '#1B432C' : '#D1DDD6',
                        marginHorizontal: 3,
                      }}
                    />
                  ))}
                </View>
              )}
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

        {/* Quick Water Logger Modal */}
        <Modal visible={isWaterModalOpen} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Log Water Intake</Text>
              <Text style={styles.modalSub}>
                Staying hydrated supports digestion, energy levels, and overall vitality.
              </Text>

              {/* Quick Presets Row */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 }}>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: '#E0F2FE', paddingVertical: 10, borderRadius: 12, marginRight: 6, alignItems: 'center' }}
                  onPress={() => setTempWaterInput('250')}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: '#0369A1', fontFamily: FONTS.roundedBold, fontSize: 13 }}>+ 250ml</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: '#E0F2FE', paddingVertical: 10, borderRadius: 12, marginRight: 6, alignItems: 'center' }}
                  onPress={() => setTempWaterInput('500')}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: '#0369A1', fontFamily: FONTS.roundedBold, fontSize: 13 }}>+ 500ml</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: '#E0F2FE', paddingVertical: 10, borderRadius: 12, alignItems: 'center' }}
                  onPress={() => setTempWaterInput('1000')}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: '#0369A1', fontFamily: FONTS.roundedBold, fontSize: 13 }}>+ 1L</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.weightInput}
                value={tempWaterInput}
                onChangeText={setTempWaterInput}
                keyboardType="number-pad"
                placeholder="250"
                autoFocus
              />
              <TouchableOpacity style={[styles.saveWeightBtn, { backgroundColor: '#0284C7' }]} onPress={handleSaveWater}>
                <Text style={styles.saveWeightBtnText}>Add Water</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsWaterModalOpen(false)}
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

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IconSquiSugar, IconSquiSodium } from '../../components/common/Icons';
import { dailyNutrientDetailStyles as styles } from './DailyNutrientDetail.styles';

interface MealBreakdownItem {
  id: string;
  category: string;
  name: string;
  time: string;
  sugarG: number;
  sodiumMg: number;
}

interface DailyNutrientDetailScreenProps {
  onBack?: () => void;
  dateStr?: string;
  nutrientType?: 'SUGAR' | 'SODIUM';
  totalSugar?: number;
  totalSodium?: number;
  meals?: MealBreakdownItem[];
}

export const DailyNutrientDetailScreen: React.FC<DailyNutrientDetailScreenProps> = ({
  onBack,
  dateStr = 'Today, Aug 21',
  nutrientType = 'SUGAR',
  totalSugar = 14,
  totalSodium = 1200,
  meals = [
    {
      id: '1',
      category: 'BREAKFAST',
      name: 'Rolled Oats with Fresh Blueberries',
      time: '08:30 AM',
      sugarG: 8,
      sodiumMg: 150,
    },
    {
      id: '2',
      category: 'LUNCH',
      name: 'Grilled Salmon & Spinach Bowl',
      time: '12:45 PM',
      sugarG: 6,
      sodiumMg: 920,
    },
  ],
}) => {
  const isSugar = nutrientType === 'SUGAR';

  const sugarPct = Math.min(Math.round((totalSugar / 25) * 100), 100);
  const sodiumPct = Math.min(Math.round((totalSodium / 2000) * 100), 100);

  const sugarStatus = totalSugar > 25 ? 'EXCEEDED' : totalSugar > 18 ? 'CAUTION' : 'SAFE';
  const sodiumStatus = totalSodium > 2000 ? 'EXCEEDED' : totalSodium > 1400 ? 'CAUTION' : 'SAFE';

  const getSugarColor = () => (totalSugar > 25 ? '#EF4444' : totalSugar > 18 ? '#F59E0B' : '#10B981');
  const getSodiumColor = () => (totalSodium > 2000 ? '#EF4444' : totalSodium > 1400 ? '#F59E0B' : '#10B981');

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>
              {isSugar ? 'Daily Sugar Consumed' : 'Daily Sodium Consumed'}
            </Text>
            {onBack && (
              <TouchableOpacity style={styles.backBtn} activeOpacity={0.75} onPress={onBack}>
                <Text style={styles.backBtnText}>✕ Close</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.subtitle}>
            {isSugar
              ? `${dateStr} • WHO Recommended Target: ≤ 25g / day`
              : `${dateStr} • AHA Recommended Daily Cap: ≤ 2,000mg / day`}
          </Text>
        </View>

        {/* SINGLE FOCUSED NUTRIENT HERO CARD */}
        {isSugar ? (
          /* 1. SUGAR CONSUMED HERO CARD */
          <View style={styles.nutrientHeroCard}>
            <View style={styles.nutrientHeroHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <IconSquiSugar size={22} color="#F59E0B" />
                <Text style={styles.nutrientHeroTitle}>Sugar Consumed Today</Text>
              </View>
              <Text style={styles.statusBadge(sugarStatus)}>{sugarStatus}</Text>
            </View>
            <View style={styles.bigValRow}>
              <Text style={styles.bigVal}>{totalSugar}</Text>
              <Text style={styles.bigValUnit}>grams (g)</Text>
              <Text style={styles.bigValCap}>/ 25g target ({sugarPct}%)</Text>
            </View>
            <View style={styles.trackBg}>
              <View style={styles.trackFill(sugarPct, getSugarColor())} />
            </View>
            <Text style={styles.heroAdviceText}>
              {totalSugar <= 25
                ? '🐿️ Mindful Balance: Staying under 25g of dietary sugar consumed prevents rapid energy crashes and supports steady metabolic wellness.'
                : '🐿️ SQUI Reflection: Sugar consumed is above the WHO 25g daily target. Try balancing upcoming meals with leafy greens, water, and whole fiber foods.'}
            </Text>
          </View>
        ) : (
          /* 2. SODIUM CONSUMED HERO CARD */
          <View style={styles.nutrientHeroCard}>
            <View style={styles.nutrientHeroHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <IconSquiSodium size={22} color="#10B981" />
                <Text style={styles.nutrientHeroTitle}>Sodium Consumed Today</Text>
              </View>
              <Text style={styles.statusBadge(sodiumStatus)}>{sodiumStatus}</Text>
            </View>
            <View style={styles.bigValRow}>
              <Text style={styles.bigVal}>{totalSodium.toLocaleString()}</Text>
              <Text style={styles.bigValUnit}>mg</Text>
              <Text style={styles.bigValCap}>/ 2,000mg cap ({sodiumPct}%)</Text>
            </View>
            <View style={styles.trackBg}>
              <View style={styles.trackFill(sodiumPct, getSodiumColor())} />
            </View>
            <Text style={styles.heroAdviceText}>
              {totalSodium <= 2000
                ? '🐿️ Mindful Balance: Keeping daily sodium consumed under 2,000mg supports arterial flexibility, renal balance, and healthy fluid circulation.'
                : '🐿️ SQUI Reflection: Dietary sodium from meals reached higher levels today. Hydrate generously with fresh spring water to promote natural mineral balance.'}
            </Text>
          </View>
        )}

        {/* MEAL-BY-MEAL FILTERED BREAKDOWN */}
        <Text style={styles.sectionHeader}>
          {isSugar ? 'Sugar Consumed by Logged Meal' : 'Sodium Consumed by Logged Meal'}
        </Text>

        {meals.map((meal) => {
          const mSugarPct = Math.min(Math.round((meal.sugarG / 25) * 100), 100);
          const mSodiumPct = Math.min(Math.round((meal.sodiumMg / 2000) * 100), 100);
          const isHighSodium = meal.sodiumMg >= 800;

          return (
            <View key={meal.id} style={styles.breakdownCard}>
              <View style={styles.mealRowTop}>
                <Text style={styles.mealCategory}>{meal.category}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              <Text style={styles.mealTitle}>{meal.name}</Text>

              {isSugar ? (
                /* Filtered Sugar View */
                <View style={{ marginTop: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 12, color: '#92400E' }}>
                      🍬 {meal.sugarG}g Sugar Consumed
                    </Text>
                    <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 11, color: '#769482' }}>
                      {mSugarPct}% of 25g daily target
                    </Text>
                  </View>
                  <View style={styles.miniBarBg}>
                    <View style={styles.miniBar(mSugarPct, mSugarPct > 50 ? '#EA580C' : '#F59E0B')} />
                  </View>
                </View>
              ) : (
                /* Filtered Sodium View */
                <View style={{ marginTop: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={[{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 12, color: '#1B432C' }, isHighSodium && { color: '#B45309' }]}>
                      🧂 {meal.sodiumMg}mg Sodium {isHighSodium ? '⚠️ (High single-meal)' : ''}
                    </Text>
                    <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 11, color: '#769482' }}>
                      {mSodiumPct}% of 2,000mg cap
                    </Text>
                  </View>
                  <View style={styles.miniBarBg}>
                    <View style={styles.miniBar(mSodiumPct, isHighSodium ? '#D97706' : '#10B981')} />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

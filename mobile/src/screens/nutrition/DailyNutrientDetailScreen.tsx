import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
  totalSugar?: number;
  totalSodium?: number;
  meals?: MealBreakdownItem[];
}

export const DailyNutrientDetailScreen: React.FC<DailyNutrientDetailScreenProps> = ({
  onBack,
  dateStr = 'Today, Aug 21',
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
  const sugarPct = Math.min(Math.round((totalSugar / 25) * 100), 100);
  const sodiumPct = Math.min(Math.round((totalSodium / 2000) * 100), 100);

  const sugarStatus = totalSugar > 25 ? 'EXCEEDED' : totalSugar > 18 ? 'CAUTION' : 'SAFE';
  const sodiumStatus = totalSodium > 2000 ? 'EXCEEDED' : totalSodium > 1400 ? 'CAUTION' : 'SAFE';

  const getSugarColor = () => (totalSugar > 25 ? '#C53030' : totalSugar > 18 ? '#D97706' : '#2D6A4F');
  const getSodiumColor = () => (totalSodium > 2000 ? '#C53030' : totalSodium > 1400 ? '#D97706' : '#2D6A4F');

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Daily Nutrient Breakdown</Text>
            {onBack && (
              <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                <Text style={styles.backBtnText}>✕ Close</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.subtitle}>{dateStr} • Complete Sugar & Sodium Analysis</Text>
        </View>

        {/* 1. SUGAR INTAKE HERO CARD */}
        <View style={styles.nutrientHeroCard}>
          <View style={styles.nutrientHeroHeader}>
            <Text style={styles.nutrientHeroTitle}>🍬 Daily Sugar Intake</Text>
            <Text style={styles.statusBadge(sugarStatus)}>{sugarStatus}</Text>
          </View>
          <View style={styles.bigValRow}>
            <Text style={styles.bigVal}>{totalSugar}</Text>
            <Text style={styles.bigValUnit}>grams (g)</Text>
            <Text style={styles.bigValCap}>/ 25g daily target ({sugarPct}%)</Text>
          </View>
          <View style={styles.trackBg}>
            <View style={styles.trackFill(sugarPct, getSugarColor())} />
          </View>
          <Text style={styles.heroAdviceText}>
            {totalSugar <= 25
              ? 'Great job! Staying under 25g supports sustained focus and steady blood glucose.'
              : 'Sugar is above recommended target. Try balancing tomorrow with whole fiber foods.'}
          </Text>
        </View>

        {/* 2. SODIUM INTAKE HERO CARD */}
        <View style={styles.nutrientHeroCard}>
          <View style={styles.nutrientHeroHeader}>
            <Text style={styles.nutrientHeroTitle}>🧂 Daily Sodium Intake</Text>
            <Text style={styles.statusBadge(sodiumStatus)}>{sodiumStatus}</Text>
          </View>
          <View style={styles.bigValRow}>
            <Text style={styles.bigVal}>{totalSodium.toLocaleString()}</Text>
            <Text style={styles.bigValUnit}>mg</Text>
            <Text style={styles.bigValCap}>/ 2000mg daily cap ({sodiumPct}%)</Text>
          </View>
          <View style={styles.trackBg}>
            <View style={styles.trackFill(sodiumPct, getSodiumColor())} />
          </View>
          <Text style={styles.heroAdviceText}>
            {totalSodium <= 2000
              ? 'Excellent balance! Keeping daily sodium under 2000mg protects arterial elasticity and kidney health.'
              : 'Sodium reached higher levels today. Hydrate generously with fresh lemon water to assist natural clearance.'}
          </Text>
        </View>

        {/* 3. MEAL-BY-MEAL INTAKE BREAKDOWN */}
        <Text style={styles.sectionHeader}>Meal-by-Meal Contribution</Text>

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

              <View style={styles.dualMeterRow}>
                {/* Sugar meter */}
                <View style={styles.meterCol}>
                  <Text style={styles.meterLabel}>Sugar: {meal.sugarG}g ({mSugarPct}%)</Text>
                  <View style={styles.miniBarBg}>
                    <View style={styles.miniBar(mSugarPct, '#2D6A4F')} />
                  </View>
                </View>

                {/* Sodium meter */}
                <View style={styles.meterCol}>
                  <Text style={[styles.meterLabel, isHighSodium && { color: '#92400E' }]}>
                    Sodium: {meal.sodiumMg}mg {isHighSodium ? '⚠️' : ''}
                  </Text>
                  <View style={styles.miniBarBg}>
                    <View style={styles.miniBar(mSodiumPct, isHighSodium ? '#D97706' : '#2D6A4F')} />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

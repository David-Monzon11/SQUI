import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSquiCalories } from '../common/Icons';
import { calorieCardStyles as styles } from './CalorieCard.styles';

export interface CalorieCardProps {
  /** Total calories consumed today in kcal (Static default: 1420) */
  consumedKcal?: number;
  /** Daily calorie budget/target in kcal (Static default: 2000) */
  targetKcal?: number;
  /** Protein intake in grams (Static default: 92g) */
  proteinG?: number;
  /** Carbs intake in grams (Static default: 165g) */
  carbsG?: number;
  /** Fat intake in grams (Static default: 44g) */
  fatG?: number;
  /** Optional callback when user taps card */
  onPress?: () => void;
}

export const CalorieCard: React.FC<CalorieCardProps> = ({
  consumedKcal = 1420,
  targetKcal = 2000,
  proteinG = 92,
  carbsG = 165,
  fatG = 44,
  onPress,
}) => {
  const remainingKcal = Math.max(targetKcal - consumedKcal, 0);
  const progressPct = Math.min(Math.round((consumedKcal / targetKcal) * 100), 100);

  // Status computation for visual badge
  const statusText =
    consumedKcal > targetKcal
      ? 'OVER BUDGET'
      : progressPct >= 85
      ? 'NEAR LIMIT'
      : 'BALANCED';

  const glowColor =
    consumedKcal > targetKcal ? '#EF4444' : progressPct >= 85 ? '#F59E0B' : '#34D399';

  const handleCardPress = () => {
    if (onPress) {
      onPress();
      return;
    }
    Alert.alert(
      'Daily Calorie Budget ⚡',
      `Current Stats (Static):\n• Consumed: ${consumedKcal.toLocaleString()} kcal\n• Daily Target: ${targetKcal.toLocaleString()} kcal\n• Remaining: ${remainingKcal.toLocaleString()} kcal\n\nMacro Breakdown:\n• Protein: ${proteinG}g (4 kcal/g)\n• Carbs: ${carbsG}g (4 kcal/g)\n• Fat: ${fatG}g (9 kcal/g)\n\n🐿️ SQUI Philosophy:\n"Awareness over restriction. Progress over perfection."`,
      [{ text: 'Understood' }]
    );
  };

  return (
    <TouchableOpacity
      style={styles.touchWrap}
      activeOpacity={0.9}
      onPress={handleCardPress}
    >
      <LinearGradient
        colors={['#F97316', '#EA580C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Large Decorative SQUI Calorie Emblem Watermark */}
        <View style={styles.watermark}>
          <IconSquiCalories size={90} color="#FFFFFF" strokeWidth={1.6} />
        </View>

        {/* Top Header Row */}
        <View style={styles.topRow}>
          <View style={styles.leftHeader}>
            <View style={styles.iconBadge}>
              <IconSquiCalories size={18} color="#FFFFFF" />
            </View>
            <View style={styles.titleCol}>
              <Text style={styles.label}>Daily Calories</Text>
              <Text style={styles.subLabel}>Energy budget & macros</Text>
            </View>
          </View>

          {/* Frosted Glass Status Badge */}
          <View style={styles.glassBadge}>
            <View style={[styles.glowDot, { backgroundColor: glowColor, shadowColor: glowColor }]} />
            <Text style={styles.badgeText}>{statusText}</Text>
          </View>
        </View>

        {/* Main Stats Display */}
        <View style={styles.mainStatsRow}>
          <View style={styles.valueGroup}>
            <Text style={styles.mainValue}>{consumedKcal.toLocaleString()}</Text>
            <Text style={styles.unitText}>kcal</Text>
          </View>
          <View style={styles.targetMeta}>
            <Text style={styles.remainingText}>
              {remainingKcal.toLocaleString()} kcal left
            </Text>
            <Text style={styles.targetSub}>Target: {targetKcal.toLocaleString()} kcal</Text>
          </View>
        </View>

        {/* Progress Track Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>

        {/* Macro Energy Breakdown Preview (Static) */}
        <View style={styles.macroRow}>
          <View style={styles.macroPill}>
            <Text style={styles.macroName}>Protein</Text>
            <Text style={styles.macroVal}>{proteinG}g</Text>
            <Text style={styles.macroPct}>26%</Text>
          </View>
          <View style={styles.macroPill}>
            <Text style={styles.macroName}>Carbs</Text>
            <Text style={styles.macroVal}>{carbsG}g</Text>
            <Text style={styles.macroPct}>46%</Text>
          </View>
          <View style={styles.macroPill}>
            <Text style={styles.macroName}>Healthy Fat</Text>
            <Text style={styles.macroVal}>{fatG}g</Text>
            <Text style={styles.macroPct}>28%</Text>
          </View>
        </View>

        {/* SQUI Squirrel Mindful Energy Tip */}
        <View style={styles.mascotTipWrap}>
          <Text style={styles.mascotTipText}>
            🐿️ Balanced energy intake! {remainingKcal} kcal remaining for your evening nourishment.
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

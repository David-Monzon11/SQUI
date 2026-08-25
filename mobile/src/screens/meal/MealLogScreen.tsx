import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { IconSquiSugar, IconSquiSodium } from '../../components/common/Icons';
import { MealCategory } from '../../types';
import { mealLogStyles as styles } from './MealLog.styles';

interface MealLogScreenProps {
  onMealSaved?: () => void;
}

const CATEGORIES: MealCategory[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DRINK'];

export const MealLogScreen: React.FC<MealLogScreenProps> = ({ onMealSaved }) => {
  const [category, setCategory] = useState<MealCategory>('BREAKFAST');
  const [foodName, setFoodName] = useState('');
  const [portionSize, setPortionSize] = useState('1 serving');
  const [sugarG, setSugarG] = useState('');
  const [sodiumMg, setSodiumMg] = useState('');
  const [caloriesKcal, setCaloriesKcal] = useState('');
  const [proteinG, setProteinG] = useState('');
  const [isPhotoAttached, setIsPhotoAttached] = useState(false);

  const numSodium = parseFloat(sodiumMg) || 0;
  const isHighSodium = numSodium >= 800;

  const handleSaveMeal = () => {
    if (!foodName.trim()) {
      Alert.alert('Missing Food Name', 'Please enter what you enjoyed eating!');
      return;
    }

    Alert.alert(
      'Meal Logged! 🌿',
      `"${foodName}" was added to your visual food diary.${
        isHighSodium ? '\n\n⚠️ Sodium alert: Above 800mg. SQUI suggests extra hydration and leafy greens today!' : ''
      }`,
      [{ text: 'Great!', onPress: () => onMealSaved?.() }]
    );

    setFoodName('');
    setSugarG('');
    setSodiumMg('');
    setCaloriesKcal('');
    setProteinG('');
    setIsPhotoAttached(false);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Log Meal</Text>
          <Text style={styles.subtitle}>Build mindful eating habits with visual records.</Text>
        </View>

        {/* 1. Photo Upload Hero Zone */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsPhotoAttached(!isPhotoAttached)}
          style={[styles.photoCard, isPhotoAttached && styles.photoAttached]}
        >
          <Text style={styles.photoText}>{isPhotoAttached ? '✓ Photo Attached' : '📷 Tap to Add Meal Photo'}</Text>
          <Text style={styles.photoSub}>
            {isPhotoAttached ? 'Ready for your visual diary' : 'Snapshot or select from camera roll'}
          </Text>
        </TouchableOpacity>

        {/* 2. Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.catChip, isSelected && styles.catChipActive]}
              >
                <Text style={[styles.catText, isSelected && styles.catTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 3. Meal Details Card */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Food / Meal Name *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Avocado Toast with Poached Egg"
            placeholderTextColor="#849C8D"
            value={foodName}
            onChangeText={setFoodName}
          />

          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.fieldLabel}>Portion Size</Text>
              <TextInput
                style={styles.textInput}
                placeholder="1 serving"
                value={portionSize}
                onChangeText={setPortionSize}
              />
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.fieldLabel}>Calories (kcal)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 420"
                keyboardType="numeric"
                value={caloriesKcal}
                onChangeText={setCaloriesKcal}
              />
            </View>
          </View>
        </View>

        {/* 4. DEDICATED SEPARATE SUGAR CONSUMED CARD */}
        <View style={styles.card}>
          <View style={styles.nutrientCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <IconSquiSugar size={18} color="#F59E0B" />
              <Text style={styles.nutrientCardTitle}>Sugar Consumed</Text>
            </View>
            <Text style={styles.nutrientCardContext}>WHO Daily Target: ≤25g</Text>
          </View>
          <View style={styles.nutrientInputWrap}>
            <TextInput
              style={styles.nutrientInput}
              placeholder="0"
              keyboardType="numeric"
              value={sugarG}
              onChangeText={setSugarG}
            />
            <Text style={styles.nutrientUnit}>grams (g)</Text>
          </View>
          <Text style={styles.nutrientHelperText}>
            Estimated dietary sugar consumed in this food portion (natural or added).
          </Text>
        </View>

        {/* 5. DEDICATED SEPARATE SODIUM CONSUMED CARD */}
        <View style={styles.card}>
          <View style={styles.nutrientCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <IconSquiSodium size={18} color="#10B981" />
              <Text style={styles.nutrientCardTitle}>Sodium Consumed</Text>
            </View>
            <Text style={styles.nutrientCardContext}>Daily Cap: 2000mg</Text>
          </View>
          <View style={[styles.nutrientInputWrap, isHighSodium && styles.highSodiumInputWrap]}>
            <TextInput
              style={styles.nutrientInput}
              placeholder="0"
              keyboardType="numeric"
              value={sodiumMg}
              onChangeText={setSodiumMg}
            />
            <Text style={styles.nutrientUnit}>mg</Text>
          </View>

          {isHighSodium ? (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ High Sodium Meal ({numSodium}mg): Exceeds 800mg single-meal guideline. SQUI suggests balancing with extra hydration and leafy greens!
              </Text>
            </View>
          ) : (
            <Text style={styles.nutrientHelperText}>
              Keeping sodium consumed under 800mg per meal protects cardiovascular balance.
            </Text>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSaveMeal}>
          <Text style={styles.submitBtnText}>Save to Visual Food Diary</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

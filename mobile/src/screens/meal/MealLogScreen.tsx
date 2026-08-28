import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Animated,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSquiSugar, IconSquiSodium, IconCameraPlus } from '../../components/common/Icons';
import { MealCategory, MealItem } from '../../types';
import { mealLogStyles as styles } from './MealLog.styles';

interface MealLogScreenProps {
  meals?: MealItem[];
  onMealSaved?: (meal: MealItem) => void;
}

interface CameraPreset {
  name: string;
  category: MealCategory;
  caloriesKcal: number;
  sugarG: number;
  sodiumMg: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  portionSize: string;
  imageUrl: string;
  detectedIngredients: string[];
}

const CAMERA_PRESETS: CameraPreset[] = [
  {
    name: 'Avocado Toast & Egg',
    category: 'BREAKFAST',
    caloriesKcal: 340,
    sugarG: 2.1,
    sodiumMg: 380,
    proteinG: 14,
    carbsG: 24,
    fatG: 18,
    portionSize: '1 serving',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500&auto=format&fit=crop&q=80',
    detectedIngredients: ['Sourdough Bread', 'Avocado Mash', 'Poached Egg', 'Chili Flakes'],
  },
  {
    name: 'Grilled Salmon Bowl',
    category: 'LUNCH',
    caloriesKcal: 580,
    sugarG: 3.5,
    sodiumMg: 520,
    proteinG: 38,
    carbsG: 45,
    fatG: 22,
    portionSize: '1 bowl',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    detectedIngredients: ['Atlantic Salmon', 'Red Quinoa', 'Pickled Cucumber', 'Sesame Oil'],
  },
  {
    name: 'Berry Greek Yogurt',
    category: 'SNACK',
    caloriesKcal: 180,
    sugarG: 8.4,
    sodiumMg: 65,
    proteinG: 15,
    carbsG: 17,
    fatG: 3.5,
    portionSize: '1 container',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    detectedIngredients: ['A2 Greek Yogurt', 'Fresh Blueberries', 'Organic Honey', 'Chia Seeds'],
  },
  {
    name: 'Double Cheeseburger',
    category: 'DINNER',
    caloriesKcal: 680,
    sugarG: 9.5,
    sodiumMg: 1150,
    proteinG: 32,
    carbsG: 40,
    fatG: 36,
    portionSize: '1 burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    detectedIngredients: ['Brioche Bun', 'Grass-fed Beef Patty', 'Cheddar Cheese', 'Pickle Relish'],
  },
  {
    name: 'Iced Matcha Latte',
    category: 'DRINK',
    caloriesKcal: 120,
    sugarG: 14.0,
    sodiumMg: 45,
    proteinG: 4.5,
    carbsG: 16,
    fatG: 3.0,
    portionSize: '1 glass',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80',
    detectedIngredients: ['Uji Matcha Powder', 'Barista Oat Milk', 'Agave Nectar', 'Ice'],
  },
];

const CATEGORIES: MealCategory[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DRINK'];

type FlowStep = 'GALLERY' | 'CAMERA' | 'SCANNING' | 'FORM';

export const MealLogScreen: React.FC<MealLogScreenProps> = ({ meals = [], onMealSaved }) => {
  const [activeStep, setActiveStep] = useState<FlowStep>('GALLERY');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [selectedDetailMeal, setSelectedDetailMeal] = useState<MealItem | null>(null);

  // Form Fields
  const [category, setCategory] = useState<MealCategory>('BREAKFAST');
  const [foodName, setFoodName] = useState('');
  const [portionSize, setPortionSize] = useState('1 serving');
  const [sugarG, setSugarG] = useState('');
  const [sodiumMg, setSodiumMg] = useState('');
  const [caloriesKcal, setCaloriesKcal] = useState('');
  const [proteinG, setProteinG] = useState('');
  const [carbsG, setCarbsG] = useState('');
  const [fatG, setFatG] = useState('');
  const [attachedPhotoUrl, setAttachedPhotoUrl] = useState<string | null>(null);

  // Scanner States
  const [scanStatus, setScanStatus] = useState('');
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const scanAnim = useRef(new Animated.Value(0)).current;

  const currentCameraSubject = CAMERA_PRESETS[selectedPresetIndex];

  useEffect(() => {
    if (activeStep === 'SCANNING') {
      scanAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanAnim.setValue(0);
    }
  }, [activeStep]);

  const handleShutterSnap = () => {
    // Transition to Scanning and run mock AI scanner on selected subject
    setAttachedPhotoUrl(currentCameraSubject.imageUrl);
    setCategory(currentCameraSubject.category);
    setPortionSize(currentCameraSubject.portionSize);
    setCaloriesKcal(currentCameraSubject.caloriesKcal.toString());
    setSugarG(currentCameraSubject.sugarG.toString());
    setSodiumMg(currentCameraSubject.sodiumMg.toString());
    setProteinG(currentCameraSubject.proteinG.toString());
    setCarbsG(currentCameraSubject.carbsG.toString());
    setFatG(currentCameraSubject.fatG.toString());
    setDetectedIngredients(currentCameraSubject.detectedIngredients);
    
    // Clear name so user has to type it manually
    setFoodName('');

    setActiveStep('SCANNING');
    setScanStatus('AI vision analysis: Analyzing food textures...');

    setTimeout(() => {
      setScanStatus('AI matching: Identifying ingredient profiles...');
    }, 600);

    setTimeout(() => {
      setScanStatus('AI complete: Estimating sugar & sodium density...');
    }, 1200);

    setTimeout(() => {
      setActiveStep('FORM');
    }, 1800);
  };

  const handleSaveMeal = () => {
    if (!foodName.trim()) {
      Alert.alert('Name Required', 'Please enter a name for the captured food!');
      return;
    }

    const numSodium = parseFloat(sodiumMg) || 0;
    const isHighSodium = numSodium >= 800;

    const newMeal: MealItem = {
      id: Math.random().toString(36).substring(2, 9),
      mealCategory: category,
      mealTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      foodName: foodName,
      portionSize: portionSize,
      imageUrl: attachedPhotoUrl || undefined,
      nutrition: {
        sugarG: parseFloat(sugarG) || 0,
        sodiumMg: parseFloat(sodiumMg) || 0,
        caloriesKcal: parseFloat(caloriesKcal) || 0,
        proteinG: parseFloat(proteinG) || 0,
        carbsG: parseFloat(carbsG) || 0,
        fatG: parseFloat(fatG) || 0,
      },
    };

    Alert.alert(
      'Meal Logged! 🌿',
      `"${foodName}" was added to your visual food diary.${
        isHighSodium ? '\n\n⚠️ Sodium alert: Above 800mg. SQUI suggests extra hydration and leafy greens today!' : ''
      }`,
      [{ 
        text: 'Great!', 
        onPress: () => {
          onMealSaved?.(newMeal);
          // Return to gallery view
          setActiveStep('GALLERY');
          setFoodName('');
          setSugarG('');
          setSodiumMg('');
          setCaloriesKcal('');
          setProteinG('');
          setCarbsG('');
          setFatG('');
          setAttachedPhotoUrl(null);
          setDetectedIngredients([]);
        } 
      }]
    );
  };

  const resetFlow = () => {
    setActiveStep('GALLERY');
    setFoodName('');
    setSugarG('');
    setSodiumMg('');
    setCaloriesKcal('');
    setProteinG('');
    setCarbsG('');
    setFatG('');
    setAttachedPhotoUrl(null);
    setDetectedIngredients([]);
  };

  const numSodium = parseFloat(sodiumMg) || 0;
  const isHighSodium = numSodium >= 800;

  // GALLERY STEP
  if (activeStep === 'GALLERY') {
    return (
      <View style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Visual History Gallery</Text>
            <Text style={styles.subtitle}>Camera roll record of your nutritional choices.</Text>
          </View>

          {/* Full Grid of food photos */}
          <View style={styles.gridContainer}>
            {/* Historic Meals */}
            {meals.map((meal) => {
              const isHigh = meal.nutrition.sodiumMg >= 800;
              return (
                <TouchableOpacity
                  key={meal.id}
                  style={styles.gridItem}
                  activeOpacity={0.9}
                  onPress={() => setSelectedDetailMeal(meal)}
                >
                  {meal.imageUrl && (
                    <Image source={{ uri: meal.imageUrl }} style={styles.gridImage} />
                  )}
                  {isHigh && (
                    <View style={styles.gridWarningDot} />
                  )}
                  {/* Bottom Text Overlay */}
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.85)']}
                    style={styles.gridItemOverlay}
                  >
                    <Text style={styles.gridCategoryText} numberOfLines={1}>
                      {meal.foodName}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}

            {/* Add Meal Card — always at the end */}
            <TouchableOpacity
              style={styles.plusCard}
              activeOpacity={0.8}
              onPress={() => setActiveStep('CAMERA')}
            >
              <Text style={styles.plusIcon}>+</Text>
              <Text style={styles.plusText}>Add Meal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal details popup */}
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
                  <View style={styles.detailModalHeader}>
                    <Text style={styles.detailModalCategory}>
                      {selectedDetailMeal.mealCategory}
                    </Text>
                    <Text style={styles.detailModalTime}>
                      {selectedDetailMeal.mealTime}
                    </Text>
                  </View>

                  <Text style={styles.detailModalTitle}>
                    {selectedDetailMeal.foodName}
                  </Text>
                  <Text style={styles.detailModalPortion}>
                    Portion: {selectedDetailMeal.portionSize}
                  </Text>

                  {selectedDetailMeal.imageUrl && (
                    <View style={styles.detailModalPhotoWrap}>
                      <Image
                        source={{ uri: selectedDetailMeal.imageUrl }}
                        style={styles.detailModalPhoto}
                      />
                    </View>
                  )}

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

                  <View style={styles.detailMascotFeedback}>
                    <Text style={styles.detailMascotText}>
                      {selectedDetailMeal.nutrition.sodiumMg >= 800
                        ? '🐿️ SQUI says: A little high on sodium for this meal! Balance it by drinking extra water and focusing on fresh leafy greens for your next meal.'
                        : selectedDetailMeal.nutrition.sugarG >= 10
                        ? '🐿️ SQUI says: A bit sweet! Keep an eye on your remaining sugar budget for today. Great job tracking!'
                        : '🌿 SQUI says: Wonderful, balanced choice! Prepared with mindful nutrients to fuel your sustainable wellness.'}
                    </Text>
                  </View>

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
      </View>
    );
  }

  // CAMERA STEP
  if (activeStep === 'CAMERA') {
    return (
      <View style={styles.cameraScreenBg}>
        {/* Top bar controls */}
        <View style={styles.cameraHeader}>
          <TouchableOpacity style={styles.cameraCancelBtn} onPress={resetFlow}>
            <Text style={styles.cameraCancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Camera Viewfinder</Text>
          <View style={{ width: 50 }} />
        </View>

        {/* Immersive Viewport */}
        <View style={styles.cameraViewport}>
          <Image source={{ uri: currentCameraSubject.imageUrl }} style={styles.viewportImage} />
          
          <View style={styles.viewportOverlay}>
            <Text style={styles.viewportOverlayTitle}>MOCK VIEWFINDER</Text>
            <Text style={styles.viewportOverlaySub}>Focusing on: {currentCameraSubject.name}</Text>
          </View>
        </View>

        {/* Preset food selector scroll */}
        <View style={styles.cameraControlPanel}>
          <Text style={styles.presetHeading}>POINT AT FOOD SUBJECT:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cameraPresetsScroll}
            contentContainerStyle={styles.cameraPresetsContent}
          >
            {CAMERA_PRESETS.map((food, idx) => {
              const isSelected = selectedPresetIndex === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.cameraPresetChip,
                    isSelected && styles.cameraPresetChipActive,
                  ]}
                  onPress={() => setSelectedPresetIndex(idx)}
                >
                  <Image source={{ uri: food.imageUrl }} style={styles.cameraPresetThumb} />
                  <Text style={[
                    styles.cameraPresetLabel,
                    isSelected && styles.cameraPresetLabelActive,
                  ]}>
                    {food.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Large circular Shutter button */}
          <View style={styles.shutterContainer}>
            <TouchableOpacity
              style={styles.shutterBtn}
              activeOpacity={0.85}
              onPress={handleShutterSnap}
            >
              <View style={styles.shutterInnerRing} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // SCANNING STEP
  if (activeStep === 'SCANNING') {
    return (
      <View style={styles.scanningScreenBg}>
        <View style={styles.scanPhotoWrap}>
          {attachedPhotoUrl && (
            <Image source={{ uri: attachedPhotoUrl }} style={styles.scanningImage} />
          )}

          {/* Sweeping scan green laser line overlay */}
          <View style={styles.scanOverlay}>
            <View style={styles.scanScannerContainer}>
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 240],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={styles.scanStatusText}>{scanStatus}</Text>
          </View>
        </View>
      </View>
    );
  }

  // FORM STEP
  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Logger Header with Discard option */}
        <View style={styles.loggerHeaderRow}>
          <TouchableOpacity style={styles.backBtn} onPress={resetFlow}>
            <Text style={styles.backBtnText}>← Discard & Return</Text>
          </TouchableOpacity>
          <Text style={styles.loggerHeadingText}>Confirm Log</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Scanned Result</Text>
          <Text style={styles.subtitle}>Name this captured food item to complete the daily log.</Text>
        </View>

        {/* Captured image display card */}
        <View style={styles.formPhotoCard}>
          {attachedPhotoUrl && (
            <Image source={{ uri: attachedPhotoUrl }} style={styles.formPhotoImage} />
          )}
          <View style={styles.scannedBadge}>
            <Text style={styles.scannedBadgeText}>🤖 AI Vision Analysis Complete</Text>
          </View>
        </View>

        {/* AI Detected Ingredients Chips */}
        {detectedIngredients.length > 0 && (
          <View style={styles.detectedIngredientsCard}>
            <Text style={styles.detectedLabel}>🤖 INGREDIENTS DETECTED FROM SHOT:</Text>
            <View style={styles.chipsRow}>
              {detectedIngredients.map((ing, idx) => (
                <View key={idx} style={styles.detectedChip}>
                  <Text style={styles.detectedChipText}>{ing}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Food Name input (Empty for user entry!) */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Name Captured Meal / Food *</Text>
          <TextInput
            style={[styles.textInput, { borderWidth: 1.5, borderColor: '#10B981', backgroundColor: '#F0FDF4' }]}
            placeholder="Type food name here (e.g. Avocado Toast with Poached Egg)"
            placeholderTextColor="#849C8D"
            value={foodName}
            onChangeText={setFoodName}
            autoFocus
          />
        </View>

        {/* Category selector row */}
        <Text style={styles.fieldHeading}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={{ gap: 8, paddingLeft: 4, paddingRight: 16 }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.catChip, isSelected && styles.catChipActive]}
              >
                <Text style={[styles.catText, isSelected && styles.catTextActive]}>
                  {cat === 'DRINK' ? 'Drink' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Macros card */}
        <View style={styles.card}>
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

        {/* AI Estimated Sugar Card */}
        <View style={styles.card}>
          <View style={styles.nutrientCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <IconSquiSugar size={18} color="#F59E0B" />
              <Text style={styles.nutrientCardTitle}>AI Estimated Sugar</Text>
            </View>
            <Text style={styles.nutrientCardContext}>Daily Max: 25g</Text>
          </View>
          <View style={styles.nutrientInputWrap}>
            <TextInput
              style={styles.nutrientInput}
              placeholder="0"
              keyboardType="numeric"
              value={sugarG}
              onChangeText={setSugarG}
            />
            <Text style={styles.nutrientUnit}>g</Text>
          </View>
          <Text style={styles.nutrientHelperText}>
            Sugar content analyzed by SQUI AI from capture image density.
          </Text>
        </View>

        {/* AI Estimated Sodium Card */}
        <View style={styles.card}>
          <View style={styles.nutrientCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <IconSquiSodium size={18} color="#10B981" />
              <Text style={styles.nutrientCardTitle}>AI Estimated Sodium</Text>
            </View>
            <Text style={styles.nutrientCardContext}>Daily Max: 2000mg</Text>
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
                ⚠️ High Sodium Alert ({numSodium}mg): Exceeds 800mg single-meal guideline. SQUI suggests balancing with extra hydration!
              </Text>
            </View>
          ) : (
            <Text style={styles.nutrientHelperText}>
              Keeping individual meals under 800mg protects cardiovascular health.
            </Text>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSaveMeal}>
          <Text style={styles.submitBtnText}>Add Captured Food to Gallery</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

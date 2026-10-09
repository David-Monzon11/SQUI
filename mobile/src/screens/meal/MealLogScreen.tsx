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
import { IconSquiSugar, IconSquiSodium, IconCameraPlus, IconBell, IconRefresh, IconImage, IconFlash, IconSquiMascot } from '../../components/common/Icons';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import { FONTS } from '../../constants/typography';
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

  // Camera Settings
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);

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

  // Real device capture: opens the phone camera or photo library
  const startScanWithPhoto = (uri: string) => {
    setAttachedPhotoUrl(uri);
    setCategory('BREAKFAST');
    setPortionSize('1 serving');
    setCaloriesKcal('');
    setSugarG('');
    setSodiumMg('');
    setProteinG('');
    setCarbsG('');
    setFatG('');
    setDetectedIngredients([]);
    setFoodName('');
    setActiveStep('SCANNING');
    setScanStatus('Preparing your food photo...');
    setTimeout(() => setScanStatus('Photo saved. Add the details of your meal next.'), 700);
    setTimeout(() => setActiveStep('FORM'), 1400);
  };

  const handlePickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Photos Access Needed', 'Please allow photo access in Settings to choose a meal photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      startScanWithPhoto(result.assets[0].uri);
    }
  };

  const handleAddMeal = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setActiveStep('CAMERA');
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
              onPress={handleAddMeal}
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
    if (!permission) {
      return <View style={styles.cameraScreenBg} />;
    }
    if (!permission.granted) {
      return (
        <View style={styles.cameraScreenBg}>
          <Text style={{color: 'white', textAlign: 'center', marginTop: 100, fontFamily: FONTS.roundedSemiBold}}>We need your permission to show the camera</Text>
          <TouchableOpacity onPress={requestPermission} style={{marginTop: 20, padding: 10, backgroundColor: '#10B981', alignSelf: 'center', borderRadius: 8}}>
            <Text style={{color: 'white', fontFamily: FONTS.roundedBold}}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const toggleCameraFacing = () => setFacing(current => (current === 'back' ? 'front' : 'back'));
    const toggleFlash = () => setFlash(current => (current === 'off' ? 'on' : 'off'));

    const takeCustomPhoto = async () => {
      if (cameraRef.current) {
        setScanStatus('Preparing your food photo...');
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
        if (photo) {
           startScanWithPhoto(photo.uri);
        }
      }
    };

    return (
      <View style={{ flex: 1, backgroundColor: '#121212' }}>
        {/* Top Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, zIndex: 10 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: FONTS.roundedBlack, letterSpacing: 0.5 }}>Food Nutrition Scan</Text>
          <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: 10, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
            <IconBell size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Viewfinder Area */}
        <View style={{ flex: 1, borderRadius: 32, overflow: 'hidden', marginHorizontal: 12, marginBottom: 130, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          <CameraView 
            style={{ flex: 1 }} 
            facing={facing} 
            enableTorch={flash === 'on'}
            ref={cameraRef}
          >
            {/* Top Overlays */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
              {/* Online / Ready Pill */}
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.65)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginRight: 8, shadowColor: '#10B981', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 3 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: FONTS.roundedBold, letterSpacing: 0.5 }}>SQUI AI (Ready)</Text>
              </View>

              {/* Flash Toggle */}
              <TouchableOpacity onPress={toggleFlash} style={{ backgroundColor: 'rgba(0,0,0,0.65)', padding: 10, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
                <IconFlash size={18} color={flash === 'on' ? '#F59E0B' : '#FFFFFF'} />
              </TouchableOpacity>
            </View>

            {/* Bottom Floating Warning/Info Box */}
            <View style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
              <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1.5, borderColor: '#10B981', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 }}>
                <IconSquiMascot size={32} color="#10B981" />
                <View style={{ marginLeft: 14, flex: 1 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 13, fontFamily: FONTS.roundedBold, marginBottom: 2 }}>Ready to Capture!</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: FONTS.roundedSemiBold }}>Center food in frame and snap</Text>
                </View>
              </View>
            </View>
          </CameraView>
        </View>

        {/* Bottom Controls */}
        <View style={{ position: 'absolute', bottom: 35, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 30 }}>
          <TouchableOpacity style={{ padding: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }} onPress={handlePickFromLibrary}>
            <IconImage size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Shutter Button */}
          <TouchableOpacity onPress={takeCustomPhoto} activeOpacity={0.8}>
            <View style={{ width: 76, height: 76, borderRadius: 38, borderWidth: 4, borderColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
              <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFFFFF' }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }} onPress={toggleCameraFacing}>
            <IconRefresh size={22} color="#FFFFFF" />
          </TouchableOpacity>
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

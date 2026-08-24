import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { SquiMascot } from '../common/SquiMascot';
import { IconSparkles, IconShieldCheck, IconDroplet, IconTarget } from '../common/Icons';
import { mascotBannerStyles as styles, CARD_WIDTH } from './MascotBanner.styles';

interface MascotBannerProps {
  tip?: string;
  healthScore?: number;
}

// =========================================================================
// Card 2 Visual: The Acorn Shield (Golden Acorn Nut 🌰 with Emerald Crest)
// =========================================================================
const AcornShieldVisual: React.FC<{ size?: number }> = ({ size = 105 }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: floatAnim }],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          {/* Signature Emerald Glow matching the Mascot Circle */}
          <SvgGradient id="emeraldSpotlight" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#10B981" stopOpacity="0.30" />
            <Stop offset="100%" stopColor="#059669" stopOpacity="0.10" />
          </SvgGradient>
          {/* Acorn Body Gradient */}
          <SvgGradient id="acornBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FBBF24" />
            <Stop offset="45%" stopColor="#F59E0B" />
            <Stop offset="100%" stopColor="#B45309" />
          </SvgGradient>
          {/* Acorn Cap Gradient */}
          <SvgGradient id="acornCapGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#78350F" />
            <Stop offset="100%" stopColor="#451A03" />
          </SvgGradient>
          {/* Shield Core Gradient */}
          <SvgGradient id="shieldCoreGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#34D399" />
            <Stop offset="100%" stopColor="#059669" />
          </SvgGradient>
        </Defs>

        {/* 1. Backdrop Ambient Green Circle (Exactly like the squirrel card!) */}
        <Circle
          cx="50"
          cy="52"
          r="42"
          fill="url(#emeraldSpotlight)"
          stroke="rgba(110, 231, 183, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <Circle cx="50" cy="52" r="32" fill="rgba(16, 185, 129, 0.18)" />

        {/* 2. Acorn Body (Nut that squirrels eat!) */}
        <Path
          d="M32 40 C32 40 28 66 50 84 C72 66 68 40 68 40 Z"
          fill="url(#acornBodyGrad)"
          stroke="#051A0E"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Acorn Gloss Reflection */}
        <Path
          d="M36 44 C35 52 38 64 43 70"
          fill="none"
          stroke="#FEF3C7"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 3. Acorn Woody Cap (Hat) with Texture & Stem */}
        <Path
          d="M26 40 C26 29 74 29 74 40 C74 42 26 42 26 40 Z"
          fill="url(#acornCapGrad)"
          stroke="#051A0E"
          strokeWidth="2.2"
        />
        {/* Acorn Cap Stem */}
        <Path
          d="M50 31 C50 24 53 17 57 15"
          fill="none"
          stroke="#051A0E"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Cap Texture */}
        <Path d="M34 35 Q40 38 46 35" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <Path d="M54 35 Q60 38 66 35" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <Path d="M44 38 Q50 41 56 38" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* 4. Nutrient Shield Crest on the Acorn */}
        <Path
          d="M50 47 L62 52 C62 67 50 76 50 76 C50 76 38 67 38 52 Z"
          fill="url(#shieldCoreGrad)"
          stroke="#ECFDF5"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Crisp White Shield Checkmark */}
        <Path
          d="M44 60 L48 64 L56 55"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 5. Golden Sparkles */}
        <Path d="M78 20 L80 24 L84 26 L80 28 L78 32 L76 28 L72 26 L76 24 Z" fill="#FDE68A" />
        <Path d="M20 62 L21 65 L24 66 L21 67 L20 70 L19 67 L16 66 L19 65 Z" fill="#6EE7B7" opacity={0.85} />
      </Svg>
    </Animated.View>
  );
};

// =========================================================================
// Card 3 Visual: Forest Blueberries 🫐 & Crystal Dewdrop 💧 (What Squirrels Forage)
// =========================================================================
const BerryHydrationVisual: React.FC<{ size?: number }> = ({ size = 105 }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1300,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: floatAnim }],
      }}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          {/* Signature Emerald/Teal Glow matching squirrel backdrop */}
          <SvgGradient id="tealSpotlight" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#10B981" stopOpacity="0.30" />
            <Stop offset="100%" stopColor="#0D9488" stopOpacity="0.10" />
          </SvgGradient>
          {/* Big Dewdrop Gradient */}
          <SvgGradient id="dewdropGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#6EE7B7" />
            <Stop offset="50%" stopColor="#34D399" />
            <Stop offset="100%" stopColor="#059669" />
          </SvgGradient>
          {/* Berry Gradient 1 */}
          <SvgGradient id="berryGrad1" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#818CF8" />
            <Stop offset="60%" stopColor="#4F46E5" />
            <Stop offset="100%" stopColor="#312E81" />
          </SvgGradient>
          {/* Berry Gradient 2 */}
          <SvgGradient id="berryGrad2" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#A78BFA" />
            <Stop offset="60%" stopColor="#7C3AED" />
            <Stop offset="100%" stopColor="#4C1D95" />
          </SvgGradient>
          {/* Leaf Gradient */}
          <SvgGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#34D399" />
            <Stop offset="100%" stopColor="#059669" />
          </SvgGradient>
        </Defs>

        {/* 1. Backdrop Ambient Green Circle (Exactly like the squirrel card!) */}
        <Circle
          cx="50"
          cy="52"
          r="42"
          fill="url(#tealSpotlight)"
          stroke="rgba(110, 231, 183, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <Circle cx="50" cy="52" r="32" fill="rgba(16, 185, 129, 0.18)" />

        {/* 2. Main Pure Crystal Water Dewdrop */}
        <Path
          d="M50 18 C50 18 28 47 28 62 C28 74.15 37.85 84 50 84 C62.15 84 72 74.15 72 62 C72 47 50 18 50 18 Z"
          fill="url(#dewdropGrad)"
          stroke="#ECFDF5"
          strokeWidth="2.2"
        />
        {/* Wave level inside dewdrop */}
        <Path
          d="M31 60 Q40 55 50 60 T69 60 C69 71 60.5 81 50 81 C39.5 81 31 71 31 60 Z"
          fill="rgba(255, 255, 255, 0.32)"
        />
        {/* Dewdrop Gloss Highlight */}
        <Path
          d="M36 48 C34 56 36 64 38 68"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 3. Forest Blueberries (What squirrels love to eat!) */}
        {/* Left Berry */}
        <Circle cx="33" cy="72" r="12" fill="url(#berryGrad1)" stroke="#051A0E" strokeWidth="1.8" />
        <Circle cx="30" cy="69" r="2.5" fill="#E0E7FF" opacity={0.75} />
        <Path d="M33 68 L34 71 L37 72 L34 73 L33 76 L32 73 L29 72 L32 71 Z" fill="#312E81" />

        {/* Right Berry */}
        <Circle cx="68" cy="70" r="11" fill="url(#berryGrad2)" stroke="#051A0E" strokeWidth="1.8" />
        <Circle cx="65" cy="67" r="2.2" fill="#EDE9FE" opacity={0.75} />
        <Path d="M68 67 L69 69 L71 70 L69 71 L68 73 L67 71 L65 70 L67 69 Z" fill="#4C1D95" />

        {/* 4. Fresh Forest Leaf 🍃 */}
        <Path
          d="M50 16 C42 10 38 16 38 22 C44 22 48 18 50 16 Z"
          fill="url(#leafGrad)"
          stroke="#051A0E"
          strokeWidth="1.4"
        />

        {/* 5. Floating Splash Bubbles */}
        <Circle cx="76" cy="28" r="4" fill="#6EE7B7" opacity={0.9} />
        <Circle cx="21" cy="38" r="2.8" fill="#A7F3D0" opacity={0.8} />
        <Circle cx="78" cy="46" r="2.2" fill="#D1FAE5" opacity={0.9} />
      </Svg>
    </Animated.View>
  );
};

export const MascotBanner: React.FC<MascotBannerProps> = ({
  tip = 'Sugar & sodium are in harmony! Stay hydrated before dinner.',
  healthScore = 88,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // Live Pulse Animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Unified SQUI Emerald Nature Variations
  const slides = [
    {
      tag: 'DAILY BALANCE',
      tagColor: '#6EE7B7',
      pulseColor: '#10B981',
      headline: `Score: ${healthScore}/100`,
      body: tip,
      badgeText: '88 pts 🌰',
      badgeBg: 'rgba(212, 163, 115, 0.25)',
      badgeBorder: 'rgba(212, 163, 115, 0.45)',
      badgeColor: '#FEF3C7',
      buttonText: 'Insights ✨',
      btnColors: ['#10B981', '#059669'] as [string, string],
      cardGradient: ['#0C2919', '#144229', '#1E5E3B'] as [string, string, string],
      borderColor: 'rgba(45, 106, 79, 0.55)',
      visualType: 'mascot',
    },
    {
      tag: 'NUTRIENT SHIELD',
      tagColor: '#A7F3D0',
      pulseColor: '#10B981',
      headline: 'Sugar & Sodium Safe',
      body: 'Sugar 14g / 25g • Sodium 1,070mg (balanced).',
      badgeText: 'Safe 🛡️',
      badgeBg: 'rgba(16, 185, 129, 0.25)',
      badgeBorder: 'rgba(110, 231, 183, 0.45)',
      badgeColor: '#ECFDF5',
      buttonText: 'View Shield ➔',
      btnColors: ['#059669', '#047857'] as [string, string],
      cardGradient: ['#082618', '#0F3F28', '#165738'] as [string, string, string],
      borderColor: 'rgba(52, 211, 153, 0.45)',
      visualType: 'acornShield',
    },
    {
      tag: 'DAILY HYDRATION',
      tagColor: '#6EE7B7',
      pulseColor: '#10B981',
      headline: '1,750 ml Logged',
      body: '750ml remaining to hit your 2,500ml daily target.',
      badgeText: '70% 💧',
      badgeBg: 'rgba(16, 185, 129, 0.25)',
      badgeBorder: 'rgba(110, 231, 183, 0.45)',
      badgeColor: '#ECFDF5',
      buttonText: 'Log Water ➔',
      btnColors: ['#10B981', '#047857'] as [string, string],
      cardGradient: ['#0A2D22', '#124A3A', '#1C6B55'] as [string, string, string],
      borderColor: 'rgba(45, 140, 125, 0.5)',
      visualType: 'berryHydration',
    },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const slideIdx = Math.round(offsetX / CARD_WIDTH);
    if (slideIdx >= 0 && slideIdx < slides.length && slideIdx !== activeSlide) {
      setActiveSlide(slideIdx);
    }
  };

  const changeSlide = (index: number) => {
    setActiveSlide(index);
    scrollRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Full-Card Swipeable Horizontal Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
        onMomentumScrollEnd={onScrollEnd}
        style={styles.scrollView}
      >
        {slides.map((slide, idx) => (
          <View key={idx} style={styles.cardWrapper}>
            <LinearGradient
              colors={slide.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.cardGradient, { borderColor: slide.borderColor }]}
            >
              {/* Ambient Decorative Glows */}
              <View style={styles.glowCircle1} />
              <View style={styles.glowCircle2} />

              <View style={styles.mainRow}>
                {/* Left Content Column */}
                <View style={styles.leftCol}>
                  {/* Tag & Badge Row */}
                  <View style={styles.tagRow}>
                    <Animated.View
                      style={[
                        styles.pulseDot,
                        {
                          backgroundColor: slide.pulseColor,
                          transform: [{ scale: pulseAnim }],
                        },
                      ]}
                    />
                    <Text style={[styles.companionTag, { color: slide.tagColor }]}>
                      {slide.tag}
                    </Text>
                    <View
                      style={[
                        styles.headerScoreBadge,
                        {
                          backgroundColor: slide.badgeBg,
                          borderColor: slide.badgeBorder,
                        },
                      ]}
                    >
                      <Text style={[styles.headerScoreBadgeText, { color: slide.badgeColor }]}>
                        {slide.badgeText}
                      </Text>
                    </View>
                  </View>

                  {/* Title & Body */}
                  <Text style={styles.statusTitle}>{slide.headline}</Text>
                  <Text style={styles.statusSub} numberOfLines={2}>
                    {slide.body}
                  </Text>

                  {/* Action Button */}
                  <TouchableOpacity
                    style={styles.actionBtnWrap}
                    activeOpacity={0.8}
                    onPress={() => setIsModalOpen(true)}
                  >
                    <LinearGradient
                      colors={slide.btnColors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.actionBtnGradient}
                    >
                      <Text style={styles.actionBtnText}>{slide.buttonText}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* Right Visual Column: Squirrel & What Squirrels Eat! */}
                <View style={styles.rightVisualCol}>
                  {slide.visualType === 'mascot' && (
                    <SquiMascot size={105} animated={true} />
                  )}
                  {slide.visualType === 'acornShield' && (
                    <AcornShieldVisual size={100} />
                  )}
                  {slide.visualType === 'berryHydration' && (
                    <BerryHydrationVisual size={100} />
                  )}
                </View>
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      {/* Interactive Pagination Dots (• • •) */}
      <View style={styles.dotsRow}>
        {slides.map((_, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => changeSlide(idx)}
            activeOpacity={0.7}
            style={[
              styles.dot,
              idx === activeSlide && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* ======================================================== */}
      {/* 4-Pillar Health Score Breakdown Modal                     */}
      {/* ======================================================== */}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />

            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Daily Health Score</Text>
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Insight 1: Sugar Control */}
              <View style={styles.insightCard}>
                <View style={styles.insightIconBox}>
                  <IconShieldCheck size={20} color="#10B981" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.insightTitle}>Sugar Control • 28 / 30 pts</Text>
                  <Text style={styles.insightDesc}>
                    Added sugar is safely within the recommended 25g limit.
                  </Text>
                </View>
              </View>

              {/* Insight 2: Sodium Balance */}
              <View style={styles.insightCard}>
                <View style={styles.insightIconBox}>
                  <IconTarget size={20} color="#10B981" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.insightTitle}>Sodium Balance • 26 / 30 pts</Text>
                  <Text style={styles.insightDesc}>
                    Daily intake is 1,070mg, well below the 2,000mg maximum.
                  </Text>
                </View>
              </View>

              {/* Insight 3: Hydration */}
              <View style={styles.insightCard}>
                <View style={styles.insightIconBox}>
                  <IconDroplet size={20} color="#38BDF8" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.insightTitle}>Hydration • 16 / 20 pts</Text>
                  <Text style={styles.insightDesc}>
                    1,750ml logged (70% of 2,500ml daily target).
                  </Text>
                </View>
              </View>

              {/* Insight 4: Meal Logging */}
              <View style={styles.insightCard}>
                <View style={styles.insightIconBox}>
                  <IconSparkles size={20} color="#F59E0B" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.insightTitle}>Meal Logging • 18 / 20 pts</Text>
                  <Text style={styles.insightDesc}>
                    Logged 2 out of 3 meals today with mindful consistency.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

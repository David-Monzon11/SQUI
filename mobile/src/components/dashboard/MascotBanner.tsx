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

// Custom Nutrient Shield Visual for Card 2
const NutrientShieldVisual: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <SvgGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#34D399" />
          <Stop offset="100%" stopColor="#059669" />
        </SvgGradient>
        <SvgGradient id="shieldInner" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#065F46" />
          <Stop offset="100%" stopColor="#064E3B" />
        </SvgGradient>
      </Defs>
      {/* Outer ambient dashed aura */}
      <Circle
        cx="50"
        cy="50"
        r="44"
        fill="rgba(16, 185, 129, 0.12)"
        stroke="rgba(110, 231, 183, 0.4)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      {/* Inner glow circle */}
      <Circle cx="50" cy="50" r="36" fill="rgba(5, 150, 105, 0.25)" />
      
      {/* Outer Shield Crest */}
      <Path
        d="M50 16 L74 25 C74 54 50 78 50 78 C50 78 26 54 26 25 Z"
        fill="url(#shieldGrad)"
        stroke="#6EE7B7"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inner Shield Cavity */}
      <Path
        d="M50 24 L67 31 C67 52 50 70 50 70 C50 70 33 52 33 31 Z"
        fill="url(#shieldInner)"
      />
      {/* Bold Safety Checkmark */}
      <Path
        d="M41 46 L47 52 L59 39"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative Sparkles */}
      <Path d="M78 18 L80 23 L85 25 L80 27 L78 32 L76 27 L71 25 L76 23 Z" fill="#FDE68A" />
      <Path d="M22 66 L23 69 L26 70 L23 71 L22 74 L21 71 L18 70 L21 69 Z" fill="#6EE7B7" />
    </Svg>
  </View>
);

// Custom Hydration Droplet Visual for Card 3
const HydrationVisual: React.FC<{ size?: number }> = ({ size = 95 }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <SvgGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#38BDF8" />
          <Stop offset="100%" stopColor="#0284C7" />
        </SvgGradient>
      </Defs>
      {/* Outer ambient water glow ring */}
      <Circle
        cx="50"
        cy="50"
        r="44"
        fill="rgba(56, 189, 248, 0.12)"
        stroke="rgba(56, 189, 248, 0.35)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <Circle cx="50" cy="50" r="36" fill="rgba(14, 116, 144, 0.25)" />

      {/* Main Hydro Droplet */}
      <Path
        d="M50 18 C50 18 28 47 28 62 C28 74.15 37.85 84 50 84 C62.15 84 72 74.15 72 62 C72 47 50 18 50 18 Z"
        fill="url(#waterGrad)"
        stroke="#7DD3FC"
        strokeWidth="2.5"
      />
      {/* Translucent Wave Level inside droplet */}
      <Path
        d="M31 60 Q40 54 50 60 T69 60 C69 71 60.5 81 50 81 C39.5 81 31 71 31 60 Z"
        fill="rgba(255, 255, 255, 0.28)"
      />
      {/* Highlight reflection */}
      <Path
        d="M37 48 C35 55 36 63 38 67"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Floating Aqua Bubbles */}
      <Circle cx="76" cy="26" r="4.5" fill="#38BDF8" opacity={0.85} />
      <Circle cx="21" cy="36" r="3" fill="#7DD3FC" opacity={0.75} />
      <Circle cx="79" cy="67" r="2.8" fill="#BAE6FD" opacity={0.9} />
    </Svg>
  </View>
);

export const MascotBanner: React.FC<MascotBannerProps> = ({
  tip = 'Sugar & sodium are in harmony! Stay hydrated before dinner.',
  healthScore = 88,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // Live Pulse Animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
      borderColor: 'rgba(45, 106, 79, 0.45)',
      visualType: 'mascot',
    },
    {
      tag: 'NUTRIENT SHIELD',
      tagColor: '#6EE7B7',
      pulseColor: '#10B981',
      headline: 'Sugar & Sodium Safe',
      body: 'Sugar 14g / 25g • Sodium 1,070mg (balanced).',
      badgeText: 'Safe 🛡️',
      badgeBg: 'rgba(16, 185, 129, 0.25)',
      badgeBorder: 'rgba(110, 231, 183, 0.45)',
      badgeColor: '#ECFDF5',
      buttonText: 'View Shield ➔',
      btnColors: ['#059669', '#047857'] as [string, string],
      cardGradient: ['#042F24', '#064E3B', '#0D6E54'] as [string, string, string],
      borderColor: 'rgba(16, 185, 129, 0.45)',
      visualType: 'shield',
    },
    {
      tag: 'DAILY HYDRATION',
      tagColor: '#7DD3FC',
      pulseColor: '#38BDF8',
      headline: '1,750 ml Logged',
      body: '750ml remaining to hit your 2,500ml daily target.',
      badgeText: '70% 💧',
      badgeBg: 'rgba(56, 189, 248, 0.25)',
      badgeBorder: 'rgba(125, 211, 252, 0.45)',
      badgeColor: '#F0F9FF',
      buttonText: 'Log Water ➔',
      btnColors: ['#0284C7', '#0369A1'] as [string, string],
      cardGradient: ['#062A3B', '#0A4A66', '#0284C7'] as [string, string, string],
      borderColor: 'rgba(56, 189, 248, 0.45)',
      visualType: 'hydration',
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

                {/* Right Visual Column: Unique for each card */}
                <View style={styles.rightVisualCol}>
                  {slide.visualType === 'mascot' && (
                    <SquiMascot size={105} animated={true} />
                  )}
                  {slide.visualType === 'shield' && (
                    <NutrientShieldVisual size={95} />
                  )}
                  {slide.visualType === 'hydration' && (
                    <HydrationVisual size={95} />
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

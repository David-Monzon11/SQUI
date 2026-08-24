import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SquiMascot } from '../common/SquiMascot';
import { IconSparkles, IconShieldCheck, IconDroplet, IconTarget } from '../common/Icons';
import {
  mascotBannerStyles as styles,
  CARD_WIDTH,
  SLIDE_GAP,
} from './MascotBanner.styles';

interface MascotBannerProps {
  tip?: string;
  healthScore?: number;
}

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
      headline: `Score: ${healthScore}/100`,
      body: tip,
      badgeText: '88 pts 🌰',
      buttonText: 'Insights ✨',
    },
    {
      tag: 'NUTRIENT SHIELD',
      headline: 'Sugar & Sodium Safe',
      body: 'Sugar 14g / 25g • Sodium 1,070mg (balanced).',
      badgeText: 'Safe 🛡️',
      buttonText: 'View Shield ➔',
    },
    {
      tag: 'DAILY HYDRATION',
      headline: '1,750 ml Logged',
      body: '750ml remaining to hit your 2,500ml daily target.',
      badgeText: '70% 💧',
      buttonText: 'Log Water ➔',
    },
  ];

  useEffect(() => {
    // Live green pulse indicator
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
    const itemInterval = CARD_WIDTH + SLIDE_GAP;
    const slideIdx = Math.round(offsetX / itemInterval);
    if (slideIdx >= 0 && slideIdx < slides.length && slideIdx !== activeSlide) {
      setActiveSlide(slideIdx);
    }
  };

  const changeSlide = (index: number) => {
    setActiveSlide(index);
    const itemInterval = CARD_WIDTH + SLIDE_GAP;
    scrollRef.current?.scrollTo({
      x: index * itemInterval,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Full-Card Native Horizontal Swipeable Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + SLIDE_GAP}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={onScrollEnd}
      >
        {slides.map((slide, idx) => (
          <View key={idx} style={styles.cardSlide}>
            <LinearGradient
              colors={['#0A2416', '#123D25', '#1B5534']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
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
                        { transform: [{ scale: pulseAnim }] },
                      ]}
                    />
                    <Text style={styles.companionTag}>{slide.tag}</Text>
                    <View style={styles.headerScoreBadge}>
                      <Text style={styles.headerScoreBadgeText}>{slide.badgeText}</Text>
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
                      colors={['#10B981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.actionBtnGradient}
                    >
                      <Text style={styles.actionBtnText}>{slide.buttonText}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* Right: SQUI Mascot with Dedicated Green Circle Backdrop */}
                <View style={styles.rightMascotCol}>
                  <View style={styles.mascotCircleContainer}>
                    {/* Glowing Emerald Ring Backdrop */}
                    <View style={styles.mascotGlowRing} />

                    {/* Concentric Emerald Green Circle */}
                    <LinearGradient
                      colors={['#185333', '#0E3621', '#062013']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.mascotCircleGradient}
                    >
                      <SquiMascot size={78} animated={true} />
                    </LinearGradient>
                  </View>
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

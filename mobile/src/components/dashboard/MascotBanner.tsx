import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SquiMascot } from '../common/SquiMascot';
import { mascotBannerStyles as styles } from './MascotBanner.styles';

interface MascotBannerProps {
  healthScore?: number;
  tip?: string;
  sugarG?: number;
  sodiumMg?: number;
  waterMl?: number;
  mealCount?: number;
}

export const MascotBanner: React.FC<MascotBannerProps> = ({
  healthScore = 88,
  sugarG = 14,
  sodiumMg = 1070,
  waterMl = 1750,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const sugarStatus = sugarG <= 25 ? 'Safe' : 'Caution';
  const sodiumStatus = sodiumMg <= 2000 ? 'Safe' : 'Caution';
  const waterPct = Math.min(Math.round((waterMl / 2500) * 100), 100);

  return (
    <View style={styles.container}>
      {/* Master Bento Hero Card (Matching 2-Side Diagonal Gradient System) */}
      <TouchableOpacity
        style={styles.touchWrap}
        activeOpacity={0.9}
        onPress={() => setIsModalOpen(true)}
      >
        <LinearGradient
          colors={['#0F3C26', '#0A2D1C', '#061D12']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          {/* Ambient Decorative Glow */}
          <View style={styles.ambientGlow} />

          <View style={styles.mainRow}>
            {/* Left: SQUI Mascot with Synchronized Bouncing Leaves Stage */}
            <View style={styles.mascotCol}>
              <SquiMascot size={95} animated={true} showLeaves={true} />
            </View>

            {/* Right: Metric Content & Keyword Chips */}
            <View style={styles.rightCol}>
              {/* Category & Status Pill */}
              <View style={styles.topTagRow}>
                <Text style={styles.categoryLabel}>DAILY HARMONY</Text>
                <View style={styles.statusBadge}>
                  <Animated.View
                    style={[styles.statusDot, { transform: [{ scale: pulseAnim }] }]}
                  />
                  <Text style={styles.statusBadgeText}>OPTIMAL</Text>
                </View>
              </View>

              {/* Big Bold Hero Score */}
              <View style={styles.scoreRow}>
                <Text style={styles.scoreValue}>{healthScore}</Text>
                <Text style={styles.scoreMax}>/ 100</Text>
                <Text style={styles.scoreStatusText}>Balanced ✨</Text>
              </View>

              {/* Clean Keyword Highlight Chips */}
              <View style={styles.chipsRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>Sugar: {sugarStatus}</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>Sodium: {sodiumStatus}</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>💧 {waterPct}% Hydrated</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* ======================================================== */}
      {/* 4-Pillar Health Score Breakdown Modal                     */}
      {/* ======================================================== */}
      <Modal
        visible={isModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Daily Health Harmony</Text>
            <Text style={styles.modalSub}>Calculated from your visual food journal & hydration</Text>

            {/* Large Score Circle */}
            <View style={styles.scoreCircleContainer}>
              <Text style={styles.bigScoreNumber}>{healthScore}</Text>
              <Text style={styles.bigScoreLabel}>OUT OF 100 PTS</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Pillar 1: Sugar */}
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarTitle}>🍬 Sugar Balance</Text>
                  <Text style={styles.pillarScore}>30 / 30 pts</Text>
                </View>
                <Text style={styles.pillarDesc}>
                  Total logged sugar is {sugarG}g (safely within WHO ≤25g target).
                </Text>
              </View>

              {/* Pillar 2: Sodium */}
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarTitle}>🧂 Sodium Balance</Text>
                  <Text style={styles.pillarScore}>28 / 30 pts</Text>
                </View>
                <Text style={styles.pillarDesc}>
                  Total logged sodium is {sodiumMg}mg (safely below AHA ≤2,000mg cap).
                </Text>
              </View>

              {/* Pillar 3: Hydration */}
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarTitle}>💧 Daily Hydration</Text>
                  <Text style={styles.pillarScore}>16 / 20 pts</Text>
                </View>
                <Text style={styles.pillarDesc}>
                  {waterMl}ml logged of 2,500ml daily target ({waterPct}% completed).
                </Text>
              </View>

              {/* Pillar 4: Food Journaling */}
              <View style={styles.pillarCard}>
                <View style={styles.pillarHeader}>
                  <Text style={styles.pillarTitle}>📸 Meal Journaling</Text>
                  <Text style={styles.pillarScore}>18 / 20 pts</Text>
                </View>
                <Text style={styles.pillarDesc}>
                  Meals logged consistently across breakfast, lunch, and snacks.
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.closeBtn} onPress={() => setIsModalOpen(false)}>
              <Text style={styles.closeBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

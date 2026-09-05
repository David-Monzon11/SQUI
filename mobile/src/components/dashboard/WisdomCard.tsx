import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WisdomCategory, WisdomTip } from '../../types';
import { wisdomCardStyles as styles } from './WisdomCard.styles';

const DEFAULT_TIPS: WisdomTip[] = [
  {
    id: 'tip-sugar-1',
    category: 'SUGAR',
    title: 'Hidden Sugar Awareness',
    content: 'Sauces and condiments like ketchup and barbecue can pack up to 4g of hidden sugar per tablespoon.',
    actionItem: 'Check condiment nutrition labels before dressing your plate today.',
    xpReward: 5,
    icon: '🍯',
  },
  {
    id: 'tip-sodium-1',
    category: 'SODIUM',
    title: 'Sodium & Potassium Balance',
    content: 'Potassium-rich foods like leafy greens and bananas help your body process excess sodium smoothly.',
    actionItem: 'Pair savory meals with a side of spinach or fresh avocado.',
    xpReward: 5,
    icon: '🌿',
  },
  {
    id: 'tip-hydration-1',
    category: 'HYDRATION',
    title: 'The Pre-Meal Water Sip',
    content: 'Drinking 200ml of water 15 minutes before dining enhances digestion and supports natural satiety.',
    actionItem: 'Enjoy a glass of water before your next main meal.',
    xpReward: 5,
    icon: '💧',
  },
  {
    id: 'tip-mindfulness-1',
    category: 'MINDFULNESS',
    title: 'The 20-Minute Chewing Rhythm',
    content: 'It takes approximately 20 minutes for satiety signals to reach your brain during dining.',
    actionItem: 'Chew slowly and take a 30-second pause between bites.',
    xpReward: 5,
    icon: '🐿️',
  },
];

export const WisdomCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WisdomCategory>('SUGAR');
  const [completedTips, setCompletedTips] = useState<Record<string, boolean>>({});

  const categories: WisdomCategory[] = ['SUGAR', 'SODIUM', 'HYDRATION', 'MINDFULNESS'];
  const activeTip = DEFAULT_TIPS.find((t) => t.category === selectedCategory) || DEFAULT_TIPS[0];
  const isCompleted = !!completedTips[activeTip.id];

  const handleToggleHabit = () => {
    setCompletedTips((prev) => ({
      ...prev,
      [activeTip.id]: !prev[activeTip.id],
    }));
  };

  return (
    <LinearGradient
      colors={['#E8F4EC', '#FDFBF7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={styles.mascotIcon}>🐿️</Text>
          <Text style={styles.cardTitle}>SQUI Daily Wisdom</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={{ fontSize: 11 }}>🔥</Text>
          <Text style={styles.streakText}>4 Day Streak</Text>
        </View>
      </View>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat) => {
          const isActive = cat === selectedCategory;
          return (
            <TouchableOpacity
              key={cat}
              activeOpacity={0.8}
              style={[styles.categoryPill, isActive && styles.activeCategoryPill]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tip Content Box */}
      <View style={styles.contentBox}>
        <View style={styles.tipTitleRow}>
          <Text style={styles.tipIcon}>{activeTip.icon}</Text>
          <Text style={styles.tipTitle}>{activeTip.title}</Text>
        </View>
        <Text style={styles.tipBody}>{activeTip.content}</Text>

        {/* Action Item & Habit Button */}
        <View style={styles.actionBox}>
          <Text style={styles.actionText} numberOfLines={2}>
            🎯 {activeTip.actionItem}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.checkBtn, isCompleted && styles.completedCheckBtn]}
            onPress={handleToggleHabit}
          >
            <Text style={styles.checkBtnText}>
              {isCompleted ? '✓ Done (+5 XP)' : '+ Checkoff'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { knowledgeStyles as styles } from './Knowledge.styles';

interface Article {
  id: string;
  title: string;
  category: string;
  readTimeMin: number;
  summary: string;
  content: string;
}

const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Understanding Dietary Sugar Consumed: Natural vs. Added',
    category: 'SUGAR',
    readTimeMin: 3,
    summary: 'Why the WHO recommends keeping added sugars under 25g daily and how to spot hidden sugars in foods.',
    content:
      'Added sugars provide quick calories without micronutrients. While whole fruits contain fructose accompanied by beneficial fiber that slows absorption, processed beverages and condiments often contain hidden high-fructose corn syrup that causes sharp glucose spikes. SQUI helps you track total daily sugar consumed from food with gentle color-coded alerts.',
  },
  {
    id: 'art-2',
    title: 'The Sodium Equation: Protecting Heart & Kidneys',
    category: 'SODIUM',
    readTimeMin: 4,
    summary: 'Excess sodium pulls extra water into your blood vessels. Discover simple seasoning swaps.',
    content:
      'A single teaspoon of salt contains roughly 2,300mg of sodium. Most dietary sodium comes from processed food, restaurant meals, and packaged seasonings rather than home cooking. To balance higher sodium days, drink plenty of water and enjoy potassium-rich foods like bananas, leafy greens, and avocados.',
  },
  {
    id: 'art-3',
    title: 'The SQUI Mindset: Awareness Over Restriction',
    category: 'HABITS',
    readTimeMin: 3,
    summary: 'Why sustainable wellness is built through daily preparation and balance rather than crash diets.',
    content:
      'Like a squirrel that plans ahead for each season, mindful nutrition is about consistency and foresight. Strict deprivation often triggers binge cycles, while visual food journaling builds intuitive understanding of meal composition, portion sizes, and satiety cues.',
  },
  {
    id: 'art-4',
    title: 'Hydration Mastery: Reaching Your 2.5L Daily Goal',
    category: 'HYDRATION',
    readTimeMin: 2,
    summary: 'Effortless morning and afternoon routines to keep your metabolism and kidneys thriving.',
    content:
      'Drink a 500ml glass of water immediately upon waking up, before your morning coffee or breakfast. Have another glass 30 minutes before lunch and dinner. Keeping a dedicated water bottle at your desk makes hitting your 2.5L goal effortless.',
  },
  {
    id: 'art-5',
    title: 'Flavorful Swaps: Delicious Everyday Alternatives',
    category: 'NUTRITION',
    readTimeMin: 3,
    summary: 'Swap heavy sodium condiments for citrus, garlic, herbs, and toasted spices.',
    content:
      'Fresh lemon juice, roasted garlic, black pepper, rosemary, and smoked paprika deliver incredible depth of flavor with zero added sodium. For crunchy snacks, unsalted almonds and fresh cucumber spears offer satisfying texture.',
  },
];

const CATEGORIES = ['ALL', 'SUGAR', 'SODIUM', 'HABITS', 'HYDRATION', 'NUTRITION'];

export const KnowledgeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filteredArticles =
    selectedCategory === 'ALL'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Knowledge Hub</Text>
          <Text style={styles.subtitle}>Evidence-informed guides to empower your daily choices.</Text>
        </View>

        {/* Category Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Articles List */}
        {filteredArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            activeOpacity={0.7}
            onPress={() => setActiveArticle(article)}
            style={styles.articleCard}
          >
            <View style={styles.cardTop}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{article.category}</Text>
              </View>
              <Text style={styles.readTime}>⏱️ {article.readTimeMin} min read</Text>
            </View>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleSummary}>{article.summary}</Text>
            <Text style={styles.readMore}>Read Guide →</Text>
          </TouchableOpacity>
        ))}

        {/* Article Detail Modal */}
        <Modal visible={activeArticle !== null} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{activeArticle?.category}</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveArticle(null)}>
                  <Text style={styles.closeBtn}>✕ Close</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalBody}>
                <Text style={styles.modalTitle}>{activeArticle?.title}</Text>
                <Text style={styles.modalReadTime}>⏱️ {activeArticle?.readTimeMin} min read</Text>
                <Text style={styles.modalText}>{activeArticle?.content}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

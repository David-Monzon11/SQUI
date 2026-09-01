import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS } from '../../constants/typography';
import {
  IconBell,
  IconSparkles,
  IconSquiHydration,
  IconScale,
  IconHomeLeaf,
  IconTarget,
} from './Icons';
import { notificationModalStyles as styles } from './NotificationModal.styles';

interface NotificationItem {
  id: string;
  category: 'journal' | 'hydration' | 'nutrition' | 'summary';
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  actionText?: string;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigateMealLog?: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
  onNavigateMealLog,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'reminders'>('feed');

  // Reminders toggle states
  const [weightReminder, setWeightReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);
  const [summaryReminder, setSummaryReminder] = useState(true);

  // Sample SQUI Notifications Feed
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      category: 'journal',
      title: 'Lunch Photo Prompt 📸',
      message: 'Time to snap your lunch meal photo to calculate today’s dietary sugar and sodium!',
      timestamp: '12:30 PM',
      unread: true,
      actionText: 'Log Meal Now',
    },
    {
      id: '2',
      category: 'hydration',
      title: 'Hydration Target 70% Reached 💧',
      message: 'Awesome progress! You reached 1,750 ml of your 2,500 ml daily water goal.',
      timestamp: '02:15 PM',
      unread: true,
    },
    {
      id: '3',
      category: 'nutrition',
      title: 'Mindful Nutrient Tip 🍃',
      message: 'Lunch sodium was slightly high—balance your dinner with fresh leafy greens and plenty of hydration!',
      timestamp: '03:45 PM',
      unread: false,
    },
    {
      id: '4',
      category: 'summary',
      title: 'Yesterday’s Daily Scorecard 🌟',
      message: 'You scored 88/100 yesterday with balanced sugar and hydration discipline!',
      timestamp: 'Yesterday',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getCategoryStyles = (category: NotificationItem['category']) => {
    switch (category) {
      case 'journal':
        return {
          bg: '#E8F3EC',
          text: '#1B432C',
          label: 'LOG MEAL',
          icon: <IconSparkles size={16} color="#1B432C" />,
        };
      case 'hydration':
        return {
          bg: '#E0F2FE',
          text: '#0284C7',
          label: 'HYDRATION',
          icon: <IconSquiHydration size={16} color="#0284C7" />,
        };
      case 'nutrition':
        return {
          bg: '#FEF3C7',
          text: '#D97706',
          label: 'MINDFUL TIP',
          icon: <IconHomeLeaf size={16} color="#D97706" />,
        };
      case 'summary':
        return {
          bg: '#F1F5F9',
          text: '#475569',
          label: 'SCORECARD',
          icon: <IconTarget size={16} color="#475569" />,
        };
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackdropTouch} />
        </TouchableWithoutFeedback>

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.98)', 'rgba(253, 251, 247, 0.92)']}
          style={styles.glassModalContent}
        >
          <View style={styles.modalDragHandle} />

          {/* Modal Header */}
          <View style={styles.modalHeaderRow}>
            <View style={styles.headerLeftGroup}>
              <View style={styles.headerIconBadge}>
                <IconBell size={20} color="#1B432C" />
              </View>
              <View>
                <Text style={styles.modalTitle}>Notifications</Text>
                <Text style={styles.modalSubtitle}>SQUI Mindful Updates & Prompts</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Glassy Tab Switcher */}
          <View style={styles.tabBarWrap}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'feed' && styles.tabBtnActive]}
              onPress={() => setActiveTab('feed')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabBtnText, activeTab === 'feed' && styles.tabBtnTextActive]}>
                Alerts & Insights
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'reminders' && styles.tabBtnActive]}
              onPress={() => setActiveTab('reminders')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabBtnText, activeTab === 'reminders' && styles.tabBtnTextActive]}>
                Smart Reminders
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScrollBody} showsVerticalScrollIndicator={false}>
            {activeTab === 'feed' ? (
              <>
                {/* Mark All Read Bar */}
                {notifications.some((n) => n.unread) && (
                  <TouchableOpacity
                    style={{ alignSelf: 'flex-end', marginBottom: 10, paddingHorizontal: 4 }}
                    onPress={markAllRead}
                  >
                    <Text style={{ fontFamily: FONTS.roundedBold, fontSize: 11.5, color: '#10B981' }}>
                      ✓ Mark all as read
                    </Text>
                  </TouchableOpacity>
                )}

                {notifications.map((item) => {
                  const catStyle = getCategoryStyles(item.category);

                  return (
                    <LinearGradient
                      key={item.id}
                      colors={
                        item.unread
                          ? ['rgba(255, 255, 255, 0.98)', 'rgba(232, 243, 236, 0.60)']
                          : ['rgba(255, 255, 255, 0.90)', 'rgba(248, 250, 252, 0.75)']
                      }
                      style={styles.glassNotificationCard}
                    >
                      {item.unread && <View style={styles.cardUnreadMarker} />}

                      <View style={styles.cardHeaderRow}>
                        <View style={[styles.cardIconWrap, { backgroundColor: catStyle.bg }]}>
                          {catStyle.icon}
                        </View>
                        <View style={[styles.cardCategoryBadge, { backgroundColor: catStyle.bg }]}>
                          <Text style={[styles.cardCategoryText, { color: catStyle.text }]}>
                            {catStyle.label}
                          </Text>
                        </View>
                        <Text style={styles.cardTimeText}>{item.timestamp}</Text>
                      </View>

                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardMessage}>{item.message}</Text>

                      {item.actionText && (
                        <View style={styles.cardActionRow}>
                          <TouchableOpacity
                            style={styles.cardActionBtn}
                            onPress={() => {
                              onClose();
                              if (onNavigateMealLog) onNavigateMealLog();
                            }}
                          >
                            <Text style={styles.cardActionBtnText}>{item.actionText} →</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </LinearGradient>
                  );
                })}
              </>
            ) : (
              <>
                {/* Reminders Settings */}
                <View style={styles.settingsGlassCard}>
                  <View style={styles.settingIconWrap}>
                    <IconScale size={18} color="#1B432C" />
                  </View>
                  <View style={styles.settingTextWrap}>
                    <Text style={styles.settingTitle}>Morning Weigh-in Check</Text>
                    <Text style={styles.settingSub}>07:30 AM gentle check-in prompt</Text>
                  </View>
                  <Switch
                    value={weightReminder}
                    onValueChange={setWeightReminder}
                    trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingsGlassCard}>
                  <View style={styles.settingIconWrap}>
                    <IconSparkles size={18} color="#1B432C" />
                  </View>
                  <View style={styles.settingTextWrap}>
                    <Text style={styles.settingTitle}>Meal Photo Prompts</Text>
                    <Text style={styles.settingSub}>Breakfast, Lunch & Dinner reminders</Text>
                  </View>
                  <Switch
                    value={mealReminder}
                    onValueChange={setMealReminder}
                    trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingsGlassCard}>
                  <View style={styles.settingIconWrap}>
                    <IconTarget size={18} color="#1B432C" />
                  </View>
                  <View style={styles.settingTextWrap}>
                    <Text style={styles.settingTitle}>Evening Health Summary</Text>
                    <Text style={styles.settingSub}>09:00 PM Scorecard & reflections</Text>
                  </View>
                  <Switch
                    value={summaryReminder}
                    onValueChange={setSummaryReminder}
                    trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <TouchableOpacity onPress={onClose} activeOpacity={0.88}>
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.modalFooterBtn}
                  >
                    <Text style={styles.modalFooterBtnText}>Save Preferences</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
};

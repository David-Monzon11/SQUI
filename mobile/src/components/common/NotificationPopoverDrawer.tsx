import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  IconSparkles,
  IconSquiHydration,
  IconHomeLeaf,
  IconTarget,
  IconScale,
} from './Icons';
import { notificationPopoverStyles as styles } from './NotificationPopoverDrawer.styles';

interface NotificationItem {
  id: string;
  category: 'journal' | 'hydration' | 'nutrition' | 'summary';
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  actionText?: string;
}

interface NotificationPopoverDrawerProps {
  visible: boolean;
  onClose: () => void;
  onNavigateMealLog?: () => void;
  unreadCount?: number;
}

export const NotificationPopoverDrawer: React.FC<NotificationPopoverDrawerProps> = ({
  visible,
  onClose,
  onNavigateMealLog,
  unreadCount = 3,
}) => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'settings'>('alerts');

  // Reminders settings toggle states
  const [weightReminder, setWeightReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);
  const [summaryReminder, setSummaryReminder] = useState(true);

  // Sample SQUI Notifications Feed
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      category: 'journal',
      title: 'Lunch Photo Check-in 📸',
      message: 'Time to snap your lunch meal photo to calculate today’s dietary sugar and sodium!',
      timestamp: '12:30 PM',
      unread: true,
      actionText: 'Log Meal Now',
    },
    {
      id: '2',
      category: 'hydration',
      title: 'Hydration 70% Reached 💧',
      message: 'Awesome progress! You reached 1,750 ml of your 2,500 ml daily goal.',
      timestamp: '02:15 PM',
      unread: true,
    },
    {
      id: '3',
      category: 'nutrition',
      title: 'Mindful Nutrient Tip 🍃',
      message: 'Lunch sodium was slightly high—balance your dinner with fresh leafy greens and hydration!',
      timestamp: '03:45 PM',
      unread: true,
    },
    {
      id: '4',
      category: 'summary',
      title: 'Yesterday’s Scorecard 🌟',
      message: 'You scored 88/100 yesterday with balanced sugar and hydration discipline!',
      timestamp: 'Yesterday',
      unread: false,
    },
  ]);

  if (!visible) return null;

  const activeUnreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getCategoryStyles = (category: NotificationItem['category']) => {
    switch (category) {
      case 'journal':
        return {
          bg: '#E8F3EC',
          icon: <IconSparkles size={16} color="#1B432C" />,
        };
      case 'hydration':
        return {
          bg: '#E0F2FE',
          icon: <IconSquiHydration size={16} color="#0284C7" />,
        };
      case 'nutrition':
        return {
          bg: '#FEF3C7',
          icon: <IconHomeLeaf size={16} color="#D97706" />,
        };
      case 'summary':
        return {
          bg: '#F1F5F9',
          icon: <IconTarget size={16} color="#475569" />,
        };
    }
  };

  return (
    <>
      {/* Full-screen transparent backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayBackdrop} />
      </TouchableWithoutFeedback>

      {/* Floating Dropdown Drawer Popover */}
      <View style={styles.popoverContainer} pointerEvents="box-none">
        {/* Top Pointer Triangle Notch */}
        <View style={styles.topPointerNotch} />

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.98)', 'rgba(253, 251, 247, 0.95)']}
          style={styles.glassCard}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeftGroup}>
              <Text style={styles.headerTitle}>Notifications</Text>
              {activeUnreadCount > 0 && (
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.countPill}
                >
                  <Text style={styles.countPillText}>{activeUnreadCount}</Text>
                </LinearGradient>
              )}
            </View>

            {activeUnreadCount > 0 && (
              <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
                <Text style={styles.markReadBtnText}>Mark all read</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Drawer Tab Switcher */}
          <View style={styles.drawerTabBar}>
            <TouchableOpacity
              style={[styles.drawerTabBtn, activeTab === 'alerts' && styles.drawerTabActive]}
              onPress={() => setActiveTab('alerts')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.drawerTabText,
                  activeTab === 'alerts' && styles.drawerTabTextActive,
                ]}
              >
                Alerts & Feed
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.drawerTabBtn, activeTab === 'settings' && styles.drawerTabActive]}
              onPress={() => setActiveTab('settings')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.drawerTabText,
                  activeTab === 'settings' && styles.drawerTabTextActive,
                ]}
              >
                Smart Settings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Body Content ScrollView */}
          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {activeTab === 'alerts' ? (
              notifications.map((item) => {
                const catStyle = getCategoryStyles(item.category);

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.rowItem,
                      item.unread ? styles.rowItemUnread : styles.rowItemRead,
                    ]}
                  >
                    <View style={[styles.avatarWrap, { backgroundColor: catStyle.bg }]}>
                      {catStyle.icon}
                      {item.unread && <View style={styles.unreadDot} />}
                    </View>

                    <View style={styles.rowContent}>
                      <View style={styles.rowTitleHeader}>
                        <Text style={styles.rowTitleText} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.rowTimeText}>{item.timestamp}</Text>
                      </View>

                      <Text style={styles.rowMessageText}>{item.message}</Text>

                      {item.actionText && (
                        <View style={styles.actionBtnRow}>
                          <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => {
                              onClose();
                              if (onNavigateMealLog) onNavigateMealLog();
                            }}
                          >
                            <Text style={styles.actionBtnText}>{item.actionText} →</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })
            ) : (
              <>
                <View style={styles.settingCardRow}>
                  <View style={styles.settingIconWrap}>
                    <IconScale size={16} color="#1B432C" />
                  </View>
                  <View style={styles.settingTextWrap}>
                    <Text style={styles.settingTitleText}>Morning Weigh-in</Text>
                    <Text style={styles.settingSubText}>07:30 AM check-in prompt</Text>
                  </View>
                  <Switch
                    value={weightReminder}
                    onValueChange={setWeightReminder}
                    trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingCardRow}>
                  <View style={styles.settingIconWrap}>
                    <IconSparkles size={16} color="#1B432C" />
                  </View>
                  <View style={styles.settingTextWrap}>
                    <Text style={styles.settingTitleText}>Meal Photo Prompts</Text>
                    <Text style={styles.settingSubText}>Breakfast, Lunch & Dinner</Text>
                  </View>
                  <Switch
                    value={mealReminder}
                    onValueChange={setMealReminder}
                    trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingCardRow}>
                  <View style={styles.settingIconWrap}>
                    <IconTarget size={16} color="#1B432C" />
                  </View>
                  <View style={styles.settingTextWrap}>
                    <Text style={styles.settingTitleText}>Evening Health Summary</Text>
                    <Text style={styles.settingSubText}>09:00 PM Daily Scorecard</Text>
                  </View>
                  <Switch
                    value={summaryReminder}
                    onValueChange={setSummaryReminder}
                    trackColor={{ false: '#CBD5E1', true: '#10B981' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </>
            )}
          </ScrollView>

          {/* Footer Close Bar */}
          <TouchableOpacity style={styles.footerLinkBar} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.footerLinkText}>Close Drawer</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
};

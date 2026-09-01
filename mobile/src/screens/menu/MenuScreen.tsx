import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { SquiLogo } from '../../components/common/SquiLogo';
import {
  IconTarget,
  IconDroplet,
  IconScale,
  IconBell,
  IconMoon,
  IconBookLearn,
  IconSparkles,
  IconHelpCircle,
  IconMessageSquare,
  IconBug,
  IconShieldCheck,
  IconLogout,
  IconChevronRight,
  IconEdit,
  IconGoogle,
  IconApple,
  IconFacebook,
  IconMailCheck,
  IconCameraSmall,
} from '../../components/common/Icons';
import { NotificationPopoverDrawer } from '../../components/common/NotificationPopoverDrawer';
import { styles } from './Menu.styles';

export const MenuScreen: React.FC = () => {
  // User Profile State
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@squi.app');
  const [currentWeight, setCurrentWeight] = useState('68.2');
  const [targetWeight, setTargetWeight] = useState('65.0');
  const [authProvider, setAuthProvider] = useState<'google' | 'apple' | 'facebook' | 'email'>('google');

  // Nutrition Limits State
  const [targetSugar, setTargetSugar] = useState('25');
  const [targetSodium, setTargetSodium] = useState('2000');
  const [targetWater, setTargetWater] = useState('2500');

  // Reminders State
  const [weightReminder, setWeightReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);
  const [summaryReminder, setSummaryReminder] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  // Modals Active State
  const [activeModal, setActiveModal] = useState<
    'profile' | 'nutrition' | 'hydration' | 'weight' | 'reminders' | 'faqs' | 'feedback' | 'philosophy' | null
  >(null);

  // Feedback form state
  const [feedbackText, setFeedbackText] = useState('');

  // Knowledge Hub selected article
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number | null>(null);

  const renderAuthIcon = () => {
    switch (authProvider) {
      case 'google':
        return <IconGoogle size={12} />;
      case 'apple':
        return <IconApple size={12} color="#0F2418" />;
      case 'facebook':
        return <IconFacebook size={12} />;
      case 'email':
      default:
        return null; // Clean text when registered directly via email
    }
  };

  const articles = [
    {
      title: 'Understanding Natural vs. Added Sugars',
      time: '3 min read',
      tag: 'Sugar Science',
      body: 'Added sugars cause sharp glycemic spikes without nutrient value. SQUI recommends maintaining added sugars below 25g daily while continuing to enjoy fiber-rich whole fruits and berries.',
    },
    {
      title: 'The Sodium Equation & Kidney Health',
      time: '4 min read',
      tag: 'Sodium Balance',
      body: 'Excess sodium retains water in the bloodstream, raising vascular pressure. If you have a higher-sodium meal, balance it with ample hydration (2.5L) and potassium-rich avocados or leafy greens.',
    },
    {
      title: 'The SQUI Mindset: Awareness Over Restriction',
      time: '2 min read',
      tag: 'Habit Mastery',
      body: 'Like a mindful squirrel planning ahead for the winter, sustainable health comes from consistency and balance rather than guilt or crash dieting. Log mindfully, learn daily!',
    },
  ];

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to sign out of your SQUI account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => Alert.alert('Logged Out', 'You have been signed out. See you soon! 🌿'),
      },
    ]);
  };

  const handleSaveProfile = () => {
    setActiveModal(null);
    Alert.alert('Profile Updated', 'Your profile details have been saved successfully! 🌿');
  };

  const handleSaveNutrition = () => {
    setActiveModal(null);
    Alert.alert('Targets Updated', 'Your daily nutrition caps and hydration goal have been updated! 🌿');
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      Alert.alert('Feedback Empty', 'Please enter a few words before submitting.');
      return;
    }
    setActiveModal(null);
    setFeedbackText('');
    Alert.alert('Thank You!', 'Your feedback helps make SQUI even better for everyone! 🐿️');
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Profile Hero Section (Enclosed Card Container aligned with SQUI Branding) */}
        <View style={styles.profileHeroCard}>
          <View style={styles.profileHorizontalRow}>
            {/* Left: Circular Avatar (Enlarged) with camera badge */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarRing}>
                <SquiLogo size={80} variant="circle" />
              </View>
              <TouchableOpacity
                style={styles.cameraBadge}
                activeOpacity={0.8}
                onPress={() => setActiveModal('profile')}
              >
                <IconCameraSmall size={13} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Middle: Info Column */}
            <View style={styles.profileInfoCol}>
              <Text style={styles.userName}>{fullName}</Text>

              {/* Email Row with connected Third-Party Provider Icon on the left */}
              <View style={styles.emailRow}>
                {renderAuthIcon()}
                <Text style={styles.userEmail}>{email}</Text>
              </View>

              {/* Journey & Goal Milestone Tags */}
              <View style={styles.pillRow}>
                <View style={styles.journeyPill}>
                  <Text style={styles.journeyPillText}>Active Journey</Text>
                </View>
                <View style={styles.goalPill}>
                  <Text style={styles.goalPillText}>Goal: {targetWeight} kg</Text>
                </View>
              </View>
            </View>

            {/* Right: Top-Right Edit Profile Icon Button */}
            <TouchableOpacity
              style={styles.editProfileIconButton}
              activeOpacity={0.7}
              onPress={() => setActiveModal('profile')}
            >
              <IconEdit size={16} color="#1B432C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. GENERAL / HEALTH TARGETS SECTION */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>General & Health Goals</Text>
          <View style={styles.frameCard}>
            {/* Nutrition Caps Row */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('nutrition')}
            >
              <View style={styles.iconSquircle}>
                <IconTarget size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Nutrition Caps & Limits</Text>
                <Text style={styles.menuItemSub}>
                  Sugar: {targetSugar}g cap • Sodium: {targetSodium}mg cap
                </Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            {/* Hydration Goal Row */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('hydration')}
            >
              <View style={styles.iconSquircle}>
                <IconDroplet size={19} color="#2D6A4F" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Daily Hydration Target</Text>
                <Text style={styles.menuItemSub}>{targetWater} ml daily water goal</Text>
              </View>
              <View style={styles.rightMeta}>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{targetWater} ml</Text>
                </View>
                <IconChevronRight size={17} color="#849C8D" />
              </View>
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            {/* Weight Journey Row */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('weight')}
            >
              <View style={styles.iconSquircle}>
                <IconScale size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Weight & Body Journey</Text>
                <Text style={styles.menuItemSub}>
                  Current: {currentWeight} kg → Target: {targetWeight} kg
                </Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. PREFERENCES & HABITS SECTION */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Preferences & Habits</Text>
          <View style={styles.frameCard}>
            {/* Smart Reminders */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('reminders')}
            >
              <View style={styles.iconSquircle}>
                <IconBell size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Smart Reminders</Text>
                <Text style={styles.menuItemSub}>
                  {[weightReminder, mealReminder, summaryReminder].filter(Boolean).length} Active prompts
                </Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            {/* Display & Zen Theme */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  'Theme Settings',
                  'SQUI Zen Theme is active. Light and dark modes automatically match your device aesthetic.'
                )
              }
            >
              <View style={styles.iconSquircle}>
                <IconMoon size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Appearance & Theme</Text>
                <Text style={styles.menuItemSub}>SQUI Emerald Zen (System Auto)</Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            {/* Biometric Security */}
            <View style={styles.menuItemRow}>
              <View style={styles.iconSquircle}>
                <IconShieldCheck size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Biometric & PIN Lock</Text>
                <Text style={styles.menuItemSub}>Protect meal journal privacy</Text>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
                trackColor={{ false: '#CBD5E1', true: '#1B432C' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* 4. LEARNING & SQUI PHILOSOPHY */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Learning & SQUI Mindset</Text>
          <View style={styles.frameCard}>
            {/* Knowledge Hub */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('faqs')}
            >
              <View style={styles.iconSquircle}>
                <IconBookLearn size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Health Knowledge Hub</Text>
                <Text style={styles.menuItemSub}>Sugar science, kidney health, habit guides</Text>
              </View>
              <View style={styles.rightMeta}>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>3 Guides</Text>
                </View>
                <IconChevronRight size={17} color="#849C8D" />
              </View>
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            {/* SQUI Mascot & Motto */}
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('philosophy')}
            >
              <View style={[styles.iconSquircle, styles.iconSquircleWarm]}>
                <IconSparkles size={19} color="#D4A373" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>The SQUI Mindset</Text>
                <Text style={styles.menuItemSub}>Core values and philosophy</Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. HELP CENTER & FEEDBACK */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Help Center & Support</Text>
          <View style={styles.frameCard}>
            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('faqs')}
            >
              <View style={styles.iconSquircle}>
                <IconHelpCircle size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Need Help & FAQs</Text>
                <Text style={styles.menuItemSub}>Logging questions, health score help</Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => setActiveModal('feedback')}
            >
              <View style={styles.iconSquircle}>
                <IconMessageSquare size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Send Feedback</Text>
                <Text style={styles.menuItemSub}>Share feature requests & ideas</Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>

            <View style={styles.menuItemDivider} />

            <TouchableOpacity
              style={styles.menuItemRow}
              activeOpacity={0.7}
              onPress={() => {
                Alert.alert(
                  'Report a Bug',
                  'Notice something unexpected? Feel free to email support@squi.app with screenshot details.'
                );
              }}
            >
              <View style={styles.iconSquircle}>
                <IconBug size={19} color="#1B432C" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Report a Bug</Text>
                <Text style={styles.menuItemSub}>Direct developer diagnostic log</Text>
              </View>
              <IconChevronRight size={17} color="#849C8D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. SQUI Philosophy Banner */}
        <View style={styles.philosophyBanner}>
          <View style={styles.philosophyHeaderRow}>
            <IconSparkles size={14} color="#D4A373" />
            <Text style={styles.philosophyTag}>The SQUI Principle</Text>
          </View>
          <Text style={styles.philosophyQuote}>
            "Awareness over restriction. Progress over perfection. Education over judgment."
          </Text>
        </View>

        {/* 7. Prominent Log Out Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <IconLogout size={18} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <Text style={styles.versionText}>SQUI v1.0.4 • Mindful Wellness Companion</Text>
      </ScrollView>

      {/* ========================================================================= */}
      {/* MODAL 1: Edit Profile */}
      {/* ========================================================================= */}
      <Modal
        visible={activeModal === 'profile'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your Name"
              />

              <Text style={styles.fieldLabel}>Email Address</Text>
              <TextInput
                style={[styles.fieldInput, styles.fieldInputDisabled]}
                value={email}
                editable={false}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Text style={[styles.fieldNote, { marginTop: -4, marginBottom: 8 }]}>
                Email address is tied to your active login and cannot be modified.
              </Text>

              <Text style={styles.fieldLabel}>Current Weight (kg)</Text>
              <TextInput
                style={styles.fieldInput}
                value={currentWeight}
                onChangeText={setCurrentWeight}
                keyboardType="numeric"
              />

              <Text style={styles.fieldLabel}>Goal Target Weight (kg)</Text>
              <TextInput
                style={styles.fieldInput}
                value={targetWeight}
                onChangeText={setTargetWeight}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.modalActionBtn} onPress={handleSaveProfile}>
                <Text style={styles.modalActionBtnText}>Save Profile Details</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 2: Nutrition Targets */}
      {/* ========================================================================= */}
      <Modal
        visible={activeModal === 'nutrition' || activeModal === 'hydration' || activeModal === 'weight'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Nutrition & Health Limits</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.fieldLabel}>Daily Added Sugar Cap (g)</Text>
              <TextInput
                style={styles.fieldInput}
                value={targetSugar}
                onChangeText={setTargetSugar}
                keyboardType="numeric"
              />
              <Text style={styles.fieldNote}>
                WHO recommends maintaining under 25g daily for optimum metabolic balance.
              </Text>

              <Text style={styles.fieldLabel}>Daily Sodium Cap (mg)</Text>
              <TextInput
                style={styles.fieldInput}
                value={targetSodium}
                onChangeText={setTargetSodium}
                keyboardType="numeric"
              />
              <Text style={styles.fieldNote}>
                AHA recommends ~2,000mg to protect blood pressure and kidney wellness.
              </Text>

              <Text style={styles.fieldLabel}>Daily Hydration Target (ml)</Text>
              <TextInput
                style={styles.fieldInput}
                value={targetWater}
                onChangeText={setTargetWater}
                keyboardType="numeric"
              />
              <Text style={styles.fieldNote}>
                Standard goal is 2,500ml (approx. 8–10 glasses).
              </Text>

              <TouchableOpacity style={styles.modalActionBtn} onPress={handleSaveNutrition}>
                <Text style={styles.modalActionBtnText}>Update Targets</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 3: Smart Reminders & Glassy Notification Popover Drawer */}
      {/* ========================================================================= */}
      <NotificationPopoverDrawer
        visible={activeModal === 'reminders'}
        onClose={() => setActiveModal(null)}
        unreadCount={3}
      />

      {/* ========================================================================= */}
      {/* MODAL 4: FAQs & Knowledge Articles */}
      {/* ========================================================================= */}
      <Modal
        visible={activeModal === 'faqs'}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setSelectedArticleIndex(null);
          setActiveModal(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>
                {selectedArticleIndex !== null ? 'Guide' : 'Knowledge & FAQs'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (selectedArticleIndex !== null) {
                    setSelectedArticleIndex(null);
                  } else {
                    setActiveModal(null);
                  }
                }}
              >
                <Text style={styles.modalCloseText}>
                  {selectedArticleIndex !== null ? 'Back' : 'Done'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {selectedArticleIndex !== null ? (
                <View>
                  <Text style={[styles.modalTitle, { fontSize: 16, marginBottom: 4 }]}>
                    {articles[selectedArticleIndex].title}
                  </Text>
                  <Text style={[styles.fieldNote, { color: '#2D6A4F', fontWeight: '700' }]}>
                    {articles[selectedArticleIndex].tag} • {articles[selectedArticleIndex].time}
                  </Text>
                  <Text style={[styles.faqAnswer, { fontSize: 13, lineHeight: 20, marginTop: 8 }]}>
                    {articles[selectedArticleIndex].body}
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={[styles.sectionTitle, { marginLeft: 0 }]}>Evidence Guides</Text>
                  {articles.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.faqCard}
                      activeOpacity={0.7}
                      onPress={() => setSelectedArticleIndex(idx)}
                    >
                      <Text style={styles.faqQuestion}>{item.title}</Text>
                      <Text style={styles.fieldNote}>
                        {item.tag} • {item.time} → Tap to read
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <Text style={[styles.sectionTitle, { marginLeft: 0, marginTop: 12 }]}>
                    Frequently Asked Questions
                  </Text>
                  <View style={styles.faqCard}>
                    <Text style={styles.faqQuestion}>How is my Daily Health Score calculated?</Text>
                    <Text style={styles.faqAnswer}>
                      Your score (0–100) balances your daily hydration (20%), staying within sugar limits (30%), maintaining healthy sodium levels (30%), and logging consistency (20%).
                    </Text>
                  </View>

                  <View style={styles.faqCard}>
                    <Text style={styles.faqQuestion}>Can I edit my logged meals?</Text>
                    <Text style={styles.faqAnswer}>
                      Yes, tap any meal entry on your 'Today' dashboard or Trends page to adjust portions or update notes.
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 5: Send Feedback */}
      {/* ========================================================================= */}
      <Modal
        visible={activeModal === 'feedback'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Send SQUI Feedback</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.fieldLabel}>What would make SQUI even better for you?</Text>
              <TextInput
                style={[styles.fieldInput, { height: 100, textAlignVertical: 'top' }]}
                value={feedbackText}
                onChangeText={setFeedbackText}
                placeholder="Share your thoughts, feature requests, or suggestions..."
                multiline
                numberOfLines={4}
              />
              <Text style={styles.fieldNote}>
                We read every piece of feedback to craft the most supportive mindful wellness companion.
              </Text>

              <TouchableOpacity style={styles.modalActionBtn} onPress={handleSubmitFeedback}>
                <Text style={styles.modalActionBtnText}>Submit Feedback</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 6: SQUI Philosophy */}
      {/* ========================================================================= */}
      <Modal
        visible={activeModal === 'philosophy'}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>The SQUI Mindset</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={[styles.philosophyBanner, { marginBottom: 16 }]}>
                <Text style={styles.philosophyTag}>Our Guiding Belief</Text>
                <Text style={[styles.philosophyQuote, { fontSize: 13.5, marginTop: 4 }]}>
                  "Awareness over restriction. Progress over perfection. Education over judgment."
                </Text>
              </View>

              <Text style={[styles.faqQuestion, { fontSize: 14 }]}>Why the Squirrel Mascot?</Text>
              <Text style={[styles.faqAnswer, { fontSize: 12.5, lineHeight: 18, marginBottom: 14 }]}>
                Squirrels represent the art of preparation, mindfulness, and balance. Instead of living in extremes, they take small, consistent daily actions to thrive in all seasons. SQUI brings that same calm foresight to your nutrition.
              </Text>

              <Text style={[styles.faqQuestion, { fontSize: 14 }]}>No Judgment, Only Growth</Text>
              <Text style={[styles.faqAnswer, { fontSize: 12.5, lineHeight: 18 }]}>
                We believe guilt is the enemy of sustainable habits. If a meal exceeds sodium or sugar, SQUI offers gentle balance tips for the next day, keeping you energized and empowered.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

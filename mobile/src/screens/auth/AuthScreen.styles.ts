import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFBF7', // SQUI Soft Oatmeal / Cream background
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  // Animated Header Logo Section (Transition from Splash)
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  mascotBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.12)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  brandTitle: {
    fontFamily: 'Nunito_900Black',
    fontSize: 34,
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  brandTagline: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },

  // Floating Segmented Mode Switcher (Log In vs Register)
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F3EC',
    borderRadius: 16,
    padding: 5,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.08)',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: COLORS.primary,
  },

  // Direct Phone Frame Layout (No Box Container)
  formContainer: {
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13.5,
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  eyeButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  eyeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: COLORS.primaryMedium,
  },

  // Recovery Links Row (Forgot Username & Forgot Password)
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -2,
    paddingHorizontal: 2,
  },
  linkText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: COLORS.primaryMedium,
  },

  // Main Primary Button
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },

  // Divider Line ("OR")
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(27, 67, 44, 0.12)',
  },
  dividerText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: COLORS.textMuted,
    marginHorizontal: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // Google Sign In Button
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  googleIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIconText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 14,
  },
  googleButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
    color: '#202124',
  },

  // Error Message Display
  errorContainer: {
    backgroundColor: COLORS.exceededLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(197, 48, 48, 0.25)',
  },
  errorText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13.5,
    color: COLORS.exceeded,
    textAlign: 'center',
  },

  // SQUI Mascot Mindful Banner
  mascotNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentGoldLight,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 163, 115, 0.35)',
  },
  mascotIconWrapper: {
    marginRight: 12,
  },
  mascotNoteText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12.5,
    color: '#7C4A03',
    lineHeight: 17,
  },

  // Recovery Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 36, 24, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 21,
    color: COLORS.primary,
  },
  modalCloseText: {
    fontSize: 22,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    padding: 4,
  },
  modalDescription: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13.5,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 18,
  },
  modalSuccessBox: {
    backgroundColor: COLORS.safeLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.25)',
  },
  modalSuccessText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13.5,
    color: COLORS.safe,
    textAlign: 'center',
  },
});

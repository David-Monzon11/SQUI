import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  // Mascot & Header
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mascotBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.15)',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  brandTitle: {
    fontFamily: 'Nunito_900Black',
    fontSize: 32,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  brandTagline: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  // Card Container
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    shadowColor: '#0F2418',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  // Segmented Mode Switcher (Log In vs Register)
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
  // Google Button
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  googleIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  googleIconText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 13,
  },
  googleButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#3C4043',
  },
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: COLORS.textMuted,
    marginHorizontal: 12,
    textTransform: 'uppercase',
  },
  // Form Fields
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FBF9',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primaryMedium,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 6,
  },
  eyeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  // Links Section (Forgot Password & Forgot Username)
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -4,
  },
  linkText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: COLORS.primaryMedium,
  },
  // Submit Button
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  // Error / Success Text
  errorContainer: {
    backgroundColor: COLORS.exceededLight,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(197, 48, 48, 0.2)',
  },
  errorText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: COLORS.exceeded,
    textAlign: 'center',
  },
  // Mascot Encouragement Note
  mascotNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentGoldLight,
    borderRadius: 14,
    padding: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 163, 115, 0.3)',
  },
  mascotIconWrapper: {
    marginRight: 10,
  },
  mascotNoteText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: '#7C4A03',
    lineHeight: 16,
  },
  // Recovery Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 36, 24, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
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
    fontSize: 20,
    color: COLORS.primary,
  },
  modalCloseText: {
    fontSize: 20,
    color: COLORS.textMuted,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  modalSuccessBox: {
    backgroundColor: COLORS.safeLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.2)',
  },
  modalSuccessText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: COLORS.safe,
    textAlign: 'center',
  },
});

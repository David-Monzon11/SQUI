import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 36,
  },

  // ─── Ambient Organic Blurred Blobs ──────────────────────────────────────────
  ambientBlob: {
    position: 'absolute',
    borderRadius: 999,
  },
  ambientBlobTopRight: {
    top: -40,
    right: -50,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  ambientBlobMidLeft: {
    top: 220,
    left: -70,
    width: 220,
    height: 220,
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
  },
  ambientBlobBottomRight: {
    bottom: 20,
    right: -40,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(45, 106, 79, 0.05)',
  },

  // ─── Animated Header Logo Section (Prominently featuring official SQUI Logo) ─
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 6,
  },
  logoAuraRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.22)',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6,
  },
  logoInnerBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  // Legacy mascotBadge kept for compatibility
  mascotBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  brandTitle: {
    fontFamily: 'Nunito_900Black',
    fontSize: 34,
    color: '#1B432C',
    letterSpacing: 2,
    marginTop: 10,
  },
  brandTaglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 106, 79, 0.07)',
    paddingHorizontal: 12,
    paddingVertical: 4.5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.12)',
    marginTop: 5,
    gap: 5,
  },
  brandTaglineIcon: {
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTagline: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: '#2D6A4F',
    letterSpacing: 0.3,
  },

  // ─── Elevated Glassmorphic Card Container ──────────────────────────────────
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.07)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 22,
    elevation: 5,
  },
  formContainer: {
    width: '100%',
  },

  // ─── Floating Segmented Tab Switcher (Log In vs Register) ───────────────────
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEF6F1',
    borderRadius: 15,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.06)',
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabSlidingPill: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 1,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#658071',
  },
  tabTextActive: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#1B432C',
  },

  // ─── Input Fields System ───────────────────────────────────────────────────
  formRow: {
    flexDirection: 'row',
    gap: 10,
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
    color: '#1F382A',
    marginBottom: 7,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FBF9',
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.10)',
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 52,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  inputIconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14.5,
    color: '#0F2418',
    paddingVertical: 0,
  },
  eyeButton: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 18,
  },
  eyeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: '#2D6A4F',
  },

  // ─── Password Strength & Validation ────────────────────────────────────────
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  strengthLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11.5,
    minWidth: 44,
    textAlign: 'right',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 5,
    marginLeft: 2,
  },
  matchLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
  },

  // ─── Recovery Links (Forgot Username & Forgot Password) ────────────────────
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -2,
    paddingHorizontal: 2,
  },
  linkText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12.5,
    color: '#2D6A4F',
  },

  // ─── Primary Submit Button ─────────────────────────────────────────────────
  submitButtonGradient: {
    borderRadius: 16,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
  },
  submitButton: {
    borderRadius: 16,
    height: 54,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    opacity: 0.65,
  },
  submitButtonText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15.5,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },

  // ─── Divider Line ──────────────────────────────────────────────────────────
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(27, 67, 44, 0.10)',
  },
  dividerText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: '#7D9686',
    marginHorizontal: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // ─── Google Sign-In Button ─────────────────────────────────────────────────
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 4,
  },
  googleIconWrapper: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconG: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 14,
  },
  googleIconText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 14,
  },
  googleButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14.5,
    color: '#24292E',
  },

  // ─── Error Notification Box with Shake Animation ───────────────────────────
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 13,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  errorIcon: {
    fontSize: 16,
  },
  errorText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: '#B91C1C',
    lineHeight: 18,
  },

  // ─── SQUI Mascot Mindful Banner ────────────────────────────────────────────
  mascotNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5ED',
    borderRadius: 16,
    padding: 13,
    marginTop: 18,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.2)',
  },
  mascotAvatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.25)',
    overflow: 'hidden',
  },
  mascotAvatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  mascotIconWrapper: {
    marginRight: 10,
  },
  mascotNoteText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: '#7C4A03',
    lineHeight: 17,
  },

  // ─── Recovery Modal Styles ─────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 36, 24, 0.60)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 390,
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
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    color: '#1B432C',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F6F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#658071',
    fontWeight: '700',
  },
  modalDescription: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: '#4A6354',
    lineHeight: 19,
    marginBottom: 16,
  },
  modalSuccessBox: {
    backgroundColor: '#E8F5EC',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.25)',
  },
  modalSuccessText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: '#2D6A4F',
    textAlign: 'center',
    lineHeight: 18,
  },
});

import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const notificationPopoverStyles = StyleSheet.create({
  // Full-screen transparent backdrop overlay to dismiss when tapping outside
  overlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 36, 24, 0.30)',
    zIndex: 9990,
  },

  // Floating Dropdown Drawer Container (Anchored at top-right below Bell)
  popoverContainer: {
    position: 'absolute',
    top: 60,
    right: 14,
    width: Math.min(SCREEN_WIDTH - 28, 360),
    zIndex: 9999,
  },

  // Top Pointer Notch Triangle Arrow (pointing directly to Bell)
  topPointerNotch: {
    position: 'absolute',
    top: -9,
    right: 18,
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    zIndex: 10000,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  // White Gradient Glass Card Body
  glassCard: {
    borderRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 18,
    maxHeight: 480,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.96)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    elevation: 12,
    overflow: 'hidden',
  },

  // Popover Header Row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(27, 67, 44, 0.08)',
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 18,
    color: '#0F2418',
    marginRight: 8,
    letterSpacing: -0.3,
  },

  // Glossy Emerald Count Pill Badge ("3")
  countPill: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1.2,
    borderColor: '#FFFFFF',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
  },
  countPillText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11.5,
    color: '#FFFFFF',
  },

  markReadBtnText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11.5,
    color: '#10B981',
  },

  // Tab Switcher Bar inside Drawer
  drawerTabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(232, 243, 236, 0.65)',
    borderRadius: 14,
    padding: 3,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  drawerTabBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  drawerTabText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11.5,
    color: '#4A6354',
  },
  drawerTabTextActive: {
    fontFamily: FONTS.roundedBlack,
    color: '#1B432C',
  },

  scrollBody: {
    maxHeight: 320,
  },

  // Notification Row Item inside Drawer
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.90)',
  },
  rowItemUnread: {
    backgroundColor: 'rgba(232, 243, 236, 0.50)',
  },
  rowItemRead: {
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  rowContent: {
    flex: 1,
  },
  rowTitleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  rowTitleText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 13.5,
    color: '#0F2418',
    flex: 1,
    marginRight: 6,
  },
  rowTimeText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 10.5,
    color: '#849C8D',
  },
  rowMessageText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: '#4A6354',
    lineHeight: 16.5,
  },
  actionBtnRow: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  actionBtn: {
    backgroundColor: '#E8F3EC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.12)',
  },
  actionBtnText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#1B432C',
  },

  // Settings Card Item
  settingCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.08)',
  },
  settingIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#E8F3EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  settingTextWrap: {
    flex: 1,
    marginRight: 8,
  },
  settingTitleText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 13,
    color: '#0F2418',
  },
  settingSubText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 10.5,
    color: '#4A6354',
    marginTop: 1,
  },

  // Footer Link Bar
  footerLinkBar: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(27, 67, 44, 0.08)',
    marginTop: 6,
  },
  footerLinkText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12,
    color: '#2D6A4F',
  },
});

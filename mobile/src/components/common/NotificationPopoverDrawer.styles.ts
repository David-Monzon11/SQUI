import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const notificationPopoverStyles = StyleSheet.create({
  // Full-screen transparent backdrop overlay to dismiss when tapping outside
  overlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 36, 24, 0.25)',
    zIndex: 9990,
  },

  // Compact Floating Dropdown Drawer Container (Anchored at top-right below Bell)
  popoverContainer: {
    position: 'absolute',
    top: 54,
    right: 12,
    width: Math.min(SCREEN_WIDTH - 40, 295),
    zIndex: 9999,
  },

  // Top Pointer Notch Triangle Arrow (pointing directly to Bell)
  topPointerNotch: {
    position: 'absolute',
    top: -8,
    right: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    zIndex: 10000,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  // Compact White Gradient Glass Card Body
  glassCard: {
    borderRadius: 20,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 10,
    maxHeight: 340,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.96)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 10,
    overflow: 'hidden',
  },

  // Popover Header Row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(27, 67, 44, 0.08)',
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 15,
    color: '#0F2418',
    marginRight: 6,
    letterSpacing: -0.2,
  },

  // Glossy Emerald Count Pill Badge ("3")
  countPill: {
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 1.5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  countPillText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 10.5,
    color: '#FFFFFF',
  },

  markReadBtnText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#10B981',
  },

  // Tab Switcher Bar inside Drawer
  drawerTabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(232, 243, 236, 0.65)',
    borderRadius: 12,
    padding: 2.5,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  drawerTabBtn: {
    flex: 1,
    paddingVertical: 5.5,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },
  drawerTabText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10.5,
    color: '#4A6354',
  },
  drawerTabTextActive: {
    fontFamily: FONTS.roundedBlack,
    color: '#1B432C',
  },

  scrollBody: {
    maxHeight: 200,
  },

  // Compact Notification Row Item inside Drawer
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 6,
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
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  rowContent: {
    flex: 1,
  },
  rowTitleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  rowTitleText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 12,
    color: '#0F2418',
    flex: 1,
    marginRight: 4,
  },
  rowTimeText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 9.5,
    color: '#849C8D',
  },
  rowMessageText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 10.5,
    color: '#4A6354',
    lineHeight: 14.5,
  },
  actionBtnRow: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  actionBtn: {
    backgroundColor: '#E8F3EC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.12)',
  },
  actionBtnText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10,
    color: '#1B432C',
  },

  // Compact Settings Card Item
  settingCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 9,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.08)',
  },
  settingIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: '#E8F3EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  settingTextWrap: {
    flex: 1,
    marginRight: 6,
  },
  settingTitleText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11.5,
    color: '#0F2418',
  },
  settingSubText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 9.5,
    color: '#4A6354',
    marginTop: 1,
  },

  // Footer Link Bar
  footerLinkBar: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(27, 67, 44, 0.08)',
    marginTop: 4,
  },
  footerLinkText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#2D6A4F',
  },
});

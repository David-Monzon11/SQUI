import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const mascotBannerStyles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  cardGradient: {
    borderRadius: 26,
    padding: 16,
    paddingBottom: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(45, 106, 79, 0.45)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  // Ambient background glow circles
  glowCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
  },
  glowCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 163, 115, 0.08)',
  },

  // Main Card Body Row
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  // Left Content Column
  leftCol: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  companionTag: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 10.5,
    color: '#6EE7B7',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },

  statusTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 18,
    color: '#FFFFFF',
    letterSpacing: -0.4,
    lineHeight: 23,
    marginBottom: 4,
  },
  statusSub: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 11.5,
    color: '#D1FAE5',
    lineHeight: 16,
    marginBottom: 10,
  },

  // Action Button with Gradient
  actionBtnWrap: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 14,
  },
  actionBtnText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11.5,
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },

  // Score Badge in Header Row
  headerScoreBadge: {
    backgroundColor: 'rgba(212, 163, 115, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(212, 163, 115, 0.45)',
    paddingHorizontal: 7,
    paddingVertical: 1.5,
    borderRadius: 8,
    marginLeft: 4,
  },
  headerScoreBadgeText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 9.5,
    color: '#FEF3C7',
  },

  // Right Mascot Area (Lowered to bottom baseline)
  rightMascotCol: {
    width: 115,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    overflow: 'visible',
    marginBottom: -4,
  },

  // Pagination Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1DDD6',
  },
  dotActive: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1B432C',
  },

  // Modal Insights Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 36, 24, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  modalDragHandle: {
    width: 38,
    height: 4,
    backgroundColor: '#D1DDD6',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 19,
    color: '#0F2418',
    letterSpacing: -0.4,
  },
  modalCloseBtn: {
    backgroundColor: '#E8F3EC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  modalCloseText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12.5,
    color: '#1B432C',
  },
  insightCard: {
    backgroundColor: '#F7FAF8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8F3EC',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  insightIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E8F3EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightTitle: {
    fontFamily: FONTS.roundedBold,
    fontSize: 13,
    color: '#0F2418',
    marginBottom: 2,
  },
  insightDesc: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 11.5,
    color: '#4A6354',
  },
});

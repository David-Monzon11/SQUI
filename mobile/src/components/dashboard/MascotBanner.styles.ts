import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = SCREEN_WIDTH - 32;
export const SLIDE_GAP = 12;

export const mascotBannerStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 0,
    gap: SLIDE_GAP,
  },
  cardSlide: {
    width: CARD_WIDTH,
  },
  cardGradient: {
    borderRadius: 24,
    padding: 16,
    paddingVertical: 15,
    borderWidth: 1.5,
    borderColor: 'rgba(52, 211, 153, 0.35)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  // Ambient background glow circles
  glowCircle1: {
    position: 'absolute',
    top: -24,
    right: -24,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  // Left Content Column
  leftCol: {
    flex: 1,
    paddingRight: 4,
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
    letterSpacing: 1.1,
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
    fontSize: 17.5,
    color: '#FFFFFF',
    letterSpacing: -0.4,
    lineHeight: 22,
    marginBottom: 3,
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
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 6.5,
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

  // Right Mascot Area with Dedicated Green Circle Backdrop
  rightMascotCol: {
    width: 94,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mascotCircleContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mascotGlowRing: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1.5,
    borderColor: 'rgba(110, 231, 183, 0.25)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  mascotCircleGradient: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: 'rgba(110, 231, 183, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
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
    width: 20,
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

import { StyleSheet, Dimensions } from 'react-native';
import { FONTS } from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CARD_WIDTH = Math.round(SCREEN_WIDTH - 32);

export const mascotBannerStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
    alignSelf: 'center',
  },
  touchWrap: {
    borderRadius: 26,
    shadowColor: '#0E2E1B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  heroCard: {
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 15,
    minHeight: 142,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    overflow: 'hidden',
    position: 'relative',
  },
  // Ambient Glows
  ambientGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },

  // Main Content Row
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Left Mascot Stage Column
  mascotCol: {
    width: 112,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
  },
  mascotBackdrop: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'rgba(16, 185, 129, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(110, 231, 183, 0.30)',
  },

  // Right Content Column
  rightCol: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  topTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  categoryLabel: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 7,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#34D399',
    marginRight: 4,
  },
  statusBadgeText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 9.5,
    color: '#FFFFFF',
  },

  // Hero Score Row
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 1,
    marginBottom: 4,
  },
  scoreValue: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 32,
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 36,
  },
  scoreMax: {
    fontFamily: FONTS.roundedBold,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.70)',
    marginLeft: 3,
  },
  scoreStatusText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11.5,
    color: '#6EE7B7',
    marginLeft: 8,
  },

  // Keyword Chips Row
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 2,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 7.5,
    paddingVertical: 3,
    borderRadius: 7,
  },
  chipText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10,
    color: '#FFFFFF',
  },

  // Modal Breakdown Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 26, 14, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#0F261A',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(52, 211, 153, 0.35)',
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSub: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 13,
    color: '#A7F3D0',
    textAlign: 'center',
    marginBottom: 18,
  },
  scoreCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  bigScoreNumber: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 48,
    color: '#34D399',
    lineHeight: 52,
  },
  bigScoreLabel: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#ECFDF5',
    letterSpacing: 1,
  },
  pillarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  pillarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pillarTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 14,
    color: '#FFFFFF',
  },
  pillarScore: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 13,
    color: '#34D399',
  },
  pillarDesc: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 16,
  },
  closeBtn: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  closeBtnText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 15,
    color: '#FFFFFF',
  },
});

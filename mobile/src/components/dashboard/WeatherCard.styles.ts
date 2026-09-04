import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants/typography';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 16,
    position: 'relative',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 17,
    color: '#0F2418',
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: '#4A6354',
  },

  // Sculpted Wave Glassmorphic Top Weather Card
  waveCardWrapper: {
    position: 'relative',
    minHeight: 154,
    borderRadius: 24,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
  },

  // Absolute Wave SVG Background
  waveSvgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },

  // Card Content Overlay
  cardContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 154,
    justifyContent: 'space-between',
    zIndex: 3,
  },

  // Top Section: Left Temp + Right 3D Illustration resting in the Wave
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftCol: {
    flex: 1,
    zIndex: 2,
    paddingTop: 2,
  },
  temperatureText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 52,
    color: '#FFFFFF',
    letterSpacing: -2,
    lineHeight: 56,
  },
  highLowText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 1,
    letterSpacing: 0.2,
  },
  locationText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    letterSpacing: -0.2,
  },

  // Creative Weather Status badge & Date Row
  badgeDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  weatherStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    alignSelf: 'flex-start',
  },
  weatherStatusText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 10.5,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  weatherStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38dbff',
    marginRight: 5,
  },
  weatherDatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
  },
  liveClockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
    marginRight: 5,
  },
  weatherDateText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10.5,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  // Right Side 3D Weather Art
  rightCol: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 132,
    height: 112,
    marginTop: -20,
    marginRight: 0,
    zIndex: 5,
  },
  weatherImage: {
    width: 108,
    height: 108,
    resizeMode: 'contain',
  },

  // ↔️ Horizontal Scrollable Strip Container (Flush 100% with Top Card Left & Right Boundaries)
  scrollContainer: {
    marginTop: 14,
    width: '100%',
  },
  scrollContentContainer: {
    paddingLeft: 0, // Leftmost card aligns flush with top card's left edge
    paddingRight: 0, // Rightmost card aligns flush with top card's right edge (Red Line Alignment!)
    paddingTop: 8,
    paddingBottom: 24, // Generous bottom padding for unclipped soft shadows
    flexDirection: 'row',
    gap: 10,
  },

  // 💧 Sculpted Borderless Liquid Glass Subcards
  liquidGlassPillWrapper: {
    width: 88,
    height: 194,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    marginRight: 2,
    position: 'relative',
    overflow: 'hidden',

    // Soft organic ambient shadow without harsh borders
    shadowColor: '#052E16',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  liquidGradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  liquidSvgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  pillContentWrap: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  pillHeader: {
    alignItems: 'center',
  },
  forecastDayText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 14,
    color: '#0F2418',
    letterSpacing: 0.2,
  },
  pillDateBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    marginTop: 2,
  },
  forecastDateSub: {
    fontFamily: FONTS.roundedBold,
    fontSize: 9.5,
    color: '#047857',
    letterSpacing: 0.2,
  },
  forecastIconWrap: {
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    backgroundColor: 'transparent',
    zIndex: 2,
  },

  // Natural 3D Weather Icon Image
  weatherIconImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },

  pillFooter: {
    alignItems: 'center',
    width: '100%',
  },
  chancePill: {
    backgroundColor: 'rgba(16, 185, 129, 0.09)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.22)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginBottom: 4,
  },
  forecastChance: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11,
    color: '#059669',
    letterSpacing: 0.2,
  },
  forecastTemp: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 19.5,
    color: '#0F2418',
    letterSpacing: -0.5,
  },
});

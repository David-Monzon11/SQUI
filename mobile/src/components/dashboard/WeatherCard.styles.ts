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
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4.5,
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
  glassForecastPill: {
    width: 84, // Proportional fixed width
    height: 180, // Generous fixed height
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    
    // Soft Ambient Shadow
    shadowColor: '#051A0E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },

  // Inner Glass Texture Overlay
  glassTextureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(245, 247, 246, 0.40)',
    borderRadius: 28,
    zIndex: 1,
  },

  forecastTime: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 13.5,
    color: '#0F2418',
    letterSpacing: 0.2,
    zIndex: 2,
  },
  forecastDateSub: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10,
    color: '#64748B',
    marginTop: -2,
    letterSpacing: 0.1,
    zIndex: 2,
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

  forecastChance: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 12,
    color: '#059669',
    letterSpacing: 0.2,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  forecastTemp: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 19,
    color: '#0F2418',
    letterSpacing: -0.5,
    zIndex: 2,
  },
});

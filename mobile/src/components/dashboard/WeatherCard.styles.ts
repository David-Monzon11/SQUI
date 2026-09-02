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

  // Sculpted Wave Glassmorphic Card Container
  waveCardWrapper: {
    position: 'relative',
    minHeight: 154,
    borderRadius: 34,
    backgroundColor: 'transparent',
  },

  // Absolute Wave SVG Background
  waveSvgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 34,
  },

  // Card Content Overlay
  cardContent: {
    paddingHorizontal: 16,
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

  // Creative Weather Status badge
  weatherStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  weatherStatusText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  weatherStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38dbff',
    marginRight: 6,
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

  // ↔️ Horizontal Scrollable Strip & Large Proportional Glass Cards (92px Width x 186px Height)
  scrollContainer: {
    marginTop: 16,
    marginHorizontal: -4,
  },
  scrollContentContainer: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    gap: 12, // Generous spacing between thick, large cards
  },
  glassForecastPill: {
    width: 92, // Generous fixed width per card!
    height: 186, // Generous fixed height per card!
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)', // Soft blended rim
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    
    // Deep 3D Directional Ambient Shadow
    shadowColor: '#051A0E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 20,
    elevation: 10,
  },

  // Inner Dark Glass Texture Overlay
  glassTextureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 38, 26, 0.10)',
    borderRadius: 28,
    zIndex: 1,
  },

  forecastTime: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 14,
    color: '#0F2418',
    letterSpacing: 0.2,
    zIndex: 2,
  },
  forecastIconWrap: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 2,
  },

  // Natural 3D Cloud Drop Shadow
  weatherIconImage: {
    resizeMode: 'contain',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
  },

  forecastChance: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 12.5,
    color: '#059669',
    letterSpacing: 0.2,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  forecastTemp: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 20,
    color: '#0F2418',
    letterSpacing: -0.5,
    zIndex: 2,
  },
});

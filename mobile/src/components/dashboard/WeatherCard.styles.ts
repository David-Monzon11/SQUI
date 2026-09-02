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

  // Shared Forecast Strip & Blended Glassmorphic Cards (Soft Rim)
  forecastStrip: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  glassForecastPill: {
    flex: 1,
    height: 148,
    backgroundColor: 'rgba(255, 255, 255, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)', // Soft blended rim (No harsh white outline line!)
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    
    // Deep 3D Directional Ambient Shadow
    shadowColor: '#051A0E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  glassForecastPillActive: {
    backgroundColor: 'rgba(12, 52, 33, 0.96)',
    borderWidth: 1.5,
    borderColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.40,
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
    borderRadius: 24,
    zIndex: 1,
  },
  glassTextureOverlayActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },

  forecastTime: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 13,
    color: '#0F2418',
    letterSpacing: 0.2,
    zIndex: 2,
  },
  forecastTimeActive: {
    color: '#6EE7B7',
  },
  forecastIconWrap: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 2,
  },

  // Natural 3D Cloud Drop Shadow
  weatherIconImage: {
    resizeMode: 'contain',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 7,
  },

  forecastChance: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11.5,
    color: '#059669',
    letterSpacing: 0.2,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  forecastChanceActive: {
    color: '#34D399',
  },
  forecastTemp: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 17,
    color: '#0F2418',
    letterSpacing: -0.3,
    zIndex: 2,
  },
  forecastTempActive: {
    color: '#FFFFFF',
  },
});

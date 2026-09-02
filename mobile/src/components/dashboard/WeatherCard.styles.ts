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
  waveSvgBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 34,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 154,
    justifyContent: 'space-between',
    zIndex: 3,
  },
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

  // ---------------------------------------------------------------------------
  // FORECAST STRIP & SHARED CARD GEOMETRY (Single Source of Truth)
  // ---------------------------------------------------------------------------

  forecastStrip: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8, // Fixed 8px gap between all 5 cards
  },

  // Outer Wrapper controlling equal flex distribution & position context for multi-layer shadows
  cardWrapper: {
    flex: 1,
    height: 144, // Fixed height baseline for 100% top/bottom edge alignment
    position: 'relative',
  },

  // Shadow Layer 1: Tight Contact Shadow directly beneath the card edge
  shadowContact: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    right: 4,
    height: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(9, 36, 21, 0.18)',
    zIndex: 1,
  },

  // Shadow Layer 2: Medium Ambient Directional Shadow extending downward
  shadowAmbient: {
    position: 'absolute',
    top: 6,
    bottom: -6,
    left: 2,
    right: 2,
    borderRadius: 24,
    backgroundColor: 'rgba(9, 36, 21, 0.10)',
    zIndex: 1,
  },
  shadowAmbientActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.28)',
    bottom: -8,
  },

  // Shadow Layer 3: Soft Luminous Far Diffusion Glow around lower edges
  shadowFar: {
    position: 'absolute',
    top: 12,
    bottom: -12,
    left: 0,
    right: 0,
    borderRadius: 24,
    backgroundColor: 'rgba(9, 36, 21, 0.06)',
    zIndex: 0,
  },
  shadowFarActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.20)',
    bottom: -14,
  },

  // BASE CARD COMPONENT: Fixed physical dimensions & glass styling
  glassForecastPill: {
    width: '100%',
    height: 144, // Shared FIXED height for 100% edge alignment
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1.5, // Explicit fixed border width
    borderColor: 'rgba(255, 255, 255, 0.95)', // Luminous rim highlight
    borderRadius: 24, // Explicit fixed border radius
    paddingVertical: 14,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    margin: 0,
  },

  // ACTIVE CARD STYLING: Only changes visual properties (background, border color)
  // ABSOLUTELY NO GEOMETRY OVERRIDES (height, width, padding, margin, or border-width remain untouched)
  glassForecastPillActive: {
    backgroundColor: 'rgba(15, 60, 38, 0.95)',
    borderColor: '#10B981',
  },

  forecastTime: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 13,
    color: '#0F2418',
    letterSpacing: 0.2,
  },
  forecastTimeActive: {
    color: '#6EE7B7',
  },
  forecastIconWrap: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 3D Cloud Depth Shadow
  iconWithDepthContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cloudGroundShadow: {
    position: 'absolute',
    bottom: 1,
    width: 32,
    height: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    transform: [{ scaleX: 1.1 }],
    zIndex: 1,
  },
  weatherIconImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    zIndex: 2,
  },

  forecastChance: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11.5,
    color: '#059669',
    letterSpacing: 0.2,
  },
  forecastChanceActive: {
    color: '#34D399',
  },
  forecastTemp: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 17,
    color: '#0F2418',
    letterSpacing: -0.3,
  },
  forecastTempActive: {
    color: '#FFFFFF',
  },
});

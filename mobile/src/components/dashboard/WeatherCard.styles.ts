import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants/typography';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 10,
    position: 'relative',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 16,
    color: '#0F2418',
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 11.5,
    color: '#4A6354',
  },

  // Sculpted Wave Glassmorphic Card Container
  waveCardWrapper: {
    position: 'relative',
    minHeight: 154,
    borderRadius: 34,
    backgroundColor: 'transparent', // 100% transparent container - no rectangular elevation/shadow box
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
    fontSize: 50,
    color: '#FFFFFF',
    letterSpacing: -2,
    lineHeight: 54,
  },
  highLowText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 1,
    letterSpacing: 0.2,
  },
  locationText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 13.5,
    color: '#FFFFFF',
    marginTop: 3,
    letterSpacing: -0.2,
  },

  // Creative Weather Status badge
  weatherStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    alignSelf: 'flex-start',
    marginTop: 8,
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
    backgroundColor: '#38dbff', // Soft sky blue rain glow dot
    marginRight: 6,
  },

  // Right Side 3D Weather Art nestled in the wave dip
  rightCol: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 132,
    height: 112,
    marginTop: -20, // Sits comfortably in the open air above the sloping wave
    marginRight: 0,
    zIndex: 5,
  },
  weatherImage: {
    width: 105,
    height: 105,
    resizeMode: 'contain',
  },

  // Glassmorphic Hourly Forecast Pill Strip
  forecastStrip: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 7,
  },
  glassForecastPill: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.2,
    borderColor: 'rgba(27, 67, 44, 0.12)',
    borderRadius: 18,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  glassForecastPillActive: {
    backgroundColor: '#0F3C26',
    borderColor: '#10B981',
    borderWidth: 1.5,
  },
  forecastTime: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10,
    color: '#4A6354',
    marginBottom: 3,
  },
  forecastTimeActive: {
    color: '#6EE7B7',
  },
  forecastIconWrap: {
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastChance: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 8.5,
    color: '#059669',
    marginTop: 1,
  },
  forecastChanceActive: {
    color: '#34D399',
  },
  forecastTemp: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 12.5,
    color: '#0F2418',
    marginTop: 2,
  },
  forecastTempActive: {
    color: '#FFFFFF',
  },
});

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

  // Glassmorphic Hourly Forecast Pill Strip (Glassy Frosted Design & Big Uniform 48px Icons)
  forecastStrip: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
  },
  glassForecastPill: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Glassy frosted translucent white
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.90)', // Luminous glass highlight border
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 2,
    minHeight: 136,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  glassForecastPillActive: {
    backgroundColor: 'rgba(15, 60, 38, 0.92)', // Vibrant Emerald Glass Active Card
    borderColor: '#10B981',
    borderWidth: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
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
    width: 48,
    height: 48,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
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

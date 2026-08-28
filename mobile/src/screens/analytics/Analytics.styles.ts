import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

export const analyticsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Clean Pearl Sage #F7FAF8
  },
  container: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 23,
    color: '#0F2418',
    letterSpacing: -0.6,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    color: '#4A6354',
    marginTop: 2,
    letterSpacing: -0.1,
  },
  rangeRow: {
    flexDirection: 'row',
    backgroundColor: '#E8F3EC',
    borderRadius: 16,
    padding: 3.5,
    marginVertical: 12,
  },
  rangeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 13,
  },
  rangeBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  rangeText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#4A6354',
  },
  rangeTextActive: {
    fontFamily: FONTS.displayExtraBold,
    color: '#1B432C',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.08)',
    marginBottom: 14,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  chartTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 13.5,
    color: '#0F2418',
    letterSpacing: -0.2,
  },
  chartBadge: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 10.5,
    color: '#1B432C',
    backgroundColor: '#E8F3EC',
    paddingHorizontal: 8.5,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 8,
    paddingBottom: 4,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barValue: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 10.5,
    color: '#849C8D',
    marginBottom: 4,
  },
  bar: {
    width: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#4A6354',
    marginTop: 6,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 12.5,
    color: '#4A6354',
  },
  streakValue: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 28,
    color: '#1B432C',
    letterSpacing: -0.7,
    marginTop: 2,
  },
  streakSub: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#849C8D',
    marginTop: 2,
  },
  streakIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF2EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

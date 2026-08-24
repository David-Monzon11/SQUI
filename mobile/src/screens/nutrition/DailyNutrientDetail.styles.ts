import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

export const dailyNutrientDetailStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Clean Pearl Sage #F7FAF8
  },
  container: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  title: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 23,
    color: '#0F2418',
    letterSpacing: -0.6,
    lineHeight: 28,
  },
  backBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.1)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1.5,
  },
  backBtnText: {
    fontFamily: FONTS.extraBold,
    fontSize: 12,
    color: '#1B432C',
  },
  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    color: '#4A6354',
    letterSpacing: -0.1,
  },

  // Hero Overview Cards
  nutrientHeroCard: {
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
  nutrientHeroHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 6,
  },
  nutrientHeroTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 14,
    color: '#0F2418',
    letterSpacing: -0.2,
  },
  statusBadge: (status: string) => {
    const base = {
      fontFamily: FONTS.displayExtraBold,
      fontSize: 10.5,
      paddingHorizontal: 8,
      paddingVertical: 2.5,
      borderRadius: 7,
      letterSpacing: 0.2,
      overflow: 'hidden' as const,
    };
    switch (status) {
      case 'SAFE':
        return {
          ...base,
          color: '#1B432C',
          backgroundColor: '#E8F3EC',
        };
      case 'CAUTION':
        return {
          ...base,
          color: '#92400E',
          backgroundColor: '#FEF3C7',
        };
      case 'EXCEEDED':
        return {
          ...base,
          color: '#991B1B',
          backgroundColor: '#FEE2E2',
        };
      default:
        return {
          ...base,
          color: '#4A6354',
          backgroundColor: '#F0F5F2',
        };
    }
  },
  bigValRow: {
    flexDirection: 'row' as const,
    alignItems: 'baseline' as const,
    marginVertical: 4,
  },
  bigVal: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 30,
    color: '#0F2418',
    letterSpacing: -0.8,
  },
  bigValUnit: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#4A6354',
    marginLeft: 4,
  },
  bigValCap: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#849C8D',
    marginLeft: 8,
  },
  trackBg: {
    height: 8,
    backgroundColor: '#EEF2F0',
    borderRadius: 4,
    overflow: 'hidden' as const,
    marginVertical: 10,
  },
  trackFill: (pct: number, color: string) => ({
    width: `${pct}%` as const,
    backgroundColor: color,
    height: '100%' as const,
    borderRadius: 4,
  }),
  heroAdviceText: {
    fontFamily: FONTS.medium,
    fontSize: 12.5,
    color: '#4A6354',
    lineHeight: 18,
    marginTop: 4,
  },

  // Section: Meal-by-Meal Breakdown
  sectionHeader: {
    fontFamily: FONTS.extraBold,
    fontSize: 11,
    color: '#849C8D',
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 4,
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.08)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1.5,
  },
  mealRowTop: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  mealCategory: {
    fontFamily: FONTS.extraBold,
    fontSize: 10,
    color: '#1B432C',
    backgroundColor: '#E8F3EC',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 7,
    letterSpacing: 0.2,
    overflow: 'hidden' as const,
  },
  mealTime: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: '#849C8D',
  },
  mealTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 14,
    color: '#0F2418',
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  dualMeterRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F5F2',
  },
  meterCol: {
    flex: 1,
  },
  meterLabel: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: '#4A6354',
    marginBottom: 2,
  },
  meterVal: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 13.5,
    color: '#0F2418',
  },
  miniBar: (pct: number, color: string) => ({
    height: 6,
    backgroundColor: color,
    width: `${pct}%` as const,
    borderRadius: 3,
    marginTop: 4,
  }),
  miniBarBg: {
    height: 6,
    backgroundColor: '#EEF2F0',
    borderRadius: 3,
    overflow: 'hidden' as const,
    marginTop: 4,
  },
};

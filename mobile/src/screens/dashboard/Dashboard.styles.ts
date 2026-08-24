import { FONTS } from '../../constants/typography';
import { COLORS } from '../../constants/colors';

export const dashboardStyles = {
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Clean Pearl Sage #F7FAF8
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  greetingTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 22,
    color: '#0F2418',
    letterSpacing: -0.5,
    lineHeight: 27,
  },
  greetingSubtitle: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: '#4A6354',
    marginTop: 1,
    letterSpacing: -0.1,
  },

  // Date Navigation Bar
  dateBar: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.08)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  dateArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#E8F3EC',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  dateArrowText: {
    fontFamily: FONTS.roundedBlack,
    color: '#1B432C',
    fontSize: 14,
  },
  dateCenterWrap: {
    alignItems: 'center' as const,
  },
  dateTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 12.5,
    color: '#0F2418',
    letterSpacing: -0.2,
  },
  dateSub: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10.5,
    color: '#2D6A4F',
    marginTop: 0.5,
  },

  // Section Labels (Tightened Spacing)
  sectionLabel: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11,
    color: '#849C8D',
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    marginTop: 8,
    marginBottom: 5,
    marginLeft: 4,
  },

  // Vitals & Nutrients 2-Column Grid (Equal Dimensions & Balanced)
  statsRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'stretch' as const,
    gap: 10,
    marginBottom: 6,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 13,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.08)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between' as const,
    minHeight: 114,
  },
  statTileHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12,
    color: '#4A6354',
    letterSpacing: -0.1,
  },
  statValue: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 24,
    color: '#0F2418',
    letterSpacing: -0.6,
    marginVertical: 1,
  },
  statUnit: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12.5,
    color: '#849C8D',
  },
  statTrend: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10.5,
    color: '#2D6A4F',
    marginTop: 2,
    letterSpacing: 0.1,
  },
  quickWaterBtn: {
    backgroundColor: '#E8F3EC',
    borderRadius: 10,
    paddingVertical: 4.5,
    paddingHorizontal: 8,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginTop: 2,
  },
  quickWaterText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11.5,
    color: '#1B432C',
  },

  // Status Badges & Gauges
  statusBadge: (status: string) => {
    const base = {
      fontFamily: FONTS.roundedBlack,
      fontSize: 9.5,
      paddingHorizontal: 6.5,
      paddingVertical: 2,
      borderRadius: 6,
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
  trackBg: {
    height: 7,
    backgroundColor: '#EEF2F0',
    borderRadius: 4,
    overflow: 'hidden' as const,
    marginTop: 4,
  },
  trackFill: (pct: number, color: string) => ({
    width: `${pct}%` as const,
    backgroundColor: color,
    height: '100%' as const,
    borderRadius: 4,
  }),

  // Visual Food Diary Stream & Cards (Tightened Spacing)
  diarySectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginTop: 8,
    marginBottom: 6,
    marginHorizontal: 4,
  },
  diarySectionTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 11,
    color: '#849C8D',
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  addMealLink: {
    fontFamily: FONTS.roundedBold,
    fontSize: 12,
    color: '#2D6A4F',
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.08)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  mealPhotoWrap: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#E8F3EC',
    marginRight: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: '#D1DDD6',
  },
  mealPhoto: {
    width: 54,
    height: 54,
    borderRadius: 14,
  },
  mealContent: {
    flex: 1,
  },
  mealTopRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 2,
  },
  mealCategoryPill: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 9.5,
    color: '#1B432C',
    backgroundColor: '#E8F3EC',
    paddingHorizontal: 6.5,
    paddingVertical: 2,
    borderRadius: 6,
    letterSpacing: 0.2,
    overflow: 'hidden' as const,
  },
  mealTime: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 10.5,
    color: '#849C8D',
  },
  mealName: {
    fontFamily: FONTS.roundedBold,
    fontSize: 13.5,
    color: '#0F2418',
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  mealMacrosRow: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 5,
    alignItems: 'center' as const,
  },
  macroPill: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#4A6354',
  },
  highSodiumAlertPill: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 9.5,
    color: '#92400E',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    letterSpacing: 0.1,
    overflow: 'hidden' as const,
  },

  // Empty State
  emptyStateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(27, 67, 44, 0.08)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center' as const,
    marginVertical: 6,
  },
  emptyStateTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 15,
    color: '#0F2418',
    marginTop: 6,
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  emptyStateSub: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: '#4A6354',
    textAlign: 'center' as const,
    lineHeight: 16,
    marginBottom: 10,
  },
  emptyStateBtn: {
    backgroundColor: '#1B432C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  emptyStateBtnText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },

  // Weight Logger Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 36, 24, 0.45)',
    justifyContent: 'flex-end' as const,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 24,
  },
  modalTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 18,
    color: '#0F2418',
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  modalSub: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: '#4A6354',
    marginBottom: 14,
  },
  weightInput: {
    fontFamily: FONTS.roundedBlack,
    backgroundColor: '#F7FAF8',
    borderWidth: 1.5,
    borderColor: '#D1DDD6',
    borderRadius: 18,
    padding: 12,
    fontSize: 26,
    color: '#0F2418',
    textAlign: 'center' as const,
    marginBottom: 14,
    letterSpacing: -0.6,
  },
  saveWeightBtn: {
    backgroundColor: '#1B432C',
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center' as const,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveWeightBtnText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  cancelBtn: {
    paddingVertical: 8,
    alignItems: 'center' as const,
    marginTop: 4,
  },
  cancelBtnText: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 12,
    color: '#849C8D',
  },
};

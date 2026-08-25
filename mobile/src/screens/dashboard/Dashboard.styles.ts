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

  // =========================================================================
  // Watermarked Bento Metric Widgets (Soft Slate & Botanical Forest)
  // =========================================================================
  bentoTouchWrap: {
    flex: 1,
    borderRadius: 24,
    shadowColor: '#0E2E1B',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 5,
  },
  bentoCard: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 12,
    minHeight: 146,
    justifyContent: 'flex-start' as const,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  bentoWatermark: {
    position: 'absolute' as const,
    right: -4,
    bottom: -6,
    opacity: 0.16,
  },
  bentoTopRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  bentoIconBadge: (_theme: 'emerald' | 'cyan' | 'amber') => ({
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  }),
  bentoFloatingPlus: (theme: 'emerald' | 'cyan' | 'amber') => {
    let bg = '#10B981';
    let shadow = '#10B981';
    if (theme === 'cyan') {
      bg = '#0284C7';
      shadow = '#0284C7';
    } else if (theme === 'amber') {
      bg = '#F59E0B';
      shadow = '#F59E0B';
    }
    return {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: bg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.30)',
      shadowColor: shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.35,
      shadowRadius: 7,
      elevation: 4,
    };
  },
  bentoPlusText: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 18,
    marginTop: -1,
  },
  bentoContent: {
    marginTop: 10,
    zIndex: 2,
  },
  bentoLabel: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.70)',
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
    marginBottom: 1,
  },
  bentoValueRow: {
    marginTop: 1,
    marginBottom: 0,
  },
  bentoMainValue: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 25,
    color: '#FFFFFF',
    letterSpacing: -0.8,
    lineHeight: 28,
  },
  bentoUnit: {
    fontFamily: FONTS.roundedBold,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.80)',
  },
  bentoSubText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.60)',
    marginTop: 1.5,
  },
  bentoTrackBg: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 2.5,
    overflow: 'hidden' as const,
    marginTop: 6,
    width: '78%' as const,
  },
  bentoTrackFill: (pct: number, color: string) => ({
    width: `${pct}%` as const,
    backgroundColor: color,
    height: '100%' as const,
    borderRadius: 2.5,
  }),

  glassStatusBadge: (status: string) => {
    let border = 'rgba(16, 185, 129, 0.35)';
    if (status === 'CAUTION') {
      border = 'rgba(245, 158, 11, 0.35)';
    } else if (status === 'EXCEEDED') {
      border = 'rgba(239, 68, 68, 0.35)';
    }
    return {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      borderWidth: 1,
      borderColor: border,
      paddingHorizontal: 7.5,
      paddingVertical: 3,
      borderRadius: 7,
    };
  },
  statusGlowDot: (status: string) => {
    let dotColor = '#10B981';
    if (status === 'CAUTION') dotColor = '#F59E0B';
    if (status === 'EXCEEDED') dotColor = '#EF4444';
    return {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: dotColor,
      marginRight: 4,
    };
  },
  statusBadgeText: (status: string) => {
    let textColor = '#6EE7B7';
    if (status === 'CAUTION') textColor = '#FDE68A';
    if (status === 'EXCEEDED') textColor = '#FCA5A5';
    return {
      fontFamily: FONTS.roundedBlack,
      fontSize: 9.5,
      color: textColor,
    };
  },

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

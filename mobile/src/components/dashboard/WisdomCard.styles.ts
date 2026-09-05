import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants/typography';

export const wisdomCardStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mascotIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  cardTitle: {
    fontFamily: FONTS.roundedBlack,
    fontSize: 16,
    color: '#0F2418',
    letterSpacing: 0.2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  streakText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#D97706',
    marginLeft: 4,
  },
  categoryScroll: {
    marginBottom: 14,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
  },
  activeCategoryPill: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  categoryText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#1B432C',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  contentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.12)',
  },
  tipTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tipIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  tipTitle: {
    fontFamily: FONTS.roundedBold,
    fontSize: 14,
    color: '#0F2418',
    flex: 1,
  },
  tipBody: {
    fontFamily: FONTS.sansRegular,
    fontSize: 12.5,
    color: '#334E3E',
    lineHeight: 18,
    marginBottom: 10,
  },
  actionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionText: {
    fontFamily: FONTS.roundedMedium,
    fontSize: 11.5,
    color: '#059669',
    flex: 1,
    marginRight: 8,
  },
  checkBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedCheckBtn: {
    backgroundColor: '#059669',
  },
  checkBtnText: {
    fontFamily: FONTS.roundedBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
});

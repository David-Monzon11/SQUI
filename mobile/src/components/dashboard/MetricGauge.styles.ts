import { FONTS } from '../../constants/typography';

export const metricGaugeStyles = {
  container: {
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  label: {
    fontFamily: FONTS.extraBold,
    fontSize: 12.5,
    color: '#0F2418',
  },
  statusBadge: (status: string) => {
    const base = {
      fontFamily: FONTS.displayExtraBold,
      fontSize: 10,
      paddingHorizontal: 7.5,
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
  valueRow: {
    flexDirection: 'row' as const,
    alignItems: 'baseline' as const,
    marginBottom: 6,
  },
  consumedText: {
    fontFamily: FONTS.displayExtraBold,
    fontSize: 23,
    color: '#0F2418',
    letterSpacing: -0.6,
  },
  unitText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#4A6354',
    marginLeft: 2,
  },
  maxText: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: '#849C8D',
    marginLeft: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#EEF2F0',
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  progressBarFill: (percentage: number, color: string) => ({
    width: `${percentage}%` as const,
    backgroundColor: color,
    height: '100%' as const,
    borderRadius: 4,
  }),
};

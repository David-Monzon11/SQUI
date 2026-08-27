import { StyleSheet } from 'react-native';
import { FONTS } from '../constants/typography';

export const tabNavigatorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF8',
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row' as const,
    position: 'absolute' as const,
    left: 16,
    right: 16,
    backgroundColor: 'transparent',
    borderRadius: 24,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around' as const,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  tabButton: {
    alignItems: 'center' as const,
    flex: 1,
  },
  iconWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },
  iconWrapperActive: {
    backgroundColor: '#E8F3EC',
  },
  tabLabel: {
    fontFamily: FONTS.roundedSemiBold,
    fontSize: 10,
    color: '#849C8D',
    marginTop: 3,
    letterSpacing: -0.1,
  },
  tabLabelActive: {
    fontFamily: FONTS.roundedBold,
    fontSize: 10.5,
    color: '#1B432C',
    marginTop: 3,
    letterSpacing: -0.1,
  },
});

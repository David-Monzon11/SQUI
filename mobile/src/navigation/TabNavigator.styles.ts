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
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(27, 67, 44, 0.06)',
    paddingTop: 8,
    justifyContent: 'space-around',
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButton: {
    alignItems: 'center',
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
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    color: '#849C8D',
    marginTop: 2,
    letterSpacing: -0.1,
  },
  tabLabelActive: {
    fontFamily: FONTS.extraBold,
    color: '#1B432C',
    letterSpacing: -0.1,
  },
});

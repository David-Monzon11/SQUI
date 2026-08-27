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
    backgroundColor: '#EDF2ED',
    borderRadius: 24,
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: 'space-around' as const,
    shadowColor: '#1B432C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(27, 67, 44, 0.06)',
  },
  tabButton: {
    alignItems: 'center' as const,
    flex: 1,
  },
  tabItemContent: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 1,
  },
  iconWrapper: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
});

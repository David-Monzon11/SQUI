import { Platform } from 'react-native';

export const FONTS = {
  // Geometric Base
  regular: Platform.select({
    ios: 'PlusJakartaSans_400Regular',
    android: 'PlusJakartaSans_400Regular',
    default: 'system-ui',
  }),
  medium: Platform.select({
    ios: 'PlusJakartaSans_500Medium',
    android: 'PlusJakartaSans_500Medium',
    default: 'system-ui',
  }),
  semiBold: Platform.select({
    ios: 'PlusJakartaSans_600SemiBold',
    android: 'PlusJakartaSans_600SemiBold',
    default: 'system-ui',
  }),
  bold: Platform.select({
    ios: 'PlusJakartaSans_700Bold',
    android: 'PlusJakartaSans_700Bold',
    default: 'system-ui',
  }),
  extraBold: Platform.select({
    ios: 'PlusJakartaSans_800ExtraBold',
    android: 'PlusJakartaSans_800ExtraBold',
    default: 'system-ui',
  }),

  // True Soft Rounded Glyphs & Numbers (Apple SF Pro Rounded Style)
  roundedSemiBold: Platform.select({
    ios: 'Nunito_600SemiBold',
    android: 'Nunito_600SemiBold',
    default: 'system-ui',
  }),
  roundedBold: Platform.select({
    ios: 'Nunito_700Bold',
    android: 'Nunito_700Bold',
    default: 'system-ui',
  }),
  roundedExtraBold: Platform.select({
    ios: 'Nunito_800ExtraBold',
    android: 'Nunito_800ExtraBold',
    default: 'system-ui',
  }),
  roundedBlack: Platform.select({
    ios: 'Nunito_900Black',
    android: 'Nunito_900Black',
    default: 'system-ui',
  }),

  // Display Weights
  displayBold: Platform.select({
    ios: 'Nunito_800ExtraBold',
    android: 'Nunito_800ExtraBold',
    default: 'system-ui',
  }),
  displayExtraBold: Platform.select({
    ios: 'Nunito_900Black',
    android: 'Nunito_900Black',
    default: 'system-ui',
  }),
};

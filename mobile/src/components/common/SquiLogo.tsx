import React from 'react';
import { Image, View, ViewStyle, ImageStyle, StyleProp } from 'react-native';
import { squiLogoStyles as styles } from './SquiLogo.styles';

interface SquiLogoProps {
  size?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  variant?: 'rounded' | 'circle' | 'squircle';
}

export const SquiLogo: React.FC<SquiLogoProps> = ({
  size = 48,
  borderRadius,
  style,
  imageStyle,
  variant = 'rounded',
}) => {
  const getRadius = () => {
    if (borderRadius !== undefined) return borderRadius;
    if (variant === 'circle') return size / 2;
    if (variant === 'squircle') return Math.round(size * 0.28);
    return Math.round(size * 0.22); // Smooth rounded squircle edges
  };

  const calculatedRadius = getRadius();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: calculatedRadius,
        },
        style,
      ]}
    >
      <Image
        source={require('../../assets/images/MLogo.jpg')}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: calculatedRadius,
          },
          imageStyle,
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

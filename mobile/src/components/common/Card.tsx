import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { cardStyles as styles } from './Card.styles';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'elevated' }) => {
  return (
    <View style={[styles.card, variant === 'glass' && styles.glassCard, style]}>
      {children}
    </View>
  );
};

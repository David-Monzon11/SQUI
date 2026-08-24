import React from 'react';
import { View, Text } from 'react-native';
import { StatusLevel } from '../../types';
import { metricGaugeStyles as styles } from './MetricGauge.styles';

interface MetricGaugeProps {
  label: string;
  consumed: number;
  max: number;
  unit: string;
  status: StatusLevel;
}

export const MetricGauge: React.FC<MetricGaugeProps> = ({
  label,
  consumed,
  max,
  unit,
  status,
}) => {
  const percentage = Math.min(Math.round((consumed / max) * 100), 100);

  const getBarColor = () => {
    switch (status) {
      case 'SAFE':
        return '#2D6A4F';
      case 'CAUTION':
        return '#D97706';
      case 'EXCEEDED':
        return '#C53030';
      default:
        return '#2D6A4F';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.statusBadge(status)}>{status}</Text>
      </View>
      <View style={styles.valueRow}>
        <Text style={styles.consumedText}>
          {consumed} <Text style={styles.unitText}>{unit}</Text>
        </Text>
        <Text style={styles.maxText}>/ {max} {unit} target</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill(percentage, getBarColor())} />
      </View>
    </View>
  );
};

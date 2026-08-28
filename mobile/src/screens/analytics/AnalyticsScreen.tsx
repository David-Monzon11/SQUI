import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IconFlame } from '../../components/common/Icons';
import { analyticsStyles as styles } from './Analytics.styles';

export const AnalyticsScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D'>('7D');

  const sampleSugarData = [
    { day: 'M', val: 18, color: '#2D6A4F' },
    { day: 'T', val: 24, color: '#2D6A4F' },
    { day: 'W', val: 28, color: '#D97706' },
    { day: 'T', val: 16, color: '#2D6A4F' },
    { day: 'F', val: 22, color: '#2D6A4F' },
    { day: 'S', val: 32, color: '#C53030' },
    { day: 'S', val: 14, color: '#2D6A4F' },
  ];

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Progress & Trends</Text>
          <Text style={styles.subtitle}>Consistency over intensity. Look how far you've come!</Text>
        </View>

        {/* Range Selector */}
        <View style={styles.rangeRow}>
          <TouchableOpacity
            style={[styles.rangeBtn, timeRange === '7D' && styles.rangeBtnActive]}
            onPress={() => setTimeRange('7D')}
          >
            <Text style={[styles.rangeText, timeRange === '7D' && styles.rangeTextActive]}>7-Day View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rangeBtn, timeRange === '30D' && styles.rangeBtnActive]}
            onPress={() => setTimeRange('30D')}
          >
            <Text style={[styles.rangeText, timeRange === '30D' && styles.rangeTextActive]}>30-Day Trends</Text>
          </TouchableOpacity>
        </View>

        {/* Sugar Compliance Chart */}
        <View style={styles.card}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Sugar Consumed (Target: ≤25g)</Text>
            <Text style={styles.chartBadge}>85% Balance</Text>
          </View>
          <View style={styles.barContainer}>
            {sampleSugarData.map((item, index) => (
              <View key={index} style={styles.barColumn}>
                <Text style={styles.barValue}>{item.val}g</Text>
                <View style={[styles.bar, { height: item.val * 2.8, backgroundColor: item.color }]} />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Streak Card */}
        <View style={styles.card}>
          <View style={styles.streakRow}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.streakTitle}>Healthy Balance Streak 🔥</Text>
              <Text style={styles.streakValue}>6 Days Active</Text>
              <Text style={styles.streakSub}>You stayed within safe thresholds for 5 consecutive days.</Text>
            </View>
            <View style={styles.streakIconBox}>
              <IconFlame size={22} color="#EA580C" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

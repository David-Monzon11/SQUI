import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  RadialGradient as SvgRadialGradient,
  Stop,
  Rect,
  Ellipse,
  Circle,
} from 'react-native-svg';
import { styles } from './WeatherCard.styles';

interface HourlyItem {
  time: string;
  temp: string;
  chance?: string;
  iconType: 'rain' | 'sun' | 'cloud' | 'moon';
  isActive?: boolean;
}

// Custom 3D Vector Weather Icons (3D Cloud with Rain, 3D Soft Cloud, 3D Glowing Sun, 3D Moon)
const WeatherIcon: React.FC<{ type: 'rain' | 'sun' | 'cloud' | 'moon'; isActive?: boolean }> = ({ type, isActive }) => {
  if (type === 'rain') {
    return (
      <Svg width={28} height={28} viewBox="0 0 32 32">
        <Defs>
          <SvgLinearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isActive ? '#E0F2FE' : '#94A3B8'} />
            <Stop offset="100%" stopColor={isActive ? '#7DD3FC' : '#64748B'} />
          </SvgLinearGradient>
        </Defs>
        {/* Cloud Body */}
        <Path
          d="M 8 20 C 5 20 3 18 3 15 C 3 12.5 5 10.5 7.5 10.2 C 8.5 7 11.5 5 15 5 C 19 5 22 7.5 22.8 11 C 25 11 27 12.8 27 15.5 C 27 18 25 20 22.5 20 Z"
          fill="url(#cloudGrad)"
        />
        {/* Rain Drops */}
        <Path d="M 10 23 L 8.5 27" stroke={isActive ? '#38BDF8' : '#0284C7'} strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M 15 23 L 13.5 27" stroke={isActive ? '#38BDF8' : '#0284C7'} strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M 20 23 L 18.5 27" stroke={isActive ? '#38BDF8' : '#0284C7'} strokeWidth={2.5} strokeLinecap="round" />
      </Svg>
    );
  }

  if (type === 'cloud') {
    return (
      <Svg width={28} height={28} viewBox="0 0 32 32">
        <Defs>
          <SvgLinearGradient id="softCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isActive ? '#FFFFFF' : '#CBD5E1'} />
            <Stop offset="100%" stopColor={isActive ? '#93C5FD' : '#94A3B8'} />
          </SvgLinearGradient>
        </Defs>
        <Path
          d="M 7 21 C 4 21 2 18.8 2 16 C 2 13.4 4 11.2 6.5 10.9 C 7.5 7.5 10.5 5.5 14 5.5 C 18 5.5 21 8 21.8 11.5 C 24 11.5 26 13.3 26 16 C 26 18.8 24 21 21.5 21 Z"
          fill="url(#softCloudGrad)"
        />
      </Svg>
    );
  }

  if (type === 'sun') {
    return (
      <Svg width={28} height={28} viewBox="0 0 32 32">
        <Defs>
          <SvgLinearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FDE047" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </SvgLinearGradient>
        </Defs>
        <Circle cx="16" cy="16" r="8" fill="url(#sunGrad)" />
        {/* Sun Rays */}
        <Path d="M 16 3 L 16 6" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M 16 26 L 16 29" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M 3 16 L 6 16" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M 26 16 L 29 16" stroke="#F59E0B" strokeWidth={2.5} strokeLinecap="round" />
        <Path d="M 7 7 L 9 9" stroke="#F59E0B" strokeWidth={2.2} strokeLinecap="round" />
        <Path d="M 23 23 L 25 25" stroke="#F59E0B" strokeWidth={2.2} strokeLinecap="round" />
        <Path d="M 7 25 L 9 23" stroke="#F59E0B" strokeWidth={2.2} strokeLinecap="round" />
        <Path d="M 23 9 L 25 7" stroke="#F59E0B" strokeWidth={2.2} strokeLinecap="round" />
      </Svg>
    );
  }

  // Moon
  return (
    <Svg width={28} height={28} viewBox="0 0 32 32">
      <Path
        d="M 22 17 C 22 23 17 27 11 27 C 9 27 7.2 26.5 5.5 25.5 C 8.5 28 12.5 29 16.5 28 C 22.5 26.5 26.5 21 25.5 15 C 24.8 11 22 7.8 18 6.5 C 20.5 9.5 22 13 22 17 Z"
        fill={isActive ? '#FDE047' : '#F59E0B'}
      />
    </Svg>
  );
};

export const WeatherCard: React.FC = () => {
  const hourlyForecast: HourlyItem[] = [
    { time: '3 AM', temp: '18°', chance: '40%', iconType: 'rain' },
    { time: '6 AM', temp: '17°', chance: '30%', iconType: 'cloud' },
    { time: '9 AM', temp: '21°', chance: '10%', iconType: 'sun' },
    { time: '12 PM', temp: '24°', chance: '0%', iconType: 'sun', isActive: true },
    { time: '3 PM', temp: '23°', chance: '10%', iconType: 'sun' },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mindful Climate</Text>
        <Text style={styles.sectionSub}>Weather & Hydration Balance</Text>
      </View>

      {/* 🌊 Sculpted Organic Wave Glassmorphic Card (SQUI Forest Emerald System) */}
      <View style={styles.waveCardWrapper}>
        {/* Background SVG with Sculpted Top Wave Dip + Glassmorphic Gradient */}
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 350 235"
          preserveAspectRatio="none"
          style={styles.waveSvgBg}
        >
          <Defs>
            {/* SQUI Signature Bright Nature Emerald Gradient */}
            <SvgLinearGradient id="squiWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#10B981" />
              <Stop offset="50%" stopColor="#059669" />
              <Stop offset="100%" stopColor="#047857" />
            </SvgLinearGradient>

            {/* Ambient Emerald Glass Glow */}
            <SvgLinearGradient id="squiGlassGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
              <Stop offset="100%" stopColor="#34D399" stopOpacity={0.05} />
            </SvgLinearGradient>

            {/* Frosted Wave Rim Highlight */}
            <SvgLinearGradient id="waveRimHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.55} />
              <Stop offset="60%" stopColor="#6EE7B7" stopOpacity={0.7} />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.4} />
            </SvgLinearGradient>

            {/* Luminous 3D Volumetric Sky Background Radial Gradient */}
            <SvgRadialGradient
              id="skyBgGrad"
              cx="80%"
              cy="25%"
              rx="75%"
              ry="75%"
              fx="80%"
              fy="25%"
            >
              <Stop offset="0%" stopColor="#FFFBEB" stopOpacity={0.9} />
              <Stop offset="15%" stopColor="#BAE6FD" stopOpacity={1} />
              <Stop offset="55%" stopColor="#38BDF8" />
              <Stop offset="100%" stopColor="#0369A1" />
            </SvgRadialGradient>
          </Defs>

          {/* 3D Sky Backdrop filling the negative space */}
          <Rect
            x="0"
            y="0"
            width="350"
            height="235"
            rx="34"
            fill="url(#skyBgGrad)"
          />

          {/* Volumetric Cloud Shadow */}
          <Ellipse
            cx="284"
            cy="138"
            rx="64"
            ry="18"
            fill="rgba(3, 37, 56, 0.07)"
          />
          <Ellipse
            cx="284"
            cy="138"
            rx="48"
            ry="14"
            fill="rgba(3, 37, 56, 0.14)"
          />
          <Ellipse
            cx="284"
            cy="138"
            rx="34"
            ry="10"
            fill="rgba(3, 37, 56, 0.22)"
          />

          {/* 🌊 Sculpted Wave Card Body */}
          <Path
            d="M 34 0 L 115 0 C 145 0 170 54 205 104 C 238 156 270 168 310 168 C 334 168 350 180 350 200 L 350 201 C 350 220 334 235 316 235 L 34 235 C 15 235 0 220 0 201 L 0 34 C 0 15 15 0 34 0 Z"
            fill="url(#squiWaveGrad)"
          />

          {/* Glassmorphic Ambient Luminous Overlay */}
          <Path
            d="M 34 0 L 115 0 C 145 0 170 54 205 104 C 238 156 270 168 310 168 C 334 168 350 180 350 200 L 350 201 C 350 220 334 235 316 235 L 34 235 C 15 235 0 220 0 201 L 0 34 C 0 15 15 0 34 0 Z"
            fill="url(#squiGlassGlow)"
          />

          {/* Frosted Glass Perimeter Border with Sculpted Wave Edge */}
          <Path
            d="M 34 0 L 115 0 C 145 0 170 54 205 104 C 238 156 270 168 310 168 C 334 168 350 180 350 200 L 350 201 C 350 220 334 235 316 235 L 34 235 C 15 235 0 220 0 201 L 0 34 C 0 15 15 0 34 0 Z"
            fill="none"
            stroke="url(#waveRimHighlight)"
            strokeWidth={1.5}
          />

          {/* Frosted Outer Card Border */}
          <Rect
            x="0"
            y="0"
            width="350"
            height="235"
            rx="34"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth={1.5}
          />

          {/* Subtle Monoline Ghost Leaves Watermark in Background */}
          <Path
            d="M 28 85 C 45 75 62 82 72 70 M 35 83 Q 50 78 68 72"
            stroke="#FFFFFF"
            strokeWidth={1}
            strokeLinecap="round"
            opacity={0.12}
          />
        </Svg>

        {/* Card Content Stack */}
        <View style={styles.cardContent}>
          {/* Top Row: Temp Info (Left) + 3D Weather Illustration (Right) */}
          <View style={styles.mainRow}>
            {/* Left: Temperature & Location */}
            <View style={styles.leftCol}>
              <Text style={styles.temperatureText}>19°</Text>
              <Text style={styles.highLowText}>H:24°  L:18°</Text>
              <Text style={styles.locationText}>Montreal, Canada</Text>
              
              {/* Creative Weather Status Badge */}
              <View style={styles.weatherStatusBadge}>
                <View style={styles.weatherStatusDot} />
                <Text style={styles.weatherStatusText}>Mid Rain</Text>
              </View>
            </View>

            {/* Right: 3D Weather Art */}
            <View style={styles.rightCol}>
              <Image
                source={require('../../../assets/vecteezy_3d-icon-of-a-sun-behind-a-cloud-partly-cloudy-weather_66228107.png')}
                style={styles.weatherImage}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Taller Glassmorphic Hourly Forecast Cards with 3D Vector Clouds & Bold Fonts */}
      <View style={styles.forecastStrip}>
        {hourlyForecast.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            style={[styles.glassForecastPill, item.isActive && styles.glassForecastPillActive]}
          >
            <Text style={[styles.forecastTime, item.isActive && styles.forecastTimeActive]}>
              {item.time}
            </Text>

            <View style={styles.forecastIconWrap}>
              <WeatherIcon type={item.iconType} isActive={item.isActive} />
            </View>

            {item.chance ? (
              <Text style={[styles.forecastChance, item.isActive && styles.forecastChanceActive]}>
                {item.chance}
              </Text>
            ) : (
              <Text style={[styles.forecastChance, { opacity: 0 }]}>-</Text>
            )}

            <Text style={[styles.forecastTemp, item.isActive && styles.forecastTempActive]}>
              {item.temp}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

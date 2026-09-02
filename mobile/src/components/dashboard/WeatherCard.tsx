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
} from 'react-native-svg';
import { styles } from './WeatherCard.styles';

interface HourlyItem {
  time: string;
  temp: string;
  chance?: string;
  iconType: 'rain' | 'sun' | 'cloud' | 'moon';
  isActive?: boolean;
}

// 3D Weather Icon Component:
// All cloud weather conditions follow the EXACT size, placement, and visual volume of the FIRST card (3 AM).
// Completely eliminates any white margin artifacts and includes a ground shadow for realistic 3D depth.
const WeatherIcon: React.FC<{ type: 'rain' | 'sun' | 'cloud' | 'moon' }> = ({ type }) => {
  let source;
  switch (type) {
    case 'rain':
      // First card (3 AM) 3D gray cloud asset
      source = require('../../../assets/vecteezy_3d-icon-cloudy-day-weather-forecast-illustration-concept_24683592.png');
      break;

    case 'cloud':
      // 6 AM 3D blue cloud asset (matching 3 AM scale)
      source = require('../../../assets/vecteezy_sunny-cloudy-icon-illustration-in-3d-style-glowing-cloudy_23404599.png');
      break;

    case 'moon':
      // 9 AM 3D sun & cloud asset (matching 3 AM scale)
      source = require('../../../assets/vecteezy_bright-3d-sun-and-cloud-icon-perfect-for-weather-summer_68542856.png');
      break;

    case 'sun':
    default:
      // 12 PM / 3 PM 3D glowing sun asset
      source = require('../../../assets/vecteezy_3d-sun-icon_10175838.png');
      break;
  }

  return (
    <View style={styles.iconWithDepthContainer}>
      {/* 3D Volumetric Ground Shadow under the cloud for dramatic depth */}
      <View style={styles.cloudGroundShadow} />

      {/* Clean 3D Asset Image with native drop shadow */}
      <Image source={source} style={styles.weatherIconImage} />
    </View>
  );
};

export const WeatherCard: React.FC = () => {
  const hourlyForecast: HourlyItem[] = [
    { time: '3 AM', temp: '18°', chance: '40%', iconType: 'rain' },
    { time: '6 AM', temp: '17°', chance: '30%', iconType: 'cloud' },
    { time: '9 AM', temp: '21°', chance: '10%', iconType: 'moon' },
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

            {/* Right: 3D Weather Art from Asset */}
            <View style={styles.rightCol}>
              <Image
                source={require('../../../assets/vecteezy_bright-3d-sun-and-cloud-icon-perfect-for-weather-summer_68542856.png')}
                style={styles.weatherImage}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Glassmorphic Frosted Hourly Forecast Cards with Clean 3D Clouds & Depth Shadows */}
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
              <WeatherIcon type={item.iconType} />
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

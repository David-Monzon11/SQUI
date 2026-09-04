import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
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
}

const WeatherIcon: React.FC<{ type: 'rain' | 'sun' | 'cloud' | 'moon' }> = ({ type }) => {
  let source;
  let customStyle = { width: 64, height: 64 };

  switch (type) {
    case 'rain':
      source = require('../../../assets/vecteezy_3d-icon-cloudy-day-weather-forecast-illustration-concept_24683592.png');
      customStyle = { width: 64, height: 64 };
      break;

    case 'cloud':
      source = require('../../../assets/vecteezy_sunny-cloudy-icon-illustration-in-3d-style-glowing-cloudy_23404599.png');
      customStyle = { width: 86, height: 86 };
      break;

    case 'moon':
      source = require('../../../assets/vecteezy_bright-3d-sun-and-cloud-icon-perfect-for-weather-summer_68542856.png');
      customStyle = { width: 84, height: 84 };
      break;

    case 'sun':
    default:
      source = require('../../../assets/vecteezy_3d-sun-icon_10175838.png');
      customStyle = { width: 102, height: 102 };
      break;
  }

  return (
    <View style={styles.forecastIconWrap}>
      <Image
        source={source}
        style={[styles.weatherIconImage, customStyle]}
      />
    </View>
  );
};

export const WeatherCard: React.FC = () => {
  const hourlyForecast: HourlyItem[] = [
    { time: '3 AM', temp: '18°', chance: '40%', iconType: 'rain' },
    { time: '6 AM', temp: '17°', chance: '30%', iconType: 'cloud' },
    { time: '9 AM', temp: '21°', chance: '10%', iconType: 'moon' },
    { time: '12 PM', temp: '24°', chance: '0%', iconType: 'sun' },
    { time: '3 PM', temp: '23°', chance: '10%', iconType: 'sun' },
    { time: '6 PM', temp: '20°', chance: '20%', iconType: 'cloud' },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mindful Climate</Text>
        <Text style={styles.sectionSub}>Weather & Hydration Balance</Text>
      </View>

      {/* 🌊 Sculpted Organic Wave Glassmorphic Card (Seamless Left Edge) */}
      <View style={styles.waveCardWrapper}>
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

          {/* 3D Sky Backdrop with rx="24" Corner Radius (Matches Food Gallery Card) */}
          <Rect
            x="0"
            y="0"
            width="350"
            height="235"
            rx="24"
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

          {/* 🌊 Sculpted Wave Card Body (Bleeds past left/bottom edge to eliminate seams 100%) */}
          <Path
            d="M 24 -2 L 115 -2 C 145 -2 170 54 205 104 C 238 156 270 168 310 168 C 334 168 352 180 352 200 L 352 237 L -2 237 L -2 -2 Z"
            fill="url(#squiWaveGrad)"
          />

          {/* Glassmorphic Ambient Luminous Overlay */}
          <Path
            d="M 24 -2 L 115 -2 C 145 -2 170 54 205 104 C 238 156 270 168 310 168 C 334 168 352 180 352 200 L 352 237 L -2 237 L -2 -2 Z"
            fill="url(#squiGlassGlow)"
          />

          {/* Frosted Wave Rim Highlight (Strokes ONLY the diagonal wave curve, completely avoiding left/bottom edges) */}
          <Path
            d="M 115 0 C 145 0 170 54 205 104 C 238 156 270 168 310 168 C 334 168 350 180 350 200"
            fill="none"
            stroke="url(#waveRimHighlight)"
            strokeWidth={1.5}
          />

          {/* Subtle Outer Card Rim */}
          <Rect
            x="0"
            y="0"
            width="350"
            height="235"
            rx="24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.20)"
            strokeWidth={1}
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

            {/* Right: Original 3D Weather Art from Asset */}
            <View style={styles.rightCol}>
              <Image
                source={require('../../../assets/vecteezy_3d-icon-of-a-sun-behind-a-cloud-partly-cloudy-weather_66228107.png')}
                style={styles.weatherImage}
              />
            </View>
          </View>
        </View>
      </View>

      {/* ↔️ Horizontal Scrollable Forecast Strip (6 Total Hourly Cards) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {hourlyForecast.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            style={styles.glassForecastPill}
          >
            {/* Inner Dark Glass Texture Overlay */}
            <View style={styles.glassTextureOverlay} />

            <Text style={styles.forecastTime}>
              {item.time}
            </Text>

            <WeatherIcon type={item.iconType} />

            {item.chance ? (
              <Text style={styles.forecastChance}>
                {item.chance}
              </Text>
            ) : (
              <Text style={[styles.forecastChance, { opacity: 0 }]}>-</Text>
            )}

            <Text style={styles.forecastTemp}>
              {item.temp}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

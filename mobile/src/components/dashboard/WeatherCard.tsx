import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
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
import { apiClient } from '../../services/apiClient';
import { WeatherData, DailyForecastItem } from '../../types';

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

const getMainWeatherImage = (iconType: 'rain' | 'sun' | 'cloud' | 'moon') => {
  switch (iconType) {
    case 'rain':
      return require('../../../assets/vecteezy_3d-icon-cloudy-day-weather-forecast-illustration-concept_24683592.png');
    case 'sun':
      return require('../../../assets/vecteezy_3d-sun-icon_10175838.png');
    case 'moon':
      return require('../../../assets/vecteezy_bright-3d-sun-and-cloud-icon-perfect-for-weather-summer_68542856.png');
    case 'cloud':
    default:
      return require('../../../assets/vecteezy_3d-icon-of-a-sun-behind-a-cloud-partly-cloudy-weather_66228107.png');
  }
};

const getInitialDateStr = (): string => {
  const now = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}`;
};

const getFormattedCurrentTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${hours}:${minStr}:${secStr} ${ampm}`;
};

const getInitialDailyForecast = (): DailyForecastItem[] => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result: DailyForecastItem[] = [];
  const now = new Date();
  for (let i = 1; i <= 6; i++) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + i);
    result.push({
      day: dayNames[nextDate.getDay()],
      date: `${monthNames[nextDate.getMonth()]} ${nextDate.getDate()}`,
      temp: '28°',
      chance: '20%',
      iconType: i % 2 === 0 ? 'sun' : 'cloud',
    });
  }
  return result;
};

const initialWeather: WeatherData = {
  temperature: 26,
  high: 30,
  low: 23,
  location: 'Local Climate',
  dateStr: getInitialDateStr(),
  statusText: 'Mindful Climate',
  iconType: 'cloud',
  humidity: 65,
  hourly: [],
  dailyForecast: getInitialDailyForecast(),
  hydratingTip: 'Mindful climate active. Stay naturally hydrated at your steady pace today!',
};

export const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>(initialWeather);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>(getFormattedCurrentTime());

  // Real-time ticking clock (updates every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getFormattedCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      let lat: number | undefined = undefined;
      let lon: number | undefined = undefined;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          lat = loc.coords.latitude;
          lon = loc.coords.longitude;
        }
      } catch (locErr) {
        // Handled gracefully: backend / direct client will resolve via HTTPS IP geolocation
        console.log('[WeatherCard] Location permission bypassed, resolving via network IP');
      }

      const data = await apiClient.getWeather(lat, lon);
      if (data && typeof data.temperature === 'number') {
        setWeather((prev) => ({
          ...prev,
          ...data,
          dateStr: data.dateStr || prev.dateStr || getInitialDateStr(),
          dailyForecast:
            data.dailyForecast && data.dailyForecast.length > 0
              ? data.dailyForecast
              : prev.dailyForecast,
        }));
      }
    } catch (err: any) {
      console.warn('[WeatherCard] Live weather fetch error:', err?.message || err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Display daily forecast cards (fallback to initial if empty)
  const displayForecast =
    weather.dailyForecast && weather.dailyForecast.length > 0
      ? weather.dailyForecast
      : getInitialDailyForecast();

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mindful Climate</Text>
        <Text style={styles.sectionSub}>Weather & Hydration Balance</Text>
      </View>

      {/* 🌊 Sculpted Organic Wave Glassmorphic Card (Matching Food Gallery 24px Radius) */}
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

          {/* 🌊 Sculpted Wave Card Body */}
          <Path
            d="M 24 -2 L 115 -2 C 145 -2 170 54 205 104 C 238 156 270 168 310 168 C 334 168 352 180 352 200 L 352 237 L -2 237 L -2 -2 Z"
            fill="url(#squiWaveGrad)"
          />

          {/* Glassmorphic Ambient Luminous Overlay */}
          <Path
            d="M 24 -2 L 115 -2 C 145 -2 170 54 205 104 C 238 156 270 168 310 168 C 334 168 352 180 352 200 L 352 237 L -2 237 L -2 -2 Z"
            fill="url(#squiGlassGlow)"
          />

          {/* Frosted Wave Rim Highlight */}
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
            {/* Left: Temperature, High/Low, Location & Prominent Date */}
            <View style={styles.leftCol}>
              <Text style={styles.temperatureText}>{weather.temperature}°</Text>
              <Text style={styles.highLowText}>
                H:{weather.high}°  L:{weather.low}°
              </Text>
              <Text style={styles.locationText} numberOfLines={1}>
                {weather.location}
              </Text>

              {/* Status Badge & Prominent Date + Real-Time Clock Row */}
              <View style={styles.badgeDateRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={fetchWeather}
                  style={styles.weatherStatusBadge}
                >
                  <View style={styles.weatherStatusDot} />
                  <Text style={styles.weatherStatusText}>{weather.statusText}</Text>
                  {loading && (
                    <ActivityIndicator
                      size="small"
                      color="#FFFFFF"
                      style={{ marginLeft: 5, transform: [{ scale: 0.65 }] }}
                    />
                  )}
                </TouchableOpacity>

                <View style={styles.weatherDatePill}>
                  <View style={styles.liveClockDot} />
                  <Text style={styles.weatherDateText}>
                    {weather.dateStr ? `${weather.dateStr} • ` : ''}{currentTime}
                  </Text>
                </View>
              </View>
            </View>

            {/* Right: Dynamic 3D Weather Art matching real conditions */}
            <View style={styles.rightCol}>
              <Image
                source={getMainWeatherImage(weather.iconType)}
                style={styles.weatherImage}
              />
            </View>
          </View>
        </View>
      </View>

      {/* ↔️ Horizontal Scrollable Strip: 6 Upcoming Days with Liquid Glass Texture */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {displayForecast.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.88}
            style={styles.liquidGlassPillWrapper}
          >
            {/* 💧 Rich Nature Emerald Liquid Glass Gradient (Unmistakable vibrant mint/emerald depth) */}
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.90)',
                '#D1FAE5',
                '#A7F3D0',
                '#6EE7B7',
              ]}
              locations={[0, 0.35, 0.70, 1.0]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.liquidGradientBg}
            />

            {/* 🌊 Liquid Refraction & Prismatic Aquatic Glow */}
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 88 194"
              preserveAspectRatio="none"
              style={styles.liquidSvgOverlay}
            >
              <Defs>
                {/* Surface droplet gloss sheen */}
                <SvgLinearGradient id={`topSheen-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.85} />
                  <Stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.20} />
                  <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
                </SvgLinearGradient>

                {/* Deep liquid emerald pool glow */}
                <SvgRadialGradient
                  id={`bottomGlow-${index}`}
                  cx="50%"
                  cy="92%"
                  rx="60%"
                  ry="40%"
                  fx="50%"
                  fy="95%"
                >
                  <Stop offset="0%" stopColor="#059669" stopOpacity={0.25} />
                  <Stop offset="60%" stopColor="#10B981" stopOpacity={0.10} />
                  <Stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </SvgRadialGradient>
              </Defs>

              {/* Surface Sheen */}
              <Rect
                x="0"
                y="0"
                width="88"
                height="65"
                fill={`url(#topSheen-${index})`}
              />

              {/* Liquid Emerald Pool Glow */}
              <Rect
                x="0"
                y="110"
                width="88"
                height="84"
                fill={`url(#bottomGlow-${index})`}
              />
            </Svg>

            {/* Pill Content Overlay */}
            <View style={styles.pillContentWrap}>
              {/* Day & Date Header */}
              <View style={styles.pillHeader}>
                <Text style={styles.forecastDayText}>
                  {item.day}
                </Text>
                <View style={styles.pillDateBadge}>
                  <Text style={styles.forecastDateSub}>
                    {item.date}
                  </Text>
                </View>
              </View>

              {/* Dynamic 3D Weather Icon */}
              <WeatherIcon type={item.iconType} />

              {/* Bottom: Rain Chance Pill + Big Temp */}
              <View style={styles.pillFooter}>
                {item.chance ? (
                  <View style={styles.chancePill}>
                    <Text style={styles.forecastChance}>
                      {item.chance}
                    </Text>
                  </View>
                ) : (
                  <View style={[styles.chancePill, { opacity: 0 }]}>
                    <Text style={styles.forecastChance}>-</Text>
                  </View>
                )}

                <Text style={styles.forecastTemp}>
                  {item.temp}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

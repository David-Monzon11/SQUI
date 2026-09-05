import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Animated } from 'react-native';
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
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result: DailyForecastItem[] = [];
  const now = new Date();
  for (let i = 1; i <= 6; i++) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + i);
    const dayIdx = (nextDate.getDay() + 6) % 7; // Monday = 0
    result.push({
      day: dayNames[dayIdx],
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
  location: 'Fetching Location...',
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

  // 3D Weather Art Bobbing Animation
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bobbing = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -7,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    );
    bobbing.start();
    return () => bobbing.stop();
  }, [translateY]);

  // Real-time ticking clock
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
      let deviceLocationName: string | undefined = undefined;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          lat = loc.coords.latitude;
          lon = loc.coords.longitude;

          // Native device reverse geocoding for exact mapped city name
          const geocoded = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
          if (geocoded && geocoded.length > 0) {
            const place = geocoded[0];
            const city = place.city || place.subregion || place.district || place.region;
            const country = place.isoCountryCode || place.country;
            if (city && country) {
              deviceLocationName = `${city}, ${country}`;
            } else if (city) {
              deviceLocationName = city;
            }
          }
        }
      } catch (locErr) {
        console.log('[WeatherCard] Location permission bypassed or resolving via network IP');
      }

      const data = await apiClient.getWeather(lat, lon);
      if (data && typeof data.temperature === 'number') {
        const finalLocation =
          deviceLocationName ||
          (data.location && data.location !== 'Local Climate' ? data.location : 'Manila, PH');

        setWeather((prev) => ({
          ...prev,
          ...data,
          location: finalLocation,
          dateStr: data.dateStr || prev.dateStr || getInitialDateStr(),
          dailyForecast:
            data.dailyForecast && data.dailyForecast.length > 0
              ? data.dailyForecast.map((item) => ({
                  ...item,
                  day: item.day ? item.day.toUpperCase() : 'DAY',
                }))
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

      {/* 🌊 Sculpted Organic Wave Glassmorphic Card (No top border stroke) */}
      <View style={styles.waveCardWrapper}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 350 235"
          preserveAspectRatio="none"
          style={styles.waveSvgBg}
        >
          <Defs>
            {/* SQUI Signature Emerald Gradient */}
            <SvgLinearGradient id="squiWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#10B981" />
              <Stop offset="50%" stopColor="#059669" />
              <Stop offset="100%" stopColor="#047857" />
            </SvgLinearGradient>

            {/* Ambient Emerald Glass Glow */}
            <SvgLinearGradient id="squiGlassGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#10B981" stopOpacity={0.20} />
              <Stop offset="100%" stopColor="#34D399" stopOpacity={0.05} />
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

          {/* 3D Sky Backdrop */}
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
        </Svg>

        {/* Card Content Stack */}
        <View style={styles.cardContent}>
          {/* Top Row: Temp Info (Left) + Animated Dynamic 3D Weather Illustration (Right) */}
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

            {/* Right: Dynamic Floating 3D Weather Art */}
            <Animated.View style={[styles.rightCol, { transform: [{ translateY }] }]}>
              <Image
                source={getMainWeatherImage(weather.iconType)}
                style={styles.weatherImage}
              />
            </Animated.View>
          </View>
        </View>
      </View>

      {/* ↔️ Horizontal Scrollable Strip: 6 Upcoming Days (Clean Soft Glass Texture) */}
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
            {/* Soft White-Emerald Frosted Glass Gradient */}
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.98)',
                'rgba(240, 253, 244, 0.92)',
                'rgba(209, 250, 229, 0.85)',
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.liquidGradientBg}
            />

            {/* Pill Content Overlay */}
            <View style={styles.pillContentWrap}>
              {/* Day & Date Header (Mon, Tue, Wed, Thu, Fri, Sat, Sun) */}
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

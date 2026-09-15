import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Animated, Dimensions } from 'react-native';
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

const getPeriodOfDay = (sunrise?: number, sunset?: number, timezone?: number): 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' => {
  const now = new Date();
  
  if (sunrise && sunset && timezone !== undefined) {
    const nowSecs = Math.floor(now.getTime() / 1000);
    
    // Dawn: 1 hour before sunrise to sunrise
    if (nowSecs >= sunrise - 3600 && nowSecs < sunrise) return 'dawn';
    
    // To find local noon
    const localHour = new Date((nowSecs + timezone) * 1000).getUTCHours();
    
    if (nowSecs >= sunrise && localHour < 12) return 'morning';
    if (localHour >= 12 && nowSecs < sunset - 3600) return 'afternoon';
    if (nowSecs >= sunset - 3600 && nowSecs < sunset + 3600) return 'evening';
    return 'night';
  }

  const hour = now.getHours();
  if (hour >= 5 && hour < 6) return 'dawn';
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 19) return 'evening';
  return 'night';
};

const getSkyGradient = (condition: string, period: string) => {
  if (period === 'night') {
    if (condition.includes('rain') || condition === 'thunderstorm') return ['#0F172A', '#020617', '#000000', '#000000'];
    return ['#1E293B', '#0F172A', '#020617', '#000000'];
  }
  if (period === 'evening') {
    if (condition.includes('rain') || condition === 'thunderstorm') return ['#334155', '#1E293B', '#0F172A', '#020617'];
    return ['#F59E0B', '#EA580C', '#9A3412', '#431407'];
  }
  if (period === 'dawn') {
    return ['#FBCFE8', '#F472B6', '#8B5CF6', '#312E81'];
  }
  if (period === 'afternoon') {
    if (condition === 'thunderstorm' || condition === 'heavyRain') return ['#475569', '#334155', '#1E293B', '#0F172A'];
    if (condition === 'rain' || condition === 'drizzle') return ['#E2E8F0', '#94A3B8', '#475569', '#1E293B'];
    if (condition === 'clouds' || condition === 'fog') return ['#F1F5F9', '#CBD5E1', '#94A3B8', '#475569'];
    return ['#FEF3C7', '#7DD3FC', '#0EA5E9', '#0284C7']; // clear
  }
  // morning
  if (condition === 'thunderstorm' || condition === 'heavyRain') return ['#64748B', '#475569', '#334155', '#1E293B'];
  if (condition === 'rain' || condition === 'drizzle') return ['#F1F5F9', '#CBD5E1', '#64748B', '#334155'];
  if (condition === 'clouds' || condition === 'fog') return ['#F8FAFC', '#E2E8F0', '#94A3B8', '#475569'];
  return ['#FFFBEB', '#BAE6FD', '#38BDF8', '#0369A1']; // clear
};

const getWaveGradient = (period: string) => {
  if (period === 'night' || period === 'evening') {
    return ['#047857', '#065F46', '#064E3B'];
  }
  if (period === 'dawn') {
    return ['#059669', '#047857', '#064E3B'];
  }
  return ['#10B981', '#059669', '#047857'];
};

const getSubcardGradient = (iconType: string) => {
  switch (iconType) {
    case 'sun':
      return ['rgba(255, 251, 235, 0.98)', 'rgba(254, 243, 199, 0.92)', 'rgba(253, 230, 138, 0.85)'];
    case 'rain':
      return ['rgba(241, 245, 249, 0.98)', 'rgba(203, 213, 225, 0.92)', 'rgba(148, 163, 184, 0.85)'];
    case 'moon':
      return ['rgba(248, 250, 252, 0.98)', 'rgba(226, 232, 240, 0.92)', 'rgba(203, 213, 225, 0.85)'];
    case 'cloud':
    default:
      return ['rgba(255, 255, 255, 0.98)', 'rgba(240, 253, 244, 0.92)', 'rgba(209, 250, 229, 0.85)'];
  }
};

const WeatherIcon: React.FC<{ type: 'rain' | 'sun' | 'cloud' | 'moon' }> = ({ type }) => {
  let source;
  let customStyle = { width: 64, height: 64 };

  switch (type) {
    case 'rain':
      source = require('../../../assets/vecteezy_3d-icon-cloudy-day-weather-forecast-illustration-concept_24683592.png');
      customStyle = { width: 64, height: 64 };
      break;

    case 'cloud':
      source = require('../../../assets/vecteezy_3d-partly-cloudy-weather-icon-sun-and-cloud_67592749.png');
      customStyle = { width: 86, height: 86 };
      break;

    case 'moon':
      source = require('../../../assets/moon_3d.png');
      customStyle = { width: 72, height: 72 };
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
      return require('../../../assets/moon_3d.png');
    case 'cloud':
    default:
      return require('../../../assets/vecteezy_3d-partly-cloudy-weather-icon-sun-and-cloud_67592749.png');
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
  condition: 'clouds',
  humidity: 65,
  hourly: [],
  dailyForecast: getInitialDailyForecast(),
  hydratingTip: 'Mindful climate active. Stay naturally hydrated at your steady pace today!',
};

// Cloud layer width — wider than card so the seam is never visible
const CLOUD_STRIP_W = 500;

const DynamicClouds: React.FC<{ condition: string, period: string }> = ({ condition, period }) => {
  const cloudSources = {
    normal: require('../../../assets/vecteezy_cloud-png-with-ai-generated_26772076.png'),
    dark: require('../../../assets/vecteezy_cloudy-rain-on-transparent-background_19781539.png'),
    fog: require('../../../assets/vecteezy_fog-3d-icon-illustration_28209813.png'),
  };

  // Layer A: slow drift, starts at 0, moves left by CLOUD_STRIP_W then instantly resets
  // Layer B: faster drift, starts offset by CLOUD_STRIP_W/2 so it fills while A resets
  // Each layer has a twin copy so the strip tiles seamlessly (conveyor belt)
  const scrollA = useRef(new Animated.Value(0)).current;
  const scrollB = useRef(new Animated.Value(0)).current;
  const scrollC = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Layer A — slow (28s per full width)
    const loopA = Animated.loop(
      Animated.timing(scrollA, {
        toValue: -CLOUD_STRIP_W,
        duration: 28000,
        useNativeDriver: true,
      })
    );
    // Layer B — medium (20s per full width)
    const loopB = Animated.loop(
      Animated.timing(scrollB, {
        toValue: -CLOUD_STRIP_W,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    // Layer C — slightly faster (35s, drifting opposite side)
    const loopC = Animated.loop(
      Animated.timing(scrollC, {
        toValue: -CLOUD_STRIP_W,
        duration: 35000,
        useNativeDriver: true,
      })
    );
    loopA.start();
    loopB.start();
    loopC.start();
    return () => { loopA.stop(); loopB.stop(); loopC.stop(); };
  }, [scrollA, scrollB, scrollC]);

  if (condition === 'clear') return null;

  let opacity = 0.5;
  let source = cloudSources.normal;

  if (condition === 'clouds') opacity = 0.8;
  if (condition.includes('rain') || condition === 'drizzle') {
    opacity = 0.9;
    source = cloudSources.dark;
  }
  if (condition === 'thunderstorm' || condition === 'heavyRain') {
    opacity = 0.8;
    source = cloudSources.dark;
  }
  if (condition === 'fog') {
    opacity = 0.5;
    source = cloudSources.fog;
  }
  if (period === 'night' || period === 'evening') {
    opacity *= 0.5;
  }

  return (
    <View style={[styles.cloudsContainer, { zIndex: 1 }]}>
      {/* Layer A — two tiles side-by-side so reset is invisible */}
      <Animated.View style={[
        styles.cloudLayer,
        { top: -20, transform: [{ translateX: scrollA }] }
      ]}>
        <Image source={source} style={{ width: CLOUD_STRIP_W, height: 90, opacity: opacity * 0.7, resizeMode: 'cover' }} />
        <Image source={source} style={{ width: CLOUD_STRIP_W, height: 90, opacity: opacity * 0.7, resizeMode: 'cover' }} />
      </Animated.View>

      {/* Layer B — offset start by half strip width for seamless fill */}
      <Animated.View style={[
        styles.cloudLayer,
        { top: 5, transform: [{ translateX: Animated.add(scrollB, new Animated.Value(-(CLOUD_STRIP_W / 2))) }] }
      ]}>
        <Image source={source} style={{ width: CLOUD_STRIP_W, height: 60, opacity: opacity * 0.5, resizeMode: 'cover' }} />
        <Image source={source} style={{ width: CLOUD_STRIP_W, height: 60, opacity: opacity * 0.5, resizeMode: 'cover' }} />
      </Animated.View>
    </View>
  );
};

export const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>(initialWeather);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>(getFormattedCurrentTime());
  const [periodOfDay, setPeriodOfDay] = useState(getPeriodOfDay());

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

  // Real-time ticking clock & period updater
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getFormattedCurrentTime());
      setPeriodOfDay(getPeriodOfDay(weather.sunrise, weather.sunset, weather.timezone));
    }, 1000);
    return () => clearInterval(timer);
  }, [weather.sunrise, weather.sunset, weather.timezone]);

  useEffect(() => {
    setPeriodOfDay(getPeriodOfDay(weather.sunrise, weather.sunset, weather.timezone));
  }, [weather.sunrise, weather.sunset, weather.timezone]);

  /**
   * Reverse-geocode via Nominatim (OpenStreetMap) to get proper
   * Philippine barangay → municipality hierarchy.
   * Returns lines: [barangay?, "Municipality/City, PH"]
   */
  const nominatimReverseGeocode = useCallback(async (lat: number, lon: number): Promise<string> => {
    try {
      const url =
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=en`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'SQUI-App/1.0' },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`Nominatim ${res.status}`);
      const json = await res.json();
      const addr = json.address || {};

      // Philippine address hierarchy:
      // neighbourhood / suburb / village / hamlet → barangay level
      // city / town / municipality → municipal level
      const barangay =
        addr.neighbourhood ||
        addr.suburb ||
        addr.village ||
        addr.hamlet ||
        addr.quarter ||
        null;

      const municipality =
        addr.city ||
        addr.town ||
        addr.municipality ||
        addr.county ||
        null;

      const countryCode = addr.country_code?.toUpperCase() || 'PH';

      const lines: string[] = [];

      // Only use barangay if it's a real name (not a Plus Code pattern)
      const PLUS_CODE_RE = /^[23456789CFGHJMPQRVWX]{4}\+/i;
      if (barangay && !PLUS_CODE_RE.test(barangay)) {
        lines.push(barangay);
      }

      if (municipality) {
        lines.push(`${municipality}, ${countryCode}`);
      } else if (lines.length === 0) {
        // Nothing useful — fall through to undefined so backend name is used
        return '';
      }

      return lines.join('\n');
    } catch (e) {
      console.log('[WeatherCard] Nominatim geocode failed:', e);
      return '';
    }
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

          // Use Nominatim for barangay-level Philippine geocoding
          const nominatimResult = await nominatimReverseGeocode(lat, lon);
          if (nominatimResult) {
            deviceLocationName = nominatimResult;
          }
        }
      } catch (locErr) {
        console.log('[WeatherCard] Location permission bypassed or resolving via network IP');
      }

      const data = await apiClient.getWeather(lat, lon);
      if (data && typeof data.temperature === 'number') {
        // Strip Plus Codes from any fallback location string from the backend
        let backendLoc = data.location || '';
        // Fix plus code regex to also match short Plus Codes like 3P72+VVW6
        const PLUS_CODE_RE = /^([23456789CFGHJMPQRVWX]{4,8}\+.*)$/i;
        if (PLUS_CODE_RE.test(backendLoc.split('\n')[0]?.trim() || '')) {
          backendLoc = '';
        }

        const finalLocation =
          deviceLocationName ||
          (backendLoc && backendLoc !== 'Local Area' && backendLoc !== 'Current Location'
            ? backendLoc
            : 'Manila, PH');

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
  }, [nominatimReverseGeocode]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const displayForecast =
    weather.dailyForecast && weather.dailyForecast.length > 0
      ? weather.dailyForecast
      : getInitialDailyForecast();

  // Make sure we show moon if it's night and clear
  let resolvedIconType = weather.iconType;
  if ((periodOfDay === 'night' || periodOfDay === 'evening') && (weather.condition === 'clear' || weather.condition === 'clouds')) {
    resolvedIconType = 'moon';
  } else if ((periodOfDay === 'morning' || periodOfDay === 'afternoon' || periodOfDay === 'dawn') && resolvedIconType === 'moon') {
    resolvedIconType = 'sun'; // fallback in case backend gave moon during the day
  }

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mindful Climate</Text>
        <Text style={styles.sectionSub}>Weather & Hydration Balance</Text>
      </View>

      {/* 🌊 Sculpted Organic Wave Glassmorphic Card (No top border stroke) */}
      <View
        style={styles.waveCardWrapper}
        onLayout={(e) => {
          // layout is handled by fixed 350×235 viewBox with xMidYMid meet
        }}
      >
        {/* 1. Sky Backdrop SVG — uses xMidYMid meet so the viewBox proportions are preserved */}
        <Svg width="100%" height="100%" viewBox="0 0 350 235" preserveAspectRatio="xMidYMid slice" style={[styles.waveSvgBg, { zIndex: 0 }]}>
          <Defs>
            <SvgRadialGradient id="skyBgGrad" cx="80%" cy="25%" rx="75%" ry="75%" fx="80%" fy="25%">
              {getSkyGradient(weather.condition || 'clouds', periodOfDay).map((color, index) => {
                const offsets = ['0%', '15%', '55%', '100%'];
                return <Stop key={index} offset={offsets[index]} stopColor={color} stopOpacity={index === 0 ? 0.9 : 1} />;
              })}
            </SvgRadialGradient>
          </Defs>
          <Rect x="0" y="0" width="350" height="235" rx="24" fill="url(#skyBgGrad)" />

          <Ellipse cx="284" cy="138" rx="64" ry="18" fill="rgba(3, 37, 56, 0.07)" />
          <Ellipse cx="284" cy="138" rx="48" ry="14" fill="rgba(3, 37, 56, 0.14)" />
          <Ellipse cx="284" cy="138" rx="34" ry="10" fill="rgba(3, 37, 56, 0.22)" />
        </Svg>

        {/* 2. Dynamic Clouds Layer */}
        <DynamicClouds condition={weather.condition || 'clouds'} period={periodOfDay} />

        {/* 3. Foreground Wave SVG — same viewBox, preserveAspectRatio="none" ONLY for this wave
            because we want the wave to fill the full card width regardless of aspect ratio.
            The wave path is designed so the curved edge always stays within the bottom-left
            portion — it fills left→bottom and exposes top-right for the sky/clouds. */}
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 350 235"
          preserveAspectRatio="none"
          style={[styles.waveSvgBg, { zIndex: 2 }]}
        >
          <Defs>
            <SvgLinearGradient id="squiWaveGrad" x1="0%" y1="0%" x2="60%" y2="100%">
              {getWaveGradient(periodOfDay).map((color, index) => (
                <Stop key={index} offset={`${(index / 2) * 100}%`} stopColor={color} />
              ))}
            </SvgLinearGradient>
            <SvgLinearGradient id="squiGlassGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#10B981" stopOpacity={0.22} />
              <Stop offset="100%" stopColor="#34D399" stopOpacity={0.04} />
            </SvgLinearGradient>
          </Defs>
          {/*
            Wave path explanation:
            - Starts top-left corner
            - Flat along the top edge to about 1/3 width (115px)
            - Smooth cubic bezier curves down-right toward center of card
            - Settles into bottom portion covering left side and bottom
            - Closes at bottom-right and back to top-left
            This creates the classic organic wave occupying the bottom-left quadrant.
          */}
          <Path
            d="M -2 -2 L 130 -2 C 160 -2 182 40 200 80 C 220 122 248 148 292 158 C 320 164 350 172 352 196 L 352 237 L -2 237 Z"
            fill="url(#squiWaveGrad)"
          />
          <Path
            d="M -2 -2 L 130 -2 C 160 -2 182 40 200 80 C 220 122 248 148 292 158 C 320 164 350 172 352 196 L 352 237 L -2 237 Z"
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
              <Text style={styles.locationText} numberOfLines={2}>
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

              {/* Dynamic Daily Summary Text */}
              {weather.dailySummaryText ? (
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: 12, 
                  marginTop: 10, 
                  maxWidth: '95%', 
                  fontWeight: '500',
                  lineHeight: 16 
                }}>
                  {weather.dailySummaryText}
                </Text>
              ) : null}
            </View>

            {/* Right: Dynamic Floating 3D Weather Art */}
            <Animated.View style={[styles.rightCol, { transform: [{ translateY }] }]}>
              <Image
                source={getMainWeatherImage(resolvedIconType)}
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
            {/* Dynamic Glass Gradient based on Weather Type */}
            <LinearGradient
              colors={getSubcardGradient(item.iconType)}
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

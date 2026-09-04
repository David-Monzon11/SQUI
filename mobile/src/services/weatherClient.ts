import { WeatherData, HourlyWeatherItem, DailyForecastItem } from '../types';

export function mapWmoCode(
  code: number,
  isDay = 1
): { statusText: string; iconType: 'rain' | 'sun' | 'cloud' | 'moon' } {
  if (code === 0) {
    return isDay
      ? { statusText: 'Sunny', iconType: 'sun' }
      : { statusText: 'Clear Night', iconType: 'moon' };
  }
  if (code === 1 || code === 2) {
    return isDay
      ? { statusText: 'Partly Cloudy', iconType: 'cloud' }
      : { statusText: 'Partly Cloudy', iconType: 'moon' };
  }
  if (code === 3) {
    return { statusText: 'Overcast', iconType: 'cloud' };
  }
  if (code >= 45 && code <= 48) {
    return { statusText: 'Misty Fog', iconType: 'cloud' };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    const statusText =
      code >= 65 || code === 82
        ? 'Heavy Rain'
        : code >= 63 || code === 81
        ? 'Mid Rain'
        : 'Light Rain';
    return { statusText, iconType: 'rain' };
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return { statusText: 'Snow Flurries', iconType: 'cloud' };
  }
  if (code >= 95) {
    return { statusText: 'Thunderstorm', iconType: 'rain' };
  }
  return { statusText: 'Pleasant', iconType: isDay ? 'sun' : 'moon' };
}

export function generateHydrationTip(temp: number, humidity: number, statusText: string): string {
  if (temp >= 31) {
    return "High warmth today! Elevate your hydration target by 400ml to stay energized.";
  }
  if (temp >= 26) {
    return "Warm and active conditions today. Take regular sips of fresh water!";
  }
  if (statusText.toLowerCase().includes("rain")) {
    return "A rainy, cozy day! Warm lemon water or herbal tea helps maintain mindful balance.";
  }
  if (humidity < 40) {
    return "Crisp and dry air detected—keep a water bottle handy for refreshing sips.";
  }
  return "Pleasant mindful climate. Stay naturally hydrated at your steady pace today!";
}

/**
 * Direct HTTPS Open-Meteo client fallback.
 * Uses HTTPS endpoints only so Android / iOS never block for cleartext traffic.
 */
export async function fetchDirectOpenMeteo(
  lat?: number,
  lon?: number
): Promise<WeatherData> {
  let resolvedLat = lat;
  let resolvedLon = lon;
  let locationName = '';

  // If no GPS coordinates, resolve location from free HTTPS IP geolocator (ipwho.is)
  if (
    resolvedLat === undefined ||
    resolvedLon === undefined ||
    isNaN(resolvedLat) ||
    isNaN(resolvedLon)
  ) {
    try {
      const ipRes = await fetch('https://ipwho.is/', {
        signal: AbortSignal.timeout(4000),
      });
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData.success !== false && typeof ipData.latitude === 'number') {
          resolvedLat = ipData.latitude;
          resolvedLon = ipData.longitude;
          locationName = ipData.city
            ? `${ipData.city}, ${ipData.country_code || ipData.country}`
            : ipData.country || 'Local Area';
        }
      }
    } catch {
      // Fallback coordinates (Philippines Central)
      resolvedLat = 15.48;
      resolvedLon = 120.60;
      locationName = 'Local Climate';
    }
  }

  // Reverse geocode coordinates to City, Country via HTTPS
  if (!locationName && resolvedLat && resolvedLon) {
    try {
      const geoRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${resolvedLat}&longitude=${resolvedLon}&localityLanguage=en`,
        { signal: AbortSignal.timeout(3000) }
      );
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        const city = geoData.city || geoData.locality || geoData.principalSubdivision;
        const country = geoData.countryCode || geoData.countryName;
        if (city && country) locationName = `${city}, ${country}`;
        else if (city) locationName = city;
      }
    } catch {
      locationName = 'Current Location';
    }
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${resolvedLat}&longitude=${resolvedLon}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&hourly=temperature_2m,precipitation_probability,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

  const weatherRes = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!weatherRes.ok) {
    throw new Error(`Open-Meteo HTTP error ${weatherRes.status}`);
  }
  const weatherJson = await weatherRes.json();

  const currentTemp = Math.round(weatherJson.current?.temperature_2m ?? 24);
  const humidity = Math.round(weatherJson.current?.relative_humidity_2m ?? 60);
  const currentCode = weatherJson.current?.weather_code ?? 0;
  const isDay = weatherJson.current?.is_day ?? 1;
  const { statusText, iconType } = mapWmoCode(currentCode, isDay);

  const high = Math.round(weatherJson.daily?.temperature_2m_max?.[0] ?? currentTemp + 3);
  const low = Math.round(weatherJson.daily?.temperature_2m_min?.[0] ?? currentTemp - 3);

  // Today's Date formatted e.g. "Fri, Sep 4"
  const now = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateStr = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}`;

  // Build upcoming 6-day daily forecast (Sat, Sun, Mon, Tue, etc.)
  const dailyForecast: DailyForecastItem[] = [];
  const dailyTimes = weatherJson.daily?.time || [];
  const dailyCodes = weatherJson.daily?.weather_code || [];
  const dailyMaxTemps = weatherJson.daily?.temperature_2m_max || [];
  const dailyChances = weatherJson.daily?.precipitation_probability_max || [];

  for (let i = 1; i < dailyTimes.length && dailyForecast.length < 6; i++) {
    const parts = dailyTimes[i].split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const dayLabel = dayNames[d.getDay()];
    const dateSub = `${monthNames[d.getMonth()]} ${d.getDate()}`;
    const code = dailyCodes[i] ?? 0;
    const mapped = mapWmoCode(code, 1);
    const maxT = Math.round(dailyMaxTemps[i] ?? currentTemp);
    const chance = dailyChances[i] !== undefined ? `${Math.round(dailyChances[i])}%` : '20%';

    dailyForecast.push({
      day: dayLabel,
      date: dateSub,
      temp: `${maxT}°`,
      chance,
      iconType: mapped.iconType,
    });
  }

  // Also build 6-hour forecast
  const hourlyTimes: string[] = weatherJson.hourly?.time || [];
  const hourlyTemps: number[] = weatherJson.hourly?.temperature_2m || [];
  const hourlyChances: number[] = weatherJson.hourly?.precipitation_probability || [];
  const hourlyCodes: number[] = weatherJson.hourly?.weather_code || [];
  const hourlyIsDay: number[] = weatherJson.hourly?.is_day || [];

  const nowIso = weatherJson.current?.time || new Date().toISOString();
  let startIdx = hourlyTimes.findIndex((t) => t >= nowIso);
  if (startIdx === -1) startIdx = 0;

  const hourly: HourlyWeatherItem[] = [];
  for (let i = 0; i < 6; i++) {
    const idx = startIdx + i;
    if (idx < hourlyTimes.length) {
      const rawTime = hourlyTimes[idx];
      const hour = parseInt(rawTime.split('T')[1]?.split(':')[0] || '0', 10);
      const timeLabel = `${hour % 12 === 0 ? 12 : hour % 12} ${hour >= 12 ? 'PM' : 'AM'}`;
      const code = hourlyCodes[idx] ?? 0;
      const dayFlag = hourlyIsDay[idx] ?? 1;
      const mapped = mapWmoCode(code, dayFlag);

      hourly.push({
        time: timeLabel,
        temp: `${Math.round(hourlyTemps[idx] ?? currentTemp)}°`,
        chance: `${Math.round(hourlyChances[idx] ?? 0)}%`,
        iconType: mapped.iconType,
      });
    }
  }

  return {
    temperature: currentTemp,
    high,
    low,
    location: locationName || 'Local Climate',
    dateStr,
    statusText,
    iconType,
    humidity,
    hourly,
    dailyForecast,
    hydratingTip: generateHydrationTip(currentTemp, humidity, statusText),
  };
}

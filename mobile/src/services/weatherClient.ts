import { WeatherData, HourlyWeatherItem } from '../types';

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
 * Direct Open-Meteo client fallback.
 * Allows physical mobile devices to fetch real-time weather even if the local backend
 * server is unreachable (e.g. phone on cellular data or different network than dev machine).
 */
export async function fetchDirectOpenMeteo(
  lat?: number,
  lon?: number
): Promise<WeatherData> {
  let resolvedLat = lat;
  let resolvedLon = lon;
  let locationName = '';

  // If no GPS coordinates, resolve location from free IP geolocator
  if (
    resolvedLat === undefined ||
    resolvedLon === undefined ||
    isNaN(resolvedLat) ||
    isNaN(resolvedLon)
  ) {
    try {
      const ipRes = await fetch(
        'http://ip-api.com/json/?fields=status,country,countryCode,city,lat,lon',
        { signal: AbortSignal.timeout(3500) }
      );
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData.status === 'success' && typeof ipData.lat === 'number') {
          resolvedLat = ipData.lat;
          resolvedLon = ipData.lon;
          locationName = ipData.city
            ? `${ipData.city}, ${ipData.countryCode || ipData.country}`
            : ipData.country || 'Local Area';
        }
      }
    } catch {
      // If IP lookup fails, use default Montreal
      resolvedLat = 45.5017;
      resolvedLon = -73.5673;
      locationName = 'Montreal, Canada';
    }
  }

  // Reverse geocode coordinates to City, Country
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

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${resolvedLat}&longitude=${resolvedLon}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&hourly=temperature_2m,precipitation_probability,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

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
    statusText,
    iconType,
    humidity,
    hourly,
    hydratingTip: generateHydrationTip(currentTemp, humidity, statusText),
  };
}

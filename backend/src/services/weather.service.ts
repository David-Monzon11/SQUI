import { WeatherData, HourlyWeatherItem } from "../types/index.js";

interface CacheEntry {
  timestamp: number;
  data: WeatherData;
}

const weatherCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const MAX_CACHE_ENTRIES = 500;

export function mapWmoToSqui(
  code: number,
  isDay = 1
): { statusText: string; iconType: "sun" | "cloud" | "rain" | "moon" } {
  if (code === 0) {
    return isDay
      ? { statusText: "Sunny", iconType: "sun" }
      : { statusText: "Clear Night", iconType: "moon" };
  }
  if (code === 1 || code === 2) {
    return isDay
      ? { statusText: "Partly Cloudy", iconType: "cloud" }
      : { statusText: "Partly Cloudy", iconType: "moon" };
  }
  if (code === 3) {
    return { statusText: "Overcast", iconType: "cloud" };
  }
  if (code >= 45 && code <= 48) {
    return { statusText: "Misty Fog", iconType: "cloud" };
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    const statusText =
      code >= 65 || code === 82
        ? "Heavy Rain"
        : code >= 63 || code === 81
        ? "Mid Rain"
        : "Light Rain";
    return { statusText, iconType: "rain" };
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return { statusText: "Snow Flurries", iconType: "cloud" };
  }
  if (code >= 95) {
    return { statusText: "Thunderstorm", iconType: "rain" };
  }
  return { statusText: "Pleasant", iconType: isDay ? "sun" : "moon" };
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

export class WeatherService {
  /**
   * Resolves coordinates from client IP or network when GPS coordinates are omitted.
   */
  static async resolveLocationByIp(
    clientIp?: string
  ): Promise<{ lat: number; lon: number; locationName: string }> {
    try {
      const isPrivateOrLocal =
        !clientIp ||
        clientIp === "127.0.0.1" ||
        clientIp === "::1" ||
        clientIp.startsWith("192.168.") ||
        clientIp.startsWith("10.") ||
        clientIp.startsWith("172.");

      const queryUrl = isPrivateOrLocal
        ? "http://ip-api.com/json/?fields=status,country,countryCode,city,lat,lon"
        : `http://ip-api.com/json/${clientIp}?fields=status,country,countryCode,city,lat,lon`;

      const response = await fetch(queryUrl, { signal: AbortSignal.timeout(3500) });
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success" && typeof data.lat === "number" && typeof data.lon === "number") {
          const locName = data.city
            ? `${data.city}, ${data.countryCode || data.country}`
            : data.country || "Local Area";
          return { lat: data.lat, lon: data.lon, locationName: locName };
        }
      }
    } catch {
      // IP lookup timed out or failed; will fallback to default coordinates
    }

    // Default Fallback: Montreal, Canada
    return { lat: 45.5017, lon: -73.5673, locationName: "Montreal, Canada" };
  }

  /**
   * Reverse-geocodes coordinates to a friendly City, Country string.
   */
  static async reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (response.ok) {
        const data = await response.json();
        const city = data.city || data.locality || data.principalSubdivision;
        const country = data.countryCode || data.countryName;
        if (city && country) {
          return `${city}, ${country}`;
        }
        if (city) return city;
      }
    } catch {
      // Ignore geocode timeout
    }
    return "Current Location";
  }

  /**
   * Fetches real-time weather and 6-hour forecast from Open-Meteo with 15-minute grid caching.
   */
  static async getWeather(
    rawLat?: number,
    rawLon?: number,
    clientIp?: string
  ): Promise<WeatherData> {
    let lat = rawLat;
    let lon = rawLon;
    let locationName = "";

    // If coordinates are missing or invalid, resolve automatically from IP
    if (lat === undefined || lon === undefined || isNaN(lat) || isNaN(lon)) {
      const resolved = await this.resolveLocationByIp(clientIp);
      lat = resolved.lat;
      lon = resolved.lon;
      locationName = resolved.locationName;
    }

    // Round coordinates to ~1.1km grid for caching
    const roundedLat = Math.round(lat * 100) / 100;
    const roundedLon = Math.round(lon * 100) / 100;
    const cacheKey = `${roundedLat.toFixed(2)}_${roundedLon.toFixed(2)}`;

    // Check Cache
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      // If we have a cached result and resolved a location name, preserve it
      if (locationName && cached.data.location === "Current Location") {
        return { ...cached.data, location: locationName };
      }
      return cached.data;
    }

    try {
      // Resolve location name in parallel with weather if not already known
      const geoPromise = locationName
        ? Promise.resolve(locationName)
        : this.reverseGeocode(roundedLat, roundedLon);

      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLon}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&hourly=temperature_2m,precipitation_probability,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

      const weatherPromise = fetch(openMeteoUrl, {
        signal: AbortSignal.timeout(5000),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Open-Meteo HTTP error ${res.status}`);
        }
        return res.json();
      });

      const [resolvedLoc, weatherJson] = await Promise.all([geoPromise, weatherPromise]);

      const currentTemp = Math.round(weatherJson.current?.temperature_2m ?? 20);
      const humidity = Math.round(weatherJson.current?.relative_humidity_2m ?? 50);
      const currentCode = weatherJson.current?.weather_code ?? 0;
      const isDay = weatherJson.current?.is_day ?? 1;

      const { statusText, iconType } = mapWmoToSqui(currentCode, isDay);

      const high = Math.round(weatherJson.daily?.temperature_2m_max?.[0] ?? currentTemp + 4);
      const low = Math.round(weatherJson.daily?.temperature_2m_min?.[0] ?? currentTemp - 4);

      // Build 6-hour forecast strip starting from current hour
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
          const hour = parseInt(rawTime.split("T")[1]?.split(":")[0] || "0", 10);
          const timeLabel = `${hour % 12 === 0 ? 12 : hour % 12} ${hour >= 12 ? "PM" : "AM"}`;
          const code = hourlyCodes[idx] ?? 0;
          const dayFlag = hourlyIsDay[idx] ?? 1;
          const mapped = mapWmoToSqui(code, dayFlag);

          hourly.push({
            time: timeLabel,
            temp: `${Math.round(hourlyTemps[idx] ?? currentTemp)}°`,
            chance: `${Math.round(hourlyChances[idx] ?? 0)}%`,
            iconType: mapped.iconType,
          });
        }
      }

      // If hourly wasn't available, provide sensible fallback items
      if (hourly.length === 0) {
        const fallbackHours = ["Now", "+1h", "+2h", "+3h", "+4h", "+5h"];
        fallbackHours.forEach((h) => {
          hourly.push({
            time: h,
            temp: `${currentTemp}°`,
            chance: "10%",
            iconType,
          });
        });
      }

      const result: WeatherData = {
        temperature: currentTemp,
        high,
        low,
        location: resolvedLoc || "Local Area",
        statusText,
        iconType,
        humidity,
        hourly,
        hydratingTip: generateHydrationTip(currentTemp, humidity, statusText),
      };

      // Store in memory cache
      if (weatherCache.size >= MAX_CACHE_ENTRIES) {
        const oldestKey = weatherCache.keys().next().value;
        if (oldestKey) weatherCache.delete(oldestKey);
      }
      weatherCache.set(cacheKey, { timestamp: Date.now(), data: result });

      return result;
    } catch (err: any) {
      console.warn(`[WeatherService] Fetch error: ${err.message}. Providing resilient fallback.`);

      // Return stale cache if available
      if (cached) {
        return cached.data;
      }

      // Safe Graceful Fallback
      return {
        temperature: 21,
        high: 25,
        low: 18,
        location: locationName || "Montreal, Canada",
        statusText: "Pleasant",
        iconType: "sun",
        humidity: 55,
        hourly: [
          { time: "3 AM", temp: "18°", chance: "40%", iconType: "rain" },
          { time: "6 AM", temp: "17°", chance: "30%", iconType: "cloud" },
          { time: "9 AM", temp: "21°", chance: "10%", iconType: "moon" },
          { time: "12 PM", temp: "24°", chance: "0%", iconType: "sun" },
          { time: "3 PM", temp: "23°", chance: "10%", iconType: "sun" },
          { time: "6 PM", temp: "20°", chance: "20%", iconType: "cloud" },
        ],
        hydratingTip: "Mindful climate active. Stay well-hydrated throughout your day!",
      };
    }
  }
}

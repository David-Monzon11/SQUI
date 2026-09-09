import { config } from "../config/env.js";
import { WeatherData, HourlyWeatherItem } from "../types/index.js";

interface CacheEntry {
  timestamp: number;
  data: WeatherData & { dailySummaryText?: string };
}

const weatherCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const MAX_CACHE_ENTRIES = 500;

export function mapOpenWeatherIconType(id: number, iconStr: string): "sun" | "cloud" | "rain" | "moon" {
  if (id >= 200 && id < 600) return "rain"; // Thunderstorm, Drizzle, Rain
  if (id >= 600 && id < 800) return "cloud"; // Snow, Atmosphere
  if (id === 800) return iconStr.includes("n") ? "moon" : "sun";
  if (id === 801 || id === 802) return iconStr.includes("n") ? "moon" : "cloud";
  return "cloud"; // 803, 804 Overcast
}

export function generateHydrationTip(temp: number, humidity: number, statusText: string): string {
  if (temp >= 31) return "High warmth today! Elevate your hydration target by 400ml to stay energized.";
  if (temp >= 26) return "Warm and active conditions today. Take regular sips of fresh water!";
  if (statusText.toLowerCase().includes("rain")) return "A rainy, cozy day! Warm lemon water or herbal tea helps maintain mindful balance.";
  if (humidity < 40) return "Crisp and dry air detected—keep a water bottle handy for refreshing sips.";
  return "Pleasant mindful climate. Stay naturally hydrated at your steady pace today!";
}

function capitalizeWords(str: string) {
  return str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export class WeatherService {
  /**
   * Reverse-geocodes coordinates to a precise location name using OpenWeather API.
   */
  static async reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
      const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${config.openWeatherApiKey}`;
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const place = data[0];
          const localName = place.name; // OpenWeather's highly granular name (e.g. Sabanilla)
          const stateOrProvince = place.state || place.country;
          if (localName && stateOrProvince) {
            // Avoid "Sabanilla, Sabanilla"
            return localName !== stateOrProvince ? `${localName}, ${stateOrProvince}` : localName;
          }
          return localName || "Current Location";
        }
      }
    } catch {
      // Ignore geocode timeout
    }
    return "Current Location";
  }

  static generateSummary(todayTemp: number, tomorrowTemp: number, tomorrowPop: number): string {
    let text = "";
    const diff = tomorrowTemp - todayTemp;
    
    if (diff > 2) text = "Tomorrow will be warmer than today";
    else if (diff < -2) text = "Tomorrow will be a little cooler than today";
    else text = "Similar temperatures expected tomorrow";

    if (tomorrowPop > 50) text += " with a high chance of rain.";
    else if (tomorrowPop > 20) text += " with possible light rain.";
    else text += ".";

    return text;
  }

  static async getWeather(
    rawLat?: number,
    rawLon?: number,
    clientIp?: string
  ): Promise<WeatherData & { dailySummaryText?: string }> {
    let lat = rawLat ?? 15.0;
    let lon = rawLon ?? 120.0;

    const roundedLat = Math.round(lat * 100) / 100;
    const roundedLon = Math.round(lon * 100) / 100;
    const cacheKey = `${roundedLat.toFixed(2)}_${roundedLon.toFixed(2)}`;

    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    try {
      const geoPromise = this.reverseGeocode(roundedLat, roundedLon);

      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${roundedLat}&lon=${roundedLon}&appid=${config.openWeatherApiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${roundedLat}&lon=${roundedLon}&appid=${config.openWeatherApiKey}&units=metric`;

      const currentPromise = fetch(currentUrl, { signal: AbortSignal.timeout(5000) }).then(r => r.json());
      const forecastPromise = fetch(forecastUrl, { signal: AbortSignal.timeout(5000) }).then(r => r.json());

      const [resolvedLoc, currentJson, forecastJson] = await Promise.all([geoPromise, currentPromise, forecastPromise]);

      if (!currentJson.main || !forecastJson.list) {
         throw new Error("Invalid OpenWeather response");
      }

      const currentTemp = Math.round(currentJson.main.temp);
      const humidity = Math.round(currentJson.main.humidity);
      const currentId = currentJson.weather[0]?.id || 800;
      const currentIconStr = currentJson.weather[0]?.icon || "01d";
      const statusText = capitalizeWords(currentJson.weather[0]?.description || "Pleasant");
      const iconType = mapOpenWeatherIconType(currentId, currentIconStr);

      // Date formatting
      const now = new Date();
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dateStr = `${dayNames[now.getDay()]}, ${monthNames[now.getMonth()]} ${now.getDate()}`;

      // Forecast list processing (3-hour steps)
      const list: any[] = forecastJson.list;
      const hourly: HourlyWeatherItem[] = [];
      const dailyMap = new Map<string, { max: number; min: number; pop: number; icon: string; id: number }>();

      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const dateObj = new Date(item.dt * 1000);
        
        // Next 6 items for hourly (6 * 3 = 18 hours)
        if (hourly.length < 6) {
           let hour = dateObj.getHours();
           const ampm = hour >= 12 ? "PM" : "AM";
           hour = hour % 12;
           hour = hour ? hour : 12;
           hourly.push({
             time: `${hour} ${ampm}`,
             temp: `${Math.round(item.main.temp)}°`,
             chance: `${Math.round(item.pop * 100)}%`,
             iconType: mapOpenWeatherIconType(item.weather[0].id, item.weather[0].icon)
           });
        }

        // Daily aggregation (using local date strings)
        const dateKey = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
        if (!dailyMap.has(dateKey)) {
          dailyMap.set(dateKey, { max: -999, min: 999, pop: 0, icon: item.weather[0].icon, id: item.weather[0].id });
        }
        const dayData = dailyMap.get(dateKey)!;
        dayData.max = Math.max(dayData.max, item.main.temp);
        dayData.min = Math.min(dayData.min, item.main.temp);
        dayData.pop = Math.max(dayData.pop, item.pop);
      }

      // We only want the next 6 days (excluding today if possible)
      const dailyForecast: any[] = [];
      const dayKeys = Array.from(dailyMap.keys());
      let tomorrowTemp = currentTemp;
      let tomorrowPop = 0;

      // Extract tomorrow for the summary text
      if (dayKeys.length >= 2) {
         const tmrw = dailyMap.get(dayKeys[1])!;
         tomorrowTemp = Math.round(tmrw.max);
         tomorrowPop = Math.round(tmrw.pop * 100);
      }
      
      const summaryText = this.generateSummary(currentTemp, tomorrowTemp, tomorrowPop);

      // Build 6 daily items
      let startIdx = 1; // start from tomorrow usually
      if (dayKeys.length < 7) startIdx = 0; // fallback if list is short

      for (let i = startIdx; i < dayKeys.length && dailyForecast.length < 6; i++) {
        const key = dayKeys[i];
        const dData = dailyMap.get(key)!;
        const [m, d] = key.split("/");
        
        // Mock a date object to get the day of the week
        const realDate = new Date();
        realDate.setMonth(parseInt(m) - 1);
        realDate.setDate(parseInt(d));

        dailyForecast.push({
          day: dayNames[realDate.getDay()].toUpperCase(),
          date: `${monthNames[realDate.getMonth()]} ${realDate.getDate()}`,
          temp: `${Math.round(dData.max)}°`,
          chance: `${Math.round(dData.pop * 100)}%`,
          iconType: mapOpenWeatherIconType(dData.id, dData.icon)
        });
      }

      const result: WeatherData & { dailySummaryText?: string } = {
        temperature: currentTemp,
        high: Math.round(dailyMap.get(dayKeys[0])?.max || currentTemp + 3),
        low: Math.round(dailyMap.get(dayKeys[0])?.min || currentTemp - 3),
        location: resolvedLoc && resolvedLoc !== "Current Location" ? resolvedLoc : "Local Area",
        dateStr,
        statusText,
        iconType,
        humidity,
        hourly,
        dailyForecast,
        hydratingTip: generateHydrationTip(currentTemp, humidity, statusText),
        dailySummaryText: summaryText
      };

      if (weatherCache.size >= MAX_CACHE_ENTRIES) {
        const oldestKey = weatherCache.keys().next().value;
        if (oldestKey) weatherCache.delete(oldestKey);
      }
      weatherCache.set(cacheKey, { timestamp: Date.now(), data: result });

      return result;

    } catch (err: any) {
      console.warn(`[WeatherService] Fetch error: ${err.message}. Providing resilient fallback.`);
      
      // Fallback
      if (cached) return cached.data;
      
      return {
        temperature: 21,
        high: 25,
        low: 18,
        location: "Local Area",
        statusText: "Pleasant",
        iconType: "sun",
        humidity: 55,
        hourly: [],
        dailyForecast: [],
        hydratingTip: "Mindful climate active. Stay well-hydrated throughout your day!",
        dailySummaryText: "Ready for a mindful day ahead."
      };
    }
  }
}

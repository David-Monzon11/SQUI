import { WeatherService, mapWmoToSqui, generateHydrationTip } from "../src/services/weather.service.js";

async function runWeatherTests() {
  console.log("\n[Test 11] Weather Service - Real-time Location Weather");

  // Test WMO Mapping
  const clearDay = mapWmoToSqui(0, 1);
  if (clearDay.statusText !== "Sunny" || clearDay.iconType !== "sun") {
    throw new Error(`Clear day mapping failed: ${JSON.stringify(clearDay)}`);
  }

  const clearNight = mapWmoToSqui(0, 0);
  if (clearNight.statusText !== "Clear Night" || clearNight.iconType !== "moon") {
    throw new Error(`Clear night mapping failed: ${JSON.stringify(clearNight)}`);
  }

  const rainDay = mapWmoToSqui(63, 1);
  if (rainDay.iconType !== "rain") {
    throw new Error(`Rain day mapping failed: ${JSON.stringify(rainDay)}`);
  }
  console.log("  ✅ WMO weather code mapping passed");

  // Test Hydration Tips
  const hotTip = generateHydrationTip(32, 60, "Sunny");
  if (!hotTip.toLowerCase().includes("hydration")) {
    throw new Error(`Hot hydration tip failed: ${hotTip}`);
  }
  console.log("  ✅ Mindful hydration tip generator passed");

  // Test Weather Fetch with sample coordinates (Manila)
  const weather = await WeatherService.getWeather(14.5995, 120.9842);
  if (!weather || typeof weather.temperature !== "number" || !weather.location) {
    throw new Error(`Weather fetch Manila failed: ${JSON.stringify(weather)}`);
  }
  if (!Array.isArray(weather.hourly) || weather.hourly.length !== 6) {
    throw new Error(`Weather hourly forecast invalid length: ${weather.hourly?.length}`);
  }
  console.log(`  ✅ Live coordinates fetch passed (${weather.location}: ${weather.temperature}°C, ${weather.statusText})`);

  // Test Cache (immediate repeat should return quickly)
  const cachedWeather = await WeatherService.getWeather(14.5995, 120.9842);
  if (cachedWeather.temperature !== weather.temperature) {
    throw new Error(`Cache mismatch: ${cachedWeather.temperature} vs ${weather.temperature}`);
  }
  console.log("  ✅ 15-minute grid caching passed");

  // Test IP Fallback without coordinates
  const ipWeather = await WeatherService.getWeather(undefined, undefined);
  if (!ipWeather || typeof ipWeather.temperature !== "number") {
    throw new Error(`IP weather failed: ${JSON.stringify(ipWeather)}`);
  }
  console.log(`  ✅ IP-based location fallback passed (${ipWeather.location}: ${ipWeather.temperature}°C)`);

  console.log("🎉 ALL WEATHER TESTS PASSED! 🌤️✨\n");
}

runWeatherTests().catch((err) => {
  console.error("❌ Weather Test Failed:", err);
  process.exit(1);
});

import { Request, Response, NextFunction } from "express";
import { WeatherService } from "../services/weather.service.js";
import { sendSuccess } from "../utils/response.js";

export const getWeather = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawLat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
    const rawLon = req.query.lon ? parseFloat(req.query.lon as string) : undefined;

    const lat = rawLat !== undefined && !isNaN(rawLat) ? rawLat : undefined;
    const lon = rawLon !== undefined && !isNaN(rawLon) ? rawLon : undefined;

    // Resolve caller's IP for automatic location fallback
    const forwarded = req.headers["x-forwarded-for"];
    const clientIp = typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : req.socket.remoteAddress || undefined;

    const data = await WeatherService.getWeather(lat, lon, clientIp);
    return sendSuccess(res, data, 200, "Realtime weather retrieved successfully");
  } catch (error) {
    next(error);
  }
};

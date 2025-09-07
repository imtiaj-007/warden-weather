import fetch from "node-fetch";
import NodeCache from "node-cache";
import { WeatherData, OpenMeteoResponse, WeatherHistory } from "../types/weather";
import { mapWeatherCode } from "../utils/weatherHelpers";
import { fetchHistoricalDataByCity } from "../scripts/fetchHistoricalWeather";

const cache = new NodeCache({ stdTTL: 300 }); // 5 min TTL
const historyCache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL for historical data


function buildOpenMeteoUrl(lat: number, lng: number, params: string[] = []): string {
    const baseUrl = process.env.OPENMETEO_URL ?? "https://api.open-meteo.com/v1/forecast";
    const requiredParams = [
        `latitude=${lat}`,
        `longitude=${lng}`
    ];
    const defaultParams = [
        "current=temperature_2m,relative_humidity_2m,weather_code"
    ];
    const allParams = [...requiredParams, ...defaultParams, ...params];
    return `${baseUrl}?${allParams.join("&")}`;
}

export async function getWeather(lat: number, lng: number): Promise<WeatherData> {
    const cacheKey = `${lat}_${lng}`;
    const cached = cache.get<WeatherData>(cacheKey);
    if (cached) return cached;

    const url = buildOpenMeteoUrl(lat, lng);
    const res = await fetch(url);
    const data: OpenMeteoResponse = await res.json() as OpenMeteoResponse;

    const weather: WeatherData = {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        weatherCode: data.current.weather_code,
        condition: mapWeatherCode(data.current.weather_code),
    };

    cache.set(cacheKey, weather);
    return weather;
}

/**
 * Get historical weather data for last year.
 * Reads from weather.json if exists, otherwise fetches & saves.
 */
export async function getHistoricalWeather(
    city: string,
    lat: number,
    lng: number
): Promise<WeatherHistory> {
    const cacheKey = `history_${city}_${lat}_${lng}`;
    const cached = historyCache.get<WeatherHistory>(cacheKey);
    if (cached) return cached;

    const data: WeatherHistory = await fetchHistoricalDataByCity(city, lat, lng);
    historyCache.set(cacheKey, data);
    return data;
}

/**
 * Get comprehensive weather data (current + historical) for a location
 */
export async function getCompleteWeather(
    city: string,
    lat: number,
    lng: number
): Promise<{
    current: WeatherData;
    historical: WeatherHistory;
}> {
    const [current, historical] = await Promise.all([
        getWeather(lat, lng),
        getHistoricalWeather(city, lat, lng)
    ]);

    return {
        current,
        historical
    };
}
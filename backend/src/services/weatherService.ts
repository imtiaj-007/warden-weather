import fetch from "node-fetch";
import NodeCache from "node-cache";
import { WeatherData, OpenMeteoResponse } from "../types/weather";
import { mapWeatherCode } from "../utils/weatherHelpers";

const cache = new NodeCache({ stdTTL: 300 }); // 5 min TTL

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
    const cacheKey = `${lat},${lng}`;
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

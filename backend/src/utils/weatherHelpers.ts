import { WeatherCondition } from "../types/weather";

export function mapWeatherCode(code: number): WeatherCondition {
    if (code === 0) return "clear";
    if (code >= 1 && code <= 3) return "cloudy";
    if (code >= 51 && code <= 57) return "drizzle";
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rainy";
    if ((code >= 71 && code <= 77) || (code === 85 || code === 86)) return "snow";
    return "clear";
}

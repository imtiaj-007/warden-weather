import { WeatherFilter } from "../types/filters";
import { PropertyWithWeather } from "../types/weather";

export function applyWeatherFilters(
    properties: PropertyWithWeather[],
    filters: WeatherFilter
): PropertyWithWeather[] {
    return properties.filter((p) => {
        const w = p.weather;

        if (filters.minTemp !== undefined && w.temperature < filters.minTemp) return false;
        if (filters.maxTemp !== undefined && w.temperature > filters.maxTemp) return false;

        if (filters.minHumidity !== undefined && w.humidity < filters.minHumidity) return false;
        if (filters.maxHumidity !== undefined && w.humidity > filters.maxHumidity) return false;

        if (filters.conditions && filters.conditions.length > 0) {
            if (!filters.conditions.includes(w.condition)) return false;
        }

        return true;
    });
}

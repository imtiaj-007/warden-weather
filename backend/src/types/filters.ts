import { WeatherCondition } from "./weather";

export interface WeatherFilter {
    minTemp?: number;
    maxTemp?: number;
    minHumidity?: number;
    maxHumidity?: number;
    conditions?: WeatherCondition[]; // ["clear", "cloudy", "drizzle", "rainy", "snow"]
    historyDuration?: '1m' | '3m' | '6m' | '12m';
}

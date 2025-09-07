export type WeatherCondition =
    | "clear"
    | "cloudy"
    | "drizzle"
    | "rainy"
    | "snow";

export interface WeatherData {
    temperature: number;     // celcious (°C)
    humidity: number;        // percentage (%)
    weatherCode: number;     // raw WMO code
    condition: WeatherCondition;
}

export interface WeatherHistory {
    avgTemp: number;
    minTemp: number;
    maxTemp: number;
    avgHumidity: number;
    minHumidity: number;
    maxHumidity: number;
}
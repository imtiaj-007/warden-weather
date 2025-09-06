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

export interface OpenMeteoResponse {
    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        weather_code: number;
    };
}

// Prisma Property type + Weather
import { Property } from "@prisma/client";

export interface PropertyWithWeather extends Property {
    weather: WeatherData;
}

import { WeatherData } from "./weather";

export interface PropertyFilters {
    searchText?: string;
    minTemp?: number;
    maxTemp?: number;
    minHumidity?: number;
    maxHumidity?: number;
    weatherCondition?: string;
}

export interface Property {
    id: number;
    name: string;
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lng?: number;
    geohash5?: string;
    isActive: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    weather: WeatherData;
}
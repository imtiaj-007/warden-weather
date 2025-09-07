import { WeatherData, WeatherHistory } from "./weather";

export interface PropertyFilters {
    searchText?: string;
    minTemp?: number;
    maxTemp?: number;
    minHumidity?: number;
    maxHumidity?: number;
    weatherCondition?: string;
    historyDuration?: '1m' | '3m' | '6m' | '12m';
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
    weatherHistory: WeatherHistory;
}
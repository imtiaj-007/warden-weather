export interface OpenMeteoArchiveResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;

    daily_units: {
        time: string;                       // "iso8601"
        temperature_2m_max: string;         // "°C"
        temperature_2m_min: string;         // "°C"
        relative_humidity_2m_max: string;   // "%"
        relative_humidity_2m_min: string;   // "%"
        precipitation_sum: string;          // "mm"
        wind_speed_10m_max: string;         // "km/h"
    };

    daily: {
        time: string[];                     // e.g. ["2024-09-05", "2024-09-06", ...]
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        relative_humidity_2m_max: number[];
        relative_humidity_2m_min: number[];
        precipitation_sum: number[];
        wind_speed_10m_max: number[];
    };
}

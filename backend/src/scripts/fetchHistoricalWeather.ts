import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { OpenMeteoArchiveResponse } from "../types/openMateo";
import { WeatherHistory } from "../types/weather";

const dataFilePath = process.env.DATA_FILE_PATH ?? path.resolve(__dirname, "../../data/weather.json");

// Property list
const properties: Array<{
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    geohash5: string;
}> = [
        {
            city: "Chennai",
            state: "Tamil Nadu",
            country: "India",
            lat: 13.03222,
            lng: 80.23478,
            geohash5: "13.05,80.25",
        },
        {
            city: "Ahmedabad",
            state: "Gujarat",
            country: "India",
            lat: 23.02372,
            lng: 72.57572,
            geohash5: "23.00,72.60",
        },
        {
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            lat: 19.08719,
            lng: 72.87539,
            geohash5: "19.10,72.90",
        },
        {
            city: "Bengaluru",
            state: "Karnataka",
            country: "India",
            lat: 12.97556,
            lng: 77.59141,
            geohash5: "13.00,77.60",
        },
        {
            city: "Kolkata",
            state: "West Bengal",
            country: "India",
            lat: 22.57364,
            lng: 88.37049,
            geohash5: "22.55,88.35",
        },
        {
            city: "Hyderabad",
            state: "Telangana",
            country: "India",
            lat: 17.43224,
            lng: 78.41215,
            geohash5: "17.45,78.40",
        },
        {
            city: "Pune",
            state: "Maharashtra",
            country: "India",
            lat: 18.51225,
            lng: 73.84863,
            geohash5: "18.50,73.85",
        },
        {
            city: "Jaipur",
            state: "Rajasthan",
            country: "India",
            lat: 26.9077,
            lng: 75.78223,
            geohash5: "26.90,75.80",
        },
        {
            city: "Kochi",
            state: "Kerala",
            country: "India",
            lat: 9.93301,
            lng: 76.25794,
            geohash5: "9.95,76.25",
        }
];

function buildHistoricalUrl(
    lat: number,
    lng: number,
    start: string,
    end: string,
    params: string[] = []
): string {
    const baseUrl = process.env.OPENMETEO_ARCHIVE_URL ?? "https://archive-api.open-meteo.com/v1/archive";
    const requiredParams = [
        `latitude=${lat}`,
        `longitude=${lng}`,
        `start_date=${start}`,
        `end_date=${end}`
    ];
    const defaultParams = [
        "daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min",
        "timezone=auto"
    ];
    const allParams = [...requiredParams, ...defaultParams, ...params];
    return `${baseUrl}?${allParams.join("&")}`;
}

function buildHistory(data: OpenMeteoArchiveResponse): WeatherHistory {
    const dailyAvgTemps = data.daily.temperature_2m_max.map(
        (t: number, i: number) => (t + data.daily.temperature_2m_min[i]) / 2
    );
    const dailyAvgHums = data.daily.relative_humidity_2m_max.map(
        (h: number, i: number) => (h + data.daily.relative_humidity_2m_min[i]) / 2
    );
    
    const filterValid = (arr: number[]) => arr.filter(val => val != null && val > 0);

    const avg = (arr: number[]) => {
        const valid = filterValid(arr);
        return valid.reduce((a, b) => a + b, 0) / valid.length;
    };
    const min = (arr: number[]) => {
        const valid = filterValid(arr);
        return Math.min(...valid);
    };
    const max = (arr: number[]) => {
        const valid = filterValid(arr);
        return Math.max(...valid);
    };

    return {
        "1m": { 
            avgTemp: avg(dailyAvgTemps.slice(-30)), 
            minTemp: min(data.daily.temperature_2m_min.slice(-30)),
            maxTemp: max(data.daily.temperature_2m_max.slice(-30)),
            avgHumidity: avg(dailyAvgHums.slice(-30)),
            minHumidity: min(data.daily.relative_humidity_2m_min.slice(-30)),
            maxHumidity: max(data.daily.relative_humidity_2m_max.slice(-30))
        },
        "3m": { 
            avgTemp: avg(dailyAvgTemps.slice(-90)),
            minTemp: min(data.daily.temperature_2m_min.slice(-90)),
            maxTemp: max(data.daily.temperature_2m_max.slice(-90)),
            avgHumidity: avg(dailyAvgHums.slice(-90)),
            minHumidity: min(data.daily.relative_humidity_2m_min.slice(-90)),
            maxHumidity: max(data.daily.relative_humidity_2m_max.slice(-90))
        },
        "6m": { 
            avgTemp: avg(dailyAvgTemps.slice(-180)),
            minTemp: min(data.daily.temperature_2m_min.slice(-180)),
            maxTemp: max(data.daily.temperature_2m_max.slice(-180)),
            avgHumidity: avg(dailyAvgHums.slice(-180)),
            minHumidity: min(data.daily.relative_humidity_2m_min.slice(-180)),
            maxHumidity: max(data.daily.relative_humidity_2m_max.slice(-180))
        },
        "12m": { 
            avgTemp: avg(dailyAvgTemps),
            minTemp: min(data.daily.temperature_2m_min),
            maxTemp: max(data.daily.temperature_2m_max),
            avgHumidity: avg(dailyAvgHums),
            minHumidity: min(data.daily.relative_humidity_2m_min),
            maxHumidity: max(data.daily.relative_humidity_2m_max)
        },
    };
}

async function fetchHistorical(city: string, lat: number, lng: number): Promise<{
    city: string;
    lat: number;
    lng: number;
    history: WeatherHistory
}> {
    const end = new Date();
    const start = new Date();
    start.setFullYear(end.getFullYear() - 1);

    const url = buildHistoricalUrl(
        lat,
        lng,
        start.toISOString().split("T")[0],
        end.toISOString().split("T")[0]
    );

    const res = await fetch(url);
    const data: OpenMeteoArchiveResponse = await res.json() as OpenMeteoArchiveResponse;
    const history = buildHistory(data);

    return { city, lat, lng, history };
}

export async function fetchHistoricalDataByCity(city: string, lat: number, lng: number): Promise<WeatherHistory> {
    // 1. Check local JSON file
    let db: Record<string, any> = {};
    if (fs.existsSync(dataFilePath)) {
        db = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
        if (db[city]) {
            return db[city].history as WeatherHistory;
        }
    }

    // 2. fetch from OpenMateo and save locally
    try {
        const res = await fetchHistorical(city, lat, lng);
        db[city] = res;
        fs.writeFileSync(dataFilePath, JSON.stringify(db, null, 4));
    } catch (err) {
        console.error(`❌ Failed to fetch weather history for ${city}`, err);
    }

    return db[city];
};

async function main() {
    const db: Record<string, any> = {};

    for (const p of properties) {
        console.log(`Fetching historical data for ${p.city}...`);
        try {
            db[p.city] = await fetchHistorical(p.city, p.lat, p.lng);
        } catch (err) {
            console.error(`❌ Failed for ${p.city}`, err);
        }
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(db, null, 4));
    console.log(`✅ Historical data saved to ${dataFilePath}`);
}

main()
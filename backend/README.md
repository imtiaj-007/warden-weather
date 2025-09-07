# Backend – Warden Weather Service

Express + Prisma backend that serves properties enriched with current weather and historical weather summaries using Open‑Meteo.

---

## 🚀 Tech Stack

* Node.js, Express
* Prisma (readonly DB)
* TypeScript
* Open‑Meteo APIs
* NodeCache

---

## ✨ Features

* `GET /get-properties` with search and weather-based filters
* Current weather (temperature, humidity, condition)
* Historical weather summaries (min/max/avg for temp & humidity) over **1m / 3m / 6m / 12m**
* In-memory caching for current and historical data
* Historical data persisted in `data/weather.json` for reuse

---

## ⚙️ Setup

### 1) Install

```bash
cd backend
npm i
npm run prisma:gen
```

### 2) Environment

Create `.env` (see `.env.example` if available):

```bash
# Project Settings
PORT=5000
DATA_FILE_PATH="../../data/weather.json"

# Open Meteo URLs
OPENMETEO_URL=https://api.open-meteo.com/v1/forecast
OPENMETEO_ARCHIVE_URL=https://archive-api.open-meteo.com/v1/archive

# Database
DATABASE_URL=mysql://candidate_user:StrongPassword!123@arden-dev.c52ea4c0y1ao.ap-south-1.rds.amazonaws.com:3306/warden_test_one?connection_limit=30&pool_timeout=30
```

### 3) Run

```bash
npm run dev
# http://localhost:5000 → "Warden Weather Test: OK"
```

---

## 📜 Scripts

* `npm run dev`: Start server with ts-node
* `npm run build`: Type-check and build
* `npm run start`: Run compiled JS
* `npm run prisma:gen`: Generate Prisma client
* `npm run db:seed`: Seed local DB (if applicable)

---

## 🌐 API

### `GET /get-properties`

Returns up to 20 properties enriched with weather.

#### Query params:

* `searchText`: string (matches name/city/state)
* `minTemp`, `maxTemp`: number (°C)
* `minHumidity`, `maxHumidity`: number (%)
* `conditions`: string|string\[] in \["clear","cloudy","drizzle","rainy","snow"]
* `historyDuration`: `'1m' | '3m' | '6m' | '12m'` (defaults to `1m`)

#### Example:

```bash
GET /get-properties?searchText=Chennai&minTemp=20&maxHumidity=85&conditions=clear&historyDuration=3m
```

#### Response (excerpt):

```json
[
  {
    "id": 1,
    "name": "Sample Property",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "country": "India",
    "lat": 13.03222,
    "lng": 80.23478,
    "isActive": true,
    "weather": {
      "temperature": 30.2,
      "humidity": 68,
      "weatherCode": 1,
      "condition": "cloudy"
    },
    "weatherHistory": {
      "avgTemp": 29.1,
      "minTemp": 23.5,
      "maxTemp": 35.4,
      "avgHumidity": 70.3,
      "minHumidity": 52.0,
      "maxHumidity": 88.0
    }
  }
]
```

---

## 🔄 Data Flow

### Current weather

* `services/weatherService.ts#getWeather` → Open‑Meteo Forecast API (`current=...`)
* Cached for **5 minutes** via NodeCache

### Historical weather

* `scripts/fetchHistoricalWeather.ts` calls Open‑Meteo Archive API for the last 365 days
* Aggregates **min/max/avg for temp & humidity** into 1m/3m/6m/12m windows
* Persists to `data/weather.json`
* Cached for **1 hour**

### Controller

* `controllers/properties.ts#getProperties`
* Loads properties via Prisma
* Enriches each with `getCompleteWeather()` (current + historical by duration)
* Applies filters (`utils/filterHelpers.ts`)

---

## 📊 Historical Data Script

* Entrypoint: `src/scripts/fetchHistoricalWeather.ts`

### How it works:

1. For curated list of cities, fetch last 365 days from Open‑Meteo Archive
2. Compute summaries and write to `data/weather.json`
3. Can run ad‑hoc (`ts-node`)

### API URL structure:

```bash
https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lng}&start_date={YYYY-MM-DD}&end_date={YYYY-MM-DD}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min&timezone=auto
```

---

## 🌍 CORS

* Allows `http://localhost:3000` by default (frontend dev)
* Adjust in `src/index.ts` if needed

---

## 📂 Project Structure

```bash
backend/
  src/
    controllers/       # Express controllers
      properties.ts
    routes/            # Express routes
      properties.ts
    services/          # Weather services (current + historical)
      weatherService.ts
    scripts/           # Historical fetching + persistence
      fetchHistoricalWeather.ts
    utils/             # Helpers (filters, mapping)
    types/             # TS types (weather, open-meteo)
    database/          # Prisma client init
    index.ts           # App bootstrap
  data/weather.json    # Persisted historical summaries
  prisma/              # Schema, migrations, seeds
```

---

## 📘 Prisma

* Uses **readonly DB** for properties
* If schema changes are required → see `docs/migrations.md`

---

## 📝 Notes

* No API key required for Open‑Meteo
* Historical summaries are **precomputed** for performance
* Filters apply to **current weather** only → historical summaries are returned alongside for UI
* To extend filter logic with history → adjust `utils/filterHelpers.ts`

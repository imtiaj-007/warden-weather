# Warden Assignment – Weather to Stay or Not

A full-stack project to browse properties enriched with **current and historical weather data**. The app provides search and weather-based filtering on the frontend, powered by an **Express/Prisma backend** using the **Open‑Meteo API**.

---

## Repo Structure

```bash
.
├─ backend/     # Backend service (Express + Prisma + Open‑Meteo integration)
│  ├─ src/      # Source code (controllers, routes, services, utils)
│  └─ data/     # Persisted weather summaries (weather.json)
├─ frontend/    # Frontend app (Next.js App Router + Chakra UI + React Query)
│  └─ src/      # Components, hooks, lib, types, theme
├─ README.md    # Parent project readme
└─ AI_USAGE.md  # Notes on AI usage in the project
```

---

## Tech Stack

**Backend:** Node.js, Express, Prisma, TypeScript, NodeCache, Open‑Meteo
**Frontend:** Next.js, React, Chakra UI, React Query, TypeScript

---

## Prerequisites

* Node.js 18+
* npm
* Internet access (Open‑Meteo APIs are public)

---

## 🚀 Quick Start

### 1) Clone

```bash
git clone https://github.com/imtiaj-007/warden-weather.git "Warden Assignment"
cd "Warden Assignment"
```

### 2) Backend setup

```bash
cd backend
npm install
npm run prisma:gen
```

Create **backend/.env**:

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

Run backend:

```bash
npm run dev
# http://localhost:5000 → "Warden Weather Test: OK"
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
```

Create **frontend/.env.local**:

```bash
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

Run frontend:

```bash
npm run dev
# http://localhost:3000
```

---

## 🔎 How It Works

### Backend overview

* **Endpoint:** `GET /get-properties`
* **Query params:**

  * `searchText` (string)
  * `minTemp`, `maxTemp` (°C)
  * `minHumidity`, `maxHumidity` (%)
  * `conditions` (one of: clear, cloudy, drizzle, rainy, snow)
  * `historyDuration` ('1m' | '3m' | '6m' | '12m'; default `1m`)

**Data flow:**

* **Current weather:** `services/weatherService.ts#getWeather` → Open‑Meteo Forecast API → cached for 5 minutes.
* **Historical weather:** `scripts/fetchHistoricalWeather.ts` → Open‑Meteo Archive API (last 365 days) → aggregates **min/max/avg** for temp & humidity → persisted in `data/weather.json` → cached for 1 hour.
* **Controller:** Enriches each property with `weather` + `weatherHistory[duration]` → applies weather filters.

**Example request:**

```bash
GET http://localhost:5000/get-properties?searchText=Chennai&minTemp=20&maxHumidity=85&conditions=clear&historyDuration=3m
```

**Response excerpt:**

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

### Frontend overview

* **Filters:**

  * Search by name/city/state
  * Temperature and humidity ranges
  * Weather condition dropdown
  * Weather history duration (1m/3m/6m/12m)

* **Property card:**

  * Current weather (condition, temperature, humidity)
  * Historical stats (min/max/avg temperature & humidity)

* **Data fetching:** `useProperties` with React Query → calls `/get-properties` via `propertiesApi`.

---

## 📜 Scripts

### Backend

```bash
npm run dev        # Start dev server (ts-node)
npm run build      # Build TypeScript
npm run start      # Run compiled server
npm run prisma:gen # Generate Prisma client
npm run db:seed    # Seed (if applicable)
```

### Frontend

```bash
npm run dev     # Start Next.js dev
npm run build   # Build production
npm run start   # Start production server
npm run lint    # Lint
```

---

## 📂 Key Files

**Backend**

* `src/index.ts`: Express bootstrap + CORS
* `src/routes/properties.ts`: Route for `/get-properties`
* `src/controllers/properties.ts`: Fetch properties, enrich with weather, filter
* `src/services/weatherService.ts`: Current + historical weather with caching
* `src/scripts/fetchHistoricalWeather.ts`: Archive fetch + aggregation
* `src/utils/filterHelpers.ts`: Weather-based filtering
* `data/weather.json`: Persisted historical summary

**Frontend**

* `src/components/properties/Filters.tsx`: Filters UI (incl. `historyDuration`)
* `src/components/properties/PropertyCard.tsx`: Current + historical weather display
* `src/hooks/useProperties.ts`: React Query integration
* `src/lib/api/properties.ts`: API wrapper

---

## 🛠 Troubleshooting

* **Frontend shows no data:** Ensure backend is running at `http://localhost:5000` and `NEXT_PUBLIC_API_BASE` is correct.
* **CORS issues:** Backend allows `http://localhost:3000` by default. Adjust `src/index.ts` if needed.
* **Historical data missing:** Ensure `data/weather.json` is writable and server has fetched archive data at least once.

---

## 📌 Notes

* Open‑Meteo APIs require **no API key**.
* Prisma DB is **readonly** for assignment.
* Historical summaries are **precomputed** for performance.
* To extend filters for historical values, adjust `utils/filterHelpers.ts`.

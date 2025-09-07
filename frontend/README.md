# Frontend (Next.js) – Warden Assignment

A modern, lightweight **Next.js frontend** for browsing properties enriched with **current and historical weather data**. Users can search and filter properties, then view **temperature and humidity statistics** (min/max/avg) across different historical windows.

---

## 🚀 Tech Stack

* **Next.js 15 (App Router)** – frontend framework
* **React Query** – data fetching & caching
* **Chakra UI** – accessible UI components
* **TypeScript** – static typing

---

## ✨ Features

* 🔍 **Search** properties by name, city, or state
* 🎚️ **Filter** by:

  * Temperature & humidity ranges
  * Weather condition
  * Historical duration: **1m, 3m, 6m, 12m**
* 📊 **Property Card** showing:

  * Current weather (temperature, humidity, condition)
  * Historical stats (min/max/avg temperature & humidity)

---

## 📦 Prerequisites

* **Node.js 18+**
* Backend running at **[http://localhost:5000](http://localhost:5000)** (CORS enabled for [http://localhost:3000](http://localhost:3000))

---

## ⚙️ Environment Setup

Create a `.env.local` file in `frontend/`:

```bash
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

---

## 📜 Scripts

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Lint code
npm run lint

# Build production
npm run build

# Preview production build
npm run start
```

---

## 🔌 API Contract

**GET /get-properties**

**Query params:**

* `searchText`
* `minTemp`, `maxTemp`
* `minHumidity`, `maxHumidity`
* `weatherCondition`
* `historyDuration` (`1m | 3m | 6m | 12m`)

**Response:**
Array of properties with:

```ts
weather: {
  temperature: number,
  humidity: number,
  weatherCode: number,
  condition: string
},
weatherHistory: {
  avgTemp: number,
  minTemp: number,
  maxTemp: number,
  avgHumidity: number,
  minHumidity: number,
  maxHumidity: number
}
```

---

## 📂 Project Structure

```bash
src/
  app/                  # Next.js App Router pages
  components/
    properties/
      Filters.tsx       # Filters incl. historyDuration
      PropertyCard.tsx  # Property card with weather data
    layout/             # Shared layout components
    ui/                 # UI utilities (toaster, providers)
  hooks/
    useProperties.ts    # React Query hook for fetching
  lib/
    api/                # API client & endpoints
    constants/          # Weather condition + duration constants
  core/
    theme.ts            # Chakra UI theme config
  types/
    property.ts         # Property + filter types
    weather.ts          # Weather typings
```

---

## 🔄 How It Works

1. **Filters.tsx** manages filter state & emits `PropertyFilters`
2. **useProperties** fetches data with React Query
3. **PropertyCard.tsx** renders current + historical weather stats
4. **historyDuration** tells backend which historical slice to return

---

## 🛠️ Common Issues

* **Blank data** → Ensure backend is running & `NEXT_PUBLIC_API_BASE` is correct
* **CORS errors** → Backend must allow `http://localhost:3000`
* **History missing** → Backend must provide `weatherHistory[duration]`

---

## 📝 Development Notes

* Keep frontend filter keys **aligned** with backend query params
* Historical stats are **pre-computed** on backend (no client aggregation)
* React Query `staleTime = 5min` ensures snappy UI with minimal refetching

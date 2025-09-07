export const WEATHER_CONDITIONS = [
    { value: '', label: 'All Conditions' },
    { value: '0', label: 'Clear' },
    { value: '1,2,3', label: 'Cloudy' },
    { value: '51,52,53,54,55,56,57', label: 'Drizzle' },
    { value: '61,62,63,64,65,66,67,80,81,82', label: 'Rainy' },
    { value: '71,72,73,74,75,76,77,85,86', label: 'Snowy' },
] as const;

export const WEATHER_HISTORY_RANGE = [
    { value: '1m', label: 'Last 30 days' },
    { value: '3m', label: 'Last 3 months' },
    { value: '6m', label: 'Last 6 months' },
    { value: '12m', label: 'Last 12 months' },
] as const;
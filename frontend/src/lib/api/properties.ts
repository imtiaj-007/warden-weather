import { apiClient } from "./apiClient";
import { Property, PropertyFilters } from "@/types/property";


export const propertiesApi = {
    getProperties: async (filters: PropertyFilters = {}): Promise<Property[]> => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const response = await apiClient.get('/get-properties', { params });
        return response.data;
    },
};
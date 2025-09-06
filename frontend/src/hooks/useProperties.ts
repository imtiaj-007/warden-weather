'use client';

import { useQuery } from '@tanstack/react-query';
import { Property, PropertyFilters } from '@/types/property';
import { propertiesApi } from '@/lib/api/properties';


export const useProperties = (filters: PropertyFilters = {}) => {
    return useQuery<Property[], Error>({
        queryKey: ['properties', filters],
        queryFn: () => propertiesApi.getProperties(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
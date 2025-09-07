'use client';

import { useState } from 'react';
import {
	Box,
	Grid,
	GridItem,
	Skeleton,
	Text,
	Alert,
	Flex,
	Icon
} from '@chakra-ui/react';
import { IoAlert } from 'react-icons/io5';
import { Filters } from '@/components/properties/Filters';
import { PageContainer } from '@/components/layout/PageContainer';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { PropertyFilters } from '@/types/property';
import { FiSearch } from 'react-icons/fi';


export default function PropertiesPage() {
	const [filters, setFilters] = useState<PropertyFilters>({ historyDuration: '1m' });
	const { data: properties, isLoading, error, isError } = useProperties(filters);

	return (
		<PageContainer maxW="7xl">
			<Box textAlign="center" mb={8}>
				<Text as="h1" fontSize="3xl" fontWeight="bold" color="brand.600" mb={2}>
					Find Your Perfect Property
				</Text>
				<Text color="neutral.600" fontSize="lg">
					Search properties filtered by real-time weather conditions
				</Text>
			</Box>

			<Grid templateColumns={{ base: '1fr', md: '3fr 9fr' }} gap={8}>
				<GridItem>
					<Filters filters={filters} onFiltersChange={setFilters} isLoading={isLoading} />
				</GridItem>

				<GridItem>
					<Box>
						{isError && (
							<Alert.Root status="error" borderRadius="md" mb={6}>
								<IoAlert />
								<Box>
									<Alert.Title>Error loading properties</Alert.Title>
									<Alert.Description>
										{error?.message || 'Please try again later.'}
									</Alert.Description>
								</Box>
							</Alert.Root>
						)}

						<Grid
							templateColumns={{
								base: '1fr',
								md: 'repeat(2, 1fr)',
								lg: 'repeat(3, 1fr)',
							}}
							gap={6}
						>
							{isLoading
								? Array.from({ length: 6 }).map((_, index) => (
									<GridItem key={index}>
										<Skeleton height="200px" borderRadius="lg" />
									</GridItem>
								))
								: properties?.map((property) => (
									<GridItem key={property.id}>
										<PropertyCard property={property} />
									</GridItem>
								))}
						</Grid>

						{!isLoading && !isError && properties?.length === 0 && (
							<Box 
								textAlign="center" 
								py={12}
								borderWidth="1px"
								borderRadius="lg"
								borderColor="gray.200"
								p={6}
							>
								<Flex justifyContent="center" mb={4}>
									<Box 
										bg="gray.100" 
										p={3} 
										borderRadius="full"
										display="inline-flex"
									>
										<Icon as={FiSearch} boxSize={6} color="gray.500" />
									</Box>
								</Flex>
								<Text color="neutral.500" fontSize="lg">
									No properties found matching your criteria.
								</Text>
								<Text color="neutral.400" fontSize="sm" mt={2}>
									Try adjusting your filters or search terms.
								</Text>
							</Box>
						)}
					</Box>
				</GridItem>
			</Grid>
		</PageContainer>
	);
}
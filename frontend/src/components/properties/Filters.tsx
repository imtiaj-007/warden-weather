import { useState } from 'react';
import {
    Box,
    Input,
    Select,
    NumberInput,
    HStack,
    Text,
    Card,
    Portal,
    createListCollection,
    Button,
    ButtonGroup,
} from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import { WEATHER_CONDITIONS } from '@/lib/constants';
import { PropertyFilters } from '@/types/property';

interface FiltersProps {
    filters: PropertyFilters;
    onFiltersChange: (filters: PropertyFilters) => void;
    isLoading?: boolean;
}

export const Filters = ({ filters, onFiltersChange, isLoading }: FiltersProps) => {
    const [localFilters, setLocalFilters] = useState<PropertyFilters>(filters);

    const handleFilterChange = (key: keyof PropertyFilters, value: string | number) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
    };

    const handleApplyFilters = () => {
        onFiltersChange(localFilters);
    };

    const handleResetFilters = () => {
        const resetFilters = {};
        setLocalFilters(resetFilters);
        onFiltersChange(resetFilters);
    };

    const collection = createListCollection({ items: WEATHER_CONDITIONS });

    return (
        <Card.Root bg="white" shadow="sm" borderWidth="1px" borderColor="gray.100" padding={4}>
            <Card.Header paddingBottom={2} marginBottom={2} borderBottomWidth="1px">
                <Card.Title>Filters</Card.Title>
            </Card.Header>
            <Card.Body>
                <Box display="flex" flexDirection="column" gap={6}>
                    {/* Search Input */}
                    <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2} color="neutral.700">
                            Search Properties
                        </Text>
                        <Input
                            placeholder="Search by name, city, state..."
                            value={localFilters.searchText || ''}
                            onChange={(e) => handleFilterChange('searchText', e.target.value)}
                            bg="white"
                            borderColor="gray.200"
                            width="full"
                            padding={2}
                            _hover={{ borderColor: 'brand.300' }}
                            _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                        />
                    </Box>

                    {/* Temperature Range */}
                    <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2} color="neutral.700">
                            Temperature Range (°C)
                        </Text>
                        <HStack spaceX={3}>
                            <NumberInput.Root
                                value={localFilters.minTemp?.toString() ?? ''}
                                onValueChange={(e) => handleFilterChange('minTemp', e.valueAsNumber)}
                                min={-20}
                                max={50}
                                step={0.1}
                                bg="white"
                                borderColor="gray.200"
                                _hover={{ borderColor: 'brand.300' }}
                                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                            >
                                <NumberInput.Input placeholder="Min" padding={2} />
                                <NumberInput.Control>
                                    <NumberInput.IncrementTrigger />
                                    <NumberInput.DecrementTrigger />
                                </NumberInput.Control>
                            </NumberInput.Root>
                            <Text color="gray.500">to</Text>
                            <NumberInput.Root
                                value={localFilters.maxTemp?.toString() ?? ''}
                                onValueChange={(e) => handleFilterChange('maxTemp', e.valueAsNumber)}
                                min={-20}
                                max={50}
                                step={0.1}
                                bg="white"
                                borderColor="gray.200"
                                _hover={{ borderColor: 'brand.300' }}
                                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                            >
                                <NumberInput.Input placeholder="Max" padding={2} />
                                <NumberInput.Control>
                                    <NumberInput.IncrementTrigger />
                                    <NumberInput.DecrementTrigger />
                                </NumberInput.Control>
                            </NumberInput.Root>
                        </HStack>
                    </Box>

                    {/* Humidity Range */}
                    <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2} color="neutral.700">
                            Humidity Range (%)
                        </Text>
                        <HStack spaceX={3}>
                            <NumberInput.Root
                                value={localFilters.minHumidity?.toString() ?? ''}
                                onValueChange={(e) => handleFilterChange('minHumidity', e.valueAsNumber)}
                                min={0}
                                max={100}
                                bg="white"
                                borderColor="gray.200"
                                _hover={{ borderColor: 'brand.300' }}
                                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                            >
                                <NumberInput.Input placeholder="Min" padding={2} />
                                <NumberInput.Control>
                                    <NumberInput.IncrementTrigger />
                                    <NumberInput.DecrementTrigger />
                                </NumberInput.Control>
                            </NumberInput.Root>
                            <Text color="gray.500">to</Text>
                            <NumberInput.Root
                                value={localFilters.maxHumidity?.toString() ?? ''}
                                onValueChange={(e) => handleFilterChange('maxHumidity', e.valueAsNumber)}
                                min={0}
                                max={100}
                                bg="white"
                                borderColor="gray.200"
                                _hover={{ borderColor: 'brand.300' }}
                                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                            >
                                <NumberInput.Input placeholder="Max" padding={2} />
                                <NumberInput.Control>
                                    <NumberInput.IncrementTrigger />
                                    <NumberInput.DecrementTrigger />
                                </NumberInput.Control>
                            </NumberInput.Root>
                        </HStack>
                    </Box>

                    {/* Weather Condition */}
                    <Box>
                        <Select.Root
                            collection={collection}
                            value={localFilters.weatherCondition ? [localFilters.weatherCondition] : []}
                            onValueChange={(e) => handleFilterChange('weatherCondition', e.value[0])}
                            size="sm"
                            width="100%"
                        >
                            <Select.HiddenSelect />
                            <Select.Label>Weather Condition</Select.Label>
                            <Select.Control>
                                <Select.Trigger padding={2}
                                    _hover={{ borderColor: 'brand.300' }}
                                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                                >
                                    <Select.ValueText placeholder="Select weather condition" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator
                                        _hover={{ color: 'brand.500' }}
                                    />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content padding={2}
                                        _hover={{ borderColor: 'brand.300' }}
                                    >
                                        {collection.items.map((condition) => (
                                            <Select.Item item={condition} key={condition.value} marginY={1}
                                                _hover={{ bg: 'brand.50' }}
                                                _focus={{ bg: 'brand.100' }}
                                            >
                                                {condition.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Box>

                    {/* Action Buttons */}
                    <ButtonGroup ml="auto">
                        <Button
                            size='sm'
                            variant="solid"
                            colorScheme="brand"
                            px={4}
                            onClick={handleApplyFilters}
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            <FiFilter /> Apply Filters
                        </Button>
                        <Button
                            size='sm'
                            variant="outline"
                            px={4}
                            onClick={handleResetFilters}
                            disabled={isLoading}
                        >
                            Reset
                        </Button>
                    </ButtonGroup>
                </Box>
            </Card.Body>
        </Card.Root>
    );
};
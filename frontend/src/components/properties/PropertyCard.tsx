import {
    Card,
    Stack,
    Heading,
    Text,
    Tag,
    HStack,
    Box,
    Badge,
    Flex,
    Icon,
    Table,
} from '@chakra-ui/react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDaySprinkle } from 'react-icons/wi';
import { FiDroplet, FiThermometer } from 'react-icons/fi';
import { Property } from '@/types/property';

const getWeatherIcon = (condition: string) => {
    switch (condition) {
        case 'clear':
            return WiDaySunny;
        case 'cloudy':
            return WiCloudy;
        case 'rainy':
            return WiRain;
        case 'snow':
            return WiSnow;
        case 'drizzle':
            return WiDaySprinkle;
        default:
            return WiDaySunny;
    }
};

interface PropertyCardProps {
    property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
    const WeatherIcon = getWeatherIcon(property.weather.condition);

    return (
        <Card.Root
            bg="bg"
            shadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="xl"
            overflow="hidden"
            _hover={{
                shadow: "md",
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease',
            }}
            transition="all 0.3s ease"
            height="100%"
        >
            <Box position="relative" height="160px" bgGradient="linear(to-r, brand.300, brand.500)">
                <Flex
                    position="absolute"
                    top="2"
                    right="2"
                    bg="white"
                    px="2"
                    py="1"
                    borderRadius="md"
                    alignItems="center"
                >
                    <Badge colorPalette={property.isActive ? "green" : "red"} variant="solid" px={2} py={1}>
                        {property.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                </Flex>
                <Flex
                    position="absolute"
                    bottom="2"
                    right="2"
                    bg="white"
                    px="2"
                    py="1"
                    borderRadius="md"
                    alignItems="center"
                >
                    <Stack gap={0.5}>
                        <Flex alignItems="center" gap={2}>
                            <Icon as={WeatherIcon} boxSize={5} color="blue.500" />
                            <Text fontSize="sm" color="neutral.700" textTransform="capitalize">
                                {property.weather.condition}
                            </Text>
                        </Flex>
                        <Flex alignItems="center" gap={2}>
                            <Icon as={FiThermometer} boxSize={5} color="red.500" />
                            <Text fontSize="sm" color="neutral.700">
                                {property.weather.temperature} °C
                            </Text>
                        </Flex>
                        <Flex alignItems="center" gap={2}>
                            <Icon as={FiDroplet} boxSize={5} color="blue.500" />
                            <Text fontSize="sm" color="neutral.700">
                                {property.weather.humidity} %
                            </Text>
                        </Flex>
                    </Stack>
                </Flex>
            </Box>

            <Card.Body p={4}>
                <Stack gap={4}>
                    <Box>
                        <Heading size="md" color="accent.500" mb={1} truncate>
                            {property.name}
                        </Heading>
                        <Flex alignItems="center">
                            <Text fontSize="sm" color="neutral.500" lineClamp={3}>
                                {[property.city, property.state, property.country].filter(Boolean).join(', ')}
                            </Text>
                        </Flex>
                    </Box>

                    {property.tags && property.tags.length > 0 && (
                        <HStack align="start" flexWrap="wrap" h={10}>
                            {property.tags.slice(0, 3).map((tag, index) => (
                                <Tag.Root
                                    key={index}
                                    size="sm"
                                    colorScheme="blue"
                                    px={2}
                                >
                                    <Tag.Label>{tag}</Tag.Label>
                                </Tag.Root>
                            ))}
                        </HStack>
                    )}

                    {property.weatherHistory &&
                        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Table.Root size="sm" variant="outline" colorScheme="gray">
                                <Table.Header bg="gray.100">
                                    <Table.Row>
                                        <Table.ColumnHeader p={1} fontWeight="semibold" color="gray.700"></Table.ColumnHeader>
                                        <Table.ColumnHeader p={1} fontWeight="semibold" color="gray.700" textAlign="center">
                                            <Flex align="center" justify="center" gap={1}>
                                                <Icon as={FiThermometer} color="red.500" />
                                                Temperature
                                            </Flex>
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader p={1} fontWeight="semibold" color="gray.700" textAlign="center">
                                            <Flex align="center" justify="center" gap={1}>
                                                <Icon as={FiDroplet} color="blue.500" />
                                                Humidity
                                            </Flex>
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell p={1} fontWeight="medium">Min</Table.Cell>
                                        <Table.Cell p={1} textAlign="center">{property.weatherHistory?.minTemp?.toFixed(1)} °C</Table.Cell>
                                        <Table.Cell p={1} textAlign="center">{property.weatherHistory?.minHumidity?.toFixed(1)} %</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell p={1} fontWeight="medium">Max</Table.Cell>
                                        <Table.Cell p={1} textAlign="center">{property.weatherHistory?.maxTemp?.toFixed(1)} °C</Table.Cell>
                                        <Table.Cell p={1} textAlign="center">{property.weatherHistory?.maxHumidity?.toFixed(1)} %</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell p={1} fontWeight="medium">Avg</Table.Cell>
                                        <Table.Cell p={1} textAlign="center">{property.weatherHistory?.avgTemp?.toFixed(1)} °C</Table.Cell>
                                        <Table.Cell p={1} textAlign="center">{property.weatherHistory?.avgHumidity?.toFixed(1)} %</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    }

                    <Text fontSize="xs" fontWeight={500} color="neutral.500">
                        Added: {new Date(property.createdAt).toLocaleDateString()}
                    </Text>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};
import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Header = () => {
    return (
        <Box as="header" bg="bg" borderBottomWidth="1px" borderBottomColor="border" px={4} py={4}>
            <HStack justify="space-between" align="center">
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Heading as="h1" size="lg" color="brand.500">
                        Warden Weather
                    </Heading>
                </Link>
                <Text fontSize="sm" color="neutral.600">
                    Find your perfect property, in perfect weather
                </Text>
            </HStack>
        </Box>
    );
};
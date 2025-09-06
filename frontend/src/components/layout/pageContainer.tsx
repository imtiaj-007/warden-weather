import { ReactNode } from 'react';
import { Container, Box } from '@chakra-ui/react';

interface PageContainerProps {
    children: ReactNode;
    maxW?: string;
}

export const PageContainer = ({
    children,
    maxW = 'container.xl'
}: PageContainerProps) => {
    return (
        <Container maxW={maxW} py={8} px={{ base: 4, md: 8 }}>
            <Box>{children}</Box>
        </Container>
    );
};
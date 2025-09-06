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
        <Container maxW={maxW} p={4} marginX={'auto'}>
            <Box>{children}</Box>
        </Container>
    );
};
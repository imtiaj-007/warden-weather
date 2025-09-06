"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './header';
import { PageContainer } from './pageContainer';

interface AppLayoutProps {
    children: ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
        },
    },
});

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <Box minH="100vh" bg="bg" color="fg">
            <QueryClientProvider client={queryClient}>
                <Header />
                <PageContainer>
                    {children}
                </PageContainer>
            </QueryClientProvider>
        </Box>
    );
};
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    // Global styles
    globalCss: {
        "html, body": {
            bg: "gray.50",
            color: "gray.800",
            fontSize: "16px",
            lineHeight: "1.6",
        },
        a: {
            color: "teal.500",
            _hover: {
                textDecoration: "underline",
                color: "teal.600",
            },
        },
    },

    // System theme
    theme: {        
        tokens: {
            fonts: {
                heading: { value: "Poppins, sans-serif" },
                body: { value: "Inter, sans-serif" },
            },
            colors: {
                brand: {
                    50: { value: "#E6FFFA" },
                    100: { value: "#B2F5EA" },
                    200: { value: "#81E6D9" },
                    300: { value: "#4FD1C5" },
                    400: { value: "#38B2AC" },
                    500: { value: "#319795" }, // primary teal
                    600: { value: "#2C7A7B" },
                    700: { value: "#285E61" },
                    800: { value: "#234E52" },
                    900: { value: "#1D4044" },
                },
                accent: {
                    100: { value: "#EBF4FF" },
                    200: { value: "#C3DAFE" },
                    300: { value: "#A3BFFA" },
                    400: { value: "#7F9CF5" },
                    500: { value: "#5A67D8" }, // indigo accent
                    600: { value: "#4C51BF" },
                    700: { value: "#434190" },
                    800: { value: "#3C366B" },
                    900: { value: "#2A2549" },
                },
                neutral: {
                    50: { value: "#F9FAFB" },
                    100: { value: "#F3F4F6" },
                    200: { value: "#E5E7EB" },
                    300: { value: "#D1D5DB" },
                    400: { value: "#9CA3AF" },
                    500: { value: "#6B7280" },
                    600: { value: "#4B5563" },
                    700: { value: "#374151" },
                    800: { value: "#1F2937" },
                    900: { value: "#111827" },
                },
            },
        },
    },
})

// Create the system with custom config
export const system = createSystem(defaultConfig, customConfig)

export default system
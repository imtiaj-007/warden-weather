import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import "./globals.css";
import AppLayout from "@/components/layout";

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-body',
});

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-heading',
});

export const metadata: Metadata = {
	title: 'Warden Weather - Property Search',
	description: 'Find properties based on weather conditions',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} ${poppins.variable} antialiased`}>
				<Provider>
					<AppLayout>
						{children}
					</AppLayout>
				</Provider>
			</body>
		</html>
	);
}

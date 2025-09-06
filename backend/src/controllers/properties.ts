import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";
import { getWeather } from "../services/weatherService";
import { applyWeatherFilters } from "../utils/filterHelpers";
import { WeatherFilter } from "../types/filters";
import { PropertyWithWeather, WeatherCondition } from "../types/weather";

/**
 * Helper: Build search query for Prisma
 */
function buildPropertyWhere(req: Request): Prisma.PropertyWhereInput | undefined {
	const { searchText } = req.query;

	if (typeof searchText !== "string") {
		return undefined;
	}

	if (!searchText || searchText.trim().length === 0) {
		return undefined;
	}

	const query = searchText.trim();

	return {
		OR: [
			{ name: { contains: query } },
			{ city: { contains: query } },
			{ state: { contains: query } },
		],
	};
}

/**
 * Controller: Get properties with optional filters
 */
export const getProperties = async (req: Request, res: Response) => {
	try {
		const {
			minTemp,
			maxTemp,
			minHumidity,
			maxHumidity,
			conditions,
		} = req.query;

		// Build weather filters
		const filters: WeatherFilter = {
			minTemp: minTemp ? Number(minTemp) : undefined,
			maxTemp: maxTemp ? Number(maxTemp) : undefined,
			minHumidity: minHumidity ? Number(minHumidity) : undefined,
			maxHumidity: maxHumidity ? Number(maxHumidity) : undefined,
			conditions: conditions
				? Array.isArray(conditions)
					? (conditions as WeatherCondition[])
					: [(conditions as WeatherCondition)]
				: [],
		};

		// Step 1: Get properties from DB
		const properties = await prisma.property.findMany({
			take: 20,
			where: buildPropertyWhere(req),
		});

		// Step 2: Enrich with weather data
		const withWeather: PropertyWithWeather[] = await Promise.all(
			properties.map(async (p) => {
				const weather = await getWeather(p.lat!, p.lng!);
				return { ...p, weather };
			})
		);

		// Step 3: Apply weather filters
		const filtered = applyWeatherFilters(withWeather, filters);

		return res.json(filtered);
	} catch (error) {
		console.error("Error fetching properties:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

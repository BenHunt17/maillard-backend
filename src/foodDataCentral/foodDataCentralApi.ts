import dotenv from "dotenv";
import { FoodDataCentralSearchResultType } from "./types/foodDataCentralSearchResultType";
import { FoodDataCentralAbridgedFoodItem } from "./types/foodDataCentralAbridgedFoodItem";
import fetch from "cross-fetch";

dotenv.config();

export async function foodDataCentralApiSearch(
  searchTerm: string,
  offset: number,
  limit: number
): Promise<FoodDataCentralSearchResultType | null> {
  const queryParams = new URLSearchParams({
    api_key: process.env.FOOD_DATA_CENTRAL_API_KEY || "",
    query: searchTerm,
    dataType: "SR Legacy",
    pageNumber: String(offset),
    pageSize: String(limit),
  });
  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?${queryParams.toString()}`
    );
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function foodDataCentralApiFoods(
  foodIds: string[]
): Promise<FoodDataCentralAbridgedFoodItem[] | null> {
  const queryParams = new URLSearchParams({
    api_key: process.env.FOOD_DATA_CENTRAL_API_KEY || "",
    fdcIds: foodIds.join(","),
    format: "abridged",
  });
  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods?${queryParams.toString()}`
    );
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

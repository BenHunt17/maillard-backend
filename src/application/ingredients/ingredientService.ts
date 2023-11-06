import { foodDataCentralApiSearch } from "../../foodDataCentral/foodDataCentralApi";

export async function ingredientsServiceSearch(
  searchTerm: string,
  offset: number,
  limit: number
) {
  const ingredients = await foodDataCentralApiSearch(searchTerm, offset, limit);

  return ingredients;
}

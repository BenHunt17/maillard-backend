import { IngredientSearchResult } from "../../domain/types/ingredient/ingredientSearchResult";
import { FoodDataCentralSearchResultType } from "./foodDataCentralSearchResultType";

export function foodDataCentralSearchResultToDomainType(
  data: FoodDataCentralSearchResultType
): IngredientSearchResult[] {
  return (
    data.foods?.map((food) => ({
      externalId: String(food.fdcId),
      name: food.description,
    })) ?? []
  );
}

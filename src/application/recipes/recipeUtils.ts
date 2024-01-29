import { Nutrient } from "../../domain/types/recipe/nutrient";
import { Ingredient } from "../../domain/types/recipe/ingredient";
import { foodDataCentralApiFoods } from "../../foodDataCentral/foodDataCentralApi";

export async function getCollectiveNutrients(ingredients: Ingredient[]) {
  if (ingredients.length === 0) {
    return [];
  }

  const foodIds = ingredients.map((ingredient) => ingredient.externalId);

  const foods = await foodDataCentralApiFoods(foodIds);
  if (!foods) {
    return [];
  }

  return foods.reduce<Nutrient[]>((acc, curr) => {
    curr.foodNutrients?.forEach((foodNutrient) => {
      if (
        !(
          foodNutrient.number &&
          foodNutrient.name &&
          foodNutrient.amount &&
          foodNutrient.unitName
        )
      ) {
        return [];
      }

      const quantity =
        ingredients.find(
          (ingredient) => ingredient.externalId === curr.fdcId.toString()
        )?.quantity ?? DEFAULT_QUANTITY_G;
      const amount = foodNutrient.amount * (quantity / DEFAULT_QUANTITY_G);

      const existingNutrientIdx = acc.findIndex(
        (nutrient) => nutrient.number === foodNutrient.number
      );
      if (acc[existingNutrientIdx]) {
        acc[existingNutrientIdx].value += foodNutrient.amount;
      } else {
        acc.push({
          number: foodNutrient.number,
          name: foodNutrient.name,
          value: amount,
          unitName: foodNutrient.unitName,
        });
      }
    });
    return acc;
  }, []);
}

const DEFAULT_QUANTITY_G = 100;

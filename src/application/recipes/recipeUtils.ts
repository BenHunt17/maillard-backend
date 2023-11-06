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
        !(foodNutrient.name && foodNutrient.amount && foodNutrient.unitName)
      ) {
        return [];
      }

      const existingNutrientIdx = acc.findIndex(
        (nutrient) => nutrient.name === foodNutrient.name
      );
      if (acc[existingNutrientIdx]) {
        acc[existingNutrientIdx].value += foodNutrient.amount;
      } else {
        acc.push({
          name: foodNutrient.name,
          value: foodNutrient.amount,
          unitName: foodNutrient.unitName,
        });
      }
    });
    return acc;
  }, []);
}

import { Ingredient } from "../../../../domain/types/recipe/ingredient";
import { IngredientInput } from "./ingredientInput";

export function mapIngredientInputToIngredient(
  ingredientInput: IngredientInput
): Ingredient {
  return {
    id: "",
    name: ingredientInput.name,
    quantity: ingredientInput.quantity,
    displayLabel: ingredientInput.displayLabel,
    externalId: ingredientInput.externalId,
  };
}

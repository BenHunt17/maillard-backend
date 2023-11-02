import { ObjectId } from "mongodb";
import { Ingredient } from "../../../domain/types/recipe/ingredient";
import { IngredientModel } from "./ingredientModel";

export function mapIngredientModelToIngredient(
  ingredientModel: IngredientModel
): Ingredient {
  return {
    id: ingredientModel.id.toHexString(),
    name: ingredientModel.name,
    quantity: ingredientModel.quantity,
    displayLabel: ingredientModel.displayLabel ?? undefined,
    externalId: ingredientModel.externalId,
  };
}

export function mapIngredientToIngredientModel(
  ingredient: Ingredient
): IngredientModel {
  return {
    id: new ObjectId(),
    name: ingredient.name,
    quantity: ingredient.quantity,
    displayLabel: ingredient.displayLabel ?? null,
    externalId: ingredient.externalId,
  };
}

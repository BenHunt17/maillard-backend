import { Recipe } from "../../../domain/types/recipe/recipe";
import { RecipeCreateInput } from "./recipeCreateInput";

export function mapRecipeCreateInputToRecipe(
  recipeCreateInput: RecipeCreateInput
): Recipe {
  return {
    id: "",
    name: recipeCreateInput.name,
    creationDate: new Date(),
    imageUrl: undefined,
    description: recipeCreateInput.description,
    ingredients: [],
    instructions: [],
    data: recipeCreateInput.data,
    nutrients: [],
  };
}

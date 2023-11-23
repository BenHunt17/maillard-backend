import { Recipe } from "../../types/recipe/recipe";
import { AbridgedRecipe } from "./abridgedRecipe";

export function mapRecipeToAbridgedRecipe(recipe: Recipe): AbridgedRecipe {
  return {
    id: recipe.id,
    name: recipe.name,
    imageUrl: recipe.imageUrl,
    creationDate: recipe.creationDate,
  };
}

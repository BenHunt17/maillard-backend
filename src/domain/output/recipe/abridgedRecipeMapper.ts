import { Recipe } from "../../types/recipe/recipe";

export function mapRecipeToAbridgedRecipe(recipe: Recipe): AbridgedRecipe {
  return {
    id: recipe.id,
    name: recipe.name,
    imageUrl: recipe.imageUrl,
    creationDate: recipe.creationDate,
  };
}

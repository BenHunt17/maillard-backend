import { ObjectId, WithId } from "mongodb";
import { Recipe } from "../../domain/types/recipe/recipe";
import { RecipeModel } from "./recipeModel";
import {
  mapIngredientModelToIngredient,
  mapIngredientToIngredientModel,
} from "./ingredient/ingredientModelMapper";
import {
  mapInstructionModelToInstruction,
  mapInstructionToInstructionModel,
} from "./instruction/instructionModelMapper";

export function mapRecipeModelToRecipe(
  recipeModel: WithId<RecipeModel>
): Recipe {
  return {
    id: recipeModel._id.toHexString(),
    name: recipeModel.name,
    creationDate: recipeModel.creationDate,
    imageUrl: recipeModel.imageUrl ?? undefined,
    description: recipeModel.description ?? undefined,
    ingredients: recipeModel.ingredients.map((ingredientModel) =>
      mapIngredientModelToIngredient(ingredientModel)
    ),
    instructions: recipeModel.instructions.map((instructionModel) =>
      mapInstructionModelToInstruction(instructionModel)
    ),
    data: recipeModel.data,
    nutrients: [],
  };
}

export function mapRecipeToRecipeModel(recipe: Recipe): WithId<RecipeModel> {
  return {
    _id: new ObjectId(),
    name: recipe.name,
    creationDate: recipe.creationDate,
    imageUrl: recipe.imageUrl ?? null,
    description: recipe.description ?? null,
    ingredients: recipe.ingredients.map((ingredient) =>
      mapIngredientToIngredientModel(ingredient)
    ),
    instructions: recipe.instructions.map((instruction) =>
      mapInstructionToInstructionModel(instruction)
    ),
    data: recipe.data,
  };
}

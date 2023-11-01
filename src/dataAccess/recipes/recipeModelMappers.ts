import { ObjectId, WithId } from "mongodb";
import { Recipe } from "../../domain/types/recipe/recipe";
import { RecipeModel } from "./recipeModel";
import { Ingredient } from "../../domain/types/recipe/ingredient";
import { Instruction } from "../../domain/types/recipe/instruction";

export function mapRecipeModelToRecipe(
  recipeModel: WithId<RecipeModel>
): Recipe {
  return {
    id: recipeModel._id.toHexString(),
    name: recipeModel.name,
    creationDate: recipeModel.creationDate,
    imageUrl: recipeModel.imageUrl,
    description: recipeModel.description,
    ingredients: recipeModel.ingredients.map((ingredientModel) => ({
      id: ingredientModel.id.toHexString(),
      name: ingredientModel.name,
      quantity: ingredientModel.quantity,
      displayLabel: ingredientModel.displayLabel,
      externalId: ingredientModel.externalId,
    })),
    instructions: recipeModel.instructions.map((instructionModel) => ({
      id: instructionModel.id.toHexString(),
      priorityNumber: instructionModel.priorityNumber,
      step: instructionModel.step,
    })),
    data: recipeModel.data,
    nutrients: [],
  };
}

export function mapRecipeToRecipeModel(recipe: Recipe): WithId<RecipeModel> {
  return {
    _id: new ObjectId(),
    name: recipe.name,
    creationDate: recipe.creationDate,
    imageUrl: recipe.imageUrl,
    description: recipe.description,
    ingredients: recipe.ingredients.map((ingredient) =>
      mapIngredientToIngredientModel(ingredient)
    ),
    instructions: recipe.instructions.map((instruction) =>
      mapInstructionToInstructionModel(instruction)
    ),
    data: recipe.data,
  };
}

export function mapIngredientToIngredientModel(ingredient: Ingredient) {
  return {
    id: new ObjectId(),
    name: ingredient.name,
    quantity: ingredient.quantity,
    displayLabel: ingredient.displayLabel,
    externalId: ingredient.externalId,
  };
}

export function mapInstructionToInstructionModel(instruction: Instruction) {
  return {
    id: new ObjectId(),
    priorityNumber: instruction.priorityNumber,
    step: instruction.step,
  };
}

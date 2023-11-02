import {
  recipesDataAccessCreate,
  recipesDataAccessDelete,
  recipesDataAccessFind,
  recipesDataAccessGet,
  recipesDataAccessUpdate,
  recipesDataAccessUpdateImageUrl,
  recipesDataAccessUpdateIngredients,
  recipesDataAccessUpdateInstructions,
} from "../../dataAccess/recipe/recipesDataAccess";
import { azureBlobStorageUpload } from "../../azureBlobStorage/azureBlobStorageUpload";
import { azureBlobStorageDelete } from "../../azureBlobStorage/azureBlobStorageDelete";
import { ImageFile } from "../../domain/types/common/imageFile";
import { ApiError } from "../../domain/types/common/apiError";
import { RecipeCreateInput } from "../../restApi/input/recipe/recipeCreateInput";
import { RecipeUpdateInput } from "../../restApi/input/recipe/recipeUpdateInput";
import { mapRecipeCreateInputToRecipe } from "../../restApi/input/recipe/recipeCreateInputMapper";
import { mapIngredientInputToIngredient } from "../../restApi/input/recipe/ingredient/ingredientInputMapper";
import { IngredientInput } from "../../restApi/input/recipe/ingredient/ingredientInput";
import { InstructionInput } from "../../restApi/input/recipe/instruction/instructionInput";
import { mapInstructionInputToInstruction } from "../../restApi/input/recipe/instruction/instructionInputMapper";
import { RecipeSearchInput } from "../../restApi/input/recipe/recipeSearchInput";
import { mapItemsToPaginatedResponse } from "../../domain/types/pagination/paginationResponseMapper";
import { mapRecipeToAbridgedRecipe } from "../../domain/output/recipe/abridgedRecipeMapper";
import { getCollectiveNutrients } from "./recipeUtils";

export async function recipeServiceSearch(
  recipeSearchInput: RecipeSearchInput
) {
  const recipesPagination = await recipesDataAccessFind(
    recipeSearchInput.searchTerm,
    recipeSearchInput.offset,
    recipeSearchInput.limit
  );

  return mapItemsToPaginatedResponse(
    recipesPagination.items.map((recipe) => mapRecipeToAbridgedRecipe(recipe)),
    recipesPagination.offset,
    recipesPagination.total
  );
}

export async function recipeServiceGet(id: string) {
  const recipe = await recipesDataAccessGet(id);
  recipe.nutrients = await getCollectiveNutrients(recipe.ingredients);

  return recipe;
}

export async function recipeServiceCreate(
  recipeCreateInput: RecipeCreateInput
) {
  const recipe = mapRecipeCreateInputToRecipe(recipeCreateInput);
  const newRecipe = await recipesDataAccessCreate(recipe);
  newRecipe.nutrients = await getCollectiveNutrients(newRecipe.ingredients);

  return newRecipe;
}

export async function recipeServiceUpdate(
  id: string,
  recipeUpdateInput: RecipeUpdateInput
) {
  const updatedRecipe = await recipesDataAccessUpdate(id, recipeUpdateInput);
  updatedRecipe.nutrients = await getCollectiveNutrients(
    updatedRecipe.ingredients
  );

  return updatedRecipe;
}

export async function recipeServiceUpdateIngredients(
  id: string,
  ingredientsInput: IngredientInput[]
) {
  const ingredients = ingredientsInput.map((ingredient) =>
    mapIngredientInputToIngredient(ingredient)
  );
  const updatedRecipe = await recipesDataAccessUpdateIngredients(
    id,
    ingredients
  );
  updatedRecipe.nutrients = await getCollectiveNutrients(
    updatedRecipe.ingredients
  );

  return updatedRecipe;
}

export async function recipeServiceUpdateInstructions(
  id: string,
  instructionsInput: InstructionInput[]
) {
  const instructions = instructionsInput.map((instruction) =>
    mapInstructionInputToInstruction(instruction)
  );
  const updatedRecipe = await recipesDataAccessUpdateInstructions(
    id,
    instructions
  );
  updatedRecipe.nutrients = await getCollectiveNutrients(
    updatedRecipe.ingredients
  );

  return updatedRecipe;
}

export async function recipeServiceUpdateImage(
  id: string,
  imageFile: ImageFile
) {
  const recipe = await recipesDataAccessGet(id);
  const imageUrl = await azureBlobStorageUpload(
    `recipes/${recipe.name}`,
    imageFile
  );

  const updatedRecipe = await recipesDataAccessUpdateImageUrl(id, imageUrl);
  updatedRecipe.nutrients = await getCollectiveNutrients(
    updatedRecipe.ingredients
  );

  return updatedRecipe;
}

export async function recipeServiceDeleteImage(id: string) {
  const recipe = await recipesDataAccessGet(id);
  if (!azureBlobStorageDelete(`recipes/${recipe.name}`)) {
    throw new ApiError(
      `No file for recipe with id ${id} exists in blob storage`,
      404
    );
  }

  const updatedRecipe = await recipesDataAccessUpdateImageUrl(id, null);
  updatedRecipe.nutrients = await getCollectiveNutrients(
    updatedRecipe.ingredients
  );

  return updatedRecipe;
}

export async function recipeServiceDelete(id: string) {
  const recipe = await recipesDataAccessDelete(id);
  recipe.nutrients = await getCollectiveNutrients(recipe.ingredients);

  return recipe;
}

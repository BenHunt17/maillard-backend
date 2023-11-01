import { ObjectId, UpdateFilter, WithId } from "mongodb";
import { Recipe } from "../../domain/types/recipe/recipe";
import { RecipeModel } from "./recipeModel";
import { getDb } from "../dbConfig";
import { PaginatedResponse } from "../../domain/types/pagination/paginatedResponse";
import { Ingredient } from "../../domain/types/recipe/ingredient";
import { Instruction } from "../../domain/types/recipe/instruction";
import { ApiError } from "../../domain/types/common/apiError";
import { mapItemsToPaginatedResponse } from "../../domain/types/pagination/paginationResponseMapper";
import {
  mapIngredientToIngredientModel,
  mapInstructionToInstructionModel,
  mapRecipeModelToRecipe,
  mapRecipeToRecipeModel,
} from "./recipeModelMappers";

export async function recipesDataAccessFind(
  searchTerm: string,
  offset: number,
  limit: number
): Promise<PaginatedResponse<Recipe>> {
  const recipesCollection = await getRecipesCollection();

  const filter = {
    $text: {
      $search: searchTerm,
    },
  };
  const options = {
    skip: offset,
    limit: limit,
  };
  const recipeModels = await recipesCollection.find(filter, options).toArray();

  const total = await recipesCollection.countDocuments(filter);
  const recipes = recipeModels.map((recipeModel) =>
    mapRecipeModelToRecipe(recipeModel)
  );

  return mapItemsToPaginatedResponse(recipes, offset, total);
}

export async function recipesDataAccessGet(id: string): Promise<Recipe> {
  const recipesCollection = await getRecipesCollection();

  const recipeModel = await recipesCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!recipeModel) {
    throw new ApiError(`Could not find recipe with id ${id} in db`, 404);
  }

  return mapRecipeModelToRecipe(recipeModel);
}

export async function recipesDataAccessCreate(recipe: Recipe): Promise<Recipe> {
  const recipesCollection = await getRecipesCollection();
  const recipeModel = mapRecipeToRecipeModel(recipe);

  await recipesCollection.insertOne(recipeModel);

  return mapRecipeModelToRecipe(recipeModel);
}

export async function recipesDataAccessUpdate(
  id: string,
  input: { name: string; description: string; data: Recipe["data"] }
): Promise<Recipe> {
  const updateFilter = {
    $set: input,
  };
  const updatedRecipe = await updateRecipe(id, updateFilter);

  return updatedRecipe;
}

export async function recipesDataAccessUpdateIngredients(
  id: string,
  ingredients: Ingredient[]
): Promise<Recipe> {
  const updateFilter = {
    $set: {
      ingredients: ingredients.map((ingredient) =>
        mapIngredientToIngredientModel(ingredient)
      ),
    },
  };
  const updatedRecipe = await updateRecipe(id, updateFilter);

  return updatedRecipe;
}

export async function recipesDataAccessUpdateInstructions(
  id: string,
  instructions: Instruction[]
): Promise<Recipe> {
  const updateFilter = {
    $set: {
      instructions: instructions.map((instruction) =>
        mapInstructionToInstructionModel(instruction)
      ),
    },
  };
  const updatedRecipe = await updateRecipe(id, updateFilter);

  return updatedRecipe;
}

export async function recipesDataAccessUpdateImageUrl(
  id: string,
  imageUrl: string | null
): Promise<Recipe> {
  const updateFilter = {
    $set: {
      imageUrl,
    },
  };
  const updatedRecipe = await updateRecipe(id, updateFilter);

  return updatedRecipe;
}

export async function recipesDataAccessDelete(id: string): Promise<Recipe> {
  const recipesCollection = await getRecipesCollection();
  const recipe = await recipesDataAccessGet(id);

  await recipesCollection.deleteOne({ _id: new ObjectId(id) });

  return recipe;
}

async function updateRecipe(
  id: string,
  updateFilter: UpdateFilter<RecipeModel>
): Promise<Recipe> {
  const recipesCollection = await getRecipesCollection();

  const updatedRecipe = await recipesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    updateFilter,
    { returnDocument: "after" }
  );
  if (!updatedRecipe) {
    throw new ApiError(`Could not find/update recipe with id ${id} in db`, 404);
  }

  return mapRecipeModelToRecipe(updatedRecipe);
}

async function getRecipesCollection() {
  const db = await getDb();
  return db.collection<RecipeModel>("recipes");
}
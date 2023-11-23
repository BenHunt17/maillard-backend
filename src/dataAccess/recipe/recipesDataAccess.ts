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
  mapRecipeModelToRecipe,
  mapRecipeToRecipeModel,
} from "./recipeModelMappers";
import { mapIngredientToIngredientModel } from "./ingredient/ingredientModelMapper";
import { mapInstructionToInstructionModel } from "./instruction/instructionModelMapper";

export async function recipesDataAccessSearch(
  searchTerm: string,
  offset: number,
  limit: number
): Promise<PaginatedResponse<Recipe>> {
  const recipesCollection = await getRecipesCollection();

  const agg = [
    {
      $search: {
        index: "searchName",
        text: {
          query: searchTerm,
          path: {
            wildcard: "*",
          },
          fuzzy: {},
        },
      },
    },
    {
      $facet: {
        recipes: [
          {
            $skip: offset,
          },
          {
            $limit: limit,
          },
        ],
        total: [{ $count: "total" }],
      },
    },
  ];

  const result = (
    await recipesCollection
      .aggregate<{ recipes: RecipeModel[]; total: number }>(agg)
      .toArray()
  )[0];

  const recipes = result.recipes.map((recipeModel) =>
    mapRecipeModelToRecipe(recipeModel)
  );

  return mapItemsToPaginatedResponse(recipes, offset, result.total);
}

export async function recipesDataAccessFind(
  offset: number,
  limit: number
): Promise<PaginatedResponse<Recipe>> {
  const recipesCollection = await getRecipesCollection();

  const recipeModels = await recipesCollection
    .find()
    .skip(offset)
    .limit(limit)
    .toArray();

  const recipes = recipeModels.map((recipeModel) =>
    mapRecipeModelToRecipe(recipeModel)
  );
  const total = await recipesCollection.countDocuments();

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
  input: {
    name: string;
    description?: string | undefined;
    data: Recipe["data"];
  }
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

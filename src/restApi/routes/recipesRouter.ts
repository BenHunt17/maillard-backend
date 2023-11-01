import { Router, Request } from "express";
import {
  recipeServiceCreate,
  recipeServiceDelete,
  recipeServiceDeleteImage,
  recipeServiceGet,
  recipeServiceSearch,
  recipeServiceUpdate,
  recipeServiceUpdateImage,
  recipeServiceUpdateIngredients,
  recipeServiceUpdateInstructions,
} from "../../application/recipes/recipeService";
import multer from "multer";
import { RecipeSearchInput } from "../input/recipe/recipeSearchInput";
import { RecipeCreateInput } from "../input/recipe/recipeCreateInput";
import { RecipeUpdateInput } from "../input/recipe/recipeUpdateInput";
import { InstructionInput } from "../input/recipe/instruction/instructionInput";
import { IngredientInput } from "../input/recipe/ingredient/ingredientInput";

export const recipesRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

recipesRouter.post(
  "/search",
  async (req: Request<{}, {}, RecipeSearchInput>, res, next) => {
    const recipeSearchInput = req.body;

    try {
      const paginatedRecipes = await recipeServiceSearch(recipeSearchInput);
      res.json({ paginatedRecipes });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.get("/:id", async (req, res, next) => {
  const recipeId = req.params.id;
  try {
    const recipe = await recipeServiceGet(recipeId);
    res.json({ recipe });
  } catch (e) {
    next(e);
  }
});

recipesRouter.post(
  "/",
  async (req: Request<{}, {}, RecipeCreateInput>, res, next) => {
    const recipeCreateInput = req.body;

    try {
      const recipe = await recipeServiceCreate(recipeCreateInput);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id",
  async (req: Request<{ id: string }, {}, RecipeUpdateInput>, res, next) => {
    const recipeId = req.params.id;
    const recipeUpdateInput = req.body;

    try {
      const recipe = await recipeServiceUpdate(recipeId, recipeUpdateInput);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id/ingredients",
  async (req: Request<{ id: string }, {}, IngredientInput[]>, res, next) => {
    const recipeId = req.params.id;
    const ingredientsInput = req.body;

    try {
      const recipe = await recipeServiceUpdateIngredients(
        recipeId,
        ingredientsInput
      );
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id/instructions",
  async (req: Request<{ id: string }, {}, InstructionInput[]>, res, next) => {
    const recipeId = req.params.id;
    const instructionsInput = req.body;

    try {
      const recipe = await recipeServiceUpdateInstructions(
        recipeId,
        instructionsInput
      );
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id/addimage",
  upload.single("imageFile"),
  async (req, res, next) => {
    const recipeId = req.params.id;
    const imageFile = req.file;

    if (!imageFile) {
      res.status(400).json({ error: "No valid image file provided" });
      return;
    }

    try {
      const recipe = await recipeServiceUpdateImage(recipeId, imageFile);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch("/:id/removeimage", async (req, res, next) => {
  const recipeId = req.params.id;

  try {
    const recipe = await recipeServiceDeleteImage(recipeId);
    res.json({ recipe });
  } catch (e) {
    next(e);
  }
});

recipesRouter.delete("/:id", async (req, res, next) => {
  const recipeId = req.params.id;

  try {
    const recipe = await recipeServiceDelete(recipeId);
    res.json({ recipe });
  } catch (e) {
    next(e);
  }
});

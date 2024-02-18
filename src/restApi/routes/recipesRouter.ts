import { Router } from "express";
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
import { recipeSearchInputSchema } from "../input/recipe/recipeSearchInput";
import { recipeCreateInputSchema } from "../input/recipe/recipeCreateInput";
import { recipeUpdateInputSchema } from "../input/recipe/recipeUpdateInput";
import { instructionInputSchema } from "../input/recipe/instruction/instructionInput";
import { ingredientInputSchema } from "../input/recipe/ingredient/ingredientInput";
import { z } from "zod";
import { parseOrThrow } from "../error/parseOrThrow";
import { ApiError } from "../../domain/types/common/apiError";
import adminAuthorizationMiddleware from "../auth/adminAuthorizationMiddleware";

export const recipesRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

recipesRouter.post("/search", async (req, res, next) => {
  try {
    const recipeSearchInput = parseOrThrow(recipeSearchInputSchema, req.body);
    const paginatedRecipes = await recipeServiceSearch(recipeSearchInput);
    res.json({ paginatedRecipes });
  } catch (e) {
    next(e);
  }
});

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
  adminAuthorizationMiddleware,
  async (req, res, next) => {
    try {
      const recipeCreateInput = parseOrThrow(recipeCreateInputSchema, req.body);

      const recipe = await recipeServiceCreate(recipeCreateInput);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id",
  adminAuthorizationMiddleware,
  async (req, res, next) => {
    try {
      const recipeId = req.params.id;
      const recipeUpdateInput = parseOrThrow(recipeUpdateInputSchema, req.body);

      const recipe = await recipeServiceUpdate(recipeId, recipeUpdateInput);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id/ingredients",
  adminAuthorizationMiddleware,
  async (req, res, next) => {
    try {
      const recipeId = req.params.id;
      const ingredientsInput = parseOrThrow(
        z.array(ingredientInputSchema),
        req.body
      );

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
  adminAuthorizationMiddleware,
  async (req, res, next) => {
    try {
      const recipeId = req.params.id;
      const instructionsInput = parseOrThrow(
        z.array(instructionInputSchema),
        req.body
      );

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
  adminAuthorizationMiddleware,
  upload.single("imageFile"),
  async (req, res, next) => {
    try {
      const recipeId = req.params.id;
      const imageFile = req.file;
      if (!imageFile) {
        throw new ApiError("No valid image file provided", 400);
      }

      const recipe = await recipeServiceUpdateImage(recipeId, imageFile);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.patch(
  "/:id/removeimage",
  adminAuthorizationMiddleware,
  async (req, res, next) => {
    try {
      const recipeId = req.params.id;
      const recipe = await recipeServiceDeleteImage(recipeId);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

recipesRouter.delete(
  "/:id",
  adminAuthorizationMiddleware,
  async (req, res, next) => {
    try {
      const recipeId = req.params.id;

      const recipe = await recipeServiceDelete(recipeId);
      res.json({ recipe });
    } catch (e) {
      next(e);
    }
  }
);

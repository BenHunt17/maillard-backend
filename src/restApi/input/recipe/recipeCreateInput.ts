import { ingredientInputSchema } from "./ingredient/ingredientInput";
import { instructionInputSchema } from "./instruction/instructionInput";

import z from "zod";

export const recipeCreateInputSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(512).optional(),
  ingredients: z.array(ingredientInputSchema),
  instructions: z.array(instructionInputSchema),
  data: z.object({
    prepTime: z.number().int().nonnegative().max(9999),
    cookTime: z.number().int().nonnegative().max(9999),
    washingUpTime: z.number().int().nonnegative().max(9999),
  }),
});

export type RecipeCreateInput = z.infer<typeof recipeCreateInputSchema>;

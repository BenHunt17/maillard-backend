import { z } from "zod";

export const recipeSearchInputSchema = z.object({
  searchTerm: z.string().optional(),
  offset: z.number().nonnegative(),
  limit: z.number().nonnegative().max(99),
});

export type RecipeSearchInput = z.infer<typeof recipeSearchInputSchema>;

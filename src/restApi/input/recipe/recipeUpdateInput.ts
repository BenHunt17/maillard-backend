import z from "zod";

export const recipeUpdateInputSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(512).optional(),
  data: z.object({
    prepTime: z.number().int().positive().max(9999),
    cookTime: z.number().int().positive().max(9999),
    washingUpTime: z.number().int().positive().max(9999),
  }),
});

export type RecipeUpdateInput = z.infer<typeof recipeUpdateInputSchema>;

import z from "zod";

export const ingredientInputSchema = z.object({
  name: z.string().min(1).max(255),
  quantity: z.number().int().positive().max(9999),
  displayLabel: z.string().optional(),
  externalId: z.string().min(1),
});

export type IngredientInput = z.infer<typeof ingredientInputSchema>;

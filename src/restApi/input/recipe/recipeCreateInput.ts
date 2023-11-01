import { IngredientInput } from "./ingredient/ingredientInput";
import { InstructionInput } from "./instruction/instructionInput";

export interface RecipeCreateInput {
  name: string;
  description: string | null;
  ingredients: IngredientInput[];
  instructions: InstructionInput[];
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
    mealType: string;
  };
}

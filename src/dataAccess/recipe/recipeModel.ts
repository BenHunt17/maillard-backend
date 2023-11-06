import { ObjectId } from "mongodb";
import { IngredientModel } from "./ingredient/ingredientModel";
import { InstructionModel } from "./instruction/instructionModel";

export interface RecipeModel {
  _id: ObjectId;
  name: string;
  creationDate: Date;
  imageUrl: string | null;
  description: string | null;
  ingredients: IngredientModel[];
  instructions: InstructionModel[];
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
  };
}

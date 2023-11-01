import { Nutrient } from "./nutrient";
import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
  id: string;
  name: string;
  creationDate: Date;
  imageUrl: string | null;
  description: string | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
    mealType: string;
  };
  nutrients: Nutrient[];
  //TODO - attributes
}

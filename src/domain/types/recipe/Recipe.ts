import { Nutrient } from "./nutrient";
import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export interface Recipe {
  id: string;
  name: string;
  creationDate: Date;
  imageUrl: string | undefined;
  description: string | undefined;
  ingredients: Ingredient[];
  instructions: Instruction[];
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
  };
  nutrients: Nutrient[];
  //TODO - attributes
}

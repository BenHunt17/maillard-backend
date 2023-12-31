
import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";
import { Nutrient } from "./nutrient";

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

import { ObjectId } from "mongodb";

export interface RecipeModel {
  _id: ObjectId;
  name: string;
  creationDate: Date;
  imageUrl: string | null;
  description: string | null;
  ingredients: {
    id: ObjectId;
    name: string;
    quantity: number;
    externalId: string;
    displayLabel: string | null;
  }[];
  instructions: {
    id: ObjectId;
    priorityNumber: number;
    step: string;
  }[];
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
    mealType: string;
  };
}

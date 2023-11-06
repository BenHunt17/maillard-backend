import { ObjectId } from "mongodb";

export interface IngredientModel {
  id: ObjectId;
  name: string;
  quantity: number;
  externalId: string;
  displayLabel: string | null;
}

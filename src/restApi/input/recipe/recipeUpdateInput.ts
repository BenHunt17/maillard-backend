export interface RecipeUpdateInput {
  name: string;
  description: string;
  data: {
    prepTime: number;
    cookTime: number;
    washingUpTime: number;
    mealType: string;
  };
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealDetail extends MealSummary {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}

const mealDbMaxIngredientSlots = 20;

export function extractIngredients(meal: any): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let slot = 1; slot <= mealDbMaxIngredientSlots; slot++) {
    const ingredientName = meal['strIngredient' + slot];
    const ingredientMeasure = meal['strMeasure' + slot];
    if (ingredientName && ingredientName.trim().length > 0) {
      ingredients.push({ name: ingredientName.trim(), measure: (ingredientMeasure || '').trim() });
    }
  }
  return ingredients;
}

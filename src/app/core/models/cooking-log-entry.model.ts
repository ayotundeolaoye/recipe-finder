export interface CookingLogEntry {
  id: string;
  mealId: string;
  mealName: string;
  mealThumb: string;
  cookedAt: string;
  latitude: number | null;
  longitude: number | null;
  note: string;
}

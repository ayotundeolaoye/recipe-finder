import { Injectable } from '@angular/core';

import { MealSummary } from '../models/meal.model';
import { AppStorageService } from './app-storage.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private static readonly storageKey = 'favorite-meals';

  favorites: MealSummary[] = [];
  private ready: Promise<void>;

  constructor(private storage: AppStorageService) {
    this.ready = this.restore();
  }

  private async restore(): Promise<void> {
    const stored = await this.storage.get<MealSummary[]>(FavoritesService.storageKey);
    this.favorites = stored ?? [];
  }

  async whenReady(): Promise<void> {
    return this.ready;
  }

  isFavorite(id: string): boolean {
    return this.favorites.some((meal) => meal.idMeal === id);
  }

  async toggle(meal: MealSummary): Promise<void> {
    const exists = this.favorites.some((m) => m.idMeal === meal.idMeal);
    if (exists) {
      this.favorites = this.favorites.filter((m) => m.idMeal !== meal.idMeal);
    } else {
      this.favorites = [...this.favorites, meal];
    }
    await this.storage.set(FavoritesService.storageKey, this.favorites);
  }

  async clearAll(): Promise<void> {
    this.favorites = [];
    await this.storage.set(FavoritesService.storageKey, []);
  }
}

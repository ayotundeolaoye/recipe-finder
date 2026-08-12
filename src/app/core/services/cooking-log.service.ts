import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

import { MealSummary } from '../models/meal.model';
import { CookingLogEntry } from '../models/cooking-log-entry.model';
import { AppStorageService } from './app-storage.service';

const logStorageKey = 'cooking-log';

@Injectable({ providedIn: 'root' })
export class CookingLogService {
  entries: CookingLogEntry[] = [];

  constructor(private storage: AppStorageService) {
    this.storage.get<CookingLogEntry[]>(logStorageKey).then((saved) => {
      this.entries = saved ?? [];
    });
  }

  async logCooked(meal: MealSummary, note: string, tagLocation: boolean): Promise<CookingLogEntry> {
    let latitude: number | null = null;
    let longitude: number | null = null;

    if (tagLocation) {
      try {
        const permission = await Geolocation.requestPermissions();
        if (permission.location === 'granted' || permission.location === 'prompt') {
          const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }
      } catch (err) {
        console.warn('geolocation failed, saving without coords', err);
        latitude = null;
        longitude = null;
      }
    }

    const entry: CookingLogEntry = {
      id: `${Date.now()}-${meal.idMeal}`,
      mealId: meal.idMeal,
      mealName: meal.strMeal,
      mealThumb: meal.strMealThumb,
      cookedAt: new Date().toISOString(),
      latitude,
      longitude,
      note
    };

    this.entries = [entry, ...this.entries];
    await this.storage.set(logStorageKey, this.entries);
    return entry;
  }

  async removeEntry(id: string): Promise<void> {
    this.entries = this.entries.filter((entry) => entry.id !== id);
    await this.storage.set(logStorageKey, this.entries);
  }

  async clearAll(): Promise<void> {
    const idsToRemove = this.entries.map((entry) => entry.id);
    for (const id of idsToRemove) {
      await this.removeEntry(id);
    }
  }
}

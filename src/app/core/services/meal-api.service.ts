import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { MealCategory, MealDetail, MealSummary } from '../models/meal.model';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

@Injectable({ providedIn: 'root' })
export class MealApiService {
  constructor(private http: HttpClient) {}

  searchByName(q: string): Observable<MealSummary[]> {
    return this.http
      .get<{ meals: MealSummary[] | null }>(`${API_BASE}/search.php`, { params: { s: q } })
      .pipe(map((res) => res.meals ?? []));
  }

  getCategories(): Observable<MealCategory[]> {
    return this.http
      .get<{ categories: MealCategory[] }>(`${API_BASE}/categories.php`)
      .pipe(map((res) => res.categories ?? []));
  }

  filterByCategory(category: string): Observable<MealSummary[]> {
    return this.http
      .get<{ meals: MealSummary[] | null }>(`${API_BASE}/filter.php`, { params: { c: category } })
      .pipe(map((res) => res.meals ?? []));
  }

  getMealById(id: string): Observable<MealDetail | undefined> {
    const url = `${API_BASE}/lookup.php`;
    return this.http.get<{ meals: MealDetail[] | null }>(url, { params: { i: id } }).pipe(
      map((res) => {
        return res.meals?.[0];
      }),
    );
  }

  getRandomMeal(): Observable<MealDetail | undefined> {
    return this.http.get<{ meals: MealDetail[] | null }>(`${API_BASE}/random.php`).pipe(map((res) => res.meals?.[0]));
  }
}

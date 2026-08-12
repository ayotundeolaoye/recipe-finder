import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MealApiService } from '../core/services/meal-api.service';
import { FavoritesService } from '../core/services/favorites.service';
import { MealCategory, MealSummary } from '../core/models/meal.model';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonSpinner,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { diceOutline, heart, heartOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonImg,
    IonSpinner,
    IonButton,
    IonIcon,
  ],
})
export class HomePage implements OnInit {
  searchTerm = '';
  categories: MealCategory[] = [];
  selectedCategory: string | null = null;
  meals: MealSummary[] = [];
  loading = false;
  private searchTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private mealApi: MealApiService,
    public favorites: FavoritesService,
    private router: Router
  ) {
    addIcons({ diceOutline, heart, heartOutline, searchOutline });
  }

  ngOnInit(): void {
    this.mealApi.getCategories().subscribe((categories) => (this.categories = categories));
    this.runSearch('chicken');
  }

  onSearchInput(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.selectedCategory = null;
      if (this.searchTerm.trim().length > 0) {
        this.runSearch(this.searchTerm);
      } else {
        this.meals = [];
      }
    }, 400);
  }

  runSearch(term: string): void {
    this.searchTerm = term;
    this.loading = true;
    this.mealApi.searchByName(term).subscribe((meals) => {
      this.meals = meals;
      this.loading = false;
    });
  }

  selectCategory(categoryName: string): void {
    const isSame = this.selectedCategory === categoryName;
    this.selectedCategory = isSame ? null : categoryName;
    this.searchTerm = '';
    this.loading = true;

    if (isSame) {
      this.runSearch('chicken');
      return;
    }

    this.mealApi.filterByCategory(categoryName).subscribe((meals) => {
      this.meals = meals;
      this.loading = false;
    });
  }

  surpriseMe(): void {
    this.loading = true;
    this.mealApi.getRandomMeal().subscribe((meal) => {
      this.loading = false;
      if (!meal) return;
      this.router.navigate(['/recipe', meal.idMeal]);
    });
  }

  toggleFavorite(meal: MealSummary, event: Event): void {
    event.stopPropagation();
    this.favorites.toggle(meal);
  }

  openRecipe(id: string): void {
    this.router.navigate(['/recipe', id]);
  }
}

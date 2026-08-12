import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonImg,
  IonChip,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  IonToggle,
  IonTextarea,
  IonSpinner,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, locationOutline, logoYoutube, restaurantOutline } from 'ionicons/icons';

import { MealApiService } from '../core/services/meal-api.service';
import { FavoritesService } from '../core/services/favorites.service';
import { CookingLogService } from '../core/services/cooking-log.service';
import { MealDetail, MealSummary, extractIngredients, Ingredient } from '../core/models/meal.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: 'recipe-detail.page.html',
  styleUrls: ['recipe-detail.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonImg,
    IonChip,
    IonLabel,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonToggle,
    IonTextarea,
    IonSpinner,
  ],
})
export class RecipeDetailPage implements OnInit {
  meal: MealDetail | null = null;
  ingredients: Ingredient[] = [];
  loading = true;
  tagLocation = true;
  cookNote = '';
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private mealApi: MealApiService,
    public favorites: FavoritesService,
    private cookingLog: CookingLogService,
    private toastController: ToastController,
  ) {
    addIcons({ heart, heartOutline, locationOutline, logoYoutube, restaurantOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    this.mealApi.getMealById(id).subscribe((meal) => {
      this.meal = meal ?? null;
      this.ingredients = meal ? extractIngredients(meal) : [];
      this.loading = false;
    });
  }

  toggleFavorite(): void {
    if (!this.meal) {
      return;
    }
    this.favorites.toggle(this.toMealSummary(this.meal));
  }

  async logCooked(): Promise<void> {
    if (!this.meal) {
      return;
    }

    this.saving = true;
    await this.cookingLog.logCooked(this.toMealSummary(this.meal), this.cookNote, this.tagLocation);
    this.saving = false;
    this.cookNote = '';

    const toast = await this.toastController.create({
      message: 'Added to your Cooking Log',
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }

  private toMealSummary(meal: MealDetail): MealSummary {
    return { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb };
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartDislikeOutline, heartOutline } from 'ionicons/icons';

import { FavoritesService } from '../core/services/favorites.service';
import { MealSummary } from '../core/models/meal.model';

addIcons({ heartDislikeOutline, heartOutline });

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  ],
})
export class FavoritesPage {

  constructor(public favoritesService: FavoritesService, private router: Router) {}

  openRecipe(id: string) {
    this.router.navigate(['/recipe', id]);
  }

  removeFavorite(meal: MealSummary): void {
    this.favoritesService.toggle(meal);
  }
}

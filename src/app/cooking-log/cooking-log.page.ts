import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, locationOutline, trashOutline } from 'ionicons/icons';

import { CookingLogService } from '../core/services/cooking-log.service';
import { CookingLogEntry } from '../core/models/cooking-log-entry.model';

addIcons({ bookOutline, locationOutline, trashOutline });

@Component({
  selector: 'app-cooking-log',
  templateUrl: 'cooking-log.page.html',
  styleUrls: ['cooking-log.page.scss'],
  imports: [
    DatePipe,
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
    IonBadge,
  ],
})
export class CookingLogPage {
  constructor(
    public cookingLog: CookingLogService,
    private router: Router,
  ) {}

  openRecipe(id: string): void {
    this.router.navigate(['/recipe', id]);
  }

  removeEntry(entry: CookingLogEntry): void {
    this.cookingLog.removeEntry(entry.id);
  }

  mapsLink(entry: CookingLogEntry): string {
    return `https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`;
  }
}

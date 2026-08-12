import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, trashOutline, informationCircleOutline } from 'ionicons/icons';

import { SettingsService } from '../core/services/settings.service';
import { FavoritesService } from '../core/services/favorites.service';
import { CookingLogService } from '../core/services/cooking-log.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle, IonIcon],
})
export class SettingsPage {
  darkModeEnabled = false;

  constructor(
    private settings: SettingsService,
    private favorites: FavoritesService,
    private cookingLog: CookingLogService,
    private alertController: AlertController,
  ) {
    addIcons({ moonOutline, trashOutline, informationCircleOutline });
    this.settings.darkModeReady.then((enabled) => (this.darkModeEnabled = enabled));
  }

  onToggleDarkMode() {
    this.settings.setDarkMode(this.darkModeEnabled);
  }


  clearFavorites(): void {
    this.confirmAndClear('Clear favorites?', 'This removes every saved favorite recipe. This cannot be undone.', () =>
      this.favorites.clearAll(),
    );
  }

  clearCookingLog(): void {
    this.confirmAndClear(
      'Clear cooking log?',
      'This removes every entry from your cooking log. This cannot be undone.',
      () => this.cookingLog.clearAll(),
    );
  }

  private async confirmAndClear(header: string, message: string, onConfirm: () => void): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Clear', role: 'destructive', handler: onConfirm },
      ],
    });
    await alert.present();
  }
}

import { Injectable } from '@angular/core';

import { AppStorageService } from './app-storage.service';

const DARK_MODE_KEY = 'dark-mode-enabled';
const DARK_CLASS = 'ion-palette-dark';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  darkModeReady: Promise<boolean>;

  constructor(private storage: AppStorageService) {
    this.darkModeReady = this.restore();
  }

  private async restore(): Promise<boolean> {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = await this.storage.get<boolean>(DARK_MODE_KEY);
    const enabled = stored ?? prefersDark;
    this.applyClass(enabled);
    return enabled;
  }

  async setDarkMode(enabled: boolean): Promise<void> {
    this.applyClass(enabled);
    await this.storage.set(DARK_MODE_KEY, enabled);
  }

  private applyClass(enabled: boolean): void {
    document.documentElement.classList.toggle(DARK_CLASS, enabled);
  }
}

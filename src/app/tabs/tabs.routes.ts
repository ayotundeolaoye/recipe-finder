import { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('../favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: 'log',
        loadComponent: () => import('../cooking-log/cooking-log.page').then((m) => m.CookingLogPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes)
  },
  {
    path: 'recipe/:id',
    loadComponent: () => import('./recipe-detail/recipe-detail.page').then((m) => m.RecipeDetailPage),
  },
  { path: "**", redirectTo: 'tabs' },
];

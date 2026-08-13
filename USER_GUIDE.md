# Recipe Finder — User Guide

Recipe Finder is a cross-platform PWA built with Ionic and Angular (standalone components). It lets you search recipes from a live online database, browse by category, save favorites, log what you've actually cooked (with an optional location tag), and switch between light and dark mode.

Recipe data and photos come from [TheMealDB](https://www.themealdb.com/api.php), a free public recipe API. No account or API key is required to run the app.

## Getting Started

### Requirements
- Node.js (v18 or newer)
- npm
- Ionic CLI (`npm install -g @ionic/cli`, or just use `npx ionic`)

### Running the app
```
git clone <repository-url>
cd recipe-finder
npm install
ionic serve
```
`ionic serve` starts a local dev server and opens the app in your browser at `http://localhost:8100`. No extra configuration is needed — the app talks to TheMealDB's public API directly over HTTPS.

### Running on a device
The app is a Capacitor project, so it can also be built for Android, iOS, or as a Windows desktop web app:
```
ionic build
npx cap add android
npx cap open android
```
The Geolocation feature (see below) works both through the browser's Geolocation API on desktop and through the native Capacitor plugin on a real device — no code changes needed between platforms.

## Features

### Discover (Home tab)
The home tab opens with a default search so you're never looking at an empty screen. Type in the search bar to look up recipes by name, or tap a category chip (Chicken, Dessert, Seafood, etc.) to browse by category. Tapping a category again clears the filter.

The **Surprise Me** button pulls a random recipe from the API and takes you straight to its detail page — useful for "I don't know what to cook" moments.

Tapping any recipe card opens its full detail page. Tapping the heart icon on a card (or on the detail page) adds or removes it from your Favorites without leaving the list.

### Recipe Detail
Shows the full recipe: photo, category and cuisine tags, a link to the YouTube video (when TheMealDB has one), the ingredient list with measurements, and the instructions.

At the bottom of the page is the **cooking log form** — a toggle to tag your current location, an optional notes field, and an "I Cooked This" button that saves the recipe to your Cooking Log.

### Favorites
A simple list of every recipe you've hearted. Swipe a row left to reveal a delete action. Tapping a row opens that recipe's detail page again.

### Cooking Log
This is the part of the app that goes beyond a typical recipe browser. Every time you tap "I Cooked This" on a recipe, an entry is added here with the date/time, your optional note, and — if you allowed it — your location at the time, shown as a small map-pin badge you can tap to open in Google Maps. It's a personal cooking history, not just a bookmark list.

### Settings
- **Dark mode** — a toggle that switches the whole app's color palette instantly and remembers your choice the next time you open the app.
- **Clear favorites / Clear cooking log** — wipes stored data after a confirmation prompt.

## Things Worth Highlighting

A few implementation details that go beyond what a basic recipe-list app needs:

- **Geolocation that works on mobile and desktop.** The Cooking Log feature uses `@capacitor/geolocation` to tag where you were when you logged a recipe. It's the kind of plugin that's usually mobile-only, but it worked fine testing in a regular desktop browser too, which was a nice surprise.
- **Local persistence so the app isn't useless offline.** Favorites, cooking log entries, and the dark mode setting are all saved on-device through `@ionic/storage-angular`. Recipe search still needs internet since that data isn't cached, but your saved stuff isn't going anywhere.
- **PWA out of the box.** The app registers a service worker and ships a web app manifest, so it can be installed to a phone's home screen or a desktop taskbar like a native app.
- **Everything reads from a live external API.** No recipe data is hard-coded or stored as local files/images — every search, category list, and recipe photo comes from TheMealDB's JSON API at request time through Angular's `HttpClient`.

## Project Structure
```
src/app/
  core/
    models/       - TypeScript interfaces for meals, categories, cooking log entries
    services/      - MealApiService (HTTP), FavoritesService, CookingLogService, SettingsService, AppStorageService
  home/            - Discover/search tab
  favorites/       - Favorites tab
  cooking-log/     - Cooking Log tab
  settings/        - Settings tab
  recipe-detail/    - Recipe detail page (not a tab, pushed on top of navigation)
  tabs/            - Tab bar shell and its child routes
```

## Notes
- Recipe photos are not stored anywhere in this repository — they're remote image URLs returned by TheMealDB's API and loaded directly by the browser.
- This project does not require any environment variables or API keys to run.

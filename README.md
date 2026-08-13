# Recipe Finder

A recipe search PWA built with Ionic and Angular standalone components. Search TheMealDB's recipe API, browse by category, save favorites, and keep a cooking log tagged with your location.

## Quick Start
```
git clone <repository-url>
cd recipe-finder
npm install
ionic serve
```

See [USER_GUIDE.md](USER_GUIDE.md) (also published on the repository wiki) for a full feature walkthrough.

## Built With
- Ionic Framework + Angular (standalone components)
- Angular Router
- `@angular/common/http` (Observable-based data fetching from TheMealDB)
- `@ionic/storage-angular` for local persistence
- `@capacitor/geolocation`
- Angular PWA (service worker + web manifest)
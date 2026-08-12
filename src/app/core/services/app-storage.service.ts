import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class AppStorageService {
  private storeReady: Promise<Storage>;

  constructor(private storage: Storage) {
    this.storeReady = this.storage.create();
  }

  async get<T>(key: string): Promise<T | null> {
    const store = await this.storeReady;
    return store.get(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    const store = await this.storeReady;
    await store.set(key, value);
  }

  async remove(key: string): Promise<void> {
    const store = await this.storeReady;
    await store.remove(key);
  }
}

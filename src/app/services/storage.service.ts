import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setIntoStorage(key: string, value: any): Promise<void> {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }

  async getFromStorage(key: string): Promise<any> {
    const item = await Preferences.get({ key: key });
    if (item.value) {
      return JSON.parse(item.value);
    }
  }

  async removeFromStorage(key: string) {
    await Preferences.remove({
      key: key,
    });
  }

  async clearFromStorage() {
    await Preferences.clear();
  }
}

import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

  constructor() { }

  /**
   * Add an item to local-storage
   */
  set(id, val) {
    localStorage.setItem(id, JSON.stringify(val));
  }

  /**
   * Retrieve an item from local-storage
   */
  get(id) {
    let val = localStorage.getItem(id);
    return val ? JSON.parse(val) : null;
  }

  /**
   * Remove an item from local-storage
   */
  remove(id) {
    localStorage.removeItem(id);
  }

  /**
   * Remove all items from local-storage
   */
  clear() {
    localStorage.clear();
  }
}

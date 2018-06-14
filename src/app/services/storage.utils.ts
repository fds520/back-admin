import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
@Injectable()
export class StorageUtils {

  constructor(private cookie: CookieService) { }

  setCookie(key: string, value: string): void {
    this.cookie.set(key, value);
  }

  getCookie(key: string): string {
    return this.cookie.get(key);
  }

  removeCookie(): void {
    this.cookie.deleteAll();
  }

  removeCookieKey(key: string): void {
    this.cookie.delete(key);
  }

  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

}

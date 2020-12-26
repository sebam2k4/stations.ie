import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { storageKey } from './theme.service.constants';

@Injectable()
export class ThemeService {
  public themeChange: Subject<boolean> = new Subject<boolean>();
  private _isDarkTheme = false;

  constructor() {
    const savedThemeState = localStorage.getItem(storageKey); // wrap localstorage in a separate angular service
    if (savedThemeState === 'true') {
      this._isDarkTheme = true;
    }

    this.themeChange.subscribe(value => {
      this._isDarkTheme = value;
    });
  }

  public isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  public toggleDarkTheme(checked: boolean): void {
    this.themeChange.next(checked);
    localStorage.setItem(storageKey, checked.toString());
  }


}

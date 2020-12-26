import { TestBed, async } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { storageKey } from './theme.service.constants';
import { Subject } from 'rxjs';

describe(ThemeService.name, () => {
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
  });

  beforeEach(async(() => {
    themeService = TestBed.inject(ThemeService);
  }));

  afterEach(() => {
    localStorage.clear();
  });

  describe('#constructor', () => {
    it('should be created', () => {
      expect(ThemeService).toBeTruthy();
    });

    it('should get current \'dark theme\' state from localStorage', () => {
      expect(localStorage.getItem).toHaveBeenCalledWith(storageKey);
    });

    it('should create an instance of themeChange Subject', () => {
      expect(themeService.themeChange).toBeInstanceOf(Subject);
    });
  });

  describe('#isDarkTheme', () => {
    it('should return false as initial state', () => {
      expect(themeService.isDarkTheme()).toBe(false);
    });

    it('should return true when \'dark theme\' is set to true', () => {
      themeService.toggleDarkTheme(true);

      expect(themeService.isDarkTheme()).toBe(true);
    });

    it('should return false when \'dark theme\' is set to false', () => {
      themeService.toggleDarkTheme(false);

      expect(themeService.isDarkTheme()).toBe(false);
    });
  });

  describe('#toggleDarkTheme' , () => {
    beforeEach(() => {
      jest.spyOn(themeService.themeChange, 'next');
    });

    it('should call themeChange.next with true', () => {
      themeService.toggleDarkTheme(true);

      expect(themeService.themeChange.next).toHaveBeenCalledWith(true);
    });

    it('should call themeChange.next with false', () => {
      themeService.toggleDarkTheme(false);

      expect(themeService.themeChange.next).toHaveBeenCalledWith(false);
    });

    it('should set the state of dark theme', () => {
      themeService.toggleDarkTheme(true);

      expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, 'true');
    });
  });
});

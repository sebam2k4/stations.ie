import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavHeaderComponent } from './nav-header.component';
import { ThemeService } from 'src/core/services/theme-service/theme.service';
import { Subject } from 'rxjs';

describe(NavHeaderComponent.name, () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;
  let themeService: ThemeService;

  const themeServiceMock = {
    toggleDarkTheme: jest.fn(),
    themeChange: new Subject<boolean>()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSlideToggleModule
      ],
      declarations: [
        NavHeaderComponent
      ],
      providers: [
        ThemeService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });

  describe('#constructor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#onInit', () => {
    it('should set initial state of "isDarkTheme"', async () => {
      jest.spyOn(themeService, 'isDarkTheme').mockReturnValue(true);

      await component.ngOnInit();

      expect(component.isDarkTheme).toBe(true);
    });
  });

  describe('#onLightIconClicked', () => {
    beforeEach(() => {
      jest.spyOn(component, 'setDarkThemeState');
      component.ngOnInit();
    });

    it('should change state of dark theme to false', () => {
      component.isDarkTheme = true;

      component.onLightIconClicked();

      expect(component.setDarkThemeState).toHaveBeenCalledWith(false);
      expect(component.isDarkTheme).toBe(false);
    });

    it('should not change state of dark theme', () => {
      component.isDarkTheme = false;

      component.onLightIconClicked();

      expect(component.setDarkThemeState).not.toHaveBeenCalled();
      expect(component.isDarkTheme).toBe(false);
    });
  });

  describe('#onDarkIconClicked', () => {
    beforeEach(() => {
      jest.spyOn(component, 'setDarkThemeState');
      component.ngOnInit();
    });

    it('should change state of dark theme to true', () => {
      component.isDarkTheme = false;

      component.onDarkIconClicked();

      expect(component.setDarkThemeState).toHaveBeenCalledWith(true);
      expect(component.isDarkTheme).toBe(true);
    });

    it('should not change state of dark theme', () => {
      component.isDarkTheme = true;

      component.onDarkIconClicked();

      expect(component.setDarkThemeState).not.toHaveBeenCalled();
      expect(component.isDarkTheme).toBe(true);
    });
  });

  describe('#setDarkThemeState', () => {
    let toggleDarkThemeSpy;

    beforeEach(() => {
      toggleDarkThemeSpy = jest.spyOn(themeService, 'toggleDarkTheme');
    });

    it('should call "themeService.toggleDarkTheme" with true', () => {
      component.setDarkThemeState(true);

      expect(toggleDarkThemeSpy).toHaveBeenLastCalledWith(true);
    });

    it('should call "themeService.toggleDarkTheme" with false', () => {
      component.setDarkThemeState(false);

      expect(toggleDarkThemeSpy).toHaveBeenLastCalledWith(false);
    });
  });
});

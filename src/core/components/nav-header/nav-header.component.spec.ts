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
    it('should set initial state of isDarkTheme', async () => {
      jest.spyOn(themeService, 'isDarkTheme').mockReturnValue(true);

      await component.ngOnInit();

      expect(component.isDarkTheme).toBe(true);
    });
  });

  describe('#onLightIconClicked', () => {
    beforeEach(() => {
      jest.spyOn(component, 'toggleTheme');
    });

    it('should change state of isDarkTheme to false', () => {
      component.isDarkTheme = true;

      component.onLightIconClicked();

      expect(component.isDarkTheme).toBe(false);
      expect(component.toggleTheme).toHaveBeenCalledWith(false);
    });

    it('should not change state of isDarkTheme', () => {
      component.isDarkTheme = false;

      component.onLightIconClicked();

      expect(component.isDarkTheme).toBe(false);
      expect(component.toggleTheme).not.toHaveBeenCalled();
    });
  });

  describe('#onDarkIconClicked', () => {
    beforeEach(() => {
      jest.spyOn(component, 'toggleTheme');
    });

    it('should change state of isDarkTheme to true', () => {
      component.isDarkTheme = false;

      component.onDarkIconClicked();

      expect(component.isDarkTheme).toBe(true);
      expect(component.toggleTheme).toHaveBeenCalledWith(true);
    });

    it('should not change state of isDarkTheme', () => {
      component.isDarkTheme = true;

      component.onDarkIconClicked();

      expect(component.isDarkTheme).toBe(true);
      expect(component.toggleTheme).not.toHaveBeenCalled();
    });
  });

  describe('#toggleTheme', () => {
    let toggleDarkThemeSpy;

    beforeEach(() => {
      toggleDarkThemeSpy = jest.spyOn(themeService, 'toggleDarkTheme');
    });

    it('should call themeService.toggleDarkTheme with true', () => {
      component.toggleTheme(true);

      expect(toggleDarkThemeSpy).toHaveBeenLastCalledWith(true);
    });

    it('should call themeService.toggleDarkTheme with false', () => {
      component.toggleTheme(false);

      expect(toggleDarkThemeSpy).toHaveBeenLastCalledWith(false);
    });
  });
});

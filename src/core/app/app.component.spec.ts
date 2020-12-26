import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ThemeService } from '../services/theme-service/theme.service';
import { NavHeaderModule } from '../components/nav-header/nav-header.module';
import { FooterModule } from '../components/footer/footer.module';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let themeService: ThemeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NavHeaderModule,
        FooterModule
      ],
      providers: [
        ThemeService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });

  describe('#constructor', () => {
    it('should create the app', async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }));
  });

  describe('#onInit', () => {
    it('should set initial state of isDarkTheme', async () => {
      jest.spyOn(themeService, 'isDarkTheme').mockReturnValue(true);

      await component.ngOnInit();

      expect(component.isDarkTheme).toBe(true);
    });
  });
});

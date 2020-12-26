import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe(FooterComponent.name, () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        FooterComponent
      ],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  describe('#constructor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});

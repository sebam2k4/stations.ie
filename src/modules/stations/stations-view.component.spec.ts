import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StationsViewComponent } from './stations-view.component';
import { IrishRailService } from '../../api/Irish-rail/irish-rail.service';
import { ApiIrishRailModule } from '../../api/Irish-rail/irish-rail.module';

import { StationsSelectComponent } from './components/select/stations-select.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { JourneyListComponent } from './components/journey-list/Journey-list.component';

describe('StationsViewComponent', () => {
  let component: StationsViewComponent;
  let fixture: ComponentFixture<StationsViewComponent>;
  let irishRailService: IrishRailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatProgressBarModule,
        ApiIrishRailModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule
      ],
      declarations: [
        StationsViewComponent,
        StationsSelectComponent,
        JourneyListComponent
      ],
      providers: [
        IrishRailService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsViewComponent);
    component = fixture.componentInstance;
    irishRailService = TestBed.get(IrishRailService);
  });

  describe('#constructor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});

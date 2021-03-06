import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

// Stations
import { ApiIrishRailModule } from '../../api/irish-rail/irish-rail.service.module';
import { StationsViewComponent } from './stations-view.component';
import { StationsSelectComponent } from './components/select/stations-select.component';
import { JourneyListComponent } from './components/journey-list/Journey-list.component';

// Libraries
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    ApiIrishRailModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    StationsViewComponent,
    StationsSelectComponent,
    JourneyListComponent
  ]
})

export class StationsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Stations
import { ApiIrishRailModule } from '../../api/irish-rail/irish-rail.module';
import { StationsRoutingModule } from './stations-routing.module';
import { StationsViewComponent } from './stations-view.component';
import { StationsSelectComponent } from './components/select/stations-select.component';
import { MatFormFieldModule } from '@angular/material';

// Libraries
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    ApiIrishRailModule,
    StationsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    StationsViewComponent,
    StationsSelectComponent
  ]
})

export class StationsModule { }

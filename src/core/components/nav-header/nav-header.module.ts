import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NavHeaderComponent } from './nav-header.component';
import { ThemeService } from '../../services/theme-service/theme.service';

@NgModule({
  imports: [
    CommonModule,
    MatSlideToggleModule
  ],
  declarations: [
    NavHeaderComponent
  ],
  providers: [
    ThemeService
  ],
  exports: [
    NavHeaderComponent
  ]
})

export class NavHeaderModule { }

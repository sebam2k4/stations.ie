import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StationsModule } from '../../modules/stations/stations.module';
import { ThemeService } from '../services/theme-service/theme.service';
import { FormsModule } from '@angular/forms';
import { NavHeaderModule } from '../components/nav-header/nav-header.module';
import { FooterModule } from '../components/footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StationsModule,
    FormsModule,
    NavHeaderModule,
    FooterModule
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

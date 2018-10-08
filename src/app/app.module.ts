import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { StationsComponent } from './stations/stations.component';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.CookieDomain
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: "#f1d600",
      text: "#000000",
      border: "transparent"
    }
  },
  position: "bottom",
  theme: 'edgeless',
  type: 'opt-out',
  content: {
    message: "This app uses Google Analytics that uses Cookies to measure user interactions on websites - it helps us see how the app is performing. Some data we collect: your browser type, system info, time you visited, device info, country, city, language, etc. We do not ask or store any personal information about you.",
    dismiss: "Got it!",
    deny: "Refuse cookies",
    link: "Learn more",
    href: "https://cookiesandyou.com"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent
  ],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

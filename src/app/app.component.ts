import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

import { ApiService, RailStation, RailStationData } from  './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  title = 'stations';
  public railStationsList: Array<RailStation>;
  public selectedStation: string;
  public railStationData: Array<RailStationData> = [];
  public notFound: boolean;
  public offline: boolean;
  public displayedColumns: string[] = ["destination", "origin", "scharrival", "late", "exparrival"]
  public loading: boolean;


  constructor(
      private apiService: ApiService,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
      private ccService: NgcCookieConsentService) {

    this.matIconRegistry.addSvgIcon(
      `rail`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/rail.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `bus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/bus.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `lua`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/lua.svg`)
    );

  }
  ngOnInit() {
    this.fetchRailStations();

    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(this.ccService.getConfig())
      });
 
    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  
  }

  fetchStationData(stationCode) {
    this.loading = true;
    console.log(stationCode)
    this.apiService.getStationData(stationCode).subscribe( (data:Array<RailStationData>) => {
      this.railStationData = data;
      console.log(this.railStationData);
      this.notFound = false;
      this.offline = false;
      this.loading = false;
    }, (error) => {
      this.railStationData = []
      console.error(error);
      if (error.status === 404){
        this.notFound = true;
      }
      if (error.status === 504){
        this.offline = true;
      }
      this.loading = false;
    })
  }

  fetchRailStations() {
    this.apiService.getStations().subscribe( (data:Array<RailStation>) => {
      this.railStationsList = data;
      this.offline = false;
      console.log(this.railStationsList)
    }, (error) => {
      console.error(error);
      this.railStationData = [];
      if (error.status === 504){
        this.offline = true;
      }
    })
  }


  OnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}

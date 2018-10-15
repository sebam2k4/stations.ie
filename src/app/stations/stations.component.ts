import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from 'rxjs';

import { ApiService, RailStation, RailStationData } from  '../api.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
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
      private domSanitizer: DomSanitizer) { 
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

}

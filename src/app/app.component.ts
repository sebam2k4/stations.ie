import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { ApiService, RailStation, RailStationData } from  './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stations';
  public railStationsList: Array<RailStation>;
  public selectedStation: string;
  public railStationData: Array<RailStationData> = [];
  public notFound: boolean;
  public displayedColumns: string[] = ["destination", "origin", "scharrival", "late", "exparrival"]


  constructor(
      private apiService: ApiService,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer) {
    
    this.matIconRegistry.addSvgIcon(
      `rail`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/train.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `bus`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/bus.svg`)
    );

  }
  ngOnInit() {
    this.fetchRailStations();
  }

  fetchStationData(stationCode) {
    this.railStationData = [];
    console.log(stationCode)
    this.apiService.getStationData(stationCode).subscribe( (data:Array<RailStationData>) => {
      this.railStationData = data;
      console.log(this.railStationData);
      this.notFound = false;
    }, (error) => {
      console.error(error);
      if (error.status === 404){
        this.notFound = true;
      }
    })
  }

  fetchRailStations() {
    this.apiService.getStations().subscribe( (data:Array<RailStation>) => {
      this.railStationsList = data;
      console.log(this.railStationsList)
    }, (error) => {
      console.error(error);
    })
  }

}

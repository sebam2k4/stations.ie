import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from 'rxjs';

import { IrishRailService } from  '../../../api/irish-rail/irish-rail.service';
import { IrishRailStation, IrishRailStationData } from '../../../api/irish-rail/irish-rail.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'stations-view',
  templateUrl: './stations-view.component.html',
  styleUrls: ['./stations-view.component.scss']
})
export class StationsViewComponent implements OnInit {
  title = 'stations';

  public irishRailStationsList: IrishRailStation[];
  public irishRailStationData: IrishRailStationData[];

  public selectedStationCode: string;
  
  public notFound: boolean;
  // public offline: boolean;
  public error: string;

  public displayedColumns: string[] = ["destination", "origin", "scharrival", "late", "exparrival"]
  public loading: boolean;

  public headers: any;

  constructor(
      private irishRailService: IrishRailService,
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

  async fetchStationData(stationCode) {
    this.error = '';
    this.loading = true;
    this.irishRailStationData = await this.irishRailService.get(stationCode).toPromise();
    console.log(this.irishRailStationData)
    this.loading = false;
  }

  async fetchRailStations() {
    this.error = '';
    this.loading = true;
    this.irishRailStationsList = await this.irishRailService.getAll().toPromise();
    console.log(this.irishRailStationsList)
    this.loading = false;
  }

  // showErrorMessage(error) {
  //   this.error = error;
  // }

}

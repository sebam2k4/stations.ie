import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from 'rxjs';

import { IrishRailService } from  '../../../api/irish-rail/irish-rail.service';
import { IrishRailStation, IrishRailStationJourney } from '../../../api/irish-rail/irish-rail.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'stations-view',
  templateUrl: './stations-view.component.html',
  styleUrls: ['./stations-view.component.scss']
})
export class StationsViewComponent implements OnInit {
  title = 'stations';

  public irishRailStationsList: IrishRailStation[];
  public irishRailStationJourneysList: IrishRailStationJourney[];

  public selectedStationCode: string;
  public loading: boolean;
  // public notFound: boolean;
  // public offline: boolean;
  public error: string;

  public displayedColumns: string[] = ["destination", "origin", "scharrival", "late", "exparrival"]
  

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
    this.fetchIrishRailStations();
  }

  async fetchIrishRailStationJourneys(stationCode) {
    this.error = '';
    this.loading = true;
    this.irishRailStationJourneysList = await this.irishRailService.get(stationCode).toPromise();
    console.log(this.irishRailStationJourneysList)
    this.loading = false;
  }

  async fetchIrishRailStations() {
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

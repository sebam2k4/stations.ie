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
  public railStationsList: Array<IrishRailStation>;
  public selectedStation: string;
  public railStationData: Array<IrishRailStationData> = [];
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

  fetchStationData(stationCode) {
    this.loading = true;
    console.log(stationCode)
    this.irishRailService.getStationData(stationCode)
      .pipe(take(1))
      .subscribe( (resp) => {
        console.log("resopnse:", resp)
        this.error = "";
        if ('notFound' in resp.body) {
          this.error = resp.body['notFound'];
        } else {
          this.railStationData = resp.body;
        }
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.showErrorMessage(error);
        this.loading = false;
      })
  }

  fetchRailStations() {
    this.loading = true;
    this.irishRailService.getStations()
      .pipe(take(1))
      .subscribe( (resp) => {
        this.error = "";
        console.log("resopnse:", resp)
        this.railStationsList = resp.body;
        this.loading = false;
        // const keys = resp.headers.keys();
        // console.log("header keys", keys)
        // this.headers = keys.map(key =>
        //   `${key}: ${resp.headers.get(key)}`);
        // console.log("headers", this.headers)
      }, (error) => {
        console.error(error);
        this.showErrorMessage(error);
        this.loading = false;
      })
  }

  showErrorMessage(error) {
    this.error = error;
  }

}

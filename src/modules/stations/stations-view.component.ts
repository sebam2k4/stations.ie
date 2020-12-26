import { Component, OnInit } from '@angular/core';

import { IrishRailService } from '../../api/irish-rail/irish-rail.service';
import { IrishRailStation, IrishRailStationJourney } from '../../api/irish-rail/irish-rail.model';

@Component({
  selector: 'stations-view',
  templateUrl: './stations-view.component.html',
  styleUrls: ['./stations-view.component.scss']
})
export class StationsViewComponent implements OnInit {
  public irishRailStationsList: IrishRailStation[];
  public irishRailStationJourneysList: IrishRailStationJourney[] = [];
  public selectedStation: IrishRailStation;
  public loading: boolean;
  public error = null;

  constructor(private irishRailService: IrishRailService) { }

  ngOnInit(): void {
    this.fetchIrishRailStations();
  }

  public fetchIrishRailStationJourneys(station: IrishRailStation): void {
    this.selectedStation = station;
    this.loading = true;
    this.irishRailService.getAllJourneys(station.stationCode)
      .toPromise()
      .then((stationJourneys: IrishRailStationJourney[]) => {
        this.irishRailStationJourneysList = stationJourneys;
        this.error = null;
        this.loading = false;
        console.log(this.irishRailStationJourneysList);
      })
      .catch((error) => {
        this.irishRailStationJourneysList = [];
        this.error = error;
        this.loading = false;
        console.log(this.error);
      });
  }

  private fetchIrishRailStations(): void {
    this.loading = true;
    this.irishRailService.getAllStations()
      .toPromise()
      .then((stations: IrishRailStation[]) => {
        this.irishRailStationsList = stations;
        this.error = null;
        this.loading = false;
        console.log(this.irishRailStationsList);
      })
      .catch(error => {
        this.irishRailStationsList = [];
        this.error = error;
        this.loading = false;
        console.log(this.error);
      });
  }
}

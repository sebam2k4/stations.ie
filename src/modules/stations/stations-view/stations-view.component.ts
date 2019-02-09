import { Component, OnInit } from '@angular/core';

import { IrishRailService } from '../../../api/irish-rail/irish-rail.service';
import { IrishRailStation, IrishRailStationJourney } from '../../../api/irish-rail/irish-rail.model';

@Component({
  selector: 'stations-view',
  templateUrl: './stations-view.component.html',
  styleUrls: ['./stations-view.component.scss']
})
export class StationsViewComponent implements OnInit {
  title = 'stations';

  public irishRailStationsList: IrishRailStation[];
  public irishRailStationJourneysList: IrishRailStationJourney[] = [];

  public selectedStationCode: string;
  public loading: boolean;
  public error = null;

  public displayedColumns: string[] = ['destination', 'origin', 'scharrival', 'late', 'exparrival'];


  constructor(private irishRailService: IrishRailService) { }

  ngOnInit() {
    this.fetchIrishRailStations();
  }

  fetchIrishRailStationJourneys(stationCode) {
    this.loading = true;
    this.irishRailService.getAllJourneys(stationCode)
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

  fetchIrishRailStations() {
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

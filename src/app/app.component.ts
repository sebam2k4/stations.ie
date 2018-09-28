import { Component, OnInit } from '@angular/core';

import { ApiService, RailStation, RailStationData } from  './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stations';
  public railStationsList: Array<RailStation>;
  public selectedStation: string = "";
  public railStationData: Array<RailStationData>;



  constructor(private apiService: ApiService) {

  }
  ngOnInit() {
    this.fetchRailStations();
  }

  fetchStationData(stationCode) {
    console.log(stationCode)
    this.apiService.getStationData(stationCode).subscribe( (data:Array<RailStationData>) => {
      this.railStationData = data;
      console.log(this.railStationData);
    }, (error) => {
      console.error(error);
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

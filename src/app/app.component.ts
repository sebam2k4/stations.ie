import { Component, OnInit } from '@angular/core';

import { ApiService, RailStation } from  './api.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stations';
  railStations:Array<RailStation>;
  selectedStation: string;


  constructor(private apiService: ApiService) {

  }
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getData().subscribe((data:Array<RailStation>) => {
      this.railStations = data;
      console.log(this.railStations)
    }, (error) => {
      console.error(error);
    })
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor() {
    window['ga-disable-UA-127095084-1'] = true;
   }

  ngOnInit() {
  }

  
  
  OnDestroy() {

  }
}

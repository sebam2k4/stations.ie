import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../environments/environment';

export interface RailStation {
  StationAlias: string;
  StationCode: string;
  StationDesc: string;
  StationId: string;
  StationLatitude: string;
  StationLongiture: string;
}

export interface RailStationData {
  Destination:string,
  Destinationtime:string,
  Direction:string,
  Duein:string,
  Exparrival:string,
  Expdepart:string,
  Lastlocation:string,
  Late:string,
  Locationtype:string,
  Origin:string,
  Origintime:string,
  Querytime:string,
  Scharrival:string,
  Schdepart:string,
  Servertime:string,
  Stationcode:string,
  Stationfullname:string,
  Status:string,
  Traincode:string,
  Traindate:string,
  Traintype:string
}


@Injectable({
  providedIn:  'root'
})

export  class  ApiService {

  private railStationsURL:string  = environment.IrishRailAPI_Stations;
  private railStationURL:string = environment.IrishRailAPI_StationData;

  constructor(private httpClient: HttpClient) {}

  getStations():Observable<RailStation[]>{
    return <Observable<RailStation[]>>this.httpClient.get(this.railStationsURL);
  }

  getStationData(stationCode):Observable<RailStationData[]> {
    return <Observable<RailStationData[]>>this.httpClient.get(`${this.railStationURL}/${stationCode}`);
  }
}
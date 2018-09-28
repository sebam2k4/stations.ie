import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';

export interface RailStation {
  StationAlias: string;
  StationCode: string;
  StationDesc: string;
  StationId: string;
  StationLatitude: string;
  StationLongiture: string;
}


@Injectable({
  providedIn:  'root'
})

export  class  ApiService {
  private  dataURL:  string  = "http://127.0.0.1:5000/rail-data";

  constructor(private httpClient: HttpClient) {}

  getData():Observable<RailStation[]>{
    return <Observable<RailStation[]>>this.httpClient.get(this.dataURL);
  }
}
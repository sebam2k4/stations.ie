import { Injectable } from  '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from  '@angular/common/http';
import { Observable, throwError } from  'rxjs';
import { catchError, retry, retryWhen, delay, take, concat, map} from 'rxjs/operators';
import { environment } from '../../core/environments/environment';
import { IrishRailStation, IrishRailStationData } from './irish-rail.model';

export interface ApiIrishRailStationsList {
  irishRailStations: IrishRailStation[];
}

export interface ApiIrishRailStationData {
  irishRailStationData: IrishRailStationData[];
}


@Injectable({
  providedIn: 'root'
})

export class IrishRailService {

  private readonly railStationsURL:string = environment.IrishRailAPI_Stations;
  private readonly railStationURL:string = environment.IrishRailAPI_StationData;

  constructor(private httpClient: HttpClient) { }

  public getAll():Observable<IrishRailStation[]> {
    return this.httpClient.get<ApiIrishRailStationsList>(this.railStationsURL)
    .pipe(
      map(body => body.irishRailStations),
      map(body => body.map(station => new IrishRailStation(station)))
    );
  }

  public get(stationCode):Observable<IrishRailStationData[]> {
    return this.httpClient.get<ApiIrishRailStationData>(`${this.railStationURL}/${stationCode}`)
    .pipe(
      map(body => body.irishRailStationData),
      map(body => {
        if (body) {
        return body.map(stationData => new IrishRailStationData(stationData))
        }
      }), // errors when no body ( can't .map of undefined, below doesn't handle it)
      // catchError(error => this.handleError(error)), // then handle the error
    );
  }


  // Error Handler
  // returns an observable with a user-facing error message
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred
  //     console.error('A client-side error occurred:', error.error.message);
  //     return throwError(`Error: ${error.error.message}`);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // can check against different error.status here
  //     console.error("ERROR:", error);
  //     return throwError(
  //       `Error connecting to server: ${error.status}`);
  //   }
  // };


}
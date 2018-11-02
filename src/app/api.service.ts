import { Injectable } from  '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from  '@angular/common/http';
import { Observable, throwError } from  'rxjs';
import { catchError, retry, retryWhen, delay, take, concat} from 'rxjs/operators';

import { environment } from './../environments/environment';

import { RailStation, RailStationData } from '../models/railModel';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private railStationsURL:string = environment.IrishRailAPI_Stations;
  private railStationURL:string = environment.IrishRailAPI_StationData;

  constructor(private httpClient: HttpClient) {

  }

  getStations():Observable<HttpResponse<Array<RailStation>>> {
    return this.httpClient.get<Array<RailStation>>(this.railStationsURL, {observe: 'response'})
    .pipe(
      retryWhen(error => 
        error.pipe(
          delay(1000),
          take(5),
          concat(throwError('failed connecting to server. Refresh the app or try again later'))
        )
      )
    );
  }


  getStationData(stationCode):Observable<HttpResponse<Array<RailStationData>>> {
    return this.httpClient.get<Array<RailStationData>>(`${this.railStationURL}/${stationCode}`, {observe: 'response'})
    .pipe(
      catchError(error => this.handleError(error)) // then handle the error
    );
  }


  // Error Handler
  // returns an observable with a user-facing error message
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('A client-side error occurred:', error.error.message);
      return throwError(`Error: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // can check against different error.status here
      console.error("ERROR:", error);
      return throwError(
        `Error connecting to server: ${error.status}`);
    }
  };


}
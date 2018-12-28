import { Injectable } from  '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from  '@angular/common/http';
import { Observable, throwError } from  'rxjs';
import { catchError, retry, retryWhen, delay, take, concat, map} from 'rxjs/operators';
import { environment } from '../../core/environments/environment';
import { IrishRailStation, IrishRailStationJourney } from './irish-rail.model';

export interface ApiIrishRailStationsList {
  irishRailStations: IrishRailStation[];
}

export interface ApiIrishRailStationJourneysList {
  irishRailStationJourneys: IrishRailStationJourney[];
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

  public get(stationCode):Observable<IrishRailStationJourney[]> {
    return this.httpClient.get<ApiIrishRailStationJourneysList>(`${this.railStationURL}/${stationCode}`)
    .pipe(
      map(body => body.irishRailStationJourneys),
      map(body => {
        if (body) {
        return body.map(stationJourney => new IrishRailStationJourney(stationJourney))
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
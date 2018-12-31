import { Injectable } from  '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from  '@angular/common/http';
import { Observable, throwError } from  'rxjs';
import { catchError, retry, retryWhen, delay, take, concat, map} from 'rxjs/operators';
import { environment } from '../../core/environments/environment';
import { IrishRailStation, IrishRailStationJourney } from './irish-rail.model';
import { irishRailStationJourneyMapping, IrishRailStationMapping } from './irish-rail.mapping';

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

  public getAllStations():Observable<IrishRailStation[]> {
    return this.httpClient.get<ApiIrishRailStationsList>(this.railStationsURL)
    .pipe(
      map(body => this.convertProperties(body.irishRailStations, IrishRailStationMapping)),
      map(body => body.map(station => new IrishRailStation(station)))
    );
  }

  public getAllJourneys(stationCode):Observable<IrishRailStationJourney[]> {
    return this.httpClient.get<ApiIrishRailStationJourneysList>(`${this.railStationURL}/${stationCode}`)
    .pipe(
      map(body => this.convertProperties(body.irishRailStationJourneys, irishRailStationJourneyMapping)),
      map(body => body.map(stationJourney => new IrishRailStationJourney(stationJourney)))
    );
  }

  private convertProperties(objList, mapping) {
    const convertedList = [];
    
    objList.forEach(obj => {
      convertedList.push(this.renameKeys(mapping, obj))
    });

    return convertedList;
  }

  // https://medium.com/front-end-weekly/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa
  private renameKeys = (keysMap, obj) => {
    return Object
      .keys(obj)
      .reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
      }), {});
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

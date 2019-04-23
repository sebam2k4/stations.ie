import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
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

  private readonly railStationsURL: string = environment.IrishRailAPI_Stations;

  constructor(private httpClient: HttpClient) { }

  public getAllStations(): Observable<IrishRailStation[]> {
    return this.httpClient.get<ApiIrishRailStationsList>(this.railStationsURL)
    .pipe(
      map(body => this.convertProperties(body.irishRailStations, IrishRailStationMapping)),
      map(body => body.map(station => new IrishRailStation(station)))
    );
  }

  public getAllJourneys(stationCode): Observable<IrishRailStationJourney[]> {
    return this.httpClient.get<ApiIrishRailStationJourneysList>(`${this.railStationsURL}/${stationCode}`)
    .pipe(
      map(body => this.convertProperties(body.irishRailStationJourneys, irishRailStationJourneyMapping)),
      map(body => body.map(stationJourney => new IrishRailStationJourney(stationJourney)))
    );
  }

  private convertProperties(objList, mapping) {
    const convertedList = [];

    objList.forEach(obj => {
      convertedList.push(this.renameKeys(mapping, obj));
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
}

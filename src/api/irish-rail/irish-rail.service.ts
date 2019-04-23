import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
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

  private readonly railStationsURL: string = environment.IrishRailAPI_Stations;

  constructor(private httpClient: HttpClient) { }

  public getAllStations(): Observable<IrishRailStation[]> {
    return this.httpClient.get<ApiIrishRailStationsList>(this.railStationsURL)
    .pipe(
      map(body => body.irishRailStations.map(station => new IrishRailStation(station)))
    );
  }

  public getAllJourneys(stationCode): Observable<IrishRailStationJourney[]> {
    return this.httpClient.get<ApiIrishRailStationJourneysList>(`${this.railStationsURL}/${stationCode}`)
    .pipe(
      map(body => body.irishRailStationJourneys.map(stationJourney => new IrishRailStationJourney(stationJourney)))
    );
  }
}

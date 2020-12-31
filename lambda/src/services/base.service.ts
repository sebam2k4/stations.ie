import fetch, { RequestInit, Response as fetchResponse } from 'node-fetch';

import { Journey, Station } from "../interfaces/common.interfaces";
import utils from '../utils/utils';


const REQUIRED_STATION_PROPS = ['stationCode', 'stationFullName'];
const REQUIRED_JOURNEY_PROPS = [
  'destination',
  'destinationTime',
  'dueIn',
  'expectedArrival',
  'expectedDeparture',
  'late',
  'origin',
  'originTime',
  'scheduledArrival',
  'scheduledDeparture',
  'stationCode',
  'stationFullName',
];

export abstract class BaseStationsService {
  constructor() {
    console.log('service');
  }

  protected async getResponseFromThirdParty(apiUri: string, method: string): Promise<fetchResponse> {
    const fetchOptions: RequestInit = { method };
    const response = await fetch(apiUri, fetchOptions);

    if (response.ok) {
      return response;
    } else {
      console.error(`Fetch Error to ${apiUri}. Status: ${response.status}`);
      const err = new Error(response.statusText) as any;
      err['status'] = 502;
      throw err;
    }
  }

  protected filterEntityPropsForStation<T>(responseEntity: T): Station {
    return utils.filterByKeys(responseEntity, REQUIRED_STATION_PROPS)
  }

  protected filterEntityPropsForJourney<T>(responseEntity: T): Journey {
    return utils.filterByKeys(responseEntity, REQUIRED_JOURNEY_PROPS)
  }

  public abstract getStations(): Promise<Station[]>;
  public abstract getJourneysByStationCode(code: string): Promise<Journey[]>;
}
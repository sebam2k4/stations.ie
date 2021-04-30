import fetch, { RequestInit, Response as fetchResponse } from 'node-fetch';

import { Journey, Station } from '../interfaces/common.interfaces';

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
      err['status'] = 502 ;
      throw err;
    }
  }

  public abstract getStations(): Promise<Station[]>;
  public abstract getJourneysByStationCode(code: string): Promise<Journey[]>;
}
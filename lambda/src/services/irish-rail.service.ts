import xml2js, { ParserOptions } from 'xml2js';
import { Response as fetchResponse } from 'node-fetch';
import { parseNumbers } from 'xml2js/lib/processors';

import { BaseStationsService } from './base.service';
import { Journey, Station } from '../interfaces/common.interfaces';
import { ParsedIrishRailStationsXMLResponse, ParsedIrishRailStationJourneysXMLResponse } from '../interfaces/irish-rail.interface';
import utils from '../utils/utils';

const irishRailApi = 'http://api.irishrail.ie/realtime/realtime.asmx';
const getStationsPath = '/getAllStationsXML_WithStationType';
const getStationsQueryParam = '?StationType=A';
const getJourneysPath = '/getStationDataByCodeXML';
const getJourneysQueryParam = '?StationCode=';

const irishRailStationsApiUri = `${irishRailApi}${getStationsPath}${getStationsQueryParam}`;
const irishRailJourneysApiUri = `${irishRailApi}${getJourneysPath}${getJourneysQueryParam}`;

const fetchMethod = 'GET';

const xml2jsParserOptions: ParserOptions = {
  explicitArray: false,
  explicitRoot: false,
  ignoreAttrs: true,
  valueProcessors: [parseNumbers]
};

const parser = new xml2js.Parser(xml2jsParserOptions);

export class IrishRailService extends BaseStationsService {
  private railStationsXmlUri = irishRailStationsApiUri;
  // private railStationsXmlUri = 'https://httpstat.us/500';
  private railJourneysXmlUri = irishRailJourneysApiUri;

  constructor() {
    super();
    console.log('irish rail service');
  }

  public async getStations(): Promise<Station[]> {
    const xmlResponse = await this.getResponseFromThirdParty(this.railStationsXmlUri, fetchMethod);
    const parsedResponse = await this.parseXmlResponse(xmlResponse) as ParsedIrishRailStationsXMLResponse;
    const stations: Station[] = [];

    if (parsedResponse.objStation) {
      const entities = parsedResponse.objStation;
      entities.forEach(entity => {
        stations.push(new Station({
          id: entity.StationCode,
          code: entity.StationCode,
          fullName: entity.StationDesc
        }));
      });

      utils.sortObjectsByKeyNameAscending(stations, 'fullName');
    }

    return stations;
  }

  public async getJourneysByStationId(id: string): Promise<Journey[]> {
    const xmlResponse = await this.getResponseFromThirdParty(`${this.railJourneysXmlUri}${id}`, fetchMethod);
    const parsedResponse = await this.parseXmlResponse(xmlResponse) as ParsedIrishRailStationJourneysXMLResponse;
    const journeys: Journey[] = [];

    if (parsedResponse.objStationData) {
      // single journey is returned as object, not list. convert to a list in this case
      const entities = Array.isArray(parsedResponse.objStationData) ? parsedResponse.objStationData : [parsedResponse.objStationData];

      entities.forEach(entity => {
        journeys.push(new Journey({
          id: entity.Stationcode, // using station code as there is no special unique identifier for the entity in response
          destination: entity.Destination,
          destinationTime: entity.Destinationtime,
          dueIn: entity.Duein,
          expectedArrival: entity.Exparrival,
          expectedDeparture: entity.Expdepart,
          late: entity.Late,
          origin: entity.Origin,
          originTime: entity.Origintime,
          scheduledArrival: entity.Scharrival,
          scheduledDeparture: entity.Schdepart,
          code: entity.Stationcode,
          fullName: entity.Stationfullname,
        }));
      });
    }

    return journeys;
  }

  private async parseXmlResponse(xmlResponse: fetchResponse): 
      Promise<ParsedIrishRailStationsXMLResponse | ParsedIrishRailStationJourneysXMLResponse> {
    const xmlBody = await xmlResponse.text();
    const jsBody = await parser.parseStringPromise(xmlBody); // returns empty string if no results

    return jsBody ? jsBody : {};
  }
}

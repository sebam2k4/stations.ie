import xml2js, { ParserOptions } from 'xml2js';
import { Response as fetchResponse } from 'node-fetch';
import { parseNumbers } from 'xml2js/lib/processors';

import { BaseStationsService } from './base.service';
import { Journey, Station } from '../interfaces/common.interfaces';
import {
  ParsedIrishRailStationXMLEntity,
  ParsedIrishRailStationsXMLResponse,
  ParsedIrishRailStationJourneyXMLEntity,
  ParsedIrishRailStationJourneysXMLResponse
} from '../interfaces/irish-rail.interface';
import utils from '../utils/utils';
import { constants } from '../constants/irish-rail.constants';


const irishRailApi = 'http://api.irishrail.ie/realtime/realtime.asmx';
const getStationsPath = '/getAllStationsXML_WithStationType';
const getStationsQueryParam = '?StationType=A';
const getJourneysPath = '/getStationDataByCodeXML'
const getJourneysQueryParam = '?StationCode='

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
    console.log('service');
  }

  public async getStations(): Promise<Station[]> {
    const response = await this.getResponseFromThirdParty(this.railStationsXmlUri, fetchMethod);
    const parsedBody = await this.parseXmlResponse(response) as ParsedIrishRailStationsXMLResponse;

    const processedEntities = parsedBody.objStation.map((entity: ParsedIrishRailStationXMLEntity) => {
      const renamed = utils.renameKeys(entity, constants.RAIL_STATION_PROPS_RENAME);
      return this.filterEntityPropsForStation(renamed);
    });

    return utils.sortObjectsByKey(processedEntities, 'stationFullName');
  }

  public async getJourneysByStationCode(code: string): Promise<Journey[]> {
    const response = await this.getResponseFromThirdParty(`${this.railJourneysXmlUri}${code}`, fetchMethod);
    const parsedBody = await this.parseXmlResponse(response) as ParsedIrishRailStationJourneysXMLResponse;

    if (parsedBody.objStationData) {
      // single journey is returned as object, not list. convert to a list in this case
      const entities = Array.isArray(parsedBody.objStationData) ? parsedBody.objStationData : [parsedBody.objStationData];
      const processedEntities = entities.map((entity: ParsedIrishRailStationJourneyXMLEntity) => {
        const renamed = utils.renameKeys(entity, constants.RAIL_JOURNEY_PROPS_RENAME);
        return this.filterEntityPropsForJourney(renamed);
      });

      return processedEntities;
    }
    
    return [];
  }

  private async parseXmlResponse(xmlResponse: fetchResponse): 
      Promise<ParsedIrishRailStationsXMLResponse | ParsedIrishRailStationJourneysXMLResponse> {
    // add some xml validation or property validation?
    const xmlBody = await xmlResponse.text();
    const jsBody = await parser.parseStringPromise(xmlBody);

    return jsBody;
  }
}

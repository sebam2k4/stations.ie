import { Response as fetchResponse } from 'node-fetch';

import { BaseStationsService } from './base.service';
import { Journey, Station } from '../interfaces/common.interfaces';
import { BuseireannJourneysJSON, BuseireannStationsJSON } from '../interfaces/buseireann.interface';

const buseireannApi = 'https://www.buseireann.ie/inc/proto';
const getStopsPath = '/bus_stop_points.php';
const getStopData = '/stopPassageTdi.php';
const getStopDataQueryParam = '?stop_point='

const buseireannStopsApiUri = `${buseireannApi}${getStopsPath}`;
const buseireannJourneysApiUri = `${buseireannApi}${getStopData}${getStopDataQueryParam}`;

const fetchMethod = 'GET';

export class BuseireannService extends BaseStationsService {
  private buseireannStopsApiUri = buseireannStopsApiUri;
  // private railStationsXmlUri = 'https://httpstat.us/500';
  private buseireannJourneyApiUri = buseireannJourneysApiUri;

  constructor() {
    super();
    console.log('buseireann service');
  }

  public async getStations(): Promise<Station[]> {

    const response = await this.getResponseFromThirdParty(this.buseireannStopsApiUri, fetchMethod);
    const body: BuseireannStationsJSON = JSON.parse(await this.parseToValidJSONString(response));
    const entities = body.bus_stops;
    const stations: Station[] = [];

    for (const [key] of Object.entries(entities)) {
      if (entities[key]) {
        stations.push(new Station({
          id: entities[key].duid,
          code: entities[key].num.toString(),
          fullName:entities[key].name
        }));
      }
    }

    return stations;
  }

  public async getJourneysByStationId(id: string, selectedStation: Station): Promise<Journey[]> {
    const response = await this.getResponseFromThirdParty(`${this.buseireannJourneyApiUri}${id}`, fetchMethod);
    const body: BuseireannJourneysJSON = await response.json();
    const entities = body.stopPassageTdi;
    const journeys: Journey[] = [];
    let entity;
    let passageId;
    // let stopId;
    let destination;
    let origin;
    let expectedArrival;
    let scheduledArrival;
    let expectedDeparture;
    let scheduledDeparture;
    let late;

    for (const [key] of Object.entries(entities)) {
      if (entities[key]) {
        entity = entities[key];
        passageId = entity.duid;
        // stopId = entity.stop_point_duid.duid;
        destination = entity.departure_data ? entity.departure_data.multilingual_direction_text.defaultValue : selectedStation.fullName;
        origin = entity.arrival_data ? entity.arrival_data.multilingual_direction_text.defaultValue : '';
        scheduledArrival = entity.arrival_data ? entity.arrival_data.scheduled_passage_time : '';
        scheduledDeparture = entity.departure_data ? entity.departure_data.scheduled_passage_time: '';
        expectedArrival = entity.arrival_data && entity.arrival_data.actual_passage_time
          ? entity.arrival_data.actual_passage_time : '';
        expectedDeparture = entity.departure_data && entity.departure_data.actual_passage_time
          ? entity.departure_data.actual_passage_time : '';

        if (entity.departure_data && entity.departure_data.actual_passage_time_utc && entity.departure_data.scheduled_passage_time_utc) {
          late = Math.floor((entity.departure_data.actual_passage_time_utc - entity.departure_data.scheduled_passage_time_utc)/60 )
        } else {
          late = 0;
        }

        journeys.push(new Journey({
          id: passageId,
          destination,
          destinationTime: '',
          expectedArrival,
          expectedDeparture,
          late,
          origin,
          originTime: '',
          scheduledArrival,
          scheduledDeparture,
          code: selectedStation.code,
          fullName: selectedStation.fullName,
        }));
      }
    }

    return journeys;
  }

  private async parseToValidJSONString(response: fetchResponse): Promise<string> {
    const text = await response.text();
    return text.slice(0, -1).replace('var obj_bus_stop_points = ', '');
  }
}

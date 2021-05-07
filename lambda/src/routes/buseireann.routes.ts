import { Response, Request, Router, NextFunction } from 'express';
import { Station } from '../interfaces/common.interfaces';
import { BuseireannService } from '../services/buseireann.service';
import { CommonRoutesConfig } from './base.routes';

const apiPath = 'buseireann';

export class BuseireannRoutes extends CommonRoutesConfig {
  constructor(public router: Router) {
    super(router, apiPath, new BuseireannService());
  }

  public configureRoutes(buseireannService: BuseireannService): void {
    this.route
      .get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
          this.stations = await buseireannService.getStations();
          res.status(200).send({buseireannStations: this.stations});
        } catch (err) {
          console.log('GET ERROR:', err);
          next(err);
        }
      });

    this.route
      .get('/:stationId', async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.stationId;
        try {
          const selectedStation = this.getSelectedStation(id);
          this.stationJourneys = await buseireannService.getJourneysByStationId(id, selectedStation);
          res.status(200).send({buseireannStationJourneys: this.stationJourneys});
        } catch (err) {
          console.log('GET ERROR:', err);
          next(err);
        }
      });
  }

  // see if can get bus stop name from the buseireann api (not included in the stops response)
  private getSelectedStation(id: string): Station {
    const station = this.stations.find(station => station.id === id);

    return station ? station : new Station({id: '', code: '', fullName: ''});
  }
}

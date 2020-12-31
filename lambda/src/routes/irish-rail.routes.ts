import { Response, Request, Router, NextFunction } from 'express';
import { IrishRailService } from '../services/irish-rail.service';
import { CommonRoutesConfig } from './base.routes';

const apiPath = 'irishRail';

export class IrishRailRoutes extends CommonRoutesConfig {
  constructor(public router: Router, private irishRailService: IrishRailService) {
    super(router, apiPath, irishRailService);
  }

  public configureRoutes(): void {
    this.route
      .get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
          this.stations = await this.irishRailService.getStations();
          res.status(200).send({irishRailStations: this.stations});
        } catch (err) {
          console.log('SEB ERROR:', err);
          next(err);
        }
      });

    this.route
      .get('/:stationCode', async (req: Request, res: Response, next: NextFunction) => {
        try {
          this.stationJourneys = await this.irishRailService.getJourneysByStationCode(req.params.stationCode);
          res.status(200).send({irishRailStationJourneys: this.stationJourneys});
        } catch (err) {
          console.log('SEB ERROR:', err);
          next(err);
        }
      });
  }
}

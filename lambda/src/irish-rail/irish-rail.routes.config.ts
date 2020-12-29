import express from 'express';

import { CommonRoutesConfig } from '../common/common.routes.config';

export class IrishRailRoutes extends CommonRoutesConfig {
  constructor(router: express.Router) {
    super(router, 'irishRail');
  }

  public configureRoutes() {
    this.router.route('/irishrail')
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({irishRailStations: ['list of stations...']});
      });

    this.router.route('/irishrail/:stationId')
      .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        // this middleware function runs before any request to /stations/:stationId
        next();
      })
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({journeys: ['list of journeys for the s...']})
      });

    return this.router;
  }
}

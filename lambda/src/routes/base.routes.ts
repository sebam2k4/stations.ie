import { Router } from 'express';
import { Journey, Station } from '../interfaces/common.interfaces';
import { BaseStationsService } from '../services/base.service';

export abstract class CommonRoutesConfig {
  protected route: Router;
  protected stations: Station[] = [];
  protected stationJourneys: Journey[] = [];

  constructor(public router: Router, public apiPath: string, public service: BaseStationsService) {
    this.route = Router();
    this.router.use(`/${this.apiPath}`, this.route);
    this.configureRoutes(service);
  }

  public getApiPath(): string {
    return this.apiPath;
  }

  abstract configureRoutes(service: BaseStationsService): void;
}

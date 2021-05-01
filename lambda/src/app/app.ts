import express, { NextFunction, Response, Request, Router } from 'express';
import cors from 'cors';

import { CommonRoutesConfig } from '../routes/base.routes';
import { IrishRailRoutes } from '../routes/irish-rail.routes';
import config from '../config/config';

const expressApp: express.Application = express();
const expressRouter: express.Router = Router();
const routes: Array<CommonRoutesConfig> = [];

expressApp.use(config.apiPrefix, expressRouter);
expressApp.use(express.json());
expressRouter.use(cors(config.corsOptions));

routes.push(
  new IrishRailRoutes(expressRouter)
); // not using routes array

routes.forEach((route) => {
  console.log(`Routes configured for ${route.getApiPath()}`);
});

expressApp.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as any;
  err['status'] = 404;
  next(err);
});

// error handlers

expressApp.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('here')
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

export { expressApp }

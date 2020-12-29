import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';

import { CommonRoutesConfig } from './common.routes.config';
import { IrishRailRoutes } from '../irish-rail/irish-rail.routes.config';
import { config } from '../config/config';

const expressApp: express.Application = express();
const expressRouter: express.Router = express.Router();
const routes: Array<CommonRoutesConfig> = [];
const routerBasePath = `/${config.functionsPath}/${config.functionName}`;

expressApp.use(routerBasePath, expressRouter);
expressApp.use(bodyparser.json());
expressRouter.use(cors(config.corsOptions));

routes.push(
  new IrishRailRoutes(expressRouter)
); // not using routes array

routes.forEach((route) => {
  console.log(`Routes configured for ${route.getName()}`);
});

export { expressApp }

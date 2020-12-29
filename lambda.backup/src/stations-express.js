'use strict';

/* eslint-disable no-console */
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config');
const Rail = require('./stations/rail');
const ApiErrorResponse = require('./utility/errorHandlers');

const app = express();
const router = express.Router();

router.get('/stations', async (req, res) => {
  const railStationsXmlApi = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=A';
  // const railStationsJsonApi = 'https://httpstat.us/502';

  const railStationsData = await Rail.getRailStationData(railStationsXmlApi);

  if (railStationsData.error) {
    let error = new ApiErrorResponse(railStationsData.error);
    res.status(error.statusCode).send(error);
    return;
  }

  res.send({irishRailStations: railStationsData});
});

router.get('/stations/:stationCode', async (req, res) => {
  const stationCode = req.params.stationCode;
  const railJourneysXmlApi = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=${stationCode}`;
  // const railJourneysXmlApi = 'https://httpstat.us/404';

  let railJourneysData = await Rail.getRailJourneyData(railJourneysXmlApi);

  if (railJourneysData.error) {
    let error = new ApiErrorResponse(railJourneysData.error);
    res.status(error.statusCode).send(error);
    return;
  }

  res.send({irishRailStationJourneys: railJourneysData});
});

// middleware
app.use(bodyParser.json());
app.use(cors(config.corsOptions));

const routerBasePath = `/${config.functionsPath}/${config.functionName}`;
app.use(routerBasePath, router);

module.exports = app;
module.exports.handler = serverless(app);

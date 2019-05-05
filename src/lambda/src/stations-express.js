'use strict';

/* eslint-disable no-console */
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config');
const Rail = require('./stations/rail');

const app = express();
const router = express.Router();

router.get('/stations', async (req, res) => {
  const railStationsXmlApi = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=A';
  // const railStationsXmlApi = 'https://httpstat.us/405';

  let railStationsData = await Rail.getRailStationsData(railStationsXmlApi);

  if (railStationsData.error) {
    let error = railStationsData.error;
    return res.status(error.resStatus).send(error);
  }

  res.send({irishRailStations: railStationsData});
});

router.get('/stations/:stationCode', async (req, res) => {
  const stationCode = req.params.stationCode;
  const railJourneysXmlApi = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=${stationCode}`;

  let railJourneysData = await Rail.getRailJourneysData(railJourneysXmlApi);

  if (railJourneysData.error) {
    let error = railJourneysData.error;
    return res.status(error.resStatus).send(error);
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

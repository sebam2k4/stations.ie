'strict';

/* eslint-disable no-console */
const express = require('express');
const parseXmlBody = require('./utility/utils').parseXmlBody;
const fetch = require('node-fetch');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const rail = require('./utility/rail');
const config = require('./config/config');

const app = express();
const router = express.Router();

const checkStatus = (res) => {
  console.log(res.status);
  if (res.ok) {
    return res;
  } else {
    return Promise.reject({
      statusError: {
        error: res.status,
        message: res.statusText
      }
    });
    // send email
  }
};

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/stations', async (req, res) => {
  const railStationsXmlApi = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=A';
  // const railStationsXmlApi = 'https://httpstat.us/405';

  // get rail stations data
  const railStationData = await fetch(railStationsXmlApi)
    .then(checkStatus)
    .then(response => response.text())
    .then(xmlBody => parseXmlBody(xmlBody))
    .then(jsBody => rail.processRailStationsBody(jsBody))
    .catch(error => ({error}));

  
  if (railStationData.error) {
    const error = railStationData.error;
    if (error.statusError) {
      return res.status(502).send(error.statusError); // research what status codes appropriate here (invalid or error response from upstream server - bad gateway?)
    }

    if (error.parseError) {
      return res.status(500).send(error.parseError);
    }

    if (error.type === 'system') {
      return res.status(500).send(error);
    }

    return res.status(500).send(error);
  }

  // send rail stations data to web client
  res.send(railStationData);
});

router.get('/stations/:stationCode', async (req, res) => {
  const stationCode = req.params.stationCode;
  const railJourneysXmlApi = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=${stationCode}`;

  // get rail station journeys data
  const railJourneyData = await fetch(railJourneysXmlApi)
    .then(checkStatus)
    .then(response => response.text())
    .then(xmlBody => parseXmlBody(xmlBody))
    .then(jsBody => rail.processRailJourneysBody(jsBody))
    .catch(error => error);

  if (railJourneyData.statusError) {
    return res.status(502).send(railJourneyData.error);
  }

  if (railJourneyData.parseError) {
    return res.send(railJourneyData.parseError);
  }

  // send rail station journey data to web client
  res.send(railJourneyData);
});

// middleware
app.use(bodyParser.json());

const routerBasePath = `/${config.functionsPath}/${config.functionName}`;
app.use(routerBasePath, router);

module.exports = app;
module.exports.handler = serverless(app);




// [protocol]://[subdomain].[websiteName].[iId]:[port]/[path]?[query]=[string]#[hash]


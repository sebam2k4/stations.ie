'use strict';

const utils = require('../utility/utils');
const fetch = require('node-fetch').default;
const ErrorHandler = require('../utility/errorHandlers');

const RailStationProperties = {
  StationAlias: false,
  StationCode: true,
  StationDesc: true,
  StationId: false,
  StationLatitude: false,
  StationLongitude: false
};

const RailStationKeysMap = {
  StationAlias: 'stationAlias',
  StationCode: 'stationCode',
  StationDesc: 'stationFullName',
  StationId: 'stationId',
  StationLatitude: 'stationLatitude',
  StationLongitude: 'stationLongitude'
};

const RailJourneyProperties = {
  Destination: true,
  Destinationtime: true,
  Direction: false,
  Duein: true,
  Exparrival: true,
  Expdepart: true,
  Lastlocation: false,
  Late: true,
  Locationtype: false,
  Origin: true,
  Origintime: true,
  Querytime: false,
  Scharrival: true,
  Schdepart: true,
  Servertime: false,
  Stationcode: true,
  Stationfullname: true,
  Status: false,
  Traincode: false,
  Traindate: false,
  Traintype: false
};

const RailJourneysKeysMap = {
  Destination: 'destination',
  Destinationtime: 'destinationTime',
  Direction: 'direction',
  Duein: 'dueIn',
  Exparrival: 'expectedArrival',
  Expdepart: 'expectedDeparture',
  Lastlocation: 'lastLocation',
  Late: 'late',
  Locationtype: 'locationType',
  Origin: 'origin',
  Origintime: 'originTime',
  Querytime: 'queryTime',
  Scharrival: 'scheduledArrival',
  Schdepart: 'scheduledDeparture',
  Servertime: 'serverTime',
  Stationcode: 'stationCode',
  Stationfullname: 'stationFullName',
  Status: 'status',
  Traincode: 'trainCode',
  Traindate: 'trainDate',
  Traintype: 'trainType'
};

class Rail {
  static processRailStationsBody(railStations) {
    if (railStations.ArrayOfObjStation && railStations.ArrayOfObjStation.objStation) {
      const stationList = railStations.ArrayOfObjStation.objStation;
      return Rail.processRailData(stationList, RailStationProperties, RailStationKeysMap);
    }
  
    return [];
    // return new Error; // ?
  }
  
  static processRailJourneysBody(railJourneys) {
    if (railJourneys.ArrayOfObjStationData && railJourneys.ArrayOfObjStationData.objStationData) {
      const journeys = railJourneys.ArrayOfObjStationData.objStationData;
      const journeyList = Array.isArray(journeys) ? journeys : [journeys]; // single journey is returned as single object, not in an array
      return Rail.processRailData(journeyList, RailJourneyProperties, RailJourneysKeysMap);
    }
  
    return [];
    // return new Error; // ?
  }
  
  static processRailData(dataList, propsFilter, keysMap) {
    const proccessedList = [];
    const filter = utils.getRequiredProps(propsFilter);
    
    dataList.forEach(item => {
      const filteredProps = utils.filterByKey(item, filter);
      const renamedProps = utils.renameKeys(filteredProps, keysMap);
      proccessedList.push(renamedProps);
    });
  
    return proccessedList;
  }

  static async getRailStationsData(url) {
    try {
      const response = await fetch(url);
      const okResponse = await utils.checkResponseStatus(response);
      const textResponse = await okResponse.text(okResponse);
      const parsedResponse = await utils.parseXmlBody(textResponse);
      return Rail.processRailStationsBody(parsedResponse);
    } catch(err) {
      return {error: ErrorHandler.reqError(err)};
      // send email
    }
  }

  static async getRailJourneysData(url) {
    try {
      const response = await fetch(url);
      const okResponse = await utils.checkResponseStatus(response);
      const textResponse = await okResponse.text(okResponse);
      const parsedResponse = await utils.parseXmlBody(textResponse);
      return Rail.processRailJourneysBody(parsedResponse);
    } catch(err) {
      return {error: ErrorHandler.reqError(err)};
      // send email
    }
  }
}

module.exports = Rail;

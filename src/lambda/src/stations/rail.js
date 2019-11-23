'use strict';

const utils = require('../utility/utils');
const fetch = require('node-fetch').default;
const ErrorHandler = require('../utility/errorHandlers');

const settings = require('./rail-settings');

const STATION_FULL_NAME = 'stationFullName';
const STATIONS = 'stations';
const JOURNEYS = 'journeys';

class Rail {
  static _processRailStationsBody(railStations) {
    if (railStations.ArrayOfObjStation && railStations.ArrayOfObjStation.objStation) {
      const stationList = railStations.ArrayOfObjStation.objStation;
      const filteredStationsList = Rail._filterRailProperties(stationList, settings.railStationProperties, settings.railStationKeysMap);
      // console.log(filteredStationsList)
      return utils.sortObjectsByKey(filteredStationsList, STATION_FULL_NAME);
    }

    return [];
    // return new Error; // ?
  }

  static _processRailJourneysBody(railJourneys) {
    if (railJourneys.ArrayOfObjStationData && railJourneys.ArrayOfObjStationData.objStationData) {
      const journeys = railJourneys.ArrayOfObjStationData.objStationData;
      const journeyList = Array.isArray(journeys) ? journeys : [journeys]; // single journey is returned as object, not list
      return Rail._filterRailProperties(journeyList, settings.railJourneyProperties, settings.railJourneyKeysMap);
    }

    return [];
    // return new Error; // ?
  }

  static _filterRailProperties(dataList, requiredProps, keysMap) {
    const filteredList = [];
    const filter = utils.getPropsToFilter(requiredProps);
    dataList.forEach(item => {
      const filteredProps = utils.filterByKeys(item, filter);
      const renamedProps = utils.renameKeys(filteredProps, keysMap);
      filteredList.push(renamedProps);
    });
    return filteredList;
  }

  static async getRailData(url, type) {
    try {
      const response = await fetch(url);
      const okResponse = await utils.checkResponseStatus(response);
      const textResponse = await okResponse.text(okResponse);
      const parsedResponse = await utils.parseXmlBody(textResponse);
      if (type === STATIONS) {
        return Rail._processRailStationsBody(parsedResponse);
      }

      if (type === JOURNEYS) {
        return Rail._processRailJourneysBody(parsedResponse);
      }

      return [];

    } catch(err) {
      return {error: ErrorHandler.reqError(err)};
      // send email
    }
  }
}

module.exports = Rail;

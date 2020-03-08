'use strict';

const utils = require('../utility/utils');
const fetch = require('node-fetch').default;

const {
  RAIL_STATION_PROPS_TO_INCLUDE,
  RAIL_STATION_PROPS_RENAME,
  RAIL_JOURNEY_PROPS_TO_INCLUDE,
  RAIL_JOURNEY_PROPS_RENAME
} = require('./rail-settings');

const { RAIL_STATION_FULL_NAME_KEY } = require('./constants');

const _formatRailProperties = (data, requiredProps, keysMap) => {
  const filter = utils.getPropsToFilter(requiredProps);
  return data.map(listItem => {
    const filteredProps = utils.filterByKeys(listItem, filter);
    return utils.renameKeys(filteredProps, keysMap);
  });
};

const _processRailStationsBody = (railStationsJson) => {
  if (railStationsJson.ArrayOfObjStation && railStationsJson.ArrayOfObjStation.objStation) {
    const stationList = railStationsJson.ArrayOfObjStation.objStation;
    const formattedRailStations = _formatRailProperties(
      stationList,
      RAIL_STATION_PROPS_TO_INCLUDE,
      RAIL_STATION_PROPS_RENAME
    );

    const sortedRailStationsByName = utils.sortObjectsByKey(formattedRailStations, RAIL_STATION_FULL_NAME_KEY);
    return sortedRailStationsByName;
  }

  return [];
};

const _processRailJourneysBody = (railJourneysJson) => {
  if (railJourneysJson.ArrayOfObjStationData && railJourneysJson.ArrayOfObjStationData.objStationData) {
    const journeys = railJourneysJson.ArrayOfObjStationData.objStationData;
    const journeyList = Array.isArray(journeys) ? journeys : [journeys]; // single journey is returned as object, not list

    const formattedStationjourneys =  _formatRailProperties(
      journeyList,
      RAIL_JOURNEY_PROPS_TO_INCLUDE,
      RAIL_JOURNEY_PROPS_RENAME
    );
    
    return formattedStationjourneys;
  }

  return [];
};

module.exports = class Rail {
  static getRailStationData(url) {
    return fetch(url)
      .then(utils.checkFetchResponseStatus)
      .then(res => res.text(res))
      .then(data => utils.parseXmlBody(data))
      .then(json => _processRailStationsBody(json))
      .catch(err => {
        return err;
      });
  }

  static getRailJourneyData(url) {
    return fetch(url)
      .then(utils.checkFetchResponseStatus)
      .then(res => res.text(res))
      .then(data => utils.parseXmlBody(data))
      .then(json => _processRailJourneysBody(json))
      .catch(err => {
        return err;
      });
  }
};

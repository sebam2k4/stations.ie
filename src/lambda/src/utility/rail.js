const utils = require('./utils');

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

const processRailStationsBody = (railStations) => {
  if (railStations.ArrayOfObjStation && railStations.ArrayOfObjStation.objStation) {
    const stationList = railStations.ArrayOfObjStation.objStation;
    return processRailData(stationList, RailStationProperties, RailStationKeysMap);
  }

  return [];
  // return new Error; // ?
};

const processRailJourneysBody = (railJourneys) => {
  if (railJourneys.ArrayOfObjStationData && railJourneys.ArrayOfObjStationData.objStationData) {
    const journeys = railJourneys.ArrayOfObjStationData.objStationData;
    const journeyList = Array.isArray(journeys) ? journeys : [journeys]; // single journey is returned as single object, not in an array
    return processRailData(journeyList, RailJourneyProperties, RailJourneysKeysMap);
  }

  return [];
  // return new Error; // ?
};

const processRailData = (dataList, propsFilter, keysMap) => {
  const proccessedList = [];
  const filter = utils.getRequiredProps(propsFilter);
  
  dataList.forEach(item => {
    const filteredProps = utils.filterByKey(item, filter);
    const renamedProps = utils.renameKeys(filteredProps, keysMap);
    proccessedList.push(renamedProps);
  });

  return proccessedList;
};


module.exports = {
  processRailStationsBody,
  processRailJourneysBody
};

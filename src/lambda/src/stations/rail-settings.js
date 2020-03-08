const RAIL_STATION_PROPS_TO_INCLUDE = {
  StationAlias: false,
  StationCode: true,
  StationDesc: true,
  StationId: false,
  StationLatitude: false,
  StationLongitude: false
};

const RAIL_STATION_PROPS_RENAME = {
  StationAlias: 'stationAlias',
  StationCode: 'stationCode',
  StationDesc: 'stationFullName',
  StationId: 'stationId',
  StationLatitude: 'stationLatitude',
  StationLongitude: 'stationLongitude'
};

const RAIL_JOURNEY_PROPS_TO_INCLUDE = {
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

const RAIL_JOURNEY_PROPS_RENAME = {
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

module.exports = {
  RAIL_STATION_PROPS_TO_INCLUDE,
  RAIL_STATION_PROPS_RENAME,
  RAIL_JOURNEY_PROPS_TO_INCLUDE,
  RAIL_JOURNEY_PROPS_RENAME
};

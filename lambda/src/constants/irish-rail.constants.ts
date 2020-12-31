const RAIL_STATION_PROPS_RENAME: Record<string, string> = {
  StationAlias: 'stationAlias',
  StationCode: 'stationCode',
  StationDesc: 'stationFullName',
  StationId: 'stationId',
  StationLatitude: 'stationLatitude',
  StationLongitude: 'stationLongitude'
};

const RAIL_JOURNEY_PROPS_RENAME: Record<string, string> = {
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

export const constants = {
  RAIL_STATION_PROPS_RENAME,
  RAIL_JOURNEY_PROPS_RENAME
};

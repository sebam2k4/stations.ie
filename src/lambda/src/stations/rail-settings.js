const railStationProperties = {
  StationAlias: false,
  StationCode: true,
  StationDesc: true,
  StationId: false,
  StationLatitude: false,
  StationLongitude: false
};

const railStationKeysMap = {
  StationAlias: 'stationAlias',
  StationCode: 'stationCode',
  StationDesc: 'stationFullName',
  StationId: 'stationId',
  StationLatitude: 'stationLatitude',
  StationLongitude: 'stationLongitude'
};

const railJourneyProperties = {
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

const railJourneyKeysMap = {
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
  railStationProperties,
  railStationKeysMap,
  railJourneyProperties,
  railJourneyKeysMap
};

export const mockIrishRailStationObject = {
  irishRailStations: [
    {
      StationAlias: null,
      StationCode: 'CLBAR',
      StationDesc: 'Castlebar',
      StationId: '168',
      StationLatitude: '53.8471',
      StationLongitude: '-9.2873'
    },
    {
      StationAlias: null,
      StationCode: 'GALWY',
      StationDesc: 'Galway',
      StationId: '170',
      StationLatitude: '53.2736',
      StationLongitude: '-9.04696'
    }
  ]
};

export const mockIrishRailStationConvertedList = [
  {
    stationAlias: null,
    stationCode: 'CLBAR',
    stationFullName: 'Castlebar',
    stationId: '168',
    stationLatitude: '53.8471',
    stationLongitude: '-9.2873'
  },
  {
    stationAlias: null,
    stationCode: 'GALWY',
    stationFullName: 'Galway',
    stationId: '170',
    stationLatitude: '53.2736',
    stationLongitude: '-9.04696'
  }
];

export const mockIrishRailStationJourneyObject = {
  'irishRailStationJourneys': [
    {
      Destination: 'Newbridge',
      Destinationtime: '19:36',
      Direction: 'To Newbridge',
      Duein: '21',
      Exparrival: '19:12',
      Expdepart: '19:13',
      Lastlocation: null,
      Late: '0',
      Locationtype: 'S',
      Origin: 'Dublin Heuston',
      Origintime: '18:55',
      Querytime: '18:52:26',
      Scharrival: '19:12',
      Schdepart: '19:13',
      Servertime: '2018-12-30T18:52:26.547',
      Stationcode: 'ADMTN',
      Stationfullname: 'Adamstown',
      Status: 'No Information',
      Traincode: 'D204',
      Traindate: '30 Dec 2018',
      Traintype: 'ICR'
    }
  ]
};

export const mockIrishRailStationJourneyConvertedList = [
  {
    destination: 'Newbridge',
    destinationTime: '19:36',
    direction: 'To Newbridge',
    dueIn: '21',
    expectedArrival: '19:12',
    expectedDeparture: '19:13',
    lastLocation: null,
    late: '0',
    locationType: 'S',
    origin: 'Dublin Heuston',
    originTime: '18:55',
    queryTime: '18:52:26',
    scheduledArrival: '19:12',
    scheduledDeparture: '19:13',
    serverTime: '2018-12-30T18:52:26.547',
    stationCode: 'ADMTN',
    stationFullName: 'Adamstown',
    status: 'No Information',
    trainCode: 'D204',
    trainDate: '30 Dec 2018',
    trainType: 'ICR'
  }
];

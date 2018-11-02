export interface RailStation {
  StationAlias: string;
  StationCode: string;
  StationDesc: string;
  StationId: string;
  StationLatitude: string;
  StationLongiture: string;
}

export interface RailStationData {
  Destination:string,
  Destinationtime:string,
  Direction:string,
  Duein:string,
  Exparrival:string,
  Expdepart:string,
  Lastlocation:string,
  Late:string,
  Locationtype:string,
  Origin:string,
  Origintime:string,
  Querytime:string,
  Scharrival:string,
  Schdepart:string,
  Servertime:string,
  Stationcode:string,
  Stationfullname:string,
  Status:string,
  Traincode:string,
  Traindate:string,
  Traintype:string
}
export interface ParsedIrishRailStationsXMLResponse {
  objStation: ParsedIrishRailStationXMLEntity[]
}

export interface ParsedIrishRailStationXMLEntity {
  StationAlias: string;
  StationCode: string;
  StationDesc: string;
  StationId: string;
  StationLatitute: string;
  StationLongitude: string;
}

export interface ParsedIrishRailStationJourneysXMLResponse {
  objStationData: ParsedIrishRailStationJourneyXMLEntity[];
}

export interface ParsedIrishRailStationJourneyXMLEntity {
  Destination: string;
  Destinationtime: string;
  Direction: string;
  Duein: number;
  Exparrival: string;
  Expdepart: string;
  Lastlocation: string;
  Late: number;
  Locationtype: string;
  Origin: string;
  Origintime: string;
  Querytime: string;
  Scharrival: string;
  Schdepart: string;
  Servertime: string;
  Stationcode: string;
  Stationfullname: string;
  Status: string;
  Traincode: string;
  Traindate: string;
  Traintype: string;
}

export class IrishRailStation {
  public stationCode: string;
  public stationFullName: string;

  constructor(IrishRailStation: any) {
  this.stationCode = IrishRailStation.stationCode;
  this.stationFullName = IrishRailStation.stationFullName;
  }
}

export class IrishRailStationJourney {
  public destination: string;
  public destinationTime: string;
  public dueIn: string;
  public expectedArrival: string;
  public expectedDeparture: string;
  public late: string;
  public origin: string;
  public originTime: string;
  public scheduledArrival: string;
  public scheduledDeparture: string;
  public stationCode: string;
  public stationFullName: string;

  constructor(IrishRailStationJourney: any) {
    this.destination = IrishRailStationJourney.destination;
    this.destinationTime = IrishRailStationJourney.destinationTime;
    this.dueIn = IrishRailStationJourney.dueIn;
    this.expectedArrival = IrishRailStationJourney.expectedArrival;
    this.expectedDeparture = IrishRailStationJourney.expectedDeparture;
    this.late = IrishRailStationJourney.late;
    this.origin = IrishRailStationJourney.origin;
    this.originTime = IrishRailStationJourney.originTime;
    this.scheduledArrival = IrishRailStationJourney.scheduledArrival;
    this.scheduledDeparture = IrishRailStationJourney.scheduledDeparture;
    this.stationCode = IrishRailStationJourney.stationCode;
    this.stationFullName = IrishRailStationJourney.stationFullName;
  }
}

export interface ApiIrishRailStationsList {
  irishRailStations: IrishRailStation[];
}

export interface ApiIrishRailStationJourneysList {
  irishRailStationJourneys: IrishRailStationJourney[];
}

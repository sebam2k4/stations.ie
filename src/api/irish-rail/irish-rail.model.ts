export class IrishRailStation {
  public stationCode: string;
  public stationFullName: string;

  constructor(irishRailStation: IrishRailStation) {
  this.stationCode = irishRailStation.stationCode;
  this.stationFullName = irishRailStation.stationFullName;
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

  constructor(irishRailStationJourney: IrishRailStationJourney) {
    this.destination = irishRailStationJourney.destination;
    this.destinationTime = irishRailStationJourney.destinationTime;
    this.dueIn = irishRailStationJourney.dueIn;
    this.expectedArrival = irishRailStationJourney.expectedArrival;
    this.expectedDeparture = irishRailStationJourney.expectedDeparture;
    this.late = irishRailStationJourney.late;
    this.origin = irishRailStationJourney.origin;
    this.originTime = irishRailStationJourney.originTime;
    this.scheduledArrival = irishRailStationJourney.scheduledArrival;
    this.scheduledDeparture = irishRailStationJourney.scheduledDeparture;
    this.stationCode = irishRailStationJourney.stationCode;
    this.stationFullName = irishRailStationJourney.stationFullName;
  }
}

export interface ApiirishRailStationsList {
  irishRailStations: IrishRailStation[];
}

export interface ApiirishRailStationJourneysList {
  irishRailStationJourneys: IrishRailStationJourney[];
}

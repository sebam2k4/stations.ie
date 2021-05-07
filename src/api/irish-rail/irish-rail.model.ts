export class IrishRailStation {
  public id: string;
  public code: string;
  public fullName: string;

  constructor(irishRailStation: IrishRailStation) {
  this.id = irishRailStation.id;
  this.code = irishRailStation.code;
  this.fullName = irishRailStation.fullName;
  }
}

export class IrishRailStationJourney {
  public id: string;
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
  public code: string;
  public fullName: string;

  constructor(irishRailStationJourney: IrishRailStationJourney) {
    this.id = irishRailStationJourney.id
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
    this.code = irishRailStationJourney.code;
    this.fullName = irishRailStationJourney.fullName;
  }
}

export interface ApiirishRailStationsList {
  irishRailStations: IrishRailStation[];
}

export interface ApiirishRailStationJourneysList {
  irishRailStationJourneys: IrishRailStationJourney[];
}

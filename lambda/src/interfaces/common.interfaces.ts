export interface Station {
  stationCode: string;
  stationFullName: string;
}

export class Station2 {
  public stationCode: string;
  public stationFullName: string;
  constructor(station: Station) {
    this.stationCode = station.stationCode;
    this.stationFullName = station.stationFullName;
  }
}


export interface Journey {
  destination: string;
  destinationTime: string;
  dueIn: number;
  expectedArrival: string;
  expectedDeparture: string;
  late: number;
  origin: string;
  originTime: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  stationCode: string;
  stationFullName: string;
}

export class Journey2 {
  destination: string;
  destinationTime: string;
  dueIn: number;
  expectedArrival: string;
  expectedDeparture: string;
  late: number;
  origin: string;
  originTime: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  stationCode: string;
  stationFullName: string;
  constructor(journey: Journey) {
    this.destination = journey.destination;
    this.destinationTime = journey.destinationTime;
    this.dueIn = journey.dueIn;
    this.expectedArrival = journey.expectedArrival;
    this.expectedDeparture = journey.expectedDeparture;
    this.late = journey.late;
    this.origin = journey.origin;
    this.originTime = journey.originTime;
    this.scheduledArrival = journey.scheduledArrival;
    this.scheduledDeparture = journey.scheduledDeparture;
    this.stationCode = journey.stationCode;
    this.stationFullName = journey.stationFullName;
  }
}

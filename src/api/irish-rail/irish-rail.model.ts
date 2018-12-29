export class IrishRailStation {
  public stationAlias: string;
  public stationCode: string;
  public stationFullName: string;
  public stationId: string;
  public stationLatitude: string;
  public stationLongitude: string

  constructor(IrishRailStation: any) {
  this.stationAlias = IrishRailStation.stationAlias;
  this.stationCode = IrishRailStation.stationCode;
  this.stationFullName = IrishRailStation.stationFullName;
  this.stationId = IrishRailStation.stationId;
  this.stationLatitude = IrishRailStation.stationLatitude;
  this.stationLongitude = IrishRailStation.stationLongitude;
  }
}

export class IrishRailStationJourney {
  public destination:string;
  public destinationTime:string;
  public direction:string;
  public dueIn:string;
  public expectedArrival:string;
  public expectedDeparture:string;
  public lastLocation:string;
  public late:string;
  public locationType:string;
  public origin:string;
  public originTime:string;
  public queryTime:string;
  public scheduledArrival:string;
  public scheduledDeparture:string;
  public serverTime:string;
  public stationCode:string;
  public stationFullName:string;
  public status:string;
  public trainCode:string;
  public trainDate:string;
  public trainType:string;

  constructor(IrishRailStationJourney: any) {
    this.destination = IrishRailStationJourney.destination;
    this.destinationTime = IrishRailStationJourney.destinationTime;
    this.direction = IrishRailStationJourney.direction;
    this.dueIn = IrishRailStationJourney.dueIn;
    this.expectedArrival = IrishRailStationJourney.expectedArrival;
    this.expectedDeparture = IrishRailStationJourney.expectedDeparture;
    this.lastLocation = IrishRailStationJourney.lastLocation;
    this.late = IrishRailStationJourney.late;
    this.locationType = IrishRailStationJourney.locationType;
    this.origin = IrishRailStationJourney.origin;
    this.originTime = IrishRailStationJourney.originTime;
    this.queryTime = IrishRailStationJourney.queryTime;
    this.scheduledArrival = IrishRailStationJourney.scheduledArrival;
    this.scheduledDeparture = IrishRailStationJourney.scheduledDeparture;
    this.serverTime = IrishRailStationJourney.serverTime;
    this.stationCode = IrishRailStationJourney.stationCode;
    this.stationFullName = IrishRailStationJourney.stationFullName;
    this.status = IrishRailStationJourney.status;
    this.trainCode = IrishRailStationJourney.trainCode;
    this.trainDate = IrishRailStationJourney.trainDate;
    this.trainType = IrishRailStationJourney.trainType;
  }
}

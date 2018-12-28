export class IrishRailStation {
  public StationAlias: string;
  public StationCode: string;
  public StationDesc: string;
  public StationId: string;
  public StationLatitude: string;
  public StationLongitude: string

  constructor(IrishRailStation: any) {
  this.StationAlias = IrishRailStation.StationAlias;
  this.StationCode = IrishRailStation.StationCode;
  this.StationDesc = IrishRailStation.StationDesc;
  this.StationId = IrishRailStation.StationId;
  this.StationLatitude = IrishRailStation.StationLatitude;
  this.StationLongitude = IrishRailStation.StationLongitude;
  }
}

export class IrishRailStationJourney {
  public Destination:string;
  public Destinationtime:string;
  public Direction:string;
  public Duein:string;
  public Exparrival:string;
  public Expdepart:string;
  public Lastlocation:string;
  public Late:string;
  public Locationtype:string;
  public Origin:string;
  public Origintime:string;
  public Querytime:string;
  public Scharrival:string;
  public Schdepart:string;
  public Servertime:string;
  public Stationcode:string;
  public Stationfullname:string;
  public Status:string;
  public Traincode:string;
  public Traindate:string;
  public Traintype:string

  constructor(IrishRailStationJourney: any) {
    this.Destination = IrishRailStationJourney.Destination;
    this.Destinationtime = IrishRailStationJourney.Destinationtime;
    this.Direction = IrishRailStationJourney.Direction;
    this.Duein = IrishRailStationJourney.Duein;
    this.Exparrival = IrishRailStationJourney.Exparrival;
    this.Expdepart = IrishRailStationJourney.Expdepart;
    this.Lastlocation = IrishRailStationJourney.Lastlocation;
    this.Late = IrishRailStationJourney.Late;
    this.Locationtype = IrishRailStationJourney.Locationtype;
    this.Origin = IrishRailStationJourney.Origin;
    this.Origintime = IrishRailStationJourney.Origintime;
    this.Querytime = IrishRailStationJourney.Querytime;
    this.Scharrival = IrishRailStationJourney.Scharrival;
    this.Schdepart = IrishRailStationJourney.Schdepart;
    this.Servertime = IrishRailStationJourney.Servertime;
    this.Stationcode = IrishRailStationJourney.Stationcode;
    this.Stationfullname = IrishRailStationJourney.Stationfullname;
    this.Status = IrishRailStationJourney.Status;
    this.Traincode = IrishRailStationJourney.Traincode;
    this.Traindate = IrishRailStationJourney.Traindate;
    this.Traintype = IrishRailStationJourney.Traintype
  }
}
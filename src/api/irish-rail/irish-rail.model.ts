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

export class IrishRailStationData {
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

  constructor(IrishRailStationData: any) {
    this.Destination = IrishRailStationData.Destination;
    this.Destinationtime = IrishRailStationData.Destinationtime;
    this.Direction = IrishRailStationData.Direction;
    this.Duein = IrishRailStationData.Duein;
    this.Exparrival = IrishRailStationData.Exparrival;
    this.Expdepart = IrishRailStationData.Expdepart;
    this.Lastlocation = IrishRailStationData.Lastlocation;
    this.Late = IrishRailStationData.Late;
    this.Locationtype = IrishRailStationData.Locationtype;
    this.Origin = IrishRailStationData.Origin;
    this.Origintime = IrishRailStationData.Origintime;
    this.Querytime = IrishRailStationData.Querytime;
    this.Scharrival = IrishRailStationData.Scharrival;
    this.Schdepart = IrishRailStationData.Schdepart;
    this.Servertime = IrishRailStationData.Servertime;
    this.Stationcode = IrishRailStationData.Stationcode;
    this.Stationfullname = IrishRailStationData.Stationfullname;
    this.Status = IrishRailStationData.Status;
    this.Traincode = IrishRailStationData.Traincode;
    this.Traindate = IrishRailStationData.Traindate;
    this.Traintype = IrishRailStationData.Traintype
  }
}
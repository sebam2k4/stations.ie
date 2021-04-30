// eslint-disable-next-line @typescript-eslint/ban-types
type PublicAndNonMethodKeys<T> = ({[P in keyof T]: T[P] extends Function ? never : P } & { [x: string]: never })[keyof T];  
type RemovePrivateAndNonMethodKeys<T> = Pick<T, PublicAndNonMethodKeys<T>>;

export class Station {
  public stationCode: string;
  public stationFullName: string;
  // private prop2!: number;

  constructor(obj: RemovePrivateAndNonMethodKeys<Station>) {
    this.stationCode = obj.stationCode;
    this.stationFullName = obj.stationFullName;
  }

  // private method(): void {}

  // TODO: set any additional props when needed for the UI
}

export class Journey {
  public destination: string;
  public destinationTime: string;
  public dueIn: number;
  public expectedArrival: string;
  public expectedDeparture: string;
  public late: number;
  public origin: string;
  public originTime: string;
  public scheduledArrival: string;
  public scheduledDeparture: string;
  public stationCode: string;
  public stationFullName: string;
  constructor(obj: RemovePrivateAndNonMethodKeys<Journey>) {
    this.destination = obj.destination;
    this.destinationTime = obj.destinationTime;
    this.dueIn = obj.dueIn;
    this.expectedArrival = obj.expectedArrival;
    this.expectedDeparture = obj.expectedDeparture;
    this.late = obj.late;
    this.origin = obj.origin;
    this.originTime = obj.originTime;
    this.scheduledArrival = obj.scheduledArrival;
    this.scheduledDeparture = obj.scheduledDeparture;
    this.stationCode = obj.stationCode;
    this.stationFullName = obj.stationFullName;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
type PublicAndNonMethodKeys<T> = ({[P in keyof T]: T[P] extends Function ? never : P } & { [x: string]: never })[keyof T];  
type RemovePrivateAndNonMethodKeys<T> = Pick<T, PublicAndNonMethodKeys<T>>;

export class Station {
  public id: string; // unique identifier in external system
  public code: string; // stop number or code
  public fullName: string;
  // private prop2!: number;

  constructor(obj: RemovePrivateAndNonMethodKeys<Station>) {
    this.id = obj.id;
    this.code = obj.code;
    this.fullName = obj.fullName;
  }

  // private method(): void {}

  // TODO: set any additional props when needed for the UI
}

export class Journey {
  public id: string; // unique identifier in external system
  public destination: string;
  public destinationTime: string;
  public dueIn?: number;
  public expectedArrival: string;
  public expectedDeparture: string;
  public late: number;
  public origin: string;
  public originTime: string;
  public scheduledArrival: string;
  public scheduledDeparture: string;
  public code: string;
  public fullName: string;
  constructor(obj: RemovePrivateAndNonMethodKeys<Journey>) {
    this.id = obj.id;
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
    this.code = obj.code;
    this.fullName = obj.fullName;
  }
}

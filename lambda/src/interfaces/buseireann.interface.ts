interface BuseireannStopsMap {
  [key: string]: {
    duid: string;
    name: string;
    lat: number;
    lng: number;
    num: number;
  };
}

interface MultilingualDirectionText {
  defaultValue: string;
  foo: number;
}

interface DepartureArrivalData {
  scheduled_passage_time_utc: number;
  scheduled_passage_time: string;
  actual_passage_time_utc?: number;
  actual_passage_time?: string;
  service_mode: number;
  multilingual_direction_text: MultilingualDirectionText;
  type: number;
  foo: number;
}

interface Ref {
  structTag: number;
  duid: string;
  foo: number;
}

interface BuseireannPassagesMap {
  [key: string]: {
    duid: string;
    last_modification_timestamp: Date;
    is_deleted: boolean;
    direction: number;
    arrival_data: DepartureArrivalData;
    departure_data?: DepartureArrivalData;
    congestion_level?: number;
    accuracy_level: number,
    status: number;
    is_accessible?: number;
    latitude: number;
    longitude: number;
    bearing: number;
    has_bike_rack?: number;
    category?: number;
    pattern_duid: Ref;
    route_duid: Ref;
    stop_point_duid: Ref;
    trip_duid: Ref;
    vehicle_duid?: Ref;
  };
}

export interface BuseireannStationsJSON {
  bus_stops: BuseireannStopsMap;
}

export interface BuseireannJourneysJSON {
  stopPassageTdi: BuseireannPassagesMap
}

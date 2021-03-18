import DateTimeFormat = Intl.DateTimeFormat;

export interface TrackingVehicule {
  id? : number;
  category : string;
  stationArrival : string;
  stationDeparture :string;
  lineNumber :any;
  hourArrival :DateTimeFormat;
  hourDeparture :DateTimeFormat;
  dateObservation : DateTimeFormat;
  delayForecast : string;
  delayMin : any;
}
export declare type   TrackingVehiculeList = TrackingVehicule[];

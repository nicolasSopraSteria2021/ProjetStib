import DateTimeFormat = Intl.DateTimeFormat;

export interface Vehicule {

  id? : number;
  category : string;
  stationArrival : string;
  stationDeparture :string;
  lineNumber :any;
  hourArrival :DateTimeFormat;
  hourDeparture :DateTimeFormat;


}
export declare type VehiculesList = Vehicule[];

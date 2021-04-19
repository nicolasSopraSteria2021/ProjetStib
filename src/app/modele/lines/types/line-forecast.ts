export interface LineForecast {
  //l'heure d'arrivé
  hourArrival : string;
  // le temps de retards
  delayForecast : number;
  prediction : number;
  delays : any;
  snow : any;

  relativeHumidity : any;

  windSpeed : any;

  precip: any;

  visibility: any;
}

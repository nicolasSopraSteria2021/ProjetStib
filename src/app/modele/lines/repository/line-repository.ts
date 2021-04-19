import {Observable} from 'rxjs';
import {Line} from '../types/line';
import {TrackingVehiculeForTable} from '../../TrackingVehicule/types/tracking-vehicule-for-table';
import {LineForecast} from '../types/line-forecast';
import {DetailsWeather} from '../types/details-weather';

export interface LineRepository {

  //methode qui renvoies une liste de Ligne pour le barChart
  getLineChart(vehiculeType: string, value: any):Observable<Line[]>;

  //recupere les numeros de ligne en fonction de la category du vehicule
  getLineNumberFromCategory(vehiculeType: string): Observable<number>;

  //recupere les previsions des retards
  getForecastFromLine(lineNumber: number,vehiculeType:string,monthNumber:number): Observable<LineForecast[]>;

  getMonthFromDb() : Observable<string>;

  getYearsFromDb() : Observable<any>;

  getDetailsWeather(dateValue: string) : Observable<DetailsWeather>;
}

import {Observable} from 'rxjs';
import {Line} from '../types/line';
import {TrackingVehiculeForTable} from '../../TrackingVehicule/types/tracking-vehicule-for-table';
import {LineForecast} from '../types/line-forecast';

export interface LineRepository {

  //methode qui renvoies une liste de Ligne pour le barChart
  getLineChart(vehiculeType : number):Observable<Line[]>;

  //recupere les numeros de ligne en fonction de la category du vehicule
  getLineNumberFromCategory(vehiculeType:number): Observable<number>;

  //recupere les previsions des retards
  getForecastFromLine(lineNumber:number): Observable<LineForecast[]>;

}

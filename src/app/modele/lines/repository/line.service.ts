import { Injectable } from '@angular/core';
import {LineRepository} from './line-repository';
import {Observable} from 'rxjs';
import {Line} from '../types/line';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LineForecast} from '../types/line-forecast';
import {DetailsWeather} from '../types/details-weather';

@Injectable({
  providedIn: 'root'
})
export class LineService implements  LineRepository{
//les requetes necessitant le type de vehicule sont envoyer a chaque fois que
  //la page specifique est chargée

//constante definissant l'URL
  static readonly URL : string = environment.serverAddress+'/vehicule';

  constructor(private http:HttpClient) { }

//requete get permettant de renvoyer le numero de la ligne ainsi que son nombre de retard barchart
  getLineChart(vehiculeType: string, value: any): Observable<Line[]> {
    return this.http.get<Line[]>(LineService.URL+'/lineGraph/'+vehiculeType+'/'+value);
  }
//requete get permettant d'avoir le numero des lignes disponible en fonction du type de vehicule
  getLineNumberFromCategory(vehiculeType: string): Observable<number> {
    return this.http.get<number>(LineService.URL+'/numberLine/'+vehiculeType);
  }
//requete get permettant d'avoir les données de retards de prévisions
  getForecastFromLine(lineNumber: number,vehiculeType:string,monthNumber:number): Observable<LineForecast[]> {
    return this.http.get<LineForecast[]>(LineService.URL+'/dataForecast/'+lineNumber+'/'+vehiculeType+'/'+monthNumber);
  }

  getMonthFromDb(): Observable<string> {
    return this.http.get<string>(LineService.URL+'/month');
  }

  getYearsFromDb(): Observable<any> {
    return this.http.get<number>(LineService.URL+'/years');
  }

  getDetailsWeather(dateValue: string): Observable<DetailsWeather>{
    return this.http.get<DetailsWeather>(LineService.URL+'/detailsWeather/'+dateValue);
  }
}

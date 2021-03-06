import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrackingVehiculeRepository} from './tracking-vehicule-repository';
import {TrackingVehiculeList} from '../types/trackingVehicule';
import {TrackingVehiculeForTable} from '../types/tracking-vehicule-for-table';
import {InfoMostDelay} from '../types/info-most-delay';

@Injectable({
  providedIn: 'root'
})
export class TrackingVehiculeService implements TrackingVehiculeRepository{

  static readonly URL : string = environment.serverAddress+'/line';

  constructor(private http:HttpClient) { }

  // recupere le nombre de retard de chaque vehicule
  getCountDelayFromBus(dateObs:string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/delayBus/'+dateObs);
  }

  getCountDelayFromMetro(dateObs:string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/delayMetro/'+dateObs);
  }

  getCountDelayFromTram(dateObs:string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/delayTram/'+dateObs);
  }
//recupere le nombre de vehicule non en retard
  getCountNotDelayFromBus(dateObs: string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/notDelayBus/'+dateObs);
  }

  getCountNotDelayFromMetro(dateObs: string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/notDelayMetro/'+dateObs);
  }

  getCountNotDelayFromTram(dateObs: string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/notDelayTram/'+dateObs);
  }

  //recupere la date et le nombre de retard en fonction du type de données
  getInfoForTable(vehiculeType: string, value: any): Observable<TrackingVehiculeForTable[]> {
    return this.http.get<TrackingVehiculeForTable[]>(TrackingVehiculeService.URL+'/InfoTable/'+vehiculeType+'/'+value);
  }
//recupere les infos de la ligne la plus en retard
  GetInfoForMostDelay(vehiculeType: string, value: any): Observable<InfoMostDelay> {
    return this.http.get<InfoMostDelay>(TrackingVehiculeService.URL+'/InfoMostDelay/'+vehiculeType+'/'+value);
  }

  //recupere la date et le nombre de retard en fonction du type de données
  getDayByMonth(vehiculeType: string, value: any,monthValue : any): Observable<TrackingVehiculeForTable[]> {
    return this.http.get<TrackingVehiculeForTable[]>(TrackingVehiculeService.URL+'/specificMonth/'+vehiculeType+'/'+value+'/'+monthValue);
  }
}

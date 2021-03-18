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

  static readonly URL : string = environment.serverAddress+'/trackingVehicule';

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

  //recupere le temps total de retard de chaque vehicule

  getTimeDelayFromBus(dateObs:string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/TimeDelayBus/'+dateObs);
  }

  getTimeDelayFromMetro(dateObs: string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/TimeDelayMetro/'+dateObs);
  }

  getTimeDelayFromTram(dateObs: string): Observable<number> {
    return this.http.get<number>(TrackingVehiculeService.URL+'/TimeDelayTram/'+dateObs);
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


//recupere les infos de tout les vehicules en retards
  getInfoForWarning(): Observable<TrackingVehiculeList> {
    return this.http.get<TrackingVehiculeList>(TrackingVehiculeService.URL+'/InfoWaring');
  }
  //recupere la date et le nombre de retard en fonction du type de données
  getInfoForTable(vehiculeType: number): Observable<TrackingVehiculeForTable[]> {
    return this.http.get<TrackingVehiculeForTable[]>(TrackingVehiculeService.URL+'/InfoTable/'+vehiculeType);
  }
//recupere les infos de la ligne la plus en retard
  GetInfoForMostDelay(vehiculeType: number): Observable<InfoMostDelay> {
    return this.http.get<InfoMostDelay>(TrackingVehiculeService.URL+'/InfoMostDelay/'+vehiculeType);
  }
}

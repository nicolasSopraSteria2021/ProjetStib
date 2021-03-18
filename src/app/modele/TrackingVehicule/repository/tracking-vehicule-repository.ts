import {Observable} from 'rxjs';
import {TrackingVehiculeList} from '../types/trackingVehicule';
import {TrackingVehiculeForTable} from '../types/tracking-vehicule-for-table';
import {InfoMostDelay} from '../types/info-most-delay';


export interface TrackingVehiculeRepository {
// recupere le nombre de retard de chaque vehicule
  getCountDelayFromBus(dateObs:string) : Observable<number>;
  getCountDelayFromMetro(dateObs:string) : Observable<number>;
  getCountDelayFromTram(dateObs:string) : Observable<number>;

  //recupere le temps total de retard de chaque vehicule
  getTimeDelayFromBus(dateObs:string) : Observable<number>;
  getTimeDelayFromTram(dateObs:string) : Observable<number>;
  getTimeDelayFromMetro(dateObs:string) : Observable<number>;


  //recupere le nombre de vehicule non en retard
  getCountNotDelayFromTram(dateObs:string) : Observable<number>;
  getCountNotDelayFromMetro(dateObs:string) : Observable<number>;
  getCountNotDelayFromBus(dateObs:string) : Observable<number>;
//recupere les infos de tout les vehicules en retards
  getInfoForWarning(): Observable<TrackingVehiculeList>;
  //recupere la date et le nombre de retard en fonction du type de données
  getInfoForTable(vehiculeType:number):Observable<TrackingVehiculeForTable[]>;
  //recupere les infos de la ligne la plus en retard
  GetInfoForMostDelay(vehiculeType : number) : Observable<InfoMostDelay>;

}

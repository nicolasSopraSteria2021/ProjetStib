import {Observable} from 'rxjs';
import {VehiculesList} from '../types/vehicule';

export interface VehiculeRepository {

  query():Observable<VehiculesList>;


}

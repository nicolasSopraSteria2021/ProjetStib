import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {VehiculeRepository} from './vehiculeRepository';
import {VehiculesList} from '../types/vehicule';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService  implements  VehiculeRepository{

  static readonly URL : string = environment.serverAddress+'/vehicule';

  constructor(private http:HttpClient) { }

  query(): Observable<VehiculesList> {
    return this.http.get<VehiculesList>(VehiculeService.URL);
  }








}

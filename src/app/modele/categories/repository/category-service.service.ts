import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryRepository} from './category-repository';
import {CategoriesList} from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService implements CategoryRepository {

  static readonly URL: string = environment.serverAddress +'/Category';

  constructor(private http: HttpClient) {
  }
  //renvoie toutes les categories de la base de données via l'URL
  query(): Observable<CategoriesList> {
    return this.http.get<CategoriesList>(CategoryServiceService.URL);
  }
}

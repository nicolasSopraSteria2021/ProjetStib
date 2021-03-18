import {Observable} from 'rxjs';
import {CategoriesList} from '../types/category';

export interface CategoryRepository {

  //renvoie les categories présentes dans la base de données
  query():Observable<CategoriesList>;

}
